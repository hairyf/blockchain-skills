---
name: geth-simulated-backend
description: Simulated backend - in-process blockchain simulator for Go tests without a live geth node.
---

# Simulated Backend

The go-ethereum backends.SimulatedBackend provides an in-process, in-memory blockchain for testing Go contract bindings without running geth or dev mode.

## Usage

sim := backends.NewSimulatedBackend(genesisAlloc, blockGasLimit). Defer sim.Close(). Fund via genesis alloc or sim.FundAddress(addr, amount). Pass sim as bind.ContractBackend to generated contract constructors; use bind.TransactOpts for sends. sim.Commit() after txs to advance blocks. View methods with callOpts; state updated after Commit().

## Example

alloc := core.GenesisAlloc{addr: {Balance: big.NewInt(1e18)}}
sim := backends.NewSimulatedBackend(alloc, 30_000_000)
defer sim.Close()
auth := bind.NewKeyedTransactor(key)
_, _, contract, _ := DeployMyContract(auth, sim, arg)
sim.Commit()
ret, _ := contract.GetValue(nil)

## Key Points

- No network; ideal for CI. Same ContractBackend interface as ethclient.Dial(). Call Commit() after each batch for multi-tx scenarios.

<!-- Source: https://geth.ethereum.org/docs/developers/dapp-developer/native-bindings#blockchain-simulator, https://github.com/ethereum/go-ethereum (README.md) -->
