<template>
  <div class="he-and-i-con-box">
    <ul class="he-and-i-con-box-nav">
      <li :class="currentIndex == index ? 'li-active' :''" v-for="(item,index) in nav_list" :key="index" @click="choseOne(item,index)">{{item.name}}</li>
    </ul>
    <div class="he-and-i-con-box-content">
      <div class="he-and-i-con-box-content-left">
        <div :is="PersonalCenter" :isShowHead="isShowHead" :headList="headList" :headName="headName" :headNum="headNum"></div>
      </div>
      <div class="he-and-i-con-box-content-right">
        <he-and-i-introduction @changeComponents="changeComponents"></he-and-i-introduction>
      </div>
    </div>
  </div>
</template>

<script>
  import HeAndIIntroduction from '../HeAndIIntroduction'
  import HeAndIDownload from '../HeAndIDownload'
  import mySomethingStatistical from '../mySomethingStatistical'
  export default {
    name: 'HeAndIContent',
    components: {
      HeAndIIntroduction,
      HeAndIDownload,
      mySomethingStatistical
    },
    data () {
      return {
        nav_list:[
          {
            name:'我的发布',
            components:'HeAndIDownload',
            headComponents:false
          },
          {
            name:'我的收藏',
            components:'HeAndIDownload',
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
            name:'我的下载',
            components:'HeAndIDownload',
            headComponents:'',
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
                name:'PDF'
              },
              {
                type:'',
                name:'CSD'
              },{
                type:'',
                name:'PSD'
              }
            ],
          },
          {
            name:'我的评论',
            components:'HeAndIDownload',
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
        ],
        currentIndex:0,
        PersonalCenter:'HeAndIDownload',
        isShowHead:false,
        headList:[],
        headName:'',
        headNum:0
      }
    },
    methods: {
      choseOne (item,inx) {
        this.currentIndex = inx;
        this.PersonalCenter = item.components;
        this.isShowHead = item.headComponents;
        this.headList = item.list
      },
      changeComponents (data) {
        this.currentIndex = -1;
        this.PersonalCenter = data.components;
        this.isShowHead = data.headComponents;
        this.headList = data.list
        this.headName = data.name;
        this.headNum = data.count
      }
    }
  }
</script>
<style lang="less" scoped>
  .he-and-i-con-box{
    width: 100%;
    height: auto;
    margin-bottom: 16px;
    background: transparent;
    &-nav{
      width: 100%;
      height: 40px;
      background: #ffffff;
      padding: 0 198px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: row;
      >li{
        flex: 1;
        line-height: 40px;
        font-size: 14px;
        color: #333333;
        margin-right: 100px;
        position: relative;
        cursor: pointer;
        &:last-child{
          margin-right: 0;
        }
        &:hover{
          &:after{
            width: 56px;
            height: 2px;
            content: '';
            background: #FF3C00;
            position: absolute;
            left: 0;
            top:38px;
          }
        }
      }
      .li-active{
        &:after{
          width: 56px;
          height: 2px;
          content: '';
          background: #FF3C00;
          position: absolute;
          left: 0;
          top:38px;
        }
      }
    }
    &-content{
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      position: relative;
      &-left{
        width: 100%;
        height: 100%;
        background: transparent;
      }
      &-right{
        width: 300px;
        position: absolute;
        right: 0;
        top: 0;
      }
    }
  }
</style>
