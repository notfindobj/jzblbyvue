<template>
    <div>
        <TopAd></TopAd>
        <Header/>
        <nuxt/>
        <Foot/>
    </div>
</template>

<script>
    import Foot from '../components/Foot';
    import Header from '../components/Header';
    import TopAd from '../components/TopAd';

    export default {
        components: {
            Foot,
            Header,
            TopAd
        }
    }
</script>

<style scoped>

</style>
