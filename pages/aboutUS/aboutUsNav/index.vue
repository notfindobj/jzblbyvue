<template>
  <div class="nav-box">
    <ul class="nav-list">
      <li v-for="(item,index) in navList" :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'AboutUsNav',
    components: {
    },
    data () {
      return {
        navList:[
          {
            type:'aboutUs',
            name:'关于我们',
          },
          {
            type:'contactUs',
            name:'联系我们',
          },
          {
            type:'disclaimer',
            name:'免责声明',
          },
          {
            type:'toPublish',
            name:'如何发布',
          },
          {
            type:'unableToLogIn',
            name:'无法登录',
          },
          {
            type:'feedback',
            name:'意见反馈',
          },
        ]
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  .nav-box{
    width: 200px;
    height: 300px;
    margin-right: 16px;
    background: #ffffff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);
    .nav-list{

    }
  }
</style>
