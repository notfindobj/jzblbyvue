<template>
    <div>
        <div class="discuss" v-for="(items, index) in discussData" :key="index">
            <div class="discuss-title" >
                <div class="discuss-title-headIcon">
                    <img :src="items.HeadIcon" alt="">
                </div>
                <div class="discuss-title-content">
                    <p class="discuss-title-content-name">{{items.NickName}}</p>
                    <p class="discuss-title-content-time">{{items.CreateDate}}</p>
                </div>
            </div>
            <div class="discuss-content" v-html="items.Message.replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, emotion)"></div>
            <div class="discuss-footer">
                <span class="discuss-footer-dianzan" @click="somePraise(items)" :style="`color:${items.islikes ? '#FF3C00;' : ''} `">
                    <i v-if="items.islikes" class="icon iconfont icon-like-b"></i>
                    <i v-else class="icon iconfont icon-dianzan1"></i>
                    点赞{{items.LikeCount}}
                </span>
                <span class="discuss-footer-pinglun" @click="setDiscuss(index)">
                    <i class="icon iconfont icon-pinglun"></i>
                    评论
                </span>
            </div>
            <div class="discuss-comment" v-if="isDiscuss.includes(index)">
                <comment
                    :emotionRows='1'
                    :btnText="'评论'"
                    v-model="muchReplyVlaue"
                    :placeholder="`回复${items.NickName}`"
                    @commentValue="commentValue(items)"
                />
            </div>
            <template v-if="items.ReplyList.length > 0">
                <div class="discuss-muchReply" v-show="!(muchReply.includes(index))">
                    <span class="discuss-muchReply-color">{{items.ReplyList[0].NickName}}</span>
                    等人
                    <span class="discuss-muchReply-color" @click="openMuchReply(index)">共{{items.ReplyList.length}}回复 <i class="icon iconfont icon-jiantou"></i></span>
                </div>
                <div v-show="muchReply.includes(index)" class="discuss-reply" v-for="(sub, sunIndex) in items.ReplyList" :key="sunIndex">
                    <div class="discuss-reply-title">
                        <span class="discuss-reply-title-name">{{sub.NickName}}：</span>
                        <span>{{sub.CreateDate}}</span>
                    </div>
                    <div class="discuss-reply-content" v-html="sub.Message.replace(/\[[\u4E00-\u9FA5]{1,3}\]/gi, emotion)"></div>
                    <div class="discuss-reply-footer">
                        <span class="discuss-footer-dianzan" @click="somePraise(sub)" :style="`color:${sub.islikes ? '#FF3C00;' : ''} `">
                            <i v-if="sub.islikes" class="icon iconfont icon-like-b"></i>
                            <i v-else class="icon iconfont icon-dianzan1"></i>
                            点赞{{sub.LikeCount}}
                        </span>
                        <span class="discuss-footer-pinglun" @click="setSubDiscuss(sunIndex + sub.CommentsId)">
                            <i class="icon iconfont icon-pinglun"></i>
                            评论
                        </span>
                    </div>
                    <div class="discuss-reply-comment" v-if="subDiscuss.includes(sunIndex + sub.CommentsId)">
                        <comment
                            :emotionRows='1'
                            :btnText="'评论'"
                            v-model="muchReplyVlaue"
                            :placeholder="`回复${sub.NickName}`"
                            @commentValue="commentValue(sub)"
                        />
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import comment from '../comment'
import {getEmotionList} from '../../plugins/untils/public'
export default {
    props: {
        discussData:{
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data () {
        return {
            isDiscuss: [],
            subDiscuss:[],
            muchReply: [],
            muchReplyVlaue: '',
            list: []
        }
    },
    async created () {
      this.list = await getEmotionList()
    },
    methods: {
        setDiscuss (index) {
            this.isDiscuss.includes(index) ? this.isDiscuss = this.isDiscuss.filter(n => n !== index) : this.isDiscuss.push(index)
        },
        setSubDiscuss (index) {
            this.subDiscuss.includes(index) ? this.subDiscuss = this.subDiscuss.filter(n => n !== index) : this.subDiscuss.push(index)
        },
        openMuchReply (index) {
            this.muchReply.includes(index) ? this.muchReply = this.muchReply.filter(n => n !== index) : this.muchReply.push(index)
        },
        emotion (res) {
            let word = res.replace(/\[|\]/gi,'');
            let wordShow = true
            let wordContent = ''
            let wordContentHtml = ''
            this.list.forEach(ele => {
            if (wordShow) {
                if (ele.content === word) {
                    wordContent = ele.title
                    wordContentHtml = `<img style="width: 25px;" src=" http://www.pic.jzbl.com/ItemFiles/Emoticon/QQ/${wordContent}_QQ.gif">`
                    wordShow = false
                }
            }
            })
            return wordContentHtml
        },
        // 评论
        commentValue (val) {
            this.$emit('commentValue', val, this.muchReplyVlaue)
        },
        // 点赞
        somePraise (sub) {
            this.$emit('somePraise', sub);
        }
    },
    components: {
        comment
    }
}
</script>
<style lang="less" scoped>
    .clickDiscuss {
        color: #FF3C00;
    }
    .discuss {
        background: #ffffff;
        padding: 10px;
        &-title {
            display: flex;
            &-headIcon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                overflow: hidden;
                background: #abc;
                img {
                    height: 100%;
                    width: 100%;
                }
            }
            &-content {
                padding-left: 10px;
                &-name {
                    font-size: 14px;
                    color: #000000;
                }
                &-time {
                    font-size: 12px;
                    margin-top: 3px;
                    color: #999999;
                }
            }
        }
        &-content {
            padding-left: 50px;
            margin: 10px 0;
            line-height: 18px;
        }
        &-footer {
            text-align: right;
            &-dianzan {
                cursor: pointer;
                margin-right: 10px;
                &:hover {
                    color: #FF3C00;
                }
            }
            &-pinglun {
                cursor: pointer;
                &:hover {
                    color: #FF3C00;
                }
            }
        }
        &-comment {
            margin-left: 50px;
            margin-top: 5px;
        }
        &-reply {
            margin-left: 50px;
            border-radius: 3px;
            margin-top: 5px;
            background: #F6F6F8;
            padding: 10px;
            &-title {
                display: flex;
                justify-content: space-between;
                &-name {
                    color: #3E85FF;
                    cursor: pointer;
                }
            }
            &-content{
                margin: 10px 0;
                img {
                    display: inline-block;
                    width: 30px;
                }
            }
            &-footer {
                text-align: right;
                &-dianzan {
                    cursor: pointer;
                    margin-right: 10px;
                    &:hover {
                        color: #FF3C00;
                    }
                }
                &-pinglun {
                    cursor: pointer;
                    &:hover {
                        color: #FF3C00;
                    }
                }
            }
            &-comment {
                margin-top: 5px;
            }
        }
        &-muchReply {
            margin-left: 50px;
            border-radius: 3px;
            margin-top: 5px;
            line-height: 20px;
            padding-left: 15px;
            background: #F6F6F8;
            &-color {
                color: #3E85FF;
                cursor: pointer;
            }
        }
    }
</style>
