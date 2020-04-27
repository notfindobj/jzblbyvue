<template>
    <div class="data-details-box">
        <div class="data-details-con-box">
            <div class="data-details-location">
                <Breadcrumb separator=">" style="margin-bottom: 20px">
                    <BreadcrumbItem class="BreadcrumbItem">档案库</BreadcrumbItem>
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
                        @openMap="openMap"
                    />
                    <commentsCon
                        :width="'340px'"
                        :publish="detaDetails"
                        @thumbsUp="thumbsUp"
                        @Collection="Collection"
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
        <mapModel @closeMap="closeMap" :keywords="keywords" v-if="isMap"/>
        <share :config="configShare" :qrcodeContent="qrcodeContent"/>
    </div>
</template>
<script>
    import mapModel from "../../components/mapModel"
    import dataDetailsLeft from '../../components/dataDetails/dataDetailsLeft.vue'
    import dataDetailsPDFLeft from '../../components/dataDetails/dataDetailsPDFLeft'
    import dataDetailsRight from '../../components/dataDetails/dataDetailsRight.vue'
    import commentsCon from '../../components/comments/commentsCon.vue'
    import share from '../../components/share'
    import { setthumbsUp, setCollection, setFollow, setComments, recordFrequency, downloadFile, delComment} from '../../service/clientAPI'
    import dataDetailsCustom from '../../components/dataDetails/dataDetailsCustom.vue'
    import dateDetailsDown from '../../components/dataDetails/dateDetailsDown.vue'
    import weixinBox from '../../components/weixin'
    import { mapGetters ,mapState} from 'vuex'
    import { setDemo } from '../../LocalAPI'
    import { analogJump } from '../../plugins/untils/public'
    export default {
        name: 'datadetail',
        head() {
            return {
                title: `档案库详情`,
                meta: [
                    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                    { hid: 'about', name: 'about', content: "档案库详情" }
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
                },
                isMap: false,
                keywords: '',
                qrcodeContent: {}
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
            dataDetailsPDFLeft,
            mapModel
        },
        computed: {
            ...mapGetters(['getSessionStorage', 'isLogin']),
            ...mapState({
                auth: state => state.overas.auth
            }),
        },
        async asyncData({ app, store, route }) {
            // 项目数据
            let itemData = {
                reqItemList: {},
                Id: route.query.id
            }
            try {
                let baseSearchItem = JSON.parse(JSON.stringify(store.state.overas.sessionStorage.baseSearchItem));
                let baseSearchNav = JSON.parse(JSON.stringify(store.state.overas.sessionStorage.baseSearchNav));
                itemData.reqItemList.ClassTypeArrList = baseSearchNav.ClassTypeArrList
                itemData.reqItemList.Pagination = baseSearchItem.Pagination
            } catch (error) {}
            let getBaseDataDetail = await store.dispatch('getBaseDataDetails', itemData);
            let pageTurning = {
                PrevItemId: getBaseDataDetail.PrevItemId,
                NextItemId: getBaseDataDetail.NextItemId,
            }
            return {
                getBaseDataDetail,
                PdfInfo: getBaseDataDetail.PdfInfo,
                detaDetails: getBaseDataDetail.ItemEntity,
                ItemAttributesEntities: getBaseDataDetail.ItemAttributesEntities,
                pageTurning,
                id: getBaseDataDetail.ItemEntity.ItemId
            }
        },
        created() {
            if (this.$route.query.layout === 'false') {
                this.isLayout = false
            } else if (this.$route.query.layout === 'true') {
                this.isLayout =  true
            }
        },
        mounted() {
            let _this = this;
            $(document).ready(function () {
                _this.initLazy()
            });
            //记录用户访问
            recordFrequency({
                ItemId: this.detaDetails.ItemId,
                DomainType: 0
            })
        },
        methods: {
            openMap (value) {
                this.keywords = value.ItemSubAttributeFullName
                this.isMap = true
            },
            closeMap () {
                this.isMap = false
            },
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
                    let routeData = this.$router.resolve({ name: "DataDetails", query: { id: val, layout: this.isLayout} });
                    window.location.href = routeData.href;
                } catch (error) {}
            },
            async clickCate(index) {
                let attrList = [];
                let query = {};
                let dataBase = JSON.parse(JSON.stringify(this.getSessionStorage.baseSearchNav || {}));
                this.ItemAttributesEntities.forEach((item, attrIndex) => {
                    if (index >= attrIndex) {
                        query = item
                        let clickCates = 'DesignLib'
                        if (attrIndex > 0) {
                            clickCates = item.ItemSubAttributeId
                        }
                        attrList.push({
                            AttrKey: item.ItemAttributesId, AttrValue: clickCates
                        })
                    }
                });
                dataBase.ClassTypeArrList = attrList
                // 搜索页导航数据
                let baseSearchNav = {
                    key: 'baseSearchNav',
                    value: dataBase
                    
                }
                let msgs = await setDemo('baseSearchNav', baseSearchNav);
                this.$store.dispatch('Serverstorage', baseSearchNav);
                let routeData = this.$router.resolve({ name: 'dataBase'});
                analogJump(routeData.href);
            },
            initLazy() {
                $("img[data-original]").lazyload()
            },
            // 项目点赞
            async thumbsUp(item) {
                if (!this.isLogin) {
                    this.$store.dispatch('SETUP', true);
                    this.$store.dispatch('LOGGEDIN', 'signIn');
                    return false
                }
                let queryData = {
                    ItemId: item.ItemId,
                    LikeType: 1,
                    IsDelete: item.islikes
                }
                // itemOperateData
                let thumbsUpMsg = await setthumbsUp(queryData);
                if (item.islikes) {
                    this.$set(item, 'likes', item.likes - 1)
                } else {
                    this.$set(item, 'likes', item.likes + 1)
                }
                console.log(item)
                this.$set(item, 'islikes', !item.islikes)
            },
            // 收藏
            async Collection(item) {
                if (!this.isLogin) {
                    this.$store.dispatch('SETUP', true);
                    this.$store.dispatch('LOGGEDIN', 'signIn');
                    return false
                }
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
            // 关注
            async setFollow(item) {
                if (!this.isLogin) {
                    this.$store.dispatch('SETUP', true);
                    this.$store.dispatch('LOGGEDIN', 'signIn');
                    return false
                }
                let queryData = {
                    UserId: item.UserId,
                    IsDelete: item.IsFollow
                }
                let collectionMsg = await setFollow(queryData)
                this.$set(item, 'IsFollow', !item.IsFollow)
            },
            // 转发
            Forward (row) {
                this.qrcodeContent = row;
                this.configShare.isModal = true;
            },
            async dataDetailsMaskShow(obj) {
                if (!this.isLogin) {
                    this.$store.dispatch('SETUP', true);
                    this.$store.dispatch('LOGGEDIN', 'signIn');
                    return false
                }
                this.paymentConfig.url = '';
                // 判断有没有支付过
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
                // 立即下载
                if (obj.type == 'Down') {
                    this.isShowDateDetailsDown = true;
                } else {
                    this.isShowDataDetailsCustom = true;
                }
            },
            // 支付接口调用成功的回调
            payment(config, type, id) {
                let _this = this;
                _this.paymentConfig = config;
                setTimeout(async function () {
                    switch(type) {
                        case 0:
                            _this.modalConfig.isWxConfig = true;
                            _this.downloadTime = setInterval(async () => {
                                let msg = await downloadFile(id);
                                if (typeof(msg)=='string') {
                                    clearInterval(this.downloadTime);
                                    this.modalConfig.isWxConfig = false;
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
                                        console.log('下载出错')
                                    }
                                }
                            }, 3000)
                            break;
                        case 1:
                            window.location.href = config.data
                            break;
                        case 2:
                            _this.$Message.success("支付成功，正在为您加载资源...")
                            _this.detaDetails.IsPay = true;
                            let msg = await downloadFile(id);
                            if (typeof(msg)=='string') {
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
                                    console.log('下载出错')
                                }
                            }
                            break;
                        case 3:
                            _this.$Message.success("支付成功，正在为您加载资源...")
                            _this.detaDetails.IsPay = true;
                            msg = await downloadFile(id);
                            if (typeof(msg)=='string') {
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
                                    console.log('下载出错')
                                }
                            }
                            break;
                    } 
                    _this.isShowDateDetailsDown = false;
                    _this.isShowDataDetailsCustom = false;
                }, 1000)
                
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
