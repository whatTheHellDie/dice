import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../utils/getWeb3'
import pollWeb3 from '../utils/pollWeb3'
import getContract from '../utils/getContract'
import checkLoginWeb3 from '../utils/checkLoginWeb3'
import web3 from '../utils/web3'
Vue.use(Vuex)
export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    registerWeb3Instance (state, payload) {
      let result = payload
     console.log(payload,'payload')
      let web3Copy = state.web3
      web3Copy.hasMetaMask=true
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
       web3Copy.web3Instance = result.web3
      state.web3 = web3Copy
      pollWeb3()//检测有登录账号时
      
    },
    changeBetState (state,payload){
      state.ableToBet=payload
    },
    changeAlert(state,payload){
      state.alert=payload
    },
    noMetamask (state, payload) {
      state.web3.hasMetaMask = false
    },
    pollWeb3Instance (state, payload) {
      
      state.web3.coinbase = payload.coinbase
      state.web3.balance = parseInt(payload.balance, 10)
      
    },
    registerContractInstance (state, payload) {
      state.contractInstance = () => payload
    },
    noLoginInstance (state, payload) {
      state.web3.hasMetaMask = true
      checkLoginWeb3()//检测没有有登录账号时
    }
  },
  actions: {
    registerWeb3 ({commit}) {
      getWeb3.then(result => {
         if(result=="no metamsk"){
           reject("no metamsk")
         }else if(result=="no login"){
           commit('noLoginInstance',{})
         }else{
        commit('registerWeb3Instance', result)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    pollWeb3 ({commit}, payload) {
      commit('pollWeb3Instance', payload)
    },
    getContractInstance ({commit}) {
      getContract.then(result => {
        commit('registerContractInstance', result)
      }).catch(e => console.log(e))
    }
  }
})