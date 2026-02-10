---
name: bitcoin-core-build
description: Building Bitcoin Core from source (Unix/cmake).
---

# Building Bitcoin Core

Build is CMake-based. Platform-specific notes: see `doc/build-unix.md`, `doc/build-osx.md`, `doc/build-windows-msvc.md`, `doc/build-windows.md`, and BSD variants in repo.

## Unix (typical)

```bash
cmake -B build
cmake --build build    # add -j N for parallel jobs
cmake --install build  # optional
```

- Run `cmake -B build -LH` for config options.
- Dependencies: see `doc/dependencies.md`. Example (Ubuntu/Debian): `build-essential cmake pkgconf python3`, plus e.g. `libevent-dev libboost-dev`. For GUI add Qt dependencies.
- Memory: ≥1.5 GB RAM recommended; see doc for low-memory and clang alternatives.

## Optional Features

- **ZMQ**: `cmake -B build -DWITH_ZMQ=ON` (requires libzmq). Then set ZMQ options in config or CLI to enable block/tx notifications.
- **Wallet**: Default build includes wallet; can be disabled for minimal node.

Binaries end up in `build/src/` (e.g. `bitcoind`, `bitcoin-cli`) or install prefix.

<!--
Source references:
- https://github.com/bitcoin/bitcoin doc/build-unix.md
- https://github.com/bitcoin/bitcoin doc/dependencies.md
- https://github.com/bitcoin/bitcoin doc/zmq.md
-->
