<template>
    <div>
        <Title/>
        <div class="tribalBill">
           <div class="tribalBill-title">
                <div class="tribalBill-title-num">
                    <span>积分余额：</span>
                    <span>0.00元</span>
                </div>
                <Button>获取更多</Button>
           </div>
           <div class="tribalBill-search">
                <DatePicker type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
                <Select v-model="model1" clearable style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button>提现</Button>
           </div>
           <div>
               <publicTable :columns="columns" :columnsData="integralData"/>
           </div>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {getIntegralList} from '../../service/clientAPI'
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
                    cut: 'state',
                    title: '消耗/获取',
                    key: 'Type',
                    state: [{label: '获取', value: 0}, {label: '消耗', value: 1}]
                },
                {
                    cut: 'text',
                    title: '分数',
                    key: 'Score'
                },
                {
                    cut: 'text',
                    title: '剩余积分',
                    key: 'Score'
                },
                {
                    cut: 'text',
                    title: '时间',
                    key: 'CreateDate'
                },
                {
                    cut: 'state',
                    title: '类型',
                    key: 'ScoreType',
                    state: [{label: '注册', value: 1}, {label: '发布', value: 2}, {label: '资源下载', value: 3}, {label: '部落币转换', value: 4}, {label: '签到', value: 5}]
                },
                {
                    cut: 'btn',
                    title: '操作',
                    key: 'address',
                    state: [{text: '删除', events: 'addVal'}]
                }
            ],
            integralData: []
        }
    },
    created () {
        this.getIntegral()
    },
    methods: {
        async getIntegral () {
            let msg = await getIntegralList();
            if (msg) {
                this.integralData = msg.Integrallist;
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