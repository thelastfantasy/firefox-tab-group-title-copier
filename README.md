# Firefox Tab Group Title Copier

A Firefox extension that allows you to copy all tab titles from tab groups with a single click.

[中文文档](README.zh.md)

## Features

- **Display Tab Groups**: Shows all your tab groups organized by window
- **Copy All Titles**: Copy all tab titles from any tab group to clipboard (plain text or JSON)
- **Multi-language Support**: Available in English, Chinese, and Japanese
- **Easy Access**: Available via toolbar button

## Installation

### From Firefox Add-ons (AMO)

Install directly from [Firefox Add-ons](https://addons.mozilla.org/).

### Development Installation

1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/thelastfantasy/firefox-tab-group-title-copier.git
   cd firefox-tab-group-title-copier
   npm install
   npm run build
   ```
2. Open Firefox and navigate to `about:debugging`
3. Click "This Firefox" → "Load Temporary Add-on"
4. Select `dist/manifest.json`

## Usage

1. Click the extension icon in the toolbar
2. A popup shows all your tab groups organized by window
3. Click any group header to expand and see its tabs
4. Click the copy button to copy tab titles:
   - **Text button** (`📄`): copies titles as plain text, one per line
   - **JSON button** (`</>`): copies titles and URLs as a JSON array

## Supported Languages

- English
- 中文 (Chinese)
- 日本語 (Japanese)

The extension automatically detects your browser language.

## Development

### Requirements

- Node.js 20+
- npm

### Project Structure

```
firefox_copy_tabgroup_titles/
├── src/                    # TypeScript source files
│   ├── popup.ts            # Popup logic
│   ├── i18n.ts             # Internationalization module
│   └── globals.d.ts        # WebExtension API type declarations
├── static/                 # Static assets (copied to dist/ as-is)
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.css
│   ├── icon.svg / icon.png
│   └── _locales/           # Language files
│       ├── en/messages.json
│       ├── zh/messages.json
│       └── ja/messages.json
├── dist/                   # Build output (gitignored), loaded by Firefox
├── build.mjs               # esbuild build script
├── tsconfig.json
└── package.json
```

### npm Scripts

| Command | Description |
|---|---|
| `npm run build` | Compile TypeScript and copy static assets to `dist/` |
| `npm run watch` | Watch mode for development |
| `npm run typecheck` | Run TypeScript type checking only |
| `npm run package` | Build and package as `.xpi` |
| `npm run dev` | Build and launch Firefox with the extension loaded |

### Build Notes for AMO Reviewers

This extension uses TypeScript compiled by [esbuild](https://esbuild.github.io/). The build is **not minified or obfuscated** — esbuild only performs TypeScript-to-JavaScript transpilation.

To reproduce the build from source:
```bash
npm ci
npm run build
# dist/ now contains the exact files submitted to AMO
```

## Permissions

- `tabs`: Access tab information and titles
- `tabGroups`: Access tab group information

## Support

If you find this extension useful, consider supporting its development:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/jade913)

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
