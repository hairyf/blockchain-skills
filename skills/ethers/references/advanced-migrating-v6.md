---
name: ethers-migrating-v6
description: Ethers v5 to v6 — BigInt, Contract proxy, imports, BrowserProvider, FeeData, Signature class, utils renames.
---

# Migrating from v5 to v6

High-level changes agents need when updating or writing v6 code.

## BigInt instead of BigNumber

```ts
// v5
value = BigNumber.from("1000");
sum = value1.add(value2);

// v6
value = 1000n;
sum = value1 + value2;
```

## Provider / import

- `Web3Provider` → `BrowserProvider` (EIP-1193).
- `provider.sendTransaction` → `provider.broadcastTransaction`.
- All exports from root: `import { JsonRpcProvider } from "ethers"` or `import { JsonRpcProvider } from "ethers/providers"`.

## Contract

- Contract is ES6 Proxy; method names resolved at runtime.
- v5: `contract.callStatic.foo(addr)`, `contract.estimateGas.foo(addr)`.
- v6: `contract.foo.staticCall(addr)`, `contract.foo.estimateGas(addr)`, `contract.foo.populateTransaction(addr)`.
- Ambiguous overloads: use Typed API or full signature, e.g. `contract.foo(Typed.address(addr))`.

## Fee data

- v5: `getGasPrice()`, `lastBaseFeePerGas` in fee data.
- v6: Use `(await provider.getFeeData()).gasPrice` for legacy; `maxFeePerGas` for EIP-1559 (auto-calculated). No `lastBaseFeePerGas`; use `block.baseFeePerGas` if needed.

## Signature and transaction

- Signature is a class: `Signature.from(sigBytes)`; `sig.serialized` for bytes.
- Transaction: `Transaction.from(txBytes)`; `tx.serialized`.

## Utils renames

- `formatBytes32String` / `parseBytes32String` → `encodeBytes32String` / `decodeBytes32String`.
- `constants.AddressZero` / `HashZero` → `ZeroAddress` / `ZeroHash`.
- `hexDataSlice` → `dataSlice`; `hexZeroPad` → `zeroPadValue`.
- `hexlify(35)` → `toBeHex(35)`; `arrayify` → `getBytes`; `hexValue` → `toQuantity`.
- `solidityPack` → `solidityPacked`; `solidityKeccak256` → `solidityPackedKeccak256`.
- `AbiCoder.defaultAbiCoder` → `AbiCoder.defaultAbiCoder()`.

## Key Points

- Use native BigInt and v6 Provider/Contract/Signature APIs in new code.
- Static network: `new JsonRpcProvider(url, network, { staticNetwork: network })` to skip chainId lookup.

<!--
Source references:
- sources/ethers/docs.wrm/migrating.wrm
- https://docs.ethers.org/v6/
-->
