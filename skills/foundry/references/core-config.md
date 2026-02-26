---
name: foundry-config
description: foundry.toml configuration — profiles, compiler, paths, remappings.
---

# Foundry Config (foundry.toml)

Foundry uses `foundry.toml` at the project root for compiler, test, and tool settings. Agents need to read or write this file when setting up projects, CI, or deployment.

## Minimal config

```toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.28"
```

## Profiles

Use profiles to switch between dev, CI, and production:

```toml
[profile.default]
solc_version = "0.8.28"

[profile.ci]
fuzz = { runs = 256 }
optimizer = true
optimizer_runs = 200

[profile.release]
optimizer = true
optimizer_runs = 10000
```

## Key options

| Option | Purpose |
|--------|---------|
| `src`, `out`, `libs` | Source dir, output dir, library dirs |
| `solc_version` | Solidity compiler version |
| `evm_version` | Target EVM hardfork (e.g. `cancun`, `shanghai`) |
| `optimizer`, `optimizer_runs` | Optimizer on/off and run count (deploy vs runtime gas trade-off) |
| `remappings` | Import path → path (e.g. `@openzeppelin/=lib/openzeppelin-contracts/`) |
| `rpc_endpoints` | Named RPC URLs for scripts (e.g. `mainnet`, `localhost`) |

## Resolving config

Run `forge config` to print the resolved configuration (including defaults and profile merge). Use when debugging or scripting.

## Key points

- One concept per profile; `[profile.default]` is the default.
- `evm_version` should match deployment chain (opcode compatibility).
- Remappings are required for dependencies (e.g. `forge install` then add remapping).
- Scripts and tests can use `--rpc-url` or config `rpc_endpoints` keys.

<!--
Source references:
- https://book.getfoundry.sh/config/overview
- https://getfoundry.sh/forge/reference/config/
-->
