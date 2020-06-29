<template>
    <div>
        <find/>
        <nuxt/>
        <Foot/>
        <sled/>
    </div>
</template>
<script>
import Foot from '../components/Foot';
import find from '../components/find';
import sled from "../pages/home/components/sled"
export default {
    components: {
        Foot,
        find,
        sled
    }
}
</script>
<style lang="less" scoped> 
</style>