---
name: moralis-cortex
description: Moralis Cortex — AI-powered blockchain queries via hosted API or MCP server.
---

# Moralis Cortex

Cortex is an AI-native layer for Web3. Query blockchain data in natural language via a hosted REST API or a self-hosted MCP server. Answers are grounded in indexed Moralis data (no hallucinations).

## Hosted Cortex API

```ts
const response = await fetch("https://cortex-api.moralis.io/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-API-Key": apiKey },
  body: JSON.stringify({
    message: "What tokens does wallet 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045 hold?",
    chatId: "optional-conversation-id", // for multi-turn
    stream: false,
  }),
});
```

Best for: dashboards, chat agents, in-product insights. No infra setup.

## MCP Server (Self-Hosted)

Run the MCP server for full control: your own LLM (OpenAI, Claude, OSS), grounding logic, and privacy.

```bash
npm install -g @moralisweb3/api-mcp-server
export MORALIS_API_KEY=your_key
npx @moralisweb3/api-mcp-server --transport stdio
```

### Claude Desktop

```json
{
  "mcpServers": {
    "moralis": {
      "command": "npx",
      "args": ["@moralisweb3/api-mcp-server"],
      "env": { "MORALIS_API_KEY": "your_api_key" }
    }
  }
}
```

### Cursor IDE

Create `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "moralis": {
      "command": "npx",
      "args": ["@moralisweb3/api-mcp-server"],
      "env": { "MORALIS_API_KEY": "your_api_key" }
    }
  }
}
```

## Example Queries (Natural Language)

- "What's the current price of PEPE and Ethereum?"
- "What tokens does wallet 0x... hold?"
- "Show me the NFTs owned by vitalik.eth on Base"
- "Analyze the portfolio diversity of wallet 0x... across Ethereum and Base"

## Key Points

- **Grounded**: Answers use real indexed data, not model guesses.
- **LLM flexibility**: Hosted uses Moralis models; self-hosted can use OpenAI, Claude, or OSS.
- **MCP package**: `@moralisweb3/api-mcp-server` on NPM.
- **Transports**: `stdio` (default for AI clients), `web` (HTTP), `streamable-http`.

<!--
Source references:
- https://docs.moralis.io/cortex
- https://docs.moralis.io/cortex/mcp-server/getting-started
- https://docs.moralis.io/cortex/integrations/cursor
-->
