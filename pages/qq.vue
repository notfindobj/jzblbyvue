<template>
    <div>

    </div>
</template>

<script>
  export default {
    mounted() {
      localStorage.setItem('code', this.$route.query.code)
      localStorage.setItem('state', this.$route.query.state)
    }
  }
</script>

<style scoped>

</style>
