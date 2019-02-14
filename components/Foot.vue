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
                    <li>筑名导航</li>
                    <li>archdaily</li>
                    <li>archdaily中文</li>
                    <li>ikuku</li>
                    <li>ABBS</li>
                    <li>ARCHGO</li>
                    <li>建筑英才网</li>
                    <li>设计本</li>
                    <li>建筑学院</li>
                    <li>花瓣</li>
                    <li>古德设计</li>
                    <li>光辉城市</li>
                    <li>3D WareHouse</li>
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
                <img src="http://iph.href.lu/112x112?text=[自定义二维码]" alt="" width="112px" height="112px;">
                <div class="code-img">建筑部落APP</div>
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
            footImg: require('../assets/images/foot_logo.png')
        }
    },
}
</script>
<style lang="scss" scope>
    .foot {
        background: #E8E8E8;
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
