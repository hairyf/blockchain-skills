---
name: risc0 guest optimization
description: Reducing guest cycles—profiling, paging, precompiles, and zkVM-specific tuning.
---

# Guest Optimization

Proving cost and time correlate with **guest execution cycles**. Optimize the guest like a normal program (measure first), but account for zkVM-specific costs: **paging**, **no floating point**, **alignment**, and **precompiles**.

## Measure first

- Use `env::cycle_count()` in the guest to measure hot paths; print with `eprintln!` or use a profiler.
- **Profiling**: Set `RISC0_PPROF_OUT=./out.pb`, run in dev-mode (`RISC0_DEV_MODE=1`), then e.g. `go tool pprof -http 127.0.0.1:8000 out.pb` and inspect flamegraphs. Run in dev-mode to avoid proving overhead.

## zkVM-specific costs

- **Paging** — Memory is split into ~1 kB pages. First access to a page in a segment triggers **page-in** (Merkle verification); first write triggers **page-out** at segment end. Each costs on the order of ~1k–5k cycles. Improve locality and reduce working set to cut paging.
- **Floating point** — Not native; emulated in software (tens to hundreds of cycles per op). Prefer **integers** where possible.
- **Alignment** — Unaligned `u32` access is much costlier than aligned. Keep structs and slice indices word-aligned where it matters.
- **RISC-V cycles** — Most ops 1–2 cycles; div/rem 2. Relative cost of div vs add is smaller than on a real CPU; prefer clearer code and measure.

## Use precompiles

- Use **patched crypto crates** (sha2, k256, etc.) so SHA-256 and elliptic-curve ops use precompiles and far fewer cycles. See [features-precompiles](features-precompiles.md).
- Prefer **BTreeMap** over HashMap in the guest (determinism and often better for small collections).

## I/O and serialization

- For **raw bytes** from host, use `env::read_slice` or `stdin().read_to_end()` instead of `env::read` when you don’t need deserialization to avoid extra copy/reinterpret.
- On host, use `ExecutorEnvBuilder::write_slice` for raw bytes.
- For **large inputs** where only part is needed, consider Merklized input (e.g. provide root + chunks with proofs) so the guest only touches needed chunks; see “Where’s Waldo” style examples.

## Prover acceleration

- **CUDA** (NVIDIA): build with `cuda` feature and install CUDA toolkit for faster proving.
- **Metal** (Apple): used automatically on Apple Silicon.
- **Segment size**: if memory is tight (&lt;10 GB), consider reducing segment size (e.g. `segment_limit_po2`) to lower peak RAM.

## Quick wins

- Profile; optimize the hottest code.
- Use precompiled crypto (patched crates).
- Prefer integers over float; keep data aligned; reduce memory footprint and improve locality to reduce paging.
- Try compiler options: `lto = "thin"`, `opt-level = 2` or `3`, `codegen-units = 1` (measure each).

<!--
Source references:
- sources/risc0/website/api_versioned_docs/version-3.0/zkvm/optimization.md
- sources/risc0/website/api_versioned_docs/version-3.0/zkvm/profiling.md
-->
