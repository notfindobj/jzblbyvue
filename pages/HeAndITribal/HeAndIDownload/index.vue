<template>
    <div class="download-box">
        <div class="download-box-con">
              <template v-for="(item, index) in dataList">
                  <ImageAndText v-if="item.TalkType !== 2" 
                      :textLength="9"
                      :itemInfo="item" 
                      :index="index" :key="index"
                      @clickCollection="clickCollection"
                      @clickLike="clickLike"
                  />
                  <VideoItem :key="index" v-if="item.TalkType === 2" :videoInfo="item" :index="index"
                      @clickCollection="clickCollection"
                      @clickLike="clickLike"
                  />
              </template>
        </div>
    </div>
</template>
<script>
  import ImageAndText from '../../../components/projectType/imageAndText'
  import VideoItem from '../../../components/projectType/video'
  import { setComments, setthumbsUp, setCollection, setFollow } from '../../../service/clientAPI'
  export default {
    layout: 'main',
    components: {
      ImageAndText,
      VideoItem
    },
    props: {
      dataList: Array,
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
        })
      }
    }
  }
</script>

<style lang="less" scoped>
    .download-box {
        height: auto;
        background: transparent;
        display: inline-block;
        width: 100%;
        .download-box-con {
            height: auto;
            background: transparent;
            .head-boxs {
                padding-left: 15px;
                height: 40px;
                line-height: 39px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                background: #ffffff;
                font-size: 14px;
                color: #666666;
                box-sizing: border-box;
                border-bottom: 1px solid #D8D8D8;
                > li {
                    margin-right: 20px;
                    cursor: pointer;
                }
                .li-active {
                    color: #FF3C00;
                }
            }
        }
    }
    .head-boxs-two{
        position: sticky;
        top: 100px;
        z-index: 66;
        border-top: 1px solid #eeeeee;
    }
</style>
