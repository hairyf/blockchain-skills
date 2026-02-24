---
name: wormhole-features-governor-and-notary
description: Chain Governor limits, release/drop pending VAA, Notary approve/delay/blackhole
metadata:
  author: hairy
---

# Governor and Notary

## Chain Governor

Optional plugin; disabled by default. When enabled (`--chainGovernorEnabled=true`), enforces per-chain daily limits and max transfer size. VAAs that would exceed limits are held pending; release time is typically 24–72 hours.

**Admin commands** (via `guardiand admin ... --socket /path/to/admin.sock`):

- `governor-status` — List chains, limits, 24h total, and pending VAAs (emitter/seq, value, release time).
- `governor-release-pending-vaa "chainId/emitter/sequence"` — Manually release a pending VAA (does not count toward 24h limit). Use rarely; avoid for suspected exploits.
- `governor-drop-pending-vaa "chainId/emitter/sequence"` — Permanently drop; only for confirmed fraud affecting the network.
- `governor-reset-release-timer "chainId/emitter/sequence" "days"` — Reset release timer (max 7 days). For investigation time, not routine use.

Flow cancel extension: `--governorFlowCancelEnabled=true` to enable.

## Notary

Disabled by default (`--notaryEnabled=true` to enable). Evaluates message publications and can Approve, Delay, or Blackhole. Currently only affects processing when Transfer Verifier is also enabled.

- **Approve**: Process normally.
- **Delay**: Hold for manual review (default 4 days, max 30). Stored with release time.
- **Blackhole**: Permanently block from publication.

**Admin commands:**

- `notary-get-delayed-message "chainId/emitter/sequence"` — Details of a delayed message.
- `notary-get-blackholed-message "chainId/emitter/sequence"` — Details of a blackholed message.
- `notary-list-delayed-messages` / `notary-list-blackholed-messages` — List all.
- `notary-release-delayed-message "chainId/emitter/sequence"` — Release delayed VAA immediately.
- `notary-blackhole-delayed-message "chainId/emitter/sequence"` — Move delayed to blackhole.
- `notary-remove-blackholed-message "chainId/emitter/sequence"` — Move blackholed back to delayed (zero delay). Use only if blackholing was wrong.
- `notary-reset-release-timer "chainId/emitter/sequence" "days"` — Reset delay (0–30 days).

Message ID format: `chain_id/emitter_address/sequence_number` (e.g. `1/0000...585/12345`).

<!--
Source references:
- sources/wormhole/docs/governor.md
- sources/wormhole/docs/notary.md
-->
