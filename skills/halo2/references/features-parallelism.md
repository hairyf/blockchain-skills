---
name: halo2-features-parallelism
description: Controlling parallelism and multicore in halo2
metadata:
  author: hairy
---

# Parallelism

halo2 uses **rayon** for parallel computation. You can control the number of threads or disable parallelism.

## Environment variable

```bash
export RAYON_NUM_THREADS=8
```

Set before running keygen or proving. If unset, rayon uses the default (often all logical cores).

## Disabling multicore

Disable the `"multicore"` feature on `halo2_proofs`:

```toml
[dependencies]
halo2_proofs = { version = "...", default-features = false }
```

Warning: disabling multicore significantly reduces performance; use only when needed (e.g. embedded or single-threaded environments).

## Key points

- No code changes required; parallelism is used internally in FFT, MSM, and other steps.
- Use `RAYON_NUM_THREADS` to cap or fix thread count for reproducible or resource-limited runs.

<!--
Source references:
- https://github.com/zcash/halo2 (root README)
- halo2_proofs uses rayon for parallel computation
-->
