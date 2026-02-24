---
name: features-server-security
description: ord server security—XSS, spoofing, and hosting untrusted inscription content.
metadata:
  author: hairy
  version: "2026.2.24"
  source: Generated from https://github.com/ordinals/ord (docs/src/security.md)
---

# ord Server Security

`ord server` serves **untrusted** content: anyone can publish inscriptions, including arbitrary HTML/JS, at `/content/<ID>`, `/r/undelegated-content/<ID>`, and `/r/sat/<N>/at/<INDEX>/content`. This creates XSS and spoofing risks. A domain hosting ord server should be treated as **untrusted** unless mitigated.

## Cross-site scripting (XSS)

Scripts in inscriptions run in the browser with the same origin as the page. Vanilla `ord server` has no private resources or privileged actions, so injected JS has no meaningful privilege there. **Risk** appears if:

- ord server is on the **same domain** as another app (e.g. exchange, dashboard) that has session cookies or privileged actions.
- A malicious inscription then can request that app on the user’s behalf (with cookies) and perform actions as the user.

**Mitigation**: Do not serve ord server on the same domain/port as a sensitive app. Use a separate subdomain or port for the explorer.

## Spoofing

If the explorer is at a well-known domain (e.g. ordinals.com), an attacker can publish an inscription that:

- Mimics a mint or official page and tricks users into sending funds.
- Uses the History API to change the URL path so the page appears under a trusted path (e.g. `/mint`).

**Mitigation**: Do not imply that the domain is trusted for anything beyond serving the explorer. Users should not rely on the domain for mints or payments; only for viewing inscription content.

## Hiding content

Use **hidden** (config or `ORD_HIDDEN`) to stop specific inscription IDs from being served (see core-settings). This reduces exposure of known-malicious or sensitive content but does not replace domain isolation.

<!--
Source references:
- sources/ordinals/docs/src/security.md
-->
