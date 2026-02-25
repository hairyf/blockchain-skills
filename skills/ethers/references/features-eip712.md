---
name: ethers-eip712
description: Ethers.js EIP-712 typed data — signTypedData, verifyTypedData, TypedDataEncoder domain and hash.
---

# EIP-712 Typed Data Signing

Structured typed data (EIP-712) is used for permit, meta-transactions, and domain-separated signatures. Signers expose signTypedData(domain, types, value); use TypedDataEncoder for hashing or encoding without a signer.

## Sign and verify

```ts
import { ethers } from "ethers";

const domain = {
  name: "MyApp",
  version: "1",
  chainId: (await provider.getNetwork()).chainId,
  verifyingContract: contractAddress
};

const types = {
  Permit: [
    { name: "owner", type: "address" },
    { name: "spender", type: "address" },
    { name: "value", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ]
};

const value = { owner, spender, value: amount, nonce, deadline };

const sig = await signer.signTypedData(domain, types, value);
const recovered = ethers.verifyTypedData(domain, types, value, sig);  // address
```

## Hash without signing

For on-chain verification or custom flows, compute the EIP-712 hash:

```ts
import { TypedDataEncoder } from "ethers";

const hash = TypedDataEncoder.hash(domain, types, value);
// Or domain hash only: TypedDataEncoder.hashDomain(domain)
// Or struct hash: TypedDataEncoder.hashStruct("Permit", types, value)
```

## Resolve ENS in typed data

If domain or value contain ENS names, resolve them before signing (e.g. with provider):

```ts
const resolved = await TypedDataEncoder.resolveNames(domain, types, value, (name) => provider.resolveName(name));
// Then sign with resolved.domain, types, resolved.value
```

## Key Points

- signTypedData(domain, types, value) on Signer; verifyTypedData(domain, types, value, sig) returns recovered address.
- domain: name, version, chainId, verifyingContract, salt (optional).
- TypedDataEncoder.hash / hashDomain / hashStruct for hashing; resolveNames for ENS in domain/value.

<!--
Source references:
- sources/ethers/docs.wrm/cookbook/signing.wrm (EIP-712 coming soon)
- sources/ethers/lib.commonjs/hash/typed-data.d.ts
- sources/ethers/lib.commonjs/wallet/base-wallet.d.ts
- https://docs.ethers.org/v6/
-->
