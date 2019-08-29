<template>
    <div class="reply-wrap">
        <div class="reply-box">
            <img class="replay-avatar" @click="goToPersonal(replyInfo)" :src="replyInfo.HeadIcon || $defaultHead" alt="">
            <div class="replay-content">
                <div class="replay-info">
                    <p>
                        <span class="replay-user">{{ replyInfo.NickName }}：</span>
                        {{ replyInfo.Message }}
                    </p>
                    <span class="reply-time">{{ replyInfo.CreateDate }}</span>
                </div>
                <p class="opera-row">
                    <span @click="clickReply">回复</span>
                    <span class="line-col">|</span>
                    <span>
                        <i class="icon iconfont" v-show="!isLike" @click="clickLike(true)" >&#xe67e;</i>
                        <i class="icon iconfont" style="color: #ff3c00;" v-show="isLike" @click="clickLike(false)" >&#xe621;</i>
                        赞
                    </span>
                </p>
            </div>
        </div>
        <reply v-if="isShowInput" :width="width" @submitReplay="submitReplay"></reply>
    </div>
</template>

<script>
  import Reply from '../../components/video/reply'
  import { setComments, setthumbsUp } from '../../service/clientAPI'
  export default {
    props: {
      replyInfo: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    components: {
      Reply
    },

    data() {
      return {
        isShowInput: false,
        width: 929,
        isLike: this.replyInfo.islikes
      }
    },

    mounted() {
      if (this.$route.name === 'QuestionsAndAnswers-id') {
        this.width = 529;
      } else if (this.$route.name === 'HeAndITribal-id') {
        this.width = 610;
      }
    },

    methods: {
       // 跳转部落
      goToPersonal (row) {
        this.$router.push({
          name: 'HeAndITribal-id',
          query: {
            id: row.UserId
          }
        })
      },
      // 点击回复
      clickReply() {
        this.isShowInput = !this.isShowInput;
        // if (this.replyInfo.IsCoutReply) {
        //   this.isShowInput = !this.isShowInput;
        // } else {
        //   this.$Message.warning('不能回复自己！');
        //   return false;
        // }
      },

      // 提交回复
      submitReplay(content) {
        const obj = {
          content,
          commentsId: this.replyInfo.CommentsId,
          userId: this.replyInfo.UserId
        };

        this.$emit('submitReplay', obj);
        this.isShowInput = false;
      },

      // 点赞
      clickLike(flag) {
        if (this.replyInfo.IsCoutReply) {
          setthumbsUp({
            ItemId: this.replyInfo.ItemId,
            LikeType: 0,
            CommentsId: this.replyInfo.CommentsId,
            IsDelete: !flag
          }).then(res => {
            this.isLike = flag;
          })
        } else {
          this.$Message.warning('不能给自己点赞哦！');
          return false;
        }

      }
    }
  }
</script>

<style lang="less" scoped>
    .reply-wrap {
        width: 100%;
        margin-top: 10px;
        padding-left: 80px;

        .reply-box {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            padding: 10px;
            background-color: #F5F6F5;

            .replay-avatar {
                cursor: pointer;
                width: 20px;
                height: 20px;
                margin-right: 5px;
            }

            .replay-content {
                display: flex;
                flex-direction: column;
                width: 97%;

                .replay-info {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    color: #333;

                    .replay-user {
                        color: #ff3c00;
                    }

                    .reply-time {
                        color: #999;
                        min-width: 115px;
                    }
                }

                .opera-row {
                    font-size: 12px;
                    text-align: right;
                    margin-top: 10px;
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
    }
</style>
