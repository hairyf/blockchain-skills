---
name: wormhole-features-transfer-verifier
description: Transfer Verifier for guardians and supported chains
metadata:
  author: hairy
---

# Transfer Verifier

The Transfer Verifier lets guardians verify that token bridge (and related) transfers are valid before publishing observations. When enabled for a chain, suspect transfers can be blocked.

## Enabling

Disabled by default. Enable per chain with a comma-separated list of Wormhole chain IDs:

```bash
--transferVerifierEnabledChainIDs=2
# or multiple:
--transferVerifierEnabledChainIDs=2,21
```

Only some chains have a Transfer Verifier implementation. If an unsupported chain ID is listed, the node fails to start with an error. Supported chains include certain EVM chains and Sui (e.g. 2 = Ethereum, 21 = Sui); check the guardian code for the current list.

## Behavior

When Transfer Verifier is enabled for a chain, the guardian evaluates transfer observations against the verifier before publishing. If the verifier marks a transfer as invalid or suspicious, the observation is not published (blocked). The Notary can further delay or blackhole messages when both Notary and Transfer Verifier are enabled.

## Standalone mode

The verifier can also run as a standalone monitoring tool (see `node/cmd/txverifier/README.md`) without blocking publication; in that case it is used for alerting or analysis only.

<!--
Source references:
- sources/wormhole/docs/transfer-verifier.md
- sources/wormhole/whitepapers/0014_transfer_verifier.md
-->
