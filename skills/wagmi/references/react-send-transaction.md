---
name: wagmi send transaction
description: Send raw ETH/transactions with useSendTransaction and useWaitForTransactionReceipt.
---

# Send Transaction

Sending a **raw transaction** (e.g. transfer ETH) is separate from writing to a contract. Use `useSendTransaction` to create, sign, and send; use `useWaitForTransactionReceipt` to wait for confirmation.

## Usage

```tsx
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

function SendTransaction() {
  const { data: hash, isPending, error, sendTransaction } = useSendTransaction()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const to = formData.get('address') as `0x${string}`
    const value = formData.get('value') as string
    sendTransaction({ to, value: parseEther(value) })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Confirming...' : 'Send'}
      </button>
      {hash && <div>Tx Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Confirmed.</div>}
      {error && <div>Error: {error.message}</div>}
    </form>
  )
}
```

## useSendTransaction

- **Return:** `{ data: hash, sendTransaction, isPending, error, ... }` — mutation-style; call `sendTransaction({ to, value?, data?, gas?, ... })` to send.
- **useSendTransactionSync:** Waits for inclusion before resolving; use when you need the receipt before continuing.

## useWaitForTransactionReceipt

- **Parameters:** `{ hash }` — transaction hash from `useSendTransaction().data`.
- **Return:** `{ data: receipt, isLoading: isConfirming, isSuccess: isConfirmed }` — use for UI feedback.

## Key points

- Use `parseEther(value)` from viem for ETH amounts; for contract calls use `useWriteContract` instead.
- Handle `error` (e.g. user rejection, insufficient funds) and show `isPending` / `isConfirming` for UX.

<!--
Source references:
- https://wagmi.sh/react/guides/send-transaction
- https://wagmi.sh/react/api/hooks/useSendTransaction
- https://wagmi.sh/react/api/hooks/useWaitForTransactionReceipt
-->
