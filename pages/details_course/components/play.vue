<template>
    <div class="paym">
        <div class="paym-com">
            <Icon class="close-paym" @click="closePay" type="md-close-circle" />
            <div class="paym-com-right">
                <div class="paym-com-right-item">
                    <label>付款方式：</label>
                    <div class="paym-com-right-item-paysele">
                        <div>
                            <span :style="`background-position:-10px  -${isType ===1 ? 10 : 58}px;`" class="paysele" @click="paysele(1)"></span>
                            <span :style="`background-position:-138px  -${isType ===2 ? 10 : 58}px;`" class="paysele" @click="paysele(2)"></span>
                        </div>
                       
                    </div>
                </div>
                 <div>
                    <p class="amount">{{setMeal.DiscountedPrice}}元</p>
                    <div class="amount-qr">
                        <p>
                            <img v-if="isType ===1" :src="payQr" alt="" width="140">
                            <img v-if="isType === 2 && payiframe === 1" :src="payQr" alt="" width="140">
                            <iframe v-if="isType === 2 && payiframe === 0" :src="payQr" frameborder="0" border="0" class="payiframe" height="125" scrolling="no"></iframe>
                        </p>
                        <span class="qr-tol">
                            {{isType === 1 ? "微信扫码支付" : "支付宝扫码支付"}}{{payStart === 0 ? "" : "成功"}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState} from 'vuex'
import {getGoodStart} from "../../../service/sign"
import {getCourseOrder} from "../../../service/course"

import { requests } from '../../../store/modules'
export default {
    props: {
        setMeal: {
            type: Object,
            default: ()=> {}
        }
    },
    computed: {
        ...mapState({
            Identity: state => state.overas.auth || {}
        })
    },
    data () {
        return {
            isType: 1,
            payQr: "",
            time: null,
            payStart: 0,
            payiframe: 0
        }
    },
    created () {
        this.getPayQr()
    },
    methods: {
        closePay () {
            clearTimeout(this.time)
            this.$emit("closePay")
        },
        paysele (val) {
            clearTimeout(this.time)
            this.isType = val;
            this.getPayQr();
            this.payStart = 0;
        },
        // 支付套餐
        getPayQr () {
            let _this = this;
            let q = {
                ItemId: this.setMeal.CourseID,
                IsBase64Img: false,
                paytype: this.isType,
                IsDebug: false
            }
            clearTimeout(_this.time)
            getCourseOrder(q).then(res => {
                if (res) {
                    _this.payQr = res.url
                    _this.time = setInterval(() => {
                        let o ={
                            orderId: res.orderId
                        }
                        getGoodStart(o).then(res => {
                            if(res.status === 1 && this.isType === 1) {
                                clearTimeout(_this.time)
                                this.payQr = require("../../../assets/images/pay_su.png")
                                setTimeout(() => {
                                    this.$emit("closePay", res)
                                }, 1000)
                            }
                            if(res.status === 1 && this.isType === 2) {
                                _this.payiframe = 1
                                _this.payiframe = 1
                                clearTimeout(_this.time)
                                _this.payQr = require("../../../assets/images/pay_su.png")
                                setTimeout(() => {
                                    _this.$emit("closePay", res)
                                }, 1000)
                            }
                        }).catch(err=> {})
                    }, 1000)
                }
            }).catch(err => {})
        }
    }
}
</script>
<style lang="less" scoped>
    .close-paym {
        position: absolute;
        right: 1px;
        top: -3px;
        display: inline-block;
        width: 28px;
        height: 28px;
        cursor: pointer;
        font-size: 32px;
        color: #a7a4a4;
        &:hover {
            color: #eb4844;
        }
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
    .paysele {
        display: inline-block;
        width: 108px;
        height: 28px;
        cursor: pointer;
        background: url(../../../assets/images/paym_sprites.png);
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
            width: 500px;
            height: 430px;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 3px;
            &-left {
                width: 300px;
                float: left;
                height: 430px;
                background: url(../../../assets/images/pay-left.jpg);
            }
            &-right {
                color: #333;
                float: right;
                width: 500px;
                height: 100%;
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
                        width: 80%;
                        height: 100%;
                        float: right;
                    }
                }
            }
        }
    }
    .payiframe {
        width: 125px;
        height: 125px;
        overflow: hidden;
    }
</style>