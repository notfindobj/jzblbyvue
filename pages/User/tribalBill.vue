<template>
    <div>
        <Title/>
        <div class="tribalBill">
           <div class="tribalBill-title">
                <div class="tribalBill-title-num">
                    <span>部落币余额：</span>
                    <span>0.00元</span>
                </div>
                <Button>提现</Button>
           </div>
           <div class="tribalBill-search">
                <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
                <Select v-model="model1" clearable style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button>提现</Button>
           </div>
           <div>
               <publicTable :columns="columns" :columnsData="tribalCoinData"/>
           </div>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {getTribalCoins} from '../../service/clientAPI'
export default {
    components: {
        Title,
        publicTable
    },
    data () {
        return {
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                }
            ],
            model1: '',
            columns: [
                {
                    cut: 'text',
                    title: '订单ID',
                    key: 'ID'
                },
                {
                    cut: 'state',
                    title: '渠道',
                    key: 'ScoreType',
                    state: [{label: '人民币充值 ', value: 1}, {label: '资源下载 ', value: 2}, {label: '提现 ', value: 3}]
                },
                {
                    cut: 'state',
                    title: '收入/支出',
                    key: 'Type',
                    state: [{label: '获取', value: 0}, {label: '消耗', value: 1}]
                },
                {
                    cut: 'text',
                    title: '金额',
                    key: 'Score',
                },
                {
                    cut: 'time',
                    title: '时间',
                    key: 'CreateDate'
                },
                {
                    title: '备注',
                    key: 'Memo'
                },
                {
                    cut: 'btn',
                    title: '操作',
                    key: 'address',
                    state: [{text: '删除', events: 'addVal'}]
                }
            ],
            tribalCoinData: []
        }
    },
    created () {
        this.getTribalCoinsList()
    },
    methods: {
        async getTribalCoinsList () {
            let msg = await getTribalCoins()
            if (msg) {
                this.tribalCoinData = msg
            }
        }
    },
}
</script>
<style lang="less" scoped>
   .tribalBill {
       &-title {
           margin: 10px 0;
           &-num {
                display: inline-block;
                font-size: 14px;
                margin-right: 30px;
           }
       }
       &-search {
           margin-bottom: 10px;
       }
   }
</style>