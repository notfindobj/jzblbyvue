<template>
    <div>
        <Title title="我发布的需求订单" :bottomLine="false"/>
        <div>
            <publicTable :columns="columns" :columnsData="orderList" :total="total" :pageSize="rows" @pageChange="getMsgList"/>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {getUserOrder} from '../../service/clientAPI'
import {analogJump} from '../../plugins/untils/public'
export default {
    scrollToTop: true,
    components: {
        Title,
        publicTable
    },
    data () {
        return {
            columns: [
                {
                    cut: 'text',
                    title: "地点",
                    key: 'CityName'
                },
                {
                    cut: 'text',
                    title: '类型',
                    key: 'TypeName'
                },
                {
                    cut: 'text',
                    title: '规模(m²)',
                    key: 'Area'
                },
                 {
                    cut: 'text',
                    title: '设计预算',
                    key: 'BudgetName'
                },
                {
                    cut: 'time',
                    title: '申请时间',
                    key: 'CreateDate' 
                },
                {
                    cut: 'text',
                    title: '备注',
                    key: 'Remark' 
                },
                {
                    cut: 'btn',
                    title: '操作',
                    key: 'address',
                    state: [
                        {text: '查看详情', events: 'viewOrder', style: 'info'}, 
                    ]
                }
            ],
            orderList: [],
            total: 0,
            rows: 15
        }
    },
    created () {
        this.getMsgList()
    },
    methods: {
        async getMsgList (val =1) {
            let query = {
                Page: val,
                Rows: this.rows,
            }
            let msg = await getUserOrder(query);
            if (msg) {
                this.orderList = msg.datalist;
                this.total = msg.paginationData.records
            }
        },
        viewTribe (row) {
            let routeData = this.$router.resolve({ name: 'HeAndITribal-id', query: {id:row.OrderUserId} });
            analogJump(routeData.href);
        },
        viewOrder (row) {
            let routeData = this.$router.resolve({ name: 'order_lobby-id', params: {id:row.ID} });
            analogJump(routeData.href);
        },
        getUserInfo(row) {
            this.$router.push({name: 'order_lobby-id', params: {id: row.orderId}})
        },
       
    }
}
</script>
<style lang="less" scoped>
    .custom {
        display: flex;
        line-height: 30px;
        justify-content: space-between;
        width: 100%;
        padding-right: 6px;
    }
    .msg-time {
        width: 550px;
        text-align: center;
        margin: 20px 0;
    }
</style>