<template>
    <div>
        <Title title="我的签单项目" :bottomLine="false"/>
        <div>
            <publicTable :columns="columns" :columnsData="orderList"/>
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
                    key: 'OrderUserName'
                },
                {
                    cut: 'text',
                    title: '联系号码',
                    key: 'OrderPhone'
                },
                {
                    cut: 'time',
                    title: '申请时间',
                    key: 'CreateDate' 
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
            orderList: []
        }
    },
    created () {
        this.getMsgList()
    },
    methods: {
        async getMsgList () {
            let query = {
                Page: 1,
                Rows: 20,
            }
            let msg = await getinishedOrders(query);
            if (msg) {
                this.orderList = msg.datalist;
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