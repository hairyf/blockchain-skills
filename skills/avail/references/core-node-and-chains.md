---
name: avail-node-and-chains
description: Run Avail Node, select chain (dev, turing, mainnet), and use Docker or custom chain spec.
---

# Avail Node and Chains

How to run the Avail Node binary and which chains are supported. Use this when scripting node startup, CI, or deployment.

## Chains

Specify chain with `--chain <id>`. If omitted or empty, the node errors and asks you to specify (e.g. `--chain mainnet`).

| Chain ID   | Use case                |
|------------|-------------------------|
| `dev`      | Local development       |
| `dev.tri`  | Development (tri config)|
| `devnet0`  | Devnet                  |
| `turing`   | Testnet Turing          |
| `mainnet`  | Mainnet                 |
| `<path>`   | Custom JSON chain spec  |

```bash
# Development (single authority, no relay)
cargo run --locked --release -- --dev

# Testnet Turing
cargo run --locked --release -- --chain turing

# Mainnet (with data directory)
mkdir -p output
cargo run --locked --release -- --chain mainnet -d ./output

# Custom chain spec from file
./avail-node --chain /path/to/chain-spec.json
```

`--dev` implies `--enable-kate-rpc`. For other chains you must pass `--enable-kate-rpc` explicitly if you need Kate RPC.

## Optional: network name

For `dev` and `dev.tri` you can override the network name/id:

```bash
./avail-node --chain dev --network-name my-dev-chain
```

## Docker / Podman

Build and run with a single data volume; expose p2p (30333) and RPC (9944).

```bash
docker build -t availnode -f ./dockerfiles/avail-node.Dockerfile .
mkdir output
docker run --rm -p 30333:30333 -p 9944:9944 -v ./output:/output availnode --chain mainnet
```

For a dev chain with unsafe RPC (e.g. for local tooling):

```bash
docker run --rm -p 30333:30333 -p 9944:9944 -v ./output:/output availnode --dev --rpc-methods=unsafe --unsafe-rpc-external --rpc-cors=all
```

On SELinux use `:z` on the volume: `-v ./output:/output:z`.

## Key points

- Always set `--chain` (or use a custom JSON path); the binary does not default to a chain.
- Default RPC: `127.0.0.1:9944`. Use `--rpc-methods=unsafe` and `--unsafe-rpc-external` only for local dev.
- SDKs for application layer: avail-js, avail-rust, avail-go (separate repos).

<!--
Source references:
- https://github.com/availproject/avail (README.md)
- sources/avail/node/src/command.rs (load_spec)
- sources/avail/README.md
-->
