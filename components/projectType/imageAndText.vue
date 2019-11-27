<template>
    <div>
        <div v-show="isBtnSile" class="view-left-move" @mouseenter="mousemoveLeft(1)"
            @mouseleave="mousemoveRight" @click="moveLeftClick(1)">
            <img :src="!isLeft ? isLeftPngF : isLeftPngR" width="50px" alt="">
        </div>
        <div v-show="isBtnSile" class="view-right-move" @mouseenter="mousemoveLeft(2)"
            @mouseleave="mousemoveRight" @click="moveLeftClick(2)">
            <img class="moveRight" :src="!isRight ? isLeftPngF : isLeftPngR" width="50px" alt="">
        </div>
        <div class="public-block" :class="{'comment-active': itemInfo.isShowComment}">
            <div class="block-head" @mouseleave="hideWorks()">
                <div class="block-head-left">
                    <div class="avatar" @click="goToPersonal(itemInfo)" @mouseenter="showWorks(itemInfo.UserId, itemInfo.ItemId)">
                        <img :src="itemInfo.HeadIcon" alt="" >
                    </div>
                    <div class="info">
                        <div>
                          <p class="name">{{ itemInfo.NickName }}</p>
                          <p class="time">{{ itemInfo.CreateDate }}</p>
                        </div>
                        <div class="info-lable">
                          <span v-if="itemInfo.TalkType === 1">图文</span>
                          <span v-if="itemInfo.TalkType === 3">问答</span>
                          <span v-if="itemInfo.TalkType === 5">文章</span>
                          <span v-if="itemInfo.TalkType === 4">{{itemInfo.TypeName}}</span>
                        </div>
                    </div>
                </div>
                <div class="tool-box" v-if="isTool === itemInfo.ItemId" @mouseleave="hideWorks()">
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
                    <span @click.stop="worksFocus(UserProAndFans)" :class="UserProAndFans.IsFollow ?'tool-box-unfollow': 'tool-box-follow'">{{UserProAndFans.IsFollow ? '已关注': '关注'}} </span>
                    <span class="tool-box-private">私信</span>
                  </div>
                </div>
                <div class="block-head-right" v-if="itemInfo.itemBindOperat">
                    <Dropdown placement="bottom-end" trigger="click" v-if="itemInfo.itemBindOperat.ItemOperatBtns.length > 0">
                        <a href="javascript:void(0)"><Icon type="ios-arrow-down"></Icon></a>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="(items, indexs) in itemInfo.itemBindOperat.ItemOperatBtns" :key="indexs" @click.native="dropdownMenu(itemInfo, items, index)"> {{items.OperatName}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <!-- 内容 -->
            <div class="content" >
                <div v-if="itemInfo.TalkTitle" @click="goDetail(itemInfo)" class="ql-editor detail-text qaa" v-html="itemInfo.TalkTitle"></div>
                <p v-if ="itemInfo.TalkContent && itemInfo.TalkType === 1" @click="goPictureDetails(itemInfo)" class="detail-picture" v-html="itemInfo.TalkContent"></p>
                <div v-else-if ="itemInfo.TalkContent && itemInfo.TalkType === 5" >
                  <unfold :html="itemInfo.TalkContent" :isUnfold="isUnfold" @Unfold="Unfold"/>
                </div>
                <p class="detail-content" v-else v-html="itemInfo.TalkContent"></p>
                <div class="photo-wrap " :ref="mathId">
                  <!-- 其他 -->
                    <div v-if="itemInfo.TalkType !== 5" :class="imgIndex < textLength ? 'img' : 'img itemHide'" v-for="(item, imgIndex) in itemInfo.ResourceObj" :key="imgIndex">
                      <img v-lazy="baseUrlRegExp(item.smallImgUrl)" alt="" :data-original="baseUrlRegExp(replaceImgs(item.smallImgUrl))">
                    </div>
                    <!--文章 -->
                    <template v-if="!isUnfold">
                      <div v-if="itemInfo.TalkType === 5 && imgIndex <4"  :class="imgIndex < textLength ? 'img' : 'img itemHide'" v-for="(item, imgIndex) in itemInfo.ResourceObj"  :key="imgIndex">
                        <img v-lazy="baseUrlRegExp(item.smallImgUrl)" alt="" :data-original="baseUrlRegExp(replaceImgs(item.smallImgUrl))">
                      </div>
                    </template>
                </div>
            </div>
            <!-- 搜藏工具 -->
            <div class="block-foot" @click.stop="">
                <div class="foot-child">
                    <span @click="clickCollection(!itemInfo.itemOperateData.IsCollection)">
                      <i :class="itemInfo.itemOperateData.IsCollection ? 'icon iconfont active-tool icon-cc-star': 'icon iconfont  icon-favorite'"></i>
                      <span :class="{ active: itemInfo.itemOperateData.IsCollection}">收藏 {{itemInfo.itemOperateData.CollectionCount}}</span>
                    </span>
                </div>
                <div class="foot-child">
                    <span @click="textShare(itemInfo)">
                        <i class="icon iconfont">&#xe6be;</i>
                        <span>{{ itemInfo.itemOperateData.ShareCount}}</span>
                    </span>
                </div>
                <div class="foot-child" @click="clickComment">
                    <i class="icon iconfont">&#xe664;</i>
                    <span>评论 {{itemInfo.itemOperateData.CommentCount}}</span>
                </div>
                <div class="foot-child">
                  <span @click="clickLike(!itemInfo.itemOperateData.IsLike)">
                    <i :class="itemInfo.itemOperateData.IsLike ? 'icon iconfont active-tool icon-like-b' : 'icon iconfont icon-dianzan1'"></i>
                    <span :class="{ active: itemInfo.itemOperateData.IsLike }">点赞 {{itemInfo.itemOperateData.LikeCount}}</span>
                  </span>
                </div>
            </div>
        </div>
        <v-comment
            :key="ViewerIndex"
            :isShow="itemInfo.isShowComment"
            :itemId="itemInfo.ItemId"
            :commentList="commentList"
            :isShowLoading="isLoadingComment"
            @submitComment="submitComment"
            @submitReplay="submitReplay"
            @submitLike="submitLike"
            @delComments="delComments"
        ></v-comment>
        <share :config="configModal" :qrcodeContent="qrcodeContent"/>
    </div>
</template>

<script>
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';
  import Comment from '../video/comment'
  import share from '../share'
  import unfold from '../unfold'
  import {getRanNum, analogJump} from '../../plugins/untils/public'
  import {setDemo} from '../../LocalAPI'
  import { setComments, setthumbsUp, getUserProAndFans, setFollow , delComment} from '../../service/clientAPI'
  import { mapGetters} from 'vuex'
  var name = getRanNum(5)
  export default {
    name: name,
    props: {
      textLength: {
        type: Number,
        default: 9
      },
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
      'v-comment': Comment,
      share,
      unfold
    },
    computed: {
      ...mapGetters(['isLogin']),
    },
    data() {
      let ViewerIndex = getRanNum(6)
      return {
        ViewerIndex,
        fileBaseUrl: process.env.fileBaseUrl,
        mathId: '',
        isTool: '',
        UserProAndFans: {},
        commentList: [], // 评论列表
        isLoadingComment: false,    // 是否显示评论加载中的动画
        // 左右切换
        itemIndex: 0,
        itemLength: 0,
        isBtnSile: false,
        isLeftPngF: require('../../assets/images/leftButtonColor.png'),
        isLeftPngR: require('../../assets/images/leftButton.png'),
        isLeft: false,
        isRight: false,
        qrcodeContent: {},
        configModal: {
          isModal: false
        },
        redArticle: 0,
        isUnfold: false
      }
    },
    created () {
      this.mathId = getRanNum(7);
    },
    watch: {
      itemInfo: function (val) {
        this[this.ViewerIndex].destroy();
        this.mathId = getRanNum(7);
        setTimeout(this.initView, 500);
      }
    },
    mounted () {
      this.initView()
      this.newAddBtn()
    },
    methods: {
      Unfold (val) {
        this.isUnfold = val;
      },
      newAddBtn(){
        let _this = this;
        this.$nextTick(function () {
          if (_this.$refs.redArticle) {
            _this.redArticle = _this.$refs.redArticle.offsetHeight
          }
        })
      },
      getSimpleText(html){
        // 剔除除表情后的所有标签
        var re1 = new RegExp("<(?!(img).*(data-w-e)).*?>","g");//
        var msg = html.replace(re1,'');//执行替换成空字符
        return msg;
      },
      replaceImgs (val) {
        let regex = "/i/s/";
        return val.replace(regex, "/i/");
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
      goPictureDetails (row) {
        let routeData = this.$router.resolve({
              name: 'pictureDetails-id',
              params: {id: row.ItemId }
          })
        analogJump(routeData.href);
      },
      async goDetail(row) {
        if (row.TalkType === 3) {
           let routeData = this.$router.resolve({
              name: 'QuestionsAndAnswers-id',
              params: {id: row.ItemId }
          })
          analogJump(routeData.href);
        }
        if (row.TalkType === 4) {
           // 搜索页导航数据
           let showLayout = true 
           if (row.TypeName === '文本' || row.TypeName === '建筑规范') {
              showLayout = false
            } else {
              showLayout = true
            }
            let routeData = this.$router.resolve({
                name: 'DataDetails',
                query: {id: row.ItemId, layout: showLayout }
            })
            analogJump(routeData.href);
        }
        if (row.TalkType === 5) {
          this.goPictureDetails(row)
        }
      },
      moveLeftClick(val) {
        if (val === 2) {
            if (this.itemLength - 1 === this.itemIndex) {
              this[this.ViewerIndex].close();
              this[this.ViewerIndex].hide();
            } else {
              this[this.ViewerIndex].next()
            } 
          }
        if (val === 1) {
          if (this.itemIndex === 0) {
            this[this.ViewerIndex].close();
            this[this.ViewerIndex].hide();
          } else {
            this[this.ViewerIndex].prev()
          }
        }
      },
      mousemoveLeft() {
        this.isLeft = true
        this.isRight = true
      },
      mousemoveRight() {
        this.isLeft = false
        this.isRight = false
      },
      // 获取项目和粉丝量
      async showWorks (id, ids) {
        if (!id) {
           this.$Message.error('用户ID为空！');
           return false;
        }
        let msg = await getUserProAndFans(id)
        if (msg) {
          this.isTool = ids;
          this.UserProAndFans = msg;
        }
      },
      hideWorks (id) {
        this.isTool = '';
      },
      initView() {
        const ViewerDom = document.getElementById(this.mathId);
        let _this = this;
        _this.$nextTick(() => {
          _this[_this.ViewerIndex] = new Viewer(_this.$refs[this.mathId], {
            url: 'data-original',
            button: false,
            toolbar: true,
            navbar: true,
            title: false,
            zoomRatio: 0.4,
            maxZoomRatio: 3,
            view: function(e) {
              _this.itemLength = e.target.childElementCount;
              _this.itemIndex = e.detail.index;
            },
            shown: function (e) {
              _this.isBtnSile = true;
              var that = e.target.viewer;
              $(e.target.viewer.viewer).find(".viewer-canvas").on("dblclick", "img", function () {
                that.hide();
              });
            },
            hidden() {
              _this.isBtnSile = false;
              // _this.Viewer.destroy();
              // _this.viewShowBox()
            }
          })
        })
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
        let queryData = {
            UserId: item.UserId,
            IsDelete: item.IsFollow
        };
        let collectionMsg = await setFollow(queryData)
        if (collectionMsg) {
            this.$set(item, 'IsFollow', !item.IsFollow)
        }
      },
      // 收藏
      clickCollection(flag) {
        if (!this.isLogin) {
          this.$store.dispatch('SETUP', true);
          this.$store.dispatch('LOGGEDIN', 'signIn');
          return false
        }
        this.$emit('clickCollection', this.index, flag)
      },
      // 转发
      textShare (row) {
        this.qrcodeContent = row;
        this.configModal.isModal = true;
      },
      // 赞
      clickLike(flag) {
        if (!this.isLogin) {
          this.$store.dispatch('SETUP', true);
          this.$store.dispatch('LOGGEDIN', 'signIn');
          return false
        }
        this.$emit('clickLike', this.index, flag)
      },
      // 点击弹出详情
      clickVideo() {
        this.$emit('clickVideo', this.itemInfo, this.index);
      },
      // 点击评论
      clickComment() {
        if (this.itemInfo.isShowComment) {
          this.$set(this.itemInfo, 'isShowComment', false);
          return false;
        }
        this.$set(this.itemInfo, 'isShowComment', true);
        this.isLoadingComment = true;
        this.getComment();
      },
      // 获取评论
      getComment() {
        this.$store.dispatch('getGetComments', {
          ItemId: this.itemInfo.ItemId,
          ScopeType: this.setTalkType(this.itemInfo.TalkType)
        }).then(res => {
          this.isLoadingComment = false;
          this.commentList = res;
        })
      },
      // 评论
      async submitComment(content) {
        let queryData = {
          ItemId: this.itemInfo.ItemId,
          ReplyId: '',
          ReplyUserId: '',
          IsReply: false,
          Message: content,
          ItemImgSrc: '',
          ScopeType: this.setTalkType(this.itemInfo.TalkType)
        }
        let msg = await setComments(queryData);
        if (msg) {
          this.isLoadingComment = true;
          this.$Message.success('评论成功');
          this.getComment();
        }
      },
      // 回复
      async submitReplay(params) {
        let queryData = {
          ItemId: this.itemInfo.ItemId,
          ReplyId: params.commentsId,
          ReplyUserId: params.userId,
          IsReply: true,
          Message: params.content,
          ItemImgSrc: '',
          ScopeType: this.setTalkType(this.itemInfo.TalkType)
        }
        let msg = await setComments(queryData);
        if (msg) {
          this.isLoadingComment = true;
          this.getComment();
        }
      },
      // 点赞回复
      async submitLike(obj) {
        let queryData = {
          ItemId: this.itemInfo.ItemId,
          LikeType: 0,
          CommentsId: obj.commentsId,
          IsDelete: !obj.flag
        }
        let msg = await setthumbsUp(queryData);
      },
      setTalkType (val) {
        let type = val;
        if (val === 4 ) {
          type = 0
        } 
        if (val === 1) {
          type = 2
        }
        return type
      }
    }
  }
</script>
<style lang="less" scoped>
    .unfold-picture {

    }
    .Unfold {
      color: #FF3C00;
      cursor: pointer;
    }
    .detail-content {
      img {
        max-width: 100%;
      }
    }
    .detail-picture {
      cursor: pointer;
       img[data-w-e="1"] {
         width: 22px;
       }
    }
    .itemHide {
      display: none;
    }
    .view-left-move-del {
        cursor: pointer;
        position: fixed;
        display: inline-block;
        width: 150px;
        // height: 100%;
        background: transparent;
        z-index: 8888;
        top: 50%;
        left: 0;
        padding-left: 30px;
        img {
            width: 60px;
        }
    }
    .view-right-move-del {
        cursor: pointer;
        position: fixed;
        display: inline-block;
        width: 150px;
        background: transparent;
        z-index: 8888;
        top: 50%;
        right: 0;
        text-align: right;
        padding-right: 30px;
        > img {
            width: 60px;
        }
    }
    .view-left-move {
        cursor: pointer;
        position: fixed;
        display: inline-block;
        width: 150px;
        height: 100%;
        background: transparent;
        z-index: 9999;
        top: 0;
        left: 0;
        padding-left: 30px;
        > img {
            top: 50%;
            width: 80px;
            position: relative;
        }
    }
    .view-right-move {
        cursor: pointer;
        position: fixed;
        display: inline-block;
        width: 150px;
        height: 100%;
        background: transparent;
        z-index: 9999;
        top: 0;
        right: 0;
        text-align: right;
        padding-right: 30px;
        > img {
            top: 50%;
            width: 80px;
            position: relative;
            transform: rotate(180deg);
        }
    }
  .viewer-toolbar {
        display: none;
    }
</style>
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
    .active-tool {
      color: #ff3c00;
      // font-size: 17px;
    }
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
    .qaa {
      font-size: 20px;
      font-weight: bold;
      padding: 0 0 12px 0;
      color: #000000;
      cursor: pointer;
      display: inline-block;
      position: relative;
      &:hover {
        color: #ff3c00;
        &::after {
          display: inline-block;
          position: absolute;
          content: "";
          border-bottom: 1px solid #ff3c00;
          width: 100%;
          left: 0;
          bottom: 15px;
        }
      }
    }
</style>