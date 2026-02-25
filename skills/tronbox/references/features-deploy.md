---
name: TronBox deploy command
description: deploy is an alias for migrate; same options and behavior.
---

# TronBox Deploy Command

**tronbox deploy** is an alias for **tronbox migrate**. It uses the same builder and runner as migrate.

Use **tronbox migrate** (or **tronbox deploy**) with the same options: `--network`, `--reset`, `--from`, `--to`, `--compile-all`, `--evm`, `--quiet`. There is no separate deploy flow or config.

<!--
Source references:
- sources/tronbox/src/lib/commands/deploy.js
- sources/tronbox/src/lib/commands/migrate.js
-->
