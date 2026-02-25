---
name: hardhat-deployment-scripts
description: Deploying via scripts with viem or ethers, network.connect, hardhat run.
---

# Deploying with Scripts

Scripts in `scripts/` can deploy contracts using the Hardhat Runtime Environment. Use `network.connect()` to get a viem or ethers instance tied to the target network, then deploy and optionally run post-deploy calls.

## Script with Viem

```ts
import { network } from "hardhat";

const { viem, networkName } = await network.connect();
const client = await viem.getPublicClient();

console.log(`Deploying Counter to ${networkName}...`);
const counter = await viem.deployContract("Counter");
console.log("Counter address:", counter.address);

console.log("Calling counter.incBy(5)");
const tx = await counter.write.incBy([5n]);
await client.waitForTransactionReceipt({ hash: tx, confirmations: 1 });
console.log("Deployment successful!");
```

## Script with Ethers

```ts
import { network } from "hardhat";

const { ethers, networkName } = await network.connect();

console.log(`Deploying Counter to ${networkName}...`);
const counter = await ethers.deployContract("Counter");
await counter.waitForDeployment();
console.log("Counter address:", await counter.getAddress());

const tx = await counter.incBy(5n);
await tx.wait();
console.log("Deployment successful!");
```

## Running the script

```bash
npx hardhat run scripts/deploy-counter.ts --network sepolia
```

For production deployments, use the same build profile as verification so bytecode matches:

```bash
npx hardhat run scripts/deploy-counter.ts --build-profile production --network sepolia
```

## Prerequisites

- Network config (e.g. `sepolia`) with `url` and `accounts` (prefer `configVariable` and keystore).
- Follow the [deployment overview](references/features-deployment-overview.md) setup first.

## Key points

- Use `network.connect()` to get `viem` or `ethers` bound to the current network.
- Use `viem.deployContract("Name")` or `ethers.deployContract("Name")`; then call methods and wait for receipts as needed.
- Run with `--network <name>` and `--build-profile production` when deploying for verification.

<!--
Source references:
- https://hardhat.org/docs/guides/deployment/using-scripts
- https://hardhat.org/docs/guides/deployment
-->
