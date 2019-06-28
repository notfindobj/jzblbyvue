<template>
    <div class="conten-layout-box">
        <conten-nav
            :itemAttribute="RspSelectMenuDatas.ChildNode||[]"
            :queryConditions="RspQueryClassify.QueryConditions|| []"
            :listInfo="listInfo"
            @choseSome="getItemsBaseData"
            @choseSomeOne="choseSomeOne"
            @delItems="delItems"
        />
        <conten
            :RspItemDatas="RspItemDatas"
            :showLayout="showLayout"
            :isLast="isLast"
            @entrySorting="entrySorting"
            @viewItem="viewItem"
            @loadData="loadData"
        />
    </div>
</template>
<script>
  import ContenNav from '../../components/contenLayout/ContenNav.vue'
  import Conten from '../../components/contenLayout/Content.vue'
  import { getBaseData } from '../../service/clientAPI'

  export default {
    middleware: 'authenticated',
    head() {
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
    data() {
      return {
        queruyDate: {},
        listInfo: {},
        RspSelectMenuDatas: [],
        RspItemDatas: [],
        RspQueryClassify: {},
        RspPaginationData: {},
        showLayout: true,
        isFinished: true,   // 判断请求是否完成
      }
    },
    computed: {
      // 判断是否是最后一页数据
      isLast() {
        return this.RspPaginationData.page === this.RspPaginationData.total;
      }
    },

    async asyncData({ app, store, route }) {
      let queryData = JSON.parse(route.query.dataBase);
      let showLayout = queryData.title !== '建筑规范';
      delete queryData.title;
      //  let [menuData, getBaseData] = Promise.all([store.dispatch('getMenu'), store.dispatch('getBaseData', queryData)])
      let menuData = await store.dispatch('getMenu');
      let getBaseData = await store.dispatch('getBaseData', queryData);
      return {
        queryData: queryData,
        showLayout: showLayout,
        listInfo: menuData.RetMenuData || [], // 导肮
        getBaseData: getBaseData,
        RspSelectMenuDatas: getBaseData.RspSelectMenuDatas, //菜单数据
        RspItemDatas: getBaseData.RspItemDatas, //项目数据
        RspQueryClassify: getBaseData.RspQueryClassify, //查询参数
        RspPaginationData: getBaseData.RspPaginationData, //翻页数据
      }
    },

    watch: {
        '$route': function (oldVal, newVal) {
          console.log(JSON.parse(oldVal.query.dataBase), JSON.parse(newVal.query.dataBase))
          let queryData = JSON.parse(newVal.query.dataBase);
          delete queryData.title;
          this.getBaseDatas(queryData);
        }
    },

    methods: {

      // 加载数据
      loadData() {
        if (this.isFinished && this.RspPaginationData.page < this.RspPaginationData.total) {
          this.isFinished = false;
          if (this.queryData.Page === 0) {
            this.queryData.Page = 9;
            this.queryData.Rows = 4
          } else {
            this.queryData.Page++;
          }
          this.getBaseDatas(this.queryData)
        }
      },

      //一级菜单
      getItemsBaseData(row) {
        let queryData = JSON.parse(this.$route.query.dataBase);
        this.showLayout = row.ItemAttributesFullName !== '建筑规范';
        queryData.title = row.ItemAttributesFullName;
        queryData.ClassTypeId = `${ row.ItemSubAttributeCode }|${ row.ItemAttributesId }`;
        queryData.ClassTypeArrList = [{ ArrId: '', ArrEnCode: '' }];
        this.$router.push({ name: "dataBase", query: { dataBase: JSON.stringify(queryData) } });
        delete queryData.title;
        // let queryDatas = JSON.parse(this.$route.query.dataBase);
        this.getBaseDatas(queryData)
      },
      //二级菜单
      choseSomeOne(row, rows) {
        let queryData = JSON.parse(this.$route.query.dataBase);
        let TypeArrList = queryData.ClassTypeArrList || [];
        let ClassTypeArrList = []
        TypeArrList.forEach(ele => {
          if (ele.ArrId !== '') {
            ClassTypeArrList.push(ele)
          }
        })
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
          };
          ClassTypeArrList.push(optionObg)
          queryData.ClassTypeArrList = ClassTypeArrList;
          this.$router.push({ name: "dataBase", query: { dataBase: JSON.stringify(queryData) } })
        }
        delete queryData.title;
        this.getBaseDatas(queryData)
      },
      // 删除选项
      delItems(items) {
        let queryData = JSON.parse(this.$route.query.dataBase);
        let TypeArrList = queryData.ClassTypeArrList || [];
        let ClassTypeArrList = [];
        ClassTypeArrList = TypeArrList.filter(o => o.ArrEnCode !== items.ArrEnCode);
        if (ClassTypeArrList.length < 1) {
          ClassTypeArrList = [{ ArrId: '', ArrEnCode: '' }]
        }
        queryData.ClassTypeArrList = ClassTypeArrList;
        this.$router.push({ name: "dataBase", query: { dataBase: JSON.stringify(queryData) } })
        delete queryData.title;
        this.getBaseDatas(queryData)
      },
      async getBaseDatas(queryData) {
        let BaseData = await getBaseData(queryData);
        this.RspSelectMenuDatas = BaseData.RspSelectMenuDatas;//菜单数据
        this.RspItemDatas = queryData.Page === 0 ? BaseData.RspItemDatas : this.RspItemDatas.concat(BaseData.RspItemDatas); //项目数据
        this.RspQueryClassify = BaseData.RspQueryClassify; //查询参数
        this.RspPaginationData = BaseData.RspPaginationData; //翻页数据
        this.isFinished = true;
      },

      // 排序
      entrySorting(val) {
        let queryData = JSON.parse(this.$route.query.dataBase);
        queryData.SortType = val;
        this.$router.push({ name: "dataBase", query: { dataBase: JSON.stringify(queryData) } });
        delete queryData.title;
      },
      // 查看详情
      viewItem(item) {
        let queryData = JSON.parse(this.$route.query.dataBase);
        queryData.Id = item.ItemId
        this.$router.push({ name: "DataDetails", query: { dataBase: JSON.stringify(queryData) } })
      },
      tipClick() {
        this.$Message.info('This is a info tip');
      }
    }
  }
</script>
<style lang="less" scoped>
    .conten-layout-box {
        position: relative;
        width: 1200px;
        height: auto;
        margin: 0 auto;
    }
</style>
