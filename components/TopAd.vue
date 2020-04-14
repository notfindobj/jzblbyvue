<template>
    <nuxt-link to="/activity">
        <div class="ad" v-if="isAd">
            <Icon class="close-icon" size="24" type="md-close" @click="closeAd" />
        </div>
    </nuxt-link>
</template>

<script>
    export default {
        data() {
            return {
                isAd: true
            }
        },
        mounted () {
            // this.isAd = localStorage.getItem('isAd') === 'false'? false : true;
        },
        methods: {
            // 关闭顶部广告栏
            closeAd() {
                this.isAd = false;
                // localStorage.setItem('isAd', false)

            }
        }
    }
</script>

<style lang="less" scoped>
    .ad {
        position: relative;
        height: 37px;
        background: url(../assets/images/ad.jpg);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        .close-icon {
            position: absolute;
            right: 12px;
            top: 8px;
            cursor: pointer;
            color: #fff;
        }
    }
</style>
