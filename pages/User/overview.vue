<template>
    <div class="overview">
        <div class="overview-property">
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
                    <!-- <span @click="expressive">提现</span> -->
                </div>
            </div>
            <div class="overview-property-item">
                <p class="overview-property-item-name">我的积分:</p>
                <p class="overview-property-item-num">{{account.Integral}}</p>
                <div class="overview-property-item-btn">
                    <span @click="report">签到</span>
                    <!-- <span @click="report" v-if="!account.IsSignIn">签到</span>
                    <span v-if="account.IsSignIn">已签到</span> -->
                    <span>
                        <nuxt-link :to="{ name: 'details-id', params: { id: '33fc4c18-75b2-42a2-8f66-b824cc7176e0' }}">获取更多</nuxt-link>
                    </span>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import rechargeBLB from './components/RechargeBLB'
import {getUserAccount, addSignInData, withdrawal} from '../../service/clientAPI'
import {analogJump} from "../../plugins/untils/public"
export default {
    data () {
        return {
            account: {},
        }
    },
    components: {
        rechargeBLB
    },
    created () {
        this.getAccount()
    },
    methods: {
        async getAccount () {
            let msg = await getUserAccount();
            if (msg) {
                this.account = msg;
            }
        },
        // 签到
        async report () {
            this.$router.push({name: 'sign'})
            // let msg = await addSignInData();
            // if (msg) {
            //     this.account.IsSignIn = true
            //     this.$Message.success('签到成功！')
            // }
        },
        // 充值
        Recharge () {
            this.$router.push({name: 'xr_web'})
            // let routeData = this.$router.resolve({ name: 'xr_web'});
            // analogJump(routeData.href);
        },
        // 充值
        async investMoney  () {
            // let query = {
            //     "Money": 10,
            //     "OpType": 1,
            //     "WithdrawalType": 2
            // }
            // let msg = await withdrawal(query)
            // if (msg) {}
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
                    span {
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