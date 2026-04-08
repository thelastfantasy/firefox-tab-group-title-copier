# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm build        # Compile TypeScript + copy static assets to dist/
pnpm watch        # Watch mode (rebuild on change)
pnpm typecheck    # Type check only (no output files)
pnpm package      # Build + package as .xpi (output: web-ext-artifacts/)
pnpm dev          # Build + launch Firefox with extension loaded
```

There are no tests. After editing source files, run `pnpm typecheck` then `pnpm build`.

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

Typical flow (main is protected — no direct commits):
1. Develop feature on a branch
2. Run `/bump-version` on the feature branch — updates files, commits, and creates the tag locally
3. Push the branch and open a PR
4. After the PR is merged, run `/release` to push the tag and trigger `release.yml`

Use `pnpm` for all package operations.

`release.yml` builds from source, packages the XPI, creates a GitHub Release, and submits to AMO. The build is not minified — esbuild only transpiles TypeScript. Source archive via `git archive` is included for AMO review.

## Localization

Add new strings to all three files: `static/_locales/en/messages.json`, `zh/`, `ja/`. Use `browser.i18n.getMessage('key')` in TypeScript, or `data-i18n="key"` attribute in HTML.
