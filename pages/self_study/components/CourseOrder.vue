<template>
    <div class="sys">
        <div class="sys-title">
            <span>
                课程订单
            </span>
        </div>
        <ul class="sys-status">
            <li>状态：</li>
            <li :class="query.status === -1 ?'active' :''" @click="getCourseOrderList(-1)">全部</li>
            <li :class="query.status === 0 ?'active' :''" @click="getCourseOrderList(0)">已完成</li>
            <li :class="query.status === 1 ?'active' :''" @click="getCourseOrderList(1)">待付款</li>
            <li :class="query.status === 2 ?'active' :''" @click="getCourseOrderList(2)">已取消</li>
        </ul>
        <div class="sys-content">
            <table class="sys-content-table" >
                <thead>
                    <tr align="center">
                        <th>时间</th>
                        <th>类型</th>
                        <th>交易</th>
                        <th>详情</th>
                        <th>状态</th>
                    </tr>
                </thead>
                <tbody>
                    <tr align="center" v-for="(items, index) in OrderList" :key="index">
                        <td>{{items.CreateDate}}</td>
                        <td>{{items.StudyType}}</td>
                        <td>￥{{items.Money}}元</td>
                        <td>{{items.Remark}}</td>
                        <td>{{setStatus(items.Status)}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="pages">
                <Page :total="page.records" />
            </div>
        </div>
    </div>
</template>
<script>
import {getCourseOrder} from '../../../service/course'
export default {
    data () {
        return {
            OrderList: [],
            page: {},
            query: {
                status: -1
            }
        }
    },
    created () {
        this.getCourseOrderList()
    },
    methods: {
        getCourseOrderList (type = -1) {
            let that= this
            that.query.status = type
            getCourseOrder(this.q).then(res => {
                that.OrderList = res.courseOrderList
                that.page = res.paginationData
            }).catch(err => {})
        },
        setStatus (status) {
            switch(status) {
                case 0:
                    return '待支付'
                    break;
                case 1:
                    return '已支付'
                    break;
                case 2:
                    return '支付失败'
                    break;
                default:
                    return '待支付'
            } 
        }
    }
}
</script>
<style lang="less" scoped>
.pages {
    text-align: center;
    margin: 30px 0;
}
.sys {
    font-size: 14px;
    &-title {
        border-bottom: 1px solid #f1efef;
        span {
            display: inline-block;
            font-size: 16px;
            line-height: 35px;
            color: #999;
            padding: 0px 13px;
            border-radius: 4px 4px 0px 0px;
            color: #fff;
            margin-bottom: -1px;
            background-color: #3bc66f;
        }
    }
    &-status {
        display: flex;
        margin: 15px 0;
        color: #333;
        li {
            margin-right: 15px;
            line-height: 24px;
            padding: 0 12px;
            cursor: pointer;
            &:first-child {
                padding: 0;
                cursor: text;
            }
        }
        li.active {
            background: #3bc66f;
            color: #fff;
        }
    }
    &-content{
        &-table {
            border-collapse: collapse;
            width: 100%;
            thead {
                font-weight: normal;
                line-height: 40px;
                background: #f2f2f2;
                min-width: 100px;
            }
            tbody {
                min-width: 100px;
                tr {
                    
                    border-bottom: dashed 1px #e8e8e8;
                    td {
                        line-height: 22px;
                        padding: 15px 10px;
                    }
                }
            }
        }
    }
    
}

</style>