<template>
    <div class="conten-layout-box">
        <!--<div @click="tipClick" class="a">按钮</div>-->
      <conten-nav></conten-nav>
      <conten></conten>
    </div>
</template>
<script>
  import ContenNav from '../../components/contenLayout/ContenNav.vue'
  import Conten from '../../components/contenLayout/Content.vue'
  export default {
    head () {
        return {
            title: `关于我们`,
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'about', name: 'about', content: "关于我们" }
            ],
        }
    },
    components: {
      ContenNav,
      Conten
    },
    asyncData() {
//        $axios.get('/journalismApi').then(res => {
//        })
    },
    created() {
        // let
//        this.$axios.get('/journalismApi').then(res => {
//        })
    },
    methods: {
        tipClick () {
            this.$Message.info('This is a info tip');
        }
    }
}
</script>
<style  lang="less" scoped>
  .conten-layout-box{
    width: 1200px;
    height: auto;
    margin: 0 auto;
  }
</style>
