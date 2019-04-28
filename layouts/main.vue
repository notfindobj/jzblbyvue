<template>
    <div>
        <Header/>
        <nuxt/>
        <Foot/>
    </div>
</template>

<script>
  import Foot from '../components/Foot';
  import Header from '../components/Header';
  export default {
    components: {
      Foot,
      Header
    }
  }
</script>

<style scoped>

</style>
