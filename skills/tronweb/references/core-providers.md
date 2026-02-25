---
name: tronweb-providers
description: HttpProvider — host, timeout, headers, request(), isConnected(), setStatusPage.
---

# Providers

TronWeb talks to nodes via **HttpProvider**. The instance uses three providers: `fullNode`, `solidityNode`, and `eventServer` (optional). You can replace them with `setFullNode` / `setSolidityNode` / `setEventServer` or by constructing providers yourself.

## HttpProvider

```typescript
import { providers } from 'tronweb';

const p = new providers.HttpProvider(
  'https://api.trongrid.io',
  30000,   // timeout ms
  '',      // user (basic auth)
  '',      // password
  { 'TRON-PRO-API-KEY': 'your-key' },
  '/'      // statusPage (default '/')
);
```

- **host** — Base URL (trailing slashes removed).
- **timeout** — Request timeout in ms.
- **headers** — Object sent with every request.
- **request(url, payload?, method?)** — `method` `'get'` (payload as query) or `'post'` (payload as body). Returns `Promise<response data>`.
- **isConnected(statusPage?)** — Hits `statusPage` (default `/` or the one set); returns true if response has `blockID` and `block_header`.
- **setStatusPage(path)** — Set path used by `isConnected()`.

## How TronWeb uses providers

- Full node: status page `wallet/getnowblock`; used for live chain and wallet APIs.
- Solidity node: status page `walletsolidity/getnowblock`; used for confirmed state.
- Event server: used by `tronWeb.event`; can use a different host/headers via `setEventServer(provider, healthcheck?)` and `setEventHeader(headers)`.

Creating a provider with custom timeout/headers and passing to `tronWeb.setFullNode(provider)` is valid.

## Key points

- All provider constructors validate URL, timeout, and headers; invalid values throw.
- Use `isConnected()` for health checks; TronWeb uses it in `tronWeb.isConnected()` for all three nodes.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/lib/providers/HttpProvider.ts, src/tronweb.ts)
- https://tronweb.network/docu/docs/intro/
-->