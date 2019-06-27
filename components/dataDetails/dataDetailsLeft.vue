<template>
  <div class="data-details-left">
    <div style="width：800px" id="detaDetails" v-html="detaDetails.ItemContentBefore"></div>
     <div class="view-box-model" v-show="isShowViewBox">
        <div class="view-box">
          <div id="view"></div>
          <div class="view-box-right">
            <!-- <div class="docs-buttons">
              <button type="button" class="btn btn-primary" data-enable="inline" data-method="zoom" data-target="#zoomRatio" title="Zoom the image">Zoom</button>
            </div> -->
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
            <!-- :discussData="comments" -->
            <discuss/>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';
  import discuss from '../comments/discuss'
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
      }
    },
    data() {
      return {
        isShowViewBox: false,
        Viewer: {}
      }
    },
    components: {
      discuss
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
            // inline: false,
            toolbar: false,
            title: false,
            zoomRatio: 0.4,
            backdrop: false,
            loading: false,
            url: 'data-original',
            parent: document.getElementById('view'),
            container: document.getElementById('view'),
            show: function (e) {
              _this.isShowViewBox = true;
            },
            ready: function () {
              // _this.Viewer.update()
              _this.initViewButton()
              console.log('ready')
            },
            build: function () {
              console.log('build')
            },
            built: function () {
              console.log('built')
            },
            view: function () {
              console.log('view')
              console.log(document.querySelector('.viewer-canvas img').src)
            },
            shown: function () {
              console.log('shown')
              _this.Viewer.update();
              console.log(document.querySelector('.viewer-canvas img'))
            },
            hidden () {
              _this.viewShowBox()
            }
          })
        })
      },
      initViewButton () {
        let _this = this;
        let buttons = document.querySelector('.docs-buttons');
        let toggles = document.querySelector('.docs-toggles');
        buttons.onclick = function (event) {
          let e = event || window.event;
          let button = e.target || e.srcElement;
          let method = button.getAttribute('data-method');
          let target = button.getAttribute('data-target');
          let args = JSON.parse(button.getAttribute('data-arguments')) || [];
          document.querySelector(target)
          if (_this.Viewer && method) {
            if (target) {
              // _this.Viewer[method](document.querySelector(target).value);
            } else {
              _this.Viewer['zoom']();
            }

            // switch (method) {
            //   case 'scaleX':
            //   case 'scaleY':
            //     args[0] = -args[0];
            //     break;

            //   case 'destroy':
            //     _this.Viewer = null;
            //     // toggleButtons('none');
            //     break;
            // }
          }
        };
        // let args = JSON.parse(button.getAttribute('data-arguments')) || [];
        console.log(buttons)
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
    background: rgba(0,0,0, .3)
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
    left: 50%;
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
  .viewer-fixed {
    position: absolute;
  }
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
   
</style>
