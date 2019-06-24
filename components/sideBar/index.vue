<template>
    <div class="sidebar">
        <div class="sidebar-er">
            <i class="iconfont icon-erweima"></i>
        </div>
        <div class="sidebar-top" @click="backTop">
            <i class="iconfont icon-jiantou"></i>
            <p>TOP</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return  {

        }
    },
    methods: {
        backTop () {
            let scrollToTop = setInterval(function() {
            let pos = window.pageYOffset;
            if ( pos >0 ) {
            　　window.scrollTo(0, pos - 40 );
            } else {
            　　window.clearInterval( scrollToTop );
            }
            }, 10);
        }
    }
     
}
</script>
<style lang="less" scoped>
    .sidebar {
        position: fixed;
        top: 50vh;
        width: 40px;
        right: 0;
        &-er {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: #0c68cb;
            cursor: pointer;
        }
        &-top {
            display: inline-block;
            text-align: center;
            width: 40px;
            height: 40px;
            margin-top: 10px;
            background: #626362;
            cursor: pointer;
            color: #ffffff;
        }
    }
</style>