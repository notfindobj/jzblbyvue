<template>
    <div class="float" v-if="isPannel">
        <div class="float-box">
            <div class="float-box-lf">
                <h1>建筑部落</h1>
                <p>让设计更轻松</p>
            </div>
            <div class="float-box-lr">
                <div>
                    <img :src="qrCode" alt="" height="80px">
                    <p>微信公众号</p>
                </div>
                <div>
                    <img :src="wxCode" alt="" height="80px">
                    <p>微信交流群</p>
                </div>
            </div>
        </div>
        <Icon @click="closePannel" class="close-circle" type="ios-close-circle-outline" />
    </div>
</template>
<script>
export default {
    data () {
        return {
            qrCode: require('../../assets/images/qr-code.jpg'),
            wxCode: require('../../assets/images/weixinqun.png'),
            isPannel: true
        }
    },
    mounted () {
        if (sessionStorage.getItem("isPannel")) {
            this.isPannel = sessionStorage.getItem("isPannel") === "true" ? true : false 
        }
        
    },
    methods: {
        closePannel () {
            sessionStorage.setItem("isPannel", false)
            this.isPannel = false
        }
    }
}
</script>
<style lang="less" scoped>
    .float {
        position: fixed;
        bottom: 0;
        height: 120px;
        width: 100%;
        background: rgba(0, 0, 0, .4);
        z-index: 9999;
        &-box {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            color: #fff;
            margin-top: 10px;
            &-lf {
                margin-top: 15px;
                color: #eb4844;
                h1 {
                    letter-spacing: 10px;
                }
                p {
                    font-size: 15px;
                    margin-top: 10px;
                    letter-spacing: 10px;
                }
            }
            &-lr {
                display: flex;
                width: 200px;
                text-align: center;
                justify-content: space-between;
            }
        }
    }
    .close-circle {
        position: absolute;
        right: 0;
        bottom: 97px;
        font-size: 24px;
        color: #fff;
        cursor: pointer;
    }
</style>