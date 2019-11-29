<template>
    <div>
        <div class="customized">
            <div class="customized-title">
               <div class="customized-title-left">
                    <span>有 <span class="MsgCount-color">{{inviter.MsgCount}}</span> 条服务消息未读</span>
                    <span class="MsgCount-all" ></span>
               </div>
               <div>
                   <span class="MsgCount-all-del" >忽略全部</span>
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
                       <div class="customized-content-title-right">
                           <span class="customized-content-title-right-del" @click="handleInvite(item, 2)">忽略</span>
                           <span class="customized-content-title-right-agree" v-if="item.ReadStatu === 1" @click="handleInvite(item, 1)">同意</span>
                           <span v-else>已处理</span>
                       </div>
                   </div>
                   <!-- <emotHtml class="customized-content-detailed" v-model="item.MsgContext" @click.native="viewDetails(item)"></emotHtml> -->
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {handleInviteUser} from "../../../service/clientAPI"
import emotHtml from "../../../components/emotHtml"
import {analogJump} from '../../../plugins/untils/public'
export default {
    components: {
        emotHtml
    },
    data () {
        return {
            inviter: {}
        }
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
    methods: {
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
                this.inviter= msg.invite;
            }
        },
        async signMessage (id, type, index) {}
    },
    
}
</script>
<style lang="less" scoped>
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