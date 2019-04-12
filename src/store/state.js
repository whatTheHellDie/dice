let state = {
 web3: {
 isInjected: false,
 web3Instance: null,
 networkId: null,
 coinbase: null,
 balance: null,
 hasMetaMask:true,
 error: null
 },
 contractInstance: null,
 ableToBet:false, //可否下注
 alert:false,//是否显示未登录或没有插件弹窗
}
export default state