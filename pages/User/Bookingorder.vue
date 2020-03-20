<template>
    <div>
        <Title title="我收到的预约" :bottomLine="false"/>
        <div>
            <publicTable :columns="columns" :columnsData="orderList"  :total="total" :pageSize="rows" @pageChange="getMsgList"/>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {getOrderList, OrderReceiving } from '../../service/clientAPI'
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
                    key: 'UserName',
                    width: 100
                },
                {
                    cut: 'time',
                    title: '申请时间',
                    key: 'CreateDate',
                    width: 100,
                },
                {
                    cut: 'btn',
                    title: '操作',
                    key: 'address',
                    width: 240,
                    state: [
                        {text: '查看申请人部落', events: 'viewTribe', style: 'info'}, 
                        {text: '删除', events: 'remove', style: 'error'}, 
                        {cut: 'state', key: 'Status', events: 'setDefault', state: [{label: '合作', value: 0, style: 'info'}, {label: '已同意', value: 1, style: 'success'}, {label: '已回绝', value: 2, style: 'text'}]}
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
        async getMsgList (val = 1) {
            let query = {
                OrderStatus: 0,
                Page: val,
                Rows: this.rows,
            }
            let msg = await getOrderList(query);
            if (msg) {
                this.orderList = msg.datalist;
                this.total = msg.paginationData.records
            }
        },
        viewTribe (row) {
            let routeData = this.$router.resolve({ name: 'HeAndITribal-id', query: {id:row.UserId} });
            analogJump(routeData.href);
        },
        async setDefault (row) {
            let query = {
                Id: row.ID
            }
            let msg = await OrderReceiving(query);
            if (msg) {
                this.$Notice.success({
                    title: '订单提示',
                    desc: `请在我的签单项目中查看 联系人信息`
                });
            }
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