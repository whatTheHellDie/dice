<template>
  <div>
    <div data-v-1cc3b5f0="" onclick="void(0)" class="home">
      <div data-v-1cc3b5f0="" class="wrap">
        <div data-v-5f88f7f4="" data-v-1cc3b5f0="" class="stage">
          <div data-v-5f88f7f4=""></div>
          <div data-v-baa1bd36="" data-v-5f88f7f4="" class="coin-stage">
            <div data-v-baa1bd36="" class="game-title">
              <h1 data-v-baa1bd36="">抛硬币</h1></div>
            <div data-v-baa1bd36="" class="guess">
              <div data-v-baa1bd36="">
                <a href="javascript:;" class="coin front" :class="{active:coinFace==1}" @click="coinFace=1"></a>
                <!--:class="active:coinFace'"-->
                <a href="javascript:;" class="coin back" :class="{active:coinFace==2}" @click="coinFace=2"></a>
              </div>
              <div data-v-baa1bd36="" class="comment">选择硬币的一面来进行投注</div>
            </div>
          </div>
          <div data-v-5f88f7f4="" class="bet">
            <div data-v-5f88f7f4="" class="shortcut">
              <a data-v-5f88f7f4="" href="javascript:;" v-for="item,i in betOption" :class="{current:i==betIndex}" @click="betchoice(i)">
                {{item}}
              </a>
            </div>
            <div data-v-5f88f7f4="" class="input">
              <a data-v-5f88f7f4="" href="javascript:;" class="step step-sub" @click="decrease">-</a><input data-v-5f88f7f4="" v-model="bet" @blur="checkBet" type="text" class="amount">
              <a data-v-5f88f7f4="" href="javascript:;" class="step step-plus" @click="add">+</a>
            </div>
            <div data-v-5f88f7f4="" class="comment">您的赌注</div>
          </div>
          <div data-v-5f88f7f4="" class="command" style="flex-direction: column;">
            <div data-v-5f88f7f4="" class="placeholder"></div>
            <a data-v-5f88f7f4="" href="javascript:;" class="btn btn-hit" style="width: 100%;" @click="BetToContract">下注</a>
            <div data-v-5f88f7f4="" class="gas-price">汽油价格(Gas Price): 300000</div>
            <div v-if="userComit.bet">本次下注金额:{{userComit.bet}}eth
              <div style="color: green;" v-if="betList.player_address&&!error">下注成功，请在我的记录中查看开奖情况</div>
              <div v-if="error" style="color: red;width: 300px;word-break: break-all;">下注失败{{betError}}</div>
            </div>
          </div>
          <div data-v-5f88f7f4=""></div>
        </div>
        <div data-v-4b5f2af4="" data-v-1cc3b5f0="" class="chance">
          <div data-v-4b5f2af4=""></div>
          <div data-v-4b5f2af4="" class="win-chance">
            <div data-v-4b5f2af4="" class="title">获胜机会</div>
            <div data-v-4b5f2af4="" class="content"><em data-v-4b5f2af4="">50.00%</em></div>
          </div>
          <div data-v-4b5f2af4="" class="win-bet">
            <div data-v-4b5f2af4="" class="title">赢得投注</div>
            <div data-v-4b5f2af4="" class="content"><em data-v-4b5f2af4="">{{willWinx}}X</em></div>
            <div data-v-4b5f2af4="" class="warn">您将赢得{{willWin}}以太币</div>
            <div data-v-4b5f2af4="" class="comment">0%费用<span v-if="jackpot>0">，{{jackpot}}以太币积累大奖</span></div>
          </div>
          <div data-v-4b5f2af4="" class="win-prize">
            <div data-v-4b5f2af4="" class="title">大奖包括</div>
            <div data-v-4b5f2af4="" class="content"><em data-v-4b5f2af4="">{{jackpotSize}}</em><span data-v-4b5f2af4="" class="unit">以太币</span></div>
            <div data-v-4b5f2af4="" class="warn">每次≥0.1的下注将产生一个0-999闭区间的随机数，当随机数为0时，既获得大奖</div>
          </div>
          <div data-v-4b5f2af4=""></div>
        </div>
        <div data-v-1cc3b5f0="" class="history">
          <div>
            <!--<div class="datastat">
                <div class="data-stat">
                  <div class="title"><span>游戏统计</span></div>
                  <div class="round">
                    <div class="pre-round">最近</div>
                    <ul class="rounds">
                      <li class=""><em>5</em></li>
                      <li class=""><em>10</em></li>
                      <li class=""><em>25</em></li>
                      <li class="current"><em>50</em></li>
                      <li class=""><em>100</em></li>
                    </ul>
                    <div class="post-round">轮</div>
                  </div>
                  <section style="position: relative;">
                    <div class="stat ds-coin">
                      <div class="header"><span></span><span></span><span></span><span>正面</span><span>反面</span><span></span></div>
                      <ul class="body">
                        <li><span>结果</span><span></span><span></span><span>20</span><span>30</span><span @mouseover="showTip('最近50把出现正反面的次数',41,33)" @mouseleave="closeTip"></span></li>
                        <li><span>胜率</span><span></span><span></span><span>48%</span><span>71%</span><span @mouseover="showTip('最近50把压正反面的玩家胜率',41,54)" @mouseleave="closeTip"></span></li>
                        <li><span>最大连出</span><span></span><span></span><span>3</span><span>5</span><span @mouseover="showTip('最近50把最大连出数',41,75)" @mouseleave="closeTip"></span></li>
                        <li><span>最大赌注</span><span></span><span></span><span>0.2</span><span>0.2</span><span @mouseover="showTip('最近50把最大赌注',41,96)" @mouseleave="closeTip"></span></li>
                      </ul>
                    </div><em class="info-panel" style="width: auto; left: auto; top: auto;" :style="{display:tipshow,right: needLeft+'px', top: needTop+'px'}">{{totalTip}}</em></section>
                </div>
              </div>-->
            <div class="top">
              <div class="title"><span>游戏历史</span>
                <div class="more">
                  <a href="javascript:;" class="jackpot-history" :class="{active:historyChoose==0}" @click="allHistory">所有历史</a>
                  <!--<a href="javascript:;" class="jackpot-history">大奖历史</a>-->
                  <a href="javascript:;" class="my-history" :class="{active:historyChoose==2}" @click="myRecord">我的记录</a>
                  <a href="javascript:;" class="my-stat" :class="{active:historyChoose==3}" @click="myStatistics">我的统计</a>
                </div>
              </div>
              <ul class="thead">
                <li>
                  <div class="item"><span class="addr">玩家</span><span class="bet">赌注</span><span class="result">结果</span><span class="prize">随机数</span><span class="icon"></span></div>
                </li>
              </ul>
            </div>
            <div class="list">
              <GeminiScrollbar class="tbody game-is-coin">
                <div class="no-record" v-if="loading">数据加载中...</div>
                <div class="no-record" v-if="noRecord">没有记录</div>
                <ul>
                  <!--游戏历史-->
                  <li v-show="historyChoose==0" v-for="item,i in allNetBetHistory" v-if="item.is_settle">
                    <div class="item" @click="changeDetail(i)">
                      <span class="addr">{{item.player_address.substring(0,9)}}</span>
                      <span class="bet"><em>{{item.bet}}</em><div class="bet-container">
                        <em class="user-coin" :class="{front:item.bet_mask==1,back:item.bet_mask==2}">
                          <b></b><b></b>
                        </em>
                        
                      </div>
                      </span>
                      <span class="result" :class="{win:item.win_amount>0}">
                        <em class="result-coin" :class="{front:item.sha3_mod_number==1,back:item.sha3_mod_number==2}">
                          <b></b><b></b></em>
                          <em>{{item.win_amount>0?item.win_amount:'--'}}</em></span>
                      <span class="prize" v-if="item.is_settle&&item.bet>=0.1">{{item.jackpot_number}}</span>
                      <span class="prize" v-else-if="item.is_settle&&item.bet<0.1">--</span>
                      <span class="prize" v-else>暂未开奖</span>
                      <span class="icon iconfont icon-arrowright"></span>
                    </div>
                    <div class="detail" v-show="historyDetailIndex==i">
                      <div class="row">
                        <strong>地址</strong>
                        <span>
                          <a :href="toAddress(item.player_address)" target="_blank">{{item.player_address}}</a>
                        </span>
                      </div>
                      <div class="row">
                        <strong>赌注</strong><span>{{item.bet}} ETH</span>
                      </div>
                      <div class="row">
                        <strong>将赌注压在</strong>
                        <span>{{item.bet_mask}}</span>
                      </div>
                      <div class="row">
                        <strong>bet trx</strong>
                        <span><a target="_blank">{{item.tx_hash}}</a></span>
                      </div>
                      <!--<div class="row">
                        <strong>entropy</strong>
                        <span>0x0aa6c6998c4a20e891a4157866348daef9b3f30590ef06548623863e5c18ca89</span>
                      </div>-->
                      <!--<div class="row">
                        <strong>secret</strong>
                        <span>{{item.commit}}</span>
                      </div>-->
                      <div class="row">
                        <strong>entropy</strong>
                        <span>{{item.entropy}}</span>
                      </div>
                      <div class="row">
                        <strong>bet block</strong>
                        <span>{{item.block_hash}}</span>
                      </div>
                      <div class="row">
                        <strong>结果</strong>
                        <span>{{item.sha3_mod_number}}</span>
                      </div>
                      <div class="row">
                        <strong>jackpot</strong>
                        <span v-if="item.is_settle&&item.bet>0.1">{{item.jackpot_number}}</span>
                        <span v-else-if="item.is_settle&&item.bet<0.1">--</span>
                        <span v-else>暂未开奖</span>
                      </div>
                      <div class="row">
                        <strong>获胜</strong>
                        <span>{{item.win_amount}} ETH</span>
                      </div>
                      <div class="row">
                        <strong>时间</strong>
                        <span>{{item.created_at}}</span>
                      </div>
                    </div>
                  </li>
                  <!--我的记录-->
                  <li v-show="historyChoose==2" v-for="item,i in myRecordData">
                    <div class="item" @click="changeDetail(i)">
                      <span class="addr">{{item.player_address.substring(0,9)}}</span>
                      <span class="bet"><em>{{item.bet}}</em><div class="bet-container">
                        <em class="user-coin" :class="{front:item.bet_mask==1,back:item.bet_mask==2}">
                          <b></b><b></b>
                        </em>
                        
                      </div>
                      </span>
                      <span class="result" v-if="item.is_settle" :class="{win:item.win_amount>0}">
                        <em class="result-coin" :class="{front:item.sha3_mod_number==1,back:item.sha3_mod_number==2}">
                          <b></b><b></b></em>
                          <em>{{item.win_amount>0?item.win_amount:'--'}}</em>
                      </span>
                      <span class="result" v-else>暂未开奖</span>
                      <span class="prize" v-if="item.is_settle&&item.bet>=0.1">{{item.jackpot_number}}</span>
                      <span class="prize" v-else-if="item.is_settle&&item.bet<0.1">--</span>
                      <span v-else>暂未开奖</span>
                      <span class="icon iconfont icon-arrowright"></span>
                    </div>
                    <div class="detail" v-show="historyDetailIndex==i">
                      <div class="row">
                        <strong>地址</strong>
                        <span>
                          <a :href="toAddress(item.player_address)" target="_blank">{{item.player_address}}</a>
                        </span>
                      </div>
                      <div class="row">
                        <strong>赌注</strong><span>{{item.bet}} ETH</span>
                      </div>
                      <div class="row">
                        <strong>将赌注压在</strong>
                        <span>{{item.bet_mask}}</span>
                      </div>
                      <div class="row">
                        <strong>bet trx</strong>
                        <span><a target="_blank">{{item.tx_hash}}</a></span>
                      </div>
                      <!--<div class="row">
                        <strong>entropy</strong>
                        <span>0x0aa6c6998c4a20e891a4157866348daef9b3f30590ef06548623863e5c18ca89</span>
                      </div>-->
                      <!--<div class="row">
                        <strong>secret</strong>
                        <span>{{item.commit}}</span>
                      </div>-->
                      <div class="row">
                        <strong>entropy</strong>
                        <span>{{item.entropy}}</span>
                      </div>
                      <div class="row">
                        <strong>bet block</strong>
                        <span>{{item.block_hash}}</span>
                      </div>
                      <div class="row">
                        <strong>结果</strong>
                        <span v-if="item.is_settle">{{item.sha3_mod_number}}</span>
                        <span v-else>暂未开奖</span>
                      </div>
                      <div class="row">
                        <strong>jackpot</strong>
                        <span v-if="item.is_settle&&item.bet>0.1">{{item.jackpot_number}}</span>
                        <span v-else-if="item.is_settle&&item.bet<0.1">--</span>
                        <span v-else>暂未开奖</span>
                      </div>
                      <div class="row">
                        <strong>获胜</strong>
                        <span>{{item.win_amount}} ETH</span>
                      </div>
                      <div class="row">
                        <strong>时间</strong>
                        <span>{{item.created_at}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
                <!--我的统计-->
                <div v-show="historyChoose==3" data-v-6b2495f7="" class="my-stat" modulo="2">
                  <ul data-v-6b2495f7="">
                    <li data-v-6b2495f7="">
                      <span data-v-6b2495f7="">投注金额</span>
                      <span data-v-6b2495f7="">{{myStaticsRecord.BetValue}} ETH</span>
                    </li>
                    <li data-v-6b2495f7="">
                      <span data-v-6b2495f7="">投资次数</span>
                      <span data-v-6b2495f7="">{{myStaticsRecord.betTime}}</span>
                    </li>
                    <li data-v-6b2495f7="">
                      <span data-v-6b2495f7="">胜率</span>
                      <span data-v-6b2495f7="">{{myStaticsRecord.winRate}}%</span>
                    </li>
                    <li data-v-6b2495f7="">
                      <span data-v-6b2495f7="">赢的次数</span>
                      <span data-v-6b2495f7="">{{myStaticsRecord.winTimes}}</span>
                    </li>
                    <li data-v-6b2495f7="">
                      <span data-v-6b2495f7="">最大赌注</span>
                      <span data-v-6b2495f7="">{{myStaticsRecord.maxBet}} ETH</span>
                    </li>
                    <li data-v-6b2495f7="">
                      <span data-v-6b2495f7="">最高赢取</span>
                      <span data-v-6b2495f7="">{{myStaticsRecord.maxWin}} ETH</span>
                    </li>
                  </ul>
                  <span data-v-6b2495f7="" class="tips"><!--您近100轮的下注统计--></span></div>

              </GeminiScrollbar>
            </div>
            <div class="amount text-right"><span>账号余额 <b style="color: #c472a2;font-weight:400;">{{ethBalance?ethBalance:0}}</b> ETH</span></div>
          </div>
        </div>
      </div>
      111
    </div>
    <!--<div @click="callbackjs">测试安卓</div>-->
    <Dialog :message="message" @changeAlert="closeAlert" v-if="changeAlert"></Dialog>
    {{coinbase}}
    <!--{{myether}}-->
    <!--{{myStaticsRecord}}
    {{contractRecord}}-->
    <!--{{userBetHistory}}-->
    <!--{{userBetHistory}}-->
  </div>

</template>

<script>
  import { NETWORKS } from '../utils/constants/networks'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        betError: '',
        jackpotSize: 0, //大奖
        changeAlert: false,
        message: "",
        error: false,
        loading: false,
        noRecord: false,
        historyChoose: 0,
        coinFace: 1,
        betOption: ['0.10', "0.15", "0.20", "最大"],
        betIndex: 0,
        bet: "0.10",
        minBet: "0.01",
        maxBet: "5.00",
        message: "您需要解锁 MetaMask 账号才能玩本游戏",
        alert: false,
        totalTip: '',
        tipshow: 'none',
        needLeft: 'auto',
        needTop: 'auto',
        allNetBetHistory: [], //合约全网下注输赢记录
        allNetBetHistoryFilter: [],
        historyDetailIndex: null,
        myRecordData: [],
        myRecordFilter: [],
        allNetTransactionHistory: [], //合约全网下注交易记录
        userBetHistory: [], //用户下注记录
        userWinHistory: [], //用户输赢记录
        //      contractRecord: [],
        myStaticsRecord: {BetValue:0,
          betTime:0,
          winRate:0,
          winTimes:0,
          maxBet:0,
          maxWin:0},
        userComit: {
          commit: '',
          bet: ''
        },
        betList: {},
        jackpot: 0.001,
        willWin: "0.1960",
        requestAccept: false,
        lastCommit: '',
        waitConfirm:false
      }
    },
    computed: mapState({
        hasMetaMask: state => state.web3.hasMetaMask,
        isInjected: state => state.web3.isInjected,
        network: state => NETWORKS[state.web3.networkId],
        networkId: state => state.web3.networkId,
        coinbase: state => state.web3.coinbase,
        balance: state => state.web3.balance,
        ethBalance: state => {
          if(state.web3.web3Instance !== null) return state.web3.web3Instance().utils.fromWei(state.web3.balance.toString(), 'ether')
        },
        ableToBet: state => state.ableToBet,
        willWinx() {
          return(this.willWin * 10)
        },
         myether() {
        //      var description = ""; 
        ////      var obj=window.ethereum;
        // for(var i in window.ethereum){ 
        // var property=window.ethereum[i]; 
        // description+=i+" = "+property+"\n"; 
        // } 
        //
        //
        //      return JSON.stringify(description)
        return typeof window.web3
      }
      }),
     
    watch: {
      willWin(val){
        this.willWin=val.toFixed(6)
      },
      bet(val,oldVal){
        if(isNaN(val)){
          this.bet=oldVal
        }
        for(var i=0;i<this.betOption.length;i++){
        if(val==this.betOption[i]){
          this.betIndex=i
        }else if(val==this.maxBet){
          this.betIndex=3
        }
        }
      },
      myRecordFilter(val) {
        for(var i = 0; i < val.length; i++) {
          if(val[i].bet) {
            val[i].bet = this.$web3().utils.fromWei(val[i].bet.toString(), 'ether')
          }
          if(val[i].win_amount) {
            val[i].win_amount = this.$web3().utils.fromWei(val[i].win_amount.toString(), 'ether')
          }
          val[i].sha3_mod_number = Math.pow(2, val[i].sha3_mod_number)
          let d = new Date(val[i].created_at)
          let month = (d.getMonth() + 1) > 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)
          let date = d.getDate > 10 ? d.getDate() : '0' + d.getDate()
          let hours = d.getHours() > 10 ? d.getHours() : '0' + d.getHours()
          let minutes = d.getMinutes() > 10 ? d.getMinutes() : '0' + d.getMinutes()
          let seconds = d.getSeconds() > 10 ? d.getSeconds() : '0' + d.getSeconds()
          d = d.getFullYear() + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
          val[i].created_at = d
        }

        this.myRecordData = val;
      },
      allNetBetHistoryFilter(val) {
        console.log(val, 111)
        for(var i = 0; i < val.length; i++) {
          if(val[i].bet) {
            val[i].bet = this.$web3().utils.fromWei(val[i].bet.toString(), 'ether')
          }
          if(val[i].win_amount) {
            val[i].win_amount = this.$web3().utils.fromWei(val[i].win_amount.toString(), 'ether')
          }
          val[i].sha3_mod_number = Math.pow(2, val[i].sha3_mod_number)
          let d = new Date(val[i].created_at)
          let month = (d.getMonth() + 1) > 10 ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1)
          let date = d.getDate > 10 ? d.getDate() : '0' + d.getDate()
          let hours = d.getHours() > 10 ? d.getHours() : '0' + d.getHours()
          let minutes = d.getMinutes() > 10 ? d.getMinutes() : '0' + d.getMinutes()
          let seconds = d.getSeconds() > 10 ? d.getSeconds() : '0' + d.getSeconds()
          d = d.getFullYear() + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
          val[i].created_at = d
        }

        this.allNetBetHistory = val;
      },
      allNetBetHistory(val) {
        console.log(val, 222)

      },
      allNetTransactionHistory(val) {
        var accountHistory = []
        this.$web3().eth.getCoinbase((err, result) => {
          for(var i = 0; i < val.length; i++) {
            accountHistory.push(val[i])

          }
          this.userBetHistory = accountHistory;

        })

      },
    },
    methods: {
      betPermission(val) {
        this.requestAccept = val;
      },
      //    show(info){
      //      alert(info)
      //    },
      callbackjs() {
        window.Life.showAndroid()
      },
      toAddress(address) {
        return "https://" + process.env.ethNetPrefix + "etherscan.io/address/" + address
      },
      closeAlert(val) {
        this.changeAlert = val;
      },
      checkBet() {
        if(Number(this.bet) < Number(this.minBet)) {
          this.bet = Number(this.minBet).toFixed(2)
        } else if(Number(this.bet) > Number(this.maxBet)) {
          this.bet = Number(this.maxBet).toFixed(2)
        }
        this.bet = Number(this.bet).toFixed(2)
        var charge = this.bet * 0.0098

        if(charge < 0.0003) {
          charge = 0.0003
        }
        if(this.bet < 0.1) {
          this.jackpot = 0
        } else {
          this.jackpot = 0.001
        }
        //      this.willWin=((this.bet-this.jackpot-charge)*2).toFixed(5)
        var kou = this.$sub(this.$sub(this.bet, this.jackpot), charge)
        this.willWin = this.$mul(kou, 2)
      },
      allHistory() {
        this.historyChoose = 0
        this.getAllHistory()
      },
      addStatistics(data) {
        var BetValue = 0,
          betTime = 0,
          winRate = 0,
          winTimes = 0,
          maxBet = 0,
          maxWin = 0
        for(var i = 0; i < data.length; i++) {
          if(data[i].is_settle) {
            BetValue += Number(data[i].bet)
            if(data[i].win_amount > 0) {
              winTimes += 1;
            }
            if(data[i].bet > maxBet) {
              maxBet = data[i].bet
            }
            if(data[i].win_amount > maxWin) {
              maxWin = data[i].win_amount
            }
          }
        }
        BetValue = this.$web3().utils.fromWei(BetValue.toString(), 'ether')
        betTime = data.length
        if(betTime > 0) {
          winRate = ((winTimes / betTime) * 100).toFixed(1);
        } else {
          winRate = 0
        }
        maxBet = this.$web3().utils.fromWei(maxBet.toString(), 'ether')
        maxWin = this.$web3().utils.fromWei(maxWin.toString(), 'ether')
        this.myStaticsRecord = {
          BetValue,
          betTime,
          winRate,
          winTimes,
          maxBet,
          maxWin
        }
      },
      myStatistics() {
        this.historyChoose = 3
        if(!this.coinbase){
          return false
        }
        this.$http({
          url: this.$http.adornUrl('/api/v1/dice/history'),
          method: 'get',
          params: this.$http.adornParams({
            address: this.coinbase,
            modulo: 2
          })
        }).then(({
          data
        }) => {
          this.addStatistics(data)
        })
      },
      myRecord() {
        this.historyChoose = 2
        if(!this.coinbase){
          return false
        }
        this.$http({
          url: this.$http.adornUrl('/api/v1/dice/history'),
          method: 'get',
          params: this.$http.adornParams({
            address: this.coinbase,
            modulo: 2
          })
        }).then(({
          data
        }) => {
          if(data) {
            this.myRecordFilter = data;
            this.loading = false;
          } else {
            this.loading = false;
            this.noRecord = true;
          }

        })
      },
      changeDetail(i) {
        if(i == this.historyDetailIndex) {
          this.historyDetailIndex = null;
        } else {
          this.historyDetailIndex = i
        }

      },
      betchoice(i) {
        this.betIndex = i;
        this.bet = this.betOption[i] != "最大" ? this.betOption[i] : this.maxBet
        this.checkBet()
      },
      decrease() {
        this.bet = (Number(this.bet) - 0.01).toFixed(2)
        this.checkBet()
      },
      add() {
        this.bet = (Number(this.bet) + 0.01).toFixed(2)
        this.checkBet()
      },
      BetToContract() {
        this.checkBet()
        if(!this.ableToBet) {
          this.$store.commit("changeAlert", true)
          return false;
        }
        if(this.waitConfirm){
          this.message="上一次下注完成前不能下注两次"
          this.changeAlert=true
          return false;
        }
        this.userComit.bet = ""
        this.betList = {}
        this.error = false;
        if(this.$sub(this.ethBalance, this.bet) < 0) {
          this.message = "余额不足"
          this.changeAlert = true;
          return false
        }
        this.$http({
          url: this.$http.adornUrl('/api/v1/dice/placebet'),
          method: 'get',
          params: this.$http.adornParams({
            'address': this.coinbase,
          })
        }).then(({
          data
        }) => {
            if(window.Life) {
              window.Life.betDetails(JSON.stringify({
                name: '抛硬币',
                bet: this.bet,
                gas: 300000
              }))
              new Promise((resolve, reject) => {
                var betWait = setInterval(() => {
                  if(this.requestAccept) {
                      if(this.requestAccept===false){
                        this.requestAccept=''
                        reject()
                      }
                    resolve()
                  }
                }, 100);
              }).then(() => {

                this.requestAccept = false;

                this.betDice(data)
              })

            } else if(window.web3 || window.ethereum) {
              this.betDice(data)
            }

        })
      },
      betDice: async function(data) {
        //下注
        var web3Instance = this.$store.state.web3.web3Instance();
        var commit = this.$ethers.utils.bigNumberify(data.commit).toHexString()
        this.userComit.commit = commit
        this.userComit.bet = this.bet;
        this.waitConfirm=true;//上一次下注成功前不能下注两次
        this.$store.state.contractInstance().methods
          .placeBet(this.coinFace,
            2,
            data.commitLastBlock,
            this.$ethers.utils.bigNumberify(data.commit),
            web3Instance.utils.hexToNumber(data.signature.v),
            web3Instance.utils.hexToBytes(data.signature.r),
            web3Instance.utils.hexToBytes(data.signature.s),
            0).send({
            gasPrice: await this.$store.state.web3.web3Instance().eth.getGasPrice(),
            gas: 300000,
            value: this.$store.state.web3.web3Instance().utils.toWei(this.bet, 'ether'),
            from: this.coinbase
          }).on('confirmation', (confirmationNumber, receipt) => {
            this.waitConfirm=false;
            console.log(confirmationNumber)
            if(confirmationNumber === 0) {
              this.$http({
                url: this.$http.adornUrl('/api/v1/dice/bet'),
                method: 'get',
                params: this.$http.adornParams({
                  commit: this.userComit.commit
                })
              }).then(({
                data
              }) => {
                this.betList = data
                this.myRecord()
              })
            }
          }).on('error', (error) => {
            this.waitConfirm=false;
            this.betError = error;
            console.log(error)
            this.userComit.commit = ""
            this.error = true;
          })
      },
      showTip(title, left, right) {
        this.needLeft = left
        this.needTop = right
        this.totalTip = title;
        this.tipshow = "block"

      },
      closeTip() {
        this.tipshow = "none"
      },
      getAllHistory() {
        this.$http({
          url: this.$http.adornUrl('/api/v1/dice/history'),
          method: 'get',
          params: this.$http.adornParams({
            modulo: 2
          })
        }).then(({
          data
        }) => {
          if(data) {
            this.allNetBetHistoryFilter = data;
            this.loading = false;
          } else {
            this.loading = false;
            this.noRecord = true;
          }

        })
        setTimeout(() => {
          if(this.allNetBetHistoryFilter.length === 0 && this.historyChoose === 0) {
            this.loading = false;
            this.noRecord = true;
          }
        }, 5000)
      },

    },
    mounted() {
      window.betPermission = this.betPermission;
      window.show = this.show

      setTimeout(async() => {
        this.getAllHistory()
        let contractAddress = process.env.contractAddress;
        let abi = this.$abi;
        let provider = new this.$ethers.providers.Web3Provider(this.$web3().currentProvider);
        let contract = new this.$ethers.Contract(contractAddress, abi, provider);
        //      if(window.Life){
        //      }else{}
        let currentValue = await contract.jackpotSize();
        this.jackpotSize = this.$web3().utils.fromWei(currentValue.toString(), 'ether')

        setInterval(async() => {
          let currentValue = await contract.jackpotSize();
          this.jackpotSize = this.$web3().utils.fromWei(currentValue.toString(), 'ether')
        }, 5000)

      }, 1)

    }
  }
</script>

<style scoped="scoped">

</style>