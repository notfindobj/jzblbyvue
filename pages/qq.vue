<template>
    <div>

    </div>
</template>

<script>
  import {getUserByWX, getUserByQQ, login } from '../LocalAPI'
  export default {
    mounted() {
      if (this.$route.query.code&& this.$route.query.state) {
          const code = this.$route.query.code;
          const state = this.$route.query.state;
          if (code && state) {
              getUserByQQ({
                  code,
                  state
              }).then(res => {
                  if (!res.token) {
                      this.goToRegister('register');
                      this.$store.dispatch('WXREGISTER', res);
                      this.$router.push({ path: "/" })
                  } else {
                      this.$store.dispatch('LOGININ', res);
                      localStorage.setItem('LOGININ', JSON.stringify(res))
                      this.$router.push({ path: "/" })
                      this.$store.dispatch('SETUP', false)
                  }
              });
          }
      }
    },
    methods: {
      goToRegister(val) {
          this.$store.dispatch('LOGGEDIN', val);
      },
    },
  }
</script>

<style scoped>

</style>
