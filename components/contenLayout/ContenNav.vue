<template>
  <div class="nav-box">
    <div class="nav-list">
      <p>在以下分类中找：</p>
      <ul>
        <li v-for="(item, index) in listInfo" :class="index == currentInex ? 'li-active' : ''"  :key="index" @click="choseSome(index,item)">{{item}}<img src="../../assets/images/sanjiao.png" /></li>
      </ul>
    </div>
    <div class="screening-nav">
      <ul class="screening-nav-list">
        <li>
          <p>类   型：</p>
          <ol>
            <li>高层住宅</li>
            <li>洋房</li>
            <li>别墅</li>
            <li>小区入口</li>
            <li>入口大堂</li>
            <li>售楼处</li>
            <li>商业综合体</li>
            <li>大沿街商业</li>
            <li>高层办公</li>
            <li>多层办公</li>
            <li>园区办公</li>
            <li>高层酒店</li>
            <li>大沿街商业</li>
            <li>高层办公</li>
            <li>多层办公</li>
            <li>园区办公</li>
            <li>高层酒店</li>
          </ol>
        </li>
        <li>
          <p>风   格：</p>
          <ol>
            <li>高层住宅</li>
            <li>洋房</li>
            <li>别墅</li>
            <li>小区入口</li>
            <li>入口大堂</li>
            <li>售楼处</li>
            <li>商业综合体</li>
            <li>大沿街商业</li>
            <li>高层办公</li>
            <li>多层办公</li>
            <li>园区办公</li>
            <li>高层酒店</li>
          </ol>
        </li>
        <li>
          <p>色   调：</p>
          <ol>
            <li>高层住宅</li>
            <li>洋房</li>
            <li>别墅</li>
            <li>小区入口</li>
            <li>入口大堂</li>
            <li>售楼处</li>
            <li>商业综合体</li>
            <li>大沿街商业</li>
            <li>高层办公</li>
            <li>多层办公</li>
            <li>园区办公</li>
            <li>高层酒店</li>
          </ol>
        </li>
        <li>
          <p>公司区位：</p>
          <ol>
            <li>高层住宅</li>
            <li>洋房</li>
            <li>别墅</li>
            <li>小区入口</li>
            <li>入口大堂</li>
            <li>售楼处</li>
            <li>商业综合体</li>
            <li>大沿街商业</li>
            <li>高层办公</li>
            <li>多层办公</li>
            <li>园区办公</li>
            <li>高层酒店</li>
          </ol>
        </li>
        <li>
          <p>公   司：</p>
          <ol>
            <li>高层住宅</li>
            <li>洋房</li>
            <li>别墅</li>
            <li>小区入口</li>
            <li>入口大堂</li>
            <li>售楼处</li>
            <li>商业综合体</li>
            <li>大沿街商业</li>
            <li>高层办公</li>
            <li>多层办公</li>
            <li>园区办公</li>
            <li>高层酒店</li>
          </ol>
        </li>
        <li>
          <p>其他效果图：</p>
          <ol>
            <li>高层住宅</li>
            <li>洋房</li>
            <li>别墅</li>
            <li>小区入口</li>
            <li>入口大堂</li>
            <li>售楼处</li>
            <li>商业综合体</li>
            <li>大沿街商业</li>
            <li>高层办公</li>
            <li>多层办公</li>
            <li>园区办公</li>
            <li>高层酒店</li>
          </ol>
        </li>
      </ul>
    </div>
    <Breadcrumb separator=">" style="margin-bottom: 20px">
      <BreadcrumbItem style="color: #999999">资源库</BreadcrumbItem>
      <BreadcrumbItem style="color: #999999;font-weight: normal" v-if="currentName">{{currentName}}</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
  export default {
    name: 'contenNav',
    data() {
      return {
        listInfo:[
          '示范区',
          '楼盘',
          '效果图',
          'SU模型',
          '总图',
          '平面',
          '建筑规范',
          '室内案例',
          '文本',
        ],
        currentInex:0,
        currentName:''
      }
    },
    mounted() {
    },
    methods: {
      choseSome (inx,item) {
        this.currentInex = inx;
        this.currentName = item;
      }
    },
  }
</script>
<style lang="less" scoped>
  .nav-box{
    width: 100%;
    height: auto;
    padding-top: 20px;
    .nav-list{
      font-size: 16px;
      color: #333333;
      height: 22px;
      margin-bottom: 4px;
      display: flex;
      flex-direction: row;
      >p{
        width: 128px;
        margin-right: 14px;
      }
      >ul{
        flex: 1;
        display: flex;
        flex-direction: row;
        >li{
          height: 22px;
          padding-right: 13px;
          margin-right: 13px;
          position: relative;
          cursor: pointer;
          &:before{
            width: 2px;
            height: 10px;
            content: '';
            background: #D6D6D6;
            border-radius: 1px;
            position: absolute;
            right: 0;
            top:6px;
          }
          &:last-child{
            &:before{
              width: 0px;
              height: 10px;
              content: '';
              background: #D6D6D6;
              border-radius: 1px;
              position: absolute;
              right: 0;
              top:6px;
            }
          }
          &:hover{
            color: #FF3C00;
          }
          img{
            display: block;
            width: 17px;
            height: 16px;
            position: absolute;
            bottom: -17px;
            left: 38%;
            transform: translateX(-50%);
            display: none;
          }
        }
        .li-active{
          color: #FF3C00;
          img{
            display: block;
          }
        }
      }
    }
    .screening-nav{
      width: 100%;
      height: auto;
      margin-top: 12px;
      margin-bottom: 10px;
      background: #FFFFFF;
      border: 1px solid #303030;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 0px 20px;
      .screening-nav-list{
        width: 100%;
        >li{
          line-height: 40px;
          font-size: 14px;
          color: #333333;
          border-bottom: 1px dashed #DDDDDD;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          &:last-child{
            border-bottom: none;
          }
          >p{
            /*width: 76px;*/
            margin-right: 20px;
            font-weight: 500;
          }
          >ol{
            flex: 1;

            >li{
              float: left;
              margin-right: 24px;
              &:hover{
                color: #FF3C00;
              }
            }
          }
        }
      }
    }
  }
  .ivu-breadcrumb-item-separator{
    margin: 0 2px!important;
  }
</style>
