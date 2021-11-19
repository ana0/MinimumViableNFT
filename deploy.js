require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const truffleContract = require('truffle-contract');
const nftArtifacts = require('./build/contracts/NFT.json');
const Web3 = require('web3');

const web3 = new Web3(new HDWalletProvider(
        process.env.MNEMONIC,
        `https://polygon-rpc.com/`
      ));

const Nft = truffleContract(nftArtifacts);

Nft.setProvider(web3.currentProvider);

const test = async () => {
  const accounts = await web3.eth.getAccounts();

  // change the arguments to this function to be the name of your NFT, and the token symbol respectively
  const nft = await Nft.new('NFT', 'NFT', {from: accounts[0]});

  console.log(nft.address)

  // how to mint an NFT - add new lines and update the token id to mint more
  await nft.mint(
    1, // this is the token id
    'QmSWm14gsoEExihXfkbQ55VwCc9VY3c71LeuTmNAr1v6jF/metadata.json',
    {from: accounts[0]}
  );

  console.log('done');
  process.exit();
}

test();