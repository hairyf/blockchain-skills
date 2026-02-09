---
name: ton-addresses
description: TON internal and external addresses, workchains, account ID derivation.
---

# TON Addresses

TON uses the **Actor model**: every entity (including wallets) is a smart contract with a unique address for message routing.

## Internal addresses

Each deployed contract has an **internal address**. TL-B:

```
addr_std$10 anycast:(Maybe Anycast) workchain_id:int8 address:bits256 = MsgAddressInt;
addr_var$11 anycast:(Maybe Anycast) addr_len:(## 9) workchain_id:int32 address:(bits addr_len) = MsgAddressInt.
```

- **addr_std**: fixed 256-bit address; use whenever possible.
- **workchain_id**: signed 8- or 32-bit. Active workchains:
  - **masterchain** (`-1`): protocol state, validators, block hashes.
  - **basechain** (`0`): default for most operations.
- **account_id** (the `address` field): in current workchains, `hash(initial_code, initial_data)` from `StateInit`. Same code+data ⇒ same address; address does not change after deployment.

## External addresses

Used by off-chain software; TON software ignores them. TL-B:

```tlb
addr_none$00 = MsgAddressExt;
addr_extern$01 len:(## 9) external_address:(bits len) = MsgAddressExt.
```

- **addr_none**: stub when no external info is needed.
- **addr_extern**: up to 9 bits of extra info (e.g. for external routing).

## Key points

- Every actor is a smart contract with a unique internal address.
- Internal address = workchain_id + account_id (256-bit in masterchain/basechain).
- Account ID = hash of contract’s initial code and data (`StateInit`).
- TON supports up to 2^32 workchains; address length can vary (64–512 bits) in future.

<!--
Source references:
- https://github.com/ton-org/docs (foundations/addresses/overview.mdx)
- foundations/addresses/formats, foundations/status
-->
