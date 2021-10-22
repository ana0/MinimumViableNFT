// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./NativeMetaTransaction.sol";
import "./ContextMixin.sol";

contract NFT is Ownable, ERC721, ERC721URIStorage, ContextMixin, NativeMetaTransaction {
    string public contractURI;
    string public storedBaseURI;

    constructor (string memory name_, string memory symbol_) Ownable() ERC721(name_, symbol_) {
        _initializeEIP712(name_);
    }

    function setBaseURI(string memory baseURI_) public onlyOwner {
        storedBaseURI = baseURI_;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return storedBaseURI;
    }

    function baseURI() public view returns (string memory) {
        return _baseURI();
    }

    function setContractURI(string memory contractURI_) public onlyOwner {
        contractURI = contractURI_;
    }

    function mint(uint256 tokenId, string memory tokenURI_) public onlyOwner {
        _safeMint(owner(), tokenId);
        _setTokenURI(tokenId, tokenURI_);
    }

    function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
        return ERC721URIStorage._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }

    /**
     * This is used instead of msg.sender as transactions won't be sent by the original token owner, but by OpenSea.
     */
    function _msgSender()
        internal
        override
        view
        virtual
        returns (address sender)
    {
        return ContextMixin.msgSender();
    }

    /**
    * As another option for supporting trading without requiring meta transactions, override isApprovedForAll to whitelist OpenSea proxy accounts on Matic
    */
    function isApprovedForAll(
        address _owner,
        address _operator
    ) public override view returns (bool isOperator) {
        if (_operator == address(0x58807baD0B376efc12F5AD86aAc70E78ed67deaE)) {
            return true;
        }
        
        return ERC721.isApprovedForAll(_owner, _operator);
    }
} 