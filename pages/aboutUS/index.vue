<template>
  <div class="about-us-box">
    <about-us-top></about-us-top>
    <div class="about-us-content-box">
      <about-us-nav @changeCon="changeCon"></about-us-nav>
      <div :is="currentComponents"></div>
    </div>
  </div>
</template>

<script>
  import AboutUsTop from './aboutUsTop'
  import AboutUsNav from './aboutUsNav'
  import Disclaimer from './disclaimer'
  import aboutUs from './aboutUs'
  import contactUs from './contactUs'
  import toPublish from './toPublish'
  import unableToLogIn from './unableToLogIn'
  import feedback from './feedback'
  export default {
    layout:'main',
    name: 'AboutUs',
    components: {
      AboutUsTop,
      AboutUsNav,
      Disclaimer,
      aboutUs,
      contactUs,
      toPublish,
      unableToLogIn,
      feedback
    },
    data () {
      return {
        currentComponents:'aboutUs'
      }
    },
    methods: {
      changeCon (data) {
        this.currentComponents = data.type;
      }
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
