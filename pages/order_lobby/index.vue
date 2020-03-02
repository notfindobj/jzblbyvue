<template>
    <div class="order">
        <div class="order-title">
            <div class="order-title-item" :key="index" v-for="(items, index) in orderType">
                <label class="order-title-item-left">{{items.typename}}：</label>
                <div class="order-title-item-right">
                    <template v-for="(item, index) in items.list">
                        <span v-if="index <= 20" :key="index">{{item.FullName}}</span>
                        <span :key="index" v-if="index > 20 && isviewMore">{{item.FullName}}</span>
                    </template>
                    <label v-if="index > 20" @click="viewMore">{{!isviewMore ? "查看更多" : "收起"}}</label>
                </div>
            </div>
        </div>
        <div class="order-choice">
            <div class="order-choice-left">
                <span>
                    发布时间
                </span>
                <span>
                    总面积
                </span>
            </div>
            <div class="order-choice-right">
                总订单数：88888
            </div>
        </div>
        <div class="order-list">
            <div class="order-list-left">
                <div class="order-list-left-items" :key="index" v-for="(items, index) in orderList">
                    <div class="order-list-left-items-left">
                        <div class="order-list-left-items-left-title">
                            <span class="order-list-left-items-left-title-name">{{items.ProvinceName}}{{items.CityName}}{{items.Area}}m²{{items.TypeName}}设计</span> 
                            <span class="order-list-left-items-left-title-price">{{items.BudgetName}}</span>
                        </div>
                        <ul>
                            <li>{{items.ProvinceName}}</li>
                            <li>{{items.TypeName}}</li>
                            <li>{{items.Area}}m²</li>
                            <li>{{setTime(items.CreateDate)}}</li>
                        </ul>
                    </div>
                    <div class="order-list-left-items-right">
                        <!-- <Button style="background: #ff3c00;color:#ffffff;" @click="orderLpbby">申请接单</Button> -->
                        <Button style="background: #dddddd;color:#898989;" @click="getUserInfo(items.ID)">查看详情</Button>
                    </div>
                </div>
                <Page :total="100" />
            </div>
            <div class="order-list-right"></div>
        </div>
    </div>
</template>
<script>
import $moment from 'moment'
export default {
    data () {
        return {
            isviewMore: false
        }
    },
    async asyncData({ store }) {
        const orderType = await store.dispatch('getOrderType');
        const orderList = await store.dispatch('getOrderList');
        return {
            orderType,
            orderList
        }
    },
    methods: {
        orderLpbby () {
            this.$Message.warning("正在完善")
        },
        // 个人资料
        viewMore () {
            this.isviewMore = !this.isviewMore
        },
        async getUserInfo(id) {
            this.$router.push({name: 'order_lobby-id', params: {id: id}})
        },
        setTime (time) {
            $moment.locale('zh-cn'); 
            return $moment(time).format('LL'); 
        }
    }
}
</script>
<style lang="less" scoped>
    .ivu-page {
        text-align: center;
        margin-top: 40px;
    }
    .order {
        width: 1200px;
        margin: 0 auto;
        font-size: 14px;
        &-title {
            background: #fff;
            padding-left: 30px;
            padding: 20px 30px 20px 20px;
            color: #666;
            &-item {
                display: inline-block;
                margin-top: 8px;
                &-left {
                    font-weight: bold;
                    padding-top: 5px;
                    float: left;
                    width: 75px;
                }
                &-right {
                    float: right;
                    width: 1050px;
                    label {
                        color: #ff3c00;
                        cursor: pointer;
                    }
                    span {
                        padding: 5px 10px;
                        display: inline-block;
                        &:hover {
                            cursor: pointer;
                            color: #ffffff;
                            background: #ff3c00;
                            border-radius: 5px;
                        }
                    }
                }
            }
        }
        &-choice {
            background: #ffffff;
            width: 1200px;
            display: inline-block;
            margin: 10px 0 15px;
            padding: 15px 20px;
            &-left {
                float: left;
                span {
                    margin-right: 10px;
                    cursor: pointer;
                }
            }
            &-right {
                float: right;
            }
        }
        &-list {
            &-left {
                background: #fff;
                width: 910px;
                display: inline-block;
                padding: 15px 20px;
                &-items {
                    padding-top: 20px;
                    margin-bottom: 20px;
                    border-top: 1px solid #dddddd;
                    &-left {
                        display: inline-block;
                        &-title {
                            margin-bottom: 5px;
                            &-name {
                                font-weight: bold;
                            }
                            &-price {
                                color: #ff3c00;
                                font-weight: 600;
                                margin-left: 20px;
                            }
                        }
                        ul li {
                            display: inline-block;
                            padding-right: 15px;
                            color: #9d9d9d;
                            &:not(:last-child):after {
                                content: ' ';
                                display: inline-block;
                                width: 1px;
                                height: 20px;
                                background: #9d9d9d;
                                position: relative;
                                top: 5px;
                                right:-7px;
                            }
                        }
                    }
                    &-right {
                        display: inline-block;
                        float: right;
                    }
                    &:first-child {
                        border-top: none;
                    }
                }
            }
            &-right {
                float: right;
                width: 280px;
                height: 280px;
                background: url('../../assets/images/oder-lp.jpg');
                background-repeat: no-repeat;
                cursor: pointer;
                background-position-x: 100%;
            }
        }
    }
</style>