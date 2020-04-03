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
            <Breadcrumb separator=">" v-if="queryConditions.length > 0">
                <BreadcrumbItem style="color: #999999">档案库</BreadcrumbItem>
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
                    <p>{{item.AttrName}}:</p>
                    <ol v-if="item.LogoDataCode === 'CompanyData'" class="comLogo">
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
        <div :class="`swiper-boxs${swiperKey} swiper-boxs`" v-show="queryConditions && queryConditions.length <= 0" :key="swiperKey" >
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
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
import {analogJump, getRanNum} from '../../plugins/untils/public'
import Swiper from "swiper"
// import 'swiper/dist/css/swiper.min.css'
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
            oneMeun: [],
            clicked: -1,
            swiperBox: 0,
            swiperKey: 'adashasnda'
        }
    },
    computed: {
        ...mapGetters(['getSessionStorage']),
        ...mapState({
            userInfoID: state => state.overas.auth? state.overas.auth.UserId: ""
        }),
    },
    created() {
        this.currentInex = this.getSessionStorage.baseSearchNav.ClassTypeArrList[0].AttrKey;
        this.$store.dispatch('getMenu').then(async (res) => {
            this.oneMeun = res.RetMenuData;
        })
    },
    watch: {
      userItem: function (val, oval) {
        this.swiperKey = getRanNum(10);
        this.initSwiper()
      }
    },
    mounted () {
        this.initSwiper();
    },
    methods: {
        initSwiper () {
            let _this = this;
            let autoplay = false
            let loop = false
            let centered = false
            if (this.userItem.length >= 8) {
                autoplay = {
                    delay: 2500,
                    disableOnInteraction: true,  //触碰后自动切换停止
            　　}
                loop = true
                centered = true
            }
            this.$nextTick(() => {
                this.swiperBox = new Swiper(`.swiper-boxs${this.swiperKey}`,{
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    slidesPerView: 4,
                    spaceBetween: 20,
                    centeredSlides: centered,
                    loop: loop,  //循环
                    loopedSlides: 2,
                    loopAdditionalSlides: 2,
                    loopFillGroupWithBlank: true,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
            　　    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    autoplay: autoplay
                })
                this.swiperBox.el.onmouseover = function(){ //鼠标放上暂停轮播
                    _this.swiperBox.autoplay.stop();
                }
                this.swiperBox.el.onmouseleave = function(){
                    _this.swiperBox.autoplay.start();
                }
                this.swiperBox.slideTo(2);
            })
        },
        viewDetails (row) {
            let ItemType = Number(sessionStorage.getItem('searchIndex') || 0);
            let routeData = this.$router.resolve({
                name: 'DataDetails',
                query: {id: row.ItemId, layout: (ItemType === 6 || ItemType === 7) ? false : true}
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
    .comLogo {
        margin-top: 2px;
        margin-bottom: 2px;
    }
    .slide-ite-new {
        position: absolute;
        color: #ff3c00;
        font-weight: bold;
        left: 50%;
        line-height: 30px;
        transform: translateX(-50%);
    }
    .swiper-boxs {
        height: 200px;
        margin-bottom: 10px;
        overflow: hidden;
        position: relative;
        /deep/.swiper-slide {
            width: 290px;
            height: 200px;
        }
        .swiper-slide-item {
            cursor: pointer;
            width: 290px;
            height: 200px;
            position: relative;
            border-radius: 40px;
            overflow: hidden;
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
        width: 106px;
        text-align: center;
        height: 45px;
        position: relative;
        &:hover &-pos {
            opacity: 1;
            border: 2px solid #ff3c00;
            width: 108px;
            left: -1px;
        }
        &:hover &-side {
            opacity: 0;
        }
        &-pos {
            position: absolute;
            width: 100%;
            opacity: 1;
            margin-top: -1px;
            height: 47px;
            line-height: 47px;
        }
        &-side {
            position: absolute;
            transition: opacity .5s;
            width: 100%;
            margin-top: 1px;
            height: 45px;
            opacity: 1;
            img {
                width: 100%;
                height: 45px;
                background: #FFFFFF;
                position: relative;
                top: -1px;
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
                    border: 1px solid #333;
                    margin: -1px -1px 0 0;
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
                        width: 70px;
                        margin-right: 10px;
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
