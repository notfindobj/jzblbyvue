<template>
    <div>
        <Title title="评论消息"/>
        <msgTab :TabList="TabList"/>
        <div>
            <template v-for="(items, index) in msgPList">
                <div :key="index">
                    <div class="msg-time">
                        {{items.CreateDate}}
                    </div>
                    <comCard :content="items" @clickCom="clickCom" @delMsg="delMsg(items, index)"/>
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
import comCard from './components/comCard'
import {setMessage, getMessage} from '../../service/clientAPI'
import {analogJump} from '../../plugins/untils/public'
import { mapState, mapGetters } from 'vuex'
export default {
    scrollToTop: true,
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
            ],
            total: 0,
            pagination: {}
        }
    },
    computed: {
        ...mapGetters(['getComment'])
    },
    created () {
        this.setMessageList()
        this.getMsgList()
    },
    methods: {
        async setMessageList () {
            let query = {
               MessageType: 0
            }
            let msg = await setMessage(query)
        },
        async getMsgList (page = 0) {
            let query = {
                msgType: '0',
                page: page+1
            }
            let msg = await getMessage(query);
            if (msg ) {
                if (msg.pinglun.Msg.length > 0) {
                    this.msgPList.push(...msg.pinglun.Msg)
                }
                this.$store.dispatch('ACComment', msg.pinglun);
                this.pagination = msg.pinglun.pagination
                this.total = msg.pinglun.pagination.page
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
        },
        async clickCom (item) {
            let routeData = {}
            let showLayout = true;
            switch (item.ItemType) {
                case 0:
                    let showLayout = true 
                    if (item.TypeName === '文本' || item.TypeName === '建筑规范') {
                        showLayout = false
                    } else {
                        showLayout = true
                    }
                    routeData = this.$router.resolve({
                            name: 'DataDetails',
                            query: {id: item.ItemId, layout: showLayout }
                        })
                    break;
                case 1:
                    routeData = this.$router.resolve({
                        name: 'pictureDetails-id',
                        params: {id: item.ItemId }
                    })
                    break;
                case 2:
                    routeData = this.$router.resolve({
                        name: 'videoDetails-id',
                        params: {id: item.ItemId }
                    })
                    break;
               
                case 3:
                    routeData = this.$router.resolve({
                        name: 'QuestionsAndAnswers-id',
                        params: {id: item.ItemId }
                    })
                    break;
                case 4:
                    if (item.TypeName === '文本' || item.TypeName === '建筑规范') {
                        showLayout = false
                    } else {
                        showLayout = true
                    }
                    routeData = this.$router.resolve({
                        name: 'DataDetails',
                        query: {id: item.ItemId, layout: showLayout }
                    })
                    break;
                case 5:
                    routeData = this.$router.resolve({
                        name: 'pictureDetails-id',
                        params: {id: item.ItemId }
                    })
                    break;
            }
            analogJump(routeData.href);
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
    .viewMore {
        width: 700px;
        text-align: center;
        margin: 20px 0;
        font-size: 15px;
        color: #ff3c00;
        cursor: pointer;
    }
</style>