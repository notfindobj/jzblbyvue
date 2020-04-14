<template>
    <div class="search-main">
        <div class="search-main-bar">
            <div style="display:inline-block;width: 80%;">
                <Input search enter-button="搜索" v-model="searchData" placeholder="" @keydown.enter.native="getQueryBtnDataList" @on-search="getQueryBtnDataList"/>
            </div>
        </div>
        <div class="search-main-title">
            <ul>
                <li :class="searchTop === item.Id ? 'active-search' : '' " v-for="(item, index) in btnData" :key="index" @click="switchAttr(item, index)">{{item.Text}}</li>
            </ul>
        </div>
        <div class="search-coment">
            <div class="search-coment-left">
                <ul class="search-coment-left-title" v-if="twoSwitch.length > 0">
                    <li v-for="(item, index) in twoSwitch" :key="index" :class="searchTitle === item.Id ? 'active-left-search' : ''" @click="switchTwo(item)">{{item.Text}}</li>
                </ul>
                <div>
                    <div class="search-item" v-for="(items, index) in searchItems" :key="index">
                        <div class="search-item-left">
                            <img :src="items.HeadIcon " alt="" @click="jumpRoute(items)">
                        </div>
                        <div class="search-item-right">
                            <div>
                                <span>{{items.NickName}}</span>
                                <span :class="!items.IsFollow ? 'follow' : 'unfollow'" @click="worksFocus(items)">{{!items.IsFollow ? '关注' : '已关注'}}</span>
                            </div>
                            <ul class="user-city">
                                <li v-if="items.CityName">{{items.CityName}}</li>
                                <li v-if="items.CountyName">{{items.CountyName}}</li>
                                <li @click="jumpRoute(items)">个人部落</li>
                            </ul>
                            <ul class="user-info" v-if="items.Follow && items.Fans">
                                <li v-if="items.Follow">
                                    <span>关注:</span>
                                    <span class="item-num">{{items.Follow}}</span>
                                </li>
                                <li v-if="items.Fans">
                                    <span>粉丝:</span>
                                    <span class="item-num">{{items.Fans}}</span>
                                </li>
                            </ul>
                            <div v-if="items.Description"> 
                                简介: {{items.Description}}
                            </div>
                            <ul v-if="items.Labels" class="user-labels">
                                <li>标签:</li>
                                <li>{{items.Labels}}</li>
                            </ul>
                            <div v-if="items.JobInfos">
                                <span>公司:</span>
                                <span>{{items.JobInfos}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-coment-right" v-if="historyList.length > 0">
                <div class="card-head">
                    <h4 class="title">搜索历史</h4>
                    <span class="s-btn-c" @click="delSearch()">清除</span>
                </div>
                <ul class="history">
                    <li class="history-tems" v-for="(items, index) in historyList" :key="index">
                        <span>{{items.Name}}</span>
                        <i @click="delSearch(items, index)" class="iconfont icon-chahao3"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script> 
import {setFollow, delQueryData} from '../../service/clientAPI'
import { analogJump } from '../../plugins/untils/public'
import {mapGetters} from 'vuex'
export default {
    layout: 'main',
    data() {
        return {
            searchTop: '',
            searchTitle: '',
            twoSwitch: [],
            searchData: '',
            searchItems: []
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    async asyncData({route, store}) {
        let btnData = await store.dispatch('getQueryBtnData');
        let searchTop = btnData[4].Id;
        let twoSwitch = btnData[4].TextBtnDatas;
        let searchTitle = twoSwitch[0].Id;
        let queryData = {
            TypeId: 0,
        }
        let historyList = await store.dispatch('getQueryHistory', queryData);
        let searchItems = []
        let searchData = ''
        if (route.query.id) {
            let searchDatas = {
                QueryKey: searchTitle,
                QueryValue: route.query.id,
                TypeId: searchTop,
                Page: 1,
                Rows: 20
            }
            searchData = route.query.id
            searchItems = await store.dispatch('getQueryData', searchDatas);
        }
        return {
            searchData,
            btnData,
            searchTop,
            historyList: historyList || [],
            twoSwitch,
            searchTitle,
            searchItems
        }
    },
    methods: {
        switchAttr (row, index) {
            if (row.Text !== '找人') {
                this.$Message.error('开发中,请耐心等待！')
                return false
            }
            this.searchTop = row.Id;
            this.twoSwitch = row.TextBtnDatas;
            if (this.twoSwitch.length > 0) {
                this.searchTitle = this.twoSwitch[1].Id
            }
        },
        switchTwo (row) {
            this.searchTitle = row.Id;
        },
        async delSearch (item, index) {
            let msg = ''
            if (item) {
                msg = await delQueryData(item.Id);
                if (msg) {
                    this.historyList.splice(index, 1)
                }
            } else {
                msg = await delQueryData(this.historyList.join(','));
                if (msg) {
                    this.historyList = [];
                }
            }
            
        },
        async getQueryBtnDataList () {
            if (this.searchData === '') return false; 
            let queryData = {
                QueryKey: this.searchTitle,
                QueryValue: this.searchData,
                TypeId: this.searchTop,
                Page: 1,
                Rows: 20
            }
            let msg = await this.$store.dispatch('getQueryData', queryData);
            if (msg) {
                this.searchItems = msg;
            }
        },
         // 关注
        async worksFocus(item) {
            if (!this.isLogin) {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
                return false
            }
            let queryData = {
                UserId: item.UserId,
                IsDelete: item.IsFollow
            };
            let collectionMsg = await setFollow(queryData)
            if (collectionMsg) {
                this.$set(item, 'IsFollow', !item.IsFollow)
            }
        },
        // 路由跳转
        jumpRoute(items) {
            if (!items.UserId) {
                this.$Message.error('用户ID为空！');
                return false;
            }
            let routeData = this.$router.resolve({ name: 'HeAndITribal-id', query: { id: items.UserId } });
            analogJump(routeData.href);
        },
    }
}
</script>
<style lang="less" scoped>
    .item-num {
        margin: 0 5px;
        color: #ff3c00;
    }
    .user-city {
        display: flex;
        li {
            margin-right: 5px;
            &:last-child {
                cursor: pointer;
                color: #ff3c00;
            }
        }
    }
    .user-labels {
        display: flex;
        &:first-child {
            margin-right: 5px;
        }
    }
    .icon-chahao3 {
        font-size: 12px;
        &:hover {
            color: #ff3c00;
        }
    }
    .search-main {
        width: 1000px;
        margin: 0 auto;
        padding-top: 15px;
        text-align: center;
        // background: #ffffff;
        &-bar {
            text-align: center;
        }
        &-title {
            background: #ffffff;
            margin-top: 15px;
            padding:  0 30px;
            ul {
                display: flex;
                line-height: 19px;
                li {
                    display: inline-block;
                    cursor: pointer;
                    margin: 0 5.1%;
                    padding: 11px 10px 10px;
                    font-size: 14px;
                    color: #333;
                    position: relative;
                    &.active-search {
                        font-weight: bold;
                        &::after {
                            display: inline-block;
                            content: '';
                            width: 50px;
                            height: 2px;
                            background: #ff3c00;
                            position: absolute;
                            bottom: 0px;
                            left: 50%;
                            transform: translateX(-50%);
                        }
                    }
                }
            }
        }
    }
    .search-coment {
        width: 1000px;
        margin-top: 15px;
        display: flex;
        margin-top: 10px;
        justify-content: space-between;
        &-left {
            width: 750px;
            &-title {
            display: flex;
            justify-content: flex-start;
            width: 750px;
            background: #ffffff;
                li {
                    cursor: pointer;
                    display: block;
                    width: 60px;
                    height: 38px;
                    line-height: 38px;
                    text-align: center;
                    position: relative;
                    &.active-left-search {
                        font-weight: bold;
                        &::after {
                            position: absolute;
                            display: inline-block;
                            content: '';
                            width: 50px;
                            height: 2px;
                            background: #ff3c00;
                            position: absolute;
                            bottom: 0px;
                            left: 50%;
                            transform: translateX(-50%);
                        }
                    }
                }
            }
        }
        &-right {
            width: 240px;
            margin-left: 10px;
            background: #ffffff;
        }
    }
    .search-item {
        display: flex;
        padding: 16px;
        background: #ffffff;
        border-top: 1px solid #eeeeee;
        &-left {
            img {
                cursor: pointer;
                width: 90px;
                height: 90px;
                display: inline-block;
                border-radius: 50%;
            }
        }
        &-right {
            margin-left: 20px;
            text-align: left;
            div, ul {
                line-height: 19px;
            }
        }
    }
    .follow {
        margin-left: 10px;
        cursor: pointer;
        font-size: 14px;
        min-width: 40px;
        color: #ff3c00;
        height: 24px;
        line-height: 25px;
        padding: 4px 8px;
        border: 1px solid #d9d9d9;
        background: #fff;
    }
    .unfollow {
        margin-left: 10px;
        cursor: pointer;
        font-size: 14px;
        min-width: 40px;
        color: #e8e8e8;
        height: 24px;
        line-height: 25px;
        padding: 4px 8px;
        border: 1px solid #d9d9d9;
        background: #fff;
    }
    .user-info {
        display: flex;
    }
    .card-head{
        font-size: 14px;
        font-weight: normal;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #eee;
        padding: 0 12px 0 11px;
        text-align: left;
        display: flex;
        justify-content: space-between;
        .title {
            font-weight: 700;
            color: #333;
        }
        .s-btn-c{
            margin-top: 7px;
            cursor: pointer;
            text-align: center;
            font-size: 12px;
            min-width: 40px;
            height: 24px;
            line-height: 25px;
            padding: 0 10px;
            border: 1px solid #d9d9d9;
            background: #fff;
            line-height: 25px;
        }
    }
    .history {
        padding: 10px;
        &-tems {
            display: flex;
            cursor: pointer;
            justify-content: space-between;
            padding: 0 9px 0 13px;
            &:hover {
                background: #ececec;
                border-radius: 3px;
            }
        }
    }
</style>