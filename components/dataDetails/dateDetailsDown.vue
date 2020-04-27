<template>
  <div class="mask">
    <div class="mask-con">
      <div class="window-title">
        <span>请确认以下信息</span>
        <span>该服务不支持退款</span>
        <i class="icon iconfont icon-chahao3 icon-position" @click="closeMask()"></i>
      </div>
      <p class="window-name">项目名称：{{payInfos.ItemName}}</p>
      <p class="window-price">支付金额：{{payMoney > 0? payMoney : payInfos.Price }} <span class="pre">{{setPie(currentIndex)}}</span> </p>
      <div class="window-type">
        <div class="pay-type">支付方式：</div>
        <ul>
          <li v-for="(item,index) in payType" @click="chosePayType(index, payInfos.Price)" :key="index" :class="currentIndex == index ? 'li-active' : ''">
            <img :src="item.typeIcon" alt="">
            <span>{{item.typeName}}</span>
          </li>
          <li :class="currentIndex == 2 ? 'li-active' : ''" @click="chosePayType(2, payInfos.TribalCoinsPrice)" v-if="payInfos.IsAllowIntegral">
            <img src="../../assets/images/buluobi.png" alt="">
            <span>部落币支付</span>
          </li>
          <li :class="currentIndex == 3 ? 'li-active' : ''" @click="chosePayType(3, payInfos.IntegralPrice)"  v-if="payInfos.IsAllowTribalCoins" >
            <img src="../../assets/images/jifen.png" alt="">
            <span>积分支付</span>
          </li>
        </ul>
      </div>
      <div class="window-btn">
        <div @click="closeMask()">取消</div>
        <div @click="payment(payInfos)">去支付</div>
      </div>
    </div>
  </div>
</template>
<script>
  import{setAiliPay, setWechatPay, otherDownload} from '../../service/clientAPI'
  export default {
    name: 'detaDetailsDown',
    props: {
      payInfos: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        payType:[
          {
            isShow: true,
            typeName:'微信支付',
            typeCode: '',
            typeIcon: require('../../assets/images/WeChat.png')
          },
          {
            isShow: true,
            typeName:'支付宝支付',
            typeCode:'',
            typeIcon: require('../../assets/images/payZFB.png')
          }
        ],
        currentIndex: 0,
        payMoney: 0
      }
    },
    components: {
    },
    asyncData() {
    },
    mounted () {},
    methods: {
      chosePayType(inx, m) {
        this.currentIndex = inx,
        this.payMoney = m
      },
      closeMask () {
        this.$emit('dataDetailsMaskClose',{type:'Down'})
      },
      async payment (value) {
        let qq =
          {
          "Money": this.payMoney <= 0 ? this.payInfos.Price : this.payMoney,
          "ItemId": value.ItemId,
          "IsDebug": false
        }
        let msg = null;
        // 微信
        if (this.currentIndex === 0) {
          msg = await setWechatPay(qq);
        // 支付宝
        } else if (this.currentIndex === 1) {
          msg = await setAiliPay(qq);
        } else if (this.currentIndex === 2) {
          // 部落币下载
          qq.Type = 1
          msg = await otherDownload(qq);
        } else if (this.currentIndex === 3) {
          // 积分下载
          qq.Type = 2
          msg = await otherDownload(qq);
        }
        if (msg) {
          let pay ={
            data: msg,
            Price:this.payMoney <= 0 ? this.payInfos.Price : this.payMoney
          }
          this.$emit('payment', pay, this.currentIndex, value.ItemId)
        }
      },
      setPie (val) {
        switch(val) {
          case 0,1:
              return "元"
              break;
          case 2:
              return "部落币"
              break;
          case 3:
              return "积分"
              break;
          default:
            return "元"
        } 
      }
    }
  }
</script>
<style lang="less" scoped>
  .pre {
    color: #ababab;
    font-size: 12px;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 999;
    .mask-con{
      width: 620px;
      height: 400px;
      padding: 20px 30px 30px 36px;
      background: #FFFFFF;
      border-radius: 4px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .window-title{
        height: 40px;
        padding-top: 5px;
        line-height: 35px;
        margin-bottom: 34px;
        border-bottom: 1px solid #D9D9D9;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-start;
        position: relative;
        >span{
          &:nth-child(1){
            font-size: 16px;
            color: #333333;
            margin-right: 10px;
          }
          &:nth-child(2){
            font-size: 12px;
            color: #999999;
            line-height: 30px;
          }
        }
        .icon-position{
          cursor: pointer;
          display: block;
          width: 16px;
          height: 16px;
          position: absolute;
          right: 0px;
          top: -5px;
          color: #999999;
        }
      }
      .window-name{
        line-height: 20px;
        font-size: 14px;
        color: #333333;
        margin-bottom: 34px;
      }
      .window-price{
        line-height: 20px;
        font-size: 14px;
        color: #333333;
        margin-bottom: 16px;
      }
      .window-type{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 34px;
        .pay-type{
          font-size: 14px;
          width: 110px;
          color: #333333;
        }
        >ul{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 65%;
          >li{
            width: 140px;
            height: 56px;
            line-height: 56px;
            padding: 8px 10px;
            background: #FFFFFF;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
            border-radius: 4px;
            margin-right: 18px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;
            cursor: pointer;
            margin-top: 10px;
            >img{
              display: inline-block;
              width: 40px;
              height: 40px;
              margin-right: 8px;
            }
            >span{
              font-size: 14px;
              color: #333333;
            }
          }
          .li-active{
            background: url("../../assets/images/chosed.png") no-repeat left top;
            background-size: 99%;
          }
        }
      }
      .window-btn{
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-end;
        >div{
          cursor: pointer;
          &:nth-child(1){
            width: 78px;
            height: 32px;
            font-size: 14px;
            color: #666666;
            text-align: center;
            line-height: 32px;
            border: 1px solid #D9D9D9;
            border-radius: 4px;
            margin-right: 40px;
          }
          &:nth-child(2){
            width: 78px;
            height: 32px;
            font-size: 14px;
            color: #ffffff;
            text-align: center;
            line-height: 32px;
            background: #3E85FF;
            border-radius: 4px;
          }
        }
      }
    }
  }
</style>
