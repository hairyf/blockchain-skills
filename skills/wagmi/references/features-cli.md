---
name: wagmi CLI create-wagmi
description: Scaffold Wagmi projects with create-wagmi CLI and templates.
---

# create-wagmi CLI

Scaffolds new Wagmi projects with config, providers, and optional framework.

## Usage

```bash
pnpm create wagmi
# or
npm create wagmi@latest
yarn create wagmi
bun create wagmi
```

Prompts: project name, framework (React / Vanilla), variant. Use **-t** / **--template** to skip prompts.

## Templates

- **next** — Next.js + Wagmi
- **nuxt** — Nuxt + Wagmi
- **vite-react** — Vite + React
- **vite-vanilla** — Vite + Wagmi Core (no React)
- **vite-vue** — Vite + Vue

Example:

```bash
pnpm create wagmi --template next
```

## Package manager

Use **--pnpm**, **--npm**, **--yarn**, or **--bun** to force package manager for install.

## Other CLI commands

@wagmi/cli provides **generate** (from ABIs/config) and **init**; see CLI docs and config (wagmi.config.*) for codegen.

<!--
Source references:
- https://wagmi.sh/cli/create-wagmi
- sources/wagmi/site/cli/create-wagmi.md
-->
