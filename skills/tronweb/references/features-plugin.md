---
name: tronweb-plugin
description: TronWeb plugin system — register(), pluginInterface, requires, components, fullClass.
---

# Plugin system

TronWeb supports plugging extra behavior via `tronWeb.plugin.register(PluginClass, options?)`. Use for custom modules (e.g. TronLink-style helpers) without modifying core.

## Registering a plugin

```typescript
class MyPlugin {
  constructor(tronWeb) {
    this.tronWeb = tronWeb;
  }
  pluginInterface(options) {
    return {
      requires: '>=6.0.0',  // semver range for TronWeb.version
      components: {
        trx: {
          myMethod() { return this.tronWeb.trx.getCurrentBlock(); }
        }
      }
    };
  }
}

const result = tronWeb.plugin.register(MyPlugin);
// result: { libs: [], plugged: ['myMethod'], skipped: [], error?: string }
```

After registration, `tronWeb.trx.myMethod()` is available. Methods are bound to the target component (e.g. `trx`).

## fullClass mode

To attach a whole class at the same level as `trx` (e.g. `tronWeb.myHelper`):

```typescript
pluginInterface() {
  return { requires: '>=6.0.0', fullClass: true };
}
```

Then the plugin instance is set as `tronWeb.<lowercaseClassName>` and the class on `TronWeb.<ClassName>`.

## Rules

- **Blacklist**: Methods named `constructor` or starting with `_`, or listed in the component’s `pluginNoOverride`, are skipped (not overridden).
- **Version**: If `semver.satisfies(TronWeb.version, pluginInterface.requires)` is false, registration throws.
- **Disabled**: If TronWeb was built with `disablePlugins: true`, `register` returns `{ error: '...' }` and does not plug.

## Key points

- Use `components` to add or replace methods on existing modules (`trx`, etc.); use `fullClass` to add a new top-level module.
- Plugins receive the TronWeb instance and can call any API; keep `requires` aligned with the TronWeb version you depend on.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/lib/plugin.ts)
- https://tronweb.network/docu/docs/intro/
-->