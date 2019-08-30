<template>
    <div>
        <ul>
            <li> <a href="">评论消息</a></li>
            <li> <a href="">定制消息</a></li>
            <li> <a href="">系统消息</a></li>
        </ul>
        <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }"/>
    </div>
</template>
<script>
export default {
    created () {
        this.$router.push('/Message/customized'); // 页面加载时跳转
    }
}
</script>