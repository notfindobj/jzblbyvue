<template>
  <div class="data-details-box">
    <div class="data-details-con-box">
      <div class="data-details-location"></div>
      <div class="data-details-con">
        <data-details-left></data-details-left>
        <data-details-right></data-details-right>
      </div>
    </div>


  </div>
</template>
<script>
  import dataDetailsLeft from '../../components/dataDetails/dataDetailsLeft.vue'
  import dataDetailsRight from '../../components/dataDetails/dataDetailsRight.vue'
  export default {
    head () {
      return {
        title: `资料库详情`,
        meta: [
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'about', name: 'about', content: "资料库详情" }
        ],
      }
    },
    components: {
      dataDetailsLeft,
      dataDetailsRight
    },
    asyncData() {
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style  lang="less" scoped>
  .data-details-box{
    width: 100%;
    height: auto;
    background: rgba(242,244,242,1);
    .data-details-con-box{
      width: 1200px;
      height: auto;
      margin: 0 auto;
      .data-details-location{
        height: 46px;
        width: 100%;
        padding-top: 9px;
      }
      .data-details-con{
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content:center;
        .data-details-location{

        }
      }
    }

  }
</style>
