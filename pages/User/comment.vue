<template>
    <div>
        <Title/>
        <msgTab :TabList="TabList"/>
        <div>
            <template v-for="(items, index) in msgPList">
                <div :key="index">
                    <div class="msg-time">
                        {{items.CreateDate}}
                    </div>
                    <comCard :content="items" @delMsg="delMsg(items, index)"/>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import msgTab from './components/msgTab'
import comCard from './components/comCard'
import {setMessage, getWebMessage} from '../../service/clientAPI'
export default {
    components: {
        Title,
        msgTab,
        comCard
    },
    data () {
        return {
            msgPList: [],
            TabList: [
                {path: '/User/system', label: '系统消息'},
                {path: '/User/comment', label: '评论消息'},
                {path: '/User/customized', label: '定制消息'},
                {path: '/User/Invitation', label: '邀请消息'}
            ]
        }
    },
    created () {
        this.getMsgList()
    },
    methods: {
        async getMsgList () {
            let query = {
                msgType: '0'
            }
            let msg = await getWebMessage(query);
            if (msg) {
                this.msgPList = msg.pinglun.Msg;
            }
        },
        async delMsg (row, index) {
            let query = {
                OpType: 1,
                OpId: row.OpId
            }
            let msg = await setMessage(query);
            if (msg) {
                this.msgPList.splice(index, 1)
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .msg-time {
        width: 700px;
        text-align: center;
        margin: 20px 0;
    }
</style>