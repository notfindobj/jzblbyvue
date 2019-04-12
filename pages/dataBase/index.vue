<template>
    <div class="conten-layout-box">
      <conten-nav 
        :itemAttribute="RspSelectMenuDatas.ChildNode||[]"
        :listInfo="listInfo"
        @choseSome= "getItemsBaseData"
        @choseSomeOne ="choseSomeOne"
      />
      <conten 
      :RspItemDatas="RspItemDatas"
      :RspPaginationData="RspPaginationData"
      @entrySorting="entrySorting"
      @onChange="onChange"
      />
    </div>
</template>
<script>
  import ContenNav from '../../components/contenLayout/ContenNav.vue'
  import Conten from '../../components/contenLayout/Content.vue'
  import {getBaseData} from '../../service/clientAPI'
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
    components: {
      ContenNav,
      Conten
    },
    data () {
      return {
        queruyDate: {},
        listInfo: {},
        RspSelectMenuDatas: [],
        RspItemDatas: [],
        RspQueryClassify: {},
        RspPaginationData: {}
      }
    },
    async asyncData({app, store, route}){
      let queryData = JSON.parse(route.query.dataBase)
      let menuData = await store.dispatch('getMenu');
      let getBaseData = await store.dispatch('getBaseData', queryData);
      return{
        queryData : queryData,
        listInfo: menuData.RetMenuData || [], // 导肮
        getBaseData: getBaseData,
        RspSelectMenuDatas:getBaseData.RspSelectMenuDatas, //菜单数据
        RspItemDatas: getBaseData.RspItemDatas, //项目数据
        RspQueryClassify: getBaseData.RspQueryClassify, //查询参数
        RspPaginationData: getBaseData.RspPaginationData, //翻页数据
      }
    },
    methods: {
      getItemsBaseData (row) {
        let queryData = JSON.parse(this.$route.query.dataBase)
        queryData.ClassTypeId = `${row.ItemSubAttributeCode}|${row.ItemAttributesId}`
        queryData.ClassTypeArrList = [{ArrId: '',ArrEnCode: ''}]
        this.$router.push({name: "dataBase", query: {dataBase: JSON.stringify(queryData)}})
        queryData = JSON.parse(this.$route.query.dataBase)
        this.getBaseDatas(queryData)
      },
      choseSomeOne (row, rows) {
        let queryData = JSON.parse(this.$route.query.dataBase);
        let isHave = false;
        queryData.ClassTypeArrList.forEach(element => {
          if (element.ArrId === row.ItemAttributesId) {
            isHave = true
          }
        });
        if (!isHave) {
          let optionObg = {
            ArrId: row.ItemAttributesId,
            ArrEnCode: rows.ItemSubAttributeCode
          }
          queryData.ClassTypeArrList.push(optionObg)
          this.$router.push({name: "dataBase", query: {dataBase: JSON.stringify(queryData)}})
          queryData = JSON.parse(this.$route.query.dataBase);
        }
        this.getBaseDatas(queryData)
      },
      async getBaseDatas (queryData) {
        let  BaseData = await getBaseData(queryData)
        this.RspSelectMenuDatas= BaseData.RspSelectMenuDatas //菜单数据
        this.RspItemDatas= BaseData.RspItemDatas //项目数据
        this.RspQueryClassify= BaseData.RspQueryClassify //查询参数
        this.RspPaginationData= BaseData.RspPaginationData //翻页数据
        console.log(this.RspPaginationData)
      },
      // 排序
      entrySorting (val) {
        let queryData = JSON.parse(this.$route.query.dataBase);
        queryData.SortType = val;
        this.$router.push({name: "dataBase", query: {dataBase: JSON.stringify(queryData)}})
        this.getBaseDatas(queryData)
      },
      onChange (val) {
        let queryData = JSON.parse(this.$route.query.dataBase);
        queryData.Page = val;
        this.$router.push({name: "dataBase", query: {dataBase: JSON.stringify(queryData)}})
        this.getBaseDatas(queryData)
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
