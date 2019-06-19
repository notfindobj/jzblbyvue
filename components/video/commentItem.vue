<template>
    <div class="comment-item">
        <div class="comment-item-con">
            <div class="item-avatar">
                <img :src="commentInfo.HeadIcon" alt="">
            </div>
            <div class="commit-item-info">
                <div class="item-info-row1">
                    <span class="user-name">{{ commentInfo.NickName }}</span>
                    <span class="publish-time">{{ commentInfo.CreateDate }}</span>
                </div>
                <p class="comment-content">{{ commentInfo.Message }}</p>
                <p class="opera-row">
                    <span @click="isShowInput = !isShowInput">回复</span>
                    <span class="line-col">|</span>
                    <span>
                        <i class="icon iconfont">&#xe67e;</i>
                        赞
                    </span>
                </p>
            </div>
        </div>
        <reply v-if="isShowInput" :width="974" @submitReplay="submitReplay"></reply>
        <reply-item
            v-for="(item,index) in commentInfo.ReplyList"
            :key="item.CommentsId"
            v-if="index < showCount"
            :replyInfo="item"
            @submitReplay="replyToo"
        ></reply-item>
        <p class="show-more" v-show="commentInfo.ReplyList.length > 3 && !isLast" @click="showMore">
            查看更多>>
        </p>
    </div>
</template>

<script>
  import Reply from '~/components/video/reply'
  import ReplyItem from '~/components/video/replyItem'
  import { setComments } from '../../service/clientAPI'

  export default {
    props: {
      commentInfo: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    components: {
      Reply,
      'reply-item': ReplyItem
    },
    data() {
      return {
        isShowInput: false,
        isLast: false,
        showCount: 3
      }
    },

    methods: {
      // 回复评论
      submitReplay(content) {
        const obj = {
          content,
          commentsId: this.commentInfo.CommentsId,
          userId: this.commentInfo.UserId
        };

        this.$emit('submitReplay', obj);
        this.isShowInput = false;
      },

      // 回复回复信息
      replyToo(obj) {
        this.$emit('submitReplay', obj);
        this.isShowInput = false;
      },

      showMore() {
        this.showCount += 3;
        if (this.showCount >= this.commentInfo.ReplyList.length) {
          this.isLast = true;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .comment-item {

        border-top: 1px solid #eee;
        padding: 30px 40px;

        .reply-wrap {
            padding-left: 45px;
        }

        .reply-box {
            width: 100%;
            min-height: 40px;

            .reply-input-wrap {
                position: relative;
                width: 974px;
                padding-top: 10px;
            }
        }

        .comment-item-con {
            display: flex;
            justify-content: space-between;

        }

        .item-avatar {
            width: 30px;
            height: 30px;
            background-color: #ccc;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .commit-item-info {
            width: 1020px;

            .item-info-row1 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 5px;

                .user-name {
                    font-size: 14px;
                    color: #ff3c00;
                }

                .publish-time {
                    font-size: 12px;
                    color: #999;
                }
            }

            .comment-content {
                font-size: 14px;
                color: #333;
                line-height: 24px;
            }

            .opera-row {
                font-size: 12px;
                text-align: right;
                margin-top: 5px;
                cursor: pointer;

                i {
                    font-size: 12px;
                }

                .line-col {
                    margin: 0 4px;
                }
            }
        }
    }

    .show-more {
        margin-top: 10px;
        font-size: 12px;
        color: #ff3c00;
        cursor: pointer;
        text-align: center;
    }

</style>
