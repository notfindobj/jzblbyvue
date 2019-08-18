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
                <div class="position-sticky">
                    <data-details-right
                        :detaDetails="detaDetails"
                        :attribute="ItemAttributesEntities"
                        @dataDetailsMaskShow="dataDetailsMaskShow"
                        @setFollow="setFollow"
                    />
                    <commentsCon
                        :width="'340px'"
                        :publish="detaDetails"
                        :comments="getGetCommentsData"
                        @thumbsUp="thumbsUp"
                        @Collection="Collection"
                        @commentValue="commentValue"
                        @discussValue="discussValue"
                        @somePraise="somePraise"
                        @Forward="Forward"
                    />
                </div>
            </div>
        </div>
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
            @cancel="cancel"
        />
        <share :config="configShare"/>
    </div>
</template>
<script>
    import dataDetailsLeft from '../../components/dataDetails/dataDetailsLeft.vue'
    import dataDetailsPDFLeft from '../../components/dataDetails/dataDetailsPDFLeft'
    import dataDetailsRight from '../../components/dataDetails/dataDetailsRight.vue'
    import commentsCon from '../../components/comments/commentsCon.vue'
    import share from '../../components/share'
    import { setthumbsUp, setCollection, setFollow, setComments, recordFrequency, downloadFile} from '../../service/clientAPI'
    import dataDetailsCustom from '../../components/dataDetails/dataDetailsCustom.vue'
    import dateDetailsDown from '../../components/dataDetails/dateDetailsDown.vue'
    import weixinBox from '../../components/weixin'
    import { mapGetters ,mapState} from 'vuex'
    import { setDemo } from '../../LocalAPI'
    import axios from 'axios'
    import qs from 'qs'
    import { async } from 'q';

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
                paymentConfig: {},
                downloadTime: null,
                configShare: {
                    isModal: false
                }
            }
        },
        components: {
            share,
            weixinBox,
            dataDetailsLeft,
            dataDetailsRight,
            commentsCon,
            dateDetailsDown,
            dataDetailsCustom,
            dataDetailsPDFLeft
        },
        computed: {
            ...mapGetters(['isLogin']),
            ...mapGetters(['getSessionStorage']),
            ...mapState({
                auth: state => state.overas.auth
            }),
        },
        async asyncData({ app, store, route }) {
            let baseSearchItem = JSON.parse(JSON.stringify(store.state.overas.sessionStorage.baseSearchItem));
            let baseSearchNav = JSON.parse(JSON.stringify(store.state.overas.sessionStorage.baseSearchNav));
            // 项目数据
            let itemData = {
                reqItemList: {
                    ClassTypeArrList: baseSearchNav.ClassTypeArrList,
                    Pagination: baseSearchItem.Pagination,
                },
                Id: baseSearchNav.Id
            }
            let getBaseDataDetail = await store.dispatch('getBaseDataDetails', itemData);
            
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
                itemData,
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
                let showLayout = JSON.parse(JSON.stringify(this.getSessionStorage.baseSearchNav));
                if (showLayout.title === '文本') {
                    this.isLayout = false
                } else if (showLayout.showLayout === 'false') {
                    this.isLayout = false
                } else if (showLayout.showLayout === 'true') {
                    this.isLayout =  true
                } else {
                    this.isLayout = showLayout.showLayout
                }
            } catch (error) {}
        },
        mounted() {
            let _this = this
            $(document).ready(function () {
                _this.initLazy()
            });
            // // 记录用户访问
            recordFrequency({
                ItemId: this.detaDetails.ItemId,
                DomainType: 0
            })
        },
        methods: {
            cancel () {
                clearInterval(this.downloadTime)
            },
            // 上下翻页，项目详情
            async PNpage(val) {
                if (!val) {
                    this.$Message.warning('没有项目');
                    return false
                }
                try {
                    let baseSearchItem = JSON.parse(JSON.stringify(this.getSessionStorage.baseSearchItem));
                    let baseSearchNav = JSON.parse(JSON.stringify(this.getSessionStorage.baseSearchNav));
                    // 项目数据
                    let itemData = {
                        reqItemList: {
                            ClassTypeArrList: baseSearchNav.ClassTypeArrList,
                            Pagination: baseSearchItem.Pagination,
                        },
                        Id:val
                    }
                    baseSearchNav.Id = val
                    // 搜索页导航数据
                    let baseSearch = {
                        key: 'baseSearchNav',
                        value: baseSearchNav
                    }
                    this.$store.dispatch('Serverstorage', baseSearch);
                    let msgs = await setDemo('baseSearchNav', baseSearch);
                    this.$router.push({ name: "DataDetails-id", query: { id: val } })
                    location.reload()
                } catch (error) {}
            },
            async clickCate(index) {
                let attrList = [];
                let query = {};
                let dataBase = JSON.parse(JSON.stringify(this.getSessionStorage.baseSearchNav));
                this.ItemAttributesEntities.forEach((item, attrIndex) => {
                    if (index >= attrIndex) {
                        query = item
                        attrList.push({
                            AttrKey: item.ItemAttributesId, AttrValue: item.ItemSubAttributeId
                        })
                    }
                });
                dataBase.ClassTypeArrList.splice(1);
                dataBase.ClassTypeArrList.push(...attrList)
                // 搜索页导航数据
                let baseSearchNav = {
                    key: 'baseSearchNav',
                    value: dataBase
                    
                }
                this.$store.dispatch('Serverstorage', baseSearchNav);
                this.$router.push({ name: "dataBase"});
                let msgs = await setDemo('baseSearchNav', baseSearchNav);
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
                    IsDelete: item.IsFollow
                }
                let collectionMsg = await setFollow(queryData)
                this.$set(item, 'IsFollow', !item.IsFollow)
            },
            // 转发
            Forward () {
                this.configShare.isModal = true;
            },
            async dataDetailsMaskShow(obj) {
                this.paymentConfig.url = '';
                if (obj.isPay) {
                    let msg = await downloadFile(obj.ItemId);
                    if (msg) {
                       try {
                            let name = msg.split('&')[1]
                            var eleLink = document.createElement('a');
                            eleLink.download = '';
                            eleLink.style.display = 'none';
                            eleLink.href = msg.split('&')[0];
                            // 触发点击
                            document.body.appendChild(eleLink);
                            eleLink.click();
                            // 然后移除
                            document.body.removeChild(eleLink);
                       } catch (error) {
                         console.log('下载出错');
                       }
                    }
                    return false
                }
                
                this.modalConfig.isWxConfig = false;
                if (obj.type == 'Down') {
                    this.isShowDateDetailsDown = true;
                } else {
                    this.isShowDataDetailsCustom = true;
                }

            },
            // 支付接口调用成功的回调
            async payment(config, type, id) {
                if (type === 0) {
                    this.modalConfig.isWxConfig = true;
                    this.paymentConfig = config;
                    this.downloadTime = setInterval(async () => {
                        let msg = await downloadFile(id);
                        if (msg) {
                            if (msg.Code === 200) {
                                clearInterval(this.downloadTime)
                            } else {
                                return false
                            }
                            try {
                                let name = msg.split('&')[1]
                                var eleLink = document.createElement('a');
                                eleLink.download = '';
                                eleLink.style.display = 'none';
                                eleLink.href = msg.split('&')[0];
                                // 触发点击
                                document.body.appendChild(eleLink);
                                eleLink.click();
                                // 然后移除
                                document.body.removeChild(eleLink);
                            } catch (error) {
                                
                            }
                        }
                    }, 3000)
                } else {s
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
    .position-sticky {
        position: sticky;
        top: 0px;
    }
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
