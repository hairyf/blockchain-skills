---
name: openzeppelin-eoa-delegation
description: EIP-7702 EOA delegation to smart contracts, SignerEIP7702, authorization and set-code transaction.
---

# EOA Delegation (EIP-7702)

EIP-7702 lets an EOA delegate execution to a smart contract while keeping its private key. The EOA signs as usual; execution runs in the contract’s code. Use for batching (e.g. approve + transfer), sponsored txs, or limited-purpose keys. OpenZeppelin supports this via **SignerEIP7702**, which validates that the signer is the EOA (`address(this)`).

## Delegation flow

1. **Authorization**: EOA signs an authorization message containing chain ID, nonce, delegation contract address, and signature fields. This restricts execution to that contract and prevents replay. Build the authorization with the wallet/RPC (e.g. viem `signAuthorization` with `contractAddress` and `account` or `executor: "self"`).
2. **Set code**: Send a transaction with type `SET_CODE_TX_TYPE` (0x04), `authorizationList: [authorization]`, and `data` as the calldata to run in the EOA’s context. The EVM writes the delegation designator (`0xef0100 || delegateAddress`) to the EOA’s code so future calls to the EOA run the delegate contract’s code.
3. **Execute**: Subsequent calls to the EOA are handled by the delegate contract. To remove delegation, send a set-code tx with the authorization pointing to the zero address (clears code; does not clear EOA storage).

## Account contract (SignerEIP7702)

Combine `Account` with `SignerEIP7702` and (optionally) `ERC7821` for batched execution. The account’s `_rawSignatureValidation` checks the EOA’s signature; `sender` in UserOps is the EOA address. No factory needed: the “account” is the EOA once delegated.

## Using with ERC-4337

With the EOA delegated to an Account + SignerEIP7702, send UserOps with `sender: eoa.address` and `initCode: "0x"`. Sign the UserOp hash with the EOA. When calling the EntryPoint, include the same authorization in the transaction (e.g. `authorizationList: [authorization]`) so the EOA is still delegated when the EntryPoint runs. Relayers should be aware that the EOA can invalidate authorization or move assets and leave the relayer unpaid.

## Key points

- Delegate contracts must use replay-safe signatures (e.g. domain separator, nonce). A bad delegate can give an attacker control of the EOA.
- When changing delegation, use namespaced storage (e.g. ERC-7201) and treat it like an upgrade to avoid storage collisions; changing designator can make the EOA unusable if storage conflicts.
- Clearing delegation (zero address) resets code hash but does not clear EOA storage.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/eoa-delegation.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/accounts.adoc
-->
