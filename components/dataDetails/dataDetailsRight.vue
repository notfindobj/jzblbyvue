<template>
  <div class="data-details-right">
    <div class="data-details-right-con">
      <div class="works-info">
        <img :src="worksDatainfo.imgUrl" alt="">
        <p class="works-name">{{detaDetails.ItemName}}</p>
        <div class="focus-btn">+ 关注</div>
      </div>
      <div class="data-info">
        <p class="data-name">项目信息</p>
        <ul :class="!worksDatainfo.dataInfo.isUp ? 'data-introduce' : 'data-introduce data-introduce-active '">
          <li v-for="(item,index) in worksDatainfo.dataInfo.dataInfo_list" :key="index">
            <span>{{item.column_name}}</span>
            <span>{{item.column_info}}</span>
          </li>
        </ul>
        <i :class="worksDatainfo.dataInfo.isUp ? 'icon iconfont icon-jiantou-shang-shixin-yuanxing' : 'icon iconfont icon-xiangxiayuanjiantouxiajiantouxiangxiamianxing'" @click="unAnddown()"></i>
      </div>
      <div class="btn-group">
        <div @click="immediatelyDown()">立即下载</div>
        <div @click="customthis()">同款定制</div>
      </div>
    </div>
    <div class="mask">
      <div class="mask-con" v-if="isShow">
        <div class="window-title">
          <span>请确认以下信息</span>
          <span>该服务不支持退款</span>
        </div>
        <p class="window-name">资源名称：{{payInfos.payName}}</p>
        <p class="window-price">支付金额：{{payInfos.payPrice}}</p>
        <div class="window-type">
          <div class="pay-type">支付方式：</div>
          <ul>
            <li v-for="(item,index) in payType" @click="chosePayType(index)" :key="index" :class="currentIndex == index ? 'li-active' : ''">
              <img :src="item.typeIcon" alt="">
              <span>{{item.typeName}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="mask-cons" v-else>
        <div class="need-custom">
          <div class="need-custom-title">
            <span>我要同款定制</span>
            <span>您选择后我们将尽快联系您！</span>
          </div>
          <div class="need-type">
            <span>类型：</span>
            <ul>
              <li  v-for="(item,index) in needType" :key="index"  @click="choseNeedType(index)"  :class="currentNeedIndex == index ? 'li-active' : ''">{{item.typeName}}</li>
            </ul>
          </div>
          <div class="need-con">
            <span>定制说明</span>
          </div>
          <p class="need-coc-box">作者描述：发布者在发布过程中填写的内容，展示给用户查看，作为报价的参考</p>
          <p class="need-price">预算金额：20000元/套</p>
        </div>
        <div class="submit-custom">
          <div class="submit-custom-title">
            <span>提交同款定制</span>
            <span>您选择后我们将尽快联系您！</span>
          </div>
          <p class="submit-type">类型：<span>平面填色</span></p>
          <div class="submit-describe">
            <span><i>*</i>描述</span>
            <textarea></textarea>
          </div>
          <div class="submit-budget">
            <span><i>*</i>预算金额</span>
            <div class="submit-budget-con">
              <input type="text">
              <i>*</i>
              <input type="text">
              <span>总计12000元</span>
            </div>
          </div>
          <div class="submit-phone">
            <span><i>*</i>手机号码</span>
            <div class="submit-phone-con">
              <input type="text">
              <div>发送验证码</div>
            </div>
          </div>
          <div class="submit-validation">
            <span><i></i>验证码</span>
            <div class="submit-validation-con">
              <input type="text">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import commentsCon from '../../components/comments/commentsCon.vue'
  export default {
    name: 'detaDetailsRight',
    props: {
      detaDetails: {
        type: Object,
        required: true,
        default: function () {
          return {}
        }
      },
      payInfo:Object
    },
    data() {
      return {
        worksDatainfo:{
          imgUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png',
          worksName:'梅赛德斯·赵四',
          dataInfo:{
            isUp:false,
            dataInfo_list:[
              {
                column_name:'项目名称：',
                column_info:'杭州萧山国际机场',
              },
              {
                column_name:'风   格：',
                column_info:'现代',
              },
              {
                column_name:'开发商：',
                column_info:'阳光城',
              },
              {
                column_name:'所在地：',
                column_info:'浙江',
              },
              {
                column_name:'关键词：',
                column_info:'效果图（含SU模型）',
              },
              {
                column_name:'关键词：',
                column_info:'效果图（含SU模型）',
              }
            ]
          }
        },
        payInfos:{
          payName:'这是叫什么的资源名称',
          payPrice:'1888.00元'
        },
        payType:[
          {
            typeName:'微信支付',
            typeCode:'',
            typeIcon:'../../assets/images/Wechat.png'
          },
          {
            typeName:'支付宝支付',
            typeCode:'',
            typeIcon:'../../assets/images/payZFB.png'
          },
        ],
        currentIndex:-1,
        currentNeedIndex:-1,
        isShow:false,
        needType:[
          {
            typeCode:'',
            typeName:'平面填色'
          },
          {
            typeCode:'',
            typeName:'CAD'
          },
          {
            typeCode:'',
            typeName:'平面填色'
          }
        ]
      }
    },
    components: {
      commentsCon
    },
    asyncData() {
    },
    created() {
    },
    methods: {
      unAnddown () {
        this.worksDatainfo.dataInfo.isUp = !this.worksDatainfo.dataInfo.isUp
      },
      immediatelyDown () {
      },
      customthis () {
        alert('同款定制！')
      },
      chosePayType(inx) {
        this.currentIndex = inx
      },
      choseNeedType (inx) {
        this.currentNeedIndex = inx
      }
    }
  }
</script>
<style lang="less" scoped>
  .data-details-right{
    width: 340px;
    height: 100%;
    .data-details-right-con{
      width: 100%;
      height: 100%;
      .works-info{
        width: 100%;
        height: 174px;
        background: #ffffff;
        border-radius: 4px;
        margin-bottom: 10px;
        padding: 20px 0;
        >img{
          display: block;
          width: 74px;
          height: 74px;
          border-radius: 50%;
          margin: 0 auto 6px;
        }
        .works-name{
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          text-align: center;
          margin-bottom: 11px;
        }
        .focus-btn{
          width: 84px;
          height: 26px;
          margin: 0 auto;
          background: #FF3C00;
          border-radius: 4px;
          line-height: 26px;
          text-align: center;
          font-size: 14px;
          color: #FFFFFF;
        }
      }
      .data-info{
        width: 100%;
        /*height: 178px;*/
        height: auto;
        background: #FFFFFF;
        border-radius: 4px;
        padding: 0 10px;
        margin-bottom: 10px;
        position: relative;
        .data-name{
          font-size: 14px;
          color: #333333;
          line-height: 40px;
          border-bottom: 1px solid #D9D9D9;
        }
        .data-introduce{
          padding: 10px 0;
          height: 137px;
          overflow: hidden;
          >li{
            font-size: 12px;
            color: #666666;
            margin-bottom: 8px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            >span{
              &:nth-child(1){
                width: 60px;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
              }
              &:nth-child(2){
                flex: 1;
              }
            }
            &:last-child{
              margin-bottom: 0px;
            }
          }
        }
        >i{
          display: block;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          position: absolute;
          right: 11px;
          bottom: 11px;
          cursor: pointer;
        }
        .data-introduce-active{
          height: auto;
        }
      }
      .btn-group{
        width: 100%;
        height: 71px;
        background: #ffffff;
        border-radius: 4px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        >div{
          flex: 1;
          font-size: 22px;
          text-align: center;
          line-height: 71px;
          cursor: pointer;
          &:nth-child(1){
            color: #FF3C00;
            position: relative;
            &:before{
              width: 2px;
              height: 30px;
              content: '';
              background: #D8D8D8;
              border-radius: 1px;
              position: absolute;
              right: 0;
              top:20px;
            }
            &:after{
              width: 30px;
              height: 2px;
              content: '';
              background: #FF3C00;
              border-radius: 1px;
              position: absolute;
              right: 70px;
              top:50px;
            }
          }
          &:nth-child(2){
            color: #333333;
          }
        }
      }
      .box{
        width: 100%;
        border-radius: 4px;
        // height: 1077px;
      }
    }
    .mask{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,.4);
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: 999;
      .mask-con{
        width: 594px;
        height: 336px;
        padding: 20px 30px 30px 36px;
        background: #FFFFFF;
        border-radius: 4px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .window-title{
          height: 40px;
          padding-top: 5px;
          line-height: 35px;
          margin-bottom: 34px;
          border-bottom: 1px solid #D9D9D9;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: flex-start;
          >span{
            &:nth-child(1){
              font-size: 16px;
              color: #333333;
              margin-right: 10px;
            }
            &:nth-child(2){
              font-size: 12px;
              color: #999999;
              line-height: 30px;
            }
          }
        }
        .window-name{
          line-height: 20px;
          font-size: 14px;
          color: #333333;
          margin-bottom: 34px;
        }
        .window-price{
          line-height: 20px;
          font-size: 14px;
          color: #333333;
          margin-bottom: 16px;
        }
        .window-type{
          height: 56px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 34px;
          .pay-type{
            font-size: 14px;
            color: #333333;
          }
          >ul{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            >li{
              width: 140px;
              height: 56px;
              line-height: 56px;
              padding: 8px 10px;
              background: #FFFFFF;
              box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);
              border-radius: 4px;
              margin-right: 18px;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              >img{
                display: inline-block;
                width: 40px;
                height: 40px;
                margin-right: 8px;
              }
              >span{
                font-size: 14px;
                color: #333333;
              }
            }
            .li-active{
              background: url("../../assets/images/chosed.png") no-repeat left top;
              background-size: 99%;
            }
          }
        }
      }
      .mask-cons{
        width: 1100px;
        height: 435px;
        padding: 25px 30px 30px 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content:center;
        background: #FFFFFF;
        border-radius: 4px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        .need-custom{
          flex: 1;
          height: 100%;
          padding-right: 60px;
          position: relative;
          &:before{
            width: 1px;
            height: 367px;
            content: '';
            background: #D8D8D8;
            border-radius: 1px;
            position: absolute;
            right: 0;
            top:0px;
          }
          .need-custom-title{
            height: 40px;
            padding-top: 5px;
            line-height: 35px;
            margin-bottom: 34px;
            border-bottom: 1px solid #D9D9D9;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: flex-start;
            >span{
              &:nth-child(1){
                font-size: 22px;
                color: #333333;
                margin-right: 10px;
              }
              &:nth-child(2){
                font-size: 12px;
                color: #999999;
                line-height: 30px;
              }
            }
          }
          .need-type{
            height: 26px;
            line-height: 26px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            margin-bottom: 34px;
            >span{
              font-size: 14px;
              color: #333333;
            }
            >ul{
              flex: 1;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: flex-start;
              >li{
                font-size: 14px;
                padding:0px 8px;
                color: #666666;
                position: relative;
                &:before{
                  width: 1px;
                  height: 15px;
                  content: '';
                  background: #D8D8D8;
                  border-radius: 1px;
                  position: absolute;
                  right: 0;
                  top:6px;
                }
                &:last-child{
                  &:before{
                    width: 0px;
                    height: 15px;
                    content: '';
                    background: #D8D8D8;
                    border-radius: 1px;
                    position: absolute;
                    right: 0;
                    top:6px;
                  }
                }
              }
              .li-active{
                color: #FF3C00;
                &:after{
                  width: 30px;
                  height: 1px;
                  content: '';
                  background: #FF3C00;
                  border-radius: 1px;
                  position: absolute;
                  left: 50%;
                  top:26px;
                  transform: translateX(-50%);
                }
              }
            }
          }
          .need-con{
            height: 20px;
            padding-bottom: 7px;
            border-bottom: 1px solid #D9D9D9;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: flex-start;
            margin-bottom: 8px;
            >span{
              font-size: 14px;
              color: #333333;
              margin-right: 10px;
            }
          }
          .need-coc-box{
            font-size: 12px;
            color: #999999;
            margin-bottom: 34px;
          }
          .need-price{
            line-height: 20px;
            font-size: 14px;
            color: #333333;
            margin-bottom: 16px;
          }
        }
        .submit-custom{
          flex: 1;
          height: 100%;
          padding-left: 60px;
          .submit-custom-title{
            height: 40px;
            padding-top: 5px;
            line-height: 35px;
            margin-bottom: 34px;
            border-bottom: 1px solid #D9D9D9;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: flex-start;
            >span{
              &:nth-child(1){
                font-size: 22px;
                color: #333333;
                margin-right: 10px;
              }
              &:nth-child(2){
                font-size: 12px;
                color: #999999;
                line-height: 30px;
              }
            }
          }
          .submit-type{
            font-size: 14px;
            color: #333333;
            margin-bottom: 34px;
            >span{
              font-size: 14px;
              color: #FF3C00;
              margin-left: 10px;
            }
          }
          .submit-describe{
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            margin-bottom: 10px;
            >span{
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: center;
              font-size: 14px;
              color: #333333;
              >i{
                font-size: 14px;
                color: #FF3C00;
                margin-right: 2px;
              }
            }
            >textarea{
              flex: 1;
              height: 72px;
              resize: none;
              border: 1px solid #D9D9D9;
              border-radius: 4px;
              margin-left: 10px;
            }
          }
          .submit-budget{
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            >span{
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: center;
              font-size: 14px;
              color: #333333;
              >i{
                font-size: 14px;
                color: #FF3C00;
                margin-right: 4px;
              }
            }
            .submit-budget-con{
              flex: 1;
              margin-left: 10px;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              margin-bottom: 10px;
              >i{
                font-size: 14px;
                color: #FF3C00;
                margin-right: 4px;
              }
              >input{
                width: 109px;
                height: 25px;
                margin-right: 10px;
                border: 1px solid #D9D9D9;
                border-radius: 4px;
              }
              >span{
                font-size: 14px;
                color: #FF3C00;
                margin-left: 6px;
              }
            }
          }
          .submit-phone{
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            >span{
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: center;
              font-size: 14px;
              color: #333333;
              >i{
                font-size: 14px;
                color: #FF3C00;
                margin-right: 4px;
              }
            }
            .submit-phone-con{
              flex: 1;
              margin-left: 10px;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              margin-bottom: 10px;
              >input{
                width: 109px;
                height: 25px;
                margin-right: 20px;
                border: 1px solid #D9D9D9;
                border-radius: 4px;
              }
              >div{
                width: 82px;
                height: 25px;
                text-align: center;
                line-height: 25px;
                background: #FF3C00;
                border-radius: 4px;
                font-size: 12px;
                color: #FFFFFF;
              }
            }
          }
          .submit-validation{
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            >span{
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: center;
              font-size: 14px;
              color: #333333;
              >i{
                font-size: 14px;
                color: #FF3C00;
                margin-right: 4px;
              }
            }
            .submit-validation-con{
              flex: 1;
              margin-left: 28px;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              margin-bottom: 10px;
              >input{
                width: 109px;
                height: 25px;
                margin-right: 20px;
                border: 1px solid #D9D9D9;
                border-radius: 4px;
              }
            }
          }
        }
      }
    }
  }
</style>
