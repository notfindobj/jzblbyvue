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
      <div class="box"></div>
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
      }
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
        }
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
        alert('立即下载！')
      },
      customthis () {
        alert('同款定制！')
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

  }
</style>
