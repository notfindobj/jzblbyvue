<template>
    <div>
        <TopAd></TopAd>
        <Header/>
        <nuxt/>
        <Foot/>
        <ToTop/>
    </div>
</template>

<script>
    import Foot from '../components/Foot';
    import Header from '../components/Header';
    import TopAd from '../components/TopAd';
    import ToTop from '../components/toTop'
    export default {
        components: {
            Foot,
            Header,
            TopAd,
            ToTop
        }
    }
</script>