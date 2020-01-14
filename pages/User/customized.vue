<template>
    <div>
        <Title/>
        <msgTab :TabList="TabList"/>
        <div>
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
        </div>
        <Custom v-if="isCustom" :customId="customId" @dataDetailsMaskClose="dataDetailsMaskClose"/>
    </div>
</template>
<script>
import Title from './components/title'
import msgTab from './components/msgTab'
import msgCard from './components/msgCard'
import Custom from './components/custom'
import {setMessage, getWebMessage} from '../../service/clientAPI'
import {analogJump} from '../../plugins/untils/public'
export default {
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
            isCustom: false
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
                this.$store.dispatch('ACComment', msg.dingzhi.MsgCount);
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
</style>