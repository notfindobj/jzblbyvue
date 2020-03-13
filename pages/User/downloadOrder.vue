<template>
    <div>
        <Title title="我的订单" :bottomLine="false"/>
        <div class="tribalBill-search">
            <DatePicker type="daterange" placement="bottom-end" placeholder="时间搜索" style="width: 200px"></DatePicker>
            <Select v-model="model1" clearable style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button>提现</Button>
        </div>
        <div>
            <publicTable :columns="columns" :columnsData="orderList"/>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {getOrderList} from '../../service/clientAPI'
export default {
    components: {
        Title,
        publicTable
    },
    data () {
        return {
            cityList: [
                {
                    value: '0',
                    label: '待确认'
                },
                 {
                    value: '1',
                    label: '已接受'
                },
                 {
                    value: '2',
                    label: '已回绝'
                }
            ],
            model1: '',
            columns: [
                {
                    cut: 'text',
                    title: '项目名称',
                    key: 'OrderDesc'
                },
                {
                    cut: 'state',
                    title: '状态',
                    key: 'Status',
                    state: [{label: '待确认 ', value: 0}, {label: '已接受 ', value: 1}, {label: '已回绝', value: 2}]
                },
                {
                    cut: 'text',
                    title: '甲方姓名',
                    key: 'OrderUserName',
                },
                {
                    cut: 'text',
                    title: '甲方电话',
                    key: 'OrderPhone',
                },
                {
                    cut: 'text',
                    title: '乙方姓名',
                    key: 'UserName',
                },
                  {
                    cut: 'text',
                    title: '乙方电话',
                    key: 'UsePhone',
                }
            ],
            orderList: []
        }
    },
    created () {
        this.getBillData()
    },
    methods: {
        async getBillData () {
            let query = {
                Page: 1,
                Rows: 20
            }
            let msg = await getOrderList(query);
            if (msg) {
                this.orderList = msg.datalist;
            }
        }
    },
}
</script>
<style lang="less" scoped>
   .tribalBill {
       &-search {
           margin-bottom: 10px;
       }
   }
</style>