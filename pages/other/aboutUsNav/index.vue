<template>
    <div class="about-us-box">
        <div class="head-box">
            <div class="head-con">
                <h3>{{aboutUsTopInfo.title}}</h3>
                <p>{{aboutUsTopInfo.content}}</p>
            </div>
        </div>
        <div class="about-us-content-box">
            <div class="nav-box">
                <ul class="nav-list">
                <li v-for="(items, index) in meunt" :key="index">
                    <nuxt-link :to="`/other/${items.MenuId}`">{{items.MenuName}}</nuxt-link>    
                </li>
                </ul>
            </div>
            <div class="about-us-content-right">
                 <div class="content-box">
                    <h4 class="about-title">关于我们</h4>
                    <div>
                        <div class="about-con" v-html="contentHtml.Content"></div>
                    </div>
                  </div>
            </div>
        </div>
  </div>
</template>
<script>
export default {
    name: 'other',
    layout: 'main',
    middleware: ['other'],
    async asyncData({route, store, params, query}) {
        let meunt = await store.dispatch('getSysExpMenu');
        return {
            meunt: meunt.sysExpMenus
        }
    },
    data () {
      return {
        contentHtml: "",
        navList:[
            {
                type:'/other/aboutUs',
                name:'关于我们',
            },
            {
                type:'/other/contactUs',
                name:'联系我们',
            },
            {
                type:'/other/disclaimer',
                name:'免责声明',
            },
            {
                type:'/other/toPublish',
                name:'如何发布',
            },
            {
                type:'/other/unableToLogIn',
                name:'登录异常',
            },
            {
                type:'/other/feedback',
                name:'意见反馈',
            }
        ],
        currentIndex:0,
        aboutUsTopInfo:{
          title:'越了解，越爱',
          content:'建筑部落最初只是一个小小的情怀，通过一点一滴努力与积累，如今已是数十万设计师喜爱的室内设计综合网站。\n' +
          '我们深信越努力定必越幸运，欢迎你参与我们的活动比赛、宣传你我的家，更期待热爱这份行业的你加入我们。'
        }
      }
    },
    mounted () {
      this.getcontentHtml()
    },
    methods: {
        choseItem (item,inx) {
            this.currentIndex = inx
        },
        async getcontentHtml () {
         let msg = await this.$store.dispatch('getSysExp', this.$route.params.id);
        if (msg) {
            this.contentHtml = msg
        }
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
            justify-content: space-between;
        }
    }
    .about-us-content-right {
        width: 100%;
    }
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
            text-align: center;
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
        a {
            display: inline-block;
            width: 100%;
            height: 100%;
            &:hover{
                color: #FF3C00;
               
            }
        }
        .nuxt-link-active{
            color: #FF3C00;
            &:after{
                display: block;
                width: 2px;
                height: 24px;
                content: '';
                background: #FF3C00;
                border-radius: 1px;
                position: absolute;
                left: 0;
                top:0px;
            }
        }
        }
    }
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
