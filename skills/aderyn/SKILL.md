---
name: aderyn
description: Aderyn — Rust-based Solidity static analyzer; CLI, config, detectors, report formats, and MCP tools for agents.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/Cyfrin/aderyn, scripts located at https://github.com/antfu/skills
---

> Skill based on Aderyn (Cyfrin/aderyn), generated 2026-02-24.

Aderyn is a Rust-based Solidity static analyzer that finds vulnerabilities and code-quality issues. It supports Foundry and Hardhat with no config, optional `aderyn.toml` for path and detector control, and an MCP server for AI/editor integration. This skill focuses on agent use: CLI, configuration, detectors, report outputs, and MCP tools.

## Core References

| Topic | Description | Reference |
|-------|-------------|-----------|
| CLI | Root, src, path include/exclude, output, subcommands (init, mcp, registry, docs, completions) | [core-cli](references/core-cli.md) |
| Config | aderyn.toml — root, src, include/exclude, detectors, env | [core-config](references/core-config.md) |
| Report formats | Markdown, JSON, SARIF structure and usage | [core-report-formats](references/core-report-formats.md) |

## Features

| Topic | Description | Reference |
|-------|-------------|-----------|
| Detectors | Registry (aderyn registry), severity High/Low, include/exclude in config | [features-detectors](references/features-detectors.md) |
| MCP | stdio/HTTP server; tools: project overview, list contracts, contract surface, callgraph, node finder/summarizer | [features-mcp](references/features-mcp.md) |

## Best practices

| Topic | Description | Reference |
|-------|-------------|-----------|
| Project setup | When to use aderyn.toml, path filters, detector tuning for Foundry/Hardhat | [best-practices-project-setup](references/best-practices-project-setup.md) |

## External links

- [Cyfrin Aderyn docs](https://cyfrin.gitbook.io/cyfrin-docs/aderyn-cli/readme)
- [Aderyn GitHub](https://github.com/Cyfrin/aderyn)
- [List of supported detectors](https://cyfrin.gitbook.io/cyfrin-docs/project-configuration/list-of-supported-detectors)
- [VSCode Aderyn extension](https://marketplace.visualstudio.com/items?itemName=Cyfrin.aderyn)
