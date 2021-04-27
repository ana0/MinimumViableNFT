const NFT = artifacts.require('NFT');

module.exports = function (deployer) {
  deployer.deploy(NFT, 'NFT', 'NFT')
    .then(async (nft) => {
      await nft.setBaseURI('http://localhost:8080/ipfs/');
      await nft.mint(1, true, 'QmYzqt8s6Xmv8HtDdQ69zyfpcQdx89Gi8bnUmEZ4AHrT6z', 'QmYzqt8s6Xmv8HtDdQ69zyfpcQdx89Gi8bnUmEZ4AHrT6z', 'QmaNEWataLJrRPr6WF7yqgaj4yT6VQYufBnM15HVXepwCh');
    });
};
