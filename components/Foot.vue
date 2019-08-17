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
                    <li>关于我们</li>
                    <li>联系我们</li>
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
                    <li>如何发布</li>
                    <li>登录异常</li>
                    <li>意见反馈</li>
                </ul>
            </div>
            <div>
                <!-- <img src="http://iph.href.lu/112x112?text=[自定义二维码]" alt="" width="112px" height="112px;">
                <div class="code-img">建筑部落APP</div> -->
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
                console.log(this.friendLinks)
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .foot {
        background: #E8E8E8;
        padding-top: 20px;
        margin-top: 20px;
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
            line-height: 79px;
            font-size: 12px;
            color: #A9A8A8;
        }
    }
    .friendship {
        color: #999999;
        > li {
            width: 24.2%;
            display: inline-block;
        }
    }
    .foot-color {
        color: #999999;
        margin-top: 8px;
        > li {
            line-height: 20px;
        }
    }
    .code-img {
        text-align: center;
        color: #333333;
        font-size: 14px;
    }
</style>
