<template>
    <div>
        <Title/>
        <msgTab :TabList="TabList"/>
        <div>
            <template v-for="(items, index) in dzList">
                <msgCard :key="index" :content="items">
                    <div slot="header" class="custom">
                        <div>
                           {{items.MsgTitle}}
                        </div>
                        <Button type="primary">查看</Button>
                    </div>
                </msgCard>
            </template>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import msgTab from './components/msgTab'
import msgCard from './components/msgCard'
import {setMessage, getWebMessage} from '../../service/clientAPI'
export default {
    components: {
        Title,
        msgTab,
        msgCard
    },
    data () {
        return {
            TabList: [
                {path: '/User/system', label: '系统消息'},
                {path: '/User/comment', label: '评论消息'},
                {path: '/User/customized', label: '定制消息'},
                {path: '/User/Invitation', label: '邀请消息'}
            ],
            dzList: []
        }
    },
    created () {
        this.getMsgList()
    },
    methods: {
        async getMsgList () {
            let query = {
                msgType: '1'
            }
            let msg = await getWebMessage(query);
            if (msg) {
                this.dzList = msg.dingzhi.Msg;
            }
        },
    },
}
</script>
<style lang="less" scoped>
    .custom {
        display: flex;
        line-height: 30px;
        justify-content: space-between;
        width: 100%;
    }
</style>