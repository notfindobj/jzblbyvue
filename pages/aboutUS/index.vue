<template>
  <div class="about-us-box">
    <about-us-top></about-us-top>
    <div class="about-us-content-box">
      <about-us-nav></about-us-nav>
      <div :is="currentComponents"></div>
    </div>
  </div>
</template>

<script>
  import AboutUsTop from './aboutUsTop'
  import AboutUsNav from './aboutUsNav'
  import Disclaimer from './disclaimer'
  export default {
    layout:'main',
    name: 'AboutUs',
    components: {
      AboutUsTop,
      AboutUsNav,
      Disclaimer
    },
    data () {
      return {
        currentComponents:'Disclaimer'
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  .about-us-box{
    width: 100%;
    height: 100%;
    .about-us-content-box{
      width: 1200px;
      height: auto;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: center;
    }
  }
</style>
