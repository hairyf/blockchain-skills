---
name: solana-tokens-extensions
description: Token-2022 extensions — metadata, transfer fees, confidential transfer, memo, and other extensions.
---

# Solana — Token Extensions (Token-2022)

Token-2022 supports **extensions** that are enabled at mint creation. Same base instructions as Token program; extra data and instructions for each extension.

## Common extensions

- **Metadata**: On-chain token name/symbol/URI (Token Metadata extension).
- **Transfer fees**: Fee on transfer (percentage or fixed); fee authority can withdraw.
- **Confidential transfer**: Encrypted balances; separate deposit/withdraw/transfer flow.
- **Memo**: Memo text stored with transfer (Memo program or extension).
- **Interest-bearing**: Mint has interest rate; balances accrue over time.
- **Permanent delegate**: Designated account can transfer any token account (e.g. compliance).
- **Non-transferable**: Tokens cannot be transferred (e.g. soulbound).
- **Transfer hook**: Program invoked on transfer (e.g. custom logic, fees).
- **CPI guard**: Restricts which programs can receive tokens via CPI.

## Usage

- Create mint with desired extensions and extension data; token accounts for that mint get the same extension behavior.
- Use **@solana-program/token-2022** (or legacy @solana/spl-token with Token-2022 program ID) and extension-specific APIs for metadata, transfer fee, confidential transfer, etc.
- Metaplex Token Metadata is a separate standard (off-chain or on-chain metadata); use Metaplex docs for NFTs and rich metadata.

## Key points

- Extensions are configured at mint creation and cannot be added later to that mint.
- For transfer hooks / CPI guard, ensure the receiving program and CPI flow match the extension rules.

<!--
Source references:
- https://solana.com/docs/tokens/extensions
- https://github.com/solana-foundation/solana-com
-->
