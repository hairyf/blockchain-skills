---
name: wormhole-core-overview
description: Wormhole protocol overview, VAA model, and core vs application layers
metadata:
  author: hairy
---

# Wormhole Overview

Wormhole is a generic cross-chain messaging protocol. Guardians observe finalized messages from connected chains, reach consensus, and produce **Signed VAAs** (Verifiable Action Approvals). Applications (e.g. Token Bridge, NFT Bridge) sit on top of the core; the core does not hold assets or deliver messages—only attests state.

## Key concepts

- **Core contract (per chain)**: Exposes `postMessage(payload, consistencyLevel)` and emits events guardians observe. Tracks sequence per emitter. Fee is paid in native currency when posting.
- **VAA**: Signed attestation from the guardian set. Identified by `(emitterChain, emitterAddress, sequence)`. Body hash is used for replay protection.
- **Guardian set**: Multisig of nodes that observe chains and sign observations once quorum is reached. Set is upgraded via governance.
- **Delivery**: Off-chain. Relayers or users fetch the signed VAA (e.g. from guardian public RPC or Wormholescan) and submit it to the target chain contract.

## Flow

1. **Publish**: User or contract calls core bridge `postMessage` on source chain (max 750 bytes payload).
2. **Observe**: Guardians watch the chain, wait for the requested consistency level, then sign the observation and gossip until quorum.
3. **Attest**: Signed VAA is published on the P2P network and can be retrieved via public API.
4. **Execute**: Anyone submits the VAA to the target chain contract (e.g. Token Bridge `completeTransfer`); the contract verifies guardian signatures and processes the payload.

## Chain IDs and addresses

- Chain IDs are `uint16` Wormhole chain identifiers (e.g. Ethereum = 2, Solana = 1). Defined in `vaa/structs.go` and in SDK constants.
- Addresses in VAAs are 32-byte, left-zero-padded (e.g. EVM 20-byte address).

## Key points

- Core is application-agnostic; Token Bridge and NFT Bridge are separate modules that interpret payloads and manage custody/wrapped assets.
- Official docs and contract addresses: [docs.wormhole.com](https://docs.wormhole.com/), [Live Contracts](https://docs.wormholenetwork.com/wormhole/contracts).
- In-repo TypeScript SDK under `sdk/js` is deprecated; use [@wormhole-foundation/sdk](https://github.com/wormhole-foundation/wormhole-sdk-ts) for new integrations.

<!--
Source references:
- sources/wormhole/README.md
- sources/wormhole/whitepapers/0001_generic_message_passing.md
- sources/wormhole/sdk/README.md, sdk/js/README.md
-->
