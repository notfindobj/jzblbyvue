<template>
    <div class="comment-item">
        <div class="comment-item-con">
            <div class="item-avatar" @click="goToPersonal(commentInfo)">
                <img :src="commentInfo.HeadIcon" alt="">
            </div>
            <div class="commit-item-info" :style="{width: commitWidth}">
                <div class="item-info-row1">
                    <span class="user-name">{{ commentInfo.NickName }}</span>
                    <span class="publish-time">{{ commentInfo.CreateDate }}</span>
                </div>
                <div class="comment-content">
                  <emotHtml v-model="commentInfo.Message"/>
                </div>
                <p class="opera-row">
                    <span v-if="commentInfo.IsDeleteBtn" class="discuss-footer-shcnhu" @click="delComment(commentInfo)">
                        删除
                    </span>
                    <span @click="clickReply">回复</span>
                    <span class="line-col">|</span>
                    <span  @click="clickLike(!isLike)">
                        <i class="icon iconfont" >{{!isLike ? '&#xe67e;' : '&#xe621;'}}</i>点赞
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
            @delComment="delComment"
        ></reply-item>
        <p class="show-more" v-show="commentInfo.ReplyList.length > 3 && !isLast" @click="showMore">
            查看更多>>
        </p>
    </div>
</template>

<script>
  import Reply from '../../components/video/reply'
  import ReplyItem from '../../components/video/replyItem'
  import { setComments, setthumbsUp} from '../../service/clientAPI'
  import { mapGetters} from 'vuex'
  export default {
    props: {
      commentInfo: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    computed: {
      ...mapGetters(['isLogin'])
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
        replyInputWith: 960,
        isLike: this.commentInfo.islikes
      }
    },
    methods: {
       // 删除评论
      delComment (val) {
          this.$emit('delComment', val)
      },
       // 跳转部落
      goToPersonal (row) {
        this.$router.push({
          name: 'HeAndITribal-id',
          query: {
            id: row.UserId
          }
        })
      },
      clickReply() {
        if (!this.isLogin) {
          this.$store.dispatch('SETUP', true);
          this.$store.dispatch('LOGGEDIN', 'signIn');
          return false
        }
        if (this.$route.name === 'QuestionsAndAnswers-id') {
          this.replyInputWith = 560;
        }
        this.isShowInput = !this.isShowInput;
        // if (this.commentInfo.IsCoutReply) {
        //   if (this.$route.name === 'QuestionsAndAnswers-id') {
        //     this.replyInputWith = 575;
        //   }
        //   this.isShowInput = !this.isShowInput;
        // } else {
        //   this.$Message.warning('不能回复自己！');
        //   return false;
        // }
      },
      // 点赞
      async clickLike(flag) {
        if (!this.isLogin) {
          this.$store.dispatch('SETUP', true);
          this.$store.dispatch('LOGGEDIN', 'signIn');
          return false
        }
        let queryData = {
            ItemId: this.commentInfo.ItemId,
            LikeType: 0,
            CommentsId: this.commentInfo.CommentsId,
            IsDelete: !flag
        }
        if (this.commentInfo.CommentsId) {
          let msg = await setthumbsUp(queryData);
          if (msg) {
            this.isLike = flag;
            return false
          }
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
      } else if (this.$route.name === 'HeAndITribal-id') {
        this.commitWidth = '95%';
        this.replyInputWith = 655;
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
            cursor: pointer;
            img {
                width: 100%;
                height: 100%;
            }
        }

        .item-info-row1 {
            display: flex;
            justify-content: space-between;
            padding-left: 5px;
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
          text-align: left;
            font-size: 14px;
            color: #333;
            line-height: 24px;
            padding-left:5px;
        }

        .opera-row {
            font-size: 12px;
            text-align: right;
            margin-top: 5px;
            cursor: pointer;
            i {
                font-size: 12px;
            }
            .discuss-footer-shcnhu {
                cursor: pointer;
                display: none;
            }
            &:hover .discuss-footer-shcnhu{
              display: inline-block;
              color: #FF3C00;
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
