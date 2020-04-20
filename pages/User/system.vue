<template>
    <div id="system">
        <Title title="消息中心"/>
        <msgTab :TabList="TabList"/>
        <div>
            <span style=" color: #a5a5a5;
            display: inline-block;
            margin: 10px;" v-if="!xitong || xitong.length <= 0" >暂无消息</span>
              <template v-for="(items, index) in xitong">
                <div :key="index" >
                    <msgCard :content="items"></msgCard>
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
import msgCard from './components/sys'
import {getMessage, setMessage} from '../../service/clientAPI'
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
            xitong: [],
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
               MessageType: 2
            }
            let msg = await setMessage(query)
        },
        async getMsgList (page = 0) {
            let query = {
                msgType: '2',
                page: page + 1
            }
            let msg = await getMessage(query);
            if (msg) {
                if (msg.xitong.Msg.length > 0) {
                    this.xitong.push(...msg.xitong.Msg)
                }
                this.$store.dispatch('ACSystem', msg.xitong);
                this.pagination = msg.xitong.pagination
                this.total = msg.xitong.pagination.page
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