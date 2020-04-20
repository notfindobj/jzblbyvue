<template>
    <div>
        <Title title="定制消息"/>
        <msgTab :TabList="TabList"/>
        <div>
            <span v-if="!dzList || dzList.length <= 0" style=" color: #a5a5a5;
            display: inline-block;
            margin: 10px;">暂无消息</span>
            <template v-for="(items, index) in dzList">
                <div :key="index">
                    <div class="msg-time">
                        {{items.CreateDate}}
                    </div>
                    <msgCard :content="items" @clickCom="clickCom">
                        <div slot="header" class="custom">
                            <div>
                            {{items.MsgTitle}}
                            </div>
                            <Button type="primary" @click="viewCus(items)">查看定制详情</Button>
                        </div>
                    </msgCard>
                </div>
            </template>
            <div class="viewMore" v-if="!(total >= pagination.total)" @click="getMsgList(total)">
                加载更多
            </div>
        </div>
        <Custom v-if="isCustom" :customId="customId" @dataDetailsMaskClose="dataDetailsMaskClose"/>
    </div>
</template>
<script>
import Title from './components/title'
import msgTab from './components/msgTab'
import msgCard from './components/msgCard'
import Custom from './components/custom'
import {setMessage, getMessage} from '../../service/clientAPI'
import {analogJump} from '../../plugins/untils/public'
export default {
    scrollToTop: true,
    components: {
        Title,
        msgTab,
        msgCard,
        Custom
    },
    data () {
        return {
            TabList: [
                {path: '/User/system', label: '系统消息'},
                {path: '/User/comment', label: '评论消息'},
                {path: '/User/customized', label: '定制消息'},
                {path: '/User/Invitation', label: '邀请消息'}
            ],
            dzList: [],
            customId: {},
            isCustom: false,
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
               MessageType: 1
            }
            let msg = await setMessage(query)
        },
        async getMsgList (page = 0) {
            let query = {
                msgType: '1',
                page: page+1
            }
            let msg = await getMessage(query);
            if (msg) {
                if (msg.dingzhi.Msg.length > 0) {
                    this.dzList.push(...msg.dingzhi.Msg)
                }
                this.$store.dispatch('ACCusData', msg.dingzhi);
                this.pagination = msg.dingzhi.pagination
                this.total = msg.dingzhi.pagination.page
            }
        },
        clickCom (row) {
            let routeData = this.$router.resolve({
                name: 'DataDetails',
                query: {id: row.DataIds.itemId, layout: true }
            })
            analogJump(routeData.href);
        },
        viewCus (row) {
            this.customId = row.DataIds;
            this.isCustom = true
        },
        dataDetailsMaskClose () {
            this.isCustom = false;
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
        padding-right: 6px;
    }
    .msg-time {
        width: 550px;
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