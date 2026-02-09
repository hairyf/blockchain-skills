---
name: foundry-cheatcodes
description: Foundry cheatcodes — Vm address, Inspector, adding cheatcodes, Cheatcode trait and JSON spec.
---

# Foundry Cheatcodes

Cheatcodes are Solidity calls that manipulate the EVM during tests/scripts. They are invoked at a fixed address and intercepted by Foundry's EVM inspector.

## Vm interface and address

- **Cheatcode handler address:** `address(uint160(uint256(keccak256("hevm cheat code"))))` → `0x7109709ECfa91a80626fF3989D68f67F5b1DD12D`.
- In Solidity: `Vm constant vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);` or inherit from `forge-std/Test.sol`.

## Implementation (for contributors)

- **revm::Inspector** — Callbacks (e.g. `Inspector::call`) notify when the EVM is about to execute a call; the cheatcode inspector listens for the cheatcode address and decodes calldata.
- **Rust bindings** — Generated via Alloy `sol!` macro from the `Vm` interface in `cheatcodes/spec/src/vm.rs`. Each cheatcode is a function on `Vm` with attributes:
  - `#[cheatcode(group = <ident>)]` (required)
  - `#[cheatcode(status = Stable|Experimental)]`
  - `#[cheatcode(safety = Safe|...)]` for script safety.
- **Cheatcode trait** — Implement exactly one of: `apply` (no EVM data), `apply_stateful` (needs EVM state), `apply_full` (needs executor for recursive calls).
- **JSON spec** — Run `cargo cheats` to regenerate `cheatcodes.json` / `cheatcodes.schema.json` from the `sol!` definition; first run after adding a cheatcode updates the files (CI may fail until second run).

## Adding a new cheatcode

1. Add Solidity definition(s) in `cheatcodes/spec/src/vm.rs` (documented, named params). Compilation will fail until step 2.
2. Implement the `Cheatcode` trait for the generated call struct in the appropriate module under `crates/cheatcodes`.
3. If you added structs/enums/errors/events to `Vm`, update `spec::Cheatcodes::new`.
4. Run `cargo cheats` twice to refresh JSON (first run may fail CI).
5. Add an integration test in `testdata/default/cheats/`.

## Key Points

- All cheatcodes are defined in one `sol! { interface Vm { ... } }` and dispatched via a single match on decoded `VmCalls`.
- Use the [Foundry Book cheatcodes reference](https://book.getfoundry.sh/cheatcodes) for user-facing list; this skill is for implementation and extending.

<!--
Source references:
- https://github.com/foundry-rs/foundry/blob/master/docs/dev/cheatcodes.md
- https://github.com/foundry-rs/foundry/blob/master/crates/cheatcodes/README.md
-->
