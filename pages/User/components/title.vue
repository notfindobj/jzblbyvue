<template>
    <div class="ptitle" :style="`border-bottom:${bottomLine ? '1px solid #dddddd;' : ''}`">
        <span class="ptitle-name">{{title}}</span>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '公告title'
        },
        bottomLine: {
            type: Boolean,
            default: true
        },
    }
}
</script>
<style lang="less" scoped>
    .ptitle {
        &-name {
            font-size: 14px;
            font-weight: 600;
            line-height: 30px;
            padding-left: 10px;
        }
    }
</style>