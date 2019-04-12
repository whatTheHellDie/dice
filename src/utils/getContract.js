import Web3 from 'web3'
import {address, ABI} from './constants/casinoContract'
import web3 from './web3'
let getContract = new Promise(function (resolve, reject) {
// let casinoContract = web3.eth.contract(ABI)
var web3Instance=web3()
 let casinoContractInstance =  new web3Instance.eth.Contract(ABI,address)
 // casinoContractInstance = () => casinoContractInstance
 resolve(casinoContractInstance)
})

export default getContract

