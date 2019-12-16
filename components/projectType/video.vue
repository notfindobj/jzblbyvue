<template>
    <div>
      <!-- :class="{'comment-active': videoInfo.isShowComment}" -->
        <div class="public-block" >
            <div class="block-head">
                <div class="block-head-left" @mouseleave="hideWorks()">
                    <div class="avatar" @mouseenter="showWorks(videoInfo.UserId, videoInfo.ItemId, 1)">
                        <img @click="goToPersonal(videoInfo)" :src="videoInfo.HeadIcon" alt="">
                    </div>
                    <div class="info">
                        <div>
                          <p class="name">{{videoInfo.NickName }}</p>
                          <p class="time">{{videoInfo.CreateDate}}</p>
                        </div>
                        <div class="info-lable">
                          <span v-if="videoInfo.TalkType === 2">视频</span>
                          <span v-if="videoInfo.TalkType === 6">小视频</span>
                          <span v-if="videoInfo.IsOriginal">原创</span>
                        </div>
                    </div>
                </div>
                <div class="tool-box" v-if="isTool === videoInfo.ItemId" @mouseenter="showWorks(videoInfo.UserId, videoInfo.ItemId, 0)" @mouseleave="hideWorks()">
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
                   <Dropdown placement="bottom-end" v-if="videoInfo.itemBindOperat">
                        <a href="javascript:void(0)"><Icon type="ios-arrow-down"></Icon></a>
                        <DropdownMenu slot="list" >
                            <DropdownItem v-for="(items, indexs) in videoInfo.itemBindOperat.ItemOperatBtns" :key="indexs" @click.native="dropdownMenu(videoInfo, items, index)">{{items.OperatName}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <!-- 视频内容 -->
            <div class="content">
                <p  @click="goPictureDetails(videoInfo)" class="detail-picture"><emotHtml v-model="videoInfo.TalkTitle"/></p>
                <div class="video-wrap" >
                    <div class="photo-wrap">
                        <div class="video" @click.stop="" v-if="videoInfo.ResourceObj.length > 0">
                          <videos :itemVideo="videoInfo.ResourceObj[0] || {}" :detaDetails="videoInfo" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="block-foot" @click.stop="">
                <div class="foot-child">
                    <span @click="clickCollection(videoInfo)">
                      <i :class="videoInfo.itemOperateData.IsCollection ? 'icon iconfont active-tool icon-cc-star': 'icon iconfont  icon-favorite'"></i>
                      <span :class="{ active: videoInfo.itemOperateData.IsCollection}">收藏 {{videoInfo.itemOperateData.CollectionCount}}</span>
                    </span>
                </div>
                <div class="foot-child">
                    <span @click="textShare(videoInfo)">
                      <i class="icon iconfont">&#xe6be;</i>
                      <span>{{ videoInfo.itemOperateData.ShareCount }}</span>
                    </span>
                </div>
                <div :class="toolIndex === 0 ? 'foot-child tool-jian' : 'foot-child'">
                  <span @click="clickComment(0)">
                    <i class="icon iconfont">&#xe664;</i>
                    <span>评论 {{videoInfo.itemOperateData.CommentCount}}</span>
                  </span>
                </div>
                <div class="foot-child">
                  <span @click="clickLike(videoInfo)">
                    <i :class="videoInfo.itemOperateData.IsLike ? 'icon iconfont active-tool icon-like-b' : 'icon iconfont icon-dianzan1'"></i>
                    <span :class="{ active: videoInfo.itemOperateData.IsLike }">点赞 {{videoInfo.itemOperateData.LikeCount}}</span>
                  </span>
                </div>
            </div>
        </div>
        <div class="commentTool">
          <commentTool ref="commentTool" :viewMore="5" :itemInfo="videoInfo" v-show="videoInfo.isShowComment" />
        </div>
        <share :config="configModal" :qrcodeContent="qrcodeContent"/>
    </div>
</template>

<script>
  import share from '../share'
  import commentTool from '../commentTool'
  import { analogJump } from '../../plugins/untils/public'
  import { setComments, setthumbsUp , setCollection, getUserProAndFans, setFollow, delComment} from '../../service/clientAPI'
  import { mapGetters} from 'vuex'
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
      share,
      commentTool
    },
    computed: {
      ...mapGetters(['isLogin'])
    },
    data() {
      return {
        fileBaseUrl: process.env.fileBaseUrl,
        isTool: '',
        UserProAndFans: {},
        commentList: [], // 评论列表
        isLoadingComment: false,    // 是否显示评论加载中的动画
        qrcodeContent: {},
        configModal: {
          isModal: false
        },
        toolIndex: null
      }
    },
    methods: {
      goPictureDetails (row) {
        let routeData = this.$router.resolve({
              name: 'videoDetails-id',
              params: {id: row.ItemId }
          })
        analogJump(routeData.href);
      },
      async delComments (row) {
        let msg = await delComment(row.CommentsId)
        if (msg) {
            this.getComment()
        }
      },
      dropdownMenu (row, item, index) {
        this.$emit('clickMenu', row, item, index);
      },
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
          let reg = RegExp(/\http:\/\//);
          if(str && str.match(reg)){
            return str
          } else {
            return this.fileBaseUrl+ str
          }
      },
      // 跳转部落
      goToPersonal (row) {
        let routeData = this.$router.resolve({ name: 'HeAndITribal-id', query: {id: row.UserId} });
        analogJump(routeData.href);
      },
      // 关注
      async worksFocus(item) {
        if (!this.isLogin) {
          this.$store.dispatch('SETUP', true);
          this.$store.dispatch('LOGGEDIN', 'signIn');
          return false
        }
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
      async clickCollection(row) {
        if (!this.isLogin) {
          this.$store.dispatch('SETUP', true);
          this.$store.dispatch('LOGGEDIN', 'signIn');
          return false
        }
        let queryData = {
            ItemId: row.ItemId,
            TalkType: 2,
            IsDelete: row.itemOperateData.IsCollection
        }
        let collectionMsg = await setCollection(queryData);
        if (collectionMsg) {
              if (row.itemOperateData.IsCollection) {
                this.$set(row.itemOperateData, 'CollectionCount', row.itemOperateData.CollectionCount - 1)
            } else {
                this.$set(row.itemOperateData, 'CollectionCount', row.itemOperateData.CollectionCount + 1)
            }
            this.$set(row.itemOperateData, 'IsCollection', !row.itemOperateData.IsCollection)
        }
      },
      // 项目点赞
      async clickLike(row) {
        if (!this.isLogin) {
          this.$store.dispatch('SETUP', true);
          this.$store.dispatch('LOGGEDIN', 'signIn');
          return false
        }
        let queryData = {
            ItemId: row.ItemId,
            LikeType: 1,
            IsDelete: row.itemOperateData.IsLike
        }
        let thumbsUpMsg = await setthumbsUp(queryData);
        if (thumbsUpMsg) {
          if (row.itemOperateData.IsLike) {
            this.$set(row.itemOperateData, 'LikeCount', row.itemOperateData.LikeCount - 1)
          } else {
            this.$set(row.itemOperateData, 'LikeCount', row.itemOperateData.LikeCount + 1)
          }
          this.$set(row.itemOperateData, 'IsLike', !row.itemOperateData.IsLike)
        }
      },
      // 转发
      textShare (row) {
        this.qrcodeContent = row;
        this.configModal.isModal = true
      },
      // 点击评论
      clickComment(m) {
        if (this.videoInfo.isShowComment) {
          this.toolIndex = null
          this.$set(this.videoInfo, 'isShowComment', false);
          return false;
        }
        this.$set(this.videoInfo, 'isShowComment', true);
        this.toolIndex = m
        this.$refs.commentTool.getCommentsList()
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
    }
  }
</script>

<style lang="less" scoped>
  @import "~assets/css/ModulesStyle/index.less";
  .info {
      display: flex;
    }
    .info-lable {
      display: flex;
      align-items: flex-end;
      span {
        margin-left: 10px;
        margin-bottom: 5px;
        color: #f55e02;
        background-color: #ffe9da;
        padding: 1px 5px;
        border-radius: 2px;
      }
    }
  .tool-jian {
      position: relative;
      &::after {
        position: absolute;
        bottom: -26px;
        border-radius: 3px;
        left: 50%;
        width: 20px;
        height: 20px;
        background: #f7f7f7;
        content: '';
        transform: rotate(45deg) translateX(-50%);
      }
    }
  .commentTool {
      padding: 0 25px;
      background: #fff;
  }
  .active-tool {
    color: #ff3c00;
  }
  .detail-picture {
      cursor: pointer;
    }
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
    z-index: 1;
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
