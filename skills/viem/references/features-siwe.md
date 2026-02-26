---
name: viem-siwe
description: Sign-In with Ethereum (EIP-4361) in viem — create, verify, parse, and validate SIWE messages.
---

# SIWE (Sign-In with Ethereum)

EIP-4361 Sign-In with Ethereum: create messages, verify signatures, parse and validate. Use for wallet-based auth flows.

## Import

```ts
import { createSiweMessage, generateSiweNonce, parseSiweMessage, validateSiweMessage } from 'viem/siwe'
```

Server-side verification uses the Public Client action `verifySiweMessage`.

## Create message

- **createSiweMessage({ address, chainId, domain, nonce, uri, version, ... })**: Build EIP-4361 formatted string. Required: `address`, `chainId`, `domain`, `nonce`, `uri`, `version: '1'`. Optional: `statement`, `expirationTime`, `issuedAt`, `notBefore`, `resources`, `scheme`, `requestId`.
- **generateSiweNonce()**: Random nonce for replay protection; use when creating the message on the server.

```ts
import { createSiweMessage, generateSiweNonce } from 'viem/siwe'

const message = createSiweMessage({
  address: account.address,
  chainId: mainnet.id,
  domain: 'example.com',
  nonce: generateSiweNonce(),
  uri: 'https://example.com/login',
  version: '1',
  statement: 'Sign in to Example',
})
// User signs `message` with walletClient.signMessage({ account, message })
```

## Verify (server)

- **publicClient.verifySiweMessage({ message, signature, address?, domain?, nonce?, ... })**: Returns `boolean`. Use after receiving the signed message. Optional filters: `address`, `domain`, `nonce`, `scheme`, `time`, `blockNumber`/`blockTag` (for smart contract signers).

```ts
const valid = await publicClient.verifySiweMessage({ message, signature })
```

## Parse and validate

- **parseSiweMessage(message)**: Parse EIP-4361 string into a `SiweMessage` object (address, chainId, domain, nonce, etc.).
- **validateSiweMessage(message)**: Validate message fields (format, expiration, notBefore); throws if invalid.

## Key points

- Always use **generateSiweNonce()** on the server when issuing a message; verify the same nonce in **verifySiweMessage** to prevent replay.
- For contract accounts, pass **blockNumber** or **blockTag** so viem can check the contract existed at that block.
- Use **strict** validation (expirationTime, notBefore) when creating the message so **verifySiweMessage** can enforce time bounds via the `time` parameter.

<!--
Source references:
- https://viem.sh/docs/siwe/utilities/createSiweMessage
- https://viem.sh/docs/siwe/actions/verifySiweMessage
- https://viem.sh/docs/siwe/utilities/parseSiweMessage
- https://viem.sh/docs/siwe/utilities/validateSiweMessage
-->
