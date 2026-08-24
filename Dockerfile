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
# them.
#
# npm ci, not the yarn install the GitHub workflow used. yarn 1.x resolves every
# platform-specific optional dependency regardless of platform, so it fails here
# on @rollup/rollup-win32-x64-msvc -- a Windows binary this build will never
# need. npm honours the os/cpu fields and installs only the matching one. It is
# also the reproducible choice: ci installs the lockfile exactly, where
# `yarn install` was free to resolve fresh versions.
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .

# clean && fetch && build. Writes build/, which compose mounts out to the host.
CMD ["yarn", "run", "build:production"]
