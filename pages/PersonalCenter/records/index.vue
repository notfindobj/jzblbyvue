<template>
    <Table border :columns="columns6" :data="data5"></Table>
</template>
<script>
    export default {
        data () {
            return {
                columns6: [
                    {
                        title: '时间',
                        key: 'date'
                    },
                    {
                        title: '订单号',
                        key: 'date'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '对方',
                        key: 'name'
                    },
                    {
                        title: '金额',
                        key: 'age',
                        filters: [
                            {
                                label: 'Greater than 25',
                                value: 1
                            },
                            {
                                label: 'Less than 25',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.age > 25;
                            } else if (value === 2) {
                                return row.age < 25;
                            }
                        }
                    },
                    {
                        title: '状态',
                        key: 'address',
                        filters: [
                            {
                                label: 'New York',
                                value: 'New York'
                            },
                            {
                                label: 'London',
                                value: 'London'
                            },
                            {
                                label: 'Sydney',
                                value: 'Sydney'
                            }
                        ],
                        filterMethod (value, row) {
                            return row.address.indexOf(value) > -1;
                        }
                    },
                    {
                        title: '备注',
                        key: 'name'
                    }
                ],
                data5: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa',
                        date: '2016-10-04'
                    }
                ],
            }
        }
    }
</script>