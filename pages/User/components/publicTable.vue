<template>
    <div>
        <Table size="small" :data="columnsData" :columns="setColumns(columns)" border ></Table>
        <div class="Page">
            <Page size="small" :total="100" />
        </div>
    </div>
</template>
<script>
export default {
    props: {
        columns: {
            type: Array,
            default: function () {
                return []
            }
        },
        columnsData: {
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data () {
        return {
            // columns1: [
            //     {
            //         cut: 'text',
            //         title: '订单ID',
            //         key: 'name'
            //     },
            //     {
            //         cut: 'state',
            //         title: '收入/支出',
            //         key: 'state',
            //         state: [{label: '收入', value: '1'}, {label: '支出', value: '2'}]
            //     },
            //     {
            //         title: '金额',
            //         key: 'address',
            //         state: '1'
            //     },
            //     {
            //         cut: 'time',
            //         title: '时间',
            //         key: 'address'
            //     },
            //     {
            //         title: '状态',
            //         key: 'address'
            //     },
            //     {
            //         cut: 'btn',
            //         title: '操作',
            //         key: 'address',
            //         state: [{text: '删除', events: 'addVal'}]
            //     }
            // ]
        }
    },
    methods: {
        setColumns (col = []) {
            col.forEach((ele, index) => {
                switch (ele.cut) {
                    case 'text':
                        ele.render= (h, params) => {
                            return h('span', params.row[ele.key]);
                        }
                        break;
                    case 'state':
                        ele.render= (h, params) => {
                            let row = {}
                            ele.state.forEach((element, index) => {
                                if (element.value === params.row[ele.key]) {
                                    row = element
                                }
                            })
                            return h('span', row.label);
                        }
                        break;
                    case 'time':
                        ele.render= (h, params) => {
                            return h('span', params.row[ele.key]);
                        }
                        break;
                    case 'btn':
                        ele.render= (h, params) => {
                            let btn = []
                            ele.state.forEach((element, index) => {
                                btn.push(
                                        h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this[element.events](params.row, params.index, params.column)
                                            }
                                        }
                                    }, element.text)
                                )
                            })
                            return h('div', [...btn]);
                        }
                        break;
                    default:
                        break;
                }
            })
            return col
        },
        addVal (row) {
            console.log(row)
        }
    },
}
</script>
<style lang="less" scoped>
    .Page {
        text-align: center;
        margin-top: 10px;
    }
</style>