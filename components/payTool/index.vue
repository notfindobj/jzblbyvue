<template>
    <div class="paym">
        <div class="paym-com">
            <i class="close-paym" @click="closePay">X</i>
            <div class="paym-com-left"></div>
            <div class="paym-com-right">
                <div class="paym-com-right-item">
                    <label>充值账号：</label>
                    <span>初九</span>
                </div>
                <div class="paym-com-right-item">
                    <label>付款方式：</label>
                    <div class="paym-com-right-item-paysele">
                        <div>
                            <span class="paysele-wei"></span>
                            <span class="paysele-zhi"></span>
                        </div>
                       
                    </div>
                </div>
                 <div>
                    <p class="amount">700元</p>
                    <div class="amount-qr">
                        <p><img src="../../assets/images/qr-code.jpg" alt="" width="140"></p>
                        <span class="qr-tol">
                            支付宝扫码支付
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        closePay () {
            this.$emit("closePay")
        }
    }
}
</script>
<style lang="less" scoped>
    .close-paym {
        position: absolute;
        right: -12px;
        top: -12px;
        display: inline-block;
        width: 28px;
        height: 28px;
        background: #ddd;
        border: 2px solid #fff;
        border-radius: 50%;
        cursor: pointer;
    }
    .qr-tol {
        color: #C7C7C7;
        font-size: 12px;
        line-height: 12px;
        text-align: center;
        width: 140px;
        display: inline-block;
        margin: 10px auto 0px;
    }
    .amount-qr {
        text-align: center;
        padding: 10px 0 10px;
    }
    .amount {
        margin-top: 15px;
        text-align: center;
        font-size: 28px;
        color: #3bc66f;
    }
    .paysele-wei {
        background: url(../../assets/images/paym_sprites.png) -10px  -10px;
        display: inline-block;
        width: 108px;
        height: 28px;
        cursor: pointer;
    }
    .paysele-zhi {
        cursor: pointer;
        background: url(../../assets/images/paym_sprites.png) -138px  -58px;
        display: inline-block;
        width: 108px;
        height: 28px;
    }
    .paym {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .6);
        z-index: 9999;
        &-com {
            background: #fff;
            width: 800px;
            height: 430px;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50% ,-50%);
            border-radius: 3px;
            &-left {
                display: inline-block;
                width: 300px;
                float: left;
                height: 430px;
                background: url(../../assets/images/pay-left.jpg);
            }
            &-right {
                color: #333;
                float: right;
                position: absolute;
                width: 500px;
                height: 100%;
                display: inline-block;
                box-sizing: border-box;
                padding: 40px 70px;
                &-item {
                    line-height: 30px;
                    label {
                        display: inline-block;
                        text-align: left;
                        width: 70px;
                    }
                    &-paysele {
                        display: inline-block;
                        width: 80%;
                        height: 100%;
                        float: right;
                    }
                }
            }
        }
    }
</style>