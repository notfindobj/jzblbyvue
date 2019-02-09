<template>
    <div class="foot">
        <div class="foot-top">
            <div>
                <img :src="footImg" alt="">
            </div>
            <div>关于</div>
            <div>友情链接</div>
            <div>帮助中心</div>
            <div>二维码</div>
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
</style>
