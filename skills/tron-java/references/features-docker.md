---
name: java-tron Docker
description: Build and run java-tron with Docker — image build, run with config/data, SR mode, JVM options.
---

# Docker for java-tron

java-tron can be run via Docker: either build an image from source or use the official image. Useful for consistent environments and quick mainnet/testnet nodes.

## Build image from source

```bash
cd java-tron
cd docker
docker build -t tronprotocol/java-tron .
```

## Use official image

```bash
docker pull tronprotocol/java-tron
```

## Run container

Default (mainnet, built-in config):

```bash
docker run -it -d -p 8090:8090 -p 8091:8091 -p 18888:18888 -p 50051:50051 --restart always tronprotocol/java-tron
```

Ports: 8090 (HTTP FullNode), 8091 (HTTP Solidity), 18888 (P2P), 50051 (gRPC). Map others if you enable JSON-RPC or PBFT ports.

## Custom config and data

Mount config and data directories; pass `-c`, `-d`, and optionally `-jvm` and `-w` (SR):

```bash
docker run -it -d -p 8090:8090 -p 18888:18888 -p 50051:50051 \
  -v /host/conf:/java-tron/conf \
  -v /host/datadir:/java-tron/data \
  tronprotocol/java-tron \
  -jvm "{-Xmx10g -Xms10g}" \
  -c /java-tron/conf/config.conf \
  -d /java-tron/data \
  -w
```

- **-v** — Mount host conf and data into container.
- **-c** — Config path inside container (e.g. /java-tron/conf/config.conf).
- **-d** — Data/output directory inside container.
- **-jvm** — JVM options; must be in double quotes and braces, e.g. `"{-Xmx10g -Xms10g}"`.
- **-w** — Start as Super Representative (witness mode).

Ensure the mounted conf directory contains the referenced config file.

## Third-party quickstart (docker-tron-quickstart)

For a full dev stack (Full Node, Solidity Node, Event Server, TronWeb), use [docker-tron-quickstart](https://github.com/TRON-US/docker-tron-quickstart): pull `trontools/quickstart` and run per that repo. It exposes a single port (e.g. 9090) and sets up accounts for testing.

## Key Points

- Official image defaults to mainnet; override with `-c` to a Nile or custom config.
- For production SR or high-load nodes, mount persistent volumes for config and data and set JVM options with `-jvm`.

<!--
Source references:
- sources/tron-java/quickstart.md
- https://github.com/tronprotocol/java-tron (README.md, quickstart.md)
-->
