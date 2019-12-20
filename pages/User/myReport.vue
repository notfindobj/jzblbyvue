<template>
    <div>
        <Title title="我的举报" :bottomLine="false"/>
        <div>
            <publicTable :columns="columns1" :columnsData="data1"/>
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
                    cut: 'text',
                    title: '订单ID',
                    key: 'name'
                },
                {
                    cut: 'state',
                    title: '收入/支出',
                    key: 'state',
                    state: [{label: '收入', value: '1'}, {label: '支出', value: '2'}]
                },
                {
                    title: '金额',
                    key: 'address',
                    state: '1'
                },
                {
                    cut: 'time',
                    title: '时间',
                    key: 'date'
                },
                {
                    title: '状态',
                    key: 'address'
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
                    state: '2'
                }
            ]
        }
    }
}
</script>
<style lang="less" scoped>

</style>