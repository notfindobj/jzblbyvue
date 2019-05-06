<template>
    <div>
        <div class="top"></div>
        <div class="header">
            <div class="container">
                <img class="logo-img" :src="loginImg" alt="建筑部落">
                <div class="address">
                    <i class="icon iconfont">&#xe6ad;</i>
                    <span>上海</span>
                    <span>[切换城市]</span>
                </div>
                <div class="nav-list">
                    <nuxt-link to="/">我的部落</nuxt-link>
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
                    <div class="avatar"></div>
                    <span class="user-name">梅赛德斯·赵四</span>
                </div>
                <div class="online-map">在线地图</div>
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
  export default {
    data() {
      return {
        loginImg: require('../assets/images/top_logo.png'),
      }
    }
  }
</script>

<style lang="less" scoped>
    .top {
        height: 60px;
        background-color: #ccc;
    }

    .header {
        height: 60px;
        background-color: #fff;
        .container {
            width: 1200px;
            height: 100%;
            display: flex;
            align-items: center;
            margin: 0 auto;
            .logo-img {
                width: 100px;
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
                margin-left: 70px;
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
                .avatar {
                    width: 28px;
                    height: 28px;
                    background-color: #ccc;
                    border-radius: 50%;
                }
                .user-name {
                    font-size: 14px;
                    color: #999;
                    margin-left: 4px;
                }
            }
            .online-map {
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
