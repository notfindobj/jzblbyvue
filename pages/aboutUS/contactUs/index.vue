<template>
  <div class="content-box">
    <div class="common-title">
      联系我们
    </div>
    <div class="content-con">
      <div class="content-con-left">
        <img :src="contactUsInfo.adressImg" alt="">
      </div>
      <ul class="content-con-right">
        <li>地址：{{contactUsInfo.adressInfo}}</li>
        <li>电话：{{contactUsInfo.phone}}</li>
        <li>商业合作：{{contactUsInfo.telephone}}</li>
        <li>E-mail：{{contactUsInfo.email}}</li>
        <li>联系人：{{contactUsInfo.contacter}}</li>
        <li>客服QQ：{{contactUsInfo.qq}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'contactUs',
    components: {
    },
    data () {
      return {
        contactUsInfo:{
          adressImg:'http://iph.href.lu/112x112?text=[自定义二维码]',
          adressInfo:'广东省佛山市顺德区容桂幸福居委会百昌后街24号',
          phone:'+86(0)0227-2881-6966',
          telephone:'13794035694',
          email:'2503689@qq.com',
          contacter:'彭小姐',
          qq:'2192903689 / 152146494'
        }
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  .content-box{
    flex: 1;
    height: auto;
    padding: 20px;
    margin-bottom: 30px;
    background: #ffffff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);
    .common-title{
      font-size: 18px;
      font-weight: 500;
      color: #333333;
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #EEEEEE;
    }
    .content-con{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .content-con-left{
        width: 560px;
        height: 360px;
        margin-right: 20px;
        >img{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
      .content-con-right{
        flex: 1;
        height: 360px;
        padding-top: 15px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        >li{
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          text-align: left;
          line-height: 25px;
          margin-bottom: 15px;
        }
      }
    }
  }
</style>
