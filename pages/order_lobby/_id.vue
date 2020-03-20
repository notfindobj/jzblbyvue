<template>
    <div class="order">
        <div class="order-left">
            <div class="order-left-title">
                <div class="order-left-title-box">
                    <h2>{{orderType.ProvinceName}}{{orderType.CityName}}{{orderType.Area}}m²{{orderType.TypeName}}设计</h2>
                    <ul>
                        <li>{{orderType.CreateDate}} 发布</li>
                        <li>信息编号：{{orderType.ID}}</li>
                    </ul>
                </div>
                <div v-if="orderType.Status === 0" class="order-left-title-btns" @click="orderLpbby(orderType)">
                    <span>申请接单</span>
                </div>
                <div v-if="orderType.Status === 1 || orderType.Status === 2" class="order-left-title-btns">
                    <span >完成派单</span>
                </div>
            </div>
            <div class="order-left-info">
                <ul>
                    <li>
                        <label>项目地点：</label>
                        <span>{{orderType.CityName}}</span>
                    </li>
                    <li>
                        <label>项目类型：</label>
                        <span>{{orderType.TypeName}}</span>
                    </li>
                    <li>
                        <label>项目规模：</label>
                        <span>{{orderType.Area}}m²</span>
                    </li>
                    <li>
                        <label>设计预算：</label>
                        <span>{{orderType.BudgetName}}</span>
                    </li>
                    <li>
                        <label>业主姓名：</label>
                        <span>{{orderType.FullName}}</span>
                    </li>
                    <template  v-if="orderType.Status === 1">
                        <li>
                            <label>业主电话：</label>
                            <span>{{orderType.UserPhone}}</span>
                        </li>
                    </template>
                </ul>
            </div>
            <div class="order-left-remarks">
                <p class="order-left-remarks-name">设计要求</p>
                <div class="order-left-remarks-content">{{orderType.Remark}}
                </div>
            </div>
        </div>
        <div class="order-right"></div>
    </div>
</template>
<script>
import { mapState} from 'vuex'
import {takeOrders} from '../../service/clientAPI'
export default {
    layout: 'main',
    computed: {
        ...mapState({
            Identity: state => state.overas.auth || {}
        })
    },
    async asyncData({ store , params}) {
        let query = {
            Id: params.id
        }
        const orderType = await store.dispatch('getOrderDel', query);
        return {
            orderType
        }
    },
    methods: {
         async orderLpbby (row) {
            if (this.Identity.IsCertificate === 1) {
                let query =  {
                    Id: row.ID,
                    Remark: "" 
                }
                let msg = await takeOrders(query);
                if (msg) {
                    this.$Notice.success({
                        title: '订单通知',
                        desc: '您的需求以通知甲方，待甲方同意后您可获取甲方的联系方式！'
                    });
                }
                return false
            } else {
                this.authentication = true;
            }
        },
    }
    
}
</script>
<style lang="less" scoped>
    .order {
        width: 1200px;
        margin: 0 auto;
        font-size: 14px;
        &-left {
            margin-top: 20px;
            padding: 20px 30px 20px 20px;
            width: 910px;
            display: inline-block;
            background: #ffffff;
            &-title{
                border-bottom: 1px solid #efe7e7;
                &-box {
                    padding-bottom: 15px;
                    display: inline-block;
                    ul {
                        li {
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
                }
                &-btn {
                    float:right;
                    background: #ddd;
                    padding: 0 20px;
                    height: 34px;
                    display: inline-block;
                    line-height: 34px;
                    border: 0;
                    border-radius: 3px;
                    cursor: pointer;
                    color: #666;
                    font-size: 14px;
                }
                &-btns {
                    float:right;
                    background: #ff3c00;
                    padding: 0 20px;
                    height: 34px;
                    display: inline-block;
                    line-height: 34px;
                    border: 0;
                    border-radius: 3px;
                    cursor: pointer;
                    color: #fff;
                    font-size: 14px;
                }
            }
            &-info {
                color: #666;
                font-size: 14px;
                line-height: 33px;
                padding: 20px 0;
                border-bottom: 1px solid #efe7e7;
                ul {
                    li {
                        label {
                            font-weight: bold;
                        }
                        span {
                            color: #747474;
                        }
                    }
                }
            }
            &-remarks {
                padding-bottom: 80px;
                &-name {
                    margin: 10px 0;
                    color: #000000;
                }
                &-content{
                    line-height: 24px;
                    color: #666;
                }
            }
        }
    }
</style>