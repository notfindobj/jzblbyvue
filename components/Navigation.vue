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
                        <div v-else>
                            <span>{{auth.NickName}}</span>
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
                        <nuxt-link to="/">
                            <img :src="loginIng" alt="">
                        </nuxt-link>
                    </div>
                    <div class="main-content-left-search">
                        <Input v-model="seatchData" style="width:450px;" size="large">
                            <Select slot="prepend" v-model="searchTitle" style="width:100px">
                                <Option v-for="(items, indexs) in menuData"
                                        :value="`${items.ItemSubAttributeCode}|${items.ItemAttributesId},${items.ItemAttributesFullName}`"
                                        :key="indexs">{{items.ItemAttributesFullName}}
                                </Option>
                            </Select>
                            <Button type="primary" slot="append" class="btn-bg" size="large" @click="searchBaseData">
                                搜索
                            </Button>
                        </Input>
                    </div>
                </div>
                <div>
                    <Input style="width:344px;" v-model="baiduData" size="large" search enter-button="百度" placeholder=""
                           @on-search="onSearch"/>
                </div>
            </div>
            <ul class="main-nav-tab">
                <li class="resource" @mouseenter="isShowCate=true" @mouseleave="isShowCate=false">
                    <span>资源库 <i class="iconfont icon-jiantou"></i></span>
                    <LevelMenu class="banner-nav" v-show="isIndex || isShowCate"></LevelMenu>
                </li>
                <li @click="goAttention">关注</li>
                <li @click="goRecommend">推荐</li>
                <li @click="goVideo">视频</li>
                <li @click="goQuestion">问答</li>
                <li @click="goBuilding">建筑圈</li>
                <li @click="goHeAndI">建筑游学</li>
                <li @click="goAboutUs">建筑书店</li>
                <li>我的部落</li>
            </ul>
            <div class="main-nav-publish" @click="publish">发布</div>
        </div>
        <signPage></signPage>
    </div>
</template>
<script>
  import signPage from '../components/home/signPage'
  import LevelMenu from '~/components/home/LevelMenu'
  import { getMenu } from '../service/clientAPI'
  import { mapState, mapGetters } from 'vuex'
  import axios from 'axios'

  export default {
    data() {
      return {
        seatchData: '',
        searchTitle: '',
        baiduData: '',
        loginIng: require('../assets/images/top_logo.png'),
        menuData: [],
        isIndex: true,  // 是否是首页
        isShowCate: false,  // 是否显示分类
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
      SignIn() {
        this.$store.dispatch('SETUP', true)
      },
      async signOut() {
        let config = {
          url: process.env.NODE_ENV === 'production' ? 'http://192.210.170.17:8889/api/logout' : 'http://127.0.0.1:8889/api/logout',
          withCredentials: true,
          method: 'post',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        }
        axios(config)
          .then(res => {
            this.$store.dispatch('LOGININ', null);
            localStorage.removeItem('LOGININ')
            this.$Message.success(res.data.Msg);
          })
      },
      searchBaseData() {
        let _this = this;
        if (!this.searchTitle) {
          return false;
        }
        let baseDateId = {
          ClassTypeId: _this.searchTitle.split(',')[0],
          ClassTypeArrList: [{ ArrId: '', ArrEnCode: '' }],
          SortType: 0,
          KeyWords: this.seatchData,
          Order: true,
          Page: 0,
          Rows: 8,
          title: _this.searchTitle.split(',')[1],
        }
        this.$router.push({ name: "dataBase", query: { dataBase: JSON.stringify(baseDateId) } })
      },
      // 在线地图
      onlineMap() {
        window.open('http://www.baidu.com')
      },
      // 百度搜索
      onSearch() {
        if (!this.baiduData) return false
        window.open(`https://www.baidu.com/s?ie=UTF-8&wd=${ this.baiduData }`)
      },
      publish() {
        if (this.isLogin) {
          this.$router.push({ name: "publish-imageText" })
        }
      },
      goAttention() {
        this.$router.push({ path: "/attention" })
      },
      goRecommend() {
        this.$router.push({ path: "/recommend" })
      },

      goVideo() {
        this.$router.push({ path: "/videos" })
      },

      goQuestion() {
        this.$router.push({ path: "/QuestionsAndAnswers" })
      },

      goBuilding() {
        this.$router.push({ path: "/BuildingCircle" })
      },
      goHeAndI() {
        this.$router.push({ path: "/HeAndITribal" })
      },
      goAboutUs() {
        this.$router.push({ path: "/aboutUS" })
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
        .banner-nav {
            position: absolute;
            top: 43px;
            left: 0;
        }
    }

    .selection {
        background-color: #FF3C00;
        color: #ffffff;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
    }
</style>
