<template>
    <div class="reply-wrap">
        <div class="reply-box">
            <img class="replay-avatar" :src="replyInfo.HeadIcon" alt="">
            <div class="replay-content">
                <div class="replay-info">
                    <p>
                        <span class="replay-user">{{ replyInfo.NickName }}：</span>
                        {{ replyInfo.Message }}
                    </p>
                    <span class="reply-time">{{ replyInfo.CreateDate }}</span>
                </div>
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
        <reply v-if="isShowInput" :width="929" @submitReplay="submitReplay"></reply>
    </div>
</template>

<script>
  import Reply from '~/components/video/reply'
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
        isShowInput: false
      }
    },
    mounted() {
      console.log(this.replyInfo)
    },

    methods: {
      submitReplay(content) {
        const obj = {
          content,
          commentsId: this.replyInfo.CommentsId,
          userId: this.replyInfo.UserId
        };

        this.$emit('submitReplay', obj);
        this.isShowInput = false;
      },
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
