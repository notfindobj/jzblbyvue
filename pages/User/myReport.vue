<template>
    <div>
        <Title title="我的举报" :bottomLine="false"/>
        <div>
            <publicTable :columns="columns" :columnsData="rsList"/>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {getROSTypes, delROSTypes} from '../../service/clientAPI'
export default {
    components: {
        Title,
        publicTable
    },
    data () {
        return {
            columns: [
                {
                    cut: 'text',
                    title: '项目',
                    key: 'ItemName'
                },
                {
                    cut: 'state',
                    title: '项目类型',
                    key: 'TalkType',
                    state: [{label: '图文 ', value: 1}, {label: '视频', value: 2}, {label: '问答', value: 3}, {label: '项目', value: 4}, {label: '文章', value: 5}, {label: '小视频', value: 6}]
                },
                {
                    title: '举报内容',
                    key: 'ReportOrShieldingC',
                    state: '1'
                },
                {
                    cut: 'text',
                    title: '举报时间',
                    key: 'CreateDate'
                },
                {
                    title: '处理结果',
                    key: 'address'
                },
                {
                    cut: 'btn',
                    title: '操作',
                    key: 'address',
                    state: [{text: '删除', events: 'delReport'}]
                }
            ],
            rsList: []
        }
    },
    created () {
        this.getRsList()
    },
    methods: {
        async getRsList () {
            let msg = await getROSTypes();
            if (msg) {
                this.rsList = msg;
            }
        },
        async delReport (row) {
            this.$Modal.confirm({
                title: '删除举报',
                content: '<p>确定删除举报内容？</p>',
                onOk: async () => {
                    let query = {
                        Id: row.Id
                    }
                    let mgs = await delROSTypes(query);
                    if (mgs) {
                        this.getRsList()
                    }
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

</style>