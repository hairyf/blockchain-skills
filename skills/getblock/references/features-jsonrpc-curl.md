---
name: getblock-jsonrpc-curl
description: Test GetBlock JSON-RPC with cURL — eth_blockNumber, eth_chainId, eth_getBalance examples.
---

# Testing GetBlock with cURL

Use POST requests with JSON-RPC payloads to the GetBlock endpoint URL (token in path). Content-Type: application/json.

## Block number

```bash
curl --location --request POST 'https://go.getblock.io/<ACCESS_TOKEN>/' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params": [],
    "id": "getblock.io"
  }'
```

Response `result` is hex block number (e.g. `"0x1449641"`).

## Chain ID

```bash
curl ... --data-raw '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":"getblock.io"}'
```

e.g. `0x1` = Ethereum mainnet.

## Account balance

```bash
curl ... --data-raw '{
  "jsonrpc":"2.0",
  "method":"eth_getBalance",
  "params":["<ACCOUNT_ADDRESS>","latest"],
  "id":"getblock.io"
}'
```

Result is balance in wei (hex). Replace `<ACCESS_TOKEN>` and `<ACCOUNT_ADDRESS>` with real values. For full method list and examples, use GetBlock API Reference.

<!--
Source references:
- https://github.com/GetBlock-io/getblock-docs
- getting-started/testing-rpc-connection/using-curl-for-testing.md
- api-reference/overview.md
-->
