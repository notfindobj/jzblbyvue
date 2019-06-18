<template>
    <div style="position: relative;" v-show="isShow" @click="isShowEmotion = false">
        <div class="comment-shape"></div>
        <div class="comment">
            <div class="comment-head">
                <div class="comment-avatar">
                    <img :src="$store.state.overas.auth.HeadIcon" alt="">
                </div>
                <div class="comment-input-wrap">
                    <Input v-model="commentCon"/>
                    <div class="comment-tool">
                        <div>
                            <i class="icon iconfont icon-face" @click.stop="isShowEmotion = !isShowEmotion">&#xe64e;</i>
                            <i class="icon iconfont icon-photo">&#xe61a;</i>
                            <i class="icon iconfont icon-tags">&#xe610;</i>
                        </div>
                        <Button type="primary" @click="handleComment">评论</Button>
                    </div>
                    <emotion
                        class="emotion"
                        @emotion="handleEmotion"
                        :height="200"
                        v-show="isShowEmotion"
                    ></emotion>
                </div>
            </div>
            <div class="comment-list">
                <Spin size="large" fix v-if="isShowLoading"></Spin>
                <div class="comment-item" v-for="(item, index) in commentList" :key="item.CommentsId" v-if="index < showCount">
                    <div class="item-avatar">
                        <img :src="item.HeadIcon" alt="">
                    </div>
                    <div class="commit-item-info">
                        <div class="item-info-row1">
                            <span class="user-name">{{ item.NickName }}</span>
                            <span class="publish-time">{{ item.CreateDate }}</span>
                        </div>
                        <p class="comment-content">{{ item.Message }}</p>
                        <p class="opera-row">
                            <span>回复</span>
                            <span class="line-col">|</span>
                            <span>
                                <i class="icon iconfont">&#xe67e;</i>
                                赞
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <p class="show-more" v-show="commentList.length > 3 && !isLast" @click="showMore">
                查看更多>>
            </p>
        </div>
    </div>
</template>

<script>
  import Emotion from '~/components/Emotion/index'
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      },

      itemId: {
        type: String,
        default: ''
      },
      commentList: {
        type: Array,
        default: function () {
          return []
        }
      },
      isShowLoading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        commentCon: '',
        isShowEmotion: false,
        showCount: 3,   // 显示几条评论
        isLast: false
      }
    },

    components: {
      Emotion
    },

    methods: {
      // 选择表情
      handleEmotion(item) {
        this.commentCon += `[${ item.content }]`
      },

      // 评论
      handleComment() {
        if (!this.commentCon) {
          this.$Message.warning('请输入评论内容！');
          return false;
        }
        this.$emit('submitComment', this.commentCon);
        this.commentCon = '';
      },

      // 显示更多
      showMore() {
        this.showCount += 3;
        if (this.showCount >= this.commentList.length) {
          this.isLast = true;
        }
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
                .emotion {
                    width: 420px;
                    position: absolute;
                    bottom: -195px;
                    left: 0;
                    z-index: 3;
                }
                .comment-tool {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    padding: 10px 0;

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

                    button {
                        width: 62px;
                        height: 26px;
                        line-height: 1;
                    }
                }
            }
        }

        .comment-item {
            display: flex;
            justify-content: space-between;
            padding: 30px 40px;
            border-top: 1px solid #eee;

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
</style>
