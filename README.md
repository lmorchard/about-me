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

### Why not GitHub Actions

It used to publish from there. GitHub disables a scheduled workflow after 60
days without a push, and that is exactly what happened — the schedule went
`disabled_inactivity` and the front page silently stopped rebuilding for two
days. A host timer has no such failure mode, and the API credentials stay in the
homelab.
