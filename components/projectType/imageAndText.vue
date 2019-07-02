<template>
    <div>
        <div class="public-block" :class="{'comment-active': isShowComment}">
            <div class="block-head">
                <div class="block-head-left">
                    <div class="avatar">
                        <img :src="itemInfo.HeadIcon" alt="">
                    </div>
                    <div class="info">
                        <p class="name">{{ itemInfo.NickName }}</p>
                        <p class="time">{{ itemInfo.CreateDate }}</p>
                    </div>
                </div>
                <div class="block-head-right">
                    <Dropdown placement="bottom-end" trigger="click">
                        <a href="javascript:void(0)">
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem>帮上头条</DropdownItem>
                            <DropdownItem>投诉</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div class="content">
                <p v-if="itemInfo.TalkType !== 3">{{ itemInfo.TalkContent }}</p>
                <div v-if="itemInfo.TalkType === 3" class="ql-editor detail-text" v-html="itemInfo.TalkContent"></div>
                <div class="photo-wrap">
                    <div class="img" v-for="(item, imgIndex) in itemInfo.Imgs" :key="imgIndex">
                        <img :src="fileBaseUrl + item.smallImgUrl" alt="">
                    </div>
                </div>
            </div>
            <div class="block-foot" @click.stop="">
                <div class="foot-child">
                    <i
                        class="icon iconfont"
                        v-show="!itemInfo.itemOperateData.IsCollection"
                        @click="clickCollection(true)"
                    >&#xe696;</i>
                    <i class="icon iconfont"
                       style="color: #ff3c00; font-size: 17px;"
                       v-show="itemInfo.itemOperateData.IsCollection"
                       @click="clickCollection(false)"
                    >&#xe69d;</i>
                    <span :class="{ active: itemInfo.itemOperateData.IsCollection }">收藏</span>
                </div>
                <div class="foot-child">
                    <i class="icon iconfont">&#xe6be;</i>
                    <span>{{ itemInfo.itemOperateData.ShareCount }}</span>
                </div>
                <div class="foot-child" @click="clickComment">
                    <i class="icon iconfont">&#xe664;</i>
                    <span>评论</span>
                </div>
                <div class="foot-child">
                    <i
                        class="icon iconfont"
                        v-show="!itemInfo.itemOperateData.IsLike"
                        @click="clickLike(true)"
                    >&#xe67e;</i>
                    <i
                        class="icon iconfont"
                        style="color: #ff3c00;"
                        v-show="itemInfo.itemOperateData.IsLike"
                        @click="clickLike(false)"
                    >&#xe621;</i>
                    <span :class="{ active: itemInfo.itemOperateData.IsLike }">点赞</span>
                </div>
            </div>
        </div>
        <v-comment
            :isShow="isShowComment"
            :itemId="itemInfo.ItemId"
            :commentList="commentList"
            :isShowLoading="isLoadingComment"
            @submitComment="submitComment"
            @submitReplay="submitReplay"
            @submitLike="submitLike"
        ></v-comment>
    </div>
</template>

<script>
  import Comment from '../video/comment'
  import { setComments, setthumbsUp } from '../../service/clientAPI'

  export default {
    props: {
      itemInfo: {
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
      'v-comment': Comment
    },
    data() {
      return {
        fileBaseUrl: process.env.fileBaseUrl,
        isShowComment: false,    // 是否显示评论
        commentList: [], // 评论列表
        isLoadingComment: false,    // 是否显示评论加载中的动画
      }
    },

    methods: {
      // 收藏
      clickCollection(flag) {
        this.$emit('clickCollection', this.index, flag)
      },

      // 赞
      clickLike(flag) {
        this.$emit('clickLike', this.index, flag)
      },

      // 点击弹出详情
      clickVideo() {
        this.$emit('clickVideo', this.itemInfo, this.index);
      },

      // 点击评论
      clickComment() {
        if (this.isShowComment) {
          this.isShowComment = false;
          return false;
        }

        this.isShowComment = true;
        this.isLoadingComment = true;
        this.getComment();
      },

      // 获取评论
      getComment() {
        this.$store.dispatch('getGetComments', {
          ItemId: this.itemInfo.ItemId,
          ScopeType: 2
        }).then(res => {
          this.isLoadingComment = false;
          this.commentList = res;
        })
      },

      // 评论
      submitComment(content) {
        this.isLoadingComment = true;
        setComments({
          ItemId: this.itemInfo.ItemId,
          ReplyId: '',
          ReplyUserId: '',
          IsReply: false,
          Message: content,
          ItemImgSrc: '',
          ScopeType: 2
        }).then(res => {
          this.$Message.success('评论成功');
          this.getComment();
        })
      },

      // 回复
      submitReplay(params) {
        this.isLoadingComment = true;
        setComments({
          ItemId: this.itemInfo.ItemId,
          ReplyId: params.commentsId,
          ReplyUserId: params.userId,
          IsReply: true,
          Message: params.content,
          ItemImgSrc: '',
          ScopeType: 2
        }).then(res => {
          // this.$Message.success('评论成功');
          this.getComment();
        })
      },

      // 点赞回复
      submitLike(obj) {
        setthumbsUp({
          ItemId: this.itemInfo.ItemId,
          LikeType: 0,
          CommentsId: obj.commentsId,
          IsDelete: !obj.flag
        })
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "~assets/css/ModulesStyle/index.less";

    .photos-wrap {
        width: 700px;
        display: flex;
        flex-wrap: wrap;

        .img {
            width: 220px;
            height: 220px;
            margin: 10px 10px 0 0;
            background-color: #ccc;
        }
    }
</style>

