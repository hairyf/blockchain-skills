---
name: solana-kit-tree-shaking
description: Keep bundles small by importing only what you use; Kit is tree-shakeable.
---

# Tree-shaking (Kit)

Kit is designed to be fully tree-shakeable: only the functions and types you import are included in the bundle. This keeps payloads small for browsers, serverless, and React Native. Prefer narrow imports and avoid pulling the whole package when you need a few helpers.

## Prefer narrow imports

```ts
// Good: only what you use is bundled.
import { createSolanaRpc, address, pipe, getTransferSolInstruction } from '@solana/kit';

// Also good: use sub-packages when you need customization.
import { createSolanaRpc } from '@solana/rpc';
import { address } from '@solana/addresses';
import { getTransferSolInstruction } from '@solana-program/system';
```

Avoid importing the entire kit barrel if you only need one area (e.g. RPC + addresses). Use `@solana/kit` for convenience when you use several areas; use `@solana/rpc`, `@solana/addresses`, `@solana/transactions`, etc. when you want to minimize bundle size or customize composition.

## Why it matters

- **Web:** Smaller JS improves load time and TTI.
- **Serverless (Lambda, Cloudflare):** Smaller bundles reduce cold start and deployment size.
- **React Native:** Less JS to parse and execute.

Kit’s API is functional and modular (no large class that pulls in every method), so bundlers can eliminate unused code. Build-time checks in the repo enforce that the public API remains tree-shakeable.

## Version-specific imports

For features with multiple versions (e.g. offchain messages), import the version you use so compilers for other versions are dropped:

```ts
import { compileOffchainMessageV1Envelope } from '@solana/kit';
// Instead of compileOffchainMessageEnvelope, which can pull in other version compilers.
```

## Key points

- Import only the functions and types you need from `@solana/kit` or sub-packages.
- Prefer sub-packages when you need fine-grained control or minimal dependencies.
- Avoid importing large barrels or “all of RPC” if you only use a few methods; the functional API allows each method to be tree-shaken.

<!--
Source references:
- sources/solana-kit/README.md (Tree-Shakability)
- sources/solana-kit/docs/content/docs/tree-shaking (concept)
-->
