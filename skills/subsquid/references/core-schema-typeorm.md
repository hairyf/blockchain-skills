---
name: subsquid-core-schema-typeorm
description: Schema file, TypeORM codegen, TypeormDatabase, and store API for squids.
---

# Schema and TypeORM Store

Squids that persist to Postgres use a **schema file** (`schema.graphql`), TypeORM codegen, and `TypeormDatabase`. The schema models entities and relations; codegen produces TypeORM entities; the store exposes insert/upsert/find APIs inside the batch handler.

## Schema file

`schema.graphql` uses a GraphQL dialect (loosely compatible with subgraph schema). Defines entities with `@entity`, fields (e.g. `ID!`, `String`, `BigInt!`), and relations. Used to:
- Generate TypeORM entities.
- Drive DB migrations.
- Optionally serve GraphQL API.

## TypeORM codegen

```bash
npx squid-typeorm-codegen
```

Reads `schema.graphql` and generates TypeORM entity classes (default output: `src/model/generated`). Generate after schema changes, then run migrations.

## TypeormDatabase and store

```ts
const db = new TypeormDatabase({ supportHotBlocks: true })
processor.run(db, async (ctx) => {
  // ctx.store implements Store interface
})
```

**Constructor options:** `stateSchema`, `isolationLevel`, `supportHotBlocks` (default `true` for fork handling), `projectDir`.

**Batch write:** Prefer batch operations in the handler.
- **`ctx.store.insert(e | e[])`** — Insert; fails on duplicate.
- **`ctx.store.upsert(e | e[])`** — Upsert; does not cascade to relations.
- **`ctx.store.remove(e | E[], id?)`** — Delete by entity or by ID(s).

**Read:** Same as TypeORM EntityManager: `get`, `find`, `findBy`, `findOne`, `findOneBy`, `findOneOrFail`, `findOneByOrFail`, `count`, `countBy`. Use `In()`, `LessThan`, `Like`, etc. from TypeORM for filters. Use `relations` in find options to load relations.

Connection: env vars `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`, `DB_SSL`, etc., or single `DB_URL`.

<!--
Source references:
- https://docs.subsquid.io/sdk/reference/schema-file/intro
- https://docs.subsquid.io/sdk/reference/store/typeorm
-->
