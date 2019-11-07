<template>
    <div>
        <div class="customized">
            <div class="customized-title">
               <div class="customized-title-left">
                    <span>有 <span class="MsgCount-color">{{customized.MsgCount}}</span> 条服务消息未读</span>
                    <span class="MsgCount-all"  @click="signMessage(customized.Msg, 2)">全部设为已读</span>
               </div>
               <div>
                   <span class="MsgCount-all-del" @click="signMessage(customized.Msg, 1)">全部删除</span>
               </div>
            </div>
            
            <ul class="customized-content">
                <li v-for="(item, index) in customized.Msg" :key="index">
                   <div class="customized-content-title">
                       <div class="flex-content">
                            <span :class="item.ReadStatu === 1 ? 'customized-yuan customized-yuan-color': 'customized-yuan'"></span>
                            <span class="MsgTitle" @click="viewDetails(item)">{{item.MsgTitle}}</span>
                            <span class="CreateDate">{{item.CreateDate}}</span>
                       </div>
                       <div class="customized-content-title-right">
                           <span class="customized-content-title-right-del" @click="signMessage(item, 1, index)" >删除</span>
                           <span class="customized-content-title-right-reader" v-if="item.ReadStatu === 1" @click="signMessage(item, 2)">标记为已读</span>
                           <span  v-else>已读</span>
                       </div>
                   </div>
                   <div class="customized-content-detailed" @click="viewCustom(item)">
                      {{item.MsgContext}}
                   </div>
                </li>
            </ul>
            <Custom v-if="isCustom" :customId="customId" @dataDetailsMaskClose="dataDetailsMaskClose"/>
        </div>
    </div>
</template>
<script>
import {setMessage} from "../../../service/clientAPI"
import {analogJump} from '../../../plugins/untils/public'
import Custom from "./custom"
export default {
    data () {
        return {
            customized: {},
            customId: {},
            isCustom: false
        }
    },
    components: {
        Custom
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
        viewDetails (row) {
            this.signMessage(row, 2)
            let routeData = this.$router.resolve({
                name: 'DataDetails',
                query: {id: row.DataIds.itemId, layout: true }
            })
            analogJump(routeData.href);
        },
        viewCustom(row) {
            this.isCustom = true;
            this.signMessage(row, 2);
            this.getMegs()
            this.customId = row.DataIds
        },
        dataDetailsMaskClose () {
            this.isCustom = false;
        },
        async getMegs () {
            let msgType = {
                page: 1,
                msgType: 1
            }
            let m = await this.$store.dispatch('getNews', msgType);
            if (m) {
                this.$store.dispatch('ACCusData', m.dingzhi);
                this.customized = m.dingzhi;
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
            let content = "删除消息后不可恢复，确定要删除嘛？"
            title = type === 2 ? "阅读消息": "删除消息， "
            // content= id.constructor  === Object ? content : content
            if (id.constructor  === Object && type == 2) {
                let msg = await setMessage(queryData);
                if (msg) {
                   this.$set(id, "ReadStatu", 0)
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
                                    this.getMegs()
                                }
                                if (type == 1) {
                                    this.getMegs()
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
        cursor: pointer;
        &:hover {
            color: #ff3c00;
        }
    }
    .flex-content {
        justify-content: center;
        align-items: center;
        display: flex;
    }
    .MsgCount-all {
      margin-left: 20px;
      cursor: pointer;
      cursor: pointer;
      &-del {
            cursor: pointer;
            &:hover {
                color: #ff3c00;
            }
      }
      &:hover {
          color: #ff3c00;
      }
    }
    .customized-yuan-color {
        background: #ff3c00 !important;
    }
    .customized-yuan {
        display: inline-block;
        width: 12px;
        height: 12px;
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
                        &:hover {
                            color: #ff3c00;
                        }
                    }
                    &-reader {
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
                cursor: pointer;
                line-height: 30px;
                padding: 0 20px;
                &:hover{
                    color: #ff3c00;
                }
            }
        }
    }
</style>