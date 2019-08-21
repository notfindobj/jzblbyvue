<template>
    <div>
        <div @click="goToRegister('register')">个人</div>
        <div @click="goToRegister('comReg')">企业</div>
    </div>
</template>
<script>
export default {
    methods: {
         goToRegister(val) {
            this.$store.dispatch('LOGGEDIN', val);
        },
    }
}
</script>