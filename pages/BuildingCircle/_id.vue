<template>
  <div>
    <loading :loading="loading"/>
    <div  v-if="loading" class="container-box">
      <div class="container">
        <crollBox :isLast="isLast" @willReachBottom ="willReachBottom">
          <div class="editor-jzbl">
            <proRele :editorName="editorName" @clickEditor="clickEditor" @relSuccessfully="relSuccessfully"/>
          </div>
          <template v-for="(item, index) in dataList">
              <ImageAndText
                :key="index+'tuwen'"
                v-if="item.TalkType !== 2 && item.TalkType !== 6"
                :itemInfo="item"
                :index="index"
                @clickCollection="clickCollection"
                @clickMenu="clickMenu"
                @clickLike="clickLike"
              ></ImageAndText>
              <VideoItem
                :key="index+'video'"
                v-if="item.TalkType === 2 || item.TalkType === 6"
                :videoInfo="item"
                :index="index"
                @clickMenu="clickMenu"
                @clickCollection="clickCollection"
                @clickLike="clickLike" 
              ></VideoItem>
          </template>
        </crollBox>
        <Page class="page-the" v-show="pageNum > 4" :current="pageNum"  :total="records" show-elevator @on-change="onChangePage"/>
        <ToTop></ToTop>
      </div>
      <nominate />
    </div>
  </div>
</template>

<script>
import ImageAndText from '../../components/projectType/imageAndText'
import VideoItem from '../../components/projectType/video'
import crollBox from '../../components/crollBox'
import nominate from '../../components/nominate'
import ToTop from '../../components/toTop'
import { _throttle } from '../../plugins/untils/public'
import { setComments, setthumbsUp, setCollection, setFollow, ItemOperat, publishData, getRecommend} from '../../service/clientAPI'
import proRele from "../../components/proRele"
import {mapGetters, mapState} from 'vuex'
export default {
    layout: 'main',
    data() {
      return {
        loading: false,
        editorName: 'tw',
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
      crollBox,
      proRele,
      nominate
    },
    async asyncData({ app, store, route }) {
        let queryData = {
          TalkType: "",
          Page: 1,
          Rows: 8
        };
        let getTalks = await store.dispatch('getTalk', {queryData, id:route.params.id});
        return {
          dataList: getTalks.retModels || [],
          total: getTalks.paginationData ? getTalks.paginationData.total : 0
        }
    },
    created () {
        this.$nextTick(function () {
            this.loading = true
        })
    },
    methods: {
      clickEditor (val) {
        this.editorName = val
      },
      async clickMenu (row, item, index) {
        let qieryData = {
          "ItemId": row.ItemId,
          "TalkType": row.TalkType,
          "Follow": { // 关注
            "UserId": row.UserId,
            "IsDelete": row.IsFollow
          },
          "OperateId": item.OperateId,
          "OperatValue": item.OperatValue
        }
        if (item.OperatValue !== "FollowThisUser" && item.OperatValue !== "UnfollowThisUser") {
          qieryData.Follow = {}
        }
        if (item.OperatValue == "Delete" ) {
            this.$Modal.confirm({
                title: '删除项目',
                content: '<p>请否确定删除项目!</p>',
                onOk: async () => {
                    let msg = await ItemOperat (qieryData);
                    if (msg) { 
                       if (item.OperatValue == "Delete") {
                        this.dataList.splice(index, 1);
                        return false
                      }
                    }
                },
                onCancel: () => {
                    return false
                }
            });
            return false
        }
        let msg = await ItemOperat (qieryData);
        if (msg) {
          // 关注
          if (item.OperatValue == "FollowThisUser") {
            this.$set(row, 'IsFollow', !row.IsFollow);
            this.$set(item, 'OperatName', '取消关注');
            this.$set(item, 'OperatValue', 'UnfollowThisUser');
            return false
          }
          // 取消关注
          if (item.OperatValue == "UnfollowThisUser") {
            this.$set(row, 'IsFollow', !row.IsFollow);
            this.$set(item, 'OperatName', '关注');
            this.$set(item, 'OperatValue', 'FollowThisUser');
            return false
          }
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
          let queryData = {
            TalkType: "",
            Page: this.pageNum,
            Rows: 8
          };
          const data = await this.$store.dispatch('getTalk', {queryData});
          if (data) {
            if (type === 1) {
              this.dataList = [];
              this.dataList = data.retModels || [];
            } else {
              this.dataList = this.dataList.concat(data.retModels);
            }
            this.pageNum = data.paginationData.page;
            this.total = data.paginationData.total;
            this.records = data.paginationData.records;
          }
      },
      relSuccessfully (val) {
          if (val) {
              this.getList(null, 1)
          }
      },
      // 点击收藏
      async clickCollection(index, flag) {
        let queryData = {
          ItemId: this.dataList[index].ItemId,
          ItemName: this.dataList[index].TalkTitle,
          ItemTitleImg: '',
          IsDelete: !flag,
          TalkType: this.dataList[index].TalkType
        }
        let msg = await setCollection(queryData);
        if (msg) {
          let dataInfo = JSON.parse(JSON.stringify(this.dataList[index]));
          dataInfo.itemOperateData.IsCollection = flag;
          flag ? dataInfo.itemOperateData.CollectionCount += 1 : dataInfo.itemOperateData.CollectionCount -= 1;
          this.$set(this.dataList, index, dataInfo);
        }
      },
      // 点击点赞
      async clickLike(index, flag) {
        let queryData = {
           ItemId: this.dataList[index].ItemId,
          LikeType: this.dataList[index].TalkType,
          CommentsId: '',
          IsDelete: !flag
        }
        let msg = await setthumbsUp(queryData);
        if (msg) {
          let itemInfo = JSON.parse(JSON.stringify(this.dataList[index]));
          itemInfo.itemOperateData.IsLike = flag;
          flag ? itemInfo.itemOperateData.LikeCount += 1 : itemInfo.itemOperateData.LikeCount -= 1;
          this.$set(this.dataList, index, itemInfo);
        }
      },
      // 发布
    }
}
</script>

<style lang="less" scoped>
    .editor-jzbl {
        border: 1px solid #dedede;
        background: #fff;
        margin-top: 10px;
    }
    @import "~assets/css/ModulesStyle/index.less";
    .container-box {
      width: 1200px;
      margin: 0 auto;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }
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
    .page-the {
      margin-top: 10px;
    }
</style>
