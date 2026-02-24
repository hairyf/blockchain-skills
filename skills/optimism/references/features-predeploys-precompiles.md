---
name: optimism-predeploys-precompiles
description: L2 predeploy addresses and interfaces; OP Stack precompiles (e.g. P256VERIFY).
---

# Predeploys and Precompiles

Predeploys are contracts in genesis at fixed addresses in `0x4200000000000000000000000000000000000xxx`. Precompiles are native EVM extensions at fixed addresses. Use for resolving addresses, gas estimation, and L1 context on L2.

## Key predeploys (non-deprecated)

| Name | Address | Notes |
|------|---------|--------|
| L2ToL1MessagePasser | `0x4200...0016` | `initiateWithdrawal`, `burn`; withdrawal commitments |
| L2CrossDomainMessenger | `0x4200...0007` | `sendMessage`, `relayMessage`, `xDomainMessageSender` |
| L2StandardBridge | `0x4200...0010` | ETH/ERC20 bridge; `bridgeETH`, `bridgeERC20`, finalize |
| GasPriceOracle | `0x4200...000F` | `getL1Fee(bytes)` for L1 data fee; post-Ecotone uses baseFeeScalar etc. from SystemConfig |
| L1Block | `0x4200...0015` | L1 context (number, timestamp, basefee, etc.) per block |
| OptimismMintableERC20Factory | `0x4200...0012` | Deploy OptimismMintableERC20 for bridgeable tokens |
| WETH9 | `0x4200...0006` | Deterministic WETH |
| ProxyAdmin | `0x4200...0018` | Proxy upgrades |
| Fee vaults | `0x4200...0011`, `0019`, `001a`, `001B` | SequencerFeeVault, BaseFeeVault, L1FeeVault, OperatorFeeVault |
| LegacyMessagePasser | `0x4200...0000` | Legacy withdrawals (deprecated for new use) |

LegacyERC20ETH at `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`; deprecated. GovernanceToken at `0x4200...0042`. BeaconBlockRoot (Ecotone) at `0x000F3df6D732807Ef1319fB7B8bB8522d0Beac02`. See spec for full table and version (Legacy/Bedrock/Canyon/Ecotone/Isthmus).

## Precompiles

OP Stack adds:

- **P256VERIFY** (Fjord): `0x0000000000000000000000000000000000000100` — secp256r1 signature verification (RIP-7212). Used for passkeys/Secure Enclave etc.

Standard Ethereum precompiles are unchanged.

## Usage

- Resolve bridge/messenger by predeploy address when building tx or parsing logs.
- Estimate total L2 fee: L2 execution fee + `GasPriceOracle.getL1Fee(serializedTx)` (or equivalent for Ecotone scalar encoding).
- Use L1Block for L1 block number/timestamp in contracts; prefer over deprecated L1BlockNumber.

<!--
Source references:
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/predeploys.md
- https://github.com/ethereum-optimism/specs/blob/main/specs/protocol/precompiles.md
-->
