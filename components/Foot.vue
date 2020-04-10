<template>
    <div class="foot">
        <div class="foot-top">
            <div style="width:130px;">
                <img :src="footImg" alt="">
            </div>
            <div style="width:130px;">
                <div>
                    关于
                </div>
                <ul class="foot-color">
                    <li><nuxt-link to="/details/60d70719-3567-4acc-99bd-330ebef0472d">关于我们</nuxt-link></li>
                    <li><nuxt-link to="/details/339c4898-8e12-4b61-afb0-0c4b3442389c">联系我们</nuxt-link></li>
                </ul>
            </div>
            <div style="width:450px;">
                <div>友情链接</div>
                <ul class="friendship foot-color">
                    <li v-for="(items, index) in friendLinks" :key="index">
                        <a :href="items.Src" target="_blank">{{items.Name}}</a>
                    </li>
                </ul>
            </div>
            <div style="width:150px;">
                <div>帮助中心</div>
                <ul class="foot-color">
                    <li><nuxt-link to="/details/46813b6d-9534-44bd-9739-d48b6079d9c1">如何发布</nuxt-link></li>
                    <li><nuxt-link to="/details/5c527259-a41e-44eb-aa46-6371cc86dd20">登录异常</nuxt-link></li>
                    <li><nuxt-link to="/other/feedback">意见反馈</nuxt-link></li>
                </ul>
            </div>
            <div>
                <img src="../assets/images/weixinqun.png" alt="" width="80px" height="80px;">
                <div class="code-img">微信交流群</div>
            </div>
            <div>
                <img src="../assets/images/qr-code.jpg" alt="" width="80px" height="80px;">
                <div class="code-img">微信公众号</div>
            </div>
        </div>
        <div class="foot-buttom">
            Copyright © -1 JZBL Corporation, All Rights Reserved. 沪ICP备18032830号-1
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            footImg: require('../assets/images/foot_logo.png'),
            friendLinks: []
        }
    },
    mounted () {
        this.getFriend()
    },
    methods: {
        async getFriend () {
            let msg =  await this.$store.dispatch('getFriendLinks');
            if (msg) {
                this.friendLinks = msg;
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .foot {
        background: #E8E8E8;
        padding-top: 20px;
        // margin-top: 20px;
        &-top {
            padding: 40px 0 33px;
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #DDDDDD;
        }
        &-buttom {
            text-align: center;
            line-height: 40px;
            font-size: 12px;
            color: #A9A8A8;
        }
    }
    .friendship {
        color: #999999;
        > li {
            width: 24.2%;
            display: inline-block;
            a{
                &:hover {
                    color: #ff3c00;
                }
            }
        }
    }
    .foot-color {
        color: #999999;
        margin-top: 8px;
        > li {
            line-height: 20px;
            a{
                &:hover {
                    color: #ff3c00;
                }
            }
        }
    }
    .code-img {
        text-align: center;
        color: #666;
        font-size: 12px;
    }
</style>
