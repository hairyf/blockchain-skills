---
name: viem-accounts
description: Local and JSON-RPC accounts in viem — privateKeyToAccount, mnemonicToAccount, wallet provider.
---

# Accounts

Accounts provide the signer for Wallet Actions. Two kinds: **Local** (key on your machine) and **JSON-RPC** (injected wallet, e.g. MetaMask).

## Local accounts

Keys live in your app. Use for scripts, tests, or backend signers.

```ts
import { privateKeyToAccount } from 'viem/accounts'
import { mnemonicToAccount } from 'viem/accounts'
import { createWalletClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const account = privateKeyToAccount('0x...' as `0x${string}`)
// or from mnemonic
const accountFromMnemonic = mnemonicToAccount('legal winner thank year...')
```

Use with Wallet Client: pass `account` into each action or set it on the client so you don't pass it every time.

```ts
const client = createWalletClient({
  chain: mainnet,
  transport: http(),
  account, // optional: hoist so actions use it by default
})
const hash = await client.sendTransaction({
  to: '0xa5cc...',
  value: parseEther('0.01'),
  // account not needed if hoisted
})
```

## JSON-RPC account (browser wallet)

For MetaMask / WalletConnect, use a Wallet Client with `custom(provider)` and get the account from the provider (e.g. `getAddresses()`), then pass that account into Wallet Actions. No private key in your code.

## Extend Wallet Client with Public Actions

When using a local account, you often need both Wallet and Public clients with the same chain/transport. You can extend the Wallet Client with Public Actions to use one client for both:

```ts
import { createWalletClient, http, publicActions } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const account = privateKeyToAccount('0x...')
const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
}).extend(publicActions)

const blockNumber = await client.getBlockNumber()
const hash = await client.sendTransaction({ to: '0x...', value: 0n })
```

## Key points

- **Local**: `privateKeyToAccount`, `mnemonicToAccount`, `hdKeyToAccount` from `viem/accounts`.
- **JSON-RPC**: use `custom(provider)` and `getAddresses()` (or similar) for the account.
- Hoist `account` on the Wallet Client to avoid passing it to every action.
- Use `.extend(publicActions)` on the Wallet Client when you need both read and write with one client.

<!--
Source references:
- https://viem.sh/docs/accounts/local
- https://viem.sh/docs/accounts/local/privateKeyToAccount
- https://viem.sh/docs/accounts/jsonRpc
-->
