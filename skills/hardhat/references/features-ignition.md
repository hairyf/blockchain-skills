---
name: hardhat-ignition
description: Hardhat Ignition declarative deployment, buildModule, Future, deploy.
---

# Hardhat Ignition

Hardhat Ignition is a declarative deployment system: you define **Ignition modules** (contract instances and calls), and Ignition executes them (order, parallelism, resume, error recovery).

## Install and config

Toolbox (ethers or viem) often includes Ignition. Otherwise:

```bash
npm add --save-dev @nomicfoundation/hardhat-ignition-viem
```

In config:

```ts
import hardhatIgnitionViemPlugin from "@nomicfoundation/hardhat-ignition-viem";
export default defineConfig({ plugins: [hardhatIgnitionViemPlugin], ... });
```

## Module definition

Modules live under `ignition/modules/`. Build with `buildModule(id, callback)`:

```ts
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", 1893456000);
  const lockedAmount = m.getParameter("lockedAmount", 1_000_000_000n);
  const lock = m.contract("Lock", [unlockTime], { value: lockedAmount });
  return { lock };
});
```

- **m.contract(name, constructorArgs, overrides)** – deploy contract; returns a Future.
- **m.call(contractFuture, methodName, args)** – call after deployment.
- **m.getParameter(key, default)** – parameterizable values for reuse/resume.
- Return an object of Futures to expose for other modules or tooling.

## Deploy

```bash
npx hardhat ignition deploy ignition/modules/Lock.ts --network localhost
```

Ignition runs Futures in order (respecting dependencies), can run independent steps in parallel, and stores deployment state (e.g. `ignition/deployments/chain-31337/`) for resume and idempotency.

## Key points

- Modules are declarative: no direct `deploy()` in code; define what to deploy and call, Ignition executes.
- Use parameters (`m.getParameter`) for different environments or reruns without code change.
- State directory enables resuming and adapting to module changes.

<!--
Source references:
- https://hardhat.org/ignition/docs
- https://hardhat.org/hardhat-runner/docs/getting-started#deploying-your-contracts
-->
