---
name: hyperlane-features-isms-hooks
description: Interchain Security Modules (ISMs) and post-dispatch hooks in Hyperlane.
metadata:
  author: hairy
---

# ISMs and Hooks

ISMs verify incoming messages; hooks run post-dispatch (e.g. gas payment). Use when configuring security or gas for your app.

## Interchain Security Modules (ISMs)

- **Purpose:** Pluggable verification for messages at `Mailbox.process()`. Relayer fetches metadata; Mailbox uses recipient’s ISM or `defaultIsm`.
- **Recipient ISM:** Set via `recipientIsm(recipient)`; apps can set a custom ISM via MailboxClient’s `setInterchainSecurityModule(module)`.
- **Types:** MultisigIsm (validator signatures), AggregationIsm (combine multiple ISMs), routing/fallback ISMs, CCIP-read, hook-based ISMs. Validator set and thresholds are configured on the ISM contracts.

When debugging delivery failures, check that the relayer can obtain valid metadata for the recipient’s ISM (e.g. validator checkpoints).

## Post-dispatch hooks

- **Required hook:** Runs on every dispatch (e.g. MerkleTreeHook). Set at Mailbox as `requiredHook`.
- **Default hook:** Used when the sender doesn’t specify a custom hook (e.g. InterchainGasPaymaster). Set at Mailbox as `defaultHook`.
- **Custom hook:** Apps can pass a custom hook and metadata in `dispatch(..., customHookMetadata, customHook)` or set a default via MailboxClient’s `setHook(hook)`.

## Dispatch overloads

- `dispatch(destinationDomain, recipientAddress, messageBody)` – uses default hook and empty metadata.
- `dispatch(destinationDomain, recipientAddress, body, defaultHookMetadata)` – default hook with metadata (e.g. gas limit).
- `dispatch(destinationDomain, recipientAddress, body, customHookMetadata, customHook)` – full control.
- Use `quoteDispatch(...)` for the same overloads to get the fee before sending.

## Gas payment

- InterchainGasPaymaster (IGP) is typically used as the default hook. Apps pay for destination gas when dispatching; hook metadata specifies gas limit (e.g. via `StandardHookMetadata.overrideGasLimit(gas)`).
- GasRouter in contracts uses `destinationGas[domain]` and `quoteGasPayment(domain)`; Router base builds hook metadata accordingly.

<!--
Source references:
- sources/hyperlane/AGENTS.md (Core Contracts, Message Flow)
- sources/hyperlane/solidity/contracts/interfaces/IMailbox.sol, hooks/libs/StandardHookMetadata
- sources/hyperlane/solidity/contracts/client/GasRouter.sol
-->
