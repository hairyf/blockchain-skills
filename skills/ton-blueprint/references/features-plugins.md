---
name: ton-blueprint-plugins
description: Plugin system — Plugin, PluginRunner, Runner, RunnerContext, adding custom commands.
---

# Plugins

Blueprint supports plugins that add new CLI commands (runners) and help text. Plugins are configured in `blueprint.config.ts` and run in the same process as built-in commands.

## Config

```ts
import { Config } from '@ton/blueprint';
import { ScaffoldPlugin } from 'blueprint-scaffold';

export const config: Config = {
    plugins: [new ScaffoldPlugin()],
};
```

Only named export `config` is used; do not default-export.

## Plugin interface

```ts
import type { Plugin, PluginRunner, Runner, RunnerContext, Args } from '@ton/blueprint';

interface Plugin {
    runners(): PluginRunner[];
}

interface PluginRunner {
    name: string;   // command name, e.g. 'scaffold'
    runner: Runner;
    help: string;   // shown in blueprint help <name>
}

type Runner = (
    args: Args,
    ui: UIProvider,
    context: RunnerContext
) => Promise<void>;

interface RunnerContext {
    config?: Config;
}
```

Plugin commands are merged with built-in ones; duplicate names override (plugin wins). Help for plugin commands is registered so `blueprint help <name>` shows `runner.help`.

## Implementing a plugin

1. Implement `Plugin`: return an array of `{ name, runner, help }`.
2. In `runner`, use `args` (parsed with `argSpec`), `ui` for output/prompts, and `context.config` for blueprint config.
3. Add the plugin instance to `config.plugins` in `blueprint.config.ts`.

Example (pseudo):

```ts
import { Plugin, PluginRunner, Args, RunnerContext } from '@ton/blueprint';
import type { UIProvider } from '@ton/blueprint';

class MyPlugin implements Plugin {
    runners(): PluginRunner[] {
        return [{
            name: 'mycommand',
            help: 'Usage: blueprint mycommand [options]\nDoes something useful.',
            runner: this.run.bind(this),
        }];
    }
    private async run(args: Args, ui: UIProvider, context: RunnerContext) {
        ui.write('Running mycommand');
        // context.config?.plugins, context.config?.network, etc.
    }
}
```

## Community plugins

- [blueprint-scaffold](https://github.com/1IxI1/blueprint-scaffold) — generate a simple dapp from wrappers.
- [blueprint-misti](https://github.com/nowarp/blueprint-misti) — integrate Misti static analyzer.

<!--
Source references:
- https://github.com/ton-org/blueprint/blob/main/README.md (Plugins)
- sources/ton-blueprint/src/config/Plugin.ts
- sources/ton-blueprint/src/cli/Runner.ts
- sources/ton-blueprint/src/cli/cli.ts (loading plugins, effectiveRunners)
-->
