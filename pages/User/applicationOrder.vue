<template>
    <div>
        <Title title="我收到的预约" :bottomLine="false"/>
        <div>
            <publicTable :columns="columns" :columnsData="orderList" :total="total" :pageSize="rows" @pageChange="getMsgList"/>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {setMessage, getMessage, getReceiveOrders} from '../../service/clientAPI'
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
                    title: '项目名称',
                    key: 'OrderDesc'
                },
                {
                    cut: 'text',
                    title: '申请人',
                    width: 100,
                    key: 'OrderUserName'
                },
                {
                    cut: 'time',
                    title: '申请时间',
                     width: 100,
                    key: 'CreateDate' 
                },
                {
                    cut: 'state',
                    title: '订单状态',
                    key: 'Status',
                    state: [{label: '待反馈 ', value: 0}, {label: '已同意', value: 1}, {label: '已回绝', value: 2}]
                },
                {
                    cut: 'btn',
                    title: '操作',
                    key: 'address',
                    width: 230,
                    state: [
                        {text: '查看申请人部落', events: 'viewTribe', style: 'info'},
                        {text: '查看需求详情', events: 'getUserInfo', style: 'info'}
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
        async getMsgList (val = 0) {
            let query = {
                OrderStatus: "0,2",
                Page: val,
                Rows: this.rows,
            }
            let msg = await getReceiveOrders(query);
            if (msg) {
                this.orderList = msg.datalist;
                this.total = msg.paginationData.records
            }
        },
        viewTribe (row) {
            let routeData = this.$router.resolve({ name: 'HeAndITribal-id', query: {id:row.OrderUserId} });
            analogJump(routeData.href);
        },
        getUserInfo(row) {
            let routeData = this.$router.resolve({name: 'order_lobby-id', params: {id: row.OrderId}})
            analogJump(routeData.href);
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