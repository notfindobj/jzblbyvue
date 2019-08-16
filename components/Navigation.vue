<template>
    <div>
        <!-- 头部导航 -->
        <div class="home-bar">
            <div class="home-bar-content">
                <ul class="home-bar-content-left" @mouseleave="switchRegionLeave">
                    <li>欢迎您，来到建筑部落！</li>
                    <li :class="isRegion ? 'region regionhover' : 'region'" @mouseenter="switchRegion">
                        <i class="icon iconfont">&#xe6ad;</i>
                        <span>{{region}} [切换城市]</span>
                    </li>
                    <ul v-show="isRegion" class="region-box" @mouseenter="switchRegion" @mouseleave="switchRegionLeave">
                        <li :class="region ===item ? 'region-active' : ''"  v-for="(item, index) in regionData" @click="switchCities(item)" :key="index">{{item}}</li>
                    </ul>
                </ul>
                <ul class="home-bar-content-right">
                    <li class="Headportrait">
                        <div class="avatar">
                            <img :src="auth ? auth.HeadIcon : ''" alt="">
                        </div>
                        <span v-if="!auth" @click="SignIn">登录</span>
                        <div v-else style="display: inline-block;">
                            <span @click="enterCenter">{{auth.NickName}}</span>
                            <span class="home-bar-content-right-out" @click="signOut">[退出]</span>
                        </div>
                    </li>
                    <li class="content" @click="onlineMap">在线地图</li>
                    <li>
                        <Dropdown placement="bottom-start">
                            <a href="javascript:void(0)" class="app-down">
                                APP下载
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>关于我们</DropdownItem>
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
                        <nuxt-link to="/">
                            <img :src="loginIng" alt="">
                        </nuxt-link>
                    </div>
                    <div class="main-content-left-search">
                        <Input v-model="searchData" style="width:450px;" size="large">
                            <Select slot="prepend" v-model="searchTitle" style="width:100px">
                                <Option v-for="(items, indexs) in menuData" :value="indexs" :key="indexs">{{items.ItemAttributesFullName}} </Option>
                            </Select>
                            <Button type="primary" slot="append" class="btn-bg" size="large" @click="searchBaseData">
                                搜索
                            </Button>
                        </Input>
                    </div>
                </div>
                <div>
                    <Input style="width:344px;" v-model="baiduData" size="large" search enter-button="百度" placeholder="" @on-search="onSearch"/>
                </div>
            </div>
            <ul class="main-nav-tab">
                <li class="resource" @mouseenter="isShowCate=true" @mouseleave="isShowCate=false">
                    <span>资源库 <i class="iconfont icon-jiantou"></i></span>
                    <LevelMenu class="banner-nav" v-show="isIndex || isShowCate"></LevelMenu>
                </li>
                <li @click="goAttention">关注</li>
                <!-- <li @click="goRecommend">推荐</li> -->
                <li @click="goVideo">视频</li>
                <li @click="goQuestion">问答</li>
                <li @click="goBuilding">建筑圈</li>
                <li @click="goHeAndI">建筑游学</li>
                <li @click="goAboutUs">建筑书店</li>
                <li @click="goMytribe">我的部落</li>
            </ul>
            <div class="main-nav-publish" @click="publish">发布</div>
        </div>
        <signPage></signPage>
    </div>
</template>
<script>
    import signPage from '../components/home/signPage'
    import LevelMenu from '../components/home/LevelMenu'
    import { getMenu } from '../service/clientAPI'
    import { mapState, mapGetters } from 'vuex'
    import { logout, setDemo} from '../LocalAPI'
    export default {
        data() {
            return {
                isAd: false,
                isRegion: false,
                searchData: '',
                searchTitle: '',
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
                region: ''
            }
        },
        computed: {
            ...mapState({
                auth: state => state.overas.auth
            }),
            ...mapGetters(['isLogin'])
        },
        components: {
            signPage,
            LevelMenu
        },
        mounted() {
            this.region = localStorage.getItem('region') || '上海';
            if (sessionStorage.getItem('searchIndex')) {
                this.searchTitle = sessionStorage.getItem('searchIndex') * 1;
                this.searchData = sessionStorage.getItem('searchKeyWords');
            }
            this.isIndex = this.$route.name === 'index';
        },
        watch: {
            $route(to, from) {
                this.isIndex = this.$route.name === 'index';
            }
        },
        async created() {
            let menuDatas = await getMenu();
            this.menuData = menuDatas.RetMenuData || [];
        },
        methods: {
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
                this.$store.dispatch('SETUP', true)
            },
            async signOut() {
                let msg = await logout();
                this.$router.push({name: "index"});
                if (msg) {
                    this.$store.dispatch('LOGININ', null);
                    localStorage.removeItem('LOGININ');
                    this.$Message.success('退出成功！');
                }
            },
            async searchBaseData() {
                if (!this.searchTitle && this.searchTitle !== 0) {
                    this.$Message.warning('请先选择资源库类型~');
                    return false;
                }
                let baseDateId = {
                    key: 'dataBase',
                    value: {
                        ClassTypeId: `${ this.menuData[this.searchTitle].ItemSubAttributeCode }|${ this.menuData[this.searchTitle].ItemAttributesId }`,
                        ClassTypeArrList: [{ArrId: '',ArrEnCode: ''}],
                        SortType: '1',
                        KeyWords: this.searchData,
                        Order: true,
                        Page: 0,
                        Rows: 32,
                        classify: 0,
                        title: this.menuData[this.searchTitle].ItemAttributesFullName,
                    }
                }
                this.$store.dispatch('Serverstorage', baseDateId);
                let msgs = await setDemo('dataBase', baseDateId);
                if (this.$route.name === "dataBase-id") {
                    this.$router.push({ name: "dataBase-id", query: { id: this.menuData[this.searchTitle].ItemAttributesId}});
                    sessionStorage.setItem('searchIndex', this.searchTitle);
                    sessionStorage.setItem('searchKeyWords', this.searchData);
                    window.location.reload();
                } else {
                    this.$router.push({ name: "dataBase-id", query: { id: this.menuData[this.searchTitle].ItemAttributesId}})
                }
            },
            // 在线地图
            onlineMap() {
                window.open('https://map.51240.com/zhongguo__map/')
            },
            enterCenter () {
                if (!this.isLogin) {
                    return false
                }
                this.$router.push({ path: "/PersonalCenter" });
            },
            // 百度搜索
            onSearch() {
                if (!this.baiduData) return false
                window.open(`https://www.baidu.com/s?ie=UTF-8&wd=${ this.baiduData }`)
            },
            publish() {
                if (this.isLogin) {
                    let routeData = this.$router.resolve({ name: "publish-imageText" });
                    window.open(routeData.href, '_blank');
                }
            },
            goAttention() {
                this.$router.push({ path: "/attention" })
            },
            goRecommend() {
                this.$router.push({ path: "/recommend" })
            },
            goVideo() {
                if (!this.isLogin) {
                    return false
                }
                this.$router.push({ path: "/videos" })
            },
            goQuestion() {
                if (!this.isLogin) {
                    return false
                }
                this.$router.push({ path: "/QuestionsAndAnswers" })
            },
            goBuilding() {
                if (!this.isLogin) {
                    return false
                }
                this.$router.push({ path: "/BuildingCircle" })
            },
            goHeAndI() {
                this.$Message.error('开发中....')
                if (!this.isLogin) {
                    return false
                }
                // this.$router.push({ path: "/PersonalCenter" })
            },
            goAboutUs() {
                this.$Message.error('开发中....')
                // this.$router.push({ path: "/aboutUS" })
            },
            goMytribe() {
                this.$router.push({ path: "/HeAndITribal" })
            }
        }
    }
</script>
<style lang="less" scoped>
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
        left: 154px;
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
        background-color: #FF3C00 !important;
        color: #ffffff !important;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
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
