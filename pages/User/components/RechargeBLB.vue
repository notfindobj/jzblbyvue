<template>
    <div class="money" v-if="modal1">
        <div class="money-box">
            <div class="money-box-title">
                <p>部落币充值</p>
                <i class="icon iconfont icon-chahao2" @click="closeBtn"></i>
            </div>
            <div class="money-box-boby">
                <ul>
                    <li class="money-box-boby-action">支付宝</li>
                    <li>微信</li>
                </ul>
                <div class="money-box-boby-content">
                    <div class="money-box-boby-content-item">
                        <span class="money-box-boby-content-item-label">
                            充值金额：
                        </span>
                        <Input v-model="rechanrgNum" style="width: 300px"></Input>
                    </div>
                    <iframe style="display: none;" v-if="moneyUrl" :src="moneyUrl" frameborder="0"></iframe>
                </div>
            </div>
            <div>
                <Button type="primary" @click="ok" long>充值</Button>
            </div>
        </div>
    </div>
</template>
<script>
import {rechargeBLB} from '../../../service/clientAPI'
export default {
    data () {
        return {
            modal1: false,
            moneyUrl: '',
            rechanrgNum: ''
        }
    },
    created () {
        this.moneyUrl = ''
    },
    methods: {
        async ok () {
            let query = {
                Money: this.rechanrgNum,
                IsDebug: true
            }
            let msg = await rechargeBLB(query);
            if (msg) {
                this.moneyUrl = msg
            }
        },
        closeBtn () {
            this.$Message.info('Clicked cancel');
        }
    }
}
</script>
<style lang="less" scoped>
    .money {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .15);
        z-index: 9999;
        &-box {
            width: 400px;
            display: inline-block;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            background: #fff;
            border-radius: 3px;
            padding: 10px;
            &-title {
                font-size: 14px;
                font-weight: bold;
                display: flex;
                justify-content: space-between;
                i {
                    cursor: pointer;
                }
            }
            &-boby {
                ul {
                    display: flex;
                    line-height: 30px;
                    border-bottom: 1px solid #dddd;
                    margin-bottom: 5px;
                    justify-content: center;
                    font-size: 14px;
                    color: #333;
                    li {
                        padding: 0 10px;
                        cursor: pointer;
                        position: relative;
                    }
                    .money-box-boby-action::after {
                        bottom: -1px;
                        position: absolute;
                        left: 0;
                        background: #ff3c00;
                        display: inline-block;
                        content: '';
                        width: 100%;
                        height: 2px;
                    }
                }
                &-content {
                    &-item {
                        display: flex;
                        margin-bottom: 15px;
                        justify-content: center;
                        &-label {
                            width: 70px;
                            line-height: 30px;
                        }
                    }
                }
            }
        }
    }
</style>