<template>
    <Modal
        v-model="modalConfig.isWxConfig"
        @on-cancel="cancel"
        title="打赏作者">
        <div class="QRcode-title">
            <p>微信扫码支付</p>
            <p> 打赏金额：<span>￥ {{paymentConfig.Price}}</span></p>
        </div>
        <div class="QRcode">
            <img :src="paymentConfig.data" alt="" style="w">
        </div>
        <div slot="footer"></div>
    </Modal>
</template>
<script>
export default {
    props: {
        modalConfig: {
            type: Object,
            default: function () {
                return {}
            }
        },
        paymentConfig: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    methods: {
        cancel () {
            this.$emit('cancel')
        }
    }
}
</script>
<style lang="less" scoped>
    .QRcode {
        text-align: center;
        img {
            width: 180px;
            height: 180px;
        }
    }
    .QRcode-title {
        text-align: center;
        font-size: 14px;
        span {
            color: #06a714;
            margin-bottom: 20px;
            display: inline-block;
        }
        line-height: 30px;
    }
</style>
