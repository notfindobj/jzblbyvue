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
            <Page :total="total" />
        </div>
    </div>
</template>
<script>
import $moment from 'moment'
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
        },
        total: {
            type: Number,
            default: 10
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
                            return h('span', $moment(params.row[ele.key]).format(ele.format || 'YYYY-MM-DD'));
                        }
                        break;
                    case 'btn':
                        ele.render= (h, params) => {
                            let btn = []
                            ele.state.forEach(element => {
                                let row = () => {
                                    switch (element.cut) {
                                        case 'state':
                                            let stateBtn = undefined
                                            element.state.forEach(btns => {
                                                if (btns.value === params.row[element.key]) {
                                                    stateBtn =  h('Button', {
                                                        props: {
                                                            type: btns.style || 'dashed',
                                                            size: 'small'
                                                        },
                                                        on: {
                                                            click: () => {
                                                                this.$parent[element.events](params.row, btns.value, params.index, params.column)
                                                            }
                                                        }
                                                    }, btns.label) 
                                                }
                                            })
                                            return stateBtn
                                            break;
                                        default:
                                            return h('Button', {
                                                props: {
                                                    type: element.style || 'dashed',
                                                    size: 'small'
                                                },
                                                on: {
                                                    click: () => {
                                                        this.$parent[element.events](params.row, params.index, params.column)
                                                    }
                                                }
                                            }, element.text)
                                            break;
                                    }  
                                }
                                btn.push(row())
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