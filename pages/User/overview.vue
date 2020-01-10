<template>
    <div class="overview">
        <div class="overview-property">
            <rechargeBLB v-if="modal2" @closeBtn="closeBtn"/>
            <div class="overview-property-item">
                <p class="overview-property-item-name">人民币余额:</p>
                <p class="overview-property-item-num">{{account.RMB}}</p>
                <div class="overview-property-item-btn">
                    <span @click="investMoney">提现</span>
                </div>
            </div>
            <div class="overview-property-item">
                <p class="overview-property-item-name">部落币余额:</p>
                <p class="overview-property-item-num">{{account.TribalCoins}}</p>
                <div class="overview-property-item-btn">
                    <span @click="Recharge">充值</span>
                    <span @click="expressive">提现</span>
                </div>
            </div>
            <div class="overview-property-item">
                <p class="overview-property-item-name">我的积分:</p>
                <p class="overview-property-item-num">{{account.Integral}}</p>
                <div class="overview-property-item-btn">
                    <span @click="report" v-if="!account.IsSignIn">签到</span>
                    <span v-if="account.IsSignIn">已签到</span>
                    <span>获取更多</span>
                </div>
            </div>
            <!-- 部落币充值 -->
            <!-- <Modal v-model="modal2" width="360" :mask-closable="false">
                <p slot="header" style="text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>部落币充值</span>
                </p>
                <div style="header-content">
                    <p class="header-content-sub">部落币提现需要先转换成人民币，转换率（10/1）</p>
                    <Input v-model="rwblb" @on-keyup="rWupNum(rwblb)" :maxlength="account.TribalCoins" number>
                      <span slot="append" class="sub-blb" style="width:50px;">{{rwblb * 10}}B</span>
                    </Input>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="investMoney ">确认充值</Button>
                </div>
            </Modal> -->
            <!-- 部落币提现 -->
            <Modal v-model="modal3" width="360" :mask-closable="false">
                <p slot="header" style="text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>部落币提现</span>
                </p>
                <div style="header-content">
                    <h3 class="header-content-num">部落币余额： {{account.TribalCoins}}</h3>
                    <p class="header-content-sub">部落币提现需要先转换成人民币，转换率（10/1）</p>
                    <Input v-model="blb" @on-keyup="keyupNum(blb)" :maxlength="account.TribalCoins" number>
                      <span slot="append" class="sub-blb" style="width:50px;">{{blb / 10}}元</span>
                    </Input>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" long @click="getWithdrawal">确认提现</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>
<script>
import rechargeBLB from './components/RechargeBLB'
import {getUserAccount, addSignInData, withdrawal} from '../../service/clientAPI'
export default {
    data () {
        return {
            account: {},
            modal2: false,
            modal3: false,
            blb: 0,
            rwblb: 0
        }
    },
    components: {
        rechargeBLB
    },
    created () {
        this.getAccount()
    },
    methods: {
        // 充值
        closeBtn () {
            this.modal2 = false
        },
        async getAccount () {
            let msg = await getUserAccount();
            if (msg) {
                this.account = msg;
            }
        },
        async report () {
            let msg = await addSignInData();
            if (msg) {
                this.account.IsSignIn = true
                this.$Message.success('签到成功！')
            }
        },
        // 提现
        keyupNum (e) {
            if (e==='' || parseInt(e) == 0 ) {
                this.blb = 0
                return false
            }
            if (parseInt(e) > this.account.TribalCoins) {
                this.$Message.info('超出部落币余额了哦~');
                return false
            }
            this.blb = parseInt(e);
        },
        // 充值
        Recharge () {
            this.modal2 = true 
        },
        // 提现
        rWupNum (e) {
            if (e==='' || parseInt(e) == 0 ) {
                this.rwblb = 0
                return false
            }
            if (parseInt(e) > this.account.TribalCoins) {
                this.$Message.info('超出部落币余额了哦~');
                return false
            }
            this.rwblb = parseInt(e);
        },
        async getWithdrawal () {
            let query = {
                "Money": 10,
                "OpType": 1,
                "WithdrawalType": 2
            }
            let msg = await withdrawal(query)
            if (msg) {

            }
        },
        expressive () {
            this.modal3 = true
        },
        // ???
        async investMoney  () {
            let query = {
                "Money": 10,
                "OpType": 1,
                "WithdrawalType": 2
            }
            let msg = await withdrawal(query)
            if (msg) {

            }
        }
    },
}
</script>
<style lang="less" scoped>
    .overview {
        &-property {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
            &-item {
                width: 200px;
                height: 80px;
                background: #eaeaea;
                padding: 10px;
                border-radius: 3px;
                &-name {
                    font-size: 14px;
                    font-weight: 600;
                }
                &-num {
                    font-size: 14px;
                    font-weight: 600;
                }
                &-btn {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 3px;
                    > span {
                        cursor: pointer;
                        &:hover {
                            color: #ff3c00;
                        }
                    }
                }
            }
        }
    }
    .header-content-sub {
        font-size: 12px;
        color: #909090;
    }
    .sub-blb {
        width: 50px;
        display: inline-block;
    }
</style>