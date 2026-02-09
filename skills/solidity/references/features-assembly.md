---
name: solidity-inline-assembly
description: Inline assembly (Yul) in Solidity — syntax, access to variables, safety.
---

# Inline Assembly

Solidity supports inline assembly (Yul dialect) for low-level control. Use when you need opcodes, fine-grained gas control, or library code that expects a specific layout.

## Syntax

```solidity
assembly {
    // Yul code
}
```

Assembly block can access local Solidity variables (by name), assign to them, and use Yul constructs. Memory/slot layout must match Solidity’s conventions when interfacing.

## Access to Variables

- **Local variables:** Referenced by name; value/slot copied as needed.
- **Storage:** Use `.slot` and `.offset` for dynamic types; follow layout (e.g. packed slots, dynamic array layout).
- **Memory:** Solidity uses a contiguous area; first free memory pointer at 0x40; arrays/structs laid out in documented order.

## Safety

Inline assembly bypasses many Solidity checks. Wrong layout or wrong opcodes can corrupt storage/memory or break invariants. Prefer high-level Solidity; use assembly only when necessary and document assumptions.

## Common Patterns

- **Low-level calls:** `call(g, a, v, in, insize, out, outsize)` — return 0 on failure.
- **Storage:** `sload(slot)`, `sstore(slot, value)`.
- **Memory:** `mload(addr)`, `mstore(addr, value)`.
- **Hashing:** Use precompile or inline keccak256 where available.

See Yul documentation for opcodes and EVM semantics.

<!--
Source references:
- https://docs.soliditylang.org/en/latest/assembly.html
- https://docs.soliditylang.org/en/latest/yul.html
-->
