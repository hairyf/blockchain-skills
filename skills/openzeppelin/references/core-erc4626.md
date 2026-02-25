---
name: openzeppelin-erc4626
description: ERC4626 tokenized vaults, shares vs assets, inflation attack mitigation, and fee patterns.
---

# ERC4626

Standard interface for token vaults: users deposit underlying assets and receive shares; shares are burned to withdraw assets. Use for yield-bearing tokens, lending vaults, wrappers. OpenZeppelin provides a base implementation with virtual offset to mitigate inflation attacks.

## Usage

```solidity
import { ERC4626 } from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyVault is ERC4626 {
    constructor(IERC20 asset_) ERC4626(asset_) ERC20("Vault Shares", "vASSET") {}
}
```

- `deposit(assets, receiver)` / `mint(shares, receiver)`: deposit assets and get shares (or mint exact shares).
- `withdraw(assets, receiver, owner)` / `redeem(shares, receiver, owner)`: burn shares and get assets.
- `previewDeposit(assets)`, `previewMint(shares)`, `previewWithdraw(assets)`, `previewRedeem(shares)`: view functions that must match actual share/asset amounts (rounding down for user when appropriate). Integrators and UIs rely on these.

## Inflation attack and virtual offset

An attacker can donate assets to an empty vault to skew the share rate so the next depositor gets rounded to 0 shares. Defend with:

1. **Virtual offset**: `ERC4626` uses virtual shares and virtual assets so the effective rate when the vault is empty is high (e.g. `10^offset`), making small donations unprofitable.
2. **Decimals**: Use more decimals for shares than the asset (e.g. asset 18, shares 18+offset) so the initial rate is safer and rounding loss is bounded.

Overriding `_decimalsOffset()` (or constructor for custom vaults) sets the offset; default implementation provides protection.

## Fees

Keep ERC4626 compliance: `preview*` must match actual amounts. For deposit fees: user pays `assets`, receiver gets `previewDeposit(assets)` shares; take fee from the assets before crediting shares. For withdraw fees: user burns `previewWithdraw(assets)` shares and receives `assets`; fee is added on top in share terms inside `previewWithdraw`. Emit `Deposit`/`Withdraw` with the values that reflect user-paid assets and received shares (including fees) so events describe the two exchange rates (buy-in vs exit).

## Key points

- Always use the library’s vault or extend it with minimal overrides; preserve preview accuracy.
- First depositor / empty-vault handling is critical; virtual offset is the recommended defense.
- For fee vaults, implement fees in deposit/mint and/or withdraw/redeem while keeping previews and events consistent with the spec.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc4626.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/tokens.adoc
-->
