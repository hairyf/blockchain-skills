---
name: ethers-providers
description: Ethers.js providers — getDefaultProvider, JsonRpcProvider options, staticNetwork, broadcastTransaction.
---

# Provider Options and Default Provider

Beyond BrowserProvider and JsonRpcProvider, ethers offers a default provider that aggregates multiple backends, and JsonRpcProvider options for static networks and broadcasting.

## Default provider

When no injected wallet is available (e.g. MetaMask not installed), use the default provider for read-only access. It uses multiple public RPC endpoints:

```ts
import { ethers } from "ethers";

if (window.ethereum == null) {
  provider = ethers.getDefaultProvider();
  // Read-only; no signer
} else {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
}
```

You can pass a network (e.g. `"mainnet"`, `"sepolia"`) to getDefaultProvider(network).

## JsonRpcProvider with static network

If the network is known and will not change, disable the automatic chainId check to avoid an extra RPC call:

```ts
import { ethers } from "ethers";

const network = ethers.Network.from("mainnet");
const provider = new ethers.JsonRpcProvider(url, network, {
  staticNetwork: network
});

// Or detect network once and then treat as static
const provider = new ethers.JsonRpcProvider(url, undefined, {
  staticNetwork: true
});
```

## Broadcasting a signed transaction

To send a raw signed transaction (e.g. from an offline signer), use the provider’s broadcast method:

```ts
// v6
provider.broadcastTransaction(signedTxHex);
// Replaces v5 provider.sendTransaction(signedTx)
```

## Key Points

- getDefaultProvider() gives read-only access when no EIP-1193 provider is available.
- Use JsonRpcProvider(url, network, { staticNetwork: network }) to skip chainId lookup on a fixed network.
- broadcastTransaction() is the v6 API for sending an already-signed serialized transaction.

<!--
Source references:
- sources/ethers/docs.wrm/getting-started.wrm
- sources/ethers/docs.wrm/migrating.wrm
- https://docs.ethers.org/v6/
-->
