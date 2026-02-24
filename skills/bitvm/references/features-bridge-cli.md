---
name: bitvm-bridge-cli
description: BitVM Bridge CLI—keys, addresses, peg-in/peg-out, broadcast, env and config.
metadata:
  author: hairy
---

# BitVM Bridge CLI

The **BitVM CLI** (`bridge` binary) manages Bitcoin keys, peg-ins, peg-outs, and assert/disprove transaction flow. Supports `mainnet`, `testnet`, and `regtest`.

## Invocation

```bash
./target/release/bridge [OPTIONS] <SUBCOMMAND>
```

Build: `cargo build --release`; run from repo root or with `cargo run --bin bridge --`.

## Global Options

- `-r, --verifiers <VERIFIER_PUBKEYS>`: Comma-separated verifier public keys (max 1000). Or set `VERIFIERS` env.
- `-e, --environment <ENVIRONMENT>`: `mainnet` \| `testnet` \| `regtest`. Default: testnet. Or `ENVIRONMENT`.
- `--key-dir <DIRECTORY>`: Directory for private keys. Or `KEY_DIR`.
- `-p, --user-profile <USER_PROFILE>`: User namespace (e.g. `operator_one`, `verifier_0`) for local client data. Or `USER_PROFILE`.

## Key and Address Commands

```bash
# Manage keys (depositor, operator, verifier, withdrawer, vk)
bridge keys -d <SECRET_KEY> -o <SECRET_KEY> -v <SECRET_KEY> -w <SECRET_KEY> -k <VK>

# Minimum funding amounts (testing)
bridge get-funding-amounts

# Operator / depositor addresses and UTXOs
bridge get-operator-address
bridge get-operator-utxos
bridge get-depositor-address
bridge get-depositor-utxos
```

## Peg-In and Peg-Out

```bash
# [DEPOSITOR] Start peg-in (UTXO = TXID:VOUT, spendable by depositor)
bridge initiate-peg-in -n -u <TXID>:<VOUT> -d <EVM_ADDRESS>

# [OPERATOR] Create peg-out graph from peg-in graph id
bridge create-peg-out -t -u <TXID>:<VOUT> -i <PEG_IN_GRAPH_ID>

# MuSig2: push nonces then signatures for a graph
bridge push-nonces --id <GRAPH_ID>
bridge push-signatures --id <GRAPH_ID>
```

## Broadcast Subcommands

```bash
bridge broadcast [COMMAND] [OPTIONS]
# Examples:
bridge broadcast pegin -g <PEG_IN_GRAPH_ID> confirm
bridge broadcast tx -g <GRAPH_ID> -u <TXID>:<VOUT> peg_out
bridge broadcast tx -g <GRAPH_ID> peg_out_confirm
bridge broadcast tx -g <GRAPH_ID> kick_off_1
bridge broadcast tx -g <GRAPH_ID> kick_off_2
bridge broadcast tx -g <GRAPH_ID> assert_initial
bridge broadcast tx -g <GRAPH_ID> assert_commit_1
bridge broadcast tx -g <GRAPH_ID> assert_commit_2
bridge broadcast tx -g <GRAPH_ID> assert_final
bridge broadcast tx -g <GRAPH_ID> -a <BTC_ADDRESS> disprove
bridge broadcast tx -g <GRAPH_ID> take_2
```

For invalid-assert demos: `assert_commit_1_invalid`, `assert_commit_2_invalid`.

## Other Commands

```bash
# Mock L2 peg-out (testing only)
bridge mock-l2-pegout-event -x -u <TXID>:<VOUT>

# Poll and handle tx automatically
bridge automatic

# Interactive prompt
bridge interactive

# Current client status
bridge status
```

## Configuration

- **Keys**: `bridge.toml` in key directory (default `~/.bitvm-bridge/`). Sections: `[keys]` with `depositor`, `operator`, `verifier`, `withdrawer`, `verifying_key`.
- **Env**: `KEY_DIR`, `VERIFIERS`, `ENVIRONMENT`, `USER_PROFILE`. AWS: `BRIDGE_AWS_ACCESS_KEY_ID`, `BRIDGE_AWS_SECRET_ACCESS_KEY`, `BRIDGE_AWS_REGION`, `BRIDGE_AWS_BUCKET`. Data suffix: `BRIDGE_DATA_STORE_CLIENT_DATA_SUFFIX`. FTP/SFTP/FTPS: `BRIDGE_SFTP_*`, `BRIDGE_FTP_*`, `BRIDGE_FTPS_*`, with `*_BASE_PATH` default `/bitvm`.

<!--
Source references:
- sources/bitvm/README.md (BitVM CLI section)
-->
