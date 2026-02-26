---
name: openzeppelin-eoa-delegation
description: EIP-7702 EOA delegation to smart contracts—SignerEIP7702, authorization, set-code transaction, ERC-4337.
---

# EOA Delegation (EIP-7702)

EIP-7702 lets an **EOA** delegate execution to a smart contract while keeping its private key: the EOA signs as usual but runs contract code (batching, gas sponsorship, sub-keys). OpenZeppelin supports this via **SignerEIP7702**, which validates that the signer is the EOA (account) itself.

## Delegation flow

1. **Authorization**: EOA signs EIP-7702 authorization (chainId, nonce, delegate contract address, signature fields). This restricts execution to that contract and prevents replay. Build with wallet/RPC (e.g. viem `signAuthorization` with `contractAddress` and `account` or `executor: "self"`).
2. **Set-code transaction**: Send a transaction with type `SET_CODE_TX_TYPE` (0x04), `authorizationList: [authorization]`, and optional `data`. The EOA's code is set to the delegate (e.g. Account contract); the EVM runs that code when the EOA is used. The EVM writes the delegation designator (`0xef0100 || delegateAddress`) to the EOA's code.
3. **Clearing delegation**: Send set-code with delegate = zero address to restore the EOA; storage is not cleared automatically.

Use namespaced storage (e.g. ERC-7201) when changing delegates to avoid storage collisions; follow upgradeability-style care.

## Account contract (SignerEIP7702)

Build an Account that accepts EOA signatures when the account address is the EOA (delegated): combine `Account` with `SignerEIP7702` and (optionally) `ERC7821` for batched execution. The account's `_rawSignatureValidation` checks the EOA's signature; `sender` in UserOps is the EOA address. No factory needed: the "account" is the EOA once delegated.

```solidity
import { SignerEIP7702 } from "@openzeppelin/contracts/utils/cryptography/signers/SignerEIP7702.sol";

contract MyAccountEIP7702 is Account, SignerEIP7702, ... { }
```

## Using with ERC-4337

Once the EOA is delegated to an ERC-4337 Account: send UserOps with `sender: eoa.address` and `initCode: "0x"`. Sign the UserOp hash with the EOA. When calling the EntryPoint, include the same authorization in the transaction (e.g. `authorizationList: [authorization]`) so the EOA is still delegated when the EntryPoint runs. Delegates must enforce replay protection (e.g. nonce, domain separator). A bad delegate can give attackers control of the EOA. Relayers should be aware that the EOA can invalidate authorization or move assets.

## Key Points

- EIP-7702 = EOA keeps key, code comes from delegate contract. Use SignerEIP7702 so the account accepts that EOA's signatures.
- Authorization + set-code tx must be sent from the EOA; clearing delegation uses delegate address zero.
- When changing delegates, use namespaced storage and treat it like an upgrade to avoid storage collisions; clearing delegation resets code but does not clear EOA storage.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/eoa-delegation.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/accounts.adoc
- EIP-7702
-->
