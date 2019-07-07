<template>
    <div style="position: relative;" v-show="isShow" @click="isShowEmotion = false">
        <div class="comment-shape" :style="{right: right}"></div>
        <div class="comment">
            <div class="comment-head" v-if="isShowInput">
                <div class="comment-avatar">
                    <img :src="auth ? auth.HeadIcon : ''" alt="">
                </div>
                <div class="comment-input-wrap" :style="{'width': width}">
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
                <comment-item
                    v-for="(item, index) in commentList"
                    :key="item.CommentsId"
                    :commentInfo="item"
                    @submitReplay="submitReplay"
                    v-if="index < showCount"
                ></comment-item>
            </div>
            <p class="show-more" v-show="commentList.length > 3 && !isLast" @click="showMore">
                查看更多>>
            </p>
        </div>
    </div>
</template>

<script>
  import Emotion from '~/components/Emotion/index'
  import CommentItem from '~/components/video/commentItem'
  import { mapState, mapGetters } from 'vuex'
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
      },
      isShowInput: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        commentCon: '',
        isShowEmotion: false,
        showCount: 3,   // 显示几条评论
        isLast: false,
        width: '1101px',
        right: '439px'
      }
    },
    mounted() {
      if (this.$route.name === 'HeAndITribal-id') {
        this.width = '780px';
        this.right = '335px';
      }
    },
    computed: {
        ...mapState({
            auth: state => state.overas.auth
        }),
    },
    components: {
      Emotion,
      'comment-item': CommentItem
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
      },

      // 回复成功
      submitReplay(params) {
        this.$emit('submitReplay', params)
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
                position: relative;
            }
        }
    }

    .comment-shape {
        content: '';
        position: absolute;
        top: -7px;
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
