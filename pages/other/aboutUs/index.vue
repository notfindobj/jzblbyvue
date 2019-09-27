<template>
  <div class="content-box">
    <h4 class="about-title">关于我们</h4>
    <div class="about-con">
      <p class=""><span class="about-us">绿地集团</span>中国领先的室内设计综合网站，2009年12月创立于上海，2019年8月正式上线运营。 建筑部落聚集了国内众多的专业设计师、绘图师、艺术院校生等设计群体，会员交流涉及室内设计、建筑设计、动画设计等多设计文化领域，是中国最活跃的室内设计交流平台！</p>
      <p>经过多年的专业累计，并坚守以“学习（Learn）、分享（Share）、成长（Grow）” 的运营理念，建筑部落现有注册设计师/绘图师40万人， 日均浏览人数3万，在室内设计群体中具有极高的影响力与号召力！</p>
      <p>感谢无数关注、爱护我们的朋友，建筑部落愿与充满活力的你，彼此相伴，共同成长</p>
    </div>
    <div class="abuout-other">
      <p>团队成员：合共超过30人，分别是项目运营8人，培训教育老师6人，程序工程师3人，10余名其他人员（编辑，推广，助理等）</p>
      <div class="about-us-img">
        <img src="http://iph.href.lu/112x112?text=[自定义二维码]" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'aboutUs',
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
    .about-title{
      font-size: 18px;
      color: #333333;
      padding-bottom: 20px;
      border-bottom: 1px solid #EEEEEE;
    }
    .about-con{
      padding: 20px 0;
      border-bottom: 1px dashed #EEEEEE;
      margin-bottom: 20px;
     
    }
  }
</style>
