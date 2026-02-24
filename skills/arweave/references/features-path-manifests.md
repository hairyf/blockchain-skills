---
name: features-path-manifests
description: Arweave path manifest schema — multi-path apps, index path, paths to transaction IDs.
---

# Path Manifests

Path manifests are JSON documents stored in a single transaction. They map URL subpaths to transaction IDs so one root TX can represent a multi-file app or site. Gateways use them to serve paths like `/{tx_id}/path/to/file`.

## Schema

| Field              | Mandatory | Type   | Description |
|--------------------|-----------|--------|-------------|
| `manifest`         | ✓         | string | MUST be `arweave/paths`. |
| `version`          | ✓         | string | Spec version, e.g. `0.1.0` (semver). |
| `index`            |           | object | Default behavior when manifest is accessed directly. |
| `index.path`       |           | string | Default path to load; MUST be a key in `paths`, not a tx ID. |
| `paths`            | ✓         | object | Map subpath → `{ "id": "<transaction_id>" }`. |
| `paths[path].id`   | ✓         | string | Transaction ID for that path. |

The manifest transaction MUST contain only this JSON (no other data). Tag with `Content-Type: application/x.arweave-manifest+json`.

## Example

```json
{
  "manifest": "arweave/paths",
  "version": "0.1.0",
  "index": {
    "path": "index.html"
  },
  "paths": {
    "index.html": { "id": "cG7Hdi_iTQPoEYgQJFqJ8NMpN4KoZ-vH_j7pG4iP7NI" },
    "css/style.css": { "id": "fZ4d7bkCAUiXSfo3zFsPiQvpLVKVtXUKB6kiLNt2XVQ" },
    "assets/img/logo.png": { "id": "QYWh-QsozsYu2wor0ZygI5Zoa_fRYFc8_X1RkYmw_fU" }
  }
}
```

When `index` is omitted, gateways typically serve a listing of all paths.

## Usage

- Upload each asset as its own transaction; collect tx IDs.
- Create one transaction whose body is only the manifest JSON; add tag `Content-Type: application/x.arweave-manifest+json`.
- Reference the manifest tx ID as the app root; gateways resolve `/{manifest_tx_id}/path` to the tx in `paths[path].id`.

## Key Points

- `index.path` must reference a key in `paths`, not a raw transaction ID.
- Path keys are subpaths (e.g. `js/app.js`, `index.html`).
- One manifest tx = one deployable app/site with many underlying data tx IDs.

<!--
Source references:
- https://github.com/ArweaveTeam/arweave (doc/path-manifest-schema.md)
-->
