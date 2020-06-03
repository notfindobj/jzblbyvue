<template>
    <div>
        <Title title="我的签单项目" :bottomLine="false"/>
        <div>
            <publicTable :columns="columns" :columnsData="orderList"  :total="total" :pageSize="rows" @pageChange="getMsgList"/>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {setMessage, getMessage, getinishedOrders} from '../../service/clientAPI'
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
                    title: '联系人',
                    key: 'OrderUserName',
                    width: 100
                },
                {
                    cut: 'text',
                    title: '联系号码',
                    key: 'OrderPhone',
                    width: 115
                },
                {
                    cut: 'time',
                    title: '申请时间',
                    key: 'CreateDate' ,
                    width: 110
                },
                {
                    cut: 'text',
                    title: '备注',
                    key: 'Remark' ,
                    width: 110
                },
                {
                    cut: 'btn',
                    title: '操作',
                    key: 'address',
                    width: 240,
                    state: [
                        {text: '查看部落', events: 'viewTribe', style: 'info'}, 
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
            let msg = await getinishedOrders(query);
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
            let routeData = this.$router.resolve({ name: 'order_lobby-id', params: {id:row.OrderId} });
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