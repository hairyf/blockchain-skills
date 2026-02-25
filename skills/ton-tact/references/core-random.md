---
name: core-random
description: Pseudo-random — random, randomInt, getSeed, setSeed, nativeRandomize, nativeRandomizeLt, nativePrepareRandom.
---

# Random number generation

Pseudo-random values for contracts. Seed is block-dependent; use for non-critical randomness only.

## Usage

```tact
random(min, max);   // semi-closed: min ≤ x < max (or reversed if both negative)
randomInt();        // 256-bit unsigned; uses sha512(seed), updates seed
```

**Seed control (tests only; do not use in production):**

```tact
let seed: Int = getSeed();
setSeed(seed);      // negative seed → exit 5
```

**Randomize with value or logical time:**

```tact
nativeRandomize(x);     // mix x into seed (SHA-256 of seed||x)
nativeRandomizeLt();    // same as nativeRandomize(curLt())
nativePrepareRandom(); // calls nativeRandomizeLt(); called automatically by random/randomInt
```

Avoid `nativeRandom()` and `nativeRandomInterval(max)`; use `randomInt()` and `random(0, max)` instead.

## Key points

- `random(min, max)` never returns `max`; interval is semi-closed.
- Seed is derived from block/transaction; validators can influence it.
- Use `getSeed`/`setSeed` only in tests for reproducibility.
- First call to `randomInt()`/`random()` triggers `nativePrepareRandom()`.

<!--
Source references:
- sources/ton-tact/docs/src/content/docs/ref/core-random.mdx
-->
