<template>
    <div>
        <Title title="我的积分"/>
        <div class="tribalBill">
           <div class="tribalBill-title">
                <div class="tribalBill-title-num">
                    <span>积分余额：</span>
                    <span>{{integral}}</span>
                </div>
                <!-- <Button>获取更多</Button> -->
           </div>
           <div class="tribalBill-search">
                <DatePicker type="daterange" :value="searchTime" @on-change="onChange" placement="bottom-end" placeholder="选择时间" style="width: 200px"></DatePicker>
                <Select v-model="model1" clearable style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button @click="getIntegral">查询</Button>
           </div>
           <div>
               <publicTable :columns="columns" :columnsData="integralData" :total="total" :pageSize="rows" @pageChange="getIntegral"/>
           </div>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {getIntegralList} from '../../service/clientAPI'
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
                    value: '1',
                    label: '消耗'
                },
                {
                    value: '0',
                    label: '获取'
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
                // {
                //     cut: 'text',
                //     title: '剩余积分',
                //     key: 'Score'
                // },
                {
                    cut: 'text',
                    title: '时间',
                    key: 'CreateDate'
                },
                {
                    cut: 'text',
                    title: '类型',
                    key: 'Memo',
                }
            ],
            searchTime: [],
            integralData: [],
            integral: 0,
            total: 1,
            rows: 15
        }
    },
    created () {
        this.getIntegral()
    },
    methods: {
        onChange (val) {
            this.searchTime = val
        },
        async getIntegral (val = 0) {
            let query = {
                startDate: this.searchTime[0],
                EndDate: this.searchTime[1],
                page: val,
                rows: this.rows
            }
            let msg = await getIntegralList(query);
            if (msg) {
                this.integralData = msg.Integrallist;
                this.total = msg.pagination.records,
                this.integral = msg.IntegralSum
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