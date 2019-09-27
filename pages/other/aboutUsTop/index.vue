<template>
  <div class="head-box">
    <div class="head-con">
        <h3>{{aboutUsTopInfo.title}}</h3>
        <p>{{aboutUsTopInfo.content}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AboutUsTop',
    components: {
    },
    data () {
      return {
        aboutUsTopInfo:{
          title:'越了解，越爱',
          content:'建筑部落最初只是一个小小的情怀，通过一点一滴努力与积累，如今已是数十万设计师喜爱的室内设计综合网站。\n' +
          '我们深信越努力定必越幸运，欢迎你参与我们的活动比赛、宣传你我的家，更期待热爱这份行业的你加入我们。'
        }
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  .head-box{
    width: 100%;
    height: 200px;
    margin-bottom: 16px;
    background: url("../../../assets/images/aboutUsBg.png") no-repeat left top;
    background-size: cover;
    .head-con{
      width: 1200px;
      height: 200px;
      padding: 40px 200px;
      margin: 0 auto;
      >h3{
        text-align: center;
        font-size: 28px;
        color: #FFFFFF;
        line-height: 30px;
        margin-bottom: 30px;
      }
      >p{
        font-size: 15px;
        color: #FFFFFF;
        line-height: 30px;
      }
    }
  }
</style>
