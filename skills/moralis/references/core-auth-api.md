---
name: moralis-auth-api
description: Moralis Auth API — wallet sign-in, challenge/verify (EIP-4361).
---

# Moralis Auth API

Auth API lets users authenticate via signed messages (EIP-4361) from EVM or Solana wallets. Returns a `profileId` that identifies the user across chains and wallets.

## Flow

1. **Request challenge** — Backend calls `requestChallengeEvm` or `requestChallengeSolana`.
2. **User signs** — Frontend prompts wallet to sign the challenge message.
3. **Verify signature** — Backend calls `verifyChallengeEvm` or `verifyChallengeSolana`.

## EVM Example

```ts
// 1. Request challenge (backend)
const challenge = await Moralis.Auth.requestChallenge({
  chainId: 1,
  domain: "myapp.com",
  statement: "Sign in to MyApp",
  uri: "https://myapp.com",
  expirationTime: new Date(Date.now() + 600000).toISOString(),
  notBefore: new Date().toISOString(),
  resources: [],
  address: userAddress,
});

// 2. User signs message in wallet (frontend)
const signature = await signMessage(challenge.message);

// 3. Verify (backend)
const result = await Moralis.Auth.verify({
  message: challenge.message,
  signature,
  network: "evm",
});

// result.profileId — use for session/DB
```

## Key Points

- **EIP-4361**: Standard SiWe (Sign-In with Ethereum) format.
- **profileId**: Stable ID for the user; supports multiple wallets per user.
- **Compatibility**: Works with MetaMask, WalletConnect, RainbowKit, Web3Auth, Magic.link, Particle — any wallet that can sign messages.
- **Limitation**: Auth API does not support EIP-1271 (smart contract wallets).

<!--
Source references:
- https://docs.moralis.io/authentication-api/evm
- https://eips.ethereum.org/EIPS/eip-4361
-->
