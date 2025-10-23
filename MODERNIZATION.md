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

### Partial Completion:

4. **⚠️ PocketCasts Package** (Requires More Work)
   - Created custom client in `lib/pocketcasts-client.js` using native fetch
   - **Issue**: Pocket Casts web player API endpoints have changed
   - **Current State**: Reverted to using `pocketcasts@1.0.1` package temporarily
   - **Remaining Vulnerabilities**:
     - 2 critical (form-data)
     - 4 moderate (tough-cookie)
   - **Next Steps**:
     - Research current Pocket Casts API authentication flow
     - Consider alternatives:
       - Use RSS feeds if available
       - Write custom scraper
       - Contact Pocket Casts for official API access
       - Accept vulnerabilities (data fetching only, not user-facing)

### Security Status:

**Before Phase 1**: 10 vulnerabilities (2 critical, 3 high, 5 moderate)
**After Phase 1**: 6 vulnerabilities (2 critical, 4 moderate)
**Improvement**: Eliminated 4 vulnerabilities (60% of original count)
**Remaining**: All from `pocketcasts` package dependency chain

### Files Changed:

- `package.json` - Updated dependencies, replaced watch script
- `templates/index.js` - Removed Twitter import
- `.github/workflows/*.yml` - Removed Twitter environment variables
- `cards/PocketCasts/fetch.js` - Added TODO for custom client
- `lib/pocketcasts-client.js` - Created (not yet working)
- `cards/Twitter/` - Deleted entire directory

---

## Phase 2: Code Quality (Planned)

### Planned Items:

1. **Add ESLint + Prettier**
   ```bash
   npm install --save-dev eslint prettier @eslint/js
   ```
   - Create `.eslintrc.json`
   - Create `.prettierrc`
   - Add lint/format scripts

2. **Add Basic Testing**
   ```bash
   npm install --save-dev vitest
   ```
   - Create test files for card components
   - Test data fetching logic
   - Test template rendering

3. **Add Environment Variable Validation**
   ```bash
   npm install zod
   ```
   - Create `lib/env.js` with zod schemas
   - Validate all environment variables at startup
   - Provide helpful error messages

4. **Improve Error Handling**
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

5. **Complete PocketCasts Custom Client**
   - Research current API
   - Complete `lib/pocketcasts-client.js`
   - Remove `pocketcasts` package
   - Eliminate final 6 vulnerabilities

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
