# Firefox Tab Group Title Copier

A Firefox extension that allows you to copy all tab titles from tab groups with a single click.

## Features

- **Display Tab Groups**: Shows all your tab groups in a clean interface
- **Copy All Titles**: Copy all tab titles from any tab group to clipboard
- **Multi-language Support**: Available in English, Chinese, and Japanese
- **Easy Access**: Available via toolbar button and sidebar

## Installation

### Temporary Installation (Development)

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox"
3. Click "Load Temporary Add-on"
4. Select the `manifest.json` file from this repository

### Permanent Installation

This extension is not yet published to Firefox Add-ons. For permanent installation, you can:

1. Package the extension as a .xpi file
2. Install it manually in Firefox

## Usage

### Via Toolbar Button
1. Click the extension icon in the toolbar
2. A popup will show all your tab groups
3. Click any group to expand and see its tabs
4. Click "Copy All Tab Titles" to copy all titles from that group

### Via Sidebar
1. Open the sidebar (Ctrl+B or Cmd+B)
2. Select "Tab Title Copier" from the sidebar menu
3. Use the same interface to copy tab titles

## Supported Languages

- English
- 中文 (Chinese)
- 日本語 (Japanese)

The extension automatically detects your browser language.

## Development

### File Structure
```
firefox_copy_tabgroup_titles/
├── manifest.json          # Extension manifest
├── popup.html            # Popup interface
├── popup.js              # Popup functionality
├── popup.css             # Popup styles
├── sidebar.html          # Sidebar interface
├── sidebar.js            # Sidebar functionality
├── sidebar.css           # Sidebar styles
├── i18n.js               # Internationalization
├── icon.svg              # Extension icon
├── _locales/             # Language files
│   ├── en/messages.json
│   ├── zh/messages.json
│   └── ja/messages.json
└── README.md
```

### Building

This extension uses standard Firefox WebExtensions API and requires no build process.

## Permissions

This extension requires the following permissions:

- `tabs`: To access tab information and titles
- `tabGroups`: To access tab group information

## Support

If you find this extension useful, consider supporting its development:

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/jade913)

## License

MIT License

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.