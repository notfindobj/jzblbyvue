<template>
  <div class="he-and-i-tribal">
    <div class="he-and-i-tribal-content">
      <head></head>
    </div>
  </div>
</template>

<script>
  import HeAndIIntroduction from './HeAndIIntroduction'
  import HeAndIContent from './HeAndIContent'
  import Head from './head'
  export default {
    name: 'PersonalCenter',
    components: {
      HeAndIIntroduction,
      HeAndIContent,
      Head
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  .he-and-i-tribal{
    width: 100%;
    height: 100%;
    background: url("../../assets/images/heandibg.jpeg") no-repeat left top;
    background-size: cover;
    .he-and-i-tribal-content{
      width: 1200px;
      height: 800px;
      margin: 0 auto;
      background: transparent;
    }
  }

</style>
