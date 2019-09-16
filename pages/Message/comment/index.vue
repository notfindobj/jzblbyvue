<template>
    <div>
        <div class="customized">
            <div class="customized-title">
               <div class="customized-title-left">
                    <span>有 <span class="MsgCount-color">{{customized.MsgCount}}</span> 条服务消息未读</span>
                    <span class="MsgCount-all"  @click="signMessage(customized.Msg, 2)">全部设为已读</span>
               </div>
               <div>
                   <span @click="signMessage(customized.Msg, 1)">全部删除</span>
               </div>
            </div>
            <ul class="customized-content">
                <li v-for="(item, index) in customized.Msg" :key="index" @click="signMessage(item, 2)">
                   <div class="customized-content-title">
                       <div>
                           <span :class="item.ReadStatu === 1 ? 'customized-yuan customized-yuan-color': 'customized-yuan'"></span>
                           <span>【新用户福利】免费查询品牌是否受保护</span>
                           <span>{{item.createDate}}</span>
                       </div>
                       <div class="customized-content-title-right">
                           <span class="customized-content-title-right-del" @click="signMessage(item, 1, index)" >删除</span>
                           <span v-if="item.ReadStatu === 1" @click="signMessage(item, 2)">标记为已读</span>
                           <span v-else>已读</span>
                       </div>
                   </div>
                   <div class="customized-content-detailed">
                      {{item.MsgContext}}
                   </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {setMessage} from "../../../service/clientAPI"
export default {
    data () {
        return {
            customized: {}
        }
    },
    async asyncData({route, store}) {
        let msgType = {
            page: 1,
            msgType: 1
        }
        let msg = await store.dispatch('getNews', msgType);
        return {
            customized:msg.dingzhi
        }
    },
    methods: {
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
            let msg = await setMessage(queryData);
            if (msg) {
                if (id.constructor  === Object) {
                    if (type == 2) {
                        this.$set(id, "ReadStatu", 0)
                    }
                    if (type == 1) {
                        this.customized.Msg.splice(index, 1)
                    }
                }
                if (id.constructor === Array) {
                    let msgType = {
                        page: 1,
                        msgType: 1
                    }
                    let m = await this.$store.dispatch('getNews', msgType);
                    if (m) {
                        this.customized = m.dingzhi
                    }
                }
            }
        }
    },
    
}
</script>
<style lang="less" scoped>
.MsgCount-all {
      margin-left: 20px;
    }
    .customized-yuan-color {
        background: #ff3c00 !important;
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
            }
        }
    }
</style>