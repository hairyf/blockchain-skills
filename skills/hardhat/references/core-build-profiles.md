---
name: hardhat-build-profiles
description: Build profiles (default vs production), solidity.profiles, --build-profile.
---

# Build Profiles

Build Profiles let you use different Solidity compiler settings for different workflows (e.g. fast dev builds vs optimized deployment builds).

## Built-in profiles

- **default** – Used by most tasks when you don’t pass `--build-profile`. Tuned for development speed and experience.
- **production** – Recommended for deployments. Optimizer and [isolated builds](https://hardhat.org/docs/guides/writing-contracts/isolated-builds) are enabled by default. Hardhat Ignition uses this by default when deploying.

## Config without explicit profiles

If you set `solidity` without a `profiles` key, you are configuring the **default** profile:

```ts
solidity: {
  version: "0.8.29",
  settings: { optimizer: { enabled: true, runs: 200 } },
}
```

## Defining custom profiles

Use `solidity.profiles` to define named profiles:

```ts
import { defineConfig } from "hardhat/config";

export default defineConfig({
  solidity: {
    profiles: {
      myProfile: {
        version: "0.8.29",
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
    },
    npmFilesToBuild: [/* ... */],
  },
});
```

Each profile can use the full [Solidity configuration](https://hardhat.org/docs/reference/configuration#solidity-configuration) schema.

## Choosing a profile

Pass `--build-profile <name>` when running Hardhat:

```bash
npx hardhat test --build-profile production
npx hardhat run scripts/deploy.ts --build-profile production --network sepolia
```

Use the **same** profile for build and verify so bytecode matches (e.g. deploy and verify with `production`).

## Key points

- Use **default** for day-to-day dev and tests; use **production** for deployment and verification.
- Always use the same build profile when deploying and when running `hardhat verify`.

<!--
Source references:
- https://hardhat.org/docs/guides/writing-contracts/build-profiles
- https://hardhat.org/docs/reference/configuration#solidity-configuration
- https://hardhat.org/docs/guides/writing-contracts/isolated-builds
-->
