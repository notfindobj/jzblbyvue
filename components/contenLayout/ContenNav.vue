<template>
    <div class="nav-box">
        <div class="nav-list">
            <p>在以下分类中找：</p>
            <ul>
                <li v-for="(item, index) in oneMeun" :class="item.ItemAttributesId === currentInex ? 'li-active' : ''" :key="index" @click="choseSome(index,item)">
                    {{item.ItemAttributesFullName}}
                    <img src="../../assets/images/sanjiao.png"/>
                </li>
               
            </ul>
            <span class="proNum">共{{proNum}}个相关项目</span>
        </div>
        <div class="screening-nav">
            <!-- 面包屑 -->
            <Breadcrumb separator=">">
                <BreadcrumbItem style="color: #999999">资源库</BreadcrumbItem>
                <BreadcrumbItem style="color: #999999;font-weight: normal" v-if="currentName">{{currentName}}
                </BreadcrumbItem>
            </Breadcrumb>
            <!-- 选中的属性 -->
            <div class="itemAttribute">
                <div class="itemAttribute-items" v-for="(items, index) in queryConditions" :key="index"  @click="delItems(items)">
                    <span>{{items.AttrKeyFullName}}:{{items.AttrValueFullName}}</span>
                    <i class="iconfont icon-chahao2"></i>
                </div>
            </div>
            <!-- 属性展示 -->
            <ul class="screening-nav-list">
                <li v-for="(item,index) in itemAttribute" :key="index" :class="item.AttrId ? 'li-active' : ''">
                    <p>{{item.AttrName}}</p>
                    <ol v-if="item.LogoDataCode === 'CompanyData'">
                        <li v-for="(items,index) in item.ChildNode" :key="index" @click="choseSomeOne(item,items)" class="companyli">
                            <div class="company">
                                <div class="company-pos">{{items.AttrName}}</div>
                                <div class="company-side" v-if="items.LogoPath">
                                    <img v-if="items.LogoPath" :src="items.LogoPath" alt="">
                                    <span v-else>{{items.AttrName}}</span>
                                </div>
                            </div>
                        </li>
                    </ol>
                    <ol v-else>
                        <li v-for="(items,index) in item.ChildNode" :key="index" @click="choseSomeOne(item,items)">
                            {{items.AttrName}}
                        </li>
                    </ol>
                    <!-- 下拉图标 -->
                    <!-- <i :class="item.AttrId ? 'icon iconfont icon-jiantou-shang-shixin-yuanxing' : 'icon iconfont icon-xiangxiayuanjiantouxiajiantouxiangxiamianxing'"
                       v-if="item.ChildNode.length > 13" @click="upAndDown(item)"></i> -->
                </li>
            </ul>
        </div>
        <div v-swiper:mySwiper="swiperOption" class="swiper-boxs" v-if="userItem.length > 0" >
            <div class="swiper-wrapper">
                <div v-for="(items, index) in userItem" class="swiper-slide" :key="index">
                    <div class="swiper-slide-item" >
                        <img :src="items.ItemTitleImg" alt="">
                        <span class="slide-ite-new" v-if="userInfoID === items.UserId">NEW</span>
                        <div class="slide-item-text" @click="viewDetails(items)">
                            <div class="item-text-title" @click.stop>
                                <span @click="goPersonalCenter(items)">
                                    <span :style="`background-image: url(${items.HeadIcon})`"></span>
                                    <p>{{items.NickName}}</p>
                                </span>
                            </div>
                            <div class="item-text-content">
                                {{items.ItemName}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-button-prev"></div><!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <div class="swiper-button-next"></div><!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
        </div>
    </div>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
import {analogJump} from '../../plugins/untils/public'
export default {
    name: 'contenNav',
    props: {
        proNum: {
           type: Number,
           default: 0
        },
        itemAttribute: {
            type: Array,
            required: true,
            default: function () {
            return []
            }
        },
        userItem: {
            type: Array,
            default: function () {
                return []
            }
        },
        queryConditions: {
            type: Array,
            required: true,
            default: function () {
                return []
            }
        }
    },
    data() {
        return {
            currentInex: '',
            currentName: '',
            oneMeun: [],
            clicked: -1,
            swiperOption: {
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                slidesPerView: 4,
                spaceBetween: 20,
                slidesPerGroup: 1,
                loop: true,
                loopFillGroupWithBlank: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                on: {
                    slideChange() {},
                    tap() {}
                },
            }
        }
    },
    computed: {
        ...mapGetters(['getSessionStorage']),
        ...mapState({
            userInfoID: state => state.overas.auth? state.overas.auth.UserId: ""
        })
    },
    created() {
        this.currentName = this.getSessionStorage.baseSearchNav.title;
        this.currentInex = this.getSessionStorage.baseSearchNav.ClassTypeArrList[0].AttrKey;
        this.$store.dispatch('getMenu').then(async (res) => {
            this.oneMeun = res.RetMenuData;
        })
    },
    methods: {
        viewDetails (row) {
            let ItemType = Number(sessionStorage.getItem('searchIndex') || 0);
            let routeData = this.$router.resolve({
                name: 'DataDetails',
                query: {id: row.ItemId, layout: (ItemType !== 6 && ItemType !== 7) ? true : false}
            })
            analogJump(routeData.href);
        },
        // 点击头像，去个人中心
        goPersonalCenter(items) {
            let routeData = this.$router.resolve({
                name: 'HeAndITribal-id',
                query: { id: items.UserId}
            })
            analogJump(routeData.href);
        },
        // 一级
        choseSome(index, item) {
            this.currentInex = item.ItemAttributesId;
            this.currentName = item.ItemAttributesFullName;
            this.$emit('choseSome', item)
        },
        choseSomeOne(item, inx) {
            this.$emit('choseSomeOne', item, inx)
        },
        delItems(item) {
            this.$emit('delItems', item)
        },
        upAndDown(item) {
            item.value = !item.value
        }
    },
}
</script>
<style lang="less" scoped>
    .slide-ite-new {
        position: absolute;
        color: #ff3c00;
        font-weight: bold;
        right: 10px;
        line-height: 30px;
    }
    .swiper-boxs {
        height: 200px;
        margin-bottom: 10px;
        .swiper-slide-item {
            cursor: pointer;
            width: 290px;
            height: 200px;
            position: relative;
          
            .slide-item-text {
                display: none;
                position: absolute;
                width: 100%;
                height: 100%;
                text-align: center;
                background: rgba(0, 0, 0, .5);
                color: #FFFFFF;
                .item-text-title {
                    text-align: center;
                    display: inline-block;
                    margin: 40px auto 0;
                    span {
                        display: inline-block;
                        width: 60px;
                        height: 60px;
                        background-size: 100% 100%;
                        border-radius: 50%;
                    }
                }
            }
            &:hover .slide-item-text {
                display: block;
            }
            .item-text-content {
                text-align: center;
                font-size: 16px;
                font-weight: 500;
            }
            img {
                position: absolute;
                width: 100%;
                height: 100%;
            }
        }
    }
    .company {
        display: inline-block;
        width: 100px;
        text-align: center;
        height: 45px;
        position: relative;
        &:hover &-pos {
            opacity: 1;
            border: 2px solid #ff3c00;
        }
        &:hover &-side {
            opacity: 0;
        }
        &-pos {
            position: absolute;
            width: 100%;
            opacity: 1;
            margin-top: 1px;
            border: 1px solid #716865;
        }
        &-side {
            position: absolute;
            border: 1px solid #716865;
            transition: opacity .5s;
            width: 100%;
            margin-top: 1px;
            height: 40px;
            opacity: 1;
            img {
                width: 100%;
                height: 40px;
                background: #FFFFFF;
            }
        }
    }
    .proNum {
        color: #999;
        font-size: 14px;
    }
    .nav-box {
        width: 100%;
        height: auto;
        padding-top: 20px;

        .nav-list {
            font-size: 16px;
            color: #333333;
            height: 22px;
            margin-bottom: 4px;
            display: flex;
            flex-direction: row;
            > p {
                width: 128px;
                margin-right: 14px;
            }
            > ul {
                flex: 1;
                display: flex;
                flex-direction: row;
                font-weight: bold;
                > li {
                    height: 22px;
                    padding-right: 13px;
                    margin-right: 13px;
                    position: relative;
                    cursor: pointer;

                    &:before {
                        width: 2px;
                        height: 10px;
                        content: '';
                        background: #D6D6D6;
                        border-radius: 1px;
                        position: absolute;
                        right: 0;
                        top: 6px;
                    }

                    &:last-child {
                        &:before {
                            width: 0px;
                            height: 10px;
                            content: '';
                            background: #D6D6D6;
                            border-radius: 1px;
                            position: absolute;
                            right: 0;
                            top: 6px;
                        }
                    }

                    &:hover {
                        color: #FF3C00;
                    }

                    img {
                        display: block;
                        width: 17px;
                        height: 16px;
                        position: absolute;
                        bottom: -17px;
                        left: 38%;
                        transform: translateX(-50%);
                        display: none;
                    }
                }

                .li-active {
                    color: #FF3C00;

                    img {
                        display: block;
                    }
                }
            }
        }

        .screening-nav {
            width: 100%;
            height: auto;
            margin-top: 12px;
            margin-bottom: 10px;
            background: #FFFFFF;
            border: 1px solid #303030;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 10px 20px 10px;

            .screening-nav-list {
                width: 100%;
                li.companyli {
                    display: flex;
                    margin-right: 0px;
                }
                > li {
                    height: 40px;
                    overflow: hidden;
                    line-height: 40px;
                    font-size: 14px;
                    color: #333333;
                    border-bottom: 1px dashed #DDDDDD;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;
                    position: relative;

                    &:last-child {
                        border-bottom: none;
                    }

                    > p {
                        /*width: 76px;*/
                        margin-right: 20px;
                        font-weight: bold;
                    }

                    > ol {
                        flex: 1;

                        > li {
                            float: left;
                            margin-right: 15px;
                            cursor: pointer;

                            &:hover {
                                color: #FF3C00;
                            }
                        }

                        .li-active {
                            color: #FF3C00;
                        }
                    }

                    > i {
                        font-size: 14px;
                        color: #cccccc;
                        position: absolute;
                        right: 0;
                        top: 0px;
                    }
                }

                .li-active {
                    height: auto;
                }
            }
        }
    }

    .ivu-breadcrumb-item-separator {
        margin: 0 2px !important;
    }

    .ivu-breadcrumb {
        display: inline-block;
    }

    .itemAttribute {
        display: inline-block;
        margin-left: 10px;
        &-items {
            display: inline-block;
            cursor: pointer;
            margin-right: 10px;
            border: .5px solid #999999;
            border-radius: 3px;
            padding: 0 4px;
            color: #333333;
            span {
                line-height: 29px;
            }
            i {
                position: relative;
                top: 2px;
            }
            &:hover {
                color: #FF3C00;
            }
        }
    }
</style>
