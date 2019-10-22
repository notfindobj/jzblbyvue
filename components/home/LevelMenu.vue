<template>
    <div>
        <div @mouseleave="mouseleave()">
            <div class="banner-nav">
                <div
                    v-for="items in oneMeun"
                    :key="items.ItemAttributesId"
                    :data-id="items.ItemAttributesId"
                    :class="items.ItemAttributesId === id ?  'banner-nav-items cursorHover': 'banner-nav-items'"
                    @mouseenter="mouseenter(items.ItemAttributesId)"
                    @click="goList(items)">
                    {{items.ItemAttributesFullName}}
                    <div>
                        <div class="sub-banner-nav" :class="items.ItemAttributesId === id ?  'show': 'hide'">
                            <div class="sub-banner-nav-items">
                                <template v-for="item in items.ChildNode">
                                    <div class="sub-banner-nav-items-title" :key="item.ItemAttributesId">
                                        <span
                                            class="sub-banner-nav-items-title-type">{{item.ItemAttributesFullName}}:</span>
                                        <div style="display:inline-block;width:85%">
                                            <div v-for="it in item.ChildNode" :key="it.ItemAttributesId"
                                                 class="sub-banner-nav-items-title-content">
                                                <span @click.stop="clickFullName(items, item, it)">{{it.ItemAttributesFullName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { _debounce, analogJump } from '../../plugins/untils/public'
    import { mapGetters, mapState } from 'vuex'
    import { setDemo } from '../../LocalAPI'
    export default { 
        data() {
            return {
                id: '',
                oneMeun: []
            }
        },
        computed: {
            ...mapState({
                sessionStorages: state => state.overas.sessionStorage,
                showSign: state => state.overas.showSign
            }),
            ...mapGetters(['getSessionStorage', 'isLogin']),
        },
        mounted() {
            this.$store.dispatch('getMenu').then(async (res) => {
                this.oneMeun = res.RetMenuData;
            })
        },
        methods: {
            mouseenter: _debounce(function (id) {
                this.id = id
            }, 100),
            mouseleave: _debounce(function (id) {
                this.id = id
            }, 100),
            // 点击二级分类
            async clickFullName(pre, type, ch) {
                if (!this.isLogin) {
                    this.$store.dispatch('SETUP', true);
                    this.$store.dispatch('LOGGEDIN', 'signIn');
                    return false
                }
                // 搜索页导航数据
                let baseSearchNav = {
                    key: 'baseSearchNav',
                    value: {
                            ClassTypeArrList: [
                                {AttrKey: pre.ItemAttributesId, AttrValue: pre.ItemSubAttributeCode},
                                {AttrKey: type.ItemAttributesId, AttrValue: ch.ItemAttributesId},
                            ],
                            title: pre.ItemAttributesFullName,
                        }
                    
                }
                this.$store.dispatch('Serverstorage', baseSearchNav);
                let msgs = await setDemo('baseSearchNav', baseSearchNav);
                // 搜索页项目数据
                let baseSearchItem = {
                    key: 'baseSearchItem',
                    value: {
                        Pagination: {
                            SortType: '1',
                            KeyWords: "",
                            Order: true,
                            Page: 1,
                            Rows: 32
                       }
                    }
                }
                this.$store.dispatch('Serverstorage', baseSearchItem);
                let msgss = await setDemo('baseSearchItem', baseSearchItem);
                let routeData = this.$router.resolve({ name: 'dataBase'});
                analogJump(routeData.href);
            },
            // 点击一级分类
            async goList(cate) {
                if (!this.isLogin) {
                    this.$store.dispatch('SETUP', true);
                    this.$store.dispatch('LOGGEDIN', 'signIn');
                    return false
                }
                // 搜索页导航数据
                let baseSearchNav = {
                    key: 'baseSearchNav',
                    value: {
                        ClassTypeArrList: [{AttrKey: cate.ItemAttributesId, AttrValue: cate.ItemSubAttributeCode}],
                        title: cate.ItemAttributesFullName,
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
                let routeData = this.$router.resolve({ name: 'dataBase'});
                analogJump(routeData.href);
            }
        }
    }
</script>
<style lang="less" scoped>
    .hide {
        display: none;
    }

    .show {
        display: block;
    }

    .cursorHover {
        background: #FF3C00;
    }

    .banner-nav {
        position: absolute;
        z-index: 9;
        font-size: 14px;
        top: 0;
        color: #ffffff;
        height: 100%;
        width: 143px;

        &-items {
            text-align: center;
            line-height: 40px;
            background: rgba(0, 0, 0, .6);
            cursor: pointer;

            &:hover {
                background: #FF3C00;
            }

            &:first-child {
                margin-top: 4px;
            }
        }
    }

    .sub-banner-nav {
        position: absolute;
        left: 143px;
        top: 4px;
        min-width: 850px;
        min-height: 367px;
        padding: 7px 0;
        background: #ffffff;

        &-items {
            color: #666666;
            padding: 0 65px 0 27px;

            &-title {
                text-align: left;
                font-size: 14px;
                display: flex;

                &-content {
                    display: inline-block;

                    > span {
                        cursor: pointer;
                        white-space: nowrap;
                        margin-right: 11px;
                        padding: 2px;
                        border-radius: 2px;

                        &:hover {
                            background-color: #ff3c00;
                            color: #fff;
                        }
                    }
                }

                &-type {
                    width: 86px;
                    display: inline-block;
                    text-align: center;
                    font-weight: bold;
                }
            }

        }

    }
</style>
