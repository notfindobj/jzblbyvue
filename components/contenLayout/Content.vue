<template>
  <div class="content-box">
    <ul class="content-screening-list">
      <li class="li-active">最新上传</li>
      <li>人气</li>
      <li>下载</li>
      <li>收藏</li>
    </ul>
    <!--建筑规范之外的布局 四列-->
    <div v-if="show" class="works-list_box">
      <ul class="works-list">
        <li @mouseleave="hideWorks()" v-for="items in 8" :key="items">
          <div class="img-box">
            <img src="../../assets/images/worksImg.png" alt="">
            <div class="works-like">
              <p>
                <i class="icon iconfont icon-chakan"></i>35588
              </p>
              <p>
                <i class="icon iconfont icon-favorite"></i>收藏
              </p>
            </div>
          </div>
          <div class="works-introduce">
            <p>广东江门龙溪湖设计示范区</p>
            <div>
              <img @mouseenter="showWorks(0)" src="../../assets/images/a.jpeg" alt="">
              <span>
              杨小幂
              </span>
            </div>
          </div>
          <div :class="currentWorks == 0 ? 'works-active' : ''" class="works-con"  @mouseleave="hideWorks()">
            <img src="../../assets/images/a.jpeg" alt="">
            <p>梅赛德斯·赵四</p>
            <ul class="works-con-introduce">
              <li>
                <p>项目</p>
                <p>1334</p>
              </li>
              <li>
                <p>粉丝</p>
                <p>1.3万</p>
              </li>
            </ul>
            <div class="btn-group-box">
              <div @click="focus()">关注</div>
              <div @click="direct()">私信</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!--建筑规范的布局两列-->
    <div  class="works-list-box" v-else>
      <ul class="works-list-change">
        <li>
          <div class="works-list-left"></div>
          <div class="works-list-right">
            <p>《建筑设计防火规范》GB50016-2019(2018版)</p>
            <div class="works-list-con">
              <div class="works-name">
                <img src="" alt="">
                <span>杨小幂</span>
              </div>

              <div class="works-list-con-box">
                <i class="icon iconfont icon-chakan"></i>
                <span>888</span>
                <i class="icon iconfont icon-favorite"></i>
                <span>6666</span>
              </div>
            </div>
          </div>
          <div class="works-con">
            <img src="../../assets/images/a.jpeg" alt="">
            <p>梅赛德斯·赵四</p>
            <ul class="works-con-introduce">
              <li>
                <p>项目</p>
                <p>1334</p>
              </li>
              <li>
                <p>粉丝</p>
                <p>1.3万</p>
              </li>
            </ul>
            <div class="btn-group-box">
              <div>关注</div>
              <div>私信</div>
            </div>
          </div>
        </li>
        <li>
          <div class="works-list-left"></div>
          <div class="works-list-right">
            <p>《建筑设计防火规范》GB50016-2019(2018版)</p>
            <div class="works-list-con">
              <div class="works-name">
                <img src="" alt="">
                <span>杨小幂</span>
              </div>

              <div class="works-list-con-box">
                <i class="icon iconfont icon-chakan"></i>
                <span>888</span>
                <i class="icon iconfont icon-favorite"></i>
                <span>6666</span>
              </div>
            </div>
          </div>

        </li>
        <li>
          <div class="works-list-left"></div>
          <div class="works-list-right">
            <p>《建筑设计防火规范》GB50016-2019(2018版)</p>
            <div class="works-list-con">
              <div class="works-name">
                <img src="" alt="">
                <span>杨小幂</span>
              </div>

              <div class="works-list-con-box">
                <i class="icon iconfont icon-chakan"></i>
                <span>888</span>
                <i class="icon iconfont icon-favorite"></i>
                <span>6666</span>
              </div>
            </div>
          </div>

        </li>
        <li>
          <div class="works-list-left"></div>
          <div class="works-list-right">
            <p>《建筑设计防火规范》GB50016-2019(2018版)</p>
            <div class="works-list-con">
              <div class="works-name">
                <img src="" alt="">
                <span>杨小幂</span>
              </div>

              <div class="works-list-con-box">
                <i class="icon iconfont icon-chakan"></i>
                <span>888</span>
                <i class="icon iconfont icon-favorite"></i>
                <span>6666</span>
              </div>
            </div>
          </div>

        </li>
      </ul>
    </div>
    <Page :total="100" show-sizer />
  </div>
</template>

<script>
  export default {
    name: 'conten',
    data() {
      return {
        show:true,
        currentWorks:null
      }
    },
    mounted() {
    },
    methods: {
      showWorks (inx) {
        this.currentWorks = inx;
      },
      hideWorks () {
        this.currentWorks = null;
      },
      focus(){
        this.currentWorks = null;
      },
      direct() {
        this.currentWorks = null;
      }
    },
  }
</script>
<style lang="less" scoped>
  .clearfix() {
    &:before,
    &:after {
      content: " ";
      display: table;
    }
    &:after {
      clear: both;
    }
  }
  .content-box{
    width: 100%;
    height: auto;
    .content-screening-list{
      display: flex;
      flex-direction: row;
      margin-bottom: 23px;
      >li{
        line-height: 20px;
        font-size: 14px;
        color: #666666;
        margin-right: 36px;
      }
      .li-active{
        color: #ED1B24;
        font-weight: 500;
        position: relative;
        &:before{
          width: 30px;
          height: 1px;
          content: '';
          background: #ED1B24;
          border-radius: 2px;
          position: absolute;
          left: 50%;
          bottom:-2px;
          transform: translateX(-50%);
        }
      }
    }
    .works-list-box{
      width: 100%;
      height: auto;
    }
    .works-list{
      width: 100%;
      .clearfix();
      >li{
        float: left;
        width: 292px;
        height: 266px;
        background: #FFFFFF;
        box-shadow: 0 2px 20px 0 rgba(0,0,0,0.15);
        border-radius: 4px;
        margin-right: 10px;
        margin-bottom: 20px;
        position: relative;
        &:nth-child(4n){
          margin-right: 0;
        }
        .img-box{
          height: 200px;
          position: relative;
          >img{
            display: inline-block;
            width: 100%;
            height: auto;
          }
          .works-like{
            width: 100%;
            height: 40px;
            padding-top: 16px;
            padding-left: 6px;
            padding-right: 6px;
            opacity: 0.6;
            background: #000000;
            position: absolute;
            left: 0;
            bottom: 0;
            >p{
              font-size: 12px;
              color: #FFFFFF;
              >i{
                font-size: 14px;
                color: #ffffff;
                margin-right: 4px;
              }
              &:nth-child(1){
                float: left;
              }
              &:nth-child(2){
                float: right;
              }
            }
          }
        }
        .works-introduce{
          height: 66px;
          padding: 8px 0 10px 6px;
          >p{
            width: 253px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 14px;
            color: #666666;
            margin-bottom: 8px;
          }
          >div{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items:flex-start;
            img{
              display: inline-block;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              margin-right: 4px;
            }
            >span{
              font-size: 14px;
              color: #333333;
            }
          }
        }
        .works-con{
          width: 163px;
          height: 217px;
          padding: 20px 16px;
          background: #FFFFFF;
          box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
          border-radius: 4px;
          position: absolute;
          left: 45px;
          top:7px;
          display: none;
          >img{
            display: block;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: red;
            margin: 0 auto 10px;
          }
          >p{
            font-size: 14px;
            color: #333333;
            margin-bottom: 12px;
            text-align: center;
          }
          .works-con-introduce{
            height: 40px;
            margin-bottom: 12px;
            display: flex;
            flex-direction: row;
            position: relative;
            >li{
              flex: 1;
              >p{
                &:nth-child(1){
                  font-size: 12px;
                  color: #999999;
                  text-align: center;
                }
                &:nth-child(2){
                  font-size: 12px;
                  color: #333333;
                  text-align: center;
                }
              }
            }
            &:before{
              width: 2px;
              height: 20px;
              content: '';
              background: #D9D9D9;
              border-radius: 2px;
              position: absolute;
              left: 50%;
              top:10px;
              transform: translateX(-50%);
            }
          }
          .btn-group-box{
            height: 21px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            >div{
              width: 60px;
              height: 21px;
              border-radius: 4px;
              box-sizing: border-box;
              text-align: center;
              line-height: 21px;
              font-size: 12px;
              &:nth-child(1){
                color: #ffffff;
                background: #FF3C00 ;
              }
              &:nth-child(1){
                color: #ffffff;
                background: #FF3C00 ;
              }
              &:nth-child(2){
                border: 1px solid #D9D9D9;
                background: #ffffff;
                color: #666666;
              }
            }
          }
        }
        .works-active{
          display: block;
        }
      }
    }
    .works-list-change{
      width: 100%;
      .clearfix();
      >li{
        float: left;
        width: 590px;
        height: 200px;
        padding: 20px;
        background: #FFFFFF;
        box-shadow: 0 2px 20px 0 rgba(0,0,0,0.15);
        border-radius: 4px;
        margin-right: 20px;
        margin-bottom: 20px;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        &:nth-child(2n){
          margin-right: 0;
        }
        .works-list-left{
          width: 120px;
          height: 160px;
          margin-right: 20px;
          box-shadow: 0 2px 20px 0 rgba(0,0,0,0.15);;
          >img{
            display: inline-block;
            width: 100%;
            height: auto;
          }
        }
        .works-list-right{
          flex: 1;
          height: 160px;
          >p{
            width:100%;
            font-size: 16px;
            color: #333333;
            padding-bottom: 82px;
            margin-bottom: 14px;
            border-bottom: 1px solid #D9D9D9;
          }
          .works-list-con{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .works-name{
              margin-right: 236px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              >img{
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-right: 4px;
                border-radius: 50%;
                background: red;
              }
              >span{
                font-size: 14px;
                color: #666666;

              }
            }

            .works-list-con-box{
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              i{
                font-size: 14px;
                color: #666666;
                margin-right: 4px;
              }
              span{
                font-size: 12px;
                color: #666666;
                &:nth-child(2){
                  margin-right: 20px;
                }
              }
            }
          }
        }
        .works-con{
          width: 163px;
          height: 217px;
          padding: 20px 16px;
          background: #FFFFFF;
          box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
          border-radius: 4px;
          position: absolute;
          left: 45px;
          top:7px;
          display: none;
          >img{
            display: block;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: red;
            margin: 0 auto 10px;
          }
          >p{
            font-size: 14px;
            color: #333333;
            margin-bottom: 12px;
            text-align: center;
          }
          .works-con-introduce{
            height: 40px;
            margin-bottom: 12px;
            display: flex;
            flex-direction: row;
            position: relative;
            >li{
              flex: 1;
              >p{
                &:nth-child(1){
                  font-size: 12px;
                  color: #999999;
                  text-align: center;
                }
                &:nth-child(2){
                  font-size: 12px;
                  color: #333333;
                  text-align: center;
                }
              }
            }
            &:before{
              width: 2px;
              height: 20px;
              content: '';
              background: #D9D9D9;
              border-radius: 2px;
              position: absolute;
              left: 50%;
              top:10px;
              transform: translateX(-50%);
            }
          }
          .btn-group-box{
            height: 21px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            >div{
              width: 60px;
              height: 21px;
              border-radius: 4px;
              box-sizing: border-box;
              text-align: center;
              line-height: 21px;
              font-size: 12px;
              &:nth-child(1){
                color: #ffffff;
                background: #FF3C00 ;
              }
              &:nth-child(1){
                color: #ffffff;
                background: #FF3C00 ;
              }
              &:nth-child(2){
                border: 1px solid #D9D9D9;
                background: #ffffff;
                color: #666666;
              }
            }
          }
        }
      }
    }
  }
  .ivu-page{
    text-align: center;
  }
</style>
