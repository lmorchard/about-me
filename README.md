# about-me
playing with an about me page

## Building and publishing

The site is built hourly in a container on `myriad-docker` and published to
`aerostat02`, which serves `lmorchard.com` from local disk.

```bash
cd ~/docker/about-me
docker compose run --rm build     # build only, into ./build
scripts/publish.sh                # git pull, build, then rsync to aerostat02
```

`scripts/publish.sh` is the cron entrypoint. The container **only builds** — it
holds no key for aerostat02 and the host does the rsync, so the two sets of
secrets stay apart: the container needs the 23 API tokens in `.env`, the host
needs the deploy key, and neither needs the other's.

### This is not the whole site

`lmorchard.com` has two publishers. This one owns exactly seven paths —
`index.html`, `index.css`, `index.json`, `bio.md`, `llms.txt`, `resume.pdf`,
`assets/` — and rsyncs them **without `--delete`**, because it owns seven files
in a directory of 250-odd. Everything else (`images/`, `webfinger/`,
`.well-known/`, `resume.html`, the 2017 archive) is hand-maintained in
[lmorchard/lmorchard.com](https://github.com/lmorchard/lmorchard.com), which
publishes with `--delete` but excludes these seven so it can neither remove nor
revert them.

That duplicated list is a coupling between two repos, so `publish.sh` fails if
`build/` grows a path the exclude list does not cover. Change the two together.

### Setup on a new host

```bash
git clone https://github.com/lmorchard/about-me.git ~/docker/about-me
cd ~/docker/about-me
cp /path/to/.env .env && chmod 600 .env      # 23 API credentials
ssh-keygen -t ed25519 -N '' -C 'about-me container' -f ~/.ssh/about-me-deploy
# add the public half to caddy_sites[lmorchard.com].deploy_keys in the
# aerostat02 repo, then deploy it
ssh-keyscan -H aerostat02.lmorchard.com >> ~/.ssh/known_hosts
./scripts/publish.sh
```

The `ssh-keyscan` line is easy to forget and fails late — the build runs for 40
seconds and then rsync dies with `Host key verification failed`. Worth comparing
the scanned fingerprints against a host you already trust rather than accepting
them blind.

Cron entry, matching the convention on `myriad-docker`:

```
7 * * * * /usr/bin/flock -n /tmp/about-me-publish.lock /home/lmorchard/docker/about-me/scripts/publish.sh >> /home/lmorchard/.local/log/about-me.log 2>&1
```

Minute 7 rather than 0 because that host already runs jobs on the hour.

### Why not GitHub Actions

It used to publish from there. GitHub disables a scheduled workflow after 60
days without a push, and that is exactly what happened — the schedule went
`disabled_inactivity` and the front page silently stopped rebuilding for two
days. A host timer has no such failure mode, and the API credentials stay in the
homelab.
