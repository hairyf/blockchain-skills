---
name: foundry-chisel
description: Chisel Solidity REPL — run snippets, quick checks.
---

# Chisel

Chisel is Foundry's Solidity REPL. Use it for one-off expressions, quick contract checks, or exploring EVM behavior without writing full tests.

## Usage

```bash
chisel
npx --yes @foundry-rs/chisel@nightly
```

Runs inside or outside a Foundry project. At the prompt you can type Solidity snippets and see results (e.g. `uint x = 1 + 2;`).

## When to use

- Try small Solidity snippets without creating a test file.
- Inspect return values or reverts interactively.
- Quick sanity checks (hashing, ABI encoding, etc.) when scripting or debugging.

## Key points

- Chisel is separate from Forge/Cast/Anvil; no `foundry.toml` required for one-off runs.
- For project-specific code, run from the project dir so remappings and dependencies apply if Chisel loads them.
- Prefer `forge test` for reproducible, versioned tests; Chisel for ad-hoc exploration.

<!--
Source references:
- https://getfoundry.sh/chisel
- sources/foundry/npm/@foundry-rs/chisel/README.md
-->
