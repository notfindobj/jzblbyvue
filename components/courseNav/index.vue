<template>
    <div class="course">
        <div class="course-top">
            <ul class="course-top-lf">
                <li>
                    <nuxt-link to="/"> 建筑部落</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/home">发现</nuxt-link>
                </li>
                <li>
                    <a @click.stop="goSearch">档案库</a>
                </li>
                <li><nuxt-link to="/BuildingCircle"> 建筑圈</nuxt-link></li>
                <li><nuxt-link to="/videos"> 视频</nuxt-link></li>
                <li><nuxt-link to="/QuestionsAndAnswers"> 问答</nuxt-link></li>
            </ul>
            <ul class="course-top-lr">
                <li><nuxt-link to="/HeAndITribal"> 我的部落</nuxt-link></li>
                <li><nuxt-link to="/User/overview"> 账号</nuxt-link></li>
            </ul>
        </div>
        <div class="course-buttom">
            <div class="course-buttom-content">
                <ul class="course-buttom-content-lf">
                    <li>
                        <nuxt-link to="/course">
                            <img src="https://www.pic.jzbl.com/logo1.png" alt="">
                        </nuxt-link>
                    </li>
                    <li><nuxt-link to="/course">首页</nuxt-link></li>
                    <li>
                        <nuxt-link to="/all_course">全部课程</nuxt-link>
                    </li>
                    <li>限时免费</li>
                </ul>
                <ul class="course-buttom-content-lr">
                    <li>
                        <div class="search">
                            <input type="text">
                            <i class="icon iconfont icon-sousuo"></i>
                        </div>
                    </li>
                    <li><nuxt-link to="/lecturer">讲师入住</nuxt-link></li>
                    <li><nuxt-link to="/self_study/MyStudy">我的自学</nuxt-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>
import {setDemo} from '../../LocalAPI'
export default {
    methods: {
        async goSearch () {
            // 搜索页导航数据
            let baseSearchNav = {
                key: 'baseSearchNav',
                value: {
                    ClassTypeArrList: [{AttrKey: 'e5082f90-f590-4107-8d42-2d37897ef261', AttrValue: 'DesignLib'}],
                    title: '示范区',
                }
            }
            this.$store.dispatch('Serverstorage', baseSearchNav);
            let msgs = await setDemo('baseSearchNav', baseSearchNav);
            // 搜索页项目数据
            let baseSearchItem = {
                key: 'baseSearchItem',
                value: {
                    Pagination: {
                        SortType: '1',
                        KeyWords: "",
                        Order: true,
                        Page: 1,
                        Rows: 32
                    }
                }
            }
            this.$store.dispatch('Serverstorage', baseSearchItem);
            let msgss = await setDemo('baseSearchItem', baseSearchItem);
            this.$router.push({ name: "dataBase"});
        }
    }
}
<style lang="less" scoped>
.course {
        position: sticky;
        z-index: 999;
        top: -32px;
    &-top {
        position: relative;
        height: 32px;
        width: 1200px;
        margin: 0 auto;
        background: #f6f6f6;
        line-height: 31px;
        z-index: 998;
        display: flex;
        justify-content: space-between;
        color: #999;
        font-size: 12px;
        a {
            color: #999;
        }
        ul {
            display: flex;
        }
        &-lf{
            li {
                cursor: pointer;
                margin-right: 15px;
            }
        }
        &-lr{
            li {
                cursor: pointer;
                margin-left: 15px;
            }
        }
    }
    &-buttom {
        box-sizing: border-box;
        background-color: #2b333b;
        position: relative;
        height: 60px;
        font-size: 14px;
        top: 0;
        color: #fff;
        &-content{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            &-lf {
                display: flex;
                li {
                    a {
                        color: #fff;
                    }
                    margin-right: 30px;
                    &:first-child {
                        img {
                            padding-top: 15px;
                        }
                    }
                    height: 60px;
                    line-height: 60px;
                    cursor: pointer;
                }
            }
            &-lr {
                display: flex;
                li {
                    cursor: pointer;
                    &:first-child {
                        margin-right: 30px;
                    }
                    a {
                        color: #fff;
                    }
                    &:last-child {
                        a {
                            color: #1bbc9b;
                        }
                        margin-left: 20px;
                        position: relative;
                        color: #1bbc9b;
                        &::after {
                            content: "";
                            position: absolute;
                            width: 2px;
                            height: 20px;
                            top: 20px;
                            background: #1bbc9b;
                            left: -10px;
                        }
                    }
                    
                    height: 60px;
                    line-height: 60px;
                    cursor: pointer;
                }
            }
        }
    }
}
.search {
    height: 31px;
    background: #fff;
    line-height: 30px;
    padding: 0 15px;
    display: inline-block;
    border-radius: 4px;
    color: #999;
    input {
        border: none;
        outline: none;
        height: 30px;
    }
}
</style>