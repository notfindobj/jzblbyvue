<template>
  <div class="data-details-left">
    <div style="width：800px" id="detaDetails" v-html="detaDetails.ItemContentBefore"></div>
    <div :class="isBtnSile ? 'view-left-move': 'view-left-move-del'" @mouseenter="mousemoveLeft(1)" @mouseleave="mousemoveRight" @click="moveLeftClick(isBtnSile ? 1 : pageTurning.PrevItemId)">
      <img :src="!isLeft ? isLeftPngF : isLeftPngR"   width="50px" alt="">
    </div>
    <div :class="isBtnSile ? 'view-right-move': 'view-right-move-del'" @mouseenter="mousemoveLeft(2)" @mouseleave="mousemoveRight"  @click="moveLeftClick(isBtnSile ? 2 : pageTurning.NextItemId)" >
      <img class="moveRight" :src="!isRight ? isLeftPngF : isLeftPngR" width="50px" alt="">
    </div>
     <!-- <div class="view-box-model" v-show="isShowViewBox">
        <div class="view-box">
          <div class="view-left-move" @mouseenter="mousemoveLeft(1)" @mouseleave="mousemoveRight" >
            <img :class="!isLeft ? 'isHide' : 'isShow'" src="../../assets/images/leftButton.png"  @click="moveLeftClick(1)" width="50px" alt="">
          </div>
          <div class="view-right-move" @mouseenter="mousemoveLeft(2)" @mouseleave="mousemoveRight">
            <img :class="!isRight ? 'isHide moveRight' : 'isShow moveRight'" src="../../assets/images/leftButton.png"  @click="moveLeftClick(2)" width="50px" alt="">
          </div>
          <div id="view"></div>
          <div class="view-box-right">
            <div class="details-box">
              <div class="details-box-img">
                <div class="details-box-img-img"></div>
                <div class="details-box-img-right">
                  <p>{{detaDetails.ItemName}}</p>
                  <p>发布日期：{{detaDetails.CreateDate}}</p>
                </div>
              </div>
              <ul>
                <li class="details-box-list" v-for="(items, index) in attribute" :key="index">
                  <span class="details-box-list-title">{{items.ItemAttributesFullName}}</span>
                  <span class="details-box-list-content">{{items.ItemSubAttributeFullName}}</span>
                </li>
              </ul>
            </div>
            <commentsCon 
              :publish="detaDetails"
              :comments="[]"
              @thumbsUp="thumbsUp"
              @Collection="Collection"
              @commentValue="commentValue"
            />
            <discuss/>
          </div>
        </div>
      </div> -->
  </div>
</template>
<script>
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import discuss from '../comments/discuss'
import commentsCon from '../comments/commentsCon'
import { setthumbsUp, setCollection, getComments, setComments } from '../../service/clientAPI'
import { async } from 'q';
export default {
  name: 'detaDetailsLeft',
  props:{
    detaDetails: {
      type: Object,
      required: true,
      default: function () {
        return {}
      }
    },
    attribute: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    pageTurning: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      isShowViewBox: false,
      isLeftPngF: require('../../assets/images/leftButtonColor.png'),
      isLeftPngR: require('../../assets/images/leftButton.png'),
      isLeft: false,
      isRight: false,
      Viewer: {},
      isBtnSile: false
    }
  },
  components: {
    discuss,
    commentsCon
  },
  asyncData() {
  },
  created() {},
  mounted () {
    this.initView()
    // this.initViewButton()
  },
  methods: {
    initView () {
      const ViewerDom = document.getElementById('detaDetails');
      let _this = this;
      _this.$nextTick(() => {
          _this.Viewer =  new Viewer(ViewerDom, {
            url: 'data-original',
            button: false,
            toolbar: true,
            navbar: true,
            title: false,
          // inline: false,
            zoomRatio: 0.4,
            maxZoomRatio: 3,
          // backdrop: false,
          // loading: false,
          // parent: document.getElementById('view'),
          // container: document.getElementById('view'),
          show: function (e) {
            _this.isShowViewBox = true;
          },
          ready: function () {
            // document.querySelector('.viewer-close').onmouseover();
            console.log('ready')
          },
          build: function () {
            console.log('build')
          },
          built: function () {
            console.log('built')
          },
          view: async function () {
            let ItemImgSrc = document.querySelector('.viewer-canvas img').src;
            let queryData = {
              ItemId: _this.detaDetails.ItemId,
              ItemImgSrc: '',
              ScopeType: 1
            }
          },
          shown: function (e) {
            _this.isBtnSile = true;
            var that = e.target.viewer;
            $(e.target.viewer.viewer).find(".viewer-canvas").on("dblclick", "img", function () {
              that.hide();
            });
          },
          hidden () {
            _this.isBtnSile = false;
            _this.viewShowBox()
          }
        })
      })
    },
    moveLeftClick (val) {
      if (!this.isBtnSile) {
        this.$emit('pageTurning', val)
      } else {
        if (val === 1) {
          document.querySelector('.viewer-prev').click()
        } else {
          document.querySelector('.viewer-next').click()
        }
      }
      
      
    },
    // 项目点赞
    async thumbsUp(item) {
      let queryData = {
        ItemId: item.ItemId,
        LikeType: 1,
        IsDelete: item.islikes
      }
      let thumbsUpMsg = await setthumbsUp(queryData);
      if (item.islikes) {
        this.$set(item, 'likes', item.likes - 1)
      } else {
        this.$set(item, 'likes', item.likes + 1)
      }
      this.$set(item, 'islikes', !item.islikes)
    },
      // 收藏
    async Collection(item) {
      let queryData = {
        ItemId: item.ItemId,
        TalkType: 4,
        IsDelete: item.iscollections
      }
      let collectionMsg = await setCollection(queryData)
      if (item.iscollections) {
        this.$set(item, 'collections', item.collections - 1)
      } else {
        this.$set(item, 'collections', item.collections + 1)
      }
      this.$set(item, 'iscollections', !item.iscollections)
    },
    //评论
    async commentValue(row, val) {
      let queryData = {
        ItemId: row.ItemId,
        IsReply: false,
        Message: val,
        ScopeType: 0
      }
      let commentMsg = await setComments(queryData)
      if (!commentMsg) {
        this.$set(row, 'commentss', row.commentss + 1)
      }
    },
    mousemoveLeft () {
      this.isLeft = true
      this.isRight = true
    },
    mousemoveRight () {
      this.isLeft = false
      this.isRight = false
    },
    viewShowBox () {
      document.getElementsByTagName('body')[0].className = '';
      document.body.style.paddingRight = '0';
      this.isShowViewBox = false;
    }
  }
}
</script>
<style lang="less">
  .isHide {
    display: none;
  }
  .isShow {
    display: inline-block;
  }
  .data-details-left{
    width: 850px;
    overflow: hidden;
  }
  .view-box-model {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background: rgba(0,0,0, .3);
    z-index: 999;
  }
  .view-pointer {
    cursor: pointer;
    display: inline-block;
    position: absolute;
    right: 0;
  }
  .viewer-container {
    overflow: inherit;
  }
  .viewer-button {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    cursor: pointer;
    height: 30px;
    overflow: hidden;
    position: absolute;
    right: -313px;
    top: -15px;
    -webkit-transition: background-color 0.15s;
    transition: background-color 0.15s;
    width: 30px;
  }
  .viewer-button::before {
    bottom: 5px;
    left: 5px;
    position: absolute;
  }
  .view-box {
    position: fixed;
    width: 1200px;
    height: 600px;
    z-index: 99;
    top: 50%;
    left: 49.5%;
    transform: translate(-50%, -50%);
    display: flex;
  }
  .view-box-right {
    width: 300px;
    background: #F5F6F5;
  }
  #view {
    width: 900px;
    height: 600px;
    position: relative;
    background: rgba(0,0,0, .6)
  }
  // .viewer-fixed {
  //   position: absolute;
  // }
  .details-box {
    width: 270px;
    background: #ffffff;
    padding: 0 15px;
    font-size: 12px;
    margin: 20px auto;
    border-radius: 5px;
    ul {
      padding-bottom: 10px;
    }
    &-img {
      display: flex;
      padding: 10px 0;
      &-img {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #dddddd;
      }
      &-right {
        margin-left: 10px;
        height: 40px;
      }
    }
    &-list {
      height: 20px;
      &-title {
        width: 60px;
        display: inline-block;
        text-align:justify;
        height: 20px;
      }
      &-title:after {
        content: '';
        width: 100%;
        display: inline-block;
      }
      &-content {
        width: 170px;
        padding-left: 10px;
        display: inline-block;
        height: 20px;
      }
      &-content:after {
        content: '';
        width: 100%;
        display: inline-block;
      }
    }
  }
  #detaDetails {
    padding-right: 10px;
    img {
      width: 100%;
    }
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
      width: 80px;
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
    >img {
     
      width: 80px;
     
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
    >img {
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
    >img {
      top: 50%;
      width: 80px;
      position: relative;
     
    }
  }
  .viewer-toolbar {
    display: none;
  }
  .moveRight {
    transform:rotate(180deg);
    // right: 260px;
  }
</style>
