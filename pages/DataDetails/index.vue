<template>
    <div class="data-details-box">
        <div class="data-details-con-box">
            <div class="data-details-location">
                <Breadcrumb separator=">" style="margin-bottom: 20px">
                    <BreadcrumbItem class="BreadcrumbItem">资源库</BreadcrumbItem>
                    <BreadcrumbItem v-for="(items, index) in ItemAttributesEntities" :key="index">
                        <span class="cate-span" @click="clickCate(index)">{{items.ItemSubAttributeFullName}}</span>
                    </BreadcrumbItem>
                    <BreadcrumbItem style="font-size:12px;color: #FF3C00;font-weight: normal;">
                        {{detaDetails.ItemName }}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="data-details-con">
                <template v-if="isLayout">
                    <!--  :discussData="getGetCommentsData" -->
                    <data-details-left
                        id="container"
                        :detaDetails="detaDetails"
                        :pageTurning="pageTurning"
                        :attribute="ItemAttributesEntities"
                        @pageTurning="PNpage"
                    />
                </template>
                <template v-if="!isLayout">
                    <dataDetailsPDFLeft
                        :detaDetails="detaDetails"
                        :PdfInfo="PdfInfo"
                    />
                </template>
                <div>
                    <data-details-right
                        :class="{'fix-top': scrollTop > 312 && distanceBottom > 362, 'fix-bottom': distanceBottom < 362}"
                        :style="rightPx"
                        :detaDetails="detaDetails"
                        :attribute="ItemAttributesEntities"
                        @dataDetailsMaskShow="dataDetailsMaskShow"
                        @setFollow="setFollow"
                    />
                    <commentsCon
                        :class="{'margin-top': (scrollTop > 312 && distanceBottom > 362 ) && (detaDetails.IsCustomized || detaDetails.IsDownload), 'margin-top2': (scrollTop > 312 && distanceBottom > 362) && !detaDetails.IsCustomized && !detaDetails.IsDownload, 'margin-bottom': distanceBottom < 362}"
                        :style="rightPx1"
                        :width="'340px'"
                        :publish="detaDetails"
                        :comments="getGetCommentsData"
                        @thumbsUp="thumbsUp"
                        @Collection="Collection"
                        @commentValue="commentValue"
                        @discussValue="discussValue"
                        @somePraise="somePraise"
                    />
                </div>
            </div>
        </div>
        <viewPicture/>
        <data-details-custom
            :itemId="detaDetails.ItemId"
            @dataDetailsMaskClose="dataDetailsMaskClose"
            v-if="isShowDataDetailsCustom"/>
        <date-details-down
          :payInfos="detaDetails"
          @payment="payment"
          @dataDetailsMaskClose="dataDetailsMaskClose"
          v-if="isShowDateDetailsDown"/>
          <weixinBox 
          :modalConfig="modalConfig"
          :paymentConfig="paymentConfig"
          />
            :payInfos="detaDetails"
            @dataDetailsMaskClose="dataDetailsMaskClose"
            v-if="isShowDateDetailsDown"/>
        <ToTop></ToTop>
    </div>
</template>
<script>
  import dataDetailsLeft from '../../components/dataDetails/dataDetailsLeft.vue'
  import dataDetailsPDFLeft from '../../components/dataDetails/dataDetailsPDFLeft'
  import dataDetailsRight from '../../components/dataDetails/dataDetailsRight.vue'
  import commentsCon from '../../components/comments/commentsCon.vue'
  import viewPicture from '../../components/comments/viewPicture.vue'
  import ToTop from '../../components/toTop'
  import { setthumbsUp, setCollection, setFollow, setComments, recordFrequency } from '../../service/clientAPI'
  import dataDetailsCustom from '../../components/dataDetails/dataDetailsCustom.vue'
  import dateDetailsDown from '../../components/dataDetails/dateDetailsDown.vue'
  import weixinBox from '../../components/weixin'
  import { mapGetters } from 'vuex'

  export default {
    name: 'datadetail',
    middleware: 'authenticated',
    head() {
      return {
        title: `资料库详情`,
        meta: [
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'about', name: 'about', content: "资料库详情" }
        ],
      }
    },
    data() {
      return {
        isShowDataDetailsCustom: false,
        isShowDateDetailsDown: false,
        ItemAttributesEntities: {},
        scrollTop: '',
        clientWidth: '',
        isLayout: true,
        distanceBottom: 1000,
        contentHeight: '',   // 评论列表的高度
        modalConfig: {
          isWxConfig: false
        },
        paymentConfig: {}
      }
    },
    components: {
      weixinBox,
      dataDetailsLeft,
      dataDetailsRight,
      commentsCon,
      viewPicture,
      dateDetailsDown,
      dataDetailsCustom,
      dataDetailsPDFLeft,
      ToTop
    },
    computed: {
      ...mapGetters(['isLogin']),
      rightPx() {
        if (this.clientWidth >= 1200) {
          if (this.distanceBottom < 470) {
            return {
              right: (this.clientWidth - 1200) / 2 + 'px',
              bottom: 362 + 100 - this.distanceBottom + this.contentHeight + 10 + 'px'
            };
          } else {
            return {
              right: (this.clientWidth - 1200) / 2 + 'px',
            };
          }
        } else {
          if (this.distanceBottom < 470) {
            return {
              right: this.clientWidth - 1200 + 'px',
              bottom: 362 + 100 - this.distanceBottom + this.contentHeight + 10 + 'px'
            };
          } else {
            return {
              right: this.clientWidth - 1200 + 'px'
            };
          }
        }
      },
      rightPx1() {
        if (this.clientWidth >= 1200) {
          if (this.distanceBottom < 470) {
            return {
              right: (this.clientWidth - 1200) / 2 + 'px',
              bottom: 470 - this.distanceBottom + 'px'
            };
          } else {
            return {
              right: (this.clientWidth - 1200) / 2 + 'px',
            };
          }
        } else {
          if (this.distanceBottom < 470) {
            return {
              right: this.clientWidth - 1200 + 'px',
              bottom: 470 - this.distanceBottom + 'px'
            };
          } else {
            return {
              right: this.clientWidth - 1200 + 'px'
            };
          }
        }
      }
    },
    async asyncData({ app, store, route }) {
      let queryData = JSON.parse(route.query.dataBase);
      delete queryData.title;
      let reqItemList = JSON.parse(JSON.stringify(queryData));
      delete reqItemList.Id;
      let getBaseDataDetail = await store.dispatch('getBaseDataDetails', {
        Id: queryData.Id,
        reqItemList
      });
      // 根据项目详情请求评论信息
      let Comment = {
        itemId: getBaseDataDetail.ItemEntity.ItemId,
        ScopeType: 0
      }
      let getGetCommentsData = await store.dispatch('getGetComments', Comment);
      let pageTurning = {
        PrevItemId: getBaseDataDetail.PrevItemId,
        NextItemId: getBaseDataDetail.NextItemId,
      }
      return {
        getBaseDataDetail,
        PdfInfo: getBaseDataDetail.PdfInfo,
        detaDetails: getBaseDataDetail.ItemEntity,
        ItemAttributesEntities: getBaseDataDetail.ItemAttributesEntities,
        getGetCommentsData: getGetCommentsData,
        pageTurning,
        id: getBaseDataDetail.ItemEntity.ItemId
      }
    },
    created() {
      try {
        let showLayout = JSON.parse(this.$route.query.dataBase);
        this.isLayout = showLayout.showLayout;
      } catch (error) {
      }
    },
    mounted() {
      let _this = this
      $(document).ready(function () {
        _this.initLazy()
      });
      this.clientWidth = document.body.clientWidth;
      this.contentHeight = document.documentElement.clientHeight - 460;
      window.addEventListener('scroll', () => {

        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.distanceBottom = document.body.clientHeight - this.scrollTop - document.documentElement.clientHeight;
      })
      window.onresize = () => {
        this.clientWidth = document.body.clientWidth;
        this.contentHeight = document.documentElement.clientHeight - 460;
      }
      // 记录用户访问
      recordFrequency({
        ItemId: this.detaDetails.ItemId,
        DomainType: 0
      })
    },
    methods: {
      // 上写翻页，项目详情
      PNpage(val) {
        if (!val) {
          this.$Message.warning('没有项目');
          return false
        }
        try {
          let dataBase = JSON.parse(this.$route.query.dataBase);
          dataBase.Id = val
          window.location.href = 'DataDetails?dataBase=' + JSON.stringify(dataBase);
        } catch (error) {
        }
      },
      clickCate(index) {
        let attrList = [];
        let dataBase = JSON.parse(this.$route.query.dataBase);
        this.ItemAttributesEntities.forEach((item, attrIndex) => {
          if (index >= attrIndex) {
            attrList.push({
              ArrEnCode: item.ItemSubAttributeCode,
              ArrId: item.ItemAttributesId
            })
          }
        });
        dataBase.ClassTypeArrList = attrList;
        delete dataBase.title;
        this.$router.push({
          name: 'dataBase',
          query: {
            dataBase: JSON.stringify(dataBase)
          }
        })
      },
      initLazy() {
        $("img[data-original]").lazyload()
      },
      // 项目点赞
      async thumbsUp(item) {
        let queryData = {
          ItemId: item.ItemId,
          LikeType: 1,
          IsDelete: item.islikes
        }
        let thumbsUpMsg = await setthumbsUp(queryData);
        if (item.islikes) {
          this.$set(item, 'likes', item.likes - 1)
        } else {
          this.$set(item, 'likes', item.likes + 1)
        }
        this.$set(item, 'islikes', !item.islikes)
      },
      async somePraise(item) {
        let queryData = {
          ItemId: item.ItemId,
          CommentsId: item.CommentsId,
          LikeType: 0,
          IsDelete: !item.IsCoutReply
        }
        let msg = await setthumbsUp(queryData);
        // console.log(item)
        if (msg) {
        }
      },
      // 收藏
      async Collection(item) {
        let queryData = {
          ItemId: item.ItemId,
          TalkType: 4,
          IsDelete: item.iscollections
        }
        let collectionMsg = await setCollection(queryData)
        if (item.iscollections) {
          this.$set(item, 'collections', item.collections - 1)
        } else {
          this.$set(item, 'collections', item.collections + 1)
        }
        this.$set(item, 'iscollections', !item.iscollections)
      },
      //评论
      async commentValue(row, val) {
        let queryData = {
          ItemId: row.ItemId,
          IsReply: false,
          Message: val,
          ScopeType: 0
        }
        let commentMsg = await setComments(queryData)
        await window.location.reload();
        if (!commentMsg) {
          this.$set(row, 'commentss', row.commentss + 1)
        }
      },
      // 评论回复
      async discussValue(row, val) {
        let queryData = {
          ItemId: row.ItemId, // 项目ID
          IsReply: true, // 回复
          ReplyId: row.CommentsId, // 被回复说说的Id  是取CommentsId 还是ReplyId
          ReplyUserId: row.UserId,// 被回复说说发布的ID ReplyUserId
          Message: val,
          ScopeType: 0 // 项目评论
        }
        let commentMsg = await setComments(queryData)
        if (commentMsg) {
          this.$Message.success('回复成功！')
        }
      },
      // 关注
      async setFollow(item) {
        let queryData = {
          UserId: item.UserId,
          IsDelete: item.iscollections
        }
        let collectionMsg = await setCollection(queryData)
        this.$set(item, 'IsFollow', !item.iscollections)
      },
      dataDetailsMaskShow(obj) {
        this.paymentConfig.url = '';
        this.modalConfig.isWxConfig = false;
        if (obj.type == 'Down') {
          this.isShowDateDetailsDown = true;
        } else {
          this.isShowDataDetailsCustom = true;
        }
      },
      // 支付接口调用成功的回调
      payment (config, type) {
        if (type === 0) {
          this.modalConfig.isWxConfig = true;
          this.paymentConfig = config;
        } else {
          window.location.href = config.data
        }
        this.isShowDateDetailsDown = false;
        this.isShowDataDetailsCustom = false;
      },
      dataDetailsMaskClose(obj) {
        this.isShowDateDetailsDown = false;
        this.isShowDataDetailsCustom = false;
      }
    }
  }
</script>
<style lang="less" scoped>
    .data-details-box {
        width: 100%;
        height: auto;
        background: rgba(242, 244, 242, 1);

        .data-details-con-box {
            width: 1200px;
            height: auto;
            margin: 0 auto;

            .data-details-location {
                height: 46px;
                width: 100%;
                padding-top: 9px;

                .cate-span {
                    cursor: pointer;

                    &:hover {
                        color: #ff3c00;
                    }
                }
            }

            .data-details-con {
                width: 100%;
                height: auto;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: space-between;
                padding-bottom: 30px;

                .margin-top {
                    position: fixed;
                    top: 457px;
                    z-index: 2;
                }

                .margin-top2 {
                    position: fixed;
                    top: 378px;
                    z-index: 2;
                }

                .data-details-location {
                }

                .fix-top {
                    position: fixed;
                    top: 0;
                    z-index: 2;
                }

                .fix-bottom {
                    position: fixed;
                    z-index: 2;
                }

                .margin-bottom {
                    position: fixed;
                    z-index: 2;
                }
            }
        }
    }
</style>
