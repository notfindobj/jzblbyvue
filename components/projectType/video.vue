<template>
    <div>
        <div class="public-block" :class="{'comment-active': isShowComment}" @click="clickVideo">
            <div class="block-head">
                <div class="block-head-left" @mouseleave="hideWorks()">
                    <div class="avatar" @click="goToPersonal(videoInfo)" @mouseenter="showWorks(videoInfo.UserId, videoInfo.ItemId, 0)">
                        <img :src="videoInfo.HeadIcon" alt="">
                    </div>
                    <div class="info">
                        <p class="name">{{ videoInfo.NickName }}</p>
                        <p class="time">{{ videoInfo.CreateDate }}</p>
                    </div>
                </div>
                <div class="tool-box" v-if="isTool === videoInfo.ItemId" @mouseenter="showWorks(videoInfo.UserId, videoInfo.ItemId, 1)" @mouseleave="hideWorks()">
                  <div class="tool-box-top">
                   <div>
                      <p>项目</p>
                      <p>{{UserProAndFans.proCount || 0}}</p>
                    </div>
                    <div>
                      <p>粉丝</p>
                      <p>{{UserProAndFans.Fans || 0}}</p>
                    </div>
                  </div>
                  <div class="tool-box-bottom">
                    <span @click.stop="worksFocus(UserProAndFans)" :class="UserProAndFans.IsFollow ?'tool-box-unfollow': 'tool-box-follow'">{{UserProAndFans.IsFollow ? '已关注': '关注'}}</span>
                    <span class="tool-box-private">私信</span>
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
                                <source :src="baseUrlRegExp(videoInfo.Imgs[0].videoUrl)" type="video/mp4">
                                <source :src="baseUrlRegExp(videoInfo.Imgs[0].videoUrl)" type="video/ogg">
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
  import { setComments, setthumbsUp , getUserProAndFans, setFollow} from '../../service/clientAPI'

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
        isTool: '',
        UserProAndFans: {},
        isShowComment: false,    // 是否显示评论
        commentList: [], // 评论列表
        isLoadingComment: false,    // 是否显示评论加载中的动画
      }
    },
    methods: {
      // 获取项目和粉丝量
      async showWorks (id, ids, index) {
        this.isTool = ids;
        if (index === 1) {
          let msg = await getUserProAndFans(id)
          if (msg) {
            this.UserProAndFans = msg;
          }
        }
      },
      hideWorks (id) {
        this.isTool = '';
      },
      baseUrlRegExp (str) {
          let reg = RegExp(/\http:\/\/www./);
          if(str.match(reg)){
            return str
          } else {
            return this.fileBaseUrl+ str
          }
      },
      // 跳转部落
      goToPersonal (row) {
        this.$emit('goToPersonal', row)
      },
       // 关注
      async worksFocus(item) {
        let queryData = {
            UserId: item.UserId,
            IsDelete: item.IsFollow
        };
        let collectionMsg = await setFollow(queryData)
        if (collectionMsg) {
          this.$Message.success('操作成功');
          this.$set(item, 'IsFollow', !item.IsFollow);
        }
      },
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
          // this.$Message.success('评论成功');
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
     .tool-box {
      display: inline-block;
      position: absolute;
      left: 85px;
      top: 35px;
      background: #ffffff;
      width: 120px;
      height: 80px;
      border-radius: 3px;
      color: #666666;
      box-shadow: 0px 1px 6px #bbbbbb;
      &-top {
        display: flex;
        justify-content: space-around;
        margin: 5px 0;
      }
      &-bottom {
        display: flex;
        justify-content: space-around;
      }
      &-follow {
        cursor: pointer;
        background: #FF3C00;
        color: #ffffff;
        padding: 2px 5px;
        border-radius: 3px;
      }
      &-unfollow {
        cursor: pointer;
        background: #b0b0b0;
        color: #ffffff;
        padding: 2px 5px;
        border-radius: 3px;
      }
      &-private {
        cursor: pointer;
        border: 1px solid #dddddd;
        color: #666666;
        padding: 2px 5px;
        border-radius: 3px;
      }
    }
</style>
