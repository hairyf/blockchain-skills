---
name: TRON testing
description: Run Hardhat tests against local network with ethers and Mocha/Chai.
---

# Testing

Tests use the default Hardhat network (no TRON network required). Use `ethers.getContractFactory` and deploy in-process, then assert with Chai.

## Example test

```javascript
const { expect } = require("chai");

describe("Greeter", () => {
  it("stores and returns the greeting", async () => {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello TRON!");
    await greeter.waitForDeployment();

    expect(await greeter.greet()).to.equal("Hello TRON!");

    const tx = await greeter.setGreeting("Yo");
    await tx.wait();
    expect(await greeter.greet()).to.equal("Yo");
  });
});
```

## CLI

- `npx hardhat test` — run tests (compiles if needed, uses local Hardhat network).

## Key points

- Contracts are compiled with the TRON plugin; tests run on the in-process Hardhat network.
- Use `waitForDeployment()` after `deploy()` when using the default provider.
- No TRON private key or API key needed for local tests.

<!--
Source references:
- https://github.com/aziz1975/layerzero-hardhat-tron (README, test/greeter.test.js)
-->
