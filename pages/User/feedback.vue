<template>
    <div>
        <Title title="意见反馈" :bottomLine="false"/>
        <div>
            <publicTable :columns="columns" :columnsData="fbData"/>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {getFeedbackList, delFeedbackList} from '../../service/clientAPI'
export default {
    scrollToTop: true,
    components: {
        Title,
        publicTable
    },
    data () {
        return {
            columns: [
                {
                    title: '标题',
                    key: 'Title'
                },
                {
                    cut: 'state',
                    title: '反馈类型',
                    key: 'Type',
                    state: [{value: 0,label: "网站bug"},{value: 1,label: "意见"},{value: 2,label: "建议"}]
                },
                {
                    title: '反馈内容',
                    key: 'Contents',
                    state: '1'
                },
                {
                    cut: 'state',
                    title: '反馈状态',
                    key: 'State',
                    state: [{value: 0,label: "未处理"},{value: 1,label: "已处理"}]
                },
                {
                    cut: 'btn',
                    title: '操作',
                    key: 'address',
                    state: [{text: '删除', events: 'delFeedback'}]
                }
            ],
            cityList: [
                
            ],
            fbData: []
        }
    },
    created () {
        this.getfbList()
    },
    methods: {
        async getfbList () {
            let msg = await getFeedbackList();
            if (msg) {
                this.fbData = msg;
            }
        },
        // 删除反馈
        async delFeedback (row) {
            this.$Modal.confirm({
                title: '删除反馈',
                content: '<p>确定删除反馈内容？</p>',
                onOk: async () => {
                    let query = {
                        FeedbackID: row.FeedbackID
                    }
                    let mgs = await delFeedbackList(query);
                    if (mgs) {
                        this.getfbList()
                    }
                },
                onCancel: () => {
                    return false
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>

</style>