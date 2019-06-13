<template>
  <div class="content-box">
    <h4 class="about-title">无法登录</h4>
    <div :class="index == 0 ? 'unableToLogIn-list-item unableToLogIn-list-item-first' : 'unableToLogIn-list-item'" v-for="(item,index) in unableToLogIn_list" :key="index">
      <p class="unableToLogIn-list-item-title">{{item.title}}</p>
      <p class="unableToLogIn-list-item-title">{{item.other}}</p>
      <div class="unableToLogIn-list-item-con" v-for="(items,indexs) in item.list" :key="indexs">
        <span v-show="index == 0" class="unableToLogIn-list-item-dian"></span>{{items}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'unableToLogIn',
    components: {
    },
    data () {
      return {
        unableToLogIn_list:[
          {
            title:'导致无法登录的原因有',
            other:'请根据登录失败提示检查原因，如不能解决，您可能是：',
            list:[
              '渲染暂不支持自行注销帐号。',
              '连续几年未登陆该帐号，可能网站更新系统后，被系统收回，建议您定期保持建筑部落帐号登录；',
              '由于违反建筑部落平台规定，上传广告、涉黄涉爆、侵权等违法内容的'
            ]
          },
          {
            title:'导致无法登录的原因有',
            other:'',
            list:[
              '① 内容在审核期间发现不符合网站发布规则，退回/删除处理。',
              '② 如内容已被系统审核通过，则删除处理并扣除相对应积分。',
              '③ 评论不符合网站发布规则，删除处理并扣除相对应积分。',
              '⑤ 严重者将会通过系统进行发布警告提示，如继续违规或者试图钻规则漏洞，则将进行账户禁止处理'
            ]
          }

        ]
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
    .about-title{
      font-size: 18px;
      color: #333333;
      padding-bottom: 20px;
      border-bottom: 1px solid #EEEEEE;
    }
    .unableToLogIn-list-item{
      height: auto;
      padding: 20px 0;
      .unableToLogIn-list-item-title{
        font-size: 14px;
        color: #333333;
        line-height: 25px;
        margin-bottom: 15px;
      }
      .unableToLogIn-list-item-con{
        font-size: 14px;
        color: #151515;
        line-height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        .unableToLogIn-list-item-dian{
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-right: 5px;
          background: #FF3C00 ;
        }
      }
    }
    .unableToLogIn-list-item-first{
      border-bottom: 1px dashed #EEEEEE;
    }
  }
</style>
