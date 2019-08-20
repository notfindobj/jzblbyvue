<template>
    <div class="search-main">
        <div class="search-main-bar">
            <div style="display:inline-block;width: 80%;">
                <Input search enter-button="搜索" placeholder="" />
            </div>
        </div>
        <div class="search-main-title">
            <ul>
                <li :class="searchTop === index ? 'active-search' : '' " v-for="(item, index) in btnData" :key="index" @click="switchAttr(item, index)">{{item.Text}}</li>
                <!-- <li class="active-search">找人</li>
                <li>文章</li> -->
            </ul>
        </div>
        <div class="search-coment">
            <div class="search-coment-left">
                <ul class="search-coment-left-title">
                    <li >全部</li>
                    <li class="active-left-search">昵称</li>
                    <li>标签</li>
                </ul>
                <div>
                    <div class="search-item">
                        <div class="search-item-left">
                            <img src="https://tva1.sinaimg.cn/crop.0.0.1080.1080.180/875769b9jw8exw7awittij20u00u0n2v.jpg?Expires=1566202618&ssig=%2FlbutDFRR2&KID=imgbed,tva" alt="">
                        </div>
                        <div class="search-item-right">
                            <div>
                                <span>name</span>
                                <span class="follow">关注</span>
                            </div>
                            <div> 
                                浙江 丽水  个人主页
                            </div>
                            <ul class="user-info">
                                <li>
                                    <span>关注</span>
                                    <span>42</span>
                                </li>
                                <li>
                                    <span>粉丝</span>
                                    <span>42</span>
                                </li>
                                <li>
                                    <span>微博</span>
                                    <span>42</span>
                                </li>
                            </ul>
                            <div> 
                                简介
                            </div>
                            <ul>
                                <li>标签</li>
                                <li>搞笑幽默</li>
                            </ul>
                            <div>
                                <span>教育信息</span>
                                <span>广东轻工职业技术学院</span>
                            </div>
                        </div>
                    </div>
                     <div class="search-item">
                        <div class="search-item-left">
                            <img src="https://tva1.sinaimg.cn/crop.0.0.1080.1080.180/875769b9jw8exw7awittij20u00u0n2v.jpg?Expires=1566202618&ssig=%2FlbutDFRR2&KID=imgbed,tva" alt="">
                        </div>
                        <div class="search-item-right">
                            <div>
                                <span>name</span>
                                <span class="follow">关注</span>
                            </div>
                            <div> 
                                浙江 丽水  个人主页
                            </div>
                            <ul class="user-info">
                                <li>
                                    <span>关注</span>
                                    <span>42</span>
                                </li>
                                <li>
                                    <span>粉丝</span>
                                    <span>42</span>
                                </li>
                                <li>
                                    <span>微博</span>
                                    <span>42</span>
                                </li>
                            </ul>
                            <div> 
                                简介
                            </div>
                            <ul>
                                <li>标签</li>
                                <li>搞笑幽默</li>
                            </ul>
                            <div>
                                <span>教育信息</span>
                                <span>广东轻工职业技术学院</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="search-coment-right">
                <div class="card-head">
                    <h4 class="title">搜索历史</h4>
                    <span class="s-btn-c">清除</span>
                </div>
                <ul class="history">
                    <li class="history-tems">
                        <span>aaaaa</span>
                        <i>X</i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script> 
import {getQueryData} from '../../service/clientAPI'
export default {
    layout: 'main',
    middleware: 'authenticated',
    data() {
        return {
            searchTop: 0,
            twoSwitch: []
        }
    },
    async asyncData({route, store}) {
        let btnData = await store.dispatch('getQueryBtnData');
        let queryData = {
            TypeId: 0,
        }
        let msg = await store.dispatch('getQueryHistory', queryData);
        if (msg) {
            console.log('>>>>>>>>>>>>', msg)
            console.log(msg)
        }
        return {
            btnData
        }
        // getQueryBtnData
    },
    methods: {
        switchAttr (row, index) {
            this.searchTop = index;
            this.twoSwitch = row.TextBtnDatas
        },
        async getQueryBtnDataList () {
            let queryData = {
                QueryKey: "",
                QueryValue: "",
                TypeId: 0,
                Page: 1,
                Rows: 8
            }
            let msg = getQueryBtnData();
            console.log()
        }
    }
}
</script>
<style lang="less" scoped>
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
                            left: 0;
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
                            left: 0;;
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
        color: #333;
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