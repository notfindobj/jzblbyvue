<template>
    <div class="courseBox">
        <div class="course">
            <div class="menuBox">
                <div class="menu-header">
                    <i class="icon iconfont icon-caidanfenlei"></i>
                    <span>全部分类</span>
                </div>
                <div class="menu-contetn" v-for="(items, index) in couseList" :key="index">
                    <nuxt-link :to="`/all_course?f=${items.typeId}`">
                        <div class="menu-contetn-item">
                            <span>{{items.typename}}</span>
                            <i class="icon iconfont icon-iconfontyoujiantou"></i>
                        </div>
                    </nuxt-link>
                    <div class="menu-contetn-panl" >
                        <h4>课程分类</h4>
                        <div class="menu-contetn-panl-sort">
                            <nuxt-link :to="`/all_course?f=${items.typeId}&c=${item.ID}`" v-for="(item, i) in items.typelist" :key="i">
                                <div class="menu-contetn-panl-sort-item" >
                                    {{item.Name}}
                                </div>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-boxs">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item, index) in slidList" :key="index">
                        <div class="swiper-slide-item">
                            <img :src="item.CoverImgUrl" :alt="item.ItemName">
                        </div>
                    </div>
                </div>
                <div class="swiper-pagination"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        </div>
        <ul class="four-textImgs-wrap">
            <li>
                <img src="https://img.3d66.com/focus/2019/20191122/944481a102f498dae99dc166b884f907.png" alt="">
            </li>
            <li>
                <img src="https://img.3d66.com/focus/2020/20200313/322fc060f377d80a99c8c4a6a0bd5ab1.png" alt="">
            </li>
            <li>
                <img src="https://img.3d66.com/focus/2019/20191122/28d49392fe06b3e4d1b9cfc71e801517.png" alt="">
            </li>
            <li>
                <img src="https://img.3d66.com/focus/2019/20191122/1af8257f410033463a7d3beb302c734b.png" alt="">
            </li>
        </ul>
        <div class="courseitem">
            <div class="courseitem-tit">
                <h3>每周限时特惠</h3>
                <span>2020.5.8 16:30恢复原价</span>
            </div>
            <div class="swiper-hot">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="swiper-slide-item" >
                            <img src="https://img.3d66.com/focus/2020/20200430/e6027b4130fdfdcb3a9993e1cf62a9f0.jpg" alt="">
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="swiper-slide-item" >
                            <img src="https://img.3d66.com/focus/2020/20200430/e6027b4130fdfdcb3a9993e1cf62a9f0.jpg" alt="">
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="swiper-slide-item" >
                            <img src="https://img.3d66.com/focus/2020/20200430/e6027b4130fdfdcb3a9993e1cf62a9f0.jpg" alt="">
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="swiper-slide-item" >
                            <img src="https://img.3d66.com/focus/2020/20200430/e6027b4130fdfdcb3a9993e1cf62a9f0.jpg" alt="">
                        </div>
                    </div>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
        </div>
        <div class="courseitem">
            <div class="courseitem-tit">
                <h3>最新课程</h3>
                <span>每日更新30+节课</span>
            </div>
            <div class="courseitem-boby">
                <template v-for="(items, index) in latestCourses" >
                    <coursePanl :key="index" :coursePanl="items"/>
                </template>
            </div>
        </div>
        <div class="header-txt">
            <h3>以下根据你的学习兴趣推荐</h3>
            <span @click="isPanel = true">更换意向></span>
        </div>
        <template v-for="(items, index) in quoteCourses">
            <div class="courseitem" :key="index">
                <div class="courseitem-tit">
                    <h3>{{items.TypeName}}</h3>
                    <span>共{{items.CourseCount}}节课</span>
                </div>
                <div class="courseitem-boby">
                    <courseWrap :courseWrap="items"/>
                    <template v-for="(item, inx) in items.CourseLists">
                        <coursePanl :key="inx" :coursePanl="item"/>
                    </template>
                </div>
            </div>
        </template>
        <div class="courseitem">
            <div class="courseitem-tit">
                <h3>实力讲师</h3>
                <span>丰富实战经验的实力讲师，为您传授全面设计方法</span>
            </div>
            <div class="lecturer">
                <div class="swiper-wrapper">
                    <template v-for="(item, index) in lecturerList">
                        <div class="swiper-slide" :key="index">
                            <div class="swiper-slide-item" >
                                <img :src="item.HeadIcon" alt="">
                            </div>
                        </div>
                    </template>
                </div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
            </div>
            <div >
            </div>
        </div>
        <interestPanel v-if="isPanel" @closeModal="closeModal" :field="couseList" />
    </div>
</template> 
<script>
import Swiper from "swiper"
import coursePanl from "./components/coursePanl"
import courseWrap from "./components/courseWrap"
import interestPanel from "./components/interestPanel"
import {getHomeCourseType, getCourseList, getHomeSelectCourse} from "../../service/course"
export default {
    layout: "course",
    head: {
        title: '建筑学院',
    },
    components:{
        coursePanl,
        courseWrap,
        interestPanel
    },
    data () {
        return {
            isPanel: false,
            couseList: [],
            latestCourses: [],
            quoteCourses: [],
        }
    },
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        let msg = await store.dispatch('getSlid');
        let list = await store.dispatch('getHomeCourseType');
        let lect = await store.dispatch('GetLecturerList');
        return {
            slidList: msg,
            couseList: list,
            lecturerList: lect
        }
    },
    created () {
        this.getNewCourse()
    },
    mounted () {
        this.closeModal()
        this.initSwiper()
        this.initHotSwiper()
        this.initlecturer()
    },
    methods: {
        closeModal() {
            if (!localStorage.getItem("field")) {
                this.isPanel = true
                return false
            }
            let q ={
                typeIds: localStorage.getItem("field"),
            }
            getHomeSelectCourse(q).then(res => {
                if (res) {
                    this.quoteCourses = res.RecommendDatas;
                    this.isPanel = false
                }
            }).catch(err => {})
        },
        // 最新课程
        getNewCourse () {
            let that = this;
            let q = {
                parentId: '',
                typeId: '',
                sort: 2,
                level: -1,
                page: 1,
                rows: 8
            }
            getCourseList(q).then(res => {
                if (res) {
                    that.latestCourses = res.courseList
                }
            }).catch(err =>{})
        },
        initSwiper () {
            let _this = this
            this.$nextTick(() => {
                this.swiperBox = new Swiper(`.swiper-boxs`,{
                    pagination: {
                        el:'.swiper-pagination',
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    loop: true,  //循环
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
            　　    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: true,  //触碰后自动切换停止
                　　}
                })
                this.swiperBox.el.onmouseover = function(){ //鼠标放上暂停轮播
                    _this.swiperBox.autoplay.stop();
                }
                this.swiperBox.el.onmouseleave = function(){
                    _this.swiperBox.autoplay.start();
                }
            })
        },
        initHotSwiper () {
            let _this = this
            this.$nextTick(() => {
                this.swiperBox = new Swiper(`.swiper-hot`,{
                    slidesPerView: 4,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    loop: true,  //循环
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
            　　    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: true,  //触碰后自动切换停止
                　　}
                })
                this.swiperBox.el.onmouseover = function(){ //鼠标放上暂停轮播
                    _this.swiperBox.autoplay.stop();
                }
                this.swiperBox.el.onmouseleave = function(){
                    _this.swiperBox.autoplay.start();
                }
            })
        },
        initlecturer () {
            let _this = this
            this.$nextTick(() => {
                this.swiperBox = new Swiper(`.lecturer`,{
                    slidesPerView: 5,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    loop: true,  //循环  
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
            　　    observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: true,  //触碰后自动切换停止
                　　}
                })
                this.swiperBox.el.onmouseover = function(e){ //鼠标放上暂停轮播
                    console.log(e)
                    _this.swiperBox.autoplay.stop();
                }
                this.swiperBox.el.onmouseleave = function(){
                    _this.swiperBox.autoplay.start();
                }
            })
        },
    }
}
</script>
<style lang="less" scoped>
    .header-txt {
        margin: 5px 0 15px;
        display: inline-flex;
        align-items: flex-end;
        h3 {
            font-size: 22px;
            color: #333;
            margin-right: 20px;
            font-weight: 400;
        }
        span {
            font-size: 14px;
            cursor: pointer;
            color: #1abc9c;
        }
    }
    /**Hot
     */
    .four-textImgs-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top:15px;
        margin-bottom: 45px;
        li {
            img {
                width: 280px;
            }
        }
    }
    .courseitem {
        margin-bottom: 20px;
        &-boby {
            display: flex;
            flex-wrap: wrap;
            >div   {
                margin-right: 26.6px;
                &:nth-child(4n) {
                    margin-right: 0;
                }
            }
        }
        &-tit {
            display: flex;
            align-items: baseline;
            h3 {
                font-size: 22px;
                color: #333;
                margin-right: 20px;
            }
            span {
                font-size: 14px;
                color: #999;
            }
        }
    }
    /**导航
     */
    .lecturer {
        position: relative;
        overflow: hidden;
        width: 1200px;
        margin: 15px 0;
        .swiper-slide-item {
            height: 280px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .swiper-hot {
        position: relative;
        overflow: hidden;
        width: 1200px;
        margin: 15px 0;
    }
    .swiper-boxs {
        position: relative;
        overflow: hidden;
        width: 1036px;
    }
    .lecturer,.swiper-hot,.swiper-boxs {
        &:hover .swiper-button-prev {
            opacity: 1;
            transform: scale(1);
        }
        &:hover .swiper-button-next{
            opacity: 1;
            transform: scale(1);
        }
    }
    .swiper-button-prev, .swiper-button-next {
        width: 45px;
        height: 45px;
        opacity: 0;
        transform: scale(.1);
        transform-origin: 50% 50%;
        transition: opacity,transform .5s;
        &::after{
            content: ""
        }
    }
    .swiper-button-prev {
        background: url(../../assets/images/sprites.png) -87px -10px;
    }
    .swiper-button-next {
        background: url(../../assets/images/arrow-next.png) no-repeat 50%;
    }
    /deep/.swiper-pagination-bullet {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: transparent;
        opacity: 1;
        border: 1px solid #b3b3bb;
        -webkit-transition: all .2s;
        transition: all .2s;
    }
    /deep/.swiper-pagination-bullet-active {
        border-color: #778;
        background-color: #778;
    }
    .courseBox {
        width: 1200px;
        margin: 0 auto;
        font-size: 14px;
    }
    .course {
        width: 1200px;
        margin: 0 auto;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
    }
    .menuBox{
        position: relative;
        z-index: 2;
        width: 164px;
        height: 400px;
        background-color: #2b333b;
        padding-top: 20px;
        padding-left: 17px;
        box-sizing: border-box;
        border-radius: 4px 0 0 4px;
    }
    .menu{
        &-header {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            padding-left: 20px;
            margin-bottom: 14px;
        }
        &-contetn {
            &-item {
                position: relative;
                display: flex;
                font-size: 14px;
                height: 42px;
                color: hsla(0,0%,100%,.6);
                line-height: 42px;
                padding-left: 20px;
                padding-right: 10px;
                transition: background-color .3s;
                cursor: pointer;
                justify-content: space-between;
                &:hover{
                    color: #fff;
                    border-radius: 4px 0 0 4px;
                    background-color: hsla(0,0%,100%,.3);
                }
            }
            &-panl{
                display: none;
                background: #fff;
                position: absolute;
                left: 164px;
                top: 0;
                width: 740px;
                height: 400px;
                z-index: 999;
                box-shadow: 0 1px 10px 0 rgba(181,181,182,.6);
                box-sizing: border-box;
                border-radius: 0 4px 4px 0;
                padding: 20px 30px;
                &-sort {
                    &-item {
                        margin-bottom: 4px;
                        font-size: 14px;
                        line-height: 22px;
                        margin-right: 24px;
                        cursor: pointer;
                        display: inline-block;
                    }
                }
            }
            &:hover &-panl {
                display: inline-block;
            }
        }
    }
    .hide {
        display: none;
    }
</style>
    