<template>
  <div class="data-details-left">
    <div style="width：800px" id="detaDetails" v-html="detaDetails.ItemContentBefore"></div>
     <div class="view-box-model" v-show="isShowViewBox">
        <div class="view-box">
          <div id="view"></div>
          <div class="view-box-right"></div>
        </div>
      </div>
  </div>
</template>

<script>
  import Viewer from 'viewerjs';
  import 'viewerjs/dist/viewer.css';
  export default {
    name: 'detaDetailsLeft',
    props:{
      detaDetails: {
        type: Object,
        required: true,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        isShowViewBox: false,
      }
    },
    components: {
    },
    asyncData() {
    },
    created() {
      // const ViewerDom = document.getElementById('detaDetails');
      // let _this = this;
      // new Viewer(ViewerDom, {
      //       inline: false,
      //       title: false,
      //       backdrop: false,
      //       container: document.getElementById('view'),
      //       show: function () {
      //         _this.isShowViewBox = true;
      //       },
      //       hidden () {
      //         _this.viewShowBox()
      //       }
      //   })
    },
    mounted () {
      const ViewerDom = document.getElementById('detaDetails');
      let _this = this;
      new Viewer(ViewerDom, {
            inline: false,
            title: false,
            backdrop: false,
            container: document.getElementById('view'),
            show: function () {
              _this.isShowViewBox = true;
            },
            hidden () {
              _this.viewShowBox()
            }
        })
    },
    methods: {
  //     getImgSrc () {
  //       const detaDetails = this.$refs.detaDetails
  //       //  = document.querySelectorAll('img[data-original]');
  //       detaDetails.addEventListener('click', () =>{
  //         let ev = ev || window.event;
  // 　　　　 let target = ev.target || ev.srcElement;
  //         if(target.nodeName.toLowerCase() == 'img'){
  //           this.src= target.src
  // 　　　　  }
  //       })
  //     },
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
    background: #ffffff;
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
</style>
