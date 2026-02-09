---
name: geth-abigen
description: abigen — generate type-safe Go contract bindings from ABI and optional bytecode.
---

# abigen and Go Contract Bindings

abigen generates Go bindings from a contract ABI (and optionally bytecode for deployment). Use the bindings to call contracts from Go without hand-writing RPC encoding.

## Install

```bash
go install github.com/ethereum/go-ethereum/cmd/abigen@latest
```

## Generate from ABI only (calls only)

```bash
abigen --abi build/Storage.abi --pkg main --type Storage --out Storage.go
```

- `--abi`: Path to ABI JSON (required).
- `--pkg`: Go package name.
- `--type`: Struct name for the binding (optional).
- `--out`: Output file (default stdout).

## Generate with bytecode (deploy + calls)

Include compiled bytecode so the generator can emit `Deploy<Type>`:

```bash
solc --abi Storage.sol -o build && solc --bin Storage.sol -o build
abigen --abi build/Storage.abi --bin build/Storage.bin --pkg main --type Storage --out Storage.go
```

## Using the bindings

- **Backend**: Use `ethclient.Dial(ipcPath)` or HTTP/WS URL for `bind.ContractBackend`.
- **Deploy**: Call `DeployStorage(auth, backend)` (from generated code); `auth` is a `*bind.TransactOpts` (e.g. from `bind.NewTransactorWithChainID(keys, password, chainID)`).
- **Attach to existing contract**: `NewStorage(address, backend)` returns an instance; call `instance.Retrieve(callOpts)` (read) or `instance.Store(auth, value)` (write).
- **Call opts**: For reads, pass `nil` or `&bind.CallOpts{Pending: true}`. For writes, use a transactor (signed tx). Go bindings expect **local signing**; do not delegate signing to a remote node.

## Key types

- `bind.CallOpts`: Block/pending, gas limit for view calls.
- `bind.TransactOpts`: From account, signer, gas limit, value, etc.
- Generated struct embeds caller (read), transactor (write), and filterer (events).

## Key Points

- ABI is the minimum input; bytecode is needed only for deployment helpers.
- Prefer [Go Contract Bindings v2](https://geth.ethereum.org/docs/developers/dapp-developer/native-bindings-v2) for new code when available.
- For testing without a live chain, use the simulated backend (`backends.SimulatedBackend`) as the `ContractBackend`.

<!--
Source references:
- https://geth.ethereum.org/docs/developers/dapp-developer/native-bindings
- https://geth.ethereum.org/docs/tools/abigen
- https://github.com/ethereum/go-ethereum (README.md)
-->
