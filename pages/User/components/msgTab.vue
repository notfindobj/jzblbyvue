<template>
    <ul class="msgTab">
        <li>
            <nuxt-link to="/User/system">系统消息</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/User/comment">评论消息</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/User/customized">定制消息</nuxt-link>
        </li>
        <li>
            <nuxt-link to="/User/Invitation">邀请消息</nuxt-link>
        </li>
    </ul>
</template>
<style lang="less" scoped>
    .msgTab {
        display: flex;
        border-bottom: 1px solid #dddddd;
        li {
            display: flex;
            a {
                padding: 10px;
                position: relative;
            }
            .nuxt-link-active {
                &::before {
                    position: absolute;
                    content: '';
                    width: 100%;
                    height: 3px;
                    background: #ff3c00;
                    bottom: -1px;
                    left: 0;
                }
            }
        }
    }
</style>