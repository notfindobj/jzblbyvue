<template>
  <div class="containers">
    <h1 v-if="error.statusCode === 500">
      <img src="../assets/images/err500.jpg" width="100%" alt="">
    </h1>
    <h1 v-if="error.statusCode === 404">找不到页面</h1>
    <!-- <h1 v-else>应用发生错误异常</h1> -->
    <div class="back-home">
      <nuxt-link to="/">返回首页</nuxt-link>
    </div>
    <div class="refresh-page">
      <a href="javascript: void(0)"  @click="refreshPage">刷新页面</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog', // 你可以为错误页面指定自定义的布局
  methods: {
    refreshPage () {
      location.reload()
    }
  },
}
</script>
<style lang="less">
  .back-home {
      position: absolute;
      top: 204px;
      left: 509px;
      font-size: 20px;
      transform: translateX(-50%);
      color: #ffffff !important;
      background: #2d95e5;
      padding: 12px 30px;
      border-radius: 4px;
      a {
        color: #fff;
        &:hover {
          color: #333333;
        }
      }
  }
  .refresh-page {
      position: absolute;
      top: 204px;
      left: 687px;
      font-size: 20px;
      transform: translateX(-50%);
      color: #ffffff !important;
      background: #2d95e5;
      padding: 12px 30px;
      border-radius: 4px;
      a {
        color: #fff;
        &:hover {
          color: #333333;
        }
      }
  }
  .containers {
    width: 1200px;
    position: relative;
    margin: 0 auto;
  }
</style>