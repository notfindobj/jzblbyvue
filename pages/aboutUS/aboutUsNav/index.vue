<template>
  <div class="nav-box">
    <ul class="nav-list">
      <li :class="currentIndex == index ? 'li-active' : ''" v-for="(item,index) in navList" :key="index" @click="choseItem(item,index)">{{item.name}}</li>
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
        ],
        currentIndex:0
      }
    },
    methods: {
      choseItem (item,inx) {
        this.currentIndex = inx
        this.$emit('changeCon', item)
      }
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
      padding: 15px 0;
      >li{
        width: 200px;
        height: 24px;
        line-height: 24px;
        box-sizing: border-box;
        margin-bottom: 25px;
        font-size: 14px;
        color: #333333;
        text-indent: 40px;
        cursor: pointer;
        position: relative;
        &:last-child{
          margin-bottom: 0;
        }
        &:after{
          width: 2px;
          height: 24px;
          content: '';
          background: #FF3C00;
          border-radius: 1px;
          position: absolute;
          left: 0;
          top:0px;
          display: none;
        }
        &:hover{
          color: #FF3C00;
          &:after{
            display: block;
          }
        }
      }
      .li-active{
        color: #FF3C00;
        &:after{
          display: block;
        }
      }
    }
  }
</style>
