import Web3 from 'web3'
import {store} from '../store/'
import web3 from './web3'
let pollWeb3 = function (state) {

setInterval(() => {
    var coinbase=new Promise(function(resolve,reject){
      if(web3().eth.defaultAccount) {
          resolve(web3().eth.defaultAccount)
        }else{
        
      web3().eth.getCoinbase((err,result)=>{
      if(err){
        console.log(err)
      }else{
        if(!result||result!=store.state.web3.coinbase){
          location.reload()
        }else{
          resolve(result)
        }
      }
     })
      }
    }).then(result=>{
      
      if (web3() && store.state.web3.web3Instance) {
      if (result !== store.state.web3.coinbase) {
       
        let newCoinbase = result
        
        web3().eth.getBalance(result, function (err, newBalance) {
          if (err) {
            console.log(err)
          } else {
            store.dispatch('pollWeb3', {
              coinbase: newCoinbase,
              balance: parseInt(newBalance, 10)
            })
          }
        })
       
      } else {
           web3().eth.getBalance(store.state.web3.coinbase, (err, polledBalance) => {
          if (err) {
            console.log(err)
          } else if (parseInt(polledBalance, 10) !== store.state.web3.balance) {
            
            store.dispatch('pollWeb3', {
              coinbase: store.state.web3.coinbase,
              balance: polledBalance
            })
          }
        })
        
      }
    }
    })
    
    
}, 500)
}

export default pollWeb3