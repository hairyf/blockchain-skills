---
name: openzeppelin-permit
description: EIP-2612 permit—gasless ERC20 approvals via signature; Nonces; domain separator.
---

# Permit (EIP-2612)

ERC-2612 adds **permit(owner, spender, value, deadline, v, r, s)** so a token holder can approve a spender by signing a message; the spender or a relayer submits the transaction. The holder does not need ETH for gas.

## Usage

Inherit **ERC20Permit** alongside ERC20 (and usually ERC20Metadata, since permit uses the token name for EIP-712):

```solidity
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MyToken is ERC20, ERC20Permit {
    constructor() ERC20("MyToken", "MTK") ERC20Permit("MyToken") {}
}
```

- **permit(owner, spender, value, deadline, v, r, s)**: anyone may call; it sets `allowance(owner, spender) = value` if the signature is valid and `block.timestamp <= deadline`. Uses EIP-712 typed data; nonce is taken from **Nonces** (included in ERC20Permit).
- **nonces(owner)**: returns the current nonce for that owner; must match what was signed. Replay is prevented by (chainId, contract, nonce) in the signed message.
- **DOMAIN_SEPARATOR()**: EIP-712 domain for the permit; clients need it to build the typed data (name, version, chainId, verifyingContract).

## Client flow

1. Get `nonce = token.nonces(owner)`, `deadline`, and build EIP-712 typed data for `Permit(owner, spender, value, nonce, deadline)` with the token’s domain.
2. Owner signs the typed data; get (v, r, s).
3. Anyone calls `token.permit(owner, spender, value, deadline, v, r, s)`; then the spender can use `transferFrom(owner, to, value)` in the same or a later tx.

## Nonces (standalone)

**Nonces** is used by ERC20Permit and other signature-based flows. It provides `nonces(owner)` and internal `_useNonce(owner)` / `_useCheckedNonce(owner, nonce)`. Inherit when you need replay-safe signed actions keyed by address.

## Key Points

- Use ERC20Permit for gasless approvals and better UX; same token can still use `approve`/`transferFrom`.
- Deadline and nonce are part of the signed message; never sign with a reused nonce or past deadline.
- Domain separator depends on name, version, chainId, and contract address; it changes on fork or redeploy.

<!--
Source references:
- sources/openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol
- sources/openzeppelin/contracts/utils/Nonces.sol
- https://eips.ethereum.org/EIPS/eip-2612
-->
