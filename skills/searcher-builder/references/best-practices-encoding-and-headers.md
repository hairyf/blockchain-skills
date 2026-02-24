---
name: Encoding and headers
description: JSON vs SSZ, Content-Type and Accept, and optional Builder API headers.
metadata:
  author: hairy
---

# Encoding and Headers

## JSON (default)

- **Request:** `Content-Type: application/json`, `Accept: application/json`.
- **Response:** Server sets `Content-Type: application/json` on JSON responses.

All endpoints support JSON. Use it unless you need SSZ for size or compatibility.

## SSZ

- **Request with SSZ body:** `Content-Type: application/octet-stream` (e.g. validators, blinded_blocks).
- **Request SSZ response:** `Accept: application/octet-stream;q=1.0,application/json;q=0.9` (e.g. getHeader).
- Only a subset of endpoints support SSZ in request or response; the spec notes which.

If the server cannot satisfy the requested format it returns **406 Not Acceptable**. If the request body format is not supported it returns **415 Unsupported Media Type**. When no `Accept` is sent, treat as `application/json`.

## Builder-specific headers

- **Eth-Consensus-Version:** Required when the request or response is SSZ; indicates the consensus version (bellatrix, capella, deneb, electra, fulu). Optional for JSON.
- **Date-Milliseconds:** Optional; Unix timestamp in milliseconds when the getHeader request was sent; used for latency measurement.
- **X-Timeout-Ms:** Optional; proposer timeout in milliseconds for getHeader; relays may use it to time when to forward the request.

## Agent usage

- Prefer JSON for simplicity; set `Content-Type` and `Accept` explicitly when using SSZ.
- For getHeader, agents acting as relays can send `X-Timeout-Ms` so the builder/relay can optimize timing; include `Eth-Consensus-Version` when requesting or sending SSZ.

<!--
Source references:
- sources/searcher-builder/builder-oapi.yaml (description, headers)
- sources/searcher-builder/apis/builder/header.yaml
- sources/searcher-builder/apis/builder/blinded_blocks.yaml
-->
