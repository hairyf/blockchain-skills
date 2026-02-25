---
name: tronweb-trx-tokens-resources
description: Trx token and chain APIs — getTokenFromID, getTokensIssuedByAddress, getAccountResources, getChainParameters.
---

# Trx tokens and chain params

`tronWeb.trx` exposes token metadata and account resource/chain parameter APIs. Use for TRC-10 token info, bandwidth/energy balances, and chain configuration.

## Token metadata

```typescript
const token = await tronWeb.trx.getTokenFromID(tokenId);
// or getTokenByID(tokenId)
// { name, abbr, description, url, total_supply, ... } (decoded UTF-8 where applicable)

const tokens = await tronWeb.trx.getTokensIssuedByAddress(address);
// Record<tokenId, Token>

const list = await tronWeb.trx.getTokenListByName(tokenId);
// Token or Token[] by name search
```

## Account resources

```typescript
const res = await tronWeb.trx.getAccountResources(address?);
// { freeNetLimit, freeNetUsed, NetLimit, NetUsed, EnergyLimit, EnergyUsed, ... }
```

Use with `getAccountNet(address)` for bandwidth and energy details. For energy price (sun per unit): `tronWeb.trx.getEnergyPrices()`.

## Chain parameters

```typescript
const params = await tronWeb.trx.getChainParameters();
// Array of { key, value } for chain config
```

## Key points

- Token IDs are strings; getTokenFromID/getTokenByID accept string or number.
- getAccountResources uses default address when omitted; getTokensIssuedByAddress uses default address hex when omitted.
- Energy and bandwidth are used for contract execution and transaction bandwidth; check getAccountNet and getEnergyPrices when estimating fees.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/lib/trx.ts)
-->