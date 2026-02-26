---
name: tron-core-dex
description: TRON native DEX - trading pairs (Bancor), create/trade/inject/withdraw; APIs and fee.
---

# TRON Decentralized Exchange (DEX)

TRON provides a **native DEX** of trading pairs between TRC-10 tokens (including TRX). Pairs follow the **Bancor** protocol; price is the ratio of token balances in the pair.

## Concepts

- **Trading pair (Exchange)**: Two TRC-10 tokens (or one TRC-10 + TRX). TRX represented as _ in params; amounts in sun.
- **Creation cost**: 1024 TRX (burned). Any account can create any pair; duplicate pairs allowed.
- **Trading**: No order book; instant swap. Minimum received is expected; tx reverts if received less than expected.

## Contracts and HTTP APIs

| Action | Contract | HTTP API |
|--------|----------|----------|
| Create pair | ExchangeCreateContract | wallet/exchangecreate |
| Trade | ExchangeTransactionContract | wallet/exchangetransaction |
| Add liquidity | ExchangeInjectContract | wallet/exchangeinject (creator only) |
| Withdraw liquidity | ExchangeWithdrawContract | wallet/exchangewithdraw (creator only) |

## Queries

ListExchanges, GetPaginatedExchangeList, GetExchangeById. After trade use gettransactioninfobyid and exchange_received_amount.

## Usage for agents

Build create/trade/inject/withdraw via HTTP wallet APIs or gRPC; sign and broadcast. Set expected to a safe minimum for trade. Use GetExchangeById and balance fields to compute current price before building a trade.

<!-- Source: sources/tron/docs/mechanism-algorithm/dex.md -->
