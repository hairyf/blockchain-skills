---
name: bitcoin-features-wallets
description: Creating, encrypting, backing up, and managing wallets.
---

# Managing Wallets

Since 0.21 there is no default wallet. Create with `createwallet` RPC or GUI (File → Create wallet).

## Create and Encrypt

```sh
bitcoin-cli createwallet "wallet-01"
bitcoin-cli -rpcwallet=wallet-01 encryptwallet "passphrase"
# or create encrypted:
bitcoin-cli -named createwallet wallet_name=wallet-01 passphrase="passphrase"
```

Passphrase change: `walletpassphrasechange "old" "new"`. If passphrase is lost, funds are unrecoverable.

## Unlock

Encrypted wallets must be unlocked for signing/spending:

```sh
bitcoin-cli -rpcwallet=wallet-01 walletpassphrase "passphrase" 120
```

Timeout is seconds the decryption key stays in memory. GUI prompts on send.

## Backup

Use `backupwallet` (or GUI File → Backup Wallet) so the copy is consistent:

```sh
bitcoin-cli -rpcwallet=wallet-01 backupwallet /path/to/backup-01.dat
```

After encrypting or changing passphrase, create a new backup immediately (keypool/HD seed change). Store backups offline and test restore.

## Descriptor vs Legacy

Prefer **descriptor wallets** for new setups: they work with descriptors, PSBT, and `importdescriptors`. Create with `createwallet` (descriptor is default in recent versions). Legacy wallets can be migrated; see RPC docs.

## Wallet Location

Default directory (e.g. `wallets/` inside datadir): Linux `~/.bitcoin/wallets`, Windows `%LOCALAPPDATA%\Bitcoin\wallets`, macOS `~/Library/Application Support/Bitcoin/wallets`. Override with `-walletdir` or `-datadir`.

<!--
Source references:
- https://github.com/bitcoin/bitcoin doc/managing-wallets.md
-->
