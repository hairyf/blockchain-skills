---
name: tonweb-features-dns
description: TonWeb DNS — resolve .ton domains, get wallet/site address, categories and records.
---

# TON DNS

Resolve human-readable `.ton` domains to addresses and other records. Use `tonweb.dns` (Dns instance) or static helpers on `TonWeb.dns`.

## Resolve

```js
const rootAddress = await tonweb.dns.getRootDnsAddress();

// Resolve any category (returns Cell | Address | AdnlAddress | StorageBagId | null)
const result = await tonweb.dns.resolve('sub.alice.ton', category, oneStep);

// Convenience
const walletAddress = await tonweb.dns.getWalletAddress('alice.ton');
const siteRecord = await tonweb.dns.getSiteAddress('sub.alice.ton');  // AdnlAddress or StorageBagId
```

## Categories

- `Dns.DNS_CATEGORY_WALLET` — smart contract address (wallet).
- `Dns.DNS_CATEGORY_SITE` — site (ADNL or storage bag).
- `Dns.DNS_CATEGORY_NEXT_RESOLVER` — next resolver contract.
- `Dns.DNS_CATEGORY_STORAGE` — storage bag id.

Pass category as second argument to `resolve()`; omit or use `null` for “all”. Use `oneStep: true` for non-recursive resolution.

## Creating and parsing records

Static helpers for building and parsing DNS record cells:

```js
TonWeb.dns.createSmartContractAddressRecord(address);
TonWeb.dns.createAdnlAddressRecord(adnlAddress);
TonWeb.dns.createStorageBagIdRecord(storageBagId);
TonWeb.dns.createNextResolverRecord(address);
TonWeb.dns.parseSmartContractAddressRecord(cell);
TonWeb.dns.parseAdnlAddressRecord(cell);
TonWeb.dns.parseStorageBagIdRecord(cell);
TonWeb.dns.parseSiteRecord(cell);
TonWeb.dns.parseNextResolverRecord(cell);
```

## DnsCollection and DnsItem

For managing DNS collections and items (e.g. subdomains as NFT-like items):

```js
const { DnsCollection, DnsItem } = TonWeb.dns;
// Use with provider and options (address, code, etc.) for deploy and methods
```

## Key points

- Root DNS address comes from config param 4; TonWeb reads it via provider.
- Wallet UX: use `getWalletAddress(domain)` to show “Send to domain” and then send to the returned Address.
- Site resolution returns ADNL or storage bag; use parse helpers for the type you need.

<!--
Source references:
- https://github.com/toncenter/tonweb/blob/master/src/contract/dns/Dns.js
- https://github.com/toncenter/tonweb/blob/master/src/contract/dns/DnsUtils.js
- https://github.com/toncenter/tonweb/blob/master/src/contract/dns/index.js
-->
