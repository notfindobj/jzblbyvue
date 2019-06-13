<template>
  <div class="content-box">
    <h4 class="about-title">如何发布</h4>
    <div :class="index == 0 ? 'to-publish-item to-publish-item-first' : 'to-publish-item'" v-for="(item,index) in to_publish_list" :key="index">
      <p class="to-publish-item-title">{{item.title}}</p>
      <div class="to-publish-item-img" v-if="item.imgurl">
        <img :src="item.imgurl" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'toPublish',
    components: {
    },
    data () {
      return {
        to_publish_list:[
          {
            title:'① 点击发布按钮',
            imgurl:'http://iph.href.lu/112x112?text=[自定义二维码]'
          },
          {
            title:'② 按照要求填写信息，选择发布的类型，填写信息后，点击发布',
            imgurl:'http://iph.href.lu/112x112?text=[自定义二维码]'
          },
          {
            title:'③ 评论不符合网站发布规则，删除处理并扣除相对应积分。',
            imgurl:''
          },
          {
            title:'④如内容已被系统审核通过，则删除处理并扣除相对应积分。',
            imgurl:''
          },
          {
            title:'⑤ 严重者将会通过系统进行发布警告提示，如继续违规或者试图钻规则漏洞，则将进行账户禁止处理',
            imgurl:''
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
    .to-publish-item{
      height: auto;
      padding: 20px 0;
      .to-publish-item-title{
        font-size: 14px;
        color: #333333;
        line-height: 25px;
      }
      .to-publish-item-img{
        width: 100%;
        height: 260px;
        margin-top: 20px;
        >img{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
    .to-publish-item-first{
      border-bottom: 1px dashed #EEEEEE;
    }
  }
</style>
