<template>
    <div>
        <!-- 头部导航 -->
        <div class="home-bar">
            <div class="home-bar-content">
                <ul class="home-bar-content-left" @mouseleave="switchRegionLeave">
                     <li :class="isRegion ? 'region regionhover' : 'region'" @mouseenter="switchRegion">
                        <i class="icon iconfont">&#xe6ad;</i>
                        <span>{{region}}</span>
                    </li>
                    <ul v-show="isRegion" class="region-box" @mouseenter="switchRegion" @mouseleave="switchRegionLeave">
                        <li :class="region ===item ? 'region-active' : ''"  v-for="(item, index) in regionData" @click="switchCities(item)" :key="index">{{item}}</li>
                    </ul>
                    <li>欢迎您，来到建筑部落！</li>
                    <li class="Headportrait">
                        <Input icon="ios-search" v-model="searchpage" placeholder="搜索问答、找人" style="width: auto" @keydown.enter.native="goSearchPage" @on-click="goSearchPage"/>
                    </li>
                </ul>
                <ul class="home-bar-content-right">
                    <li class="content">
                        <div class="avatar" v-if="auth" @click="enterCenter">
                            <img :src="auth ? auth.HeadIcon :  $defaultHead" alt="">
                        </div>
                        <span class="sign-btn" v-if="!auth" @click="SignIn">登录</span>
                        <span class="sign-btn" v-if="!auth" @click="register">注册</span>
                        <Dropdown v-else >
                            <a href="javascript:void(0)">
                                <span @click="enterCenter">{{auth.NickName}}</span>
                                <span class="home-bar-content-right-out" @click="signOut">[退出]</span>
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>
                                    <nuxt-link to="/User/system">系统消息</nuxt-link>
                                </DropdownItem>
                                <DropdownItem>
                                    <nuxt-link to="/User/comment">评论消息</nuxt-link>
                                </DropdownItem>
                                <DropdownItem>
                                    <nuxt-link to="/User/customized">定制消息</nuxt-link>
                                </DropdownItem>
                                <DropdownItem>
                                    <nuxt-link to="/User/Invitation">邀请消息</nuxt-link>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        
                    </li>
                    <li class="content" @click="onlineMap">在线地图</li>
                    <li>
                        <Dropdown class="right-select">
                        <Badge :count="getComment.MsgCount + getCusData.MsgCount  + getInviter.MsgCount" class-name="badge-sty"> <i  class="iconfont icon-xinxi bottom-start-mess"></i></Badge>
                        <DropdownMenu slot="list">
                            <DropdownItem >
                                <nuxt-link to="/Message/customized">评论消息<Badge v-if="getComment.MsgCount > 0" :count="getComment.MsgCount"></Badge></nuxt-link>
                            </DropdownItem>
                            <DropdownItem >
                                <nuxt-link to="/Message/comment">定制消息<Badge v-if="getCusData.MsgCount > 0" :count="getCusData.MsgCount"></Badge></nuxt-link>
                            </DropdownItem>
                            <DropdownItem >
                                <nuxt-link to="/Message/inviter">团队邀请<Badge v-if="getInviter.MsgCount > 0" :count="getInviter.MsgCount"></Badge></nuxt-link>
                            </DropdownItem>
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
                        <nuxt-link to="/">
                            <img :src="loginIng" alt="">
                        </nuxt-link>
                    </div>
                    <div class="main-content-left-search">
                        <Input v-model="searchData" style="width:450px;" size="large" @keydown.enter.native="searchBaseData">
                            <Select slot="prepend" v-model="searchNavs" style="width:100px">
                                <Option v-for="(items, indexs) in menuData" :value="indexs" :key="indexs">{{items.ItemAttributesFullName}} </Option>
                            </Select>
                            <Button type="primary" slot="append" class="btn-bg" size="large" @click="searchBaseData">
                                搜索
                            </Button>
                        </Input>
                    </div>
                </div>
                <div>
                    <Input style="width:344px;" v-model="baiduData" size="large">
                        <Button type="primary" slot="append" class="btn-bg" size="large"  @click="onSearch">
                            百度
                        </Button>
                    </Input>
                </div>
            </div>
            <ul class="main-nav-tab">
                <li class="resource" @mouseenter="isShowCate=true" @mouseleave="isShowCate=false">
                    <span>档案库<i class="iconfont icon-jiantou"></i></span>
                    <LevelMenu class="banner-nav" v-show="isIndex || isShowCate"></LevelMenu>
                </li>
                <li>
                    <nuxt-link to="/BuildingCircle">建筑圈</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/attention">关注</nuxt-link>
                </li>
                <!-- <li @click="goRecommend">推荐</li> -->
                <li>
                    <nuxt-link to="/videos">视频</nuxt-link>
                </li>
                
                <li>
                    <nuxt-link to="/QuestionsAndAnswers">问答</nuxt-link>
                </li>
                <!-- <li @click="goHeAndI">建筑游学</li> -->
                <!-- <li @click="goAboutUs">建筑书店</li> -->
                <li>
                    <a href="javasrcipt:(0)"  @click="goMytribe">我的部落</a>
                    <!-- <nuxt-link to="/HeAndITribal"></nuxt-link> -->
                </li>
            </ul>
            <!-- <div class="main-nav-publish" @click="publish">发布</div> -->
        </div>
        <signPage />
    </div>
</template>
<script>
    import signPage from '../components/home/signPage'
    import LevelMenu from '../components/home/LevelMenu'
    import { getMenu } from '../service/clientAPI'
    import { mapState, mapGetters } from 'vuex'
    import { logout, setDemo} from '../LocalAPI'
    import {analogJump } from '../plugins/untils/public'
    export default {
        data() {
            return {
                isAd: false,
                isRegion: false,
                searchData: '',
                baiduData: '',
                loginIng: require('../assets/images/top_logo.png'),
                menuData: [],
                isIndex: true,  // 是否是首页
                isShowCate: false,  // 是否显示分类
                regionData: [
                    '上海','北京', '广州', '天津', '重庆', '河北', '山西', '河南', '辽宁', '吉林', '黑龙江', '内蒙古', '江苏'
                    ,'山东', '安徽', '浙江', '福建', '湖北', '湖南', '广东', '广西', '江西', '四川', '海南', '贵州', '云南', '西藏',
                    '陕西', '甘肃', '青海', '宁夏', '新疆', '港澳', '台湾'
                ],
                region: '',
                searchpage: '',
                allMessage: 0,
                Message: {},
                searchNavs: 0
            }
        },
        computed: {
            ...mapState({
                auth: state => state.overas.auth,
                searchNav: state => state.overas.searchNav,
                showSign: state => state.overas.showSign,
            }),
            ...mapGetters(['isLogin', 'getCusData', 'getComment', 'getInviter'])
        },
        components: {
            signPage,
            LevelMenu
        },
        mounted() {
            if (sessionStorage.getItem('searchIndex')) {
                this.searchNavs = sessionStorage.getItem('searchIndex')
            }
            if (this.isLogin) {
                this.getMessage()
            }
            this.region = localStorage.getItem('region') || '上海';
            if (sessionStorage.getItem('searchIndex')) {
                this.$store.dispatch('SEARCHDATA', sessionStorage.getItem('searchIndex') * 1);
                this.searchData = sessionStorage.getItem('searchKeyWords');
            }   
            this.isIndex = this.$route.name === 'index';
            let LOGGEDTome = setInterval(() => {
                if (!this.isLogin && !this.showSign) {
                    this.$store.dispatch('SETUP', true);
                    this.$store.dispatch('LOGGEDIN', 'signIn');
                } else {
                    clearInterval(LOGGEDTome)
                }
            }, 100)
        },
        watch: {
            $route(to, from) {
                this.isIndex = this.$route.name === 'index';
            },
            searchNav (val) {
                this.searchNavs = val
            }
        },
        async created() {
            let menuDatas = await getMenu();
            this.menuData = menuDatas.RetMenuData || [];
        },
        methods: {
            async getMessage () {
                let msg = await this.$store.dispatch('getNews');
                if (msg) {
                   this.Message = msg;
                    this.$store.dispatch('ACCusData', msg.dingzhi);
                    this.$store.dispatch('ACComment', msg.pinglun);
                    this.$store.dispatch('ACInviter', msg.invite);
                    Object.keys(msg).forEach(item =>{
                        this.allMessage += msg[item].MsgCount;
                    })
                }
            },
            switchRegion () {
                this.isRegion = true;
            },
            switchRegionLeave () {
                setTimeout ( () => {
                    this.isRegion = false;
                }, 200)
            },
            switchCities (name) {
                this.region = name;
                localStorage.setItem('region', name);
            },
            SignIn() {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
            },
            register() {
                this.$store.dispatch('SETUP', true)
                this.$store.dispatch('LOGGEDIN', 'perOrCom');
            },
            async signOut() {
                let msg = await logout();
                if (msg) {
                    this.$store.dispatch('LOGININ', null);
                    localStorage.removeItem('LOGININ');
                    this.$Message.success('退出成功！');
                }
            },
            async searchBaseData() {
                if (!this.searchNavs && this.searchNavs !== 0) {
                    this.$Message.warning('请先选择档案库类型~');
                    return false;
                }
                let baseSearchNav = {
                    key: 'baseSearchNav',
                    value: {
                        ClassTypeArrList: [{AttrKey: this.menuData[this.searchNavs].ItemAttributesId, AttrValue: this.menuData[this.searchNavs].ItemSubAttributeCode}],
                        title: this.menuData[this.searchNavs].ItemAttributesFullName,
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
                            KeyWords: this.searchData,
                            Order: true,
                            Page: 1,
                            Rows: 32
                        }
                    }
                }
                this.$store.dispatch('Serverstorage', baseSearchItem);
                let msgss = await setDemo('baseSearchItem', baseSearchItem);
                if (this.$route.name === "dataBase") {
                    // let routeData = this.$router.resolve({ name: 'dataBase'});
                    this.$router.push({ name: "dataBase"});
                    sessionStorage.setItem('searchIndex', this.searchNavs);
                    sessionStorage.setItem('searchKeyWords', this.searchData);
                    window.location.reload();
                } else {
                    this.$router.push({ name: "dataBase"});
                }
            },
            // 在线地图
            onlineMap() {
                window.open('https://map.51240.com/zhongguo__map/')
            },
            enterCenter () {
                this.$router.push({ name: "User-overview", params: {userId: this.auth.UserId}});
                // this.$router.push({ name: "PersonalCenter-myMessage-userId", params: {userId: this.auth.UserId}});
            },
            // 百度搜索
            onSearch() {
                // if (!this.baiduData) return false
                window.open(`https://www.baidu.com/s?ie=UTF-8&wd=${ this.baiduData }`)
            },
            publish() {
                let routeData = this.$router.resolve({ name: "publish-imageText" });
                analogJump(routeData.href);
            },
            goRecommend() {
                this.$router.push({ path: "/recommend" })
            },
            goHeAndI() {
                this.$Message.error('开发中....')
            },
            goMytribe () {
                if (!this.isLogin) {
                    this.$store.dispatch('SETUP', true);
                    this.$store.dispatch('LOGGEDIN', 'signIn');
                    return false
                }
                this.$router.push({ name: "HeAndITribal-id" })
            },
            goSearchPage () {
                if (!this.isLogin) {
                    this.$store.dispatch('SETUP', true);
                    this.$store.dispatch('LOGGEDIN', 'signIn');
                    return false
                }
                let routeData = this.$router.resolve({ name: 'searchPage', query: { id: this.searchpage } });
                analogJump(routeData.href);
            },
            // searchPage
            goAboutUs() {
                this.$Message.error('开发中....')
                // this.$router.push({ path: "/aboutUS" })
            },
        }
    }
</script>
<style lang="less" scoped>
    .main-nav-tab {
        a {
            color: #FF3C00;
        }
    }
    .badge-sty {
        top: 5px;
        line-height: 10px;
        height: 13px;
        border-radius: 5px;
    }
    .bottom-start-mess {
        font-size: 26px;
    }
    .sign-btn {
        &:hover {
            color: #FF3C00;
        }
    }
    .region-active {
        background: #FF3C00;
        color: #ffffff !important;
    }
    .region {
        color: #FF3C00;
        padding: 0 10px;
        border-left: 1px solid transparent;
        border-right: 1px solid transparent;
    }
    .regionhover {
        background: #ffffff;
        z-index: 1112;
        height: 41px;
        border-left: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
    }
    .region-box {
        position: absolute;
        width: 280px;
        background: #ffffff;
        top: 40px;
        z-index: 1111;
        padding: 0 16px;
        border: 1px solid #dddddd;
        li {
            display: inline-block;
            padding: 0 10px;
            margin: 0 3px;
            &:hover {
                color: #FF3C00;
            }
        }
    }
    .btn-bg {
        background-color: #808080 !important;
        color: #fff !important;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        &:focus {
            box-shadow:none;
        }
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
                position: relative;
            }
            &-right {
                width: 50%;
                display: flex;
                justify-content: flex-end;
                &-out {
                    cursor: pointer;
                }
                > li.content {
                    padding: 0 30px;
                    cursor: pointer;
                    &:hover {
                        color: #FF3C00;
                    }
                    &:first-child {
                        padding-right: 0;
                    }
                }
                .app-down {
                    color: #999999;
                }
            }
            &:last-child {
                cursor: pointer;
            }
        }
    }
    .main-nav {
        background: #F2F4F2;
        border-bottom: 1px solid #FF3C00;
        position: relative;

        &-tab {
            font-size: 16px;
            color: #FF3C00;
            display: flex;
            width: 1200px;
            margin: 0 auto;

            > li {
                padding: 8px 30px;
                cursor: pointer;
                font-size: 20px;
            }
        }

        &-publish {
            padding: 8px 30px;
            cursor: pointer;
            font-size: 16px;
            position: absolute;
            right: 68px;
            bottom: 0px;
            color: #ffffff;
            background: #FF3C00;
            border-top-left-radius: 3px;
            border-top-right-radius: 3px;
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
            img {
                width: 137px;
                height: 55px;
            }
        }
    }
    .resource {
        position: relative;
        font-size: 20px;
        background-color: #FF3C00;
        color: #ffffff;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        width: 143px;

        .banner-nav {
            position: absolute;
            top: 43px;
            left: 0;
            z-index: 99;
        }
    }
    .selection {
        background-color: #FF3C00;
        color: #ffffff;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
    .avatar {
        display: inline-block;
        width: 28px;
        height: 28px;
        background-color: #ccc;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: middle;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>
