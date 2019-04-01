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
        <li v-for="(item,index) in listOneInfo" :key="index" :class="item.value ? 'li-active' : ''">
          <p>{{item.title}}</p>
          <ol>
            <li :class="items.value ? 'li-active' : ''" v-for="(items,index) in  item.children" :key="index" @click="choseSomeOne(item,index)">{{items.name}}</li>
          </ol>
          <img v-if="item.children.length > 13" src="" alt="" @click="upAndDown(item)">
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
        currentName:'',
        clicked:-1,
        listOneInfo:[
          {
            "title": "风格",
            "children": [
              {
                "name": "新亚洲",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              }
            ],
            "value":false
          },
          {
            "title": "风格",
            "children": [
              {
                "name": "新亚洲",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              }
            ],
            "value":false
          },
          {
            "title": "风格",
            "children": [
              {
                "name": "新亚洲",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              }
            ],
            "value":false
          },
          {
            "title": "风格",
            "children": [
              {
                "name": "新亚洲",
                "value":false
              },
              {
                "name": "新亚洲1",
                "value":false
              }
            ],
            "value":false
          }
        ]
      }
    },
    mounted() {
    },
    methods: {
      choseSome (inx,item) {
        this.currentInex = inx;
        this.currentName = item;
      },
      choseSomeOne(item,inx){
        item.children.map((items,index) => {
          if(index == inx) {
            items.value = !item.value
          }else{
            items.value = false
          }
        })
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
              &:hover{
                color: #FF3C00;
              }
            }
            .li-active{
              color: #FF3C00;
            }
          }
          >img{
            display: block;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: red;
            position: absolute;
            right: 0;
            top: 13px;
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
</style>
