---
name: tronweb-connection-version
description: Connection checks and node version — isConnected(), fullnodeSatisfies(version), getFullnodeVersion().
---

# Connection and version

Check that the TronWeb instance can reach the nodes and whether the full node version meets a required range. Use before sending transactions or when building agents that need a minimum API.

## isConnected()

```typescript
const status = await tronWeb.isConnected();
// { fullNode: true|false, solidityNode: true|false, eventServer: true|false }
```

Each provider calls its status page (e.g. wallet/getnowblock for full node) and returns true if the response has expected fields (blockID, block_header). Use to detect network or node issues.

## Node version

```typescript
await tronWeb.getFullnodeVersion();
// Sets tronWeb.fullnodeVersion (e.g. '4.7.1'); called implicitly when needed

const ok = tronWeb.fullnodeSatisfies('>=4.1.1');
// semver.satisfies(fullnodeVersion, '>=4.1.1')
```

Use fullnodeSatisfies when a feature requires a minimum node version (e.g. certain RPC or behavior). Default fullnodeVersion is '4.7.1' until getFullnodeVersion() runs.

## Key points

- isConnected() is async and checks all three providers; eventServer can be undefined if not set.
- fullnodeVersion is set by getFullnodeVersion() from node info; call it once after construction if you rely on fullnodeSatisfies.
- TronWeb.version is the SDK version (e.g. '6.2.0'); fullnodeVersion is the node’s code version.

<!--
Source references:
- https://github.com/tronprotocol/tronweb (src/tronweb.ts, src/lib/providers/HttpProvider.ts)
-->