import Web3 from 'web3'
import noDappWeb3 from './noDappWeb3'
let web3=function(){
  var web3js = window.web3
    if (window.ethereum) {
       web3js = window.ethereum
       web3 =  new Web3(ethereum)
    }else if(window.web3){
      
      var web3js = window.web3
      if(typeof web3js !== 'undefined') {
      var web3 = new Web3(web3js.currentProvider)
      }
    } else{
      var web3=noDappWeb3
    }
    return web3
}

export default web3;