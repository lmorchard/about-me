# Modernization Plan

This document tracks the modernization efforts for the about-me project.

## Phase 1: Security Fixes ✅ COMPLETED

### Completed Items:

1. **✅ Removed Twitter Feature**
   - Deleted `/cards/Twitter/` directory
   - Removed Twitter import from `templates/index.js`
   - Removed all Twitter environment variables from GitHub Actions workflows
   - Uninstalled `twitter` and `twitter-text` packages
   - **Impact**: Eliminated all Twitter-related security vulnerabilities

2. **✅ Replaced watch with chokidar**
   - Uninstalled deprecated `watch` package (had prototype pollution vulnerability)
   - Installed `chokidar-cli` as dev dependency
   - Updated watch script in `package.json`
   - **Impact**: Eliminated 2 high severity vulnerabilities

3. **✅ Updated safe packages**
   - Updated `dotenv` from 17.2.2 to 17.2.3
   - Updated `marked` from 16.3.0 to 16.4.1
   - Kept `globby` at 11.1.0 (v15 is ESM-only, migration to ESM in Phase 3)

4. **✅ Replaced PocketCasts Package with Custom Client**
   - Analyzed `pocketcasts@1.0.1` package source code to understand API
   - Created simplified custom client in `lib/pocketcasts-client.js` using native fetch
   - Key insights from package analysis:
     - Correct API base: `https://api.pocketcasts.com` (not web player URL)
     - Login requires `scope: 'webplayer'` parameter
     - History endpoint uses POST, not GET
   - Updated `cards/PocketCasts/fetch.js` to use custom client
   - Uninstalled `pocketcasts` package
   - **Impact**: Eliminated final 6 vulnerabilities (2 critical, 4 moderate)

### Security Status:

**Before Phase 1**: 10 vulnerabilities (2 critical, 3 high, 5 moderate)
**After Phase 1**: **0 vulnerabilities** ✅
**Improvement**: Eliminated all 10 vulnerabilities (100% reduction)
**Remaining**: None!

### Files Changed:

- `package.json` - Updated dependencies, replaced watch script, removed pocketcasts
- `templates/index.js` - Removed Twitter import
- `.github/workflows/*.yml` - Removed Twitter environment variables
- `cards/PocketCasts/fetch.js` - Updated to use custom client
- `lib/pocketcasts-client.js` - Created working custom client based on package analysis
- `cards/Twitter/` - Deleted entire directory

---

## Phase 2: Code Quality (In Progress)

### Completed Items:

1. **✅ Add ESLint + Prettier**
   - Installed eslint, prettier, eslint-config-prettier, eslint-plugin-prettier
   - Created `eslint.config.js` using new ESLint 9 flat config format
   - Created `.prettierrc` with project code style preferences
   - Created `.prettierignore` to exclude build artifacts
   - Added npm scripts: `lint`, `lint:fix`, `format`, `format:check`
   - Auto-fixed 100+ formatting issues across codebase
   - Remaining: 53 unused variable warnings (acceptable, can clean up later)
   - **Impact**: Consistent code formatting and style enforcement

### Remaining Items:

2. **Add Basic Testing** (Planned)
   ```bash
   npm install --save-dev vitest
   ```
   - Create test files for card components
   - Test data fetching logic
   - Test template rendering

3. **Add Environment Variable Validation** (Planned)
   ```bash
   npm install zod
   ```
   - Create `lib/env.js` with zod schemas
   - Validate all environment variables at startup
   - Provide helpful error messages

4. **Improve Error Handling** (Planned)
   - Update `lib/fetch.js` to not exit on single failure
   - Return error objects in data
   - Display errors in UI gracefully

---

## Phase 3: Modernization (Planned)

### Planned Items:

1. **Migrate to ESM**
   - Add `"type": "module"` to package.json
   - Convert all `require()` to `import`
   - Update all `module.exports` to `export`
   - Update globby to v15

2. **Replace moment with date-fns**
   ```bash
   npm uninstall moment
   npm install date-fns
   ```
   - Smaller bundle size (23x)
   - Better tree-shaking
   - Modern API

3. **Replace feedparser**
   - Package last updated 7 years ago
   - Consider:
     - `rss-parser` (modern, maintained)
     - Native XML parsing with cheerio
     - Direct fetch + parse

4. **Add TypeScript (Optional)**
   - Gradual migration using JSDoc first
   - Add `typescript` and `tsx`
   - Create `tsconfig.json`
   - Migrate file by file

---

## Phase 4: Polish (Planned)

### Planned Items:

1. **Add Makefile**
   - Common tasks: `make dev`, `make build`, `make test`
   - Easier than remembering npm scripts

2. **Improve Documentation**
   - Better README.md with setup instructions
   - CONTRIBUTING.md for adding new cards
   - Document architecture
   - Add JSDoc comments

3. **Performance Optimizations**
   - Add caching layer for API responses
   - Image optimization with sharp
   - Service worker for offline support
   - Lazy loading for images

4. **CI/CD Improvements**
   - Add automated tests to GitHub Actions
   - Add linting to PRs
   - Automated dependency updates with Dependabot

---

## Notes

- **Philosophy**: Gradual, pragmatic improvements
- **Priority**: Security > Quality > Modernization > Polish
- **Approach**: Each phase should leave project in working state
- **Testing**: Manual testing after each phase, automated in Phase 2+
