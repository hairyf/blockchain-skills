---
name: moralis-api-best-practices
description: Moralis API key, chain selection, and agent usage patterns.
---

# Moralis API Best Practices

## API Key

- Get key: [admin.moralis.com/api-keys](https://admin.moralis.com/api-keys)
- Never expose in client-side code; use backend or env vars.
- Free tier has rate limits; paid plans for production.

## Chain Selection

- **EVM**: Use `EvmChain.ETHEREUM`, `EvmChain.POLYGON`, `EvmChain.ARBITRUM`, etc., or hex chain ID (`"0x1"`, `"0x89"`).
- **Solana**: Use `"mainnet"` or `"devnet"` in Solana-specific endpoints.
- Check [supported chains](https://docs.moralis.io/supported-chains) for availability.

## Agent-Oriented Patterns

1. **Resolve ENS first**: Use `resolveAddress` or `resolveDomain` before wallet queries if user provides ENS.
2. **Batching**: Some endpoints support multiple addresses/tokens per request; prefer batching over loops.
3. **Pagination**: Use `limit` and `cursor` for large result sets.
4. **Cortex for complex queries**: For "what tokens does X hold?" or "analyze this wallet" type questions, suggest Cortex or MCP if the agent has access.
5. **Error handling**: Moralis returns structured errors; check for rate limits (429) and invalid chain/address (400).

## RPC Nodes

Moralis also provides RPC nodes with extended methods (`eth_getTransactions`, `eth_getNFTBalances`, etc.). Use for direct JSON-RPC calls when integrating with ethers.js or viem.

<!--
Source references:
- https://docs.moralis.io/web3-data-api/evm/get-your-api-key
- https://docs.moralis.io/supported-chains
- https://docs.moralis.io/rpc-nodes
-->
