import Web3 from 'web3'
import { store } from '../store/'
import noDappWeb3 from './noDappWeb3'
/*
 * 1. Check for injected web3 (mist/metamask)
 * 2. If metamask/mist create a new web3 instance and pass on result
 * 3. Get networkId - Now we can check the user is connected to the right network to use our dApp
 * 4. Get user account from metamask
 * 5. Get user balance
 * web3.version.getNetwork() 会返回我们连接的网络ID。
 * web3.eth.coinbase() 返回我们节点属于的地址，当使用Metamask的时候这会是我们选择的账户。
 * web3.eth.getBalance(<address>) 返回我们作为参数传过去的地址的balance。
 */
let getWeb3 = new Promise(async function(resolve, reject) {
    // Check for injected web3 (mist/metamask)

    if(window.ethereum) {
      var web3js = window.ethereum
      var web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable();

        // Acccounts now exposed
        //    web3.eth.sendTransaction({/* ... */});
      } catch(error) {
        // User denied account access...
      }
    } else if(window.web3) {
      var web3js = window.web3
      var web3 = new Web3(web3js.currentProvider)
    } else {
      var web3=noDappWeb3;

    }
    //      console.log(result)
    resolve({
      injectedWeb3: true,
      web3() {
        return web3
      }
    })

  })
  .then(result => {
    return new Promise(async function(resolve, reject) {
      // Retrieve network ID
result = Object.assign({}, result, {
            networkId:3
          })
          resolve(result)
      await result.web3().eth.net.getId().then(err,networkId => {
        if(!networkId) {
          reject(new Error('Unable to retrieve network ID'))
        } else {
          result = Object.assign({}, result, {
            networkId
          })
          resolve(result)
        }
      });

    })
  })
  .then(result => {
    return new Promise(function(resolve, reject) {
      // Retrieve coinbase
      var coinbase = null;
      if(result.web3().eth.defaultAccount) {
        coinbase = result.web3().eth.defaultAccount;
        result = Object.assign({}, result, {
          coinbase
        })

        resolve(result)
      } else {
        result.web3().eth.getCoinbase((err, coinbase) => {
          if(err) {
            reject(new Error('Unable to retrieve coinbase'))
          } else {
            result = Object.assign({}, result, {
              coinbase
            })
            resolve(result)
          }
        })
      }

    })
  })
  .then(result => {

    return new Promise(function(resolve, reject) {
      // Retrieve balance for coinbase
      if(result.coinbase) {

        result.web3().eth.getBalance(result.coinbase, (err, balance) => {
          if(err) {
alert(err)
            reject('Unable to retrieve balance for address: ' + result.coinbase)
          } else {
            result = Object.assign({}, result, {
              balance
            })
            resolve(result)
          }
        })
      } else {
        reject('Unable to get balance for address')
      }
    })
  }).catch(function(err) {
    return new Promise(function(resolve, reject) {
      console.log(err);
      if(err === 'Unable to get balance for address') {
        resolve("no login")
      } else {
        resolve("no metamsk")
      }
    })
  })

export default getWeb3