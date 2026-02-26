---
name: solana-kit-functional
description: pipe() — pipeline successive transforms for transaction messages and general values; from @solana/functional.
---

# Functional pipeline (Kit)

Kit uses a functional style; transaction messages are built by applying transforms in sequence. The pipe() helper from @solana/functional (re-exported by @solana/kit) runs a value through a list of functions: pipe(initial, fn1, fn2, ...) returns fn2(fn1(initial)). Use it to build transaction messages without binding each step to a variable.

## Example

Use pipe(createTransactionMessage({ version: 0 }), m => setTransactionMessageFeePayer(addr, m), m => setTransactionMessageLifetimeUsingBlockhash(bh, m), m => appendTransactionMessageInstruction(ix, m)) to build a message. Package: @solana/functional, re-exported from @solana/kit.

## Key points

- pipe(initial, f1, f2, ...) is equivalent to f2(f1(initial)). General-purpose; not limited to transaction messages.
