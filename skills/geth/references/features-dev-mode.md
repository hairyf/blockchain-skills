---
name: geth-dev-mode
description: Geth dev mode - single-node PoA chain with prefunded account and instant block production.
---

# Dev Mode

Dev mode runs a single-node ephemeral PoA chain with a prefunded developer account and instant block production. Use for local contract testing without syncing or running a consensus client.

## Enabling

geth --dev console

Chain is ephemeral; blocks produced when txs are pending (--dev.period). One prefunded account; --dev.gaslimit sets block gas limit.

## With external client

geth --dev --http --http.api eth,net,web3

Connect ethers/viem to http://localhost:8545; use dev account (unlock only on localhost or use Clef).

## Key Points

- Post-merge, multi-node private nets require a consensus client; dev mode is single-node only. For Go tests without a live node use Simulated Backend. For multi-node see Kurtosis.

<!-- Source: https://geth.ethereum.org/docs/developers/dapp-developer/dev-mode, https://github.com/ethereum/go-ethereum (README.md) -->
