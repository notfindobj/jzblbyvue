<template>
    <div>
        <courseNav/>
        <nuxt/>
        <Foot/>
    </div>
</template>
<script>
import Foot from '../components/Foot';
import courseNav from '../components/courseNav';
export default {
    components: {
        Foot,
        courseNav,
    }
}
</script>
<style lang="less" scoped> 
</style>