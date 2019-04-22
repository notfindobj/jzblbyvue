<template>
  <div class="data-details-box">
    <!-- <div  v-html="detaDetails.ItemContentBefore"></div> -->
    <!-- {{detaDetails}} -->
    <div class="data-details-con-box">
      <div class="data-details-location">
        <Breadcrumb separator=">" style="margin-bottom: 20px">
          <BreadcrumbItem :style="index == (currentNameList.length -1) ? 'font-size:12px;color: #FF3C00;font-weight: normal;' : 'font-size:12px;color: #999999;font-weight: normal;'" v-for="(item,index) in currentNameList" :key="index">{{item}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div class="data-details-con">
        <data-details-left
        :detaDetails="detaDetails"
        />
        <div>
          <data-details-right
          :detaDetails="detaDetails"
          />
          <commentsCon
          :width="'340px'"
          :publish="detaDetails"
          @thumbsUp="thumbsUp"
          @Collection="Collection"
          />
        </div>
      </div>
    </div>
    <viewPicture/>
  </div>
</template>
<script>
  import dataDetailsLeft from '../../components/dataDetails/dataDetailsLeft.vue'
  import dataDetailsRight from '../../components/dataDetails/dataDetailsRight.vue'
  import commentsCon from '../../components/comments/commentsCon.vue'
  import viewPicture from '../../components/comments/viewPicture.vue'
  import {setthumbsUp, setCollection} from '../../service/clientAPI'
  import {mapGetters} from 'vuex';
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
    data () {
      return {
        currentNameList:[
          '资源库',
          '示范区',
          '别墅',
          '现代',
          '重庆北大资源燕南大道改造计划'
        ],
      }
    },
    components: {
      dataDetailsLeft,
      dataDetailsRight,
      commentsCon,
      viewPicture
    },
    computed:{
      ...mapGetters(['isLogin'])
    },
    async asyncData({app, store, route}) {
      let queryData = JSON.parse(route.query.dataBase);
      delete queryData.title;
      let getBaseDataDetail = await store.dispatch('getBaseDataDetails', queryData);
      return {
        detaDetails: getBaseDataDetail.ItemEntity,
        itemsDetail: getBaseDataDetail
      }
    },
    created() {
    },
    methods: {
      // 点赞
      async thumbsUp (item) {
        if (this.isLogin) {
          let queryData = {
            ItemId: item.ItemId,
            LikeType: 1,
            IsDelete: 0
          }
          let thumbsUpMsg = await setthumbsUp(queryData)
        }
      },
      // 收藏
      async Collection (item) {
        if (this.isLogin) {

        }
        // let queryData = {
        //   ItemId: item.ItemId,
        //   TalkType: 4,
        //   IsDelete: true
        // }
        // let collectionMsg = await setCollection(queryData)
      }
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
