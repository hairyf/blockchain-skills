---
name: TronBox init and unbox
description: Creating a new project with tronbox init and downloading templates with unbox.
---

# TronBox Init and Unbox

## init

**Usage:** `tronbox init` (no arguments).

- Creates a new project in the **current directory**. The directory must be **empty** (only `.DS_Store` is ignored); otherwise the command exits with an error.
- Interactive: user can choose “Create a sample project” (javascript), “Create a MetaCoin project” (javascript-metacoin), or “Quit”.
- Non-interactive: set env vars `TRONBOX_CREATE_JAVASCRIPT_PROJECT_WITH_DEFAULTS` or `TRONBOX_CREATE_JAVASCRIPT_METACOIN_PROJECT_WITH_DEFAULTS` or `TRONBOX_QUIT`.
- Files are copied from the package’s `sample-projects/javascript` or `sample-projects/javascript-metacoin`. Then `npm install` is run if `package.json` exists.

Use when scaffolding a new TronBox app in an empty folder. Do not pass a template name to `init`; for templates use **unbox**.

## unbox

**Usage:** `tronbox unbox <box-name-or-url>`.

- Downloads a “TronBox Box” (project template) and extracts it into the current directory.
- Box can be a name (resolved from a known registry/GitHub) or a URL (e.g. GitHub repo). Config files in the box may be named `tronbox.json` or `tronbox-init.json` and are normalized during unbox.

Use when starting from a community or official template (e.g. from GitHub tronsuper or similar). Prefer unbox for named templates and init for the built-in sample or MetaCoin project.

## Usage for agents

- Run `tronbox init` only in an empty directory; suggest the user create a new folder and `cd` into it first.
- For a custom template or third-party box, use `tronbox unbox <url-or-name>` and then adjust config (networks, compiler) as needed.
- After init or unbox, remind the user to set `privateKey` or mnemonic via env and run `tronbox compile` then `tronbox migrate` (or `--evm` for EVM).

<!--
Source references:
- sources/tronbox/src/components/Init/index.js
- sources/tronbox/src/lib/commands/init.js
- sources/tronbox/src/components/Box (unbox)
- sources/tronbox/README.md
-->
