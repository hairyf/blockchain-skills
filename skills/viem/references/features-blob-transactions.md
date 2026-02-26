---
name: viem-blob-transactions
description: Blob transactions (EIP-4844) in viem — toBlobs, fromBlobs, setupKzg, sending blob txs.
---

# Blob Transactions (EIP-4844)

Send and work with blob transactions: large binary payloads (~128KB per blob) that are not EVM-accessible; only commitments are on-chain. Blobs are transient (~18 days). Use for rollup data, attestations, or large off-chain data references.

## Sending a blob transaction

1. **Setup KZG**: Use a KZG implementation (e.g. **c-kzg**, **kzg-wasm**) and **setupKzg(bindings, trustedSetupPath)**. Node: use **mainnetTrustedSetupPath** from `viem/node`.
2. **Create blobs**: **toBlobs({ data })** — pass hex or bytes; returns array of blob hex. Use **stringToHex** for string data.
3. **Send**: Call **walletClient.sendTransaction({ account, blobs, kzg, to?, maxFeePerBlobGas?, ... })**. Chain must support EIP-4844.

```ts
import { toBlobs, setupKzg, stringToHex, parseGwei } from 'viem'
import { mainnetTrustedSetupPath } from 'viem/node'
import * as cKzg from 'c-kzg'

const kzg = setupKzg(cKzg, mainnetTrustedSetupPath)
const blobs = toBlobs({ data: stringToHex('hello world') })

const hash = await walletClient.sendTransaction({
  account,
  blobs,
  kzg,
  maxFeePerBlobGas: parseGwei('30'),
  to: '0x...',
})
```

## Utilities

- **toBlobs({ data })**: Encode data into one or more blob hex values.
- **fromBlobs({ blobs })**: Decode blob array back to single hex (for data you encoded with **toBlobs**).
- **blobsToCommitments**, **blobsToProofs**: Blob → commitments/proofs (used internally for tx serialization).
- **commitmentToVersionedHash**, **commitmentsToVersionedHashes**: Commitment → versioned hash (e.g. for log indexing).
- **sidecarsToVersionedHashes**, **toBlobSidecars**: Sidecar/versioned-hash helpers.
- **setupKzg(bindings, trustedSetupPath)**: Create KZG instance for the client. **defineKzg** for custom setup.

## Fee

- **getBlobBaseFee**: Public action to get current blob base fee.
- **maxFeePerBlobGas**: Pass in **sendTransaction** for blob tx; otherwise estimated if supported.

## Key points

- Blob transactions require a **Wallet Client** with **account**, **blobs**, and **kzg**. No KZG needed for reading blob hashes or decoding data you already have.
- Use **toBlobs** for payloads; **fromBlobs** only for data you encoded. For generic blob content (e.g. from another source), decode according to that format.
- Blobs are not stored long-term; use external storage or indexers if you need persistence beyond the blob window.

<!--
Source references:
- https://viem.sh/docs/guides/blob-transactions
- https://viem.sh/docs/utilities/toBlobs
- https://viem.sh/docs/utilities/fromBlobs
- https://viem.sh/docs/utilities/setupKzg
-->
