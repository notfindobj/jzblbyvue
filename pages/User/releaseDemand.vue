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
import {getUserOrder, delOrder} from '../../service/clientAPI'
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
                    cut: 'keys',
                    title: "地点",
                    key: 'ProvinceName,CityName',
                },
                {
                    cut: 'text',
                    title: '类型',
                    key: 'TypeName',
                    width: 80
                },
                {
                    cut: 'text',
                    title: '规模(m²)',
                    key: 'Area',
                    width: 85
                },
                 {
                    cut: 'text',
                    title: '设计预算',
                    key: 'BudgetName',
                    width: 110
                },
                {
                    cut: 'time',
                    title: '申请时间',
                    key: 'CreateDate',
                    width: 105
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
                        {text: '删除订单', events: 'remOrder', style: 'error'}, 
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
        remOrder (row) {
            this.$Modal.confirm({
                title: '删除订单',
                content: '<p>确定删除订单!</p>',
                onOk: async () => {
                    let msg = await delOrder({Ids: row.ID});
                    if (msg) { 
                        this.$Message.success("订单已删除！")
                        this.getMsgList()
                    }
                },
                onCancel: () => {
                    return false
                }
            });
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