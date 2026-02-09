---
name: getblock-mcp-integration
description: Build an MCP server that uses GetBlock Ethereum API — balance, gas price, block number; useful for AI/agent tools backed by GetBlock.
---

# MCP Server with GetBlock

Model Context Protocol (MCP) lets AI assistants call external tools. A minimal MCP server can expose GetBlock Ethereum RPC as tools (e.g. balance, gas price, block number).

## Pattern

1. Get a GetBlock access token (Ethereum JSON-RPC endpoint).
2. Implement an MCP server that:
   - Exposes tools such as `get_eth_balance(address)`, `get_gas_price()`, `get_block_number()`.
   - Each tool issues a JSON-RPC request to `https://go.getblock.io/<ACCESS_TOKEN>/` (e.g. `eth_getBalance`, `eth_gasPrice`, `eth_blockNumber`).
3. Configure Claude (or other MCP client) to use this server so the assistant can query chain data via GetBlock.

## Stack example

Node.js, `@modelcontextprotocol/sdk`, `ethers` or raw `fetch`: create provider with GetBlock URL, then implement MCP tool handlers that call the provider and return results. Validate inputs (e.g. address format) with Zod or similar before calling RPC.

This gives agents a standardized way to read Ethereum state through GetBlock without hardcoding RPC logic in the model.

<!--
Source references:
- https://github.com/GetBlock-io/getblock-docs
- guides/basic-level-model-context-protocol-with-getblock-api-endpoints.md
-->
