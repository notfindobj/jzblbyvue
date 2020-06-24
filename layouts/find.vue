<template>
    <div>
        <find/>
        <nuxt/>
        <Foot/>
    </div>
</template>
<script>
import Foot from '../components/Foot';
import find from '../components/find';
export default {
    components: {
        Foot,
        find,
    }
}
</script>
<style lang="less" scoped> 
</style>