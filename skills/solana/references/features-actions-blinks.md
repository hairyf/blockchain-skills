---
name: solana-features-actions-blinks
description: Solana Actions and Blinks — APIs that return signable transactions, actions.json, and blink URLs for agent and dApp integration.
---

# Solana Features — Actions and Blinks

**Solana Actions** are specification-compliant APIs that return transactions (or messages) for users to preview and sign. **Blinks** (blockchain links) turn an Action into a shareable URL that Action-aware clients (wallets, bots) can unfurl and execute.

## When to use

- Expose a single action (e.g. "Donate", "Stake 1 SOL") or multiple choices (e.g. "Vote Yes" / "Vote No") behind a URL.
- Let users sign and submit transactions without leaving a chat, social feed, or widget.
- Register domain routes to Action APIs via `actions.json` so clients can discover and call them.

## Actions API

- **GET** to Action URL: returns metadata (title, icon, description, label, optional `links.actions` for multiple buttons). Optional `parameters` describe user inputs (amount, choice, etc.).
- **POST** to Action URL: body `{ "account": "<base58-pubkey>" }`. Response: `{ "transaction": "<base64-serialized-tx>", "message?" }`. Client replaces fee payer and recent blockhash if not partially signed, then prompts user to sign and submit.
- **OPTIONS**: Must return CORS headers (`Access-Control-Allow-Origin: *`, etc.) so browsers and wallets can call the API. Same for `actions.json`.

## Blink URL

- Format: `https://example.com/?action=<url_encoded_action_url>`.
- Action URL scheme: `solana-action:<absolute_https_url>` (e.g. `solana-action:https://actions.example.com/donate`).
- Client decodes `action`, introspects the Action API (GET then POST), and renders UI for the user to complete signing.

## actions.json

- Served at domain root: `https://yoursite.com/actions.json`.
- Maps site paths to Action API paths. Example:

```json
{
  "rules": [
    { "pathPattern": "/donate", "apiPath": "/api/donate" },
    { "pathPattern": "/actions/*", "apiPath": "/api/actions/*" }
  ]
}
```

- `pathPattern` supports exact path and wildcards (`*` single segment, `**` multiple). Query params are preserved.
- Response must include CORS header `Access-Control-Allow-Origin: *`.

## SDK and tooling

- `@solana/actions` — build Action endpoints (GET/POST) and conform to the spec.
- Publish `actions.json` at domain root and ensure GET/OPTIONS (and POST) return required CORS headers.
- Test with [Blinks Inspector](https://www.blinks.xyz/inspector). Some clients (e.g. social unfurl) may require allowlisting (e.g. Dialect Actions Registry).

## Key points

- Actions = GET (metadata + optional params) + POST (account pubkey) → signable transaction.
- Blinks = URL containing `action=<solana-action:...>`; clients introspect and run the Action lifecycle.
- `actions.json` maps website URLs to Action API URLs; CORS and OPTIONS are required.

<!--
Source references:
- https://solana.com/developers/guides/advanced/actions
- https://github.com/solana-foundation/solana-com
-->
