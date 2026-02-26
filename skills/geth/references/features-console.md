---
name: geth-console
description: Geth JavaScript console and attach - interactive web3 and management API.
---

# JavaScript Console

Geth ships an interactive JavaScript console. Use it to call standard JSON-RPC (eth, net, web3) and geth-specific management APIs.

## Starting / attaching

geth console
geth --holesky console
geth attach
geth attach ~/.ethereum/holesky/geth.ipc
geth attach http://localhost:8545

HTTP/WS only expose APIs enabled via --http.api / --ws.api; IPC exposes all namespaces by default.

## Common usage

personal.listWallets(), eth.accounts, eth.getBalance(addr), eth.blockNumber, eth.getBlock('latest'), eth.sendTransaction({...}), eth.getTransactionReceipt(txhash). Unlocking over HTTP/WS is disabled by default; use IPC or Clef.

## Key Points

- Bundled web3 is legacy; for production DApps use ethers/viem against the same RPC. Avoid exposing admin/debug over public HTTP/WS.

<!-- Source: https://geth.ethereum.org/docs/interacting-with-geth/javascript-console, https://github.com/ethereum/go-ethereum (README.md) -->
