---
name: foundry-scripting
description: Foundry script execution — compile, execute, broadcast, resume, nonce management, multi-chain.
---

# Foundry Scripting

`forge script` compiles and runs a Solidity script, optionally broadcasting transactions and resuming deployments.

## Execution flow (high level)

1. **Compile** — Script and dependencies are compiled.
2. **Execute** — Runner spawns backend (fork or local), deploys libraries and script contract, runs `setUp()` then `run()`. Broadcastable transactions are collected from `vm.broadcast` / `vm.startBroadcast` during `run()`.
3. **Broadcast** — If `--broadcast`, transactions are sent (single- or multi-chain). RPCs can be collected from config or CLI.
4. **Resume** — `--resume` only re-sends previously generated transactions; it does not re-run the script. Use after a partial broadcast or to retry.
5. **Verify** — Contracts can be verified after deployment.

Resume and verify can run without `--broadcast` (e.g. verify after a past run).

## Nonce management

During script execution, Foundry adjusts the sender nonce so that execution and state match on-chain: `setUp()` and `run()` are called with the correct `msg.sender`, and each `vm.broadcast`-created contract decrements the nonce. If no user sender is set and the default sender is used, this nonce correction can be skipped.

## Key Points

- Script execution and on-chain simulation are separate: `ScriptArgs::execute` runs the script; `ScriptArgs::onchain_simulation` (when not skipping) runs only the collected broadcastable transactions.
- Multi-chain: multiple script sequences can be created and deployed via `MultiChainSequence`; resume works per chain.
- For agents: use `forge script --help` and `foundry.toml` for RPC/sender; document `--broadcast` vs `--resume` vs verify-only flows.

<!--
Source references:
- https://github.com/foundry-rs/foundry/blob/master/docs/dev/scripting.md
- https://github.com/foundry-rs/foundry/blob/master/README.md
-->
