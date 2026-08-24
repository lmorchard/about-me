# Build image for the about-me site generator.
#
# The full node:22 image rather than -slim or -alpine: this build pulls from a
# dozen third-party APIs through a large dependency tree, and the smaller images
# lack the toolchain any native module would need to compile. Disk is cheap on
# the host that runs this; a failed hourly build at 03:00 is not.
#
# The container only ever *builds*. It holds no deploy key and cannot reach
# aerostat02 -- the host rsyncs build/ afterwards. See scripts/publish.sh.
FROM node:22

WORKDIR /app

# Dependencies first, so an edit to templates or content does not reinstall
# them. yarn install without --frozen-lockfile to match what the GitHub
# workflow did for years; this repo carries both a yarn.lock and a
# package-lock.json, and pinning strictly here would be a behaviour change
# bundled into a hosting move.
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# clean && fetch && build. Writes build/, which compose mounts out to the host.
CMD ["yarn", "run", "build:production"]
