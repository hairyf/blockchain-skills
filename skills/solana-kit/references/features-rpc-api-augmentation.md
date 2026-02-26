---
name: solana-kit-rpc-api-augmentation
description: Constrain or extend RPC API — mainnet/devnet cluster types, cherry-pick methods, add custom RPC methods (e.g. getAsset).
---

# RPC API augmentation (Kit)

The RPC API is type-driven; you can constrain it by cluster or method set, or add custom methods (e.g. provider-specific getAsset) with zero bundle cost.

## Constrain by cluster

Wrap the URL with mainnet() or devnet() so the RPC type reflects cluster-specific methods (e.g. requestAirdrop only on devnet):

```ts
import { createSolanaRpc, mainnet, devnet } from '@solana/kit';
const mainnetRpc = createSolanaRpc(mainnet('https://api.mainnet-beta.solana.com'));
const devnetRpc = createSolanaRpc(devnet('https://api.devnet.solana.com'));
```

## Cherry-pick methods

Cast the RPC to a type with only the methods you need: createSolanaRpc(url) as Rpc<GetAccountInfoApi & GetMultipleAccountsApi>. Or build the API with createSolanaRpcApi<GetAccountInfoApi & GetMultipleAccountsApi>(DEFAULT_RPC_CONFIG) and createRpc({ api, transport }).

## Custom RPC methods

Define a type spec (e.g. GetAssetApi with getAsset(args) return type) and create the client with createJsonRpcApi<YourApi>(), createDefaultRpcTransport({ url }), createRpc({ api, transport }). The library supports any JSON-RPC method; use for provider-specific APIs (e.g. Helius DAS getAsset).

## Key points

- Types don't affect bundle size. Use cluster helpers for correct method availability; use cherry-pick or custom API for cleaner types or custom endpoints.

<!-- Source: sources/solana-kit/README.md Augmenting/Constraining the RPC API -->
