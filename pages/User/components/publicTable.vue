<template>
    <div>
        <Table size="small"
        border 
        :data="columnsData" 
        :columns="setColumns(columns)"
        @on-select="onselect"
        @on-select-all="onselectall"
        @on-selection-change="onselectionchange"
        ></Table>
        <div class="Page">
            <Page :total="100" />
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
    methods: {
        setColumns (col = []) {
            col.forEach((ele, index) => {
                switch (ele.cut) {
                    case 'text':
                        ele.render= (h, params) => {
                            return h('span', params.row[ele.key]);
                        }
                        break;
                    case 'keys':
                        ele.render= (h, params) => {
                            let kTxt = ''
                            let keys = ele.key.split(',');
                            for(let i=0; i< keys.length; i++) {
                                kTxt += params.row[keys[i]]
                            }
                            return h('span', kTxt);
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
                                                this.$parent[element.events](params.row, params.index, params.column)
                                            }
                                        }
                                    }, element.text)
                                )
                            })
                            return h('div',{
                                class: "btn-position"
                            }, [...btn]);
                        }
                        break;
                    default:
                        break;
                }
            })
            return col
        },
        /**
         * 选中某一项触发,返回值为 selection 和 row，分别为已选项和刚选择的项。
         */
        onselect (selection, row) {
            this.$emit('on-select', selection, row)
        },
        /**
         * 点击全选时触发，返回值为 selection，已选项
         */
        onselectall (selection) {
            this.$emit('on-select-all', selection)
        },
        /**
         * 只要选中项发生变化时就会触发，返回值为 selection，已选项。
         */
        onselectionchange (selection) {
            this.$emit('on-selection-change', selection)
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
    /deep/.btn-position {
        display: flex;
        justify-content: space-between;
    }
</style>