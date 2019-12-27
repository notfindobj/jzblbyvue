<template>
    <div class="comCard">
        <div class="comCard-content">
           <div class="comCard-content-txt">
               <span class="comCard-content-txt-name">{{content.NickName}}</span>:
               <span v-if="content.IsReply">
                   <span>回复</span>
                    <span class="comCard-content-txt-rep">@666</span>:
               </span>
               <span>
                   {{content.MsgContext}}
               </span>
           </div>
           <i class="icon iconfont icon-chahao3" @click="delMsg(content)"></i>
        </div>
        <div class="comCard-pro">
            <div class="comCard-pro-left" v-if="content.ItemTitleImg">
                <img :src="content.ItemTitleImg" alt="">
            </div>
            <div class="comCard-pro-right">
                <div>
                    <span class="comCard-pro-right-title">@{{content.ItemNickName}}</span>
                    <!-- <span>项目</span> -->
                </div>
                <div >
                   {{content.MsgTitle}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        content: {
            type: Object,
            default: () => {}   
        }
    },
    methods: {
        delMsg (row) {
            this.$emit('delMsg', row);
        }
    },
}
</script>
<style lang="less" scoped>
    .comCard {
        border: 1px solid #ddd;
        display: inline-block;
        width: 700px;
        padding: 10px;
        border-radius: 3px;
        cursor: pointer;
        &:hover .comCard-content i{
            display: inline-block;
        }
        &-content {
            display: flex;
            justify-content: space-between;
            position: relative;
            line-height: 25px;
            margin-bottom: 5px;
            &-txt {
                &-name, &-rep {
                    color: #ff3c00;
                    cursor: pointer;
                }
            }
            i {
                position: absolute;
                right: -8px;
                top: -14px;
                font-size: 12px;
                display: none;
            }
        }
        &-pro {
            display: flex;
            justify-content: flex-start;
            background: #f5f5f5;
            &-left {
                width: 90px;
                height: 90px;
                margin-right: 10px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            &-right {
                flex: 1;
                &-title {
                    font-size: 14px;
                    font-weight: 600;
                }
            }
        }
    }
</style>