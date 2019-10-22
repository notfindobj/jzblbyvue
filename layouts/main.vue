<template>
    <div>
        <!-- <TopAd></TopAd> -->
        <Header/>
        <nuxt/>
        <Foot/>
    </div>
</template>

<script>
    import Foot from '../components/Foot';
    import Header from '../components/Header';
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
            Foot,
            Header,
            TopAd,
            ToTop
        }
    }
</script>