<template>
    <div class="he-and-i-con-box">
        <ul class="he-and-i-con-box-nav">
            <li
                v-for="(item,index) in userInfo.MyOrOtherMeun"
                :key="item.id"
                :class="currentIndex === index ? 'li-active' :''"
                @click="choseOne(item,index)"
            >
                {{item.Name}}
            </li>
        </ul>
        <div class="he-and-i-con-box-content">
            <div class="he-and-i-con-box-content-left">
                <div
                    :is="PersonalCenter"
                    :headList="headList"
                    :dataList="dataList"
                    :paginationData="paginationData"
                    @reachBottom="reachBottom"
                    @changeType="changeType"
                ></div>
            </div>
            <div class="he-and-i-con-box-content-right">
                <HeAndIIntroduction
                    :userInfo="userInfo"
                    @changeComponents="changeComponents"
                ></HeAndIIntroduction>
            </div>
        </div>
    </div>
</template>

<script>
  import HeAndIIntroduction from '../HeAndIIntroduction'
  import HeAndIDownload from '../HeAndIDownload'
  import mySomethingStatistical from '../mySomethingStatistical'
  import { getTypeMeun } from '~/service/clientAPI'

  export default {
    name: 'HeAndIContent',
    components: {
      HeAndIIntroduction,
      HeAndIDownload,
      mySomethingStatistical
    },
    props: {
      userInfo: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },

    data() {
      return {
        PersonalCenter: 'HeAndIDownload',
        currentIndex: 0,
        isShowHead: false,
        headList: [],
        dataList: [],
        paginationData: {},
        headName: '',
        headNum: 0,
        pageNum: 1,
        typeId: '',
        menuId: 0
      }
    },
    mounted() {
      getTypeMeun({
        typeId: 0,
        UserId: this.$route.params.id
      }).then(res => {
        this.headList = res.typeMenuButs;
        this.PersonalCenter = 'HeAndIDownload';
      })
      this.getList();
    },

    methods: {

      // 获取数据
      getList(isReload = true) {
        this.$store.dispatch('getSelfOrOthertribeInfo', {
          Page: this.pageNum,
          Rows: 8,
          ItemTypeId: this.typeId,
          typeId: this.menuId,
          UserId: this.$route.params.id
        }).then(res => {
          if (res.retModels !== '') {
            if (isReload) {
              this.dataList = res.retModels;
            } else {
              this.dataList = this.dataList.concat(res.retModels);
            }
            this.paginationData = res.paginationData;
          }
        })
      },

      // 选择菜单
      choseOne(item, inx) {
        if (this.currentIndex !== inx) {
          this.menuId = item.Id;
          getTypeMeun({
            typeId: inx,
            UserId: this.$route.params.id
          }).then(res => {
            this.headList = res.typeMenuButs;
            this.currentIndex = inx;
            this.dataList = [];
            this.pageNum = 1;
            this.typeId = res.typeMenuButs.length > 0 ? res.typeMenuButs[0].TypeId : 0;
            this.getList();
          })
        }
      },
      changeComponents(index, count) {
        this.currentIndex = -1;
        this.isShowHead = true;
        this.headNum = count;
        this.headList = [];
        switch (index) {
          case 0:
            this.PersonalCenter = 'mySomethingStatistical';
            this.headName = '关注';
            break;
          case 1:
            this.PersonalCenter = 'mySomethingStatistical';
            this.headName = '粉丝';
            break;
          case 2:
            this.PersonalCenter = 'HeAndIDownload';
            this.headList = [
              {
                type: '',
                name: '全部'
              },
              {
                type: '',
                name: '图片'
              },
              {
                type: '',
                name: '视频'
              },
              {
                type: '',
                name: '问答'
              }, {
                type: '',
                name: '示范区'
              },
              {
                type: '',
                name: '楼盘'
              },];
            this.headName = '项目';
            break;
        }
      },

      // 触底
      reachBottom() {
        this.pageNum++;
        this.getList(false);
      },

      // 选择类型
      changeType(typeId) {
        this.typeId = typeId;
        this.getList();
      }
    },
    async asyncData({ store, params }) {
      const data = await store.dispatch('getSelfOrOthertribeInfo', {
        "Page": 0,
        "Rows": 0,
        "ItemTypeId": "",
        "typeId": 0,
        "UserId": store.state.overas.auth.UserId
      });
      return {
        tribeInfo: data
      }
    }
  }
</script>
<style lang="less" scoped>
    .he-and-i-con-box {
        width: 100%;
        height: auto;
        margin-bottom: 16px;
        background: transparent;

        &-nav {
            width: 100%;
            height: 40px;
            background: #ffffff;
            padding: 0 198px;
            margin-bottom: 16px;
            display: flex;
            flex-direction: row;

            > li {
                flex: 1;
                line-height: 40px;
                font-size: 14px;
                color: #333333;
                margin-right: 100px;
                position: relative;
                cursor: pointer;

                &:last-child {
                    margin-right: 0;
                }

                &:hover {
                    &:after {
                        width: 56px;
                        height: 2px;
                        content: '';
                        background: #FF3C00;
                        position: absolute;
                        left: 0;
                        top: 38px;
                    }
                }
            }

            .li-active {
                &:after {
                    width: 56px;
                    height: 2px;
                    content: '';
                    background: #FF3C00;
                    position: absolute;
                    left: 0;
                    top: 38px;
                }
            }
        }

        &-content {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            position: relative;

            &-left {
                width: 100%;
                height: 100%;
                background: transparent;
            }

            &-right {
                width: 300px;
                position: absolute;
                right: 0;
                top: 0;
            }
        }
    }
</style>
