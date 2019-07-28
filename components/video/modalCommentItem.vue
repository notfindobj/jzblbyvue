<template>
    <div class="comment-item" @click="isShowEmotion = false">
        <div class="commenter-avatar">
            <img :src="commentInfo.HeadIcon" alt="">
        </div>
        <div class="comment-info">
            <p class="comment-nickname">{{ commentInfo.NickName }}</p>
            <p class="comment-time">{{ commentInfo.CreateDate }}</p>
            <p class="comment-con">
                {{ commentInfo.Message }}
            </p>
            <div class="comment-operation">
                <p>
                    <i
                        class="icon iconfont icon1"
                        v-if="!commentInfo.islikes"
                        @click="likeComment(true)"
                    >
                        &#xe643;
                    </i>
                    <i
                        class="icon iconfont icon1-active"
                        v-if="commentInfo.islikes"
                        @click="likeComment(false)"
                    >
                        &#xe621;
                    </i>
                    <span>点赞</span>
                </p>
                <Divider type="vertical" style="margin: 0 10px;"/>
                <p @click="isShowInput = !isShowInput">
                    <i class="icon iconfont reply-comment-icon">&#xe664;</i>
                    <span>评论</span>
                </p>
            </div>
            <div class="reply-comment-box" v-show="isShowInput">
                <div class="reply-avatar-wrap">
                    <img :src="$store.state.overas.auth.HeadIcon" alt="">
                </div>
                <div class="reply-input-box">
                    <Input size="small" v-model="inputContent" style="width: 240px;"/>
                    <div class="comment-bottom">
                        <i class="icon iconfont select-icon" @click.stop="isShowEmotion = !isShowEmotion">&#xe64e;</i>
                        <Button type="primary" size="small" @click="submitComment">评论</Button>
                    </div>
                    <emotion
                        class="emotion"
                        @emotion="handleEmotion"
                        :height="130"
                        v-show="isShowEmotion"
                    ></emotion>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Emotion from '~/components/Emotion/index'
    import { setComments, setthumbsUp } from '../../service/clientAPI'
    export default {
        props: {
            commentInfo: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            index: {
                type: Number,
                default: 0
            }
        },
        components: {
            Emotion
        },


        data() {
            return {
                isShowInput: false,
                inputContent: '',
                isShowEmotion: false
            }
        },

        methods: {
            // 点赞评论
            likeComment(flag) {
                setthumbsUp({
                    ItemId: this.commentInfo.ItemId,
                    LikeType: 0,
                    CommentsId: this.commentInfo.CommentsId,
                    IsDelete: !flag
                }).then(() => {
                    this.$emit('getCommentList');
                })
            },

            // 提交评论
            submitComment() {
                if (!this.inputContent.trim()) {
                    this.$Message.warning('评论内容不能为空哦');
                    return false;
                }
                setComments({
                    ItemId: this.commentInfo.ItemId,
                    ReplyId: this.commentInfo.CommentsId,
                    ReplyUserId: this.commentInfo.UserId,
                    IsReply: true,
                    Message: this.inputContent,
                    ItemImgSrc: '',
                    ScopeType: 2
                }).then(res => {
                    this.inputContent = '';
                    this.isShowInput = false;
                    this.$emit('getCommentList');
                })
            },

            // 选择表情
            handleEmotion(item) {
                this.inputContent += `[${ item.content }]`
            },
        }
    }
</script>

<style lang="less" scoped>
    .comment-item {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .commenter-avatar {
        width: 30px;
        height: 30px;
        background-color: #ccc;
        border-radius: 50%;
        margin-right: 10px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .comment-info {
        width: 88%;

        .comment-nickname {
            font-size: 12px;
            color: #333;
        }

        .comment-time {
            font-size: 12px;
            color: #999;
        }

        .comment-con {
            margin-top: 5px;
            font-size: 12px;
            color: #000;
        }

        .comment-operation {
            display: flex;
            justify-content: flex-end;
            align-items: center;

            p {
                display: flex;
                align-items: center;

                span {
                    margin-left: 2px;
                }

                .icon1 {
                    position: relative;
                    bottom: 2px;
                    cursor: pointer;
                }

                .icon1-active {
                    color: #FF3C00;
                    font-size: 14px;
                    cursor: pointer;
                }

                .reply-comment-icon {
                    cursor: pointer;
                }
            }
        }

    }

    .reply-comment-box {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        padding: 20px 0;

        .reply-avatar-wrap {
            width: 30px;
            height: 30px;
            border-radius: 2px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .reply-input-box {
            margin-left: 10px;
            position: relative;
            .comment-bottom {
                margin-top: 5px;
            }
        }
    }

    .comment-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .select-icon {
            font-size: 15px;
            color: #ff3c00;
            cursor: pointer;
        }

        button {
            height: 21px;
            line-height: 19px;
        }
    }

    .emotion {
        position: absolute;
        width: 100%;
        z-index: 2;
    }
</style>
