<template>
    <span title="点击查看项目地址">
        <svg class="icon" aria-hidden="true" @click="openMap">
            <use :xlink:href="`#icon-${syHref}`"></use>
        </svg>
    </span>
</template>
<script>
export default {
    props: {
        syHref: {
            type: String,
            default: ""
        }
    },
    methods: {
        openMap () {
            this.$emit("openMap")
        }
    },
}
</script>
<style lang="less" scoped>
.icon {
    width: 2em;
    height: 17px;
    cursor: pointer;
    vertical-align: -3px;
    fill: currentColor;
    overflow: hidden;
}
</style>