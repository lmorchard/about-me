#!/usr/bin/env bash
#
# Build the site in a container, then publish it to aerostat02.
#
# Runs hourly from the crontab on myriad-docker, wrapped in flock so a slow
# build cannot overlap the next tick -- two concurrent runs would fight over
# build/ and could rsync a half-written tree.
#
# The split is deliberate: the container builds and holds no credentials for
# aerostat02, and the host publishes using a key that never enters the image.
# The container needs the 23 API tokens in .env; the host needs the deploy key.
# Neither needs the other's secrets.
#
#   crontab: 7 * * * * /usr/bin/flock -n /tmp/about-me-publish.lock \
#              /home/lmorchard/docker/about-me/scripts/publish.sh \
#              >> /home/lmorchard/.local/log/about-me.log 2>&1
#
# Environment:
#   DEPLOY_KEY   ssh key for webdeploy@aerostat02 (default ~/.ssh/about-me-deploy)
#   SKIP_PULL    set to 1 to build the working tree as-is, without git pull

set -euo pipefail

cd "$(dirname "$0")/.."
DEPLOY_KEY="${DEPLOY_KEY:-$HOME/.ssh/about-me-deploy}"

echo "=== $(date -Is) about-me publish ==="

if [ "${SKIP_PULL:-0}" != "1" ]; then
  # --ff-only so a stray local commit fails loudly instead of merging in a cron job.
  git pull --ff-only
fi

# Installs from the lockfile and builds, in the stock node:22 image. About 40
# seconds with a warm .npm-cache. There is no image to build; see the comment in
# docker-compose.yml for why.
docker compose run --rm build

# This publisher owns exactly these paths in /srv/www/lmorchard.com. The rest of
# that directory is hand-maintained in lmorchard/lmorchard.com, whose publish
# workflow runs `rsync --delete` and excludes this same list, so neither can
# remove or revert the other's files.
#
# That exclude list is a coupling between two repos, so this fails if build/
# grows a path the list does not cover. Failing here is the point: the
# alternative is a new file publishing fine and then being deleted an hour later
# by an unrelated push, which is far worse to diagnose.
expected=$(echo "assets bio.md index.css index.html index.json llms.txt resume.pdf" | xargs -n1 | sort | xargs)
# -exec ... ';' one at a time, not '+': GNU basename takes a single operand
# and rejects the batch that '+' passes, which silently yields an empty list
# and would fail this check on every run. BSD basename accepts the batch,
# so this only shows up on the Linux host that actually runs it.
actual=$(find build -mindepth 1 -maxdepth 1 -exec basename {} ';' | sort | xargs)
if [ "$actual" != "$expected" ]; then
  echo "ERROR: build/ no longer matches the paths lmorchard.com excludes from --delete"
  echo "  expected: $expected"
  echo "  actual:   $actual"
  echo "Update this list AND the --exclude list in"
  echo "lmorchard/lmorchard.com/.github/workflows/publish.yml together."
  exit 1
fi

if [ ! -f "$DEPLOY_KEY" ]; then
  echo "ERROR: no deploy key at $DEPLOY_KEY"
  exit 1
fi

# No --delete: this owns 7 paths in a directory of 250-odd files. The key is
# forced through rrsync server-side and confined to /srv/www/lmorchard.com,
# which is why the destination after the colon is empty.
#
# Flags per the aerostat02 README: -rlptvz or -a exit 23 against the root-owned
# site directory, after transferring every file correctly.
rsync -rltvz --omit-dir-times \
  -e "ssh -i $DEPLOY_KEY -o IdentitiesOnly=yes" \
  ./build/ webdeploy@aerostat02.lmorchard.com:

echo "=== $(date -Is) published ok ==="
