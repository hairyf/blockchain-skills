---
name: hyperlane-features-warp-routes
description: Warp routes and token bridge contracts (HypERC20, HypNative, etc.).
metadata:
  author: hairy
---

# Warp Routes

Warp routes are token bridge deployments across Hyperlane-connected chains. Use the SDK’s WarpCore and Token utilities to deploy and interact with them.

## Contract types

- **HypERC20** – Canonical (mint/burn) ERC20 warp route.
- **HypERC20Collateral** – Collateral-backed: lock on origin, mint representation on destination (or lock on destination and burn on origin).
- **HypNative** – Wrapped native asset (e.g. WETH) as a warp route.
- **HypERC721** / **HypERC721Collateral** – NFT bridges.
- **Extensions:** HypXERC20, HypERC4626Collateral, HypERC721URICollateral, etc. in `token/extensions/`.

Contracts live under `solidity/contracts/token/`; deployment and config are typically driven by the CLI and SDK (WarpCore).

## SDK usage

- **WarpCore** – Deploy and manage Warp Route deployments (config-driven, per-chain).
- **Token** – Read/write existing Warp Route contracts (balances, transfer, admin).

Deploy via CLI: `hyperlane deploy warp` with the appropriate config (see `hyperlane warp deploy --help`).

## Routing and ISMs

- Token routes use a router pattern; rate limiting or custom ISMs (e.g. RateLimitedIsm) may be used. See `isms/warp-route/` and `hooks/warp-route/` when configuring security or rate limits for warp routes.

<!--
Source references:
- sources/hyperlane/AGENTS.md (Core Contracts – token/*)
- sources/hyperlane/typescript/sdk/README.md (WarpCore, Token)
- sources/hyperlane/solidity/contracts/token/
-->
