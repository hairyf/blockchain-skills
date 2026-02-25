---
name: Token 2022 Extensions
description: Token Extensions Program (Token 2022) in Anchor—ExtensionType, tlv_data, anchor-spl helpers, and extension lifecycle.
---

# Token 2022 Extensions

The Token Extensions Program (Token 2022) adds optional **extensions** to mints and token accounts. Extensions are enabled at creation time; most cannot be added later. Use `anchor-spl`'s `token_2022` and `token_2022_extensions` for instructions and types.

## Extension lifecycle

- **Mint / account creation**: Most extensions are set when the mint or token account is created. Plan which extensions you need up front.
- **Add after creation** (exceptions): `cpi-guard`, `memo-transfer`, `token-group`, `token-member`, `token-metadata` can be added to an existing account.
- **Incompatibilities**: Some extensions cannot be combined (e.g. NonTransferable and TransferFeeConfig). Check the Token 2022 program and docs when combining extensions.

## Extension types (overview)

Extensions are represented by the `ExtensionType` enum in the Token 2022 program. Common ones:

| Category | Examples |
|----------|----------|
| Fees / transfer | TransferFeeConfig, TransferFeeAmount, ConfidentialTransferFeeConfig/Amount |
| Authority | MintCloseAuthority, PermanentDelegate, CpiGuard |
| State / behavior | DefaultAccountState, ImmutableOwner, NonTransferable, MemoTransfer |
| Confidential | ConfidentialTransferMint, ConfidentialTransferAccount, ConfidentialMintBurn |
| Metadata / groups | MetadataPointer, TokenMetadata, GroupPointer, TokenGroup, GroupMemberPointer, TokenGroupMember |
| Other | InterestBearingConfig, TransferHook / TransferHookAccount, Pausable / PausableAccount, ScaledUiAmount |

Mint extensions apply to mints; account extensions apply to token-holding accounts. Use the correct variant for the account type.

## State layout: base + TLV

Extension state lives in **tlv_data** after the base mint or account data. The layout is `PodStateWithExtensions<'data, S>`: `base` (e.g. Mint or Account) plus a slice of TLV bytes that are deserialized per extension type. When reading/writing extension data, use the Token 2022 / anchor-spl helpers that understand this layout.

## Using in Anchor

1. **Dependencies**: `anchor-spl` with `token_2022` and `token_2022_extensions` (see [features-tokens](features-tokens.md)).
2. **Instructions**: Use `anchor_spl::token_2022` for base Token 2022 instructions and `anchor_spl::token_2022_extensions` for extension-specific instructions (when implemented).
3. **Gap**: Not every extension instruction is fully implemented in anchor-spl; for some extensions you may need to build CPI calls to the Token 2022 program manually using the program's instruction formats.
4. **Examples**: See [solana-developers/program-examples](https://github.com/solana-developers/program-examples/tree/main/tokens/token-2022) for Token 2022 + Anchor. Also [features-examples](features-examples.md).

## Key points

- Enable extensions at mint/account creation; only a few can be added later.
- Check compatibility between extensions (e.g. non-transferable vs transfer fee).
- Prefer `token_interface` and InterfaceAccount when supporting both Token and Token 2022.
- For missing anchor-spl coverage, implement CPI to the Token 2022 program using its native instruction data.

<!--
Source references:
- https://github.com/solana-foundation/anchor (docs/content/docs/tokens/extensions.mdx)
- https://github.com/solana-program/token-2022
- https://github.com/coral-xyz/anchor (spl/src/token_2022_extensions)
-->