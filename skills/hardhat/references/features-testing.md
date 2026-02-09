---
name: hardhat-testing
description: Testing with Mocha, loadFixture, Chai matchers, network helpers.
---

# Hardhat Testing

Tests run with `npx hardhat test`. Default stack: Mocha, Chai, Ethers (or Viem) via toolbox, Hardhat Network. Use **fixtures** and **Chai matchers** for stable, readable tests.

## Fixtures (loadFixture)

Run a setup function once, snapshot Hardhat Network, and revert to that snapshot for each test:

```ts
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

async function deployFixture() {
  const [owner, other] = await hre.ethers.getSigners();
  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: 1n * 10n ** 9n });
  return { lock, owner, other };
}

describe("Lock", function () {
  it("should set owner", async function () {
    const { lock, owner } = await loadFixture(deployFixture);
    expect(await lock.owner()).to.equal(owner.address);
  });
});
```

## Chai matchers (@nomicfoundation/hardhat-chai-matchers)

- **revert:** `await expect(tx).to.be.reverted`, `await expect(tx).to.be.revertedWith("message")`
- **events:** `await expect(tx).to.emit(contract, "EventName").withArgs(arg1, arg2)`; use `anyValue` for any arg
- **balance changes:** `await expect(tx).to.changeEtherBalances([addr1, addr2], [delta1, delta2])`

With toolbox, matchers are registered automatically when you import from `hardhat-chai-matchers` or use the toolbox network-helpers.

## Network helpers in tests

From `@nomicfoundation/hardhat-toolbox/network-helpers` (or hardhat-network-helpers):

- **time.latest()**, **time.increaseTo(t)**, **time.increase(n)** – time manipulation
- **mine(n)** – mine blocks

Example: advance time then withdraw:

```ts
await time.increaseTo(unlockTime);
await expect(lock.withdraw()).not.to.be.reverted;
```

## Key points

- Prefer `loadFixture` over deploying in every `it()` for speed and isolation.
- Use matchers for reverts and events instead of manual try/catch or event parsing.
- Run tests on default `hardhat` network unless you need a forked or external network.

<!--
Source references:
- https://hardhat.org/hardhat-runner/docs/guides/test-contracts
- https://hardhat.org/hardhat-chai-matchers/docs
- https://hardhat.org/hardhat-runner/docs/getting-started#testing-your-contracts
-->
