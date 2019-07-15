<template>
  <div class="he-and-i-tribal">
    <div class="he-and-i-tribal-content">
      <heads :userInfo="tribeInfo"/>
      <HeAndIContent
        :userId="userInfoID"
       :userInfo="tribeInfo" />
    </div>
  </div>
</template>
<script>
  import HeAndIContent from './HeAndIContent'
  import { mapState } from 'vuex'
  import Heads from './head'
  export default {
    layout:'main',
    name: 'PersonalCenter',
    components: {
      HeAndIContent,
      Heads
    },
    data () {
      return {
      }
    },
    computed: {
      ...mapState({
          userInfoID: state => state.overas.auth.UserId
      }),
    },
    async asyncData({ store, params }) {
      let id = params.id ? params.id : store.getters.getToken.UserId
      const data = await store.dispatch('getTribeInfo',id);
      return {
        tribeInfo: data
      }
    },
    mounted () {
      // console.log('>>>>>>>>>>', this.UserId)
    },
    methods: {
    },
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
