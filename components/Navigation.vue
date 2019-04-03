<template>
    <div>
        <!-- 广告 -->
        <div class="ad"></div>
        <!-- 头部导航 -->
        <div class="home-bar">
            <div class="home-bar-content">
                <ul class="home-bar-content-left">
                    <li>欢迎您，来到建筑部落！</li>
                    <li> 
                        <i class="iconfont icon-jiantou"></i>
                        <span>上海 [切换城市]</span>
                    </li>
                </ul>
                 <ul class="home-bar-content-right">
                    <li>
                        <span v-if="!auth" @click="SignIn">登录</span>
                        <span v-else>{{auth.NickName}}</span>
                    </li>
                    <li class="content">在线地图</li>
                    <li> 
                        <Dropdown placement="bottom-start">
                            <a href="javascript:void(0)" class="app-down">
                                APP下载
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>炸酱面</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </div>
        <div class="main-nav">
            <div class="main-content">
                <div class="main-content-left">
                    <div class="main-content-logo">
                        <img :src="loginIng" alt="">
                    </div>
                    <div class="main-content-left-search">
                        <Input v-model="value11" style="width:450px;" size="large">
                         <Dropdown slot="prepend" style="margin-left: 10px">
                            <a href="javascript:void(0)">
                                菜单(居中)
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>驴打滚</DropdownItem>
                                <DropdownItem>炸酱面</DropdownItem>
                                <DropdownItem>豆汁儿</DropdownItem>
                                <DropdownItem>冰糖葫芦</DropdownItem>
                                <DropdownItem>北京烤鸭</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                            <Button type="primary" slot="append" class="btn-bg" size="large">搜索</Button>
                            <!-- <a href="javascript:void(0)" >搜索</a> -->
                        </Input>
                    </div>
                </div>
                <div>
                    <Input style="width:344px;" size="large" search enter-button="百度" placeholder="" />
                </div>
            </div>
            <ul class="main-nav-tab">
                <li class="resource">
                    <span>资源库 <i class="iconfont icon-jiantou"></i></span>
                </li>
                <li>关注</li>
                <li>推荐</li>
                <li>视频</li>
                <li>问答</li>
                <li>建筑圈</li>
                <li>建筑游学</li>
                <li>建筑书店</li>
                <li>我的部落</li>
            </ul>
        </div>
        <signPage></signPage>
    </div>
</template>
<script>
import signPage from '../components/home/signPage'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            value11: '',
            loginIng: require('../assets/images/top_logo.png')
        }
    },
    computed: {
        ...mapState({
            auth: state => state.overas.auth
        })
    },
     components: {
        signPage
    },
    methods: {
        SignIn () {
            this.$store.dispatch('SETUP',  true)
        }
    }
}
</script>
<style lang="less" scoped>
    .btn-bg {
        background-color: #FF3C00 !important;
        color: #ffffff !important;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .ad {
        height: 60px;
        background: #bbbbbb;
    }
    .home-bar {
        height: 40px;
        background: #E8E8E8;;
        &-content {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            color: #999999;
            font-size: 14px;
            line-height: 40px;
            &-left {
                width: 50%;
                display: flex;
                text-align: left;
            }
            &-right {
                width: 50%;
                display: flex;
                justify-content: flex-end;
                > li.content {
                    padding: 0 30px;
                }
                .app-down {
                    color: #999999;
                }
            }
        }
    }
    .main-nav {
        border-bottom: 1px solid #FF3C00;
        &-tab {
            font-size: 16px;
            color: #FF3C00;
            display: flex;
            width: 1200px;
            margin: 0 auto;
            > li {
                padding: 8px 30px;
                cursor: pointer;
            }
        }
    }
    .main-content {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        padding: 30px 0;
        &-left {
            display: flex;
            &-search {
                margin-left: 90px;
            }
        }
        &-logo {
            width: 137px;
        }
    }
    .resource {
        font-size: 20px;
        background-color: #FF3C00;
        color: #ffffff;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    .selection {
        background-color: #FF3C00;
        color: #ffffff;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
</style>
