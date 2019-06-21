<template>
    <div class="comment-item">
        <div class="comment-item-con">
            <div class="item-avatar">
                <img :src="commentInfo.HeadIcon" alt="">
            </div>
            <div class="commit-item-info" :style="{width: commitWidth}">
                <div class="item-info-row1">
                    <span class="user-name">{{ commentInfo.NickName }}</span>
                    <span class="publish-time">{{ commentInfo.CreateDate }}</span>
                </div>
                <p class="comment-content">{{ commentInfo.Message }}</p>
                <p class="opera-row">
                    <span @click="clickReply">回复</span>
                    <span class="line-col">|</span>
                    <span>
                        <i
                            class="icon iconfont"
                            v-show="!isLike"
                            @click="clickLike(true)"
                        >&#xe67e;</i>
                        <i
                            class="icon iconfont"
                            style="color: #ff3c00;"
                            v-show="isLike"
                            @click="clickLike(false)"
                        >&#xe621;</i>
                        赞
                    </span>

                </p>
            </div>
        </div>
        <reply v-if="isShowInput" :width="replyInputWith" @submitReplay="submitReplay"></reply>
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
  import { setComments, setthumbsUp } from '../../service/clientAPI'
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
        showCount: 3,
        commitWidth: '96%',
        replyInputWith: 974,
        isLike: this.commentInfo.islikes
      }
    },

    methods: {
      clickReply() {
        if (this.commentInfo.IsCoutReply) {
          if (this.$route.name === 'QuestionsAndAnswers-id') {
            this.replyInputWith = 575;
          }
          this.isShowInput = !this.isShowInput;
        } else {
          this.$Message.warning('不能回复自己！');
          return false;
        }
      },

      // 点赞
      clickLike(flag) {
        if (this.commentInfo.CommentsId) {
          setthumbsUp({
            ItemId: this.commentInfo.ItemId,
            LikeType: 0,
            CommentsId: commentInfo.CommentsId,
            IsDelete: !flag
          }).then(res => {
            this.isLike = flag;
          })
        } else {
          this.$Message.warning('不能给自己点赞哦！');
          return false;
        }
      },

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
    },

    created() {
      if (this.$route.name === 'QuestionsAndAnswers-id') {
        this.commitWidth = '94%';
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
                width: 94%;
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

    .show-more {
        margin-top: 10px;
        font-size: 12px;
        color: #ff3c00;
        cursor: pointer;
        text-align: center;
    }

</style>
