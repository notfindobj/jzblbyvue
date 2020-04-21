<template>
    <div>
        <div class="customized">
            <div class="customized-title">
               <div class="customized-title-left">
                    <span>有 <span class="MsgCount-color">{{inviter.MsgCount}}</span> 条服务消息未读</span>
                    <span class="MsgCount-all" v-if="!isEnt"></span>
                    <span class="MsgCount-all" v-if="isEnt"  @click="setMessage(inviter.Msg, 2)">全部设为已读</span>
               </div>
               <div>
                   <span class="MsgCount-all-del" v-if="!isEnt">忽略全部</span>
                   <span class="MsgCount-all-del" v-if="isEnt" @click="setMessage(inviter.Msg, 1)">全部删除</span>
               </div>
            </div>
            <ul class="customized-content">
                <li v-for="(item, index) in inviter.Msg" :key="index">
                   <div class="customized-content-title">
                       <div>
                           <span :class="item.ReadStatu === 1 ? 'customized-yuan customized-yuan-color': 'customized-yuan'"></span>
                           <span class="MsgTitle">{{item.MsgTitle}}</span>
                           <span>{{item.CreateDate}}</span>
                       </div>
                       <div class="customized-content-title-right" v-if="!isEnt">
                           <span class="customized-content-title-right-del" @click="handleInvite(item, 2)">忽略</span>
                           <span class="customized-content-title-right-agree" v-if="item.ReadStatu === 1" @click="handleInvite(item, 1)">同意</span>
                           <span v-else>已处理</span>
                       </div>
                       <div class="customized-content-title-right" v-if="isEnt">
                           <span class="customized-content-title-right-del" @click="setMessage(item, 1)">删除</span>
                           <span class="customized-content-title-right-agree" v-if="item.ReadStatu === 1" @click="setMessage(item, 2)">标记为已读</span>
                           <span v-else>已读</span>
                       </div>
                   </div>
                   <!-- <emotHtml class="customized-content-detailed" v-model="item.MsgContext" @click.native="viewDetails(item)"></emotHtml> -->
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {handleInviteUser, setMessage} from "../../../service/clientAPI"
import emotHtml from "../../../components/emotHtml"
import {analogJump} from '../../../plugins/untils/public'
import { mapState , mapGetters} from 'vuex'
export default {
    components: {
        emotHtml
    },
    data () {
        return {
            inviter: {},
            isEnt: false
        }
    },
    computed: {
        ...mapState({
            userInfoID: state => state.overas.auth || {}
        })
    },
    async asyncData({route, store}) {
        let msgType = {
            page: 1,
            msgType: 3
        }
        let msg = await store.dispatch('getNews', msgType);
        return {
            inviter: msg.invite
        }
    },
    created () {
        if (this.userInfoID.IsEnt === 1) {
                this.isEnt = true
            }
            // 个人
            if (this.userInfoID.IsEnt === 2) {
                this.isEnt = false
           
            }
    },
    methods: {
        async setMessage (row, type) {
            let OpId = ""
            if (row.constructor  === Object) {
                OpId = row.OpId
            }
            if (row.constructor === Array) {
                let opIdArr = []
                row.forEach(items => {
                   opIdArr.push(items.OpId);
                })
                OpId = opIdArr.join(',')
            }
            let queryData = {
                OpId: OpId,
                OpType:type
            }
            if (type === 1) {
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: `<p>是否要删除此消息</p>`,
                    onOk: async () => {
                        let msg = await delMessage(queryData);
                        if (msg) {
                            this.getMegs();
                        }
                    },
                    onCancel: () => {
                        isReme = false
                    }
                });
            }
            if (type === 2) {
                let msg = await delMessage(queryData);
                if (msg) {
                    this.getMegs();
                }
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
                this.getMegs()
            }
        },
        async getMegs () {
            let msgType = {
                page: 1,
                msgType: 3
            }
            let m = await this.$store.dispatch('getNews', msgType);
            if (m) {
                this.$store.dispatch('ACInviter', m.invite);
                this.inviter= m.invite;
            }
        },
        async signMessage (id, type, index) {}
    },
    
}
</script>
<style lang="less" scoped>
    .customized-yuan-color {
        background: #ff3c00 !important;
    }
    .MsgTitle {
        font-size: 14px;
        font-weight: bold;
        margin-right: 15px;
    }
    .MsgCount-all {
      margin-left: 20px;
    }
    .customized-yuan-color {
        background: #ff3c00 !important;
    }
    .MsgCount-all {
        &-del {
            cursor: pointer;
            &:hover {
                color: #ff3c00;
            }
        }
        cursor: pointer;
        &:hover {
            color: #ff3c00;
        }
    }
    .customized-yuan {
        display: inline-block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #dddddd;
        position: relative;
        top: 2px;
    }
    .MsgCount-color {
        color: #ff3c00;
    }
    .customized {
        padding: 0 30px;
        &-title {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #999999;
             height: 60px;
            line-height: 60px;
            &-left {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
        &-content {
            li {
                margin: 10px 0;
                padding: 0 10px 10px;;
                border-bottom: 1px solid #f0f0f0;
                &:hover {
                    background: #f7f7f7
                }
            }
            &-title {
                display: flex;
                line-height: 45px;
                width: 100%;
                justify-content: space-between;
                &-right {
                    &-del {
                        display: none;
                    }
                    &-agree {
                        cursor: pointer;
                        &:hover {
                            color: #ff3c00;
                        }
                    }
                }
                &:hover &-right-del{
                    display: inline-block;
                    cursor: pointer;
                }
            }
            &-detailed {
                line-height: 30px;
                padding: 0 20px;
                cursor: pointer;
                &:hover {
                    color: #ff3c00;
                }
            }
        }
    }
</style>