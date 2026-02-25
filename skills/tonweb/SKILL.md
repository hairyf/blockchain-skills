---
name: tonweb
description: TonWeb JavaScript SDK for TON. Wallets, BOC, HttpProvider, NFT, Jetton, DNS.
metadata:
  author: Hairy
  version: "2026.2.25"
  source: Generated from sources/tonweb (toncenter/tonweb)
---

> Based on tonweb v0.0.66, generated 2026-02-25.

TonWeb is the JavaScript API for the TON blockchain: wallet contracts, BOC/Cell, TonCenter HttpProvider, NFT/Jetton, DNS, payments, block subscription.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| Overview | Installation, provider, root API | [core-overview](references/core-overview.md) |
| TonWeb instance | Root class, getTransactions, getBalance, sendBoc, call | [core-tonweb-instance](references/core-tonweb-instance.md) |
| Address and utils | Address, toNano/fromNano, bytes/hex/base64, BN, nacl | [core-address-utils](references/core-address-utils.md) |
| BOC | Cell, BitString, fromBoc/oneFromBoc | [core-boc](references/core-boc.md) |
| Contract base | deploy, methods, getQuery/send/estimateFee, createStateInit | [core-contract](references/core-contract.md) |
| HttpProvider | getAddressInfo, getWalletInfo, sendBoc, call/call2 | [core-http-provider](references/core-http-provider.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Wallet | create, deploy, transfer, seqno, V2/V3/V4 | [features-wallet](references/features-wallet.md) |
| Highload wallet | HighloadWalletContractV3, HighloadQueryId | [features-highload-wallet](references/features-highload-wallet.md) |
| Lockup wallet | liquid/locked/restricted balances | [features-lockup-wallet](references/features-lockup-wallet.md) |
| NFT | NftCollection, NftItem, NftMarketplace, NftSale | [features-nft](references/features-nft.md) |
| Jetton | JettonMinter, JettonWallet, transfer, burn | [features-jetton](references/features-jetton.md) |
| DNS | resolve, getWalletAddress, getSiteAddress | [features-dns](references/features-dns.md) |
| Payments | PaymentChannel, createChannel | [features-payments](references/features-payments.md) |
| Block subscription | BlockSubscription, InMemoryBlockStorage | [features-block-subscription](references/features-block-subscription.md) |

## Best practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Custom contract | Extend Contract, createDataCell, message builders | [best-practices-custom-contract](references/best-practices-custom-contract.md) |
