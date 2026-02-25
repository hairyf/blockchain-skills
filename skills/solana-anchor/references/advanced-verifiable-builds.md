---
name: Verifiable Builds
description: Reproducible builds with Docker and verifying on-chain bytecode.
---

# Verifiable Builds

Local Solana builds can differ between machines. For verifiable builds, build inside a pinned Docker image so the binary is reproducible.

## Build

From the **program** directory (e.g. `programs/my_program/`):

```bash
anchor build --verifiable
```

Uses a Docker image with pinned dependencies (and Cargo.lock). Produces a deterministic `.so` for the current program.

## Verify

After deploying, verify that on-chain bytecode matches your local build:

```bash
anchor verify -p <lib-name> <program-id>
```

`<lib-name>` is the library name in the program’s `Cargo.toml`. If the program has an on-chain IDL, the command also checks that it matches the local IDL.

## Docker image

Images are published as `solanafoundation/anchor:<version>`, e.g.:

```bash
docker pull solanafoundation/anchor:v0.32.1
```

If a verifiable build is interrupted, a container may be left running; remove it with:

```bash
docker rm -f anchor-program
```

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/references/verifiable-builds.mdx)
-->
