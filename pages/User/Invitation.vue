<template>
    <div>
        <Title title="邀请消息"/>
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
            <div class="viewMore" v-if="!(total >= pagination.total)" @click="getMsgList(total)">
                加载更多
            </div>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import msgTab from './components/msgTab'
import msgCard from './components/msgCard'
import {getMessage, handleInviteUser, setMessageList} from '../../service/clientAPI'
export default {
    scrollToTop: true,
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
            invitationList: [],
            total: 0,
            pagination: {}
        }
    },
    created () {
        this.setMessageList()
        this.getMsgList()
    },
    methods: {
        async setMessageList () {
            let query = {
               MessageType: 3
            }
            let msg = await setMessageList(query)
        },
        async getMsgList (page = 0) {
            let query = {
                msgType: '3',
                page: page+1
            }
            let msg = await getMessage(query);
            if (msg) {
                if (msg.invite.Msg.length > 0) {
                    this.invitationList.push(...msg.invite.Msg)
                }
                this.$store.dispatch('ACInviter', msg.invite);
                this.pagination = msg.invite.pagination
                this.total = msg.invite.pagination.page
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