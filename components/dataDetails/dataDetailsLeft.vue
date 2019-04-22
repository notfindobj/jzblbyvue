<template>
  <div class="data-details-left">
    <div v-viewer ></div>
      <viewer 
        :options="options" 
        @inited="inited"
        @show="show"
        class="viewer" ref="viewer"
      >
      <template >
        <!-- scope="scope" -->
        <div style="width：800px" v-html="detaDetails.ItemContentBefore"></div>
        <!-- <img v-for="src in scope.images" :src="src" :key="src"> -->
        <!-- {{scope.options}} -->
      </template>
    </viewer>
  </div>
</template>

<script>
  export default {
    name: 'detaDetailsLeft',
    props:{
      detaDetails: {
        type: Object,
        required: true,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        options: {
          inline: false,
          button: false,
          backdrop: true
        }
      }
    },
    components: {
    },
    asyncData() {
    },
    created() {
    },
    methods: {
      inited (val) {
        console.log(val)
      },
      show (val) {
        console.log(val)
      }
    }
  }
</script>
<style lang="less">
  .data-details-left{
   width: 850px;
  }
  .viewer-container {
    width: 450px;
    height: 500px;
  }
</style>
