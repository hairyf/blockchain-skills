---
name: bitcoin-rust-policy
description: Coding policy for rust-bitcoin—imports, re-exports, errors, rustdoc, and BIP references.
---

# Coding Policy (rust-bitcoin)

When contributing or generating code that matches rust-bitcoin style, follow these conventions (from `docs/policy.md`). Useful for agents that patch or generate code in this repo.

## Imports

- Modules first (project structure), then private imports, then public re-exports with `#[rustfmt::skip]` and manual sort.
- Avoid wildcards except: test modules (`use super::*`), enum variants (`use LockTime::*`), opcodes (`use opcodes::all::*`). Do **not** use `use crate::prelude::*`.
- Use types from the highest crate in scope: `use crate::Foo` not `units::Foo` (enforced in CI).

## Re-exports

- Do not re-export types unless it is clearly helpful. If a type from crate `bar` appears in the public API of crate `foo`, `foo` must `pub extern crate bar` at root.
- For `bitcoin`, `primitives`, `units`: non-error re-exports use `doc(inline)`; error re-exports use `doc(no_inline)`. Errors that are directly in the API are re-exported; others live in an `error` submodule.

## Return type

- Use `Self` as return type; when constructing the return value use `Self` or the type name. In error enums use `Self` for variant construction.

## Errors

- Prefer `#[non_exhaustive]` and private fields.
- Derive `Debug, Clone, PartialEq, Eq` (and `Copy` only if not non_exhaustive).
- Use `write_err!()` for `Display` when wrapping a source error.
- Suffix type names with `Error`; do **not** suffix enum variants with `Error`.
- Include context (e.g. the invalid string) and return costly input in error when applicable.
- Call `internals::impl_from_infallible!`; implement `std::error::Error` when public (feature "std").
- Messages in lower case except proper nouns and variable names.
- `expect` messages: describe why the operation is expected to succeed (precondition style), lower case.

## Rustdoc

- Use third person: “Calculates the distance” not “Calculate the distance”.
- Add `# Errors` and `# Panics` sections where relevant; example code must pass `just lint`.
- Prefer links at the bottom of the doc block (e.g. `[BIP-0341]: <url>`).
- Reference BIPs as `BIP-XXXX` (4-digit with leading zeros), e.g. `BIP-0032`, `BIP-0341`. Exceptions: module/function/variable names keep existing style (e.g. `bip32`, `bip_341_tests`).

## Derives and attributes

- Standard derives when sensible: `Debug, Copy, Clone, PartialEq, Eq, PartialOrd, Ord, Hash`.
- Use `#[track_caller]` on functions that panic on invalid arguments.
- Licensing: `// SPDX-License-Identifier: CC0-1.0` at file start.

Following this policy keeps patches and generated code consistent with the repository.

<!--
Source references:
- sources/bitcoin-rust/docs/policy.md
-->
