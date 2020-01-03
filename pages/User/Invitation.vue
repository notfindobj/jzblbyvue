<template>
    <div>
        <Title/>
        <msgTab :TabList="TabList"/>
        <div>
            <template v-for="(items, index) in invitationList">
                <div :key="index" >
                    <div class="msg-time">
                        {{items.CreateDate}}
                    </div>
                    <msgCard :content="items">
                        <div slot="footer" class="invitation-foot">
                            <Button :disabled="items.InviteStatus !== 0"  type="primary" @click="handleInvite(items, 2)">拒绝</Button>
                            <Button :disabled="items.InviteStatus !== 0" type="primary" @click="handleInvite(items, 1)">立即加入</Button>
                        </div>
                    </msgCard>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import msgTab from './components/msgTab'
import msgCard from './components/msgCard'
import {getWebMessage, handleInviteUser} from '../../service/clientAPI'
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
        async handleInvite (row, dealtype) {
            let queryData = {
                sendId: row.DataIds.sendId,
                dealtype: dealtype
            }
            let msg = await handleInviteUser(queryData)
            if (msg) {
                if (dealtype === 1) {
                    this.$Notice.success({
                        title: '',
                        desc: `恭喜你已加入${row.MsgTitle}!`
                    });
                }
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
    .msg-time {
        width: 550px;
        text-align: center;
        margin: 20px 0;
    }
</style>