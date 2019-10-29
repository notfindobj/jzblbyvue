<template>
    <div class="conten-layout-box">
        <conten-nav
            :itemAttribute="RspSelectMenuDatas"
            :queryConditions="RspQueryClassify"
            @choseSome="getItemsBaseData"
            @choseSomeOne="choseSomeOne"
            @delItems="delItems"
            :proNum="RspPaginationData.records"
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
            <Page :total="RspPaginationData.records" :current="RspPaginationData.page" @on-change="changePage" :page-size="32" show-elevator/>
        </div>
    </div>
</template>
<script>
    import ContenNav from '../../components/contenLayout/ContenNav.vue'
    import Conten from '../../components/contenLayout/Content.vue'
    import { getBaseData, getUserProAndFans, setFollow, setCollection } from '../../service/clientAPI'
    import { mapGetters } from 'vuex'
    import { setDemo } from '../../LocalAPI'
    import { _throttle ,scrollToTop, analogJump} from '../../plugins/untils/public'
    export default {
        middleware: 'authenticated',
        head() {
            return {
                title: `资源库`,
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
                RspSelectMenuDatas: [],
                RspItemDatas: [],
                RspQueryClassify: [],
                RspPaginationData: {},
                UserProAndFans: {},
                showLayout: true,
                currentWorks: '',
                isFinished: true,   // 判断请求是否完成
                pageNum: 1,
                isLast: false,
                titleName: "示范区"
            }
        },
        computed: {
            ...mapGetters(['getSessionStorage'])
        },
        async asyncData({ app, store, route }) {
            let baseSearchItem = JSON.parse(JSON.stringify(store.state.overas.sessionStorage.baseSearchItem));
            let baseSearchNav = JSON.parse(JSON.stringify(store.state.overas.sessionStorage.baseSearchNav));
            baseSearchItem.Pagination.Page = 1;
            let showLayout = baseSearchNav.title !== '建筑规范';
            // 导航
            let searchNav = await store.dispatch('getSearchNav', baseSearchNav);
            // 项目数据
            let itemData = {
                ...baseSearchNav,
                ...baseSearchItem
            }
            let getBaseData = await store.dispatch('getItemList', itemData);
            let userId ={
                UserId: store.state.overas.UserId
            }
            // let userItem = await store.dispatch('geOwnItemList', userId);
            return {
                searchNav,
                RspSelectMenuDatas: searchNav.RetMenuData.ChildNode, //菜单数据
                RspQueryClassify: searchNav.RetSelectTypeData.selectBtns, //查询参数
                showLayout: showLayout,
                getBaseData,
                RspItemDatas: getBaseData.RspItemDatas, //项目数据
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
            loadData: _throttle(async function () {
                if (!this.isFinished) {
                    return false;
                } 
                let baseSearchItem = JSON.parse(JSON.stringify(this.getSessionStorage.baseSearchItem));
                let page = Number(baseSearchItem.Pagination.Page);
                if (this.RspPaginationData.total === 1) {
                    this.isLast = true;
                    return false;
                }
                this.isLast = false;
                if (this.RspPaginationData.page >= this.RspPaginationData.total) {
                    this.$Message.info('已经是最后一页了');
                    return false;
                }
                this.isFinished = false
                baseSearchItem.Pagination.Page =page + 1;
                // 搜索页项目数据
                let SearchItem = {
                    key: 'baseSearchItem',
                    value: baseSearchItem
                }
                this.$store.dispatch('Serverstorage', SearchItem);
                let msgss = await setDemo('baseSearchItem', SearchItem);
                this.getItemsList(1)
            }, 1500),
            // 点击分页
            async changePage(page) {
                let baseSearchItem = JSON.parse(JSON.stringify(this.getSessionStorage.baseSearchItem));
                let pages = Number(baseSearchItem.Pagination.Page);
                baseSearchItem.Pagination.Page = page;
                // 搜索页项目数据
                let SearchItem = {
                    key: 'baseSearchItem',
                    value: baseSearchItem
                }
                this.$store.dispatch('Serverstorage', SearchItem);
                let msgss = await setDemo('baseSearchItem', SearchItem);
                this.getItemsList()
            },
            //一级菜单
            async getItemsBaseData(row) {
                this.$store.dispatch('SEARCHDATA', row.Sort-1);
                sessionStorage.setItem('searchIndex', row.Sort-1);
                this.showLayout = row.ItemAttributesFullName !== '建筑规范';
                // 搜索页导航数据
                let baseSearchNav = {
                    key: 'baseSearchNav',
                    value: {
                            ClassTypeArrList: [{AttrKey: row.ItemAttributesId, AttrValue: row.ItemSubAttributeCode}],
                            title: row.ItemAttributesFullName,
                        }
                }
                this.$store.dispatch('Serverstorage', baseSearchNav);
                let msgs = await setDemo('baseSearchNav', baseSearchNav);
                // 搜索页项目数据
                let baseSearchItem = {
                    key: 'baseSearchItem',
                    value: {
                        Pagination: {
                            SortType: 1,
                            KeyWords: "",
                            Order: true,
                            Page: 1,
                            Rows: 32
                       }
                    }
                }
                this.$store.dispatch('Serverstorage', baseSearchItem);
                let msgss = await setDemo('baseSearchItem', baseSearchItem);
                this.$router.push({ name: "dataBase"});
                this.getNavList()
                this.getItemsList()
                // 去除搜索框内容
                if (sessionStorage.getItem('searchIndex') && sessionStorage.getItem('searchKeyWords')) {
                    sessionStorage.removeItem('searchIndex');
                    sessionStorage.removeItem('searchKeyWords');
                    window.location.reload();
                }
            },
            //二级菜单
            async choseSomeOne(row, rows) {
                let baseSearch = JSON.parse(JSON.stringify(this.getSessionStorage.baseSearchNav))
                let attr = {
                    AttrKey: row.AttrId,
                    AttrValue: rows.AttrId
                }
                baseSearch.ClassTypeArrList.push(attr);
                // 搜索页导航数据
                let baseSearchNav = {
                    key: 'baseSearchNav',
                    value: baseSearch
                }
                this.$store.dispatch('Serverstorage', baseSearchNav);
                let msgs = await setDemo('baseSearchNav', baseSearchNav);
                // 搜索页项目数据
                let baseSearchItem = {
                    key: 'baseSearchItem',
                    value: {
                        Pagination: {
                            SortType: 1,
                            KeyWords: "",
                            Order: true,
                            Page: 1,
                            Rows: 32
                    }
                    }
                }
                this.$store.dispatch('Serverstorage', baseSearchItem);
                let msgss = await setDemo('baseSearchItem', baseSearchItem);
                this.$router.push({ name: "dataBase"});
                this.getNavList()
                this.getItemsList()
                    // 去除搜索框内容
                if (sessionStorage.getItem('searchIndex') && sessionStorage.getItem('searchKeyWords')) {
                    sessionStorage.removeItem('searchIndex');
                    sessionStorage.removeItem('searchKeyWords');
                    window.location.reload();
                }
            },
            // 删除选项
            async delItems(items) {
                let baseSearch = JSON.parse(JSON.stringify(this.getSessionStorage.baseSearchNav));
                let searchData =  baseSearch.ClassTypeArrList.filter(o => o.AttrValue !== items.AttrValue);
                // 搜索页导航数据
                let baseSearchNav = {
                    key: 'baseSearchNav',
                    value: {
                        ClassTypeArrList: searchData,
                        title: baseSearch.title
                    }
                }
                this.$store.dispatch('Serverstorage', baseSearchNav);
                let msgs = await setDemo('baseSearchNav', baseSearchNav);
                let baseSearchItem = {
                    key: 'baseSearchItem',
                    value: {
                        Pagination: {
                            SortType: 1,
                            KeyWords: "",
                            Order: true,
                            Page: 1,
                            Rows: 32
                        }
                    }
                }
                this.$store.dispatch('Serverstorage', baseSearchItem);
                let msgss = await setDemo('baseSearchItem', baseSearchItem);
                this.getNavList()
                this.getItemsList()
            },
            // 排序
            async entrySorting(val) {
                // 搜索页项目数据
                let baseSearchItem = {
                    key: 'baseSearchItem',
                    value: {
                        Pagination: {
                            SortType: val,
                            KeyWords: "",
                            Order: false,
                            Page: 1,
                            Rows: 32
                       }
                    }
                }
                this.$store.dispatch('Serverstorage', baseSearchItem);
                let msgss = await setDemo('baseSearchItem', baseSearchItem);
                this.getItemsList()
            },
            // 查看详情
            async viewItem(item) {
                let layout = null
                let baseSearch = JSON.parse(JSON.stringify(this.getSessionStorage.baseSearchNav));
                if (baseSearch.title === '文本' || baseSearch.title === '建筑规范') {
                    layout = false
                } else {
                    layout = this.showLayout;
                }
                // 搜索页导航数据
                let baseSearchNav = {
                    key: 'baseSearchNav',
                    value: baseSearch
                }
                this.$store.dispatch('Serverstorage', baseSearchNav);
                let msgs = await setDemo('baseSearchNav', baseSearchNav);
                let routeData = this.$router.resolve({ name: 'DataDetails', query: { id: item.ItemId , layout: layout } });
                analogJump(routeData.href);
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
            // 导航
            async getNavList () {
                let baseSearchNav = this.getSessionStorage.baseSearchNav
                let searchNav = await this.$store.dispatch('getSearchNav', baseSearchNav);
                if (searchNav) {
                    this.RspSelectMenuDatas = searchNav.RetMenuData.ChildNode; //菜单数据
                    this.RspQueryClassify = searchNav.RetSelectTypeData.selectBtns; //查询参数
                }
            },
            // 数据
            async getItemsList (type) {
                let baseSearchItem = this.getSessionStorage.baseSearchItem;
                let baseSearchNav = this.getSessionStorage.baseSearchNav;
                // 项目数据
                let itemData = {
                    ...baseSearchNav,
                    ...baseSearchItem
                }
                let searchNav = await this.$store.dispatch('getItemList', itemData);
                if (searchNav) {
                    this.isFinished = true;
                    this.RspPaginationData = searchNav.RspPaginationData
                    if (type === 1) {
                        this.RspItemDatas = this.RspItemDatas.concat(searchNav.RspItemDatas);
                    } else {
                        this.RspItemDatas = searchNav.RspItemDatas; //项目数据
                        scrollToTop()
                    }
                }
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
        text-align: center;
        justify-content: center;
        padding: 20px 0;
    }

    .ivu-page {
        display: inline-block;
        width: 100%;
    }
</style>
