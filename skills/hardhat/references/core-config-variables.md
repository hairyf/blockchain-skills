---
name: hardhat-config-variables
description: configVariable(), env vars, hardhat-keystore for secrets, format string.
---

# Configuration Variables

Hardhat uses **Configuration Variables** for values that should not be committed (RPC URLs with API keys, private keys). They are resolved at runtime from environment variables or from the **hardhat-keystore** plugin.

## configVariable

Use `configVariable(name)` or `configVariable(name, format)` in `hardhat.config`:

```ts
import { configVariable, defineConfig } from "hardhat/config";

export default defineConfig({
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },
  },
});
```

Variables are **lazy**: resolved only when needed, so you can run tasks that don’t use a network without defining every variable.

## Environment variables

When not using keystore, Hardhat reads the value from an env var with the same name:

```bash
SEPOLIA_RPC_URL='https://eth-sepolia.g.alchemy.com/v2/KEY' npx hardhat run ./script.ts --network sepolia
```

## Format string

Use the second argument to inject the variable into a template (e.g. store only the API key):

```ts
url: configVariable(
  "ALCHEMY_API_KEY",
  "https://eth-sepolia.g.alchemy.com/v2/{variable}",
),
```

## hardhat-keystore

Store secrets encrypted so they aren’t in env or on disk in plain text:

```bash
npx hardhat keystore set SEPOLIA_RPC_URL
npx hardhat keystore set SEPOLIA_PRIVATE_KEY
```

First run prompts for a keystore password. Later, Hardhat prompts for that password when a variable is needed. Use the same `configVariable("SEPOLIA_RPC_URL")` in config; the plugin supplies the value from the keystore.

Tasks: `keystore list`, `keystore get <key>`, `keystore delete <key>`, `keystore change-password`, `keystore path`, `keystore rename <old> <new>`.

## Development keystore

For local dev with non-sensitive values, use a separate keystore that doesn’t require a password:

```bash
npx hardhat keystore set --dev MY_LOCAL_RPC_URL
```

## Key points

- Prefer `configVariable("NAME")` over hardcoding URLs and keys in config.
- Use hardhat-keystore for private keys and API keys; use `--dev` for local-only, non-sensitive values.

<!--
Source references:
- https://hardhat.org/docs/learn-more/configuration-variables
- https://hardhat.org/docs/explanations/configuration-variables
- https://hardhat.org/docs/plugins/hardhat-keystore
-->
