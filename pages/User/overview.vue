<template>
    <div class="overview">
        <div class="overview-property">
            <rechargeBLB/>
            <div class="overview-property-item">
                <p class="overview-property-item-name">人民币余额:</p>
                <p class="overview-property-item-num">{{account.RMB}}</p>
                <div class="overview-property-item-btn">
                    <span>提现</span>
                </div>
            </div>
            <div class="overview-property-item">
                <p class="overview-property-item-name">部落币余额:</p>
                <p class="overview-property-item-num">{{account.TribalCoins}}</p>
                <div class="overview-property-item-btn">
                    <span>充值</span>
                    <span>提现</span>
                </div>
            </div>
            <div class="overview-property-item">
                <p class="overview-property-item-name">我的积分:</p>
                <p class="overview-property-item-num">{{account.Integral}}</p>
                <div class="overview-property-item-btn">
                    <span @click="report">签到</span>
                    <span>获取更多</span>
                </div>
            </div>
            <!-- <div class="overview-property-item">
                <p class="overview-property-item-name">我的卡券:</p>
                <p class="overview-property-item-num">0</p>
                <div class="overview-property-item-btn">
                    <span>卡券中心</span>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import rechargeBLB from './components/RechargeBLB'
import {getUserAccount, addSignInData} from '../../service/clientAPI'
export default {
    data () {
        return {
            account: {}
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
        async report () {
            let msg = await addSignInData();
            if (msg) {
                this.$Message.success('签到成功！')
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
</style>