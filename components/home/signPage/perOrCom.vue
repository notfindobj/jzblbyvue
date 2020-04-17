<template>
    <div class="register-type">
        <div @click="goToRegister('register')">
            <i class="iconfont icon-geren"></i>
            <p>个人</p>
        </div>
        <div @click="goToRegister('comReg')">
            <i class="iconfont icon-company"></i>
            <p>企业</p>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        goToRegister(val) {
            let back = localStorage.getItem("reg").split(",")
            back.push(val)
            localStorage.setItem("reg", back.join(","))
            this.$store.dispatch('LOGGEDIN', val);
        },
    }
}
</script>
<style lang="less" scoped>
    .register-type {
        display: flex;
        justify-content: space-around;
        >div  {
            text-align: center;
            cursor: pointer;
            i {
                font-size: 32px;
                color: #ff3c00;
            }
            p {
                font-size: 18px;
                font-weight: bold;
            }
        }
    }
</style>