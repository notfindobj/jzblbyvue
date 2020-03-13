<template>
    <div>
        <Title title="人民币收支详情"/>
        <div class="bill">
           <div class="bill-title">
                <div class="bill-title-num">
                    <span>账户余额：</span>
                    <span>{{rmbGoods.yue}}元</span>
                </div>
                <Button>提现</Button>
           </div>
           <div class="bill-search">
                <DatePicker type="daterange" :value="searchTime" @on-change="onChange" placement="bottom-end" placeholder="选择时间" style="width: 200px"></DatePicker>
                <Select v-model="model1" clearable style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button @click="getBillData">搜索</Button>
           </div>
           <div>
               <publicTable :columns="columns" :columnsData="rmbGoods.billlist" :total="total" @pageChange="getBillData"/>
           </div>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {getBillList} from '../../service/clientAPI'
export default {
    scrollToTop: true,
    components: {
        Title,
        publicTable
    },
    data () {
        return {
            cityList: [
                {
                    value: '0',
                    label: '收入'
                },
                {
                    value: '1',
                    label: '支出'
                }
            ],
            model1: '',
            columns: [
                {
                    cut: 'text',
                    title: '订单ID',
                    key: 'OrderId'
                },
                 {
                    cut: 'text',
                    title: '名称',
                    key: 'ItemName'
                },
                {
                    cut: 'text',
                    title: '来源',
                    key: 'Description'
                },
                {
                    cut: 'state',
                    title: '收入/支出',
                    key: 'BillStatus',
                    state: [{label: '收入', value: 0}, {label: '支出', value: 1}]
                },
                {
                    cut: 'text',
                    title: '金额',
                    key: 'Money',
                    width: 70,
                    state: '1'
                },
                {
                    cut: 'time',
                    title: '时间',
                    key: 'CreateDate',
                    format: 'YYYY-MM-DD'
                },
                // {
                //     cut: 'text',
                //     title: '状态',
                //     key: 'CreateDate',
                // },
                {
                    cut: 'btn',
                    title: '操作',
                    key: 'address',
                    state: [{text: '删除', events: 'delRmbRec'}]
                }
            ],
            rmbGoods: {},
            searchTime: [],
            total: 0
        }
    },
    created () {
        this.getBillData();
    },
    methods: {
        onChange (val) {
            this.searchTime = val
        },
        async getBillData (val = 1) {
            let query = {
                startDate: this.searchTime[0],
                EndDate: this.searchTime[1],
                page: val
            }
            let msg = await getBillList(query);
            if (msg) {
                this.rmbGoods = msg;
                this.total = msg.pagination.records
            }
        },
        async delRmbRec (row) {
            this.$Modal.confirm({
                title: '收支详情',
                content: '<p>确定删除收支详情？</p>',
                onOk: async () => {
                    // let query = {
                    //     Id: row.Id
                    // }
                    // let mgs = await delROSTypes(query);
                    // if (mgs) {
                    //     this.getRsList()
                    // }
                },
                onCancel: () => {
                    return false
                }
            });
        }
    },
}
</script>
<style lang="less" scoped>
   .bill {
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