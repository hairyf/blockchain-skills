---
name: bitcoin-core-config
description: bitcoin.conf and configuration precedence.
---

# bitcoin.conf Configuration

The config file is used by `bitcoind`, `bitcoin-qt`, and `bitcoin-cli`. All command-line options (except `-?`, `-help`, `-version`, `-conf`) can be set in the file; command line overrides config file.

## Format

- Plain text: `option=value` per line. No leading `-` for options.
- Comments: `#` to end of line.
- Negated options: `no` prefix, e.g. `noconnect=1`.
- Network-specific: sections `[main]`, `[test]`, `[testnet4]`, `[signet]`, `[regtest]` or prefix e.g. `regtest.rpcport=3000`. Network options override generic ones.

## Precedence

1. `bitcoin.conf` (base)
2. `settings.json` (runtime/GUI and some RPCs) can augment or replace
3. Command-line overrides both

Unrecognized options in `bitcoin.conf` are reported in `debug.log`.

## Location

- Default: `<datadir>/bitcoin.conf`. Datadir and config path can be set with `-datadir` and `-conf`.
- Use `includeconf=<file>` to include another config file.
- Example datadir: Windows `%LOCALAPPDATA%\Bitcoin\`, Linux `~/.bitcoin`, macOS `~/Library/Application Support/Bitcoin`.

## Key Options (examples)

- Chain: `testnet=1`, `signet=1`, `regtest=1`
- RPC: `rpcuser=`, `rpcpassword=`, `rpcport=`, `rpcbind=`, `rpcallowip=`
- Server: `server=1` (enable RPC in GUI)
- Pruning: `prune=N` (MB)
- Rest: `rest=1` for REST API on same port as RPC

Users should not change options they do not understand and should be wary of config provided by others.

<!--
Source references:
- https://github.com/bitcoin/bitcoin doc/bitcoin-conf.md
- https://github.com/bitcoin/bitcoin doc/files.md
-->
