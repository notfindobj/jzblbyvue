<template>
    <div v-show="scrollTop >= 0">
        <div class="to-top" @click="scrollToTop" v-show="isShowToTop">
            <Icon type="ios-arrow-up" color="#fff" size="30"/>
        </div>
        <div class="content" @click="goPublish">发布</div>
    </div>
</template>

<script>
export default {
    props: {
        isShowToTop: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            scrollTop: ''
        }
    },
    mounted() {
      window.addEventListener('scroll', () => {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      })
    },
    methods: {
        scrollToTop() {
            if (document.documentElement.scrollTop) {
                document.documentElement.scrollTop = 0;
            } else {
                document.body.scrollTop = 0;
            }
        },
        goPublish() {
            this.$router.push('/publish/project')
        }
    }
}
</script>

<style lang="less" scoped>
    .to-top, .content {
        position: fixed;
        right: 10px;
        bottom: 150px;
        width: 50px;
        height: 50px;
        background-color: #C1C1C1;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        transition: all .1s ease-in;
    }

    .content {
        bottom: 200px;
        margin-bottom: 1px;
        color: #fff;
        font-size: 16px;
    }

    .content:hover, .to-top:hover {
        background-color: #ff3c00;
    }
</style>
