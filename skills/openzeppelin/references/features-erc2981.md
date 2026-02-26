---
name: openzeppelin-erc2981
description: ERC2981 NFT royalties—royaltyInfo, default and per-token royalty, fee denominator.
---

# ERC2981 (NFT Royalties)

Standard way to signal royalty payment info for NFTs. Compatible with ERC-721 and ERC-1155. Payment is not enforced on-chain; marketplaces and sellers are expected to pay voluntarily.

## Usage

Inherit **ERC2981** and set default and/or per-token royalty:

```solidity
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC2981 } from "@openzeppelin/contracts/token/common/ERC2981.sol";

contract MyNFT is ERC721, ERC2981 {
    function setDefaultRoyalty(address receiver, uint96 feeNumerator) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setDefaultRoyalty(receiver, feeNumerator);
    }
    function setTokenRoyalty(uint256 tokenId, address receiver, uint96 feeNumerator) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _setTokenRoyalty(tokenId, receiver, feeNumerator);
    }
    function royaltyInfo(uint256 tokenId, uint256 salePrice) public view override(ERC2981, IERC2981) returns (address, uint256) {
        return ERC2981.royaltyInfo(tokenId, salePrice);
    }
    function supportsInterface(bytes4 id) public view override(ERC721, ERC2981) returns (bool) {
        return ERC721.supportsInterface(id) || ERC2981.supportsInterface(id);
    }
}
```

- **royaltyInfo(tokenId, salePrice)** returns `(receiver, amount)`. Amount = (salePrice * feeNumerator) / feeDenominator.
- **feeDenominator**: default 10000 (basis points). Override `_feeDenominator()` to use another scale.
- **Default royalty**: `_setDefaultRoyalty(receiver, feeNumerator)` for all tokens without a specific override.
- **Per-token**: `_setTokenRoyalty(tokenId, receiver, feeNumerator)` overrides default for that token. Use for custom royalty splits per piece.

## ERC721Royalty

For ERC-721, **ERC721Royalty** extends ERC2981 and clears stored royalty info when a token is burned, avoiding leftover storage. Use it instead of plain ERC2981 when you want burn-to-clear behavior.

## Key Points

- ERC2981 is signaling only; no on-chain enforcement. Marketplaces read `royaltyInfo` and pay out.
- Restrict `_setDefaultRoyalty` and `_setTokenRoyalty` with access control.
- feeNumerator must be < feeDenominator (e.g. ≤ 10000 for basis points).

<!--
Source references:
- sources/openzeppelin/contracts/token/common/ERC2981.sol
- sources/openzeppelin/contracts/token/common/README.adoc
- https://eips.ethereum.org/EIPS/eip-2981
-->
