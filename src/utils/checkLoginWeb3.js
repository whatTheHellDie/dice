import Web3 from 'web3'
import {store} from '../store/'
import getWeb3 from '../utils/getWeb3'
let checkLoginWeb3=function(){
let check=setInterval(()=>{
    if (window.ethereum) {
      var web3 = window.ethereum
      web3 =  new Web3(ethereum)
    }else{
      var web3 = window.web3
      web3 = new Web3(web3.currentProvider)
    }
      web3.eth.getCoinbase((err,result)=>{
        if(result){
          location.reload()
        }
      })

},1000)
}
export default checkLoginWeb3