---
name: bitvm-chunk-api
description: Chunk API, tapscripts, disprove logic, and data types for Groth16 verifier.
metadata:
  author: hairy
---

# Chunk API and Tapscripts

The chunk layer splits the Groth16 verifier into executable Taproot scripts with defined inputs/outputs. Verifiers validate assertions and can disprove invalid operator claims.

## API Layout

- **api**: Interface between verifier and external modules (e.g. bridge).
- **api_compiletime_utils**: Presigning and compile-time interfacing.
- **api_runtime_utils**: Assertion and disprove at runtime.
- **elements**: Data structures for chunk inputs/outputs.
- **g16_runner_core**: Execute chunked Groth16 verifier and collect results.
- **g16_runner_utils**: Tapscript wrappers used by g16_runner_core.
- **wrap_hasher**: BLAKE3 u4 hasher wrapper. **wrap_wots**: Winternitz wrapper.

## Data Types

Runtime chunk I/O:

```rust
pub enum DataType {
    Fp6Data(ark_bn254::Fq6),   // Fp12 second coeff: a in (1 + a*J)
    G2EvalData(ElemG2Eval),   // G2 accumulator + line eval + partial mul
    G1Data(ark_bn254::G1Affine),
    U256Data(ark_ff::BigInt<4>),  // 256-bit field/curve inputs
}
```

Element role (for Merkle commitment representation):

```rust
pub(crate) enum ElementType {
    Fp6, G2EvalPoint, G2EvalMul, G2Eval, FieldElem, ScalarElem, G1,
}
```

`G2EvalPoint` = input to step_1 (only T4); `G2EvalMul` = input to step_2 (all but T4); `G2Eval` = base output of both tapscripts.

## Fp12 Multiplication in Tapscripts

Dense-dense mul: for `f = 1 + c*J`, `g = 1 + d*J` verify `h = f*g` as `e == (c+d)/(1+c*d*V)` (with hint `c`). Three-element mul `(1+a*J)(1+b*J)(1+d*J)` is done in two segments (partial then final), used in point-op line evaluation chunks.

## Point Ops and Line Evaluations

Two fragments:

1. **chunk_point_ops_and_multiply_line_evals_step_1**: `T4 += Q4`; compute `le_4, le_3, le_2`; output partial mul `(a+b)`, `(1+ab*V)` plus updated `T4` and `le_2`.
2. **chunk_point_ops_and_multiply_line_evals_step_2**: Completes `lev = le_2*le_3*le_4`; checks `e*[(1+ab*V)+(a+b)*d*V] ?= (a+b)+d*(1+ab*V)`; output `lev`.

## Merkle Bitcommitments

To avoid two bitcommitments per step_1, A (= T4) and B (= a+b, ab, le_2) are Merkle leaves; root is committed. Each tapscript receives one preimage and the sibling hash as hint to recompute root.

## Disprove Logic (Pseudocode)

```rust
fn disprove_core(input, Option<output>, operator_claimed_input_hash, operator_claimed_output_hash) {
    let input_is_valid = input.is_valid();
    if input_is_valid {
        output = output.or_else(|| fn(input)); fn_valid(input, output);
    } else {
        push mock_output;
    }
    assert(Hash_fn(input), operator_claimed_input_hash);
    can_disprove = !input_is_valid || Hash_fn(output) != operator_claimed_output_hash;
}
```

Stack: `[input, output, input_is_valid]`; altstack: claimed hashes. Verifier wins if `can_disprove` is true.

## Hashing

**blake3_u4** hasher: message on stack only; use main/alt stack for preimages vs hashes. `blake3compiled::hash_messages()` adds hashing layer: check `Hash(input)==claimed_input_hash` and, when input valid, `Hash(output)!=claimed_output_hash`.

## Security and Tests

- 20-byte hashes for 160-bit second-preimage resistance (collision resistance not required in BitVM).
- Full E2E: `cargo test --package bitvm --lib -- chunk::api::test::full_e2e_execution --exact --nocapture`.
- Step-wise: compile partial scripts, generate signed assertions, validate, then corrupt assertions and run disprove test (`test_fn_compile`, `test_fn_generate_signatures`, `test_fn_validate_assertions`, `test_fn_disprove_invalid_assertions` with `--ignored`).

<!--
Source references:
- sources/bitvm/docs/chunk_instructions.md
- sources/bitvm/bitvm/src/chunk/
-->
