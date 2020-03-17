<template>
    <div>
        <Title title="部落币"/>
        <div class="tribalBill">
           <div class="tribalBill-title">
                <div class="tribalBill-title-num">
                    <span>部落币余额：</span>
                    <span>{{integral}}</span>
                </div>
                <Button @click="modal3 = true">提现</Button>
                <span class="tishi">10部落币= 1元  发起提现申请后资金会在1-3个工作日内到账</span>
           </div>
           <div class="tribalBill-search">
                <DatePicker type="daterange" :value="searchTime" @on-change="onChange" placement="bottom-end" placeholder="选择时间" style="width: 200px"></DatePicker>
                <Select v-model="model1" clearable style="width:200px">
                    <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button @click="getTribalCoinsList">搜索</Button>
           </div>
           <div>
               <publicTable :columns="columns" :columnsData="tribalCoinData" :total="total" :pageSize="rows" @pageChange="getTribalCoinsList"/>
           </div>
        </div>
        <!-- 部落币提现 -->
        <Modal v-model="modal3" width="360" :mask-closable="false">
            <p slot="header" style="text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>部落币提现</span>
            </p>
            <div style="header-content">
                <h3 class="header-content-num">部落币余额： {{integral}}</h3>
                <p class="header-content-sub">部落币提现需要先转换成人民币，转换率（10/1）</p>
                <Input v-model="blb" @on-keyup="keyupNum(blb)" :maxlength="integral" number>
                    <span slot="append" class="sub-blb" style="width:50px;">{{blb / 10}}元</span>
                </Input>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="getWithdrawal">确认提现</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {getTribalCoins, withdrawal} from '../../service/clientAPI'
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
                    state: [{text: '删除', events: 'delVal'}]
                }
            ],
            searchTime: [],
            tribalCoinData: [],
            modal3: false,
            account: {},
            integral: 0,
            blb: 0,
            total: 0,
            rows: 15
        }
    },
    created () {
        this.getTribalCoinsList()
    },
    methods: {
        delVal (row) {
            console.log(row)
        },
        onChange (val) {
            this.searchTime = val
        },
        async getTribalCoinsList (val =1) {
            let query = {
                startDate: this.searchTime[0],
                EndDate: this.searchTime[1],
                page: val,
                rows: this.rows
            }
            let msg = await getTribalCoins(query)
            if (msg) {
                this.tribalCoinData = msg.List,
                this.total = msg.pagination.records,
                this.integral = msg.Sum
            }
        },
        // 提现
        keyupNum (e) {
            if (e==='' || parseInt(e) == 0 ) {
                this.blb = 0
                return false
            }
            if (parseInt(e) > this.integral) {
                this.$Message.info('超出部落币余额了哦~');
                return false
            }
            this.blb = parseInt(e);
        },
        async getWithdrawal () {
            let query = {
                "Money": this.blb,
                "OpType": 1,
                "WithdrawalType": 2
            }
            let msg = await withdrawal(query)
            if (msg) {

            }
        },
    },
}
</script>
<style lang="less" scoped>
    .tishi {
        color: #b7b7b7;
        position: relative;
        top: 7px;
        font-size: 10px;
    }
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