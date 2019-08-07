<template>
    <div>
        <div class="header">
            <div class="container">
                <img class="logo-img" @click="goHome" :src="loginImg" alt="建筑部落">
                <div class="address">
                    <i class="icon iconfont">&#xe6ad;</i>
                    <span>上海</span>
                    <span>[切换城市]</span>
                </div>
                <div class="nav-list">
                    <nuxt-link to="/HeAndITribal">我的部落</nuxt-link>
                    <nuxt-link to="/attention">关注</nuxt-link>
                    <nuxt-link to="/recommend">推荐</nuxt-link>
                    <nuxt-link to="/videos">视频</nuxt-link>
                    <nuxt-link to="/BuildingCircle">建筑圈</nuxt-link>
                    <nuxt-link to="/QuestionsAndAnswers">问答</nuxt-link>
                </div>
                <div class="search">
                    <i class="icon iconfont">&#xe608;</i>
                </div>
                <div class="user">
                    <div class="avatar">
                         <img :src="auth ? auth.HeadIcon : ''" alt="">
                    </div>
                    <span class="user-name" v-if="!auth" @click="SignIn">登录</span>
                    <div class="user-name" v-else>
                          <span>{{auth.NickName}}</span>
                          <span class="home-bar-content-right-out" @click="signOut">[退出]</span>
                    </div>
                </div>
                <div class="online-map" @click="onlineMap">在线地图</div>
                <Dropdown class="right-select">
                    <a href="javascript:void(0)">
                        APP下载
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>驴打滚</DropdownItem>
                        <DropdownItem>炸酱面</DropdownItem>
                        <DropdownItem disabled>豆汁儿</DropdownItem>
                        <DropdownItem>冰糖葫芦</DropdownItem>
                        <DropdownItem divided>北京烤鸭</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    </div>
</template>
<script>
  import { mapState, mapGetters } from 'vuex'
  import { logout, setDemo} from '../LocalAPI'
  import axios from 'axios'
  export default {
    data() {
      return {
        loginImg: require('../assets/images/top_logo.png'),
      }
    },
    computed: {
        ...mapState({
            auth: state => state.overas.auth
        }),
    },
    methods: {
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
    }
  }
</script>
<style lang="less" scoped>
    .header {
        height: 60px;
        background-color: #fff;
        border-bottom: 1px solid #F2F4F2;

        .container {
            width: 1200px;
            height: 100%;
            display: flex;
            align-items: center;
            margin: 0 auto;

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
                margin-left: 30px;
                font-size: 16px;
                a {
                    height: 60px;
                    margin: 0 20px;
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
            }
            .search {
                margin-left: 20px;
            }
            .user {
                display: flex;
                align-items: center;
                margin-left: 40px;
                cursor: pointer;
                .avatar {
                    width: 28px;
                    height: 28px;
                    background-color: #ccc;
                    border-radius: 50%;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .user-name {
                    font-size: 14px;
                    color: #999;
                    margin-left: 4px;
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
