<template>
     <crollBox :isLast="isLast" @willReachBottom ="willReachBottom" >
        <div class="container">
            <template v-for="(item, index) in dataList">
                <ImageAndText
                    :key="index"
                    v-if="item.TalkType !== 2"
                    :itemInfo="item"
                    :index="index"
                    @clickCollection="clickCollection"
                    @clickLike="clickLike"
                    @goToPersonal="goToPersonal"
                    @goDetail="goDetail"
                ></ImageAndText>
                <VideoItem
                    :key="index"
                    v-if="item.TalkType === 2"
                    :videoInfo="item"
                    :index="index"
                    @clickCollection="clickCollection"
                    @clickLike="clickLike"
                ></VideoItem>
            </template>
        </div>
        <ToTop :isShowToTop="false"></ToTop>
        <Page v-show="pageNum > 4" :current="pageNum"  :total="records" show-elevator @on-change="onChangePage"/>
    </crollBox>
</template>

<script>
import ImageAndText from '../../components/projectType/imageAndText'
import VideoItem from '../../components/projectType/video'
import crollBox from '../../components/crollBox'
import ToTop from '../../components/toTop'
import { _throttle } from '../../plugins/untils/public'
import { setComments, setthumbsUp, setCollection, setFollow } from '../../service/clientAPI'
export default {
    layout: 'main',
    middleware: 'authenticated',
    data() {
      return {
        pageNum: 1,
        dataList: [],
        isLast: false,
        records: 0,
        total: 1,   // 总页数
      }
    },
    components: {
      ImageAndText,
      VideoItem,
      ToTop,
      crollBox
    },
    async asyncData({ app, store, route }) {
        let queryData = {
          TalkType: "",
          Page: 1,
          Rows: 8
        };
        let getTalks = await store.dispatch('getTalk', queryData);
        return {
          dataList: getTalks.retModels,
          total: getTalks.paginationData.total
        }
    },
    methods: {
      debounce(fn, wait) {    
          var timeout = null;    
          return function() {        
              if(timeout !== null)   clearTimeout(timeout);        
              timeout = setTimeout(fn, wait);    
          }
      },
      onChangePage (num, type = 1) {
          this.pageNum = num;
          this.getList(num, type);
          (function smoothscroll(){
              var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                  window.requestAnimationFrame(smoothscroll);
                  window.scrollTo (0,currentScroll - (currentScroll/5));
              }
          })();
      },
      // 触底事件
      willReachBottom: _throttle(function  () {
          if (this.total === 1) {
              this.isLast = true
              return false
          }
          if (this.pageNum >= this.total) {
              this.$Message.info('已经是最后一页了');
              return false;
          }
          this.pageNum++;
          this.getList();
      }, 1500),
      async getList(row, type) {
          const data = await this.$store.dispatch('getTalk', {
            TalkType: "",
            Page: this.pageNum,
            Rows: 8
          });
          if (data) {
            if (type === 1) {
              this.dataList = [];
              this.dataList = data.retModels;
            } else {
              this.dataList = this.dataList.concat(data.retModels);
            }
            this.pageNum = data.paginationData.page;
            this.total = data.paginationData.total;
            this.records = data.paginationData.records;
          }
      },
      // 点击收藏
      clickCollection(index, flag) {
        setCollection({
          ItemId: this.dataList[index].ItemId,
          ItemName: this.dataList[index].TalkTitle,
          ItemTitleImg: '',
          IsDelete: !flag,
          TalkType: this.dataList[index].TalkType
        }).then(() => {
          let dataInfo = JSON.parse(JSON.stringify(this.dataList[index]));
          dataInfo.itemOperateData.IsCollection = flag;
          flag ? dataInfo.itemOperateData.CollectionCount += 1 : dataInfo.itemOperateData.CollectionCount -= 1;
          this.$set(this.dataList, index, dataInfo);
        })
      },
      // 跳转部落
      goToPersonal (row) {
        this.$router.push({
          name: 'HeAndITribal-id',
          query: {
            id: row.UserId
          }
        })
      },
      goDetail (id) {
       this.$router.push({
            name: 'QuestionsAndAnswers-id',
            params: { id }
        })
      },
      // 点击点赞
      clickLike(index, flag) {
        setthumbsUp({
          ItemId: this.dataList[index].ItemId,
          LikeType: this.dataList[index].TalkType,
          CommentsId: '',
          IsDelete: !flag
        }).then(() => {
          let itemInfo = JSON.parse(JSON.stringify(this.dataList[index]));
          itemInfo.itemOperateData.IsLike = flag;
          flag ? itemInfo.itemOperateData.LikeCount += 1 : itemInfo.itemOperateData.LikeCount -= 1;
          this.$set(this.dataList, index, itemInfo);

          // // 如果是点击的弹框中的，就更新videoInfo
          // if (this.isShowModal) {
          //   this.$set(this.videoInfo, 'itemOperateData', itemInfo.itemOperateData)
          // }
        })
      }
    }
}
</script>

<style lang="less" scoped>
    @import "~assets/css/ModulesStyle/index.less";
    .ivu-page {
      text-align: center;
    }
    .photos-wrap {
        width: 700px;
        display: flex;
        flex-wrap: wrap;

        .img {
            width: 220px;
            height: 220px;
            margin: 10px 10px 0 0;
            background-color: #ccc;
        }
    }
</style>
