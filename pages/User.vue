<template>
    <div class="user">
        <ul class="user-side">
            <li>
               <div class="user-side-title">
                   <nuxt-link to="/User/overview">
                       <img :src="Identity.HeadIcon" alt="">
                   </nuxt-link>
               </div>
               <div>嘿嘿嘿</div>
            </li>
            <li>
                <p>消息中心</p>
                <nuxt-link to="/User/system">系统消息</nuxt-link>
                <nuxt-link to="/User/comment">评论消息{{getComment.MsgCount || ""}}</nuxt-link>
                <nuxt-link to="/User/customized">定制消息{{getCusData.MsgCount || ""}}</nuxt-link>
                <nuxt-link to="/User/Invitation">邀请消息{{getInviter.MsgCount || ""}}</nuxt-link>
            </li>
            <!-- <li>
                <p>合作设计师</p>
                <nuxt-link to="">实名认证</nuxt-link>
            </li> -->
            <!-- <li>
                <p>订单管理 </p>
                <nuxt-link to="/User/downloadOrder">需求订单</nuxt-link>
            </li> -->
            <li>
                <p>资产管理 </p>
                <nuxt-link to="/User/rmbBill">人民币收支详情</nuxt-link>
                <nuxt-link to="/User/tribalBill">部落币收支详情</nuxt-link>
                <nuxt-link to="/User/integralBill">我的积分</nuxt-link>
                <!-- <nuxt-link to="/a123">我的卡券</nuxt-link> -->
            </li>
            <li>
                <p>首页管理 </p>
                <nuxt-link to="/HeAndITribal">我的发布</nuxt-link>
                <nuxt-link to="/HeAndITribal">我的收藏</nuxt-link>
                <nuxt-link to="/HeAndITribal">我的下载</nuxt-link>
                <!-- <nuxt-link to="/User/myComments">我的评论</nuxt-link> -->
                <nuxt-link to="/HeAndITribal">我的关注</nuxt-link>
                <!-- <nuxt-link to="/User/myRecommended">被推荐作品</nuxt-link>
                <nuxt-link to="/User/browseRecord">浏览记录</nuxt-link> -->
            </li>
            <li>
                <p>账号管理 </p>
                <nuxt-link :to="Identity.IsEnt === 2 ? '/User/personalData' : '/User/companyInfo'">账户资料</nuxt-link>
                <nuxt-link :to="Identity.IsEnt === 2 ? '/User/attestation' : '/User/adminis'">身份认证</nuxt-link>
                <nuxt-link to="/User/myBond">我的保证金</nuxt-link>
                <nuxt-link to="/User/myInvoice">我的发票</nuxt-link>
                <nuxt-link to="/User/myAddress">收货地址</nuxt-link>
                <nuxt-link to="/User/security">账户安全</nuxt-link>
            </li>
            <li>
                <p>保障服务 </p>
                <nuxt-link to="/User/myReport">我的举报</nuxt-link>
                <nuxt-link to="/User/feedback">意见反馈</nuxt-link>
            </li>
        </ul>
        <div class="user-right">
            <nuxt-child />
        </div>
    </div>
</template>
<script>
import { mapState, mapGetters} from 'vuex'
export default {
    middleware: ['message', 'authenticated'],
    layout: 'main',
    transition (to, from) {
        if (!from) { return 'slide-left' }
        return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
    },
    computed: {
        ...mapState({
            Identity: state => state.overas.auth || {}
        }),
        ...mapGetters(['isLogin', 'getCusData', 'getComment', 'getInviter'])
    },
    methods: {
        
    },
}
</script>
<style lang="less" scoped>
    .user {
        width :1024px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        &-side {
            width: 120px;
            text-align: left;
            padding: 0;
            background: #ffffff;
            box-shadow: 0px 0px 5px #e2e2e2;
            height: 730px;
            position: sticky;
            top: 60px;
            li {
                .user-side-title {
                    display: inline-block;
                    border-radius: 50%;
                    width: 80px;
                    height: 80px;
                    overflow: hidden;
                    border: 1px solid #eaeaea;
                    cursor: pointer;
                    a {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        padding: 0;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                p {
                    padding-left: 30px;
                    font-size: 14px;
                    font-weight: 600;
                }
                a {
                    padding-left: 30px;
                    line-height: 25px;
                    display: block;
                    position: relative;
                    &:hover {
                        background: #e8e8e8;
                        &::before {
                            position: absolute;
                            content: '';
                            width: 3px;
                            height: 25px;
                            background: #ff3c00;
                            left: 0;
                        }  
                    }
                }
                .nuxt-link-active {
                    background: #e8e8e8;
                    &::before {
                        position: absolute;
                        content: '';
                        width: 3px;
                        height: 25px;
                        background: #ff3c00;
                        left: 0;
                    }
                }
                &:first-child {
                    text-align: center;
                    margin-bottom: 10px;
                    margin-top: 10px;
                }
            }
        }
        &-right {
            width: 890px;
            background: #ffffff;
            padding: 10px;
        }
    }
</style>