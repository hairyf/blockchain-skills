---
name: tron-core-tokens-tr10-tr20
description: TRON token standards - TRC-10 (native) vs TRC-20 (contract); issue, transfer, and query APIs.
---

# TRON Tokens: TRC-10 and TRC-20

**TRC-10**: Native/system token. Issued via AssetIssueContract. HTTP: wallet/createassetissue, wallet/participateassetissue, wallet/transferasset. Params: owner_address, to_address, asset_name (token id hex), amount (smallest unit). Bandwidth consumed; issuer sets free limits. Queries: GetAssetIssueList, GetAssetIssueByAccount, GetAssetIssueByName, GetPaginatedAssetIssueList.

**TRC-20**: Smart contract, ERC-20 compatible. totalSupply(), balanceOf(address), transfer(to, value), transferFrom(from, to, value), approve(spender, value), allowance(owner, spender); events Transfer, Approval. Deploy Solidity contract; interact via wallet/triggersmartcontract or triggerconstantcontract. Decimals commonly 6 or 18.

## Choosing and querying

TRC-10: lower cost, native DEX pairs. TRC-20: full programmability, DeFi. Balance: TRC-10 via getaccount assets; TRC-20 via contract balanceOf(address). Transfer: TRC-10 = wallet/transferasset; TRC-20 = triggersmartcontract with transfer selector + broadcast.

## Usage for agents

Issue/participate/transfer TRC-10 with wallet HTTP/gRPC; asset_name as HexString (token id). TRC-20: encode call data, set fee_limit, trigger and broadcast. Use triggerconstantcontract for balanceOf/totalSupply/allowance. Distinguish token_id (TRC-10) vs contract address (TRC-20) in DEX/payment flows.

<!-- Source: sources/tron/docs/mechanism-algorithm/trc10.md, sources/tron/docs/contracts/trc20.md -->
