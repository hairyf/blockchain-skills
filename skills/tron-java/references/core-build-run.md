---
name: java-tron build and run
description: Build from source, run FullNode/SR, config files, hardware requirements.
---

# Build and Run java-tron

## Build

**Prerequisites:** Linux or macOS; JDK 8 or 17; 4+ CPU cores, 16 GB RAM, 10 GB disk. Optional: use [install_dependencies.sh](https://github.com/tronprotocol/java-tron/blob/master/install_dependencies.sh).

```bash
git clone https://github.com/tronprotocol/java-tron.git
cd java-tron
git checkout -t origin/master
./gradlew clean build -x test
```

`-x test` skips tests. FullNode.jar and Toolkit.jar are in `build/libs/`.

**As dependency (no build):**

Gradle (JitPack):

```groovy
repositories { maven { url 'https://jitpack.io' } }
dependencies { implementation 'com.github.tronprotocol:java-tron:develop-SNAPSHOT' }
```

Maven: add jitpack repository and `com.github.tronprotocol:java-tron` with version e.g. `develop-SNAPSHOT`.

## Run Full Node

**Mainnet (default config):**

```bash
java -jar ./build/libs/FullNode.jar
```

**With config file:**

```bash
java -jar ./build/libs/FullNode.jar -c config.conf
```

**Nile testnet:** use Nile config and preferably build from [nile-testnet](https://github.com/tron-nile-testnet/nile-testnet):

```bash
java -jar ./build/libs/FullNode.jar -c config-nile.conf
```

**SR (witness) mode:** add `-w` (or `--witness`) and set `localwitness = [ <private_key> ]` in config.

Monitor sync: `tail -f ./logs/tron.log`.

## Hardware (Mainnet)

| Tier | CPU | Memory | Storage | Network |
|------|-----|--------|---------|---------|
| FullNode (min) | 8 | 16 GB | 200 GB (Lite) | ≥ 5 MBit/s |
| FullNode (stable) | 8 | 32 GB | 200 GB Lite / 3.5 TB Full | ≥ 5 MBit/s |
| FullNode (recommended) | 16+ | 32 GB+ | 4 TB | ≥ 50 MBit/s |
| Super Representative | 32+ | 64 GB+ | 4 TB | ≥ 50 MBit/s |

Testnets can use lower specs. JVM tuning: [JVM Parameter Optimization](https://tronprotocol.github.io/documentation-en/using_javatron/installing_javatron/#jvm-parameter-optimization-for-mainnet-fullnode-deployment).

## Key Points

- Building in IntelliJ: run `./gradlew build` once first; use JDK 8 for Gradle; enable Annotation Processing.
- Proto compilation: project build compiles protos; or use `protoc` v3.4.0 manually.

<!--
Source references:
- https://github.com/tronprotocol/java-tron (README.md, build.md)
- https://tronprotocol.github.io/documentation-en/using_javatron/installing_javatron/
-->
