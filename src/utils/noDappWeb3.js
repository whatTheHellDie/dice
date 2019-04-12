import Web3 from 'web3'
const BigNumber = require('bignumber.js');
const Ether = new BigNumber(10e+17);
const EthUtil = require('ethereumjs-util');

//var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/b1a395a114ba485586c43d0fa227d443"))
var web3 = new Web3("wss://ropsten.infura.io/ws")
var LifePrivateKey=null;
if(window.LifePrivateKey){
LifePrivateKey= window.LifePrivateKey.privateKey.toString()
}
//LifePrivateKey='0x4d68b8a67515d7f325f51c47773eb9d8f979646cbf1570e044ad28d0cc1c08ca';
if(LifePrivateKey){
      var privateKey = LifePrivateKey;
      web3.eth.accounts.wallet.add(privateKey);
      web3.eth.defaultAccount = web3.eth.accounts.privateKeyToAccount(privateKey).address
      console.log(web3.eth.defaultAccount,88888)
//    web3.eth.defaultAccount = addr
    }else{
      
    }
var noDappWeb3=web3;
export default noDappWeb3