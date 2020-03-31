<template>
    <div class="si">
        <div class="si-box">
            <Icon class="si-close" @click="closeSign" type="ios-close-circle-outline" />
            <div class="si-box-tit">
                <h3>获得1积分</h3>
                <p class="txt-sub">连续签到还还可兑换部落币！</p>
            </div>
            <div class="si-box-but">
                <h4>
                    累计签到获得：
                </h4>
                <p class="txt-sub">
                    积分用于资料库支付</p >
                <p class="txt-sub">积分可兑换部落币 10积分=1部落币</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        closeSign () {
            this.$emit("closeSign")
        }
    }
}
</script>
<style lang="less" scoped>
    .si {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 9999;
        &-box {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 460px;
            height: 430px;
            background: url(../../assets/images/popup-gift.png);
            &-tit {
                padding-top: 60px;
                text-align: center;
            }
            &-but {
                position: absolute;
                bottom: 10px;
                line-height: 25px;
                padding-left: 60px;
                p {
                    padding-left: 20px;
                }
            }
        }
    }
    .si-close {
        position: absolute;
        right: 0;
        color: #fff;
        font-size: 20px;
        cursor: pointer;
    }
    .txt-sub {
        color: #adadad;
        line-height: 25px;
    }
</style>