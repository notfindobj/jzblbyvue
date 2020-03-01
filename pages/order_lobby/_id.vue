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
                <div class="order-left-title-btn">
                    <span>完成派单</span>
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
                        <span>{{orderType.CreateUserId}}</span>
                    </li>
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
export default {
    layout: 'main',
    async asyncData({ store , params}) {
        let query = {
            Id: params.id
        }
        const orderType = await store.dispatch('getOrderDel', query);
        console.log(query)
        return {
            orderType
        }
    },
    
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