<template>
    <div class="message">
        <ul class="message-left">
            <li><nuxt-link to="/Message/customized">评论消息{{getComment.MsgCount || ""}}</nuxt-link></li>
            <li><nuxt-link to="/Message/comment">定制消息{{getCusData.MsgCount || ""}}</nuxt-link></li>
            <li><nuxt-link to="/Message/inviter">定制消息{{getInviter.MsgCount || ""}}</nuxt-link></li>
        </ul>
        <div class="message-right">
            <nuxt-child />
        </div>
    </div>
</template>
<script>
import {mapGetters } from 'vuex'
export default {
    layout: 'main',
    middleware: ['message', 'authenticated'],
    computed: {
        ...mapGetters(['isLogin', 'getCusData', 'getComment', 'getInviter'])
    },
}
</script>
<style lang="less" scoped>
    .message {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        &-left {
            width: 200px;
            color: #666666;
            max-height: 500px;
            font-size: 16px;
            background: #ffffff;
            margin-right: 20px;
            border-radius: 5px;
            li {
                height: 50px;
                line-height: 50px;
                text-align: center;
                cursor: pointer;
                a{
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                }
                // a:hover {
                //    color: #ffffff;
                //    background: #FF3C00;
                // }
                .nuxt-link-active {
                    color: #ffffff;
                    background: #FF3C00;
                }
            }
        }
        &-right {
            flex: 1;
            background: #ffffff;
            min-height: 600px;
        }
    }
</style>