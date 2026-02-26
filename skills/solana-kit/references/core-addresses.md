---
name: solana-kit-addresses
description: Address type, validation, PDA derivation, and address codecs in Kit.
---

# Addresses (Kit)

Kit uses a nominal `Address` type for base58-encoded Solana addresses and provides validation, PDA derivation, and encode/decode codecs. Use `@solana/addresses` standalone or via `@solana/kit`.

## Types

- **Address:** String that validates as a base58 Solana address. Use for function parameters that expect a well-formed address.
- **ProgramDerivedAddress:** Tuple of `[Address, number]` (PDA and bump). Use `assertIsProgramDerivedAddress` / `isProgramDerivedAddress` for validation.
- **ProgramDerivedAddressBump:** Integer 0–255 used as the bump seed so the derived address is off the Ed25519 curve.

## Validation and coercion

```ts
import { address, assertIsAddress, isAddress } from '@solana/addresses';

// Coerce untrusted string to Address (throws if invalid).
const addr = address(userInput);

// Assert in place (throws if invalid).
assertIsAddress(someString);

// Type guard (refines type when true).
if (isAddress(ownerAddress)) {
  await rpc.getBalance(ownerAddress).send();
}
```

For known-good literal addresses, use a type cast to avoid runtime validation: `'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr' as Address`.

## PDA derivation

```ts
import { getAddressEncoder, getProgramDerivedAddress } from '@solana/addresses';

const addressEncoder = getAddressEncoder();
const [pda, bumpSeed] = await getProgramDerivedAddress({
  programAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL' as Address,
  seeds: [
    addressEncoder.encode(ownerAddress),
    addressEncoder.encode(tokenProgramAddress),
    addressEncoder.encode(mintAddress),
  ],
});
```

## Address with seed

Derive an address from a base address, program address, and seed (string or bytes).

```ts
import { createAddressWithSeed } from '@solana/addresses';

const derivedAddress = await createAddressWithSeed({
  baseAddress: 'B9Lf9z5BfNPT4d5KMeaBFx8x1G4CULZYR1jA2kmxRDka' as Address,
  programAddress: '445erYq578p2aERrGW9mn9KiYe3fuG6uHdcJ2LPPShGw' as Address,
  seed: 'data-account',
});
```

## Codecs

- **Encode:** `getAddressEncoder().encode(addr)` → 32-byte `Uint8Array`.
- **Decode:** `getAddressDecoder().decode(bytes)` → `Address` and read offset.

## Public key to address

```ts
import { getAddressFromPublicKey } from '@solana/addresses';
const address = await getAddressFromPublicKey(publicCryptoKey);
```

## Key points

- Prefer `address()` for untrusted input; use type assertion for literals to avoid unnecessary checks.
- Use `getProgramDerivedAddress` with up to 16 seeds; seeds are encoded (e.g. with `getAddressEncoder().encode(...)`) when they are addresses.
- For PDA/bump tuples from untrusted sources, use `assertIsProgramDerivedAddress()` or `isProgramDerivedAddress()`.

<!--
Source references:
- sources/solana-kit/packages/addresses/README.md
-->
