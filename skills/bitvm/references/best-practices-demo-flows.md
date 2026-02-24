---
name: bitvm-demo-flows
description: Demo prep, funding UTXOs, happy peg-out and successful disprove scenarios.
metadata:
  author: hairy
---

# Demo Flows and Environment

Practical sequences for testing peg-in, peg-out, and disprove without production use. Use **get-funding-amounts** for current minimum sats; values below are illustrative.

## Funding UTXOs (Demo Prep)

Three funding UTXOs (prepare once for all demos):

1. **Peg-in deposit**: ~2,097,447 sats — spendable by depositor (`get-depositor-address`, keys with `-d`).
2. **Peg-out confirm**: ~3,607,030 sats — spendable by operator (`get-operator-address`, `-o`).
3. **Withdrawer peg-out**: ~2,097,274 sats — spendable by operator.

## Happy Path (Rejected Disprove)

Operator asserts correctly; verifier's disprove should fail.

1. **Depositor**: `initiate-peg-in -n -u <TXID>:<VOUT> -d <EVM_ADDRESS>` (UTXO #1).
2. **Operator**: `create-peg-out -t -u <TXID>:<VOUT> -i <PEG_IN_GRAPH_ID>` (UTXO #2).
3. **Verifiers**: `push-nonces -c -i <GRAPH_ID>` then `push-signatures -g -i <GRAPH_ID>` for peg-in and peg-out graphs.
4. **Any**: `broadcast pegin -g <PEG_IN_GRAPH_ID> confirm`; record peg-in confirm txid.
5. **Operator**: In interactive mode, `mock-l2-pegout-event -x -u <PEG_IN_CONFIRM_TXID>:0`.
6. **Operator**: `broadcast tx -g <GRAPH_ID> -u <TXID>:<VOUT> peg_out` (UTXO #3), then `peg_out_confirm`, `kick_off_1`, `kick_off_2`, `assert_initial`, `assert_commit_1`, `assert_commit_2`, `assert_final`.
7. **Verifier**: `broadcast tx -g <GRAPH_ID> -a <BTC_ADDRESS> disprove` (should fail).
8. **Operator**: `broadcast tx -g <GRAPH_ID> take_2`.

## Successful Disprove Path

Operator commits invalid proof; verifier disproves and gets reward.

Same as happy path through kick-off and assert_initial; then:

- Use **invalid** assert commits: `assert_commit_1_invalid`, `assert_commit_2_invalid`, then `assert_final`.
- **Verifier**: `broadcast tx -g <GRAPH_ID> -a <BTC_ADDRESS> disprove` (succeeds).

No `take_2`; operator loses the challenge.

## Environment Setup

- **bridge.toml**: In `~/.bitvm-bridge/` (or `KEY_DIR`), with `[keys]`: `depositor`, `operator`, `verifier`, `withdrawer`, `verifying_key`.
- **.env**: Same directory as CLI (e.g. repo root). Set `BRIDGE_DATA_STORE_CLIENT_DATA_SUFFIX`, AWS vars if used, and `VERIFIERS` (comma-separated verifier pubkeys). For a second verifier instance use a different dir and `KEY_DIR`/separate `bridge.toml` so keys and data don't mix.

Use testnet/regtest and demo funding amounts only; do not use mainnet or production keys.

<!--
Source references:
- sources/bitvm/DEMO_INSTRUCTIONS.md
- sources/bitvm/README.md
-->
