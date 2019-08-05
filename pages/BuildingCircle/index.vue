<template>
    <Scroll :on-reach-bottom="handleReachBottom" height="800">
        <!-- {{getTalks}} -->
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
    </Scroll>

</template>

<script>
  import ImageAndText from '~/components/projectType/imageAndText'
  import VideoItem from '~/components/projectType/video'
  import { setComments, setthumbsUp, setCollection, setFollow } from '../../service/clientAPI'
  export default {
    layout: 'main',
    data() {
      return {
        pageNum: 1,
        dataList: [],
        total: 0,   // 总页数
      }
    },
    components: {
      ImageAndText,
      VideoItem
    },
    methods: {
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
          params: {
            id: row.UserId
          }
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
      },

      // 触底
      handleReachBottom() {
        if (this.pageNum >= this.total) {
          this.$Message.info('已经是最后一页了');
          return false;
        }
        this.pageNum++;
        this.getList();
      },

      // 获取数据
      async getList() {
        const data = await this.$store.dispatch('getTalk', {
          TalkType: "",
          Page: this.pageNum,
          Rows: 8
        });

        this.dataList = this.attentionList.concat(data.retModels);
        this.total = data.paginationData.total;
      },
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
    }
  }
</script>

<style lang="less" scoped>
    @import "~assets/css/ModulesStyle/index.less";

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
