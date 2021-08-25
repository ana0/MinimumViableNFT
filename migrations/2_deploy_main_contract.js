const NFT = artifacts.require('NFT');

module.exports = function (deployer) {
  deployer.deploy(NFT, 'NFT', 'NFT')
    .then(async (nft) => {
      await nft.setBaseURI('https://gateway.pinata.cloud/ipfs/');
      await nft.setContractURI('https://gateway.pinata.cloud/ipfs/QmSWm14gsoEExihXfkbQ55VwCc9VY3c71LeuTmNAr1v6jF/metadata.json')
      await nft.mint(1, 'QmSWm14gsoEExihXfkbQ55VwCc9VY3c71LeuTmNAr1v6jF/metadata.json');
    });
};
