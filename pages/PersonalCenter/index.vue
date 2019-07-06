<template>
        <div class="personal">
            <div class="personal-left">
                <div class="personal-left-header">
                    <div class="personal-left-header-img">
                        <img :src="userInfo.HeadIcon" alt="" width="100px;">
                    </div>
                    <div class="personal-left-header-name">{{userInfo.NickName}}</div>
                </div>
                <ul class="personal-left-nav">
                    <li :class="PersonalCenter === 'myMessage' ? 'action' : ''" @click="personal('myMessage')">
                        <span>
                            <i class="icon iconfont icon-icon-test"></i>
                            我的信息
                        </span>
                    </li>
                    <li :class="PersonalCenter === 'accountSecurity' ? 'action' : ''" @click="personal('accountSecurity')">
                        <span>
                            <i class="icon iconfont icon-zhanghuanquan"></i>
                            账户安全
                        </span>
                    </li>
                    <li :class="PersonalCenter === 'accountBinding' ? 'action' : ''" @click="personal('accountBinding')">
                        <span>
                            <i class="icon iconfont icon-bangding"></i>
                            账户绑定
                        </span>
                    </li>
                    <li :class="PersonalCenter === 'receivingAddress' ? 'action' : ''" @click="personal('receivingAddress')">
                        <span>
                            <i class="icon iconfont icon-shouhuodizhi"></i>
                            收货地址
                        </span>
                    </li>
                </ul>
            </div>
            <div class="personal-right">
                <div :is="PersonalCenter"></div>
            </div>
        </div>
</template>
<script>
import myMessage from './myMessage'
import accountSecurity from './accountSecurity'
import accountBinding from './accountBinding'
import receivingAddress from './receivingAddress'
  import { mapState, mapGetters } from 'vuex'
export default {
    name: 'PersonalCenter',
    components: {
        myMessage,
        accountSecurity,
        accountBinding,
        receivingAddress
    },
    computed: {
        ...mapState({
        userInfo: state => state.overas.auth
      }),
    },
    data () {
        return {
            PersonalCenter: 'myMessage'
        }
    },
    methods: {
        personal (val) {
            this.PersonalCenter = val;
        }
    }
}
</script>
<style lang="less">
    @import '../../assets/css/PersonalCenter/index.less';
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
            }
        }
        &-right {
            width: 100%;
            background: #ffffff;
            box-shadow: 0 0 4px 0 #c8c3c3;
            padding: 50px 50px 0;
        }
    }
    .action {
        background: #FF3C00;
        color: #ffffff;
    }
</style>
