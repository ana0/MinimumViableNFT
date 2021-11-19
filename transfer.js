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

const nftAddress = "yourContractAddress"; // the contract address your NFT was deployed at
// you can get this out of the url at opensea
// for example, the Proof of Attendance token from class is https://opensea.io/assets/matic/0xda58ee4890723f937438ae8ed652490ef20b5b42/1
// and 0xda58ee4890723f937438ae8ed652490ef20b5b42 is the contract address

const test = async () => {
  const nft = await Nft.at(nftAddress);

  const accounts = await web3.eth.getAccounts();

  // how to mint another NFT - add new lines and update the token id to mint more
  await nft.mint(
    2, // this is the token id
    'QmSWm14gsoEExihXfkbQ55VwCc9VY3c71LeuTmNAr1v6jF/metadata.json',
    {from: accounts[0]}
  );

  // how to transfer an NFT to a friend - this is how I transferred them to all of you!
  await nft.transferFrom(
    'yourAddress', // they get minted automatically to your address
    'anotherAddress', // this is the address you want to send to
    2, // the token id of the NFT you are transferring
    {from: accounts[0]}
  );
}

test();