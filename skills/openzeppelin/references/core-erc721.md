---
name: openzeppelin-erc721
description: ERC721 non-fungible tokens, URI storage, and minting.
---

# ERC721

Non-fungible tokens: each token has a unique `tokenId`; use for collectibles, in-game items, deeds.

## Construction

```solidity
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract GameItem is ERC721, ERC721URIStorage {
    constructor() ERC721("GameItem", "ITM") {}

    function awardItem(address to, string memory tokenURI) public {
        uint256 tokenId = _nextTokenId();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://game.example/item-id-";
    }
}
```

- Use `ERC721URIStorage` for per-token metadata and `_setTokenURI`. `tokenURI(tokenId)` should resolve to a JSON (name, description, image, etc.) per EIP-721.
- No `decimals` in ERC721; tokens are indivisible.
- Restrict minting (e.g. `onlyRole(MINTER_ROLE)`) in production.

## Key Points

- Prefer `_safeMint` so receivers that implement `IERC721Receiver` are notified.
- Metadata can be off-chain (URL) or on-chain (e.g. Base64 Data URI via utils Base64); off-chain allows changes by the deployer.

<!--
Source references:
- sources/openzeppelin/docs/modules/ROOT/pages/erc721.adoc
- sources/openzeppelin/docs/modules/ROOT/pages/tokens.adoc
-->
