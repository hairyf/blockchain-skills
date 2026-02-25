---
name: wagmi sign message
description: useSignMessage and useSignTypedData for EIP-191 and EIP-712 signing.
---

# Sign Message

Signing messages (EIP-191 personal sign or EIP-712 typed data) does not send a transaction; it prompts the wallet and returns a signature. Use **useSignMessage** for raw strings and **useSignTypedData** for structured EIP-712 data.

## useSignMessage

Signs a string (EIP-191). Mutation-style: call `signMessage.mutate({ message })`.

```tsx
import { useSignMessage } from 'wagmi'

const signMessage = useSignMessage()
return (
  <button onClick={() => signMessage.mutate({ message: 'hello world' })}>
    Sign message
  </button>
)
```

Return: `{ mutate, mutateAsync, data: signature, isPending, error, ... }`. Parameters: `config`, plus mutation options (`mutationKey`, `onSuccess`, etc.).

## useSignTypedData

Signs [EIP-712](https://eips.ethereum.org/EIPS/eip-712) typed data. Pass `domain`, `types`, `primaryType`, and `message`.

```tsx
import { useSignTypedData } from 'wagmi'

const signTypedData = useSignTypedData()
signTypedData.mutate({
  domain: { name: 'Example', chainId: 1, version: '1' },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: { name: 'Alice', wallet: '0x...' },
    to: { name: 'Bob', wallet: '0x...' },
    contents: 'Hello!',
  },
})
```

With TypeScript, use `as const` on `types` for inferred `domain` and `message` types.

## Core actions

- **signMessage** — same in Core.
- **signTypedData** — same in Core.

## Key points

- Signing does not broadcast a tx; use for auth, SIWE, or off-chain agreements.
- For verification: **verifyMessage** and **verifyTypedData** (Core/React) use the signature and recovered address.

<!--
Source references:
- https://wagmi.sh/react/api/hooks/useSignMessage
- https://wagmi.sh/react/api/hooks/useSignTypedData
- sources/wagmi/site/react/api/hooks/useSignMessage.md
- sources/wagmi/site/react/api/hooks/useSignTypedData.md
-->
