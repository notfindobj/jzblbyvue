<template>
    <div>
        <div class="public-block" :class="{'comment-active': isShowComment}" @click="clickVideo">
            <div class="block-head">
                <div class="block-head-left">
                    <div class="avatar">
                        <img :src="videoInfo.HeadIcon" alt="">
                    </div>
                    <div class="info">
                        <p class="name">{{ videoInfo.NickName }}</p>
                        <p class="time">{{ videoInfo.CreateDate }}</p>
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
                <p>{{ videoInfo.TalkContent }}</p>
                <div class="video-wrap" v-if="videoInfo.Imgs.length > 0">
                    <div class="photo-wrap">
                        <div class="video" @click.stop="">
                            <video controls :poster="videoInfo.Imgs[0].smallImgUrl">
                                <source :src="fileBaseUrl + videoInfo.Imgs[0].videoUrl" type="video/mp4">
                                <source :src="fileBaseUrl + videoInfo.Imgs[0].videoUrl" type="video/ogg">
                                您的浏览器不支持Video标签。
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block-foot" @click.stop="">
                <div class="foot-child">
                    <i
                        class="icon iconfont"
                        v-show="!videoInfo.itemOperateData.IsCollection"
                        @click="clickCollection(true)"
                    >&#xe696;</i>
                    <i class="icon iconfont"
                       style="color: #ff3c00; font-size: 17px;"
                       v-show="videoInfo.itemOperateData.IsCollection"
                       @click="clickCollection(false)"
                    >&#xe69d;</i>
                    <span :class="{ active: videoInfo.itemOperateData.IsCollection }">收藏</span>
                </div>
                <div class="foot-child">
                    <i class="icon iconfont">&#xe6be;</i>
                    <span>{{ videoInfo.itemOperateData.ShareCount }}</span>
                </div>
                <div class="foot-child" @click="clickComment">
                    <i class="icon iconfont">&#xe664;</i>
                    <span>评论</span>
                </div>
                <div class="foot-child">
                    <i
                        class="icon iconfont"
                        v-show="!videoInfo.itemOperateData.IsLike"
                        @click="clickLike(true)"
                    >&#xe67e;</i>
                    <i
                        class="icon iconfont"
                        style="color: #ff3c00;"
                        v-show="videoInfo.itemOperateData.IsLike"
                        @click="clickLike(false)"
                    >&#xe621;</i>
                    <span :class="{ active: videoInfo.itemOperateData.IsLike }">点赞</span>
                </div>
            </div>
        </div>
        <v-comment
            :isShow="isShowComment"
            :itemId="videoInfo.ItemId"
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
      videoInfo: {
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
        this.$emit('clickVideo', this.videoInfo, this.index);
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
          ItemId: this.videoInfo.ItemId,
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
          ItemId: this.videoInfo.ItemId,
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
          ItemId: this.videoInfo.ItemId,
          ReplyId: params.commentsId,
          ReplyUserId: params.userId,
          IsReply: true,
          Message: params.content,
          ItemImgSrc: '',
          ScopeType: 2
        }).then(res => {
          this.$Message.success('评论成功');
          this.getComment();
        })
      },

      // 点赞回复
      submitLike(obj) {
        setthumbsUp({
          ItemId: this.videoInfo.ItemId,
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
</style>
