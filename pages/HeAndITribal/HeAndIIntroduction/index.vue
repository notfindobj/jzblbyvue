<template>
  <div class="he-and-i-introduction">
    <ul class="he-and-i-introduction-top">
      <li :class="currentIndex == index ? 'li-active' : ''" v-for="(item,index) in he_and_i_introduction_list" :key="index" @click="change(item,index)">
        <p class="item-count">{{item.count}}</p>
        <p class="item-name">{{item.name}}</p>
      </li>
    </ul>
    <div class="he-and-i-introduction-center">
      <h5 class="he-and-i-introduction-center-title">
        <span class="title-name">资料简介</span>
        <span class="edit-my-introduction">编辑个人资料></span>
      </h5>
      <ul class="my-introduction-list">
        <li>
          <i class="icon iconfont"></i>
          <span class="list-name">电话：</span>
          <span class="list-con">{{my_introduction.phone}}</span>
        </li>
        <li>
          <i class="icon iconfont"></i>
          <span class="list-name">生日：</span>
          <span class="list-con">{{my_introduction.birthday}}</span>
        </li>
        <li>
          <i class="icon iconfont"></i>
          <span class="list-name">擅长：</span>
          <span class="list-con">{{my_introduction.good_at}}</span>
        </li>
      </ul>
      <p class="look-more">查看更多 ></p>
    </div>
    <div class="he-and-i-introduction-bottom">
      <h5 class="he-and-i-introduction-bottom-title">
        <span class="最近访客">资料简介</span>
      </h5>
      <ul class="he-and-i-introduction-bottom-list">
        <li v-for="(item,index) in recent_visitors_list" :key="index">
          <img :src="item.user_img" alt="">
          <p>{{item.user_name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HeAndIIntroduction',
    components: {
    },
    data () {
      return {
        he_and_i_introduction_list:[
          {
            name:'关注',
            components:'mySomethingStatistical',
            count:999,
            headComponents:true,
            list:[],
          },
          {
            name:'项目',
            components:'HeAndIDownload',
            count:999,
            headComponents:true,
            list:[
              {
                type:'',
                name:'全部'
              },
              {
                type:'',
                name:'图片'
              },
              {
                type:'',
                name:'视频'
              },
              {
                type:'',
                name:'问答'
              },{
                type:'',
                name:'示范区'
              },
              {
                type:'',
                name:'楼盘'
              },
            ],
          },
          {
            name:'粉丝',
            components:'mySomethingStatistical',
            count:999,
            headComponents:true,
            list:[],
          },
          {
            name:'人气',
            components:'',
            count:999,
            headComponents:false,
            list:[],
          },
        ],
        currentIndex:-1,
        my_introduction:{
          phone:'185****4502',
          birthday:'1992年02月01日',
          good_at:'篮球、足球'
        },
        recent_visitors_list:[
          {
            user_img:'http://www.jzbl.com/ImgTemp/SlidesImgs/1551774656.jpg',
            user_name:'张小杰'
          },
          {
            user_img:'http://www.jzbl.com/ImgTemp/SlidesImgs/1551774656.jpg',
            user_name:'张小杰'
          },
          {
            user_img:'http://www.jzbl.com/ImgTemp/SlidesImgs/1551774656.jpg',
            user_name:'张小杰'
          },{
            user_img:'http://www.jzbl.com/ImgTemp/SlidesImgs/1551774656.jpg',
            user_name:'张小杰'
          },
          {
            user_img:'http://www.jzbl.com/ImgTemp/SlidesImgs/1551774656.jpg',
            user_name:'张小杰'
          },
        ]

      }
    },
    methods: {
      change (item, inx) {
        if(inx != 3){
          this.currentIndex = inx;
          this.$emit('changeComponents',item)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .he-and-i-introduction{
    width: 100%;
    height: auto;
    &-top{
      height: 66px;
      padding: 10px 0;
      background: #ffffff;
      box-shadow: 0 1px 1px 0 rgba(0,0,0,0.15);
      margin-bottom: 16px;
      display: flex;
      flex-direction:row;
      align-items: center;
      justify-content: center;
      >li{
        flex: 1;
        position: relative;
        cursor: pointer;
        .item-count{
          line-height: 25px;
          font-size: 18px;
          text-align: center;
          color: #333333;
          margin-bottom: 5px;
        }
        .item-name{
          line-height: 17px;
          font-size: 12px;
          color: #666666;
          text-align: center;
        }
        &:after{
          width: 1px;
          height: 46px;
          content: '';
          background: #D8D8D8;
          position: absolute;
          right: 0;
          top:0px;
        }
        &:last-child{
          &:after{
            display: none;
          }
        }
      }
      .li-active{
        .item-count{
          color: #FF3C00;
        }
        .item-name{
          color: #FF3C00;
        }
      }
    }
    &-center{
      height: 169px;
      background: #ffffff;
      box-shadow: 0 1px 1px 0 rgba(0,0,0,0.15);
      margin-bottom: 16px;
      &-title{
        height: 40px;
        padding: 0 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        line-height: 39px;
        border-bottom: 1px solid #D8D8D8;
        .title-name{
          font-size: 14px;
          color: #333333;
        }
        .edit-my-introduction{
          font-size: 12px;
          color: #FF3C00;
          font-weight: normal;
        }

      }
      .my-introduction-list{
        height: 100px;
        padding: 15px 15px 5px;
        >li{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          margin-bottom: 10px;
          >i{
            font-size: 12px;
            margin-right: 5px;
          }
          .list-name{
            width: 36px;
            font-size: 12px;
            color: #666666;
            margin-right: 5px;
          }
          .list-con{
            font-size: 12px;
            color: #333333;
          }
        }
      }
      .look-more{
        line-height: 17px;
        text-align: center;
        font-size: 12px;
        color: #999999;
      }
    }
    &-bottom{
      background: #ffffff;
      box-shadow: 0 1px 1px 0 rgba(0,0,0,0.15);
      &-title{
        height: 40px;
        padding: 0 15px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        line-height: 39px;
        border-bottom: 1px solid #D8D8D8;
        .title-name{
          font-size: 14px;
          color: #333333;
        }
        .edit-my-introduction{
          font-size: 12px;
          color: #FF3C00;
          font-weight: normal;
        }

      }
      &-list{
        width: 100%;
        height: auto;
        padding: 15px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        >li{
          width: 50px;
          height: 75px;
          margin-right: 22px;
          margin-bottom: 16px;
          >img{
            display: inline-block;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-bottom: 6px;
          }
          >p{
            text-align: center;
            font-size: 12px;
            color: #333333;
          }
          &:nth-child(4n){
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
