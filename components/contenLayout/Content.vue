<template>
    <div class="content-box">
        <ul class="content-screening-list">
            <li :class="getSessionStorage.baseSearchItem.Pagination.SortType === '1' ?'li-active' : ''" @click="entrySorting('1')">人气</li>
            <li :class="getSessionStorage.baseSearchItem.Pagination.SortType === '0' ?'li-active' : ''" @click="entrySorting('0')">最新上传</li>
            <li :class="getSessionStorage.baseSearchItem.Pagination.SortType === '2' ?'li-active' : ''" @click="entrySorting('2')">下载</li>
            <li :class="getSessionStorage.baseSearchItem.Pagination.SortType === '3' ?'li-active' : ''" @click="entrySorting('3')">收藏</li>
        </ul>
        <!--建筑规范之外的布局 四列-->
        <div v-if="showLayout" class="works-list_box">
            <ScrollBox @willReachBottom="willReachBottom" :isLast="isLast">
                <ul class="works-list">
                    <li @mouseleave="hideWorks()" v-for="(items, index) in RspItemDatas" :key="index">
                        <div class="img-box" @click="viewItem(items)">
                            <img :src="items.ItemTitleImg" alt="">
                            <div class="works-like">
                                <p><i class="icon iconfont icon-chakan"></i>{{items.Views}}</p>
                                <p>
                                    <i class="icon iconfont icon-favorite" v-show="!items.IsCollections" @click.stop="clickCollections(true, index)" ></i>
                                    <i class="icon iconfont"  style="color: #ff3c00; margin-right: 8px;" v-show="items.IsCollections" @click.stop="clickCollections(false, index)" >&#xe69d;</i>收藏
                                </p>
                            </div>
                        </div>
                        <div class="works-introduce">
                            <p>{{items.ItemName}}</p>
                            <div @click="jumpRoute(items)" >
                                <div class="avatar-wrap">
                                    <img class="headPortrait" @mouseenter="showWorks(items)" :src="items.HeadIcon" alt="">
                                </div>
                                <span class="headPortrait">{{items.NickName}}</span>
                            </div>
                        </div>
                        <div :class="currentWorks === items.ItemId ? 'works-active' : ''" class="works-con"
                             @mouseleave="hideWorks(items)">
                            <img :src="UserProAndFans.HeadIcon || $defaultHead" alt=""
                                 @click="jumpRoute(UserProAndFans)">
                            <p>{{UserProAndFans.NickName || items.NickName}}</p>
                            <ul class="works-con-introduce">
                                <li>
                                    <p>项目</p>
                                    <p>{{UserProAndFans.proCount}}</p>
                                </li>
                                <li>
                                    <p>粉丝</p>
                                    <p>{{UserProAndFans.Fans}}</p>
                                </li>
                            </ul>
                            <div class="btn-group-box">
                                <div @click="focus" :class="UserProAndFans.IsFollow ?'btn-unFollow': 'btn-follow'">{{UserProAndFans.IsFollow ? '已关注': '关注'}}</div>
                                <div @click="direct()">私信</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </ScrollBox>
        </div>
        <!--建筑规范的布局两列-->
        <div class="works-list-box" v-else>
            <ScrollBox @willReachBottom="willReachBottom" :isLast="isLast">
                <ul class="works-list-change">
                    <template v-for="items in RspItemDatas">
                        <li :key="items.ItemId" @click="viewItem(items)">
                            <div class="works-list-left"
                                 :style="`background: url(${items.ItemTitleImg});background-size: 100% 100%;`"></div>
                            <div class="works-list-right">
                                <p>{{items.ItemName}}</p>
                                <div class="works-list-con">
                                    <div class="works-name" @click="jumpRoute(items)">
                                        <div class="avatar-wrap">
                                            <img class="headPortrait" @mouseenter="showWorks(items)" :src="items.HeadIcon|| $defaultHead" alt="">
                                        </div>
                                        <span>{{items.NickName}}</span>
                                    </div>
                                    <div class="works-list-con-box">
                                        <i class="icon iconfont icon-chakan"></i>
                                        <span>{{items.Views}}</span>
                                        <i class="icon iconfont icon-favorite"></i>
                                        <span>{{items.Collections}}</span>
                                    </div>
                                </div>
                            </div>
                            <div :class="currentWorks === items.ItemId ? 'works-active works-con' : ' works-con'"
                                 @mouseleave="hideWorks(items)">
                                <img :src="UserProAndFans.HeadIcon || items.HeadIcon" alt=""
                                     @click="jumpRoute(UserProAndFans)">
                                <p>{{UserProAndFans.NickName || items.NickName}}</p>
                                <ul class="works-con-introduce">
                                    <li>
                                        <p>项目</p>
                                        <p>{{UserProAndFans.proCount}}</p>
                                    </li>
                                    <li>
                                        <p>粉丝</p>
                                        <p>{{UserProAndFans.Fans}}</p>
                                    </li>
                                </ul>
                                <div class="btn-group-box">
                                    <div @click="focus" :class="UserProAndFans.IsFollow ?'btn-unFollow': 'btn-follow'">{{UserProAndFans.IsFollow ? '已关注': '关注'}}</div>
                                    <div @click="direct()">私信</div>
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
            </ScrollBox>
        </div>
    </div>
</template>

<script>
  import ScrollBox from '../../components/crollBox'
  import {mapGetters } from 'vuex'
  export default {
    name: 'conten',
    props: {
      RspItemDatas: {
        type: Array,
        required: true,
        default: function () {
          return []
        }
      },
      showLayout: {
        type: Boolean,
        default: true
      },
      UserProAndFans: {
        type: Object,
        default: function () {
          return {}
        }
      },
      currentWorks: {
        type: String,
        default: ''
      },
      isLast: {
        type: Boolean,
        default: false
      }
    },
    components: {
      ScrollBox
    },
    data() {
      return {
        sortAction: 0,
      }
    },
    computed: {
        ...mapGetters(['getSessionStorage']),
    },
    methods: {
      // 将要滚动到底部
      willReachBottom() {
        this.$emit('loadData')
      },
      entrySorting(val) {
        this.$emit('entrySorting', val)
      },
      showWorks(item) {
        this.$emit('showWorks', item)
      },
      // 查看项目
      viewItem(val) {
        this.$emit('viewItem', val);
      },
      hideWorks(item) {
        // this.currentWorks = null;
        this.$emit('hideWorks', item);
      },
      focus() {
        this.$emit('worksFocus', this.UserProAndFans);
      },
      clickCollections(flag, index) {
        this.$emit('handleCollections', flag, index)
      },
      // 跳转
      jumpRoute(item) {
        this.$emit('jumpRoute', item);
      },
      direct() {
        //this.currentWorks = null;
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
    .content-box {
        width: 100%;
        height: auto;

        .content-screening-list {
            display: flex;
            flex-direction: row;
            margin-bottom: 23px;

            > li {
                line-height: 20px;
                font-size: 14px;
                color: #666666;
                margin-right: 36px;
                cursor: pointer;
            }

            .li-active {
                color: #ED1B24;
                font-weight: 500;
                position: relative;

                &:before {
                    width: 30px;
                    height: 1px;
                    content: '';
                    background: #ED1B24;
                    border-radius: 2px;
                    position: absolute;
                    left: 50%;
                    bottom: -2px;
                    transform: translateX(-50%);
                }
            }
        }

        .works-list-box {
            width: 100%;
            height: auto;
        }

        .works-list {
            width: 100%;
            .clearfix();

            > li {
                float: left;
                width: 292px;
                height: 266px;
                background: #FFFFFF;
                border-radius: 4px;
                margin-right: 10px;
                margin-bottom: 20px;
                position: relative;
                &:hover {
                    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15);
                }

                &:nth-child(4n) {
                    margin-right: 0;
                }

                .img-box {
                    height: 200px;
                    position: relative;
                    cursor: pointer;
                    overflow: hidden;

                    > img {
                        display: inline-block;
                        width: 100%;
                        height: auto;
                    }
                    .works-like {
                        width: 100%;
                        height: 30px;
                        line-height: 30px;
                        padding-left: 6px;
                        padding-right: 6px;
                        opacity: 0.6;
                        background: #000000;
                        position: absolute;
                        left: 0;
                        bottom: 0;

                        > p {
                            font-size: 12px;
                            color: #FFFFFF;

                            > i {
                                font-size: 14px;
                                color: #ffffff;
                                margin-right: 4px;
                            }

                            &:nth-child(1) {
                                float: left;
                            }

                            &:nth-child(2) {
                                float: right;
                            }
                        }
                    }
                }

                .works-introduce {
                    height: 66px;
                    padding: 8px 0 10px 6px;

                    > p {
                        width: 253px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        font-size: 14px;
                        color: #666666;
                        margin-bottom: 8px;
                    }

                    > div {
                        display: flex;
                        flex-direction: row;
                        justify-content: flex-start;
                        align-items: flex-start;

                        .avatar-wrap {
                            width: 20px;
                            height: 20px;
                            margin-right: 4px;
                            border-radius: 50%;
                            overflow: hidden;

                            img {
                                width: 20px;
                                height: 20px;
                            }
                        }

                        > span {
                            font-size: 14px;
                            color: #333333;
                        }
                    }
                }

                .works-con {
                    width: 163px;
                    height: 217px;
                    padding: 20px 16px;
                    background: #FFFFFF;
                    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.10);
                    border-radius: 4px;
                    position: absolute;
                    left: 45px;
                    top: 8px;
                    display: none;

                    > img {
                        cursor: pointer;
                        display: block;
                        width: 64px;
                        height: 64px;
                        border-radius: 50%;
                        background: red;
                        margin: 0 auto 10px;
                    }

                    > p {
                        cursor: pointer;
                        font-size: 14px;
                        color: #333333;
                        margin-bottom: 12px;
                        text-align: center;
                    }

                    .works-con-introduce {
                        height: 40px;
                        margin-bottom: 12px;
                        display: flex;
                        flex-direction: row;
                        position: relative;

                        > li {
                            flex: 1;

                            > p {
                                &:nth-child(1) {
                                    font-size: 12px;
                                    color: #999999;
                                    text-align: center;
                                }

                                &:nth-child(2) {
                                    font-size: 12px;
                                    color: #333333;
                                    text-align: center;
                                }
                            }
                        }

                        &:before {
                            width: 2px;
                            height: 20px;
                            content: '';
                            background: #D9D9D9;
                            border-radius: 2px;
                            position: absolute;
                            left: 50%;
                            top: 10px;
                            transform: translateX(-50%);
                        }
                    }

                    .btn-group-box {
                        height: 21px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        > div {
                            cursor: pointer;
                            width: 60px;
                            height: 21px;
                            border-radius: 4px;
                            box-sizing: border-box;
                            text-align: center;
                            line-height: 21px;
                            font-size: 12px;
                            color: #ffffff;
                            &:nth-child(2) {
                                border: 1px solid #D9D9D9;
                                color: #666666;
                            }
                        }
                        .btn-follow {
                            background: #FF3C00;
                        }
                        .btn-unFollow {
                            background: #b0b0b0;
                        }
                    }
                }

                .works-active {
                    display: block;
                }
            }
        }

        .works-list-change {
            width: 100%;
            .clearfix();
            > li {
                float: left;
                width: 590px;
                height: 200px;
                padding: 20px;
                background: #FFFFFF;
                border-radius: 4px;
                margin-right: 20px;
                margin-bottom: 20px;
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                &:nth-child(2n) {
                    margin-right: 0;
                }
                .works-list-left {
                    width: 120px;
                    height: 160px;
                    margin-right: 20px;
                    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15);
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    cursor: pointer;

                    > img {
                        display: inline-block;
                        width: 100%;
                        height: auto;
                    }
                }
                .works-list-right {
                    flex: 1;
                    height: 160px;
                    > p {
                        width: 100%;
                        font-size: 20px;
                        font-weight: bold;
                        color: #333333;
                        padding-bottom: 90px;
                        margin-bottom: 14px;
                        border-bottom: 1px solid #D9D9D9;
                        cursor: pointer;
                    }

                    .works-list-con {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;

                        .works-name {
                            margin-right: 236px;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            > img {
                                display: inline-block;
                                width: 20px;
                                height: 20px;
                                margin-right: 4px;
                                border-radius: 50%;
                                background: red;
                            }
                            > span {
                                font-size: 14px;
                                color: #b0b0b0;

                            }
                        }

                        .works-list-con-box {
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;

                            i {
                                font-size: 14px;
                                color: #666666;
                                margin-right: 4px;
                            }

                            span {
                                font-size: 12px;
                                color: #666666;

                                &:nth-child(2) {
                                    margin-right: 20px;
                                }
                            }
                        }
                    }
                }
                .works-con {
                    width: 150px;
                    height: 200px;
                    padding: 20px 16px;
                    background: #FFFFFF;
                    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                    position: absolute;
                    left: 160px;
                    top: 0px;
                    display: none;

                    > img {
                        cursor: pointer;
                        display: block;
                        width: 64px;
                        height: 64px;
                        border-radius: 50%;
                        background: red;
                        margin: 0 auto 10px;
                    }

                    > p {
                        font-size: 14px;
                        color: #333333;
                        margin-bottom: 8px;
                        text-align: center;
                    }

                    .works-con-introduce {
                        height: 40px;
                        // margin-bottom: 12px;
                        display: flex;
                        flex-direction: row;
                        position: relative;

                        > li {
                            flex: 1;

                            > p {
                                &:nth-child(1) {
                                    font-size: 12px;
                                    color: #999999;
                                    text-align: center;
                                }

                                &:nth-child(2) {
                                    font-size: 12px;
                                    color: #333333;
                                    text-align: center;
                                }
                            }
                        }

                        &:before {
                            width: 2px;
                            height: 20px;
                            content: '';
                            background: #D9D9D9;
                            border-radius: 2px;
                            position: absolute;
                            left: 50%;
                            top: 10px;
                            transform: translateX(-50%);
                        }
                    }

                    .btn-group-box {
                        cursor: pointer;
                        height: 21px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        > div {
                            width: 60px;
                            height: 21px;
                            border-radius: 4px;
                            box-sizing: border-box;
                            text-align: center;
                            line-height: 21px;
                            font-size: 12px;
                            color: #ffffff;
                            &:nth-child(2) {
                                border: 1px solid #D9D9D9;
                                color: #666666;
                            }
                        }
                        .btn-follow {
                            background: #FF3C00;
                        }
                        .btn-unFollow {
                            background: #b0b0b0;
                        }
                    }
                }
                .works-active {
                    display: block;
                }
                &:hover {
                    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.15);
                }
            }
        }
    }

    .avatar-wrap {
        width: 20px;
        height: 20px;
        margin-right: 4px;
        border-radius: 50%;
        overflow: hidden;

        img {
            width: 20px;
            height: 20px;
        }
    }

    .ivu-page {
        text-align: center;
    }

    .headPortrait {
        cursor: pointer;
    }
</style>
