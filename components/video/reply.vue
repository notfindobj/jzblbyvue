<template>
    <div class="reply-wrap">
        <div class="reply-box">
            <div class="comment-head">
                <div class="comment-avatar">
                    <img :src="$store.state.overas.auth.HeadIcon" alt="">
                </div>
                <div class="reply-input-wrap" :style="{width: width + 'px'}">
                    <Input v-model="replyCon"/>
                    <div class="comment-tool">
                        <div>
                            <i class="icon iconfont icon-face"
                               @click.stop="isShowReplyEmotion = !isShowReplyEmotion">&#xe64e;</i>
                            <i class="icon iconfont icon-photo">&#xe61a;</i>
                            <i class="icon iconfont icon-tags">&#xe610;</i>
                        </div>
                        <Button type="primary" @click="handleReply">回复</Button>
                    </div>
                    <emotion
                        class="emotion"
                        @emotion="handleEmotion"
                        :height="200"
                        v-if="isShowReplyEmotion"
                    ></emotion>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Emotion from '../../components/Emotion/index'
  export default {
    props: {
      width: {
        type: Number,
        default: 974
      }
    },
    components: {
      Emotion
    },

    data() {
      return {
        replyCon: '',   // 回复内容
        isShowReplyEmotion: false,
      }
    },

    methods: {
      // 选择表情
      handleEmotion(item) {
        this.replyCon += `[${ item.content }]`
      },
      // 点击回复
      handleReply() {
        if (!this.replyCon) {
          this.$Message.warning('请输入回复内容');
          return false;
        }
        this.$emit('submitReplay', this.replyCon);
        this.replyCon = '';
      }
    }
  }
</script>

<style lang="less" scoped>
    .comment {
        position: relative;
        margin-top: 4px;
        padding: 20px 30px;
        background-color: #fff;

        .comment-head {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            .comment-avatar {
                width: 30px;
                height: 30px;
                background-color: #ccc;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .comment-input-wrap {
                width: 1101px;
                position: relative;
            }
        }

        .comment-item {

            border-top: 1px solid #eee;
            padding: 30px 40px;

            .reply-wrap {
                padding-left: 45px;
            }
            .reply-box {
                width: 100%;
                min-height: 40px;
                padding-top: 10px;
                .reply-input-wrap {
                    position: relative;

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

    .comment-shape {
        content: '';
        position: absolute;
        top: -7px;
        right: 439px;
        width: 20px;
        height: 20px;
        transform: rotate(45deg);
        background-color: #fff;
        box-shadow: inset 0 1px 4px 1px rgba(255, 0, 0, 0.10);
    }

    .show-more {
        font-size: 12px;
        color: #ff3c00;
        cursor: pointer;
        text-align: center;
    }

    i {
        margin-right: 4px;
    }

    .icon-face {
        color: #ff3c00;
    }

    .icon-photo {
        color: #00B358;
    }

    .icon-tags {
        color: #559BDC;
    }

    .comment-tool {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 10px 0;


        button {
            width: 62px;
            height: 26px;
            line-height: 1;
        }
    }

    .emotion {
        width: 420px;
        position: absolute;
        bottom: -195px;
        left: 0;
        z-index: 3;
    }
</style>
