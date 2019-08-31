<template>
    <div class="message">
        <ul class="message-left">
            <li> <nuxt-link to="/Message/customized"></nuxt-link> <a href="">评论消息</a></li>
            <li> <nuxt-link to="/Message/comment">定制消息</nuxt-link></a></li>
            <li> <a href="">系统消息</a></li>
        </ul>
        <div>
            <nuxt-child />
        </div>
    </div>
</template>
<script>
export default {
    layout: 'main',
    middleware: 'message',
}
</script>
<style lang="less" scoped>
    .message {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        &-left {
            
        }
    }
</style>