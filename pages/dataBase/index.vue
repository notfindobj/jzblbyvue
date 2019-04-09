<template>
    <div class="conten-layout-box">
      {{RspQueryClassify}}
      <conten-nav :itemAttribute="RspSelectMenuDatas.ChildNode"/>
      <conten :RspItemDatas="RspItemDatas"/>
    </div>
</template>
<script>
  import ContenNav from '../../components/contenLayout/ContenNav.vue'
  import Conten from '../../components/contenLayout/Content.vue'
  import {getBaseData} from '../../service/clientAPI'
  import { mapState} from 'vuex'
  export default {
    head () {
        return {
            title: `资源库-示范区`,
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'about', name: 'about', content: "关于我们" }
            ],
        }
    },
     computed: {
        ...mapState({
            queryBaseData: state => state.overas.queryBaseData
        })
    },
    components: {
      ContenNav,
      Conten
    },
    async asyncData({app, store, route}){
      let parentPages =  state.overas.queryBaseData;
      console.log(parentPages)
      let queryData = {
          "ClassTypeId": parentPages.parentID,
          "ClassTypeArrList": parentPages.typeArrList,
          "SortType": 0,
          "KeyWords": "",
          "Order": true,
          "Page": 0,
          "Rows": 8
      }
      let getBaseData = await store.dispatch('getBaseData', queryData);
      return{
        getBaseData: getBaseData,
        RspSelectMenuDatas:getBaseData.RspSelectMenuDatas, //菜单数据
        RspItemDatas: getBaseData.RspItemDatas, //项目数据
        RspQueryClassify: getBaseData.RspQueryClassify, //查询参数
        RspPaginationData: getBaseData.RspPaginationData, //翻页数据
      }
    },
    created() {},
    methods: {
      async getItemsBaseData () {

        let mes = await getBaseData(queruyDate)
      },
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
