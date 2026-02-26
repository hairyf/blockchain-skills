---
name: openzeppelin-erc4626
description: ERC4626 tokenized vault—deposit/withdraw, shares, inflation attack mitigation, fee patterns.
---

# ERC4626

Standard interface for token vaults: users deposit underlying assets and receive shares; redeem shares for assets. Use for lending vaults, yield aggregators, or interest-bearing tokens.

## Core Interface

- `asset()`: underlying token address.
- `totalAssets()` / `totalSupply()`: vault state for exchange rate.
- `deposit(assets, receiver)`, `mint(shares, receiver)`: enter with assets or shares.
- `withdraw(assets, receiver, owner)`, `redeem(shares, receiver, owner)`: exit.
- `previewDeposit(assets)`, `previewMint(shares)`, `previewWithdraw(assets)`, `previewRedeem(shares)`: view-only quotes (rounding down for deposit/mint, up for withdraw/redeem).

## Inflation Attack and Virtual Offset

Empty or low-liquidity vaults are vulnerable to donation-based inflation: an attacker can skew the exchange rate so the next depositor gets 0 shares. OpenZeppelin’s implementation mitigates this with:

- **Virtual offset**: virtual shares and virtual assets in the rate so the vault is never “empty” for pricing.
- **Higher precision for shares** than for assets (e.g. more decimals for shares), improving safety of rounding.

When implementing or customizing, keep the built-in offset; avoid removing virtual shares/assets.

## Adding Fees

Fees must be consistent with the ERC4626 preview and event rules:

- **Deposit/mint**: user pays `assets` (including fee); receiver gets shares equal to `previewDeposit(assets)`. Fee is taken from the assets before converting to shares. `Deposit` event: assets paid by user (including fee).
- **Withdraw/redeem**: user receives `assets` (after fee). Fee is added to the share cost; `previewWithdraw(assets)` returns shares to burn (including fee). `Withdraw` event: shares burned (including fee), assets received (after fee).

Override `_decimalsOffset()` for the virtual-offset behavior; implement fee logic in the deposit/withdraw path and keep previews in sync.

## Key Points

- Always use the library’s virtual-offset logic for new vaults to avoid inflation attacks.
- Preview functions must match actual deposit/withdraw rounding and fees; composability depends on it.
- Fees on entry vs exit change the “buy-in” vs “exit” rate; document and test both paths.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc4626.adoc
- https://eips.ethereum.org/EIPS/eip-4626
-->
