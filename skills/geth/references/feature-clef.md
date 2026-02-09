---
name: geth-clef
description: Clef — standalone signer for geth, external API, and UI integration.
---

# Clef

Clef is a standalone signer that can replace geth's built-in account management. DApps send sign requests to Clef; the user approves in a UI. Keys stay in Clef (or hardware), not in geth. Use when connecting to an untrusted or remote node while signing locally.

## Running Clef

- Default HTTP: `http.addr:localhost`, `http.port:8550`. Enable with `--http`.
- Geth uses it via `geth --signer http://localhost:8550` (or IPC path).

```bash
clef -keystore /path/to/keystore -chainid 1
```

## Security Model

- **External API** (HTTP/IPC): Untrusted. No credentials; only sign requests.
- **Trusted channel**: Process that started Clef (stdin/stdout when using `--stdio-ui`). Approvals and passwords go here.
- Signing and key handling are only inside the Clef binary.

## External API (JSON-RPC 2.0)

Encoding: numbers and data as hex with `0x` prefix.

| Method | Purpose |
|--------|---------|
| `account_new` | Create password-protected account; returns address. |
| `account_list` | List managed accounts. |
| `account_signTransaction` | Sign tx; params: tx object, optional method signature for decoding. Returns `raw` (RLP) and `tx` (JSON). |
| `account_signData` | Sign data; params: content type (`text/plain`, `text/validator`, `application/clique`), address, data. |
| `account_signTypedData` | EIP-712 sign; params: address, typed data object. |
| `account_ecRecover` | Recover signer from data + signature (`text/plain`). |
| `account_version` | External API version. |

Responses can be delayed or never come if the user denies. UI must handle timeouts.

## UI API (--stdio-ui)

When started with `--stdio-ui`, stdin/stdout are used for the UI. Clef sends approval requests (e.g. `ui_approveTx`, `ui_approveSignData`, `ui_approveListing`, `ui_approveNewAccount`) and expects approve/deny. One JSON-RPC message per line (no newlines inside).

- `ui_approveTx` — Transaction to sign; includes `transaction`, `call_info`, `meta`.
- `ui_approveSignData` — Data sign request.
- `ui_approveListing` — List accounts.
- `ui_approveNewAccount` — New account creation.
- `ui_onApprovedTx` — Callback after tx signed (for rules/rate limits).
- `ui_onSignerStartup` — Version and API addresses.
- `ui_onInputRequired` — Password prompt.
- `ui_showInfo` / `ui_showError` — Display only; no response.

## Commands and Flags

- `clef init` — Initialize signer storage.
- `--keystore`, `--configdir`, `--chainid`, `--rules` (auto-approve rules file), `--auditlog`, `--stdio-ui`, `--http` / `--http.port`.

## Key Points

- Use `--signer` in geth to point to Clef; do not unlock accounts in geth when using Clef.
- For custom UIs, implement the UI API and start Clef with `--stdio-ui`; see repo `cmd/clef/README.md` and `pythonsigner.py` for examples.
- Rules (and optional storage) allow auto-approving certain operations; see `rules.md` in the Clef tree.

<!--
Source references:
- https://github.com/ethereum/go-ethereum/tree/master/cmd/clef (README.md)
- https://geth.ethereum.org/docs/tools/clef/
-->
