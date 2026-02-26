---
name: openzeppelin-erc4626
description: ERC4626 tokenized vaults—deposit/withdraw, shares vs assets, inflation attack mitigation, fee patterns.
---

# ERC4626

Standard interface for token vaults: users deposit underlying assets and receive shares; redeem shares for assets. Use for lending vaults, yield aggregators, or interest-bearing tokens. OpenZeppelin provides a base implementation with virtual offset to mitigate inflation attacks.

## Usage

```solidity
import { ERC4626 } from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyVault is ERC4626 {
    constructor(IERC20 asset_) ERC4626(asset_) ERC20("Vault Shares", "vASSET") {}
}
```

- `asset()`: underlying token address. `totalAssets()` / `totalSupply()`: vault state for exchange rate.
- `deposit(assets, receiver)` / `mint(shares, receiver)`: enter with assets or shares.
- `withdraw(assets, receiver, owner)` / `redeem(shares, receiver, owner)`: exit.
- `previewDeposit(assets)`, `previewMint(shares)`, `previewWithdraw(assets)`, `previewRedeem(shares)`: view-only quotes (rounding down for deposit/mint, up for withdraw/redeem); must match actual amounts.

## Inflation attack and virtual offset

Empty or low-liquidity vaults are vulnerable to donation-based inflation: an attacker can skew the exchange rate so the next depositor gets 0 shares. Defend with:

1. **Virtual offset**: `ERC4626` uses virtual shares and virtual assets so the vault is never "empty" for pricing (e.g. `10^offset`), making small donations unprofitable.
2. **Decimals**: Use more decimals for shares than the asset so the initial rate is safer and rounding loss is bounded.

Override `_decimalsOffset()` for the virtual-offset behavior; keep the built-in offset when customizing.

## Fees

Fees must be consistent with the ERC4626 preview and event rules: **Deposit/mint**: user pays `assets` (including fee); receiver gets shares equal to `previewDeposit(assets)`; take fee from assets before crediting shares. **Withdraw/redeem**: user receives `assets` (after fee); fee is added to the share cost in `previewWithdraw`. Emit `Deposit`/`Withdraw` with values that reflect user-paid assets and received shares so events describe buy-in vs exit rates.

## Key Points

- Always use the library's virtual-offset logic for new vaults to avoid inflation attacks.
- Preview functions must match actual deposit/withdraw rounding and fees; composability depends on it.
- For fee vaults, implement fees in deposit/mint and/or withdraw/redeem while keeping previews and events consistent with the spec.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc4626.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/tokens.adoc
- https://eips.ethereum.org/EIPS/eip-4626
-->
