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
               <publicTable :columns="columns1" :columnsData="data1"/>
           </div>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
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
            columns1: [
                {
                    cut: 'state',
                    title: '消耗/获取',
                    key: 'state',
                    state: [{label: '消耗', value: '1'}, {label: '获取', value: '2'}, {label: '获取', value: '3'}]
                },
                {
                    title: '分数',
                    key: 'address',
                    state: '1'
                },
                {
                    cut: 'time',
                    title: '时间',
                    key: 'date'
                },
                {
                    cut: 'state',
                    title: '类型',
                    key: 'state',
                    state: [{label: '签到', value: '1'}, {label: '评论', value: '2'}, {label: '发表文章', value: '3'}]
                },
                {
                    cut: 'btn',
                    title: '操作',
                    key: 'address',
                    state: [{text: '删除', events: 'addVal'}]
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: '0.00',
                    date: '2016-10-03',
                    state: '1'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01',
                    state: '1'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02',
                    state: '2'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04',
                    state: '3'
                }
            ]
        }
    }
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