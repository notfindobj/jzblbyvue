<template>
  <div class="nav-box">
    <div class="nav-list">
      <p>在以下分类中找：</p>
      <ul>
        <li v-for="(item, index) in listInfo" :class="item.ItemAttributesId == currentInex ? 'li-active' : ''"  :key="index" @click="choseSome(index,item)">{{item.ItemAttributesFullName}}<img src="../../assets/images/sanjiao.png" /></li>
      </ul>
    </div>
    <div class="screening-nav">
      <ul class="screening-nav-list">
        <li v-for="(item,index) in itemAttribute" :key="index" :class="item.ItemAttributesId ? 'li-active' : ''">
          <p>{{item.ItemAttributesFullName}}</p>
          <ol>
            <li v-for="(items,index) in  item.ChildNode" :key="index" @click="choseSomeOne(item,items)">{{items.ItemAttributesFullName}}</li>
          </ol>
          <i :class="item.ItemAttributesId ? 'icon iconfont icon-jiantou-shang-shixin-yuanxing' : 'icon iconfont icon-xiangxiayuanjiantouxiajiantouxiangxiamianxing'" v-if="item.ChildNode.length > 13"  @click="upAndDown(item)"></i>
        </li>
      </ul>
    </div>
    <Breadcrumb separator=">" style="margin-bottom: 20px">
      <BreadcrumbItem style="color: #999999">资源库</BreadcrumbItem>
      <BreadcrumbItem style="color: #999999;font-weight: normal" v-if="currentName">{{currentName}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="itemAttribute">
      <div class="itemAttribute-items" v-for="(items, index) in queryConditions" :key="index">
        <span >{{items.ClassTypeName}}:{{items.ArrName}}</span>
        <i class="iconfont icon-chahao2" @click="delItems(items)"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'contenNav',
    props: {
      itemAttribute: {
        type: Array,
        required: true,
        default: function () {
          return []
        }
      },
      queryConditions: {
        type: Array,
        required: true,
        default: function () {
          return []
        }
      },
      listInfo: {
        type: Array,
        required: true,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        currentInex: '',
        currentName:'',
        clicked:-1,
        asd: {}
      }
    },
    created () {
      let queryData = JSON.parse(this.$route.query.dataBase);
      this.currentName = queryData.title;
      this.currentInex = queryData.ClassTypeId.split('|')[1];
    },
    mounted() {},
    methods: {
      choseSome (index,item) {
        this.currentInex = item.ItemAttributesId;
        this.currentName = item.ItemAttributesFullName;
        this.$emit('choseSome', item)
      },
      choseSomeOne(item,inx){
        this.$emit('choseSomeOne', item, inx)
      },
      delItems (item) {
        this.$emit('delItems', item)
      },
      upAndDown (item) {
        item.value = !item.value
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
          height: 40px;
          overflow: hidden;
          line-height: 40px;
          font-size: 14px;
          color: #333333;
          border-bottom: 1px dashed #DDDDDD;
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          position: relative;
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
              cursor: pointer;
              &:hover{
                color: #FF3C00;
              }
            }
            .li-active{
              color: #FF3C00;
            }
          }
          >i{
            font-size: 14px;
            color: #cccccc;
            position: absolute;
            right: 0;
            top: 0px;
          }
        }
        .li-active{
          height: auto;
        }
      }
    }
  }
  .ivu-breadcrumb-item-separator{
    margin: 0 2px!important;
  }
  .ivu-breadcrumb {
    display: inline-block;
  }
  .itemAttribute {
    display: inline-block;
    margin-left: 10px;
    &-items {
      display: inline-block;
      margin-right: 10px;
      border: .5px solid #FF3C00;
      border-radius: 3px;
      padding: 0 4px;
      span {
        color: #cccccc;
        line-height: 29px;
      }
      i{
        cursor: pointer;
        &:hover {
          color: #FF3C00;
        }
      }
    }
  }
</style>
