---
name: ethers-provider-signer
description: Ethers.js Provider, Signer, Contract — read/write separation, BrowserProvider, JsonRpcProvider, connecting to chain.
---

# Provider, Signer, and Contract

Ethers separates read-only (Provider) from write operations (Signer). Use Provider to query state; use Signer when you need to send transactions or sign.

## Terminology

- **Provider**: Read-only connection to the blockchain (query state, logs, call view methods).
- **Signer**: Wraps an account; can sign transactions and messages. Private key may be in memory (Wallet) or behind IPC (e.g. MetaMask).
- **Contract**: Deployed program on-chain. Read-only when connected to a Provider; state-changing when connected to a Signer.

## Connecting

**Browser (EIP-1193 / MetaMask):**

```ts
import { ethers } from "ethers";

let provider, signer;
if (window.ethereum == null) {
  provider = ethers.getDefaultProvider();
} else {
  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
}
```

**Custom RPC (node or Hardhat/Ganache):**

```ts
provider = new ethers.JsonRpcProvider(url);  // no url => localhost:8545
signer = await provider.getSigner();
```

## Key Points

- All write operations go through a Signer; Provider is read-only.
- Use `BrowserProvider(window.ethereum)` for injected wallets (EIP-1193).
- Use `JsonRpcProvider(url)` for your own node or dev chain; `getSigner()` gives write access when accounts are available.

<!--
Source references:
- sources/ethers/docs.wrm/getting-started.wrm
- https://docs.ethers.org/v6/
-->
