<template>
    <div class="he-and-i-con-box">
        <ul class="he-and-i-con-box-nav">
            <li v-for="(item,index) in userInfo.MyOrOtherMeun" :key="item.id"
                :class="currentIndex === index ? 'li-active' :''" @click="choseOne(item,index)">
                {{item.Name}}
            </li>
        </ul>
        <div class="he-and-i-con-box-content">
            <div class="he-and-i-con-box-content-left">
                <div :is="PersonalCenter" :headList="headList" :dataList="dataList" :paginationData="paginationData"
                    @reachBottom="reachBottom"
                    @changeType="changeType"
                ></div>
            </div>
            <div class="he-and-i-con-box-content-right" :class="{'fixed-right': scrollTop >= 390}">
                <HeAndIIntroduction
                    :userInfo.sync="userInfo"
                    @changeComponents="changeComponents"
                    @seeMore="seeMore"
                />
            </div>
        </div>
    </div>
</template>

<script>
import HeAndIDownload from '../HeAndIDownload'
import mySomethingStatistical from '../mySomethingStatistical'
import HeAndIIntroduction from '../HeAndIIntroduction'
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
      },
      userId: {
        type: String,
        default: ''
      }
    },
    data() {
        return {
            PersonalCenter: 'HeAndIDownload',
            currentIndex: 0,
            headList: [],
            dataList: [],
            paginationData: {},
            headName: '',
            headNum: 0,
            pageNum: 1,
            typeId: '',
            menuId: 0,
            scrollTop: ''
        }
    },
    async asyncData({ store, params }) {
      const data = await store.dispatch('getSelfOrOthertribeInfo', {
        "Page": 0,
        "Rows": 0,
        "ItemTypeId": "",
        "typeId": 0,
        "UserId": store.getters.getToken.UserId
      });
      return {
        tribeInfo: data
      }
    },
    mounted() {
        window.addEventListener('scroll', () => {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        })
        getTypeMeun({
            typeId: 0,
            UserId: this.$route.params.id ? this.$route.params.id : this.userId
        }).then(res => {
            this.headList = res.typeMenuButs;
            this.PersonalCenter = 'HeAndIDownload';
        })
        this.getList();
    },
    methods: {
        seeMore () {

        },
        // 获取数据
        getList(isReload = true) {
            this.$store.dispatch('getSelfOrOthertribeInfo', {
                Page: this.pageNum,
                Rows: 8,
                ItemTypeId: this.typeId,
                typeId: this.menuId,
                UserId: this.$route.params.id ? this.$route.params.id : this.userId
            }).then(res => {
                if (res.retModels !== '') {
                        if (isReload) {
                            this.dataList = res.retModels;
                        } else {
                            this.dataList = this.dataList.concat(res.retModels);
                        }
                        this.paginationData = res.paginationData || {};
                } else {
                        if (isReload) {
                            this.dataList = []
                        }
                        this.paginationData = res.paginationData || {};
                }
            })
        },
        // 选择菜单
        choseOne(item, inx) {
            if (this.currentIndex !== inx) {
                this.menuId = item.Id;
                getTypeMeun({
                    typeId: inx,
                    UserId: this.$route.params.id ? this.$route.params.id : this.userId
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
            this.headNum = count;
            this.headList = [];
            let Components = ['mySomethingStatistical', 'mySomethingStatistical', 'HeAndIDownload'];
            this.PersonalCenter = Components[index];
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
    }
}
</script>
<style lang="less" scoped>
    .he-and-i-con-box {
        width: 100%;
        height: auto;
        margin-bottom: 16px;
        background: transparent;
        .fixed-header {
          position: sticky;
          top: 0;
          z-index: 2;
        }
        &-nav {
            width: 100%;
            height: 40px;
            position: sticky;
            top: 0;
            z-index: 2;
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
            overflow-y: auto;
            position: relative;
            &-left {
                display: inline-block;
                width: 880px;
                background: transparent;
            }

            &-right {
                width: 295px;
                position: sticky;
                position: absolute;
                display: inline-block;
                right: 0;
                // top: 60px;
            }
            .fixed-right {
                position: fixed;
                top: 48px;
                right: 351px;
            }
        }
    }
</style>
