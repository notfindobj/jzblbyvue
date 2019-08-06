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
            :UserProAndFans="UserProAndFans"
            :currentWorks="currentWorks"
            :isLast="isLast"
            @entrySorting="entrySorting"
            @viewItem="viewItem"
            @showWorks="showWorks"
            @worksFocus="worksFocus"
            @hideWorks="hideWorks"
            @jumpRoute="jumpRoute"
            @loadData="loadData"
            @handleCollections="handleCollections"
        />
        <div class="page-box">
            <Page :total="RspPaginationData.records" :current="RspPaginationData.page" @on-change="changePage"
                  :page-size="32" show-elevator/>
        </div>
    </div>
</template>
<script>
    import ContenNav from '../../components/contenLayout/ContenNav.vue'
    import Conten from '../../components/contenLayout/Content.vue'
    import { getBaseData, getUserProAndFans, setFollow, setCollection } from '../../service/clientAPI'
    import { mapGetters } from 'vuex'
    import { setDemo } from '../../LocalAPI'

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
                pagesNum: {},
                listInfo: {},
                RspSelectMenuDatas: [],
                RspItemDatas: [],
                RspQueryClassify: [],
                RspPaginationData: {},
                UserProAndFans: {},
                showLayout: true,
                currentWorks: '',
                isFinished: true,   // 判断请求是否完成
                pageNum: 1
            }
        },
        computed: {
            ...mapGetters(['getSessionStorage']),
            // 判断是否是最后一页数据
            isLast() {
                return this.RspPaginationData.page === this.RspPaginationData.total;
            }
        },
        async asyncData({ app, store, route }) {
            let queryData = JSON.parse(JSON.stringify(store.state.overas.sessionStorage.dataBase));
            queryData.Page = 1;
            let showLayout = queryData.title !== '建筑规范';
            let menuData = await store.dispatch('getMenu');
            let getBaseData = await store.dispatch('getBaseData', queryData);
            return {
                pagesNum: queryData,
                showLayout: showLayout,
                listInfo: menuData.RetMenuData || [], // 导肮
                getBaseData: getBaseData,
                RspSelectMenuDatas: getBaseData.RspSelectMenuDatas, //菜单数据
                RspItemDatas: getBaseData.RspItemDatas, //项目数据
                RspQueryClassify: getBaseData.RspQueryClassify, //查询参数
                RspPaginationData: getBaseData.RspPaginationData, //翻页数据
            }
        },
        methods: {
            // 点击收藏
            handleCollections(flag, index) {
                setCollection({
                    ItemId: this.RspItemDatas[index].ItemId,
                    ItemName: this.RspItemDatas[index].ItemName,
                    ItemTitleImg: this.RspItemDatas[index].ItemTitleImg,
                    IsDelete: !flag,
                    TalkType: 4
                }).then(() => {
                    this.RspItemDatas[index].IsCollections = flag;
                    this.$Message.success('操作成功')
                })
            },
            // 加载数据
            loadData() {
                if (this.isFinished && this.RspPaginationData.page < this.RspPaginationData.total) {
                    let queryData = JSON.parse(JSON.stringify(this.getSessionStorage.dataBase));
                    this.isFinished = false;
                    queryData.Page = queryData.Page === 0 ? 2 : queryData.Page + 1;
                    this.getBaseDatas(queryData, true)
                }
            },
            // 点击分页
            async changePage(page) {
                this.pageNum = page;
                if (document.documentElement.scrollTop) {
                    document.documentElement.scrollTop = 0;
                } else {
                    document.body.scrollTop = 0;
                }
                let queryData = JSON.parse(JSON.stringify(this.getSessionStorage.dataBase));
                queryData.Page = page;
                let serverBataBase = {
                    key: 'dataBase',
                    value: queryData
                }
                this.$store.dispatch('Serverstorage', serverBataBase);
                let msgs = await setDemo('dataBase', serverBataBase);
                this.getBaseDatas(queryData, false)
            },
            //一级菜单
            async getItemsBaseData(row) {
                let queryData = JSON.parse(JSON.stringify(this.getSessionStorage.dataBase));
                this.showLayout = row.ItemAttributesFullName !== '建筑规范';
                queryData.title = row.ItemAttributesFullName;
                queryData.KeyWords = ''
                queryData.ClassTypeId = `${ row.ItemSubAttributeCode }|${ row.ItemAttributesId }`;
                queryData.ClassTypeArrList = [{ ArrId: '', ArrEnCode: '' }];
                let serverBataBase = {
                    key: 'dataBase',
                    value: queryData
                }
                this.$store.dispatch('Serverstorage', serverBataBase);
                let msgs = await setDemo('dataBase', serverBataBase);
                this.getBaseDatas(queryData)
                this.$router.push({ name: "dataBase-id", query: { id: row.ItemAttributesId } });

                // 去除搜索框内容
                if (sessionStorage.getItem('searchIndex') && sessionStorage.getItem('searchKeyWords')) {
                    sessionStorage.removeItem('searchIndex');
                    sessionStorage.removeItem('searchKeyWords');
                    window.location.reload();
                }

            },
            //二级菜单
            async choseSomeOne(row, rows) {
                let queryData = JSON.parse(JSON.stringify(this.getSessionStorage.dataBase));
                if (queryData.ClassTypeArrList === '') {
                    queryData.ClassTypeArrList = [];
                }
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

                    let serverBataBase = {
                        key: 'dataBase',
                        value: queryData
                    }
                    this.$store.dispatch('Serverstorage', serverBataBase);
                    let msgs = await setDemo('dataBase', serverBataBase);
                    this.getBaseDatas(queryData)
                    this.$router.push({ name: "dataBase-id", query: { id: row.ItemAttributesId } })
                }
            },
            // 删除选项
            async delItems(items) {
                let queryData = JSON.parse(JSON.stringify(this.getSessionStorage.dataBase));
                let TypeArrList = queryData.ClassTypeArrList || [];
                let ClassTypeArrList = [];
                ClassTypeArrList = TypeArrList.filter(o => o.ArrEnCode !== items.ArrEnCode);
                if (ClassTypeArrList.length < 1) {
                    ClassTypeArrList = [{ ArrId: '', ArrEnCode: '' }]
                }
                queryData.ClassTypeArrList = ClassTypeArrList;
                let serverBataBase = {
                    key: 'dataBase',
                    value: queryData
                }
                this.$store.dispatch('Serverstorage', serverBataBase);
                let msgs = await setDemo('dataBase', serverBataBase);
                this.getBaseDatas(queryData)
            },
            async getBaseDatas(queryData, isAutoLoading = false) {
                let showLayout = queryData.title !== '建筑规范';
                let pageCon = JSON.parse(JSON.stringify(queryData))
                let BaseData = await getBaseData(queryData);
                this.isFinished = true;
                if (BaseData) {
                    this.RspQueryClassify = [];
                    this.RspSelectMenuDatas = BaseData.RspSelectMenuDatas;//菜单数据
                    this.RspItemDatas = !isAutoLoading ? BaseData.RspItemDatas : this.RspItemDatas.concat(BaseData.RspItemDatas); //项目数据
                    this.RspQueryClassify = BaseData.RspQueryClassify; //查询参数
                    this.RspPaginationData = BaseData.RspPaginationData; //翻页数据
                    pageCon.Page = BaseData.RspPaginationData.page;
                    let serverBataBase = {
                        key: 'dataBase',
                        value: pageCon
                    }
                    this.$store.dispatch('Serverstorage', serverBataBase);
                    let msgs = await setDemo('dataBase', serverBataBase);
                    // 只留了第几页
                }
            },
            // 排序
            async entrySorting(val) {
                let queryData = JSON.parse(JSON.stringify(this.getSessionStorage.dataBase));
                queryData.SortType = val;
                queryData.Order = false;
                let serverBataBase = {
                    key: 'dataBase',
                    value: queryData
                }
                this.$store.dispatch('Serverstorage', serverBataBase);
                let msgs = await setDemo('dataBase', serverBataBase);
                this.getBaseDatas(queryData)
            },
            // 查看详情
            async viewItem(item) {
                let queryData = JSON.parse(JSON.stringify(this.getSessionStorage.dataBase));
                queryData.Id = item.ItemId;
                queryData.showLayout = this.showLayout;
                let serverBataBase = {
                    key: 'dataBase',
                    value: queryData
                }
                this.$store.dispatch('Serverstorage', serverBataBase);
                let msgs = await setDemo('dataBase', serverBataBase);
                let routeData = this.$router.resolve({ name: 'DataDetails-id', query: { id: item.ItemId } });
                window.open(routeData.href, '_blank');
            },
            // 获取项目和粉丝量
            async showWorks(user) {
                let msg = await getUserProAndFans(user.UserId)
                if (msg) {
                    this.currentWorks = user.ItemId
                    this.UserProAndFans = msg
                }
            },
            // 关注
            async worksFocus(item) {
                let queryData = {
                    UserId: item.UserId,
                    IsDelete: item.IsFollow
                };
                let collectionMsg = await setFollow(queryData)
                if (collectionMsg) {
                    this.$set(item, 'IsFollow', !item.IsFollow)
                }
            },
            hideWorks() {
                this.currentWorks = ''
            },
            // 路由跳转
            jumpRoute(items) {
                this.$router.push({ name: "HeAndITribal-id", query: { id: items.UserId } });
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

    .page-box {
        // display: flex;
        text-align: center;
        justify-content: center;
        padding: 20px 0;
    }

    .ivu-page {
        display: inline-block;
    }
</style>
