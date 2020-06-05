<template>
    <div class="header">
        <div class="container">
            <ul class="nav-list">
                <li>
                    <img class="logo-img" @click="goHome" :src="loginImg" alt="建筑部落">
                </li>
                 <li>
                    <nuxt-link to="/dataBase" @click.native="goList">档案库</nuxt-link>
                </li>
                
                <li>
                    <nuxt-link to="/BuildingCircle">建筑圈</nuxt-link>
                </li>
                <li >
                    <nuxt-link to="/attention" >关注</nuxt-link>
                </li>
                <!-- <li>
                    <nuxt-link to="/recommend">推荐</nuxt-link>
                </li> -->
                <li>
                    <nuxt-link to="/videos">视频</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/QuestionsAndAnswers">问答</nuxt-link>
                </li>
                <li>
                    <a href="javasrcipt:(0)" :class="$route.name === 'HeAndITribal-id' ? 'nuxt-link-exact-active nuxt-link-active' : ''" @click="goMytribe">我的部落</a>
                </li>
                <li>
                    <nuxt-link to="/order_lobby">接单大厅</nuxt-link>
                </li>
                <li>
                    <a>建筑学院（内测中）</a>
                </li>
                <li>
                    <Input icon="ios-search" v-model="searchpage" placeholder="搜索问答、找人" style="width: auto" @keydown.enter.native="goSearchPage" @on-click="goSearchPage"/>
                </li>
            </ul>
            <ul class="user">
                <li class="user-info">
                    <img  @click="enterCenter" :src="auth ? auth.HeadIcon : $defaultHead" alt="">
                    <span class="user-name" v-if="!auth" @click="SignIn">登录</span>
                    <div class="user-name" v-else>
                        <Dropdown>
                            <a href="javascript:void(0)">
                                <Badge :show-zero="allMessage ? true : false" dot :count="allMessage">
                                   <span @click="enterCenter" class="maxName">{{auth.NickName}}</span>
                                    <Icon type="ios-arrow-down"></Icon>
                                </Badge >
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>
                                    <nuxt-link to="/User/system">系统消息 <Badge v-if="getSystem.MsgCount > 0" :count="getSystem.MsgCount"></Badge></nuxt-link>
                                </DropdownItem>
                                <DropdownItem>
                                    <nuxt-link to="/User/comment">评论消息 <Badge v-if="getComment.MsgCount > 0" :count="getComment.MsgCount"></Badge></nuxt-link>
                                </DropdownItem>
                                <DropdownItem>
                                    <nuxt-link to="/User/customized">定制消息 <Badge v-if="getInviter.MsgCount > 0" :count="getInviter.MsgCount"></Badge></nuxt-link>
                                </DropdownItem>
                                <DropdownItem>
                                    <nuxt-link to="/User/Invitation">邀请消息 <Badge v-if="getCusData.MsgCount > 0" :count="getCusData.MsgCount"></Badge></nuxt-link>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <span class="home-bar-content-right-out" @click="signOut">[退出]</span>
                    </div>
                </li>
            </ul>
        </div>
        <signPage />
    </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import signPage from '../components/home/signPage'
import { logout, setDemo} from '../LocalAPI'
import {analogJump } from '../plugins/untils/public'
export default {
    components: {
        signPage
    },
    data() {
      return {
        loginImg: require('../assets/images/top_logo.png'),
        searchpage: '',
        allMessage: 0,
      }
    },
    computed: {
        ...mapState({
            auth: state => state.overas.auth,
            showSign: state => state.overas.showSign,
        }),
        ...mapGetters(['isLogin', 'getCusData', 'getComment', 'getInviter', 'getSystem'])
    },
    mounted () {
        if (this.isLogin) {
            this.getMessage()
        }
        let LOGGEDTome = setInterval(() => {
            if (!this.isLogin && !this.showSign) {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
            } else {
                clearInterval(LOGGEDTome)
            }
        }, 100)
    },
    methods: {
        async getMessage () {
            let msg = await this.$store.dispatch('getNews');
            if (msg) {
                this.$store.dispatch('ACCusData', msg.dingzhi);
                this.$store.dispatch('ACComment', msg.pinglun);
                this.$store.dispatch('ACInviter', msg.invite);
                this.$store.dispatch('ACSystem', msg.xitong);
                this.allMessage = msg.dingzhi.MsgCount + msg.pinglun.MsgCount + msg.invite.MsgCount + msg.xitong.MsgCount
            }
        },
        // 点击一级分类
        async goList(cate) {
            if (!this.isLogin) {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
                return false
            }
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
        },
        enterCenter () {
            // this.$router.push({ name: "PersonalCenter-myMessage-userId", params: {userId: this.auth.UserId}});
            this.$router.push({ name: "User-overview", params: {userId: this.auth.UserId}});
        },
        // 在线地图
        onlineMap() {
            window.open('https://map.51240.com/zhongguo__map/')
        },
        // 回首页
        goHome() {
            this.$router.push('/')
        },
        SignIn() {
            this.$store.dispatch('SETUP', true);
            this.$store.dispatch('LOGGEDIN', 'signIn');
        },
        goMytribe() {
            if (!this.isLogin) {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
                return false
            }
            this.$router.push({ name: "HeAndITribal-id" })
        },
        searchPach () {
            this.$router.push({ name: "searchPage" });
        },
        goSearchPage () {
            let routeData = this.$router.resolve({ name: 'searchPage', query: { id: this.searchpage } });
            analogJump(routeData.href);
        },
        async signOut() {
            let msg = await logout();
            if (msg) {
                this.$store.dispatch('LOGININ', null);
                localStorage.removeItem('LOGININ');
                this.$Message.success('退出成功！');
                if (['HeAndITribal-id','Message-customized','Message-comment','Message-inviter',
                'attention','PersonalCenter-myMessage-userId','PersonalCenter-accountSecurity', 
                'PersonalCenter-accountBinding', 'PersonalCenter-accountBinding', 'PersonalCenter-records',
                'PersonalCenter-receivingAddress', 'User-myReport', "sign"].includes(this.$route.name)) {
                    this.$router.push({name: 'index'})
                }
                if (this.$route.name.indexOf('User') !== -1) {
                    this.$router.push({name: 'index'})
                }
            }
        },
    }
}
</script>
<style lang="less" scoped>
   .bottom-start-mess {
        font-size: 26px;
    }
    .user-info {
        display: flex;
    }
    .maxName {
        max-width: 60px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .header {
        height: 60px;
        background-color: #fff;
        border-bottom: 1px solid #F2F4F2;
        position: sticky;
        top: 0;
        z-index: 1001;
        .container {
            width: 1200px;
            height: 100%;
            display: flex;
            align-items: center;
            margin: 0 auto;
            justify-content: space-between;
            .logo-img {
                width: 100px;
                cursor: pointer;
            }
            .address {
                color: #FF3C00;
                margin-left: 30px;

                span {
                    font-size: 14px;
                    margin: 0 2px;
                }
            }

            .nav-list {
                display: flex;
                align-items: center;
                font-size: 17px;
                a {
                    display: inline-block;
                    height: 60px;
                    margin: 0 15px;
                    line-height: 60px;

                }
                a:hover {
                    color: #FF3C00;
                    border-bottom: 2px solid #ff3c00;
                }
                .nuxt-link-active {
                    color: #FF3C00;
                    border-bottom: 2px solid #ff3c00;
                }
                li {
                    &:first-child {
                        margin-right: 30px;
                    }
                }
            }
            .search {
                cursor: pointer;
                margin-left: 20px;
                &:hover {
                    color: #FF3C00;
                }
            }
            .user {
                display: flex;
                align-items: center;
                // margin-left: 40px;
                cursor: pointer;
                img {
                    width: 28px;
                    height: 28px;
                    background-color: #ccc;
                    border-radius: 50%;
                    overflow: hidden;
                }
                .user-name {
                    font-size: 14px;
                    color: #999;
                    margin-left: 4px;
                    line-height: 30px;
                }
            }
            .online-map {
                cursor: pointer;
                font-size: 14px;
                color: #999;
                margin: 0 30px;
            }

            .right-select {
                font-size: 14px;
            }
        }
    }
</style>
