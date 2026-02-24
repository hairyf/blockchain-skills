---
name: features-gateway
description: Arweave gateway setup — TLS, main domain, custom domains, DNS TXT records.
---

# Gateway Setup

A gateway node serves content by domain. It requires TLS certificates and optional custom-domain support.

## Certificate Files

- Main domain (e.g. `gateway.example`): certificate and key at:
  - `apps/arweave/priv/tls/cert.pem`
  - `apps/arweave/priv/tls/key.pem`
- Certificate must be valid for the main domain and wildcard `*.gateway.example`.
- Custom domain (e.g. `custom.domain.example`): per-domain cert/key at:
  - `apps/arweave/priv/tls/custom.domain.example/cert.pem`
  - `apps/arweave/priv/tls/custom.domain.example/key.pem`

## Custom Domain DNS

To point a custom domain at a specific transaction, create a TXT record:

- Name: `_arweave.{custom.domain.example}`
- Value: the transaction ID (e.g. `1H0jHTlM6bYFdnrwZ4yMx92EgJITDRakse2YP_sDkBc`)

## Startup

**Command line:**

```bash
./arweave-server gateway gateway.example
```

With custom domains:

```bash
./arweave-server gateway gateway.example custom_domain custom1.domain.example custom_domain custom2.domain.example
```

**Configuration:**

```jsonc
{
  "gateway": "gateway.example",
  "custom_domains": ["custom1.domain.example", "custom2.domain.example"]
}
```

Custom domains are in addition to the main `gateway` domain.

## Key Points

- Gateway mode is enabled by the `gateway` flag or config field with the main domain name.
- Custom domains require both TLS files and DNS TXT `_arweave.{domain}` → tx id.
- Use path manifests so one tx ID can serve an entire app with multiple paths.

<!--
Source references:
- https://github.com/ArweaveTeam/arweave (doc/gateway_setup_guide.md)
-->
