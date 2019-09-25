<template>
    <div>
        <div class="discuss" v-for="(items, index) in discussData" :key="index">
            <div class="discuss-title" >
                <div class="discuss-title-headIcon">
                    <img :src="items.HeadIcon" alt="" @click="goPersonalCenter(items)">
                </div>
                <div class="discuss-title-content">
                    <p class="discuss-title-content-name">{{items.NickName}}</p>
                    <p class="discuss-title-content-time">{{items.CreateDate}}</p>
                </div>
            </div>
            <div class="discuss-content"><emotHtml v-model="items.Message"/></div>
            <div class="discuss-footer">
                <span v-if="items.IsDeleteBtn" class="discuss-footer-shcnhu" @click="delComment(items)">
                    删除
                </span>
                <span class="discuss-footer-dianzan" @click="somePraise(items)">
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
            <template v-if="items.ReplyList && items.ReplyList.length > 0">
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
                    <div class="discuss-reply-content">
                        <emotHtml v-model="sub.Message"/>
                    </div>
                    <div class="discuss-reply-footer">
                        <span class="discuss-reply-footer-shcnhu" @click="delComment(sub)">
                            删除
                        </span>
                        <span class="discuss-footer-dianzan" @click="somePraise(sub)">
                            <i class="icon iconfont icon-dianzan1"></i>
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
        // 点击头像，去个人中心
        goPersonalCenter(item) {
            this.$router.push({
            name: 'HeAndITribal-id',
                query: {
                    id: item.UserId
                }
            })
        },
        // 删除评论
        delComment (val) {
            this.$emit('delComment', val)
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
                    cursor: pointer;
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
            &-shcnhu {
                cursor: pointer;
                display: none;
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
            &:hover &-shcnhu {
                text-decoration: underline;
                display: inline-block;
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
                &-shcnhu {
                    cursor: pointer;
                    display: none;
                    &:hover {
                        color: #FF3C00;
                    }
                }
                &:hover &-shcnhu {
                    text-decoration: underline;
                    display: inline-block;
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
