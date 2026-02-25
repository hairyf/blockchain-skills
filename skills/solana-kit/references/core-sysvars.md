---
name: solana-kit-sysvars
description: Fetch and decode Solana sysvar accounts (Clock, Rent, EpochSchedule, etc.) with typed helpers and codecs.
---

# Sysvars (Kit)

Sysvars are special on-chain accounts that expose runtime state. Kit provides typed fetch-and-decode helpers and codecs for each supported sysvar.

## Fetch and decode

```ts
import { createSolanaRpc, fetchSysvarClock } from '@solana/kit';
const rpc = createSolanaRpc('https://api.devnet.solana.com');
const clock = await fetchSysvarClock(rpc);
```

## Low-level

```ts
import { assertAccountExists, decodeAccount, fetchEncodedSysvarAccount, getSysvarClockDecoder, SYSVAR_CLOCK_ADDRESS } from '@solana/kit';
const maybeEncoded = await fetchEncodedSysvarAccount(rpc, SYSVAR_CLOCK_ADDRESS);
assertAccountExists(maybeEncoded);
const decoded = decodeAccount(maybeEncoded, getSysvarClockDecoder());
```

## Supported sysvars

Clock, EpochRewards, EpochSchedule, Fees, LastRestartSlot, RecentBlockhashes, Rent, SlotHashes, SlotHistory, StakeHistory.

## Key points

- Prefer fetchSysvar*(rpc) when you only need one sysvar. Standalone: @solana/sysvars.

<!-- Source: sources/solana-kit/packages/sysvars/README.md -->
