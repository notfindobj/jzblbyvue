<template>
    <div>

    </div>
</template>

<script>
  export default {
    mounted() {
      sessionStorage.setItem('code', this.$route.query.code)
      sessionStorage.setItem('state', this.$route.query.state)
    }
  }
</script>

<style scoped>

</style>
