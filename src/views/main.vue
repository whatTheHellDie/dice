<template>
  <div>
    
    <div data-v-72ff61fb="" class="header dice2-header">
      <div data-v-72ff61fb="" class="wrap">
        <div data-v-2b4b9ef4="" data-v-72ff61fb="" class="logo row" @click="$router.push({name:'index'})">
          <div data-v-2b4b9ef4=""><img data-v-2b4b9ef4="" src="/static/img/logo-coinflip.png"></div>
        </div>
        <div data-v-7a4b5c72="" data-v-72ff61fb="" class="locale-selector">
          <div data-v-7a4b5c72="" class="links">
            <a data-v-7a4b5c72="" href="javascript:;" v-if="question" @click="$router.go(-1)">返回</a>
            <a data-v-7a4b5c72="" href="javascript:;" @click="$router.push({name:'question'})">常见问题</a>
            <a data-v-7a4b5c72="" href="https://metamask.io/" target="_blank" class="link-metamask">METAMASK</a>
            <a data-v-7a4b5c72="" :href="toContract" target="_blank">CONTRACT</a>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
    <div data-v-cdc8248e="" class="footer dice2-footer">
      <div data-v-cdc8248e="" class="wrap">
        <div data-v-49b6639d="" data-v-cdc8248e="" class="share">
          <a data-v-49b6639d="" href="javascript:;" class="social weixin"></a>
          <a data-v-49b6639d="" href="javascript:;" target="_blank" class="social telegram"></a>
          <a data-v-49b6639d="" href="javascript:;" target="_blank" class="social twitter"></a>
        </div>
      </div>
    </div>
    <Dialog :message="message" v-if="alert&&!ableToBet"></Dialog>
    <!--{{message}}
    {{!ableToBet}}-->
  </div>
</template>

<script>
  import { NETWORKS } from '../utils/constants/networks'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        message: "",
        hasMetaMaskOK: true,
        networkOK: true,
        question: false,
        usefulBrowse:false
      }
    },
    computed: mapState({
        ableToBet: state => state.ableToBet,
        hasMetaMask: state => state.web3.hasMetaMask,
        isInjected: state => state.web3.isInjected,
        network: state => NETWORKS[state.web3.networkId],
        networkId: state => state.web3.networkId,
        coinbase: state => state.web3.coinbase,
        balance: state => state.web3.balance,
        alert: state => state.alert,
        ethBalance: state => {
          if(state.web3.web3Instance !== null) return state.web3.web3Instance().utils.fromWei(state.web3.balance.toString(), 'ether')
        },
toContract() {
        return 'https://' + process.env.ethNetPrefix + 'etherscan.io/address/' + process.env.contractAddress
      },
      }),
      
    beforeCreate() {
      this.$store.dispatch('registerWeb3')
    },
    created() {
      this.$store.dispatch('getContractInstance')
    },
    mounted(){
     if(window.Life||window.ethereum||window.web3){
       this.usefulBrowse=true
       this.getTip()
     }else{
       this.message = "请在手机下载LifeCoin或在电脑上安装MetaMask下注"
     }
//    this.loginStatus1("111")
    },
    methods: {
//    login(){},
//    loginStatus(address){
//      alert(address)
//      var mAddress=JSON.parse(address)
//      window.lifeMesage={}
//      window.lifeMesage.coinbase=val
//      this.$store.dispatch('registerWeb3Instance', mAddress)
////      window.myLife.address=address
////      alert(window.myLife)
//    },
      getTip() {
        console.log(this.hasMetaMaskOK , this.networkOK ,this.coinbase,this.usefulBrowse,888)
        if(this.hasMetaMaskOK && this.networkOK && this.coinbase&&this.usefulBrowse) {
          this.$store.commit('changeBetState', true)
        } else {
          this.$store.commit('changeBetState', false)
        }
      },
    },
    watch: {
      '$route' (val) {
        if(val.name == 'question') {
          this.question = true
        } else {
          this.question = false
        }
      },
      hasMetaMask: {
        immediate: true, //该回调将会在侦听开始之后被立即调用
        handler(val) {
          if(!val) {
            this.hasMetaMaskOK = false
            this.message = "您没有使用Dapp浏览器或插件"
          } else {
            this.hasMetaMaskOK = true
          }
          this.getTip()
        }
      },
      coinbase: {
        immediate: true, //该回调将会在侦听开始之后被立即调用
        handler(val) {
          if(this.hasMetaMaskOK) {
            if(!val) {
              this.message = "您还没有登录"
            }
          }
          this.getTip()
        }
      },
      networkId: {
        immediate: false, //该回调将会在侦听开始之后被立即调用
        handler(val, oldValue) {
          if(val != 3) {
            this.networkOK = false
            this.message = "当前不在Ropsten 测试网络,请切换后再下注"
          } else {
            this.networkOK = true
          }
          this.getTip()
        }
      },
      hasMetaMaskOK(val) {
        if(!val) {
          //      this.ableToBet=false
        }
      },
      networkOK(val) {
        if(!val) {
          //      this.ableToBet=false
        }
      },
      //  ableToBet(val){
      //    this.$store.commit('changeBetState',val)
      //  }
      //  isInjected:{
      //    immediate: true,//该回调将会在侦听开始之后被立即调用
      //    handler(val){
      //      if(!val){
      //        this.ableToBet=false
      //        this.message="您没有使用Dapp浏览器或插件"
      //      }
      //    }
      //  },
    }
  }
</script>

<style type="text/css">
  .header[data-v-72ff61fb] {
    border-bottom: 1px solid rgba(127, 124, 151, .25)
  }
  
  .wrap[data-v-72ff61fb] {
    height: 70px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
  }
</style>