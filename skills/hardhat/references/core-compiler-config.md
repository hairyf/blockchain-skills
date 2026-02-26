---
name: hardhat-compiler-config
description: Configuring Solidity compiler version, optimizer, viaIR, and settings in Hardhat.
---

# Configuring the Compiler

Solidity compilation in Hardhat is configured in `hardhat.config` under the `solidity` key: version, optimizer, and other solc settings.

## Version and settings

```ts
import { defineConfig } from "hardhat/config";

export default defineConfig({
  solidity: {
    version: "0.8.29",
    settings: {
      // solc options
    },
  },
});
```

## Optimizer

```ts
solidity: {
  version: "0.8.29",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
}
```

`runs` trades deployment cost vs runtime cost; higher values favor runtime.

## Via-IR

IR-based codegen enables more optimizations at the cost of compile time:

```ts
solidity: {
  version: "0.8.29",
  settings: {
    viaIR: true,
  },
}
```

## Other settings

`settings` accepts any options supported by the chosen solc version. See the [Solidity compiler docs](https://docs.soliditylang.org/en/latest/).

## Advanced

- Custom Solidity compiler, multiple versions, overrides: see Hardhat cookbook and [Solidity configuration reference](https://hardhat.org/docs/reference/configuration#solidity-configuration).
- Build profiles and isolated builds: different compiler configs per use case or deployment.

## Key points

- Set `solidity.version` and `solidity.settings` in config; use optimizer and `runs` for production builds.
- Verification and deployment should use the same build profile/compiler settings so bytecode matches.

<!--
Source references:
- https://hardhat.org/docs/guides/writing-contracts/configuring-the-compiler
- https://hardhat.org/docs/reference/configuration#solidity-configuration
-->
