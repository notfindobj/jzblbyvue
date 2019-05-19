<template>
  <div class="he-and-i-tribal">
    <div class="he-and-i-tribal-content">
      <heads></heads>
      <he-and-i-content></he-and-i-content>
    </div>
  </div>
</template>

<script>
  import HeAndIContent from './HeAndIContent'
  import Heads from './head'
  export default {
    name: 'PersonalCenter',
    components: {
      HeAndIContent,
      Heads
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
    background: url("../../assets/images/heandibg.png") no-repeat left top;
    background-size: cover;
    .he-and-i-tribal-content{
      width: 1200px;
      height: auto;
      margin: 0 auto;
      background: transparent;
    }
  }

</style>
