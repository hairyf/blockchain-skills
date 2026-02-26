---
name: java-tron Super Representative
description: Run node as SR (witness): --witness, localwitness config, mainnet vs private testnet (genesis, seed.node, needSyncCheck, p2pversion).
---

# Super Representative (SR) Node

An SR node is a FullNode that also produces blocks. Use `-w` or `--witness` and configure the witness key.

## Launch

**Mainnet (recommended: JAR):**

```bash
java -jar FullNode.jar -p <your_private_key> --witness -c /path/to/config.conf
```

Or put the private key in config (see below) and run:

```bash
java -jar FullNode.jar --witness -c config.conf
```

**Private testnet:** Same pattern; config must define genesis and seed nodes (see below).

## Config: localwitness

Set the SR account private key so the node can sign blocks.

- **localwitness** — List of one private key (hex). Example:

```
localwitness = [
  <your_private_key>
]
```

- **localwitnesskeystore** — Optional: list of keystore file paths instead of raw key.

When the witness account uses **witnessPermission**, set **localWitnessAccountAddress** to the witness account address and put the witnessPermission signer key in `localwitness`. Otherwise, put the witness account key in `localwitness`.

## Private testnet SR setup

For a private chain where you control genesis:

1. **genesis.block** — Define `witnesses` with the SR address(es) and initial `assets` / `timestamp` / `parentHash`. Replace with your SR address.
2. **seed.node** — Set `ip.list` to the peer(s) (e.g. your node IP or other testnet nodes). All members must use the same genesis and compatible p2p.version.
3. **block.needSyncCheck** — Set to `false` for the **first** SR that starts the chain; set to `true` for others that sync from it.
4. **node.p2p.version** — Use a distinct version for your private net (e.g. `61` in older docs) so it does not mix with mainnet/testnet.

Then start with `--witness` and `-c your_private_config.conf`.

## Key Points

- One active localwitness key when running as SR; config must be kept secure.
- Mainnet SR: use official TRON config and follow [Super Representative documentation](https://tronprotocol.github.io/documentation-en/mechanism-algorithm/sr/) for eligibility and setup.
- Test on Nile or a private network before mainnet.

<!--
Source references:
- https://github.com/tronprotocol/java-tron (README.md, run.md)
- sources/tron-java/framework/src/main/resources/config.conf, config-localtest.conf
- https://tronprotocol.github.io/documentation-en/using_javatron/installing_javatron/#starting-a-block-production-node
-->
