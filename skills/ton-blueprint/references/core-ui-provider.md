---
name: ton-blueprint-ui-provider
description: UIProvider interface for scripts — write, prompt, input, choose, setActionPrompt, clearActionPrompt, inputAddress.
---

# UIProvider

Scripts and CLI runners receive a `UIProvider` (e.g. `InquirerUIProvider`) for user interaction. Use it to write messages, prompt for input, or show status instead of hard-coding `console.log` or `readline`.

## Interface

| Method | Purpose |
|--------|---------|
| `write(message: string)` | Output a line to the user (console/UI). |
| `prompt(message: string): Promise<boolean>` | Yes/no confirmation. |
| `input(message: string): Promise<string>` | Free-text input. |
| `inputAddress(message: string, fallback?: Address): Promise<Address>` | Prompt for TON address with optional fallback. |
| `choose<T>(message, choices: T[], display: (v: T) => string): Promise<T>` | Pick one option from a list. |
| `setActionPrompt(message: string)` | Set a persistent status line (e.g. "Awaiting deployment..."). |
| `clearActionPrompt()` | Clear the status line. |

## Usage in scripts

Scripts receive `NetworkProvider`; get UI via `provider.ui()`:

```ts
export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();
    ui.write('Deploying contract...');
    ui.setActionPrompt('Waiting for confirmation...');
    // ... send deploy, wait
    ui.clearActionPrompt();
    const ok = await ui.prompt('Open in explorer?');
    if (ok) { /* ... */ }
}
```

## Usage in runners

CLI runners receive `(args, ui, runnerContext)`; use `ui` for all prompts and output so behavior stays consistent across interactive and non-interactive use.

<!--
Source references:
- sources/ton-blueprint/src/ui/UIProvider.ts
- sources/ton-blueprint/src/network/createNetworkProvider.ts (provider.ui())
-->
