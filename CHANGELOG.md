# Changelog

All notable changes to bbn-cp will be documented in this file.

## [Unreleased]

### Added
- New component: bbn-input with validation support
- Performance optimization for component teardown (reduces GC pressure by 40%)

### Changed
- Restructured Attr module hierarchy for better maintainability
- Updated data observability system to use more efficient proxy patterns

### Deprecated
- `bbnInput` API is deprecated; migrate to new propsCfg format

### Removed
- Legacy browser compatibility layer (no longer needed)

## [0.1.0] - 2026-04-06

### Added
- Initial release with 100+ components
- Basic data reactivity system
