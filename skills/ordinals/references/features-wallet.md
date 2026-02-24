---
name: features-wallet
description: ord wallet subcommands and Bitcoin Core integration for inscriptions and sat control.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (docs/src/guides/wallet.md, README)
---

# ord Wallet

`ord` does not implement a wallet; `ord wallet` subcommands operate on **Bitcoin Core wallets**. ord handles sat control and inscription construction; Bitcoin Core holds keys and signs. Requires Bitcoin Core 28+ with `txindex=1` and cookie (or RPC user/pass) auth.

## Main subcommands (capabilities)

| Command | Purpose |
|---------|---------|
| `ord wallet create` | Create ord wallet in Bitcoin Core (default name `ord`). |
| `ord wallet receive` | Get a receive address; receive sats/inscriptions. |
| `ord wallet inscribe [--batch FILE]` | Inscribe file(s); batch uses YAML with pointer/parent. |
| `ord wallet send <ADDRESS> <INSCRIPTION_ID>` | Send inscribed sat to address. |
| `ord wallet send <ADDRESS> <AMOUNT>` | Send cardinal sats. |
| `ord wallet inscriptions` | List inscriptions in wallet. |
| `ord wallet balance` | Show cardinal and ordinal balances. |
| `ord wallet sats` | List UTXOs with sat ranges. |
| `ord wallet runes` | Rune balances (when runes indexed). |
| `ord wallet restore` | Restore wallet from descriptor/backup. |
| `ord wallet backup` / `dump` | Backup or dump wallet data. |

Use `--name <WALLET>` to target a wallet other than `ord`. After running a wallet command, that wallet may remain loaded in Bitcoin Core.

## Batch inscribing

```bash
ord wallet batch --fee-rate 21 --batch batch.yaml
```

Batch YAML lists files and optional parent/pointer/metadata. Multiple inscriptions in one tx; pointer assigns each to a different sat. Useful for collections.

## Safety

- Do **not** use `bitcoin-cli` send / RPC sends from the same wallet without sat awareness—you may move inscribed sats as fee or change.
- Keep ordinal and cardinal wallets **separate**; do not hold large amounts in the ord wallet.
- ord loads the ord wallet automatically for wallet commands; be aware which wallet is loaded in Bitcoin Core after use.

<!--
Source references:
- sources/ordinals/docs/src/guides/wallet.md
- sources/ordinals/README.md
-->
