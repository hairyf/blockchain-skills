---
name: geth-cli
description: Geth command-line options, subcommands, and config.
---

# Geth CLI

Geth is driven by the `geth` command and command-line flags. Subcommands provide console, attach, db ops, import/export, dumpconfig, etc.

## Getting Help

```bash
geth --help
geth <command> --help
```

## Important Flag Groups

- **Account**: `--keystore`, `--signer` (Clef URL or IPC path), `--usb` (hardware wallets), `--password` (file for non-interactive).
- **API**: `--http` / `--http.addr` (default localhost), `--http.port` (8545), `--http.api` (default `eth,net,web3`). Same pattern for `--ws`, `--ws.port` (8546), `--ws.api`. `--ipcdisable` / `--ipcpath` for IPC.
- **Ethereum**: `--config` (TOML), `--datadir`, `--mainnet`, `--holesky`, `--sepolia`, `--networkid`, `--syncmode`, `--snapshot`.
- **Beacon**: `--beacon.api` (consensus client API URL), `--beacon.checkpoint`, etc.
- **Dev**: `--dev` (ephemeral PoA with prefunded account, mining), `--dev.gaslimit`, `--dev.period`.
- **Logging**: `--verbosity` (0–5), `--log.format` (json|logfmt|terminal), `--log.file`, `--log.rotate`.
- **RPC limits**: `--rpc.gascap`, `--rpc.evmtimeout`, `--rpc.txfeecap`, `--rpc.batch-request-limit`.

## Subcommands (examples)

- `geth console` — Start node + JS console.
- `geth attach [endpoint]` — Attach to running node (default IPC).
- `geth account list` / `account new` / `account update` — Keystore management.
- `geth dumpconfig` — Export current options as TOML.
- `geth init` — Initialize genesis; `geth import` / `export` — blockchain file.
- `geth db`, `geth snapshot`, `geth verkle` — Low-level DB/snapshot/verkle commands.

## Config File

Use a TOML file instead of many flags:

```bash
geth --config /path/to/config.toml
```

Produce a template from current flags:

```bash
geth --http --http.api eth,net,web3 dumpconfig
```

## Key Points

- Default HTTP API list is `eth,net,web3`; enable `admin`, `debug`, `txpool` etc. only when needed and avoid exposing them over HTTP/WS.
- `--allow-insecure-unlock` is deprecated and unsafe when HTTP/WS is enabled.
- Testnets use nested datadir (e.g. `~/.ethereum/holesky`); attach with explicit IPC path if needed: `geth attach <datadir>/holesky/geth.ipc`.

<!--
Source references:
- https://geth.ethereum.org/docs/fundamentals/command-line-options
- https://github.com/ethereum/go-ethereum (README.md)
-->
