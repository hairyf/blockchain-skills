---
name: snarkjs Powers of Tau
description: Run and verify the universal Phase 1 trusted-setup ceremony (powers of tau) used by Groth16, PLONK, and FFLONK.
metadata:
  author: hairy
---

# Powers of Tau (Phase 1)

snarkjs implements the universal *powers of tau* ceremony. Any zk-SNARK project can use a common Phase 1 output; circuit-specific Phase 2 is only required for Groth16.

## CLI workflow

**Start ceremony** (curve `bn128` or `bls12-381`, power = log2(max constraints), e.g. 14 → 2^14 constraints):

```sh
snarkjs powersoftau new bn128 14 pot14_0000.ptau -v
```

**Contribute** (add entropy when prompted, or use `-e="random text"` for non-interactive):

```sh
snarkjs powersoftau contribute pot14_0000.ptau pot14_0001.ptau --name="First contribution" -v
snarkjs powersoftau contribute pot14_0001.ptau pot14_0002.ptau --name="Second" -v -e="entropy"
```

**Third-party contribution** (export challenge → contribute with external tool → import response):

```sh
snarkjs powersoftau export challenge pot14_0002.ptau challenge_0003
# use e.g. phase2-bn254 to produce response_0003
snarkjs powersoftau import response pot14_0002.ptau response_0003 pot14_0003.ptau -n="Third"
```

**Verify** the transcript:

```sh
snarkjs powersoftau verify pot14_0003.ptau
```

**Apply beacon** (delayed hash on public entropy; iterations = 2^N):

```sh
snarkjs powersoftau beacon pot14_0003.ptau pot14_beacon.ptau <hex_entropy> 10 -n="Final Beacon"
```

**Prepare Phase 2** (required before generating circuit keys):

```sh
snarkjs powersoftau prepare phase2 pot14_beacon.ptau pot14_final.ptau -v
```

**Verify final ptau** (no Phase-2-precalc warning if prepared):

```sh
snarkjs powersoftau verify pot14_final.ptau
```

## Key points

- Power up to **28** is supported (2^28 ≈ 268M constraints). Use a truncated ptau for smaller circuits to save time.
- Pre-built bn128 ptau files (54 contributions + beacon) are available; verify with the published hashes before use.
- Use `-v` / `--verbose` to see progress; use `-e="..."` for scripts.
- Phase 1 is **universal**; PLONK and FFLONK need no circuit-specific Phase 2.

<!--
Source references:
- https://github.com/iden3/snarkjs (README.md)
-->
