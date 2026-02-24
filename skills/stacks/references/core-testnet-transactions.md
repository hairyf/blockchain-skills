---
name: stacks-testnet-transactions
description: Stacks testnet config, transaction encoding/signing, contract publish and contract-call via CLI and RPC.
---

# Testnet and Transaction Flow

Use testnet config (e.g. `testnet-follower-conf.toml`) and grant genesis balances via `[[ustx_balance]]` (address + amount in microSTX). Encode and sign transactions with `blockstack-cli`, then submit via POST /v2/transactions.

## Generate keypair and sign

```bash
cargo run --bin blockstack-cli generate-sk --testnet
# Output: secretKey, publicKey, stacksAddress
```

Register the address in testnet config if using genesis balance. Signing uses the secret key (hex).

## Publish a contract

```bash
cargo run --bin blockstack-cli publish <secret_key> <fee_microstx> <nonce> <contract_name> <path/to/contract.clar> --testnet
```

Fee must cover at least 1 microSTX per byte; nonce must increase per sender. Pipe binary output to file then POST:

```bash
cargo run --bin blockstack-cli publish <sk> 515 0 kv-store ./kv-store.clar --testnet | xxd -r -p > tx1.bin
curl -X POST -H "Content-Type: application/octet-stream" --data-binary @./tx1.bin http://localhost:20443/v2/transactions
```

## Contract call (read/write)

```bash
cargo run --bin blockstack-cli contract-call <secret_key> <fee> <nonce> <sender_address> <contract_name> <function_name> -e \"arg1\" -e \"arg2\" --testnet
```

Example: call `get-value` with key `foo`, then `set-value` key `foo` value `bar`, then `get-value` again (nonces 1, 2, 3):

```bash
# get-value "foo"
cargo run --bin blockstack-cli contract-call <sk> 500 1 <sender> kv-store get-value -e \"foo\" --testnet | xxd -r -p > tx2.bin
# set-value "foo" "bar"
cargo run --bin blockstack-cli contract-call <sk> 500 2 <sender> kv-store set-value -e \"foo\" -e \"bar\" --testnet | xxd -r -p > tx3.bin
# get-value "foo" again
cargo run --bin blockstack-cli contract-call <sk> 500 3 <sender> kv-store get-value -e \"foo\" --testnet | xxd -r -p > tx4.bin
```

Submit each with the same curl pattern to the node's `/v2/transactions`.

## Key points

- Nonce must be monotonic per principal; get current nonce from GET /v2/accounts/[principal].
- Testnet node must be running and config must include the sender in `[[ustx_balance]]` if using genesis funding.
- Contract identifier on chain is `{deployer_address}.{contract_name}`; use that for call-read and map_entry.

<!--
Source references:
- sources/stacks/docs/testnet.md
- https://github.com/stacks-network/stacks-blockchain
-->
