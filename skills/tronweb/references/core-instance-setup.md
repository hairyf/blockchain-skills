---
name: tronweb-instance-setup
description: Create and configure TronWeb instance (fullHost, nodes, headers, privateKey).
---

# TronWeb Instance Setup

How to instantiate TronWeb and set node endpoints, API headers, and default signer.

## Usage

```typescript
import { TronWeb } from 'tronweb';

// Single host (e.g. TronGrid) — fullNode, solidityNode, eventServer all use it
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  headers: { 'TRON-PRO-API-KEY': 'your-api-key' },
  privateKey: 'your-private-key',
});

// Separate event server
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  eventServer: 'https://api.someotherevent.io',
  privateKey: 'your-private-key',
});

// Explicit full / solidity / event nodes
const tronWeb = new TronWeb({
  fullNode: 'https://some-node.tld',
  solidityNode: 'https://some-other-node.tld',
  eventServer: 'https://some-event-server.tld',
  privateKey: 'your-private-key',
});
```

Legacy constructor (retro-compat): `new TronWeb(fullNode, solidityNode, eventServer, privateKey)`. Then `tronWeb.setHeader({ 'TRON-PRO-API-KEY': 'key' })`.

## Key APIs

- **setPrivateKey(privateKey)** — Set default signer; emits `privateKeyChanged`.
- **setAddress(address)** — Set default address (base58 or hex); emits `addressChanged`.
- **setFullNode / setSolidityNode / setEventServer** — Swap node providers.
- **setHeader(headers)** — Apply headers to full, solidity, and event providers.
- **setFullNodeHeader(headers)** / **setEventHeader(headers)** — Per-endpoint headers.
- **defaultBlock** — Set via `setDefaultBlock(blockID)` (`false` | `'latest'` | `'earliest'` | number).
- **feeLimit** — Instance default for contract calls (default `150000000`).

## Key Points

- `fullHost` is a joker: used for full + solidity when set; more specific `fullNode`/`solidityNode`/`eventServer` override.
- Event server is required for `tronWeb.event` and `getEventResult` / `getEventByTransactionID`.
- All methods throw `Error` instances; use `e.message` for error text.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (README.md, src/tronweb.ts)
- https://tronweb.network/docu/docs/intro/
-->
