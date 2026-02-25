---
name: hardhat-testing-viem
description: Testing with Viem and node:test, hre.network.connect, viem assertions, network helpers.
---

# Testing with Viem and node:test

Hardhat can run TypeScript tests using **viem** and the **Node.js test runner** (`node:test`), with **hardhat-viem**, **hardhat-viem-assertions**, and **hardhat-network-helpers** for type-safe contract interaction and EVM helpers.

## Setup

With a viem-based init (`hardhat --init`) the plugins are usually already present. Otherwise install:

```bash
npm add --save-dev @nomicfoundation/hardhat-viem @nomicfoundation/hardhat-viem-assertions @nomicfoundation/hardhat-node-test-runner @nomicfoundation/hardhat-network-helpers viem
```

Add them to the `plugins` array in `hardhat.config.ts`.

## Network connection

Get a connected viem instance and network helpers by calling `hre.network.connect()` (or `network.connect()` from `"hardhat"`). This creates a fresh local chain simulation for tests:

```ts
import { describe, it } from "node:test";
import hre from "hardhat";

const { viem, networkHelpers } = await hre.network.connect();

describe("Counter", function () {
  it("emits Increment when inc() is called", async function () {
    const counter = await viem.deployContract("Counter");
    await viem.assertions.emitWithArgs(
      counter.write.inc(),
      counter,
      "Increment",
      [1n],
    );
  });
});
```

- **viem.deployContract("ContractName")** – deploy and get a typed contract instance.
- **viem.assertions.emitWithArgs(tx, contract, "EventName", [args])** – assert the transaction emits the event with the given args.
- **viem.assertions.revertWith(tx, "message")** – assert the transaction reverts with the given reason.

## Reverts and impersonation

To test as a different account (e.g. non-owner), use network helpers then pass `account` to the write call:

```ts
await networkHelpers.impersonateAccount(nonOwnerAddress);
await networkHelpers.setBalance(nonOwnerAddress, 10n ** 18n);

await viem.assertions.revertWith(
  counter.write.inc({ account: nonOwnerAddress }),
  "only the owner can increment the counter",
);
```

## Fixtures (loadFixture)

Use `networkHelpers.loadFixture(fn)` to run a setup function once and revert the chain to that state before each test. Avoids re-deploying in every test and keeps tests isolated:

```ts
async function deployCounterFixture() {
  const counter = await viem.deployContract("Counter");
  return { counter };
}

it("test one", async function () {
  const { counter } = await networkHelpers.loadFixture(deployCounterFixture);
  // ...
});
```

## Running tests

```bash
npx hardhat test
npx hardhat test nodejs
npx hardhat test test/Counter.ts
```

## Multichain

Pass `chainType` when connecting to simulate a different chain (e.g. OP Mainnet):

```ts
const { viem } = await hre.network.connect({ chainType: "op" });
```

## Type safety and build

Contract types come from the compiled artifacts. If types are wrong or stale, run `npx hardhat build`. In VS Code, run “TypeScript: Reload Project” if needed.

## Key points

- Use `hre.network.connect()` to get `viem` and `networkHelpers` for the test run.
- Use `viem.assertions` for emit/revert; use `networkHelpers` for impersonation, balance, and `loadFixture`.
- Prefer `loadFixture` over deploying in every test.

<!--
Source references:
- https://hardhat.org/docs/guides/testing/using-viem
- https://hardhat.org/docs/plugins/hardhat-viem
- https://hardhat.org/docs/plugins/hardhat-viem-assertions
- https://hardhat.org/docs/plugins/hardhat-network-helpers
-->
