---
name: bitcoin-core-rpc
description: JSON-RPC endpoints, parameters, versioning, and security.
---

# JSON-RPC Interface

The headless daemon `bitcoind` has JSON-RPC enabled by default; the GUI has it disabled unless `-server` is set.

## Endpoints

- **`/`** — Always active. Handles non-wallet RPCs; wallet RPCs only when exactly one wallet is loaded.
- **`/wallet/<walletname>/`** — For wallet RPCs when multiple wallets are loaded. Use for all wallet requests when more than one wallet. `bitcoin-cli -rpcwallet=<name>` targets this.

Example:

```sh
curl --user alice --data-binary '{"jsonrpc":"2.0","id":"0","method":"getblockcount","params":[]}' -H 'content-type: application/json' localhost:38332/
curl --user alice --data-binary '{"jsonrpc":"2.0","id":"0","method":"getbalance","params":[]}' -H 'content-type: application/json' localhost:38332/wallet/desc-wallet
```

## Parameters

Both by-position and by-name (JSON-RPC spec) are supported. A convenience named parameter `args` can be an array of initial positional values combined with other named params.

```sh
bitcoin-cli createwallet mywallet false false "" false false true
bitcoin-cli -named createwallet wallet_name=mywallet load_on_startup=true
bitcoin-cli -named createwallet args='["mywallet"]' load_on_startup=true
```

`bitcoin rpc` can be used instead of `bitcoin-cli -named`.

## Versioning

RPC is implicitly versioned by Bitcoin Core major version. Version tuple is in `getnetworkinfo` → `version`. Deprecated features can often be re-enabled for one major version via `-deprecatedrpc=...`; release notes document deprecations.

## JSON-RPC 2.0 vs 1.1

- Request: use `"jsonrpc": "2.0"` for 2.0; otherwise 1.1.
- 2.0: response has only `result` or `error`; HTTP 200 unless server error; notifications (no `id`) supported (HTTP 204).

## Security

RPC can spend funds, affect verification, and read private data. Securing the executable and limiting who can reach RPC (auth, bind address, firewall) is critical. Do not run security-sensitive operations on shared or untrusted hosts. See doc for securing local network access and cookie/auth usage.

<!--
Source references:
- https://github.com/bitcoin/bitcoin doc/JSON-RPC-interface.md
-->
