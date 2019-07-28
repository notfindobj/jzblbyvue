<template>
    <div class="ad" v-show="isAd">
        <Icon class="close-icon" size="24" type="md-close" @click="closeAd" />
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isAd: true
            }
        },

        methods: {

            // 关闭顶部广告栏
            closeAd() {
                this.isAd = false;
            }
        }
    }
</script>

<style lang="less" scoped>
    .ad {
        position: relative;
        height: 60px;
        background: #bbbbbb;
        .close-icon {
            position: absolute;
            right: 12px;
            top: 8px;
            cursor: pointer;
        }
    }
</style>
