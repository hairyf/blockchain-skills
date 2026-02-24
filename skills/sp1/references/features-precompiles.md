---
name: sp1-features-precompiles
description: Adding custom precompile chips to extend the zkVM.
---

# SP1 Precompiles

Precompiles are custom chips that extend the zkVM with efficient, constrained logic (e.g. crypto or big-int ops). They run as syscalls from the program and are implemented as part of the core machine.

## When to add a precompile

Use a precompile when an operation is expensive in vanilla RISC-V but can be expressed as a small, fixed constraint system. Examples in SP1: BN254, BLS12-381, secp256k1, SHA, uint256 mul. Adding one requires implementing execution, trace generation, and AIR evaluation.

## Implementation outline

1. **Chip struct and columns**  
   In `core/src/syscall/precompiles/`, define a struct and column layout (e.g. inputs, memory reads/writes, output).

2. **Syscall trait**  
   Implement `Syscall`: `num_extra_cycles`, and `execute(rt, syscall, arg1, arg2)` to run the op in the runtime (e.g. read pointers, compute, write result).

3. **MachineAir trait**  
   Implement `MachineAir<F>`: `name`, `generate_trace` (from execution record to trace matrix), and `included` (when this chip has work). Register the chip’s events in `PrecompileEvent` and `get_local_mem_events` in `core/executor/src/events/precompiles/mod.rs`.

4. **Air and BaseAir**  
   Implement `BaseAir::width` and `Air::eval` so the constraint system matches execution. Mismatches here cause proof failures.

5. **Syscall code**  
   Add a new `SyscallCode` variant, update `from_u32`, insert the chip in `default_syscall_map`, and update `get_chips_and_costs` and `estimate_area`.

6. **Expose to programs**  
   In `zkvm/entrypoint/src/syscalls/`, add an `extern "C"` function that issues the ecall with the new syscall code, and export the constant in `syscalls/mod.rs`.

7. **Tests**  
   Add a test program under `crates/test-artifacts/programs` that calls the precompile, build with `cargo prove build`, include the ELF in test-artifacts, and add a test that runs the program (e.g. `run_test_io::<CpuProver<_, _>>(program, SP1Stdin::new())`).

## Key points

- Execution (`execute`) and constraints (`eval`) must agree; otherwise proofs fail or are unsound.
- Register the precompile in the executor’s `PrecompileEvent` and syscall map so traces and costs are correct.
- Test with a real zkVM program and `cargo test --release` in the core crate.

<!--
Source references:
- sources/sp1/crates/core/machine/src/syscall/precompiles/README.md
-->
