---
name: tonweb-transfer-url
description: Parse and format TON transfer deep-link URLs (ton://transfer/<address>?amount=...&text=...).
---

# Transfer URL (Deep Links)

TonWeb can parse and format TON transfer URLs used for wallet deep links (e.g. "Send TON" links in apps).

## Parsing a transfer URL

```js
const { parseTransferUrl } = TonWeb.utils;
const parsed = parseTransferUrl('ton://transfer/EQ...?amount=0.01&text=Hello');
// parsed: { address: string, amount?: string, text?: string }
```

Throws if the URL format is invalid.

## Formatting a transfer URL

```js
const { formatTransferUrl } = TonWeb.utils;
const url = formatTransferUrl('EQ...', '0.01', 'Hello');
// url: ton://transfer/EQ...?amount=0.01&text=Hello
```

Parameters: `address`, optional `amount`, optional `text`.

## Key points

- Use for building "Send TON" links in dApps or for handling incoming transfer intents from wallets.
- Amount is typically in TON (string); convert to nanograms with `TonWeb.utils.toNano(amount)` when sending.

<!--
Source references:
- sources/tonweb/dist/types/utils/transfer-url.d.ts
-->
