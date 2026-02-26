---
name: ton-blueprint-verify
description: Verify deployed contracts on verifier.ton.org — command, flags, compiler version, custom API.
---

# Contract verification

Blueprint can verify a deployed contract on [verifier.ton.org](https://verifier.ton.org) so the source is publicly linked to the on-chain code.

## Usage

```bash
blueprint verify [ContractName] --mainnet
blueprint verify MyContract --testnet --compiler-version 0.4.4-newops.1
blueprint verify --list-verifiers
```

If contract name is omitted, an interactive contract selection is shown.

## Flags

| Flag | Description |
|------|-------------|
| `--mainnet` / `--testnet` | Network. Custom network not allowed for verify. |
| `--verifier` | Verifier ID (default: `verifier.ton.org`). |
| `--list-verifiers` | List available verifiers for the selected network(s). |
| `--compiler-version` | Exact compiler version string (e.g. `0.4.4-newops.1`). Does not change the local compiler; used for the verifier payload. |
| `--custom`, `--custom-version`, `--custom-key`, `--custom-type` | Use custom API; `--custom-type` must be `mainnet` or `testnet`. |

## Flow (agent-oriented)

1. Resolve contract (arg or interactive).
2. Create network provider (no custom network type; mainnet/testnet/tetra allowed).
3. Compile locally with `doCompile(selectedContract, { buildLibrary: false })`.
4. Get deployed address: prompt user, or lookup by code hash via dton.io GraphQL.
5. Build source payload (Func/Tact/Tolk) and send to verifier backend `/source`.
6. Collect signatures until verifier quorum; send verification message to verifier registry contract.
7. Output success URL: `https://verifier.ton.org/<address>?testnet=true` if testnet.

Verifier config is fetched from: `https://raw.githubusercontent.com/ton-community/contract-verifier-config/main/config.json`. Verifier registry addresses: mainnet `EQD-BJSVUJviud_Qv7Ymfd3qzXdrmV525e3YDzWQoHIAiInL`, testnet `EQCsdKYwUaXkgJkz2l0ol6qT_WxeRbE_wBCwnEybmR0u5TO8`.

## Custom network and config

When using a custom API for verify, specify `--custom-type mainnet` or `--custom-type testnet`; custom type is required. You can use `blueprint.config.ts` `network` so that `--custom` etc. are implied.

<!--
Source references:
- https://github.com/ton-org/blueprint/blob/main/README.md (Contract Verification Using Custom Network)
- sources/ton-blueprint/src/cli/verify.ts
- sources/ton-blueprint/src/cli/constants.ts (helpMessages.verify)
-->
