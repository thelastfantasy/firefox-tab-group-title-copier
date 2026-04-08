# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build        # Compile TypeScript + copy static assets to dist/
npm run watch        # Watch mode (rebuild on change)
npm run typecheck    # Type check only (no output files)
npm run package      # Build + package as .xpi (output: web-ext-artifacts/)
npm run dev          # Build + launch Firefox with extension loaded
```

There are no tests. After editing source files, run `npm run typecheck` then `npm run build`.

## Architecture

This is a Firefox Manifest V3 extension. TypeScript source is compiled by esbuild (no bundling, no minification) into `dist/`, which is the directory Firefox loads.

**Two-layer structure:**
- `src/` — TypeScript source files, compiled to `dist/`
- `static/` — assets copied verbatim to `dist/` at build time (manifest, HTML, CSS, icons, `_locales/`)

**Source files:**
- `src/i18n.ts` — wraps `browser.i18n.*`, auto-localizes `data-i18n` attributes on DOMContentLoaded
- `src/popup.ts` — all extension logic: queries `browser.tabGroups`, builds DOM, handles clipboard copy
- `src/globals.d.ts` — declares global `browser` from `webextension-polyfill` types

The two scripts are **independent** (no imports between them). `popup.html` loads `i18n.js` first, then `popup.js`. `popup.ts` calls `browser.i18n.getMessage()` directly rather than going through the `i18n` module.

**Version number lives in two places and must stay in sync:**
- `package.json` → `"version"`
- `static/manifest.json` → `"version"` (note: `1.1` not `1.1.0` format, matching AMO convention)

Use `/bump-version` command to update both atomically.

## Release Flow

Releases are triggered exclusively by pushing a `v*` tag. Merging to `main` only runs the build CI.

```bash
# After /bump-version:
git push && git push --tags   # triggers release.yml
```

Or use `/release` command which includes pre-flight checks.

`release.yml` builds from source, packages the XPI, creates a GitHub Release, and submits to AMO. The build is not minified — esbuild only transpiles TypeScript. Source archive via `git archive` is included for AMO review.

## Localization

Add new strings to all three files: `static/_locales/en/messages.json`, `zh/`, `ja/`. Use `browser.i18n.getMessage('key')` in TypeScript, or `data-i18n="key"` attribute in HTML.
