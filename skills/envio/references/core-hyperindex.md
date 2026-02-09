---
name: hyperindex-indexer
description: HyperIndex indexer setup — config.yaml, schema.graphql, event handlers, and deployment.
---

# HyperIndex Indexer

HyperIndex turns on-chain events into a queryable GraphQL API. Core pieces: config, schema, and event handlers.

## Prerequisites and Init

- Node.js 22+, pnpm 8+, Docker (for local run).
- Init: `pnpx envio init` (templates) or use contract import for quickstart.
- Essential files: `config.yaml`, `schema.graphql`, `src/EventHandlers.*` (TS/JS/ReScript).

## config.yaml

Defines contracts (name, ABI/events), networks (id, start_block), and which contract addresses to index per network.

```yaml
name: MyIndexer
contracts:
  - name: Greeter
    abi:
      - event: "NewGreeting(address user, string greeting)"
networks:
  - id: 1
    start_block: 12345678
    contracts:
      - name: Greeter
        address: 0x9D02A17dE4E68545d3a58D3a20BbBE0399E05c9c
```

After config or schema changes, run `pnpm codegen` to regenerate types and handler bindings.

## schema.graphql

Defines entities and fields that event handlers write. These become the GraphQL API (via Hasura when running locally or on hosted).

## Event Handlers

Handlers are registered in `src/EventHandlers.*` and receive `event` + `context` (DB/entity access). Use the generated API from `generated` (from codegen).

```typescript
import { Greeter, User } from "generated";

Greeter.NewGreeting.handler(async ({ event, context }) => {
  const userId = event.params.user;
  const latestGreeting = event.params.greeting;
  const current = await context.User.get(userId);

  await context.User.set({
    id: userId,
    latestGreeting,
    numberOfGreetings: current ? current.numberOfGreetings + 1 : 1,
    greetings: current ? [...current.greetings, latestGreeting] : [latestGreeting],
  });
});
```

## Running

- Local: `pnpm dev` (Docker + Hasura). Stop with `pnpm envio stop`.
- Hosted: Deploy via Envio Hosted Service; no custom API token needed for HyperSync in that case.
- Self-hosted: Set `ENVIO_API_TOKEN` for HyperSync access.

## Key Points

- Use proxy address, not implementation, when indexing proxy contracts.
- API token required for HyperSync from Nov 2025 for local/self-hosted; see API Tokens doc.
- Supported: EVM, Solana, Fuel; multichain and dynamic/factory contracts are supported (see docs).

<!--
Source references:
- https://docs.envio.dev/docs/HyperIndex/getting-started
- https://docs.envio.dev/docs/HyperIndex/configuration-file
- https://docs.envio.dev/docs/HyperIndex/event-handlers
-->
