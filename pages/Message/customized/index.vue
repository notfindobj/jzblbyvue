<template>
    <div>
        <div class="customized">
            <div class="customized-title">
               <div class="customized-title-left">
                    <span>有 <span class="MsgCount-color">{{customized.MsgCount}}</span> 条服务消息未读</span>
                    <span class="MsgCount-all" @click="signMessage(customized.Msg, 2)">全部设为已读</span>
               </div>
               <div>
                   <span class="MsgCount-all-del"  @click="signMessage(customized.Msg, 1)">全部删除</span>
               </div>
            </div>
            <ul class="customized-content">
                <li v-for="(item, index) in customized.Msg" :key="index" @click="signMessage(item, 2)">
                   <div class="customized-content-title">
                       <div>
                           <span :class="item.ReadStatu === 1 ? 'customized-yuan customized-yuan-color': 'customized-yuan'"></span>
                           <span class="MsgTitle">{{item.MsgTitle}}</span>
                           <span>{{item.CreateDate}}</span>
                       </div>
                       <div class="customized-content-title-right">
                           <span class="customized-content-title-right-del" @click="signMessage(item, 1, index)" >删除</span>
                           <span v-if="item.ReadStatu === 1" @click="signMessage(item, 2)">标记为已读</span>
                           <span v-else>已读</span>
                       </div>
                   </div>
                   <emotHtml class="customized-content-detailed" v-model="item.MsgContext" @click.native="viewDetails(item)"></emotHtml>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {setMessage} from "../../../service/clientAPI"
import emotHtml from "../../../components/emotHtml"
import {analogJump} from '../../../plugins/untils/public'
export default {
    components: {
        emotHtml
    },
    data () {
        return {
            customized: {}
        }
    },
    async asyncData({route, store}) {
        let msgType = {
            page: 1,
            msgType: 0
        }
        let msg = await store.dispatch('getNews', msgType);
        return {
            customized:msg.pinglun
        }
    },
    methods: {
        viewDetails (row) {
            let routeData = {}
            let showLayout = true 
            switch (row.DataIds.scopeType) {
                case 0:
                    let showLayout = true 
                    if (row.TypeName === '文本' || row.TypeName === '建筑规范') {
                        showLayout = false
                    } else {
                        showLayout = true
                    }
                    routeData = this.$router.resolve({
                        name: 'DataDetails',
                        query: {id: row.DataIds.itemId, layout: showLayout }
                    })
                    break;
                case 1:
                    routeData = this.$router.resolve({
                        name: 'pictureDetails-id',
                        params: {id: row.DataIds.itemId }
                    })
                    break;
                case 2:
                    routeData = this.$router.resolve({
                        name: 'videoDetails-id',
                        params: {id: row.DataIds.itemId }
                    })
                    break;
               
                case 3:
                    routeData = this.$router.resolve({
                        name: 'QuestionsAndAnswers-id',
                        params: {id: row.DataIds.itemId }
                    })
                    break;
                case 4:
                    if (row.TypeName === '文本' || row.TypeName === '建筑规范') {
                        showLayout = false
                    } else {
                        showLayout = true
                    }
                    routeData = this.$router.resolve({
                        name: 'DataDetails',
                        query: {id: row.DataIds.itemId, layout: showLayout }
                    })
                    break;
                case 5:
                    routeData = this.$router.resolve({
                        name: 'pictureDetails-id',
                        params: {id: row.DataIds.itemId }
                    })
                    break;
            }
            this.signMessage(row, 2)
            analogJump(routeData.href);
        },
        async getMegs () {
            let msgType = {
                page: 1,
                msgType: 0
            }
            let m = await this.$store.dispatch('getNews', msgType);
            if (m) {
                this.$store.dispatch('ACComment', m.pinglun);
                this.customized = m.pinglun;
            }
        },
        async signMessage (id, type, index) {
            let OpId = ""
            if (id.constructor  === Object) {
                OpId = id.OpId
            }
            if (id.constructor === Array) {
                let opIdArr = []
                id.forEach(items => {
                   opIdArr.push(items.OpId);
                })
                OpId = opIdArr.join(',')
            }
            let queryData = {
                OpId: OpId,
                OpType:type
            }
            let title =""
            let content = ""
            title = type === 2 ? "阅读消息": "删除消息"
            content= type === 2 ? `确定全部阅读消息？` : `删除消息后不可恢复，确定要删除嘛？`
            if (id.constructor  === Object && type == 2) {
                let msg = await setMessage(queryData);
                if (msg) {
                   this.getMegs()
                } 
            } else {
                this.$Modal.confirm({
                    title: title,
                    content: `<p>${content}</p>`,
                    onOk: async () => {
                        let msg = await setMessage(queryData);
                        if (msg) {
                            if (id.constructor  === Object) {
                                if (type == 2) {
                                    this.$set(id, "ReadStatu", 0);
                                    this.getMegs()
                                }
                                if (type == 1) {
                                    this.getMegs()
                                    // this.customized.Msg.splice(index, 1);
                                }
                            }
                            if (id.constructor === Array) {
                                this.getMegs()
                            }
                        } 
                    },
                    onCancel: () => {
                        return false
                    }
                });
            }
        }
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