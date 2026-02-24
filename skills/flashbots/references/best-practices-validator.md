---
name: Validator and relay best practices
description: Trust assumptions, relay selection, and operational guidance for running mev-boost.
---

# Validator and Relay Best Practices

## Trust and relay selection

- **Relays are trusted**: Validators (and MEV-Boost) assume relays do not send blocks that could cause slashing, do not exceed the registered gas limit, and do not lie about bid values. Only connect to relays you trust.
- Use **multiple relays** for redundancy and competition; MEV-Boost will choose the highest bid among them.
- Relay lists are maintained by the community (e.g. Ethstaker, Lido); use such lists to discover relays and verify URLs.

## Consensus and beacon configuration

- Configure your **beacon node** to use MEV-Boost (builder endpoint). How to do this depends on the consensus client; see the [MEV-Boost site](https://boost.flashbots.net) for client-specific guides.
- Ensure **validator registration** (fee recipient, gas limit) is what you intend; MEV-Boost forwards registration to all configured relays.

## Minimum bid and fallback

- Use `-min-bid` if you want to avoid accepting low-value builder bids and prefer local block production when bids are below the threshold.
- If no relay returns a bid (or all are below `-min-bid`), MEV-Boost returns nothing and the consensus client builds a block locally.

## Timing and proposer boost

- Proposer boost favors blocks proposed early in the slot (e.g. within ~4 seconds). Keep relay and getHeader/getPayload timeouts aligned with your consensus client’s deadlines so you don’t miss the window.
- If using **timing games**, set `late_in_slot_time_ms` and `timeout_get_header_ms` so that MEV-Boost does not request headers so late that the block cannot be proposed in time.

## Security

- Run MEV-Boost in a trusted environment; it communicates with execution and consensus clients. Restrict network access so only your beacon node can reach MEV-Boost.
- For security issues or vulnerabilities, refer to the repository’s SECURITY.md and the documented audit (e.g. docs/audit-20220620.md).

<!--
Source references:
- README.md (Usage, Who can run, Security)
- docs/audit-20220620.md (Trust Assumptions)
- https://boost.flashbots.net
-->
