---
name: solana-kit-offchain-messages
description: Build, compile, sign, verify, and encode/decode offchain messages (sRFC 3) with Kit.
---

# Offchain messages (Kit)

Offchain messages let one or more parties sign a message (e.g. contract text or encoded data) without submitting an onchain transaction. Kit provides create, sign, verify, encode, and decode utilities; messages are ratified when all required signatories have signed.

## Installation

Included in `@solana/kit`, or install standalone: `@solana/offchain-messages`.

## Building an offchain message

Use the `OffchainMessage` type: `version` (use `1` for sRFC 3), `requiredSignatories` (signers or addresses), and `content` (UTF-8 string or decoded data).

```ts
import {
  Address,
  createSignerFromKeyPair,
  OffchainMessage,
  partiallySignOffchainMessageWithSigners,
  getOffchainMessageEnvelopeEncoder,
} from '@solana/kit';

const signer = await createSignerFromKeyPair(keypair);
const offchainMessage: OffchainMessage = {
  version: 1,
  requiredSignatories: [signer, { address: address('ARiEL3q7uXvN9yZK8s2a5GfpHmQdR7cBv') }],
  content: 'Agreed terms: ...',
};

const envelope = await partiallySignOffchainMessageWithSigners(offchainMessage);
const bytes = getOffchainMessageEnvelopeEncoder().encode(envelope);
```

## Signing

- **With signers on the message:** `signOffchainMessageWithSigners(offchainMessage)` returns a `FullySignedOffchainMessageEnvelope` when all required signers are present. Use `partiallySignOffchainMessageWithSigners` when only a subset can sign.
- **With keypairs on an envelope:** `signOffchainMessageEnvelope([keyPair], offchainMessageEnvelope)` (or `partiallySignOffchainMessageEnvelope` for partial signing). Compile first with `compileOffchainMessageEnvelope(offchainMessage)` if you only have an `OffchainMessage`.

## Verifying

```ts
import {
  verifyOffchainMessageEnvelope,
  isSolanaError,
  SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATURE_VERIFICATION_FAILURE,
} from '@solana/kit';

try {
  await verifyOffchainMessageEnvelope(receivedOffchainMessageEnvelope);
} catch (e) {
  if (isSolanaError(e, SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATURE_VERIFICATION_FAILURE)) {
    // e.context.signatoriesWithInvalidSignatures, signatoriesWithMissingSignatures
  }
  throw e;
}
```

Verification confirms signatures only; it does not validate content or the list of signatories. Compare `envelope.content` to expected bytes or decode and inspect before accepting.

## Serializing and deserializing

- **Encode envelope:** `getOffchainMessageEnvelopeEncoder().encode(envelope)`.
- **Decode envelope:** `getOffchainMessageEnvelopeDecoder().decode(bytes)` → `OffchainMessageEnvelope`.
- **Decode envelope content to OffchainMessage:** `getOffchainMessageDecoder().decode(envelope.content)`.

## Key points

- Use `version: 1` for the current schema (sRFC 3). Use version-specific compilers (e.g. `compileOffchainMessageV1Envelope`) to avoid bundling unused compilers.
- Required signatories can be `MessageSigner` (for self-signing) or `{ address: Address }` when the key is not available.
- Handle `SOLANA_ERROR__OFFCHAIN_MESSAGE__SIGNATURES_MISSING` when signing if not all signers are provided.

<!--
Source references:
- sources/solana-kit/docs/content/docs/concepts/offchain-messages.mdx
- sources/solana-kit/packages/offchain-messages (README / API)
-->
