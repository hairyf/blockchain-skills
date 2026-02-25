---
name: TRON deployment
description: Deploy contracts to TRON (e.g. Nile) with hardhat-deploy—script pattern and CLI.
---

# Deployment

Use `@layerzerolabs/hardhat-deploy` for reproducible deployments. Scripts live in `deploy/` and run in order; use `tags` to run subsets.

## Deploy script pattern

```javascript
/** @type {import('hardhat-deploy/types').DeployFunction} */
const func = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('Greeter', {
    from: deployer,
    args: ['Hello TRON!'],
    log: true,
  });
};
module.exports = func;
module.exports.tags = ['Greeter'];
```

## CLI

- Deploy to Nile: `npx hardhat deploy --network nile`
- `deployer` comes from `namedAccounts.deployer` (e.g. first account from `accounts`).

## Key points

- `deploy('ContractName', { from, args?, log? })` deploys and saves artifact under `deployments/<network>/`.
- Use `tags` so you can run `npx hardhat deploy --network nile --tags Greeter` to run only that script.
- Ensure the network in config has `tron: true` and correct `url`/`httpHeaders` for TronGrid.

<!--
Source references:
- https://github.com/aziz1975/layerzero-hardhat-tron (README, deploy/00_deploy_greeter.js)
- https://www.npmjs.com/package/@layerzerolabs/hardhat-deploy
-->
