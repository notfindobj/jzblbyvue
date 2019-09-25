<template>
        <div class="personal">
            <div class="personal-left">
                <div class="personal-left-header">
                    <div class="personal-left-header-img">
                        <img :src="GetUserData.HeadIconSrc " alt="" width="100px;">
                    </div>
                    <div class="personal-left-header-name">{{GetUserData.Nickname}}</div>
                </div>
                <ul class="personal-left-nav">
                    <li>
                        <nuxt-link :to="'/PersonalCenter/myMessage/'+userId">
                            <i class="icon iconfont icon-icon-test"></i>
                            {{isItMe ? '我的信息' : 'TA的信息'}}
                        </nuxt-link>
                    </li>
                    <li v-if="isItMe">
                        <nuxt-link to="/PersonalCenter/accountSecurity">
                            <i class="icon iconfont icon-zhanghuanquan"></i>
                            账户安全
                        </nuxt-link>
                    </li>
                    <li v-if="isItMe">
                        <nuxt-link to="/PersonalCenter/accountBinding">
                            <i class="icon iconfont icon-bangding"></i>
                            账户绑定
                        </nuxt-link>
                    </li >
                    <li v-if="isItMe">
                        <nuxt-link to="/PersonalCenter/records">
                            <i class="icon iconfont icon-shouhuodizhi"></i>
                            交易记录
                        </nuxt-link>
                    </li >
                    <li v-if="isItMe">
                        <nuxt-link to="/PersonalCenter/receivingAddress">
                            <i class="icon iconfont icon-shouhuodizhi"></i>
                            收货地址
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="personal-right">
                <nuxt-child />
            </div>
        </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { getUserData } from '../service/clientAPI'
export default {
    name: 'PersonalCenter',
    middleware: 'message',
    computed: {
        ...mapState({
            userInfo: state => state.overas.auth
        }),
    },
    data () {
        return {
            userId: '',
            isItMe: true,
            GetUserData: {
                HeadIconSrc: '',
                NickName: ''
            }
        }
    },
    created () {
        let query = {
            userId: this.userInfo.UserId
        }
        this.userId = this.userInfo.UserId
        if (this.$route.params.userId) {
            if (this.userInfo.UserId === this.$route.params.userId) {
                this.isItMe = true;
            } else {
                this.isItMe = false;
            }
            this.userId = this.$route.params.userId
            query.userId = this.$route.params.userId
        }
        this.getUserInfo(query);
    },
    methods: {
        // 个人资料
        async getUserInfo(value) {
            let msg = await getUserData(value);
            if (msg) {
                this.GetUserData = msg;
            }
        },
    },
}
</script>
<style lang="less">
    @import '../assets/css/PersonalCenter/index.less';
    .personal-box {
        background: #F2F4F2;
    }
    .personal {
        display: flex;
        width: 1200px;
        margin: 30px auto 90px;
        min-height: 720px;
        &-left {
            width: 200px;
            background: #ffffff;
            margin-right: 20px;
            color: #666666;
            font-size: 16px;
            text-align: center;
            box-shadow: 0 0 4px 0 #c8c3c3;
            &-header {
                text-align: center;
                &-img {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    margin: 50px 50px 10px 50px;
                    background: #999999;
                    overflow: hidden;
                    img {
                        height: 100%;
                    }
                }
                &-name {
                    font-size: 16px;
                    color: #000000;
                    margin-bottom: 20px;
                }
            }
            &-nav {
                line-height: 50px;
                cursor: pointer;
                a {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                }
                .nuxt-link-active {
                    color: #ffffff;
                    background: #FF3C00;
                }
            }
        }
        &-right {
            width: 100%;
            background: #ffffff;
            box-shadow: 0 0 4px 0 #c8c3c3;
            padding: 50px 50px 30px;
        }
    }
</style>
