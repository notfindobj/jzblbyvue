<template>
    <div>
        <!-- <TopAd></TopAd> -->
        <Navigation></Navigation>
        <nuxt/>
        <Foot></Foot>
        <ToTop/>
    </div>
</template>
<script>
    import Navigation from '../components/Navigation';
    import Foot from '../components/Foot';
    import TopAd from '../components/TopAd';
    import ToTop from '../components/toTop'
    export default {
        mounted () {
            let _hmt = _hmt || [];
            (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?21f2672e6da03c61ce7b0811e1939a50";
            let s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
            })();
        },
        components: {
            Navigation,
            Foot,
            TopAd,
            ToTop
        }
    }
</script>
<style>
    ul, li {
        list-style: none;
    }

    html, body{
        font-family: "微软雅黑" " Microsoft YaHei", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue" !important;
        font-size: 16px;
        word-spacing: 1px;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
    }

    body {
        background-color: #F2F4F2;
    }

    *, *:before, *:after {
        box-sizing: border-box;
        margin: 0;
    }

    .button--green {
        display: inline-block;
        border-radius: 4px;
        border: 1px solid #3b8070;
        color: #3b8070;
        text-decoration: none;
        padding: 10px 30px;
    }

    .button--green:hover {
        color: #fff;
        background-color: #3b8070;
    }

    .button--grey {
        display: inline-block;
        border-radius: 4px;
        border: 1px solid #35495e;
        color: #35495e;
        text-decoration: none;
        padding: 10px 30px;
        margin-left: 15px;
    }

    .button--grey:hover {
        color: #fff;
        background-color: #35495e;
    }
</style>

