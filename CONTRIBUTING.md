# bbn-cp Contributor Guidelines

Keep it simple. Read this, then commit.

---

## 1. Commit Messages

Use **Conventional Commits** format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | When to use | Example |
|------|-------------|---------|
| `feat` | New feature | `feat(cp): Add bbn-button component` |
| `fix` | Bug fix | `fix(data): Fix memory leak in watcher` |
| `perf` | Performance improvement | `perf(lifecycle): Optimize teardown cleanup` |
| `refactor` | Code reorganization | `refactor(utils): Extract shared DOM helpers` |
| `docs` | Documentation changes | `docs(api): Update component API reference` |
| `test` | Test additions/updates | `test(components): Add button integration tests` |
| `chore` | Maintenance tasks | `chore(build): Update build scripts` |

### Scope (optional)

Use one of these: `cp`, `data`, `lifecycle`, `utils`, `components`, `tests`, `docs`

### Examples

```bash
# Good commit messages
git commit -m "feat(cp): Add bbn-input component with validation"
git commit -m "fix(data): Fix watcher cleanup on disconnect"
git commit -m "perf(lifecycle): Reduce teardown GC pressure by 40%"
git commit -m "refactor(utils): Extract DOM helpers to shared module"

# Bad examples (avoid these)
git commit -m "WIP: working on input component"
git commit -m "Fix bug in data system"
git commit -m "Update tests and fix some issues"
```

---

## 2. Changelog Updates

### When to update changelog

- **Always** for new features, breaking changes, or API modifications
- **Optional** for minor bug fixes (but recommended)
- **Never** for internal refactoring only

### How to add an entry

1. Open `CHANGELOG.md`
2. Find the `[Unreleased]` section at the top
3. Add your change under the appropriate heading:

```markdown
## [Unreleased]

### Added
- New component: bbn-input with validation support

### Changed
- Updated data observability system to use more efficient proxy patterns

### Deprecated
- `bbnInput` API is deprecated; migrate to new propsCfg format

### Removed
- Legacy browser compatibility layer (no longer needed)
```

### Changelog headings

| Heading | When to use |
|---------|-------------|
| **Added** | New features, components, capabilities |
| **Changed** | API changes, behavior modifications |
| **Deprecated** | Features marked for removal |
| **Removed** | Deleted functionality |
| **Fixed** | Bug fixes (optional) |

### Breaking change notation

If your change breaks existing code:

```markdown
## [Unreleased]

### Changed
- Restructured Attr module hierarchy for better maintainability

> ⚠️ BREAKING CHANGE: Previous bbn-input API is deprecated; use new propsCfg format instead.
```

---

## 3. Code Organization Rules

### File naming conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | `bbn-` prefix + kebab-case | `button/index.js`, `input/define.js` |
| Internal modules | camelCase, no prefix | `defineComponent.js`, `createProxy.js` |
| Private methods | `_` prefix | `_initData()`, `_cleanup()` |
| Constants | UPPER_SNAKE_CASE | `MAX_RECURSION_DEPTH`, `DEFAULT_TIMEOUT` |

### Module structure

```
src/
├── core/          # Core functionality (no dependencies)
│   ├── component/ # Component definition utilities
│   │   └── define.js
│   ├── data/      # Data reactivity system
│   │   └── proxy.js
│   └── lifecycle/ # Lifecycle hooks and cleanup
│       └── teardown.js
├── components/    # Individual component definitions
│   └── button/
│       ├── index.js
│       └── tests/button.spec.js
├── utils/         # Shared utilities (no component logic)
│   └── dom.js
└── tests/         # Test files
```

### What goes where

| File type | Location |
|-----------|----------|
| Component definitions | `components/<name>/` |
| Core utilities | `core/` or `utils/` |
| Shared helpers | `utils/` |
| Tests for components | Next to component files in `tests/` |

---

## 4. Documentation Requirements

### Every public API needs JSDoc

```javascript
/**
 * Creates a new component definition from configuration.
 * @param {Object} config - Component configuration object
 * @param {string} config.tag - HTML tag name for the component
 * @returns {Promise<Component>} Resolves with created component
 */
export function defineComponent(config) {
  // implementation
}
```

### Minimum JSDoc template

```javascript
/**
 * <Brief description of what this does>
 * 
 * @param {Type} param1 - Description of parameter 1
 * @returns {Type} Description of return value
 */
function myFunction(param1) {
  // code
}
```

---

## 5. Performance Guidelines

### Memory management (critical!)

- ✅ Components MUST clean up all event listeners on disconnect
- ✅ Data watchers MUST unsubscribe when component is destroyed
- ❌ Avoid closure captures that prevent garbage collection

### Rendering

- ✅ Batch DOM updates using `requestAnimationFrame`
- ✅ Use `documentFragment` for bulk insertions
- ✅ Defer non-critical work to next tick

---

## 6. Quick Reference Checklist

Before committing:

- [ ] Commit message follows Conventional Commits format
- [ ] Changelog updated (if feature/API change)
- [ ] Code organized per file naming conventions
- [ ] Public APIs documented with JSDoc
- [ ] No unnecessary dependencies added

---

## 7. Questions?

If you're unsure about:
- Where to put a new module → Ask in `core/` vs `utils/`
- Whether something is a breaking change → When API surface changes
- How to phrase a commit message → Use examples above as template

---

**Keep it simple. Read once, then just follow the rules.**
```

## 📄 `COMMIT_CONVENTIONS.md` (Alternative - Even More Minimal)

If you want an even shorter version:

```markdown
# Commit Conventions for bbn-cp

## Format

```
<type>(<scope>): <description>
```

## Types

- `feat` — New feature
- `fix` — Bug fix  
- `perf` — Performance improvement
- `refactor` — Code reorganization
- `docs` — Documentation changes
- `test` — Test additions/updates
- `chore` — Maintenance tasks

## Scopes (optional)

`cp`, `data`, `lifecycle`, `utils`, `components`, `tests`, `docs`

## Examples

```bash
git commit -m "feat(cp): Add bbn-button component"
git commit -m "fix(data): Fix watcher cleanup on disconnect"
git commit -m "perf(lifecycle): Optimize teardown performance"
```

---

## Changelog Rules

1. Update `CHANGELOG.md` for: new features, breaking changes, API modifications
2. Use `[Unreleased]` section at top of file
3. Add under appropriate heading: Added/Changed/Deprecated/Removed/Fixed
4. Breaking changes need "BREAKING CHANGE:" note in commit message

---

## Quick Checklist Before Committing

- [ ] Commit message follows format above
- [ ] Changelog updated (if feature/API change)
- [ ] Code organized per naming conventions
```

