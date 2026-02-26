---
name: ton-blueprint-compilation
description: compile(), getCompilerConfigForContract(), CompilerConfig, compilables, hooks, build output.
---

# Compilation

Blueprint compiles Tolk, FunC, and Tact contracts. Use `compile()` in tests/scripts or the `blueprint build` CLI.

## Programmatic compile

```ts
import { compile, getCompilerConfigForContract, CompilerConfig, CompileOpts } from '@ton/blueprint';

// Compile by contract name (resolves .compile.ts or tact.config.json)
const code: Cell = await compile('MyContract');

// With options: hooks user data, debug info, build as library cell
const code2 = await compile('MyContract', {
    hookUserData: { env: 'test' },
    debugInfo: true,
    buildLibrary: true,
});
```

Contract name must match a compilable: either `compilables/<Name>.compile.ts` (or under `wrappers/` when `separateCompilables` is false) or a Tact contract with `tact.config.json`.

## Compiler config resolution

- **Tact:** If `getTactConfigForContract(name)` finds a Tact config, that is used; Tact puts generated wrappers in `build/<name>/`.
- **FunC/Tolk:** Otherwise config is loaded from `extractCompilableConfig(path)` for `<name>.compile.ts` in the compilables directory.

```ts
import { getCompilerConfigForContract, getCompilablesDirectory } from '@ton/blueprint';

const config = await getCompilerConfigForContract('Counter');
const dir = await getCompilablesDirectory(); // 'compilables' or 'wrappers' per config
```

## CompilerConfig and hooks

Config can be CompilableConfig (FunC/Tolk/Tact legacy) or TactCompilerConfig. Common options:

- **preCompileHook(params: HookParams): Promise<void>** — runs before compile; `params.userData` from `CompileOpts.hookUserData`.
- **postCompileHook(code: Cell, params: HookParams): Promise<void>** — runs after compile.
- **buildLibrary?: boolean** — output as library cell (see docs.ton.org library-cells).

Compilable-specific: `lang` ('func' | 'tolk' | 'tact'), `targets`, `sources`, `entrypoint`, `optimizationLevel`, etc., depending on language.

## Build output

- **FunC/Tolk:** Build writes artifacts (e.g. to `build/`); `doCompile` returns `FuncCompileResult` / `TolkCompileResult` with `code`, `version`, `snapshot`, etc.
- **Tact:** Generated files in `build/<Contract>/`; result includes `fs` (virtual files) and `.pkg`.
- **Library cell:** Use `buildLibrary: true` in config or `CompileOpts` to get a library cell via `libraryCellFromCode(code)`.

## Exports

- `compile(name, opts?)` — returns `Promise<Cell>` (compiled code).
- `doCompile(name, opts?)` — returns full result (`TactCompileResult | FuncCompileResult | TolkCompileResult`).
- `getCompilerConfigForContract(name)` — returns `Promise<CompilerConfig>`.
- `getCompilablesDirectory()` — returns `'compilables'` or `'wrappers'` per `config.separateCompilables`.
- `libraryCellFromCode(code: Cell)` — packs code hash into library cell.
- Types: `CompileOpts`, `HookParams`, `CompilerConfig`, `CompilableConfig`, `TactCompileResult`, `FuncCompileResult`, `TolkCompileResult`.

<!--
Source references:
- https://github.com/ton-org/blueprint/blob/main/README.md (Building contracts)
- sources/ton-blueprint/src/compile/compile.ts
- sources/ton-blueprint/src/compile/CompilerConfig.ts
- sources/ton-blueprint/src/index.ts
-->
