<template>
    <div>
        <div class="banner-box">
            <div v-swiper:mySwiper="swiperOption" class="swiper-box">
                <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(banner, index) in SlideList" :key="index">
                    <img :src="`http://www.jzbl.com${banner.CoverImgUrl}`" alt="" style="width: 100%;height: 100%;">
                </div>
                </div>
                <div class="swiper-pagination swiper-pagination-bullets"></div>
            </div>
            <LevelMenu class="banner-nav" :oneMeun="oneMeun"></LevelMenu>
        </div>
        <div class="main-box">
            <!-- 示范区景观 -->
            <div>
                <div class="main-conment">
                    <div class="main-conment-top"> 
                        <ul class="main-conment-sub">
                            <li>示范区景观</li>
                            <li>新亚洲/</li>
                            <li>（新）古典/</li>
                            <li>现代/</li>
                            <li>英式/</li>
                            <li>地中海</li>
                        </ul>
                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>
                    </div>
                </div>
                <Row>
                   <template v-for=" (items, index) in sfqList" v-if="index < 8">
                         <i-col span="6" :key="index">
                              <Small-Cards @viewItem="viewItem" :smallCardsDate= "items"/>
                         </i-col>
                    </template>
                </Row>
            </div>
            <!-- 楼盘 -->
            <div>
                <div class="main-conment">
                    <div class="main-conment-top">
                        <ul class="main-conment-sub">
                            <li>楼盘</li>
                            <li>新亚洲/</li>
                            <li>（新）古典/</li>
                            <li>现代/</li>
                            <li>英式/</li>
                            <li>地中海</li>
                        </ul>
                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>
                    </div>
                </div>
                <Row>
                    <template v-for="(items, index) in lpList">
                        <template v-if="index === 0">
                            <i-col span="12" :key="index">
                                <Big-Cards :bigCardsDate= "items"/>
                            </i-col>
                        </template>
                        <i-col span="6" v-if="index >0 && index<5" :key="index">
                            <Small-Cards :smallCardsDate= "items"/>
                        </i-col>
                    </template>
                </Row>
            </div>
            <!-- 效果图 -->
            <div>
                <div class="main-conment">
                    <div class="main-conment-top">
                        <ul class="main-conment-sub">
                            <li>效果图</li>
                            <li>新亚洲/</li>
                            <li>（新）古典/</li>
                            <li>现代/</li>
                            <li>英式/</li>
                            <li>地中海</li>
                        </ul>
                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>
                    </div>
                </div>
                <Row>
                    <i-col  span="12" >
                        <template v-for="(items, lp) in lpList"  >
                            <Small-Cards v-if="lp < 4" :smallCardsDate= "items" :key="lp"/>
                        </template>
                    </i-col>
                    <i-col span="12" v-for="(items, lp) in lpList" v-if="lp === 4" :key="lp">
                        <Big-Cards :bigCardsDate= "items"/>
                    </i-col>
                </Row>
            </div>
             <!-- SU模型 -->
            <div>
                <div class="main-conment">
                    <div class="main-conment-top">
                        <ul class="main-conment-sub">
                            <li>SU模型</li>
                            <li>新亚洲/</li>
                            <li>（新）古典/</li>
                            <li>现代/</li>
                            <li>英式/</li>
                            <li>地中海</li>
                        </ul>
                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>
                    </div>
                </div>
                <Row>
                    <template v-for="(items, index) in suList">
                        <template v-if="index === 0">
                            <i-col span="12" :key="index">
                                <Big-Cards :bigCardsDate= "items"/>
                            </i-col>
                        </template>
                        <i-col span="6" v-if="index >0 && index<5" :key="index">
                            <Small-Cards :smallCardsDate= "items"/>
                        </i-col>
                    </template>
                </Row>
            </div>
             <!-- 总图 -->
            <div>
                <div class="main-conment">
                    <div class="main-conment-top">
                        <ul class="main-conment-sub">
                            <li>总图</li>
                            <li>新亚洲/</li>
                            <li>（新）古典/</li>
                            <li>现代/</li>
                            <li>英式/</li>
                            <li>地中海</li>
                        </ul>
                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>
                    </div>
                </div>
                <Row>
                    <i-col  span="12" >
                        <template v-for="(items, lp) in ztList"  >
                            <Small-Cards v-if="lp < 4" :smallCardsDate= "items" :key="lp"/>
                        </template>
                    </i-col>
                    <i-col span="12" v-for="(items, lp) in lpList" v-if="lp === 4" :key="lp">
                        <Big-Cards :bigCardsDate= "items"/>
                    </i-col>
                </Row>
            </div>
             <!-- 平面 -->
            <div>
                <div class="main-conment">
                    <div class="main-conment-top">
                        <ul class="main-conment-sub">
                            <li>平面</li>
                            <li>新亚洲/</li>
                            <li>（新）古典/</li>
                            <li>现代/</li>
                            <li>英式/</li>
                            <li>地中海</li>
                        </ul>
                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>
                    </div>
                </div>
                <Row>
                    <template v-for="(items, index) in pmList">
                        <template v-if="index === 0">
                            <i-col span="12" :key="index">
                                <Big-Cards :bigCardsDate= "items"/>
                            </i-col>
                        </template>
                        <i-col span="6" v-if="index >0 && index<5" :key="index">
                            <Small-Cards :smallCardsDate= "items"/>
                        </i-col>
                    </template>
                </Row>
            </div>
            <!-- 文本 -->
            <div>
                <div class="main-conment">
                    <div class="main-conment-top">
                        <ul class="main-conment-sub">
                            <li>文本</li>
                        </ul>
                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>
                    </div>
                </div>
                <Row>
                    <Col span="8" v-for="i in 3" :key="i">
                        <div class="text-box">
                            <div class="text-box-img">
                                <img src="../assets/images/smail.png" alt="">
                            </div>
                            <div class="text-box-content">
                                <div class="text-box-content-had">
                                    <span class="text-box-content-had-img"></span>
                                </div>
                                <div class="text-box-content-name">包贝尔</div>
                                <div class="text-box-content-sub-cpntent">
                                    项目是日本服装品牌 Christian Dada 在台北的旗舰店，也是该品牌在海外的第二家专卖
                                    项目是日本服装品牌 Christian Dada 在台北的旗舰店，也是该品牌在海外的第二家专卖店…
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <!-- 建筑游学 -->
            <div>
                <div class="main-conment">
                    <div class="main-conment-top">
                        <ul class="main-conment-sub">
                            <li>建筑游学</li>
                            <li>新亚洲/</li>
                            <li>（新）古典/</li>
                            <li>现代/</li>
                            <li>英式/</li>
                            <li>地中海</li>
                        </ul>
                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>
                    </div>
                </div>
                <Row>
                    <i-col span="12"> <Big-Cards/> </i-col>
                    <i-col span="12">
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                    </i-col>
                </Row>
            </div>
            <!-- 优秀设计师 -->
            <div>
                <div class="main-conment">
                    <div class="main-conment-top">
                        <ul class="main-conment-sub">
                            <li>优秀设计师</li>
                        </ul>
                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>
                    </div>
                </div>
                <Row>
                    <i-col span="24">
                        <div id="excellent">
                            <div v-swiper:mySwipers="excellent">
                                <div class="swiper-wrapper excellent">
                                    <div class="swiper-slide excellent-slide" v-for="(banner, index) in banners" :key="index">
                                        <div class="excellent-slide-title">
                                            <img src="../assets/images/smail.png" alt="">
                                        </div>
                                        <div class="excellent-slide-content">
                                            <div class="excellent-slide-content-name">张小杰</div>
                                            <div class="excellent-slide-content-subdel">一个有态度的设计师，给你精彩</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-pagination swiper-pagination-bullets"></div>
                            </div>
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                        </div>
                    </i-col>
                </Row>
            </div>
            <!-- 优秀品牌商 -->
            <div>
                <div class="main-conment">
                    <div class="main-conment-top">
                        <ul class="main-conment-sub">
                            <li>优秀品牌商</li>
                        </ul>
                        <div class="main-conment-more">查看更多 <i class="iconfont icon-jiantou jiantou-clolr"></i></div>
                    </div>
                </div>
                <div>
                    <div v-for="i in 12" :key="'2'+i " class="matrix">
                        <div class="matrix-img">
                            <img src="../assets/images/matrix.png" alt="">
                        </div>
                        <div class="matrix-text">matrix</div>
                    </div>
                </div>
            </div>
        </div>
        <ul>
            <li id="dad"><nuxt-link to="/DataDetails">资源库</nuxt-link></li>
        </ul>
    </div>
</template>
<script>
import LevelMenu from '../components/home/LevelMenu'
export default {
data () {
    return {
        banners: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png'
        ],
        swiperOption: {
            loop: true,
            autoplay:true,
            slidesPerView: 'auto',
            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true
            },
            on: {
                slideChange() {
                    // console.log('onSlideChangeEnd', this);
                },
                tap() {
                    // console.log('onTap', this);
                }
            }
        },
        excellent: {
            slidesPerView : 4,
            slidesPerGroup : 1,
            pagination: {
                // el: '.swiper-pagination',
                dynamicBullets: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        },
    }
},
components: {
    LevelMenu
},
computed: {},
watch: {},
async asyncData ({app, store}) {
    let menuData = await store.dispatch('getMenu');
    let homeData = await store.dispatch('getHomeData');
    return {
        oneMeun: menuData.RetMenuData || [],
        homeData: homeData,
        SlideList: homeData.SlideList,
        sfqList: homeData.ItemList.Sfq.RecommendedItemModels || [], // 示范区
        lpList: homeData.ItemList.Lp.RecommendedItemModels || [], // 楼盘
        xgtList: homeData.ItemList.Xgt.RecommendedItemModels || [], // 效果图
        suList: homeData.ItemList.Sumx.RecommendedItemModels || [], // SU模型
        ztList: homeData.ItemList.Zt.RecommendedItemModels || [], // 总图
        pmList: homeData.ItemList.Pm.RecommendedItemModels || [], // 平面
        wbList: homeData.ItemList.Wb.RecommendedItemModels || [], // 文本
        jzList: homeData.ItemList.Jzgf.RecommendedItemModels || [], // 建筑规范
        snList: homeData.ItemList.Snal.RecommendedItemModels || [], // 室内案例

    }
},
beforeCreate () {},
created () {},
methods: {
    viewItem (item) {
        debugger
        let baseDateId ={
            // ClassTypeId: `${pre.ItemSubAttributeCode}|${pre.ItemAttributesId}`,
            // ClassTypeArrList: [
            //     {
            //         ArrId: '',
            //         ArrEnCode:''
            //     }
            // ],
            // SortType: 0,
            // KeyWords: "",
            // Order: true,
            // Page: 0,
            // Rows: 8
        }
    }
}
}
</script>
<style lang="less">
    .swiper-pagination-bullet-active {
        background: #FF3C00;
    }
    .ivu-col-span-12 {
        text-align: center;
    }
    .ivu-col-span-8 {
        text-align: center;
    }
    .banner-box {
        position: relative;
        width: 1200px;
        margin: 0 auto;
    }
    .swiper-box {
        height: 374px;
    }
    .nav-atvite {
        background: #FF3C00;
    }
    .main-conment {
        margin-top: 50px;
        border-top: 1px solid #999999;
        &-top {
            display: flex;
            justify-content: space-between;
            padding: 3px 0;
        }
        &-sub {
            display: flex;
            >li {
                padding: 0 8px 0 0;
                line-height: 42px;
                color: #333333;
                &:first-child{
                    padding-right: 10px;
                    font-size: 30px;
                }
            }
        }
        &-more {
            line-height: 42px;
            cursor: pointer;
        }
    }
    .jiantou-clolr {
        color: #FF3C00;
    }
    .text-box {
        width: 384px;
        display: inline-block;
        height: 394px;
        &-img {
            height: 266px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        &-content {
            width: 100%;
            height: 128px;
            &-had {
                position: relative;
                height: 35px;
                &-img {
                    display: inline-block;
                    position: absolute;
                    left: 50%;
                    top: -30px;
                    transform: translateX(-50%);
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: #FF0;
                }
                // height: 60px;
            }
            &-name {
                text-align: center;
                font-size: 18px;
                color: #333333;
            }
            &-sub-cpntent {
                padding: 5px 15px;
                font-size: 14px;
                color: #666666;
                height: 45px;
                overflow:hidden; //超出的文本隐藏
                text-overflow:ellipsis; //溢出用省略号显示
                line-clamp: 2;
            }
        }
        &:hover {
            box-shadow: 0 2px 15px #999999;
        }
    }
    .excellent-slide {
        width: 282px;
        height: 383px;
        text-align: center;
        &-title {
            width: 282px;
            height: 300px;
            display: inline-block;
            > img {
                width: 100%;
                height: 300px;
            }
        }
        &-content {
            text-align: left;
            padding: 10px 15px;
            line-height: 30px;
            &-name {
                font-size: 18px;
                color: #333333;
            }
            &-subdel {
                font-size: 14px;
                color: #666666;
            }
        }
        &:hover {
            box-shadow: 0 2px 15px #999999;
        }
    }
    //
    #excellent .swiper-button-prev{
        top: 145px;
        background:url(../assets/images/left.png) center center no-repeat;
        background-size: 48px 141px;
    }
    #excellent .swiper-button-next{
        top: 145px;
        background:url(../assets/images/right.png) center center no-repeat;
        background-size: 48px 141px;
    }
    .matrix {
        width: 191px;
        height: 70px;
        margin-top: 10px;
        display: inline-block;
        line-height: 70px;
        text-align: center;
        font-size: 24px;
        color: #FF3C00;
        letter-spacing: 0.8px;
        margin-right: 10px;
        cursor: pointer;
        text-align: center;
        &:nth-child(6n) {
            margin-right: 0;
        }
        .matrix-img {
            width: 191px;
            height: 70px;
            display: inline-block;
            > img {
                vertical-align: middle;
            }
        }
        .matrix-text {
            box-sizing: content-box;
            width: 100%;
            height: 100%;
            border: 1px solid #FF3C00;
            display: none;
        }
        &:hover .matrix-img{
            display: none;
        }
        &:hover .matrix-text{
            display: inline-block;
        }
    }
</style>
