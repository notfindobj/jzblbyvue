<template>
    <div>
        <Title/>
        <msgTab :TabList="TabList"/>
        <div>
            <template v-for="(items, index) in invitationList">
                <msgCard :key="index" :content="items">
                    <div slot="footer" class="invitation-foot">
                        <Button type="primary">拒绝</Button>
                        <Button type="primary">立即加入</Button>
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
            invitationList: []
        }
    },
    created () {
        this.getMsgList()
    },
    methods: {
        async getMsgList () {
            let query = {
                msgType: '3'
            }
            let msg = await getWebMessage(query);
            if (msg) {
                this.invitationList = msg.invite.Msg;
            }
        },
    },
}
</script>
<style lang="less" scoped>
    .invitation-foot {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
    }
</style>