---
name: ethers-signing
description: Ethers.js signing — signMessage, verifyMessage, Signature, EIP-191 personal sign, EIP-712 typed data.
---

# Signing Messages

Signers can sign arbitrary messages (e.g. login proofs). Use `signMessage` / `verifyMessage` for EIP-191 personal sign.

## Sign and verify (EIP-191)

```ts
import { Wallet, verifyMessage } from "ethers";

const signer = new Wallet(privateKey);
const message = "sign into ethers.org?";
const sig = await signer.signMessage(message);
const recoveredAddress = verifyMessage(message, sig);  // matches signer.address
```

## Signature object

```ts
import { Signature } from "ethers";

const sig = Signature.from(rawSig);
// Use sig as struct: compact (r, yParityAndS) or expanded (v, r, s)
await contract.recoverStringFromCompact(message, sig);
await contract.recoverStringFromVRS(message, sig.v, sig.r, sig.s);
```

## Key Points

- Personal sign uses EIP-191 prefix; digest is keccak256("\x19Ethereum Signed Message:\n" + len + message).
- Use human-readable messages for user-facing auth so users can verify in MetaMask/Ledger.
- Signature.from() gives v, r, s and compact form for contracts.

<!--
Source references:
- sources/ethers/docs.wrm/getting-started.wrm
- sources/ethers/docs.wrm/cookbook/signing.wrm
- https://docs.ethers.org/v6/
-->
