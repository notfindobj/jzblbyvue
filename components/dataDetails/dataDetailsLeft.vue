<template>
    <div class="data-details-left">
        <div :class="isBtnSile ? 'view-left-move': 'view-left-move-del'" @mouseenter="mousemoveLeft(1)"
             @mouseleave="mousemoveRight" @click="moveLeftClick(isBtnSile ? 1 : pageTurning.PrevItemId)">
            <img :src="!isLeft ? isLeftPngF : isLeftPngR" width="50px" alt="">
        </div>
        <div :class="isBtnSile ? 'view-right-move': 'view-right-move-del'" @mouseenter="mousemoveLeft(2)"
             @mouseleave="mousemoveRight" @click="moveLeftClick(isBtnSile ? 2 : pageTurning.NextItemId)">
            <img class="moveRight" :src="!isRight ? isLeftPngF : isLeftPngR" width="50px" alt="">
        </div>
        <div style="width：800px" id="detaDetails" v-html="detaDetails.ItemContentBefore"></div>
    </div>
</template>
<script>
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';
  import { async } from 'q';

  export default {
    name: 'detaDetailsLeft',
    props: {
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
        itemLength: 0,
        itemIndex: 0,
        isBtnSile: false
      }
    },
    asyncData() {
    },
    created() {
    },
    mounted() {
      this.initView()
    },
    methods: {
      initView() {
        const ViewerDom = document.getElementById('detaDetails');
        let _this = this;
        _this.$nextTick(() => {
          _this.Viewer = new Viewer(ViewerDom, {
            url: 'data-original',
            button: false,
            toolbar: true,
            navbar: true,
            title: false,
            zoomRatio: 0.4,
            maxZoomRatio: 3,
            show: function (e) {
              _this.isShowViewBox = true;
            },
            view: function (e) {
              _this.itemLength = document.querySelectorAll('.viewer-list > li').length;
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
              _this.viewShowBox()
            }
          })
        })
      },
      moveLeftClick(val) {
        if (!this.isBtnSile) {
          this.$emit('pageTurning', val)
        } else {
          if (val === 2) {
            if (this.itemLength - 1 === this.itemIndex) {
              this.Viewer.close();
              this.Viewer.hide();
            } else {
              this.Viewer.next()
            } 
          }
          if (val === 1) {
            if (this.itemIndex === 0) {
              this.Viewer.close();
              this.Viewer.hide();
            } else {
              this.Viewer.prev()
            }
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
      viewShowBox() {
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

    .data-details-left {
        width: 850px;
        overflow: hidden;
    }

    .view-box-model {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 1999;
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
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }

    #view {
        width: 900px;
        height: 600px;
        position: relative;
        background: rgba(0, 0, 0, .6)
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
                text-align: justify;
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
          height: 100%;
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

        }
    }

    .viewer-toolbar {
        display: none;
    }

    .moveRight {
        transform: rotate(180deg);
        // right: 260px;
    }
</style>
