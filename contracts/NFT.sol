// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is Ownable, ERC721 {

    constructor (string memory name_, string memory symbol_) Ownable() ERC721(name_, symbol_) {
    }

    function setBaseURI(string memory baseURI_) public onlyOwner {
        _setBaseURI(baseURI_);
    }

    function mint(uint256 tokenId, string memory tokenURI) public onlyOwner {
        _safeMint(owner(), tokenId);
        _setTokenURI(tokenId, tokenURI);
    }
} 