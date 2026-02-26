---
name: viem-test-actions
description: Test Client actions in viem — impersonateAccount, setBalance, mine, snapshot/revert, for Anvil/local testing.
---

# Test Actions

Actions that map to test/mining RPC methods (e.g. Anvil). Used with a **Test Client** over a local node. Essential for tests and simulations without real balance or mainnet.

## Account

- **impersonateAccount({ address })**: Act as `address` for subsequent calls (no private key).
- **stopImpersonatingAccount({ address })**: Stop impersonation.
- **setBalance({ address, value })**: Set account balance in wei.
- **setCode({ address, code })**: Set contract code at address.
- **setNonce({ address, nonce })**: Set nonce.
- **setStorageAt({ address, index, value })**: Set storage slot.

## Block

- **mine({ blocks?, timestamp? })**: Mine one or more blocks.
- **setAutomine({ mode })**: Turn automine on/off.
- **setIntervalMining({ interval })**: Mine every N seconds.
- **increaseTime({ seconds })**: Increase next block timestamp.
- **setNextBlockTimestamp({ timestamp })**: Set exact next block time.
- **setBlockTimestampInterval({ interval })**, **removeBlockTimestampInterval**: Block time delta.
- **setBlockGasLimit({ gasLimit })**, **setNextBlockBaseFeePerGas**: Gas limits/fees for next block.

## State

- **snapshot()**: Create state snapshot; returns snapshot ID.
- **revert({ id })**: Revert to snapshot.
- **dumpState()**: Dump state to hex; use with **loadState** to restore later.
- **loadState({ state })**: Load state from **dumpState** output.
- **reset({ jsonRpcUrl?, blockNumber? })**: Reset chain state (e.g. re-fork).

## Transaction / node

- **dropTransaction({ hash })**: Remove tx from pool.
- **getTxpoolContent()**, **getTxpoolStatus()**, **inspectTxpool()**: Inspect mempool.
- **sendUnsignedTransaction({ ... })**: Send unsigned tx (for impersonated account).
- **setCoinbase({ address })**, **setMinGasPrice**: Node/miner settings.
- **setLoggingEnabled({ enabled })**, **setRpcUrl({ url })**: Debug/config.

## Key points

- Use **createTestClient** (or test client from **createPublicClient** + **createWalletClient** with Anvil transport) and point transport at Anvil (e.g. `http('http://127.0.0.1:8545')`).
- **impersonateAccount** + **setBalance** lets you send txs from any address in tests.
- **snapshot** / **revert** isolate test cases without restarting the node; **dumpState** / **loadState** for cross-session state reuse.

<!--
Source references:
- https://viem.sh/docs/actions/test/introduction
- https://viem.sh/docs/actions/test/impersonateAccount
- https://viem.sh/docs/actions/test/setBalance
- https://viem.sh/docs/actions/test/mine
- https://viem.sh/docs/actions/test/snapshot
-->
