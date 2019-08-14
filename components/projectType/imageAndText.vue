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
        <div class="public-block" :class="{'comment-active': isShowComment}">
            <div class="block-head" @mouseleave="hideWorks()">
                <div class="block-head-left">
                    <div class="avatar" @click="goToPersonal(itemInfo)" @mouseenter="showWorks(itemInfo.UserId, itemInfo.ItemId)">
                        <img :src="itemInfo.HeadIcon" alt="" >
                    </div>
                    <div class="info">
                        <p class="name">{{ itemInfo.NickName }}</p>
                        <p class="time">{{ itemInfo.CreateDate }}</p>
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
                <div class="block-head-right">
                    <Dropdown placement="bottom-end" trigger="click">
                        <a href="javascript:void(0)"><Icon type="ios-arrow-down"></Icon></a>
                        <DropdownMenu slot="list">
                            <DropdownItem>帮上头条</DropdownItem>
                            <DropdownItem>投诉</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <!-- 内容 -->
            <div class="content" >
                <p v-if="itemInfo.TalkType !== 3"><emotHtml v-model="itemInfo.TalkContent"/></p>
                <div v-if="itemInfo.TalkType === 3" class="ql-editor detail-text" v-html="itemInfo.TalkContent"></div>
                <div class="photo-wrap" :ref="mathId">
                    <div :class="imgIndex < textLength ? 'img' : 'img itemHide'" v-for="(item, imgIndex) in itemInfo.Imgs" :key="imgIndex">
                        <img :src="baseUrlRegExp(item.smallImgUrl)" alt="">
                    </div>
                </div>
            </div>
            <!-- 搜藏工具 -->
            <div class="block-foot" @click.stop="">
                <div class="foot-child">
                    <span @click="clickCollection(!itemInfo.itemOperateData.IsCollection)">
                      <i :class="itemInfo.itemOperateData.IsCollection ? 'icon iconfont active-tool icon-cc-star': 'icon iconfont  icon-favorite'"></i>
                      <span :class="{ active: itemInfo.itemOperateData.IsCollection }">收藏</span>
                    </span>
                </div>
                <div class="foot-child">
                    <span @click="textShare">
                        <i class="icon iconfont">&#xe6be;</i>
                        <span>{{ itemInfo.itemOperateData.ShareCount }}</span>
                    </span>
                </div>
                <div class="foot-child" @click="clickComment">
                    <i class="icon iconfont">&#xe664;</i>
                    <span>评论</span>
                </div>
                <div class="foot-child">
                  <span @click="clickLike(!itemInfo.itemOperateData.IsLike)">
                    <i :class="itemInfo.itemOperateData.IsLike ? 'icon iconfont active-tool icon-like-b' : 'icon iconfont icon-dianzan1'"></i>
                    <span :class="{ active: itemInfo.itemOperateData.IsLike }">点赞</span>
                  </span>
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
        <share :config="configModal"/>
    </div>
</template>

<script>
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';
  import Comment from '../video/comment'
  import share from '../share'
  import { setComments, setthumbsUp, getUserProAndFans, setFollow } from '../../service/clientAPI'
  function getRanNum(){
    let result = [];
      for(let i=0;i<8;i++){
        let ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
        result.push(String.fromCharCode(65+ranNum));
      }
    return  result.join('');
  }
  var name = getRanNum()
  export default {
    name: name,
    props: {
      textLength: {
        type: Number,
        default: 8
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
      share
    },
    data() {
      function getRanNum(){
        let result = [];
          for(let i=0;i<8;i++){
            let ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
              result.push(String.fromCharCode(65+ranNum));
          }
        return  result.join('');
      }
      let ViewerIndex = this.getRanNum()
      return {
        ViewerIndex,
        fileBaseUrl: process.env.fileBaseUrl,
        mathId: '',
        isTool: '',
        UserProAndFans: {},
        isShowComment: false,    // 是否显示评论
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
        configModal: {
          isModal: false
        }
      }
    },
    created () {
      this.mathId = this.getRanNum();
    },
    mounted () {
      this.initView()
    },
    methods: {
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
      getRanNum(){
        let result = [];
          for(let i=0;i<8;i++){
            let ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
              result.push(String.fromCharCode(65+ranNum));
          }
        return  result.join('');
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
            show: function (e) {
              console.log(e)
            },
            ready: function () {
              console.log('ready')
            },
            build: function () {
              console.log('build')
            },
            view: function(e) {
              _this.itemLength = e.target.childElementCount;
              _this.itemIndex = e.detail.index;
            },
            built: function () {
              console.log('built')
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
            this.$set(item, 'IsFollow', !item.IsFollow)
        }
      },
      // 收藏
      clickCollection(flag) {
        this.$emit('clickCollection', this.index, flag)
      },
      // 转发
      textShare () {
        this.configModal.isModal = true
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
<style lang="less">
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