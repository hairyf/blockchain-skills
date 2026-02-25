---
name: solana-durable-nonces
description: Durable transaction nonces for offline signing, scheduled txs, and multisig on Solana.
---

# Durable Nonces

Durable nonces replace the recent blockhash in a transaction so the tx does not expire in ~60–90 seconds. Use them for offline signing, scheduled execution, multisig (co-signing over time), or burst submissions without duplicate-blockhash issues.

## When to use

- **Offline signing**: Sign on an air-gapped device; submit later.
- **Multisig / DAO**: One party signs; others co-sign later (e.g. >90s).
- **Scheduled txs**: Pre-sign and submit at a future time.
- **Burst of txs**: Avoid "already processed" from shared recent blockhash.

## Concepts

- **Nonce account**: On-chain account (SystemProgram-owned, rent-exempt) storing the current nonce (32-byte value, often base58).
- **Nonce authority**: Keypair that can advance the nonce or withdraw SOL from the nonce account.
- **Advance nonce**: First instruction in a durable tx must be `SystemProgram.nonceAdvance`. It consumes the stored nonce and replaces it with a new one, so each durable tx is unique (no double-spend).

## CLI (create, advance, use)

```bash
# Create authority and nonce account keypairs
solana-keygen new -o nonce-authority.json
solana-keygen new -o nonce-account.json

# Create nonce account (authority pays rent ~0.0015 SOL)
solana create-nonce-account nonce-account.json 0.0015

# Get current nonce (use this as blockhash when building tx)
solana nonce nonce-account.json

# Advance nonce (do after each durable tx, or to get a fresh nonce)
solana new-nonce nonce-account.json

# Sign-only transfer using nonce as blockhash (offline)
solana transfer <RECIPIENT> <AMOUNT> --sign-only --blockhash <NONCE_VALUE> \
  --fee-payer co-sender.json --from <SENDER_PUBKEY> --keypair co-sender.json

# Submit later with nonce account (advance is prepended automatically)
solana transfer <RECIPIENT> <AMOUNT> --nonce nonce-account.json \
  --nonce-authority nonce-authority.json --blockhash <NONCE_VALUE> \
  --from sender.json --keypair sender.json --signer <CO_SIGNER_PUBKEY=SIGNATURE>
```

## Web3.js (create nonce account)

```ts
const nonceKeypair = Keypair.generate();
const tx = new Transaction();
tx.feePayer = nonceAuthKP.publicKey;
tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
tx.add(
  SystemProgram.createAccount({
    fromPubkey: nonceAuthKP.publicKey,
    newAccountPubkey: nonceKeypair.publicKey,
    lamports: 0.0015 * LAMPORTS_PER_SOL,
    space: NONCE_ACCOUNT_LENGTH,
    programId: SystemProgram.programId,
  }),
  SystemProgram.nonceInitialize({
    noncePubkey: nonceKeypair.publicKey,
    authorizedPubkey: nonceAuthKP.publicKey,
  }),
);
tx.sign(nonceKeypair, nonceAuthKP);
await sendAndConfirmRawTransaction(connection, tx.serialize({ requireAllSignatures: false }));
```

## Web3.js (build durable transaction)

```ts
const accountInfo = await connection.getAccountInfo(nonceKeypair.publicKey);
const nonceAccount = NonceAccount.fromAccountData(accountInfo.data);

const advanceIX = SystemProgram.nonceAdvance({
  authorizedPubkey: nonceAuthKP.publicKey,
  noncePubkey: nonceKeypair.publicKey,
});
const tx = new Transaction();
tx.add(advanceIX);
tx.add(/* your instruction(s) */);
tx.recentBlockhash = nonceAccount.nonce;  // use nonce as blockhash
tx.feePayer = payer.publicKey;
tx.sign(nonceAuthKP);
// Optional: serialize and submit later
const serialized = bs58.encode(tx.serialize({ requireAllSignatures: false }));
```

## Key points

- First instruction must be `nonceAdvance`; runtime uses stored nonce as blockhash and advances it so the same signed tx cannot be replayed.
- Nonce account needs ~0.0015 SOL for rent; authority can withdraw when done.
- Fetch current nonce before building each durable tx (or advance once per tx).

<!--
Source references:
- https://github.com/solana-foundation/solana-com (apps/docs/content/guides/advanced/introduction-to-durable-nonces.mdx)
- https://docs.anza.xyz/implemented-proposals/durable-tx-nonces
-->
