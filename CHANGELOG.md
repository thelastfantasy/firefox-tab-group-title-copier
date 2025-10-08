# Changelog

All notable changes to this project will be documented in this file.

## [1.1] - 2025-10-07

### Added
- Font Awesome style SVG icons for copy buttons
  - Text copy button: Document icon (📄)
  - JSON copy button: Code icon (</>)

### Fixed
- Removed invalid "windows" permission from manifest.json (Manifest V3 compatibility)
- Fixed trailing comma in manifest.json that caused JSON parsing errors

### Improved
- Enhanced UI with consistent icon sizing and styling
- Better visual consistency between copy buttons

## [1.0] - Initial Release

### Added
- Basic tab group display functionality
- Window grouping with sequential numbering
- Multi-language support (English, Chinese, Japanese)
- Copy tab titles as plain text
- Copy tab titles and URLs as JSON
- Click to expand/collapse tab lists
- Alternating row colors for tab display
- Tooltip support for full tab titles

### Features
- Display all tab groups across all windows
- Group tab groups by window with sequential numbering
- Copy all tab titles from any group with one click
- Export tab data as JSON with titles and URLs
- Clean, user-friendly interface
- Internationalization support