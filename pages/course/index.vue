<template>
    <div class="courseBox">
        <div class="course">
            <div class="menuBox">
                <div class="menu-header">
                    <i class="icon iconfont icon-caidanfenlei"></i>
                    <span>全部分类</span>
                </div>
                <div class="menu-contetn" v-for="(items, index) in couseList" :key="index">
                    <div class="menu-contetn-item">
                        <span>{{items.title}}</span>
                        <i class="icon iconfont icon-iconfontyoujiantou"></i>
                    </div>
                    <div class="menu-contetn-panl" >
                        <h4>课程分类</h4>
                        <div class="menu-contetn-panl-sort">
                            <div class="menu-contetn-panl-sort-item" v-for="(item, i) in items.children" :key="i">
                                {{item.title}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="swiper-boxs">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="swiper-slide-item" >
                            <img src="https://img.3d66.com/focus/2020/20200421/6bbdbf43fe480536a7c85adc12b00afa.jpg" alt="">
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="swiper-slide-item" >
                            <img src="https://img.3d66.com/focus/2020/20200425/6a9e750cc17e2e45e1fbd3fba26777d3.png" alt="">
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="swiper-slide-item" >
                            <img src="https://img.3d66.com/focus/2020/20200416/e9f11f8383f22ceeccf48064d5311877.jpg" alt="">
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
                <coursePanl/>
                <coursePanl/>
                <coursePanl/>
                <coursePanl/>
                <coursePanl/>
                <coursePanl/>
                <coursePanl/>
                <coursePanl/>
            </div>
        </div>
    </div>
</template> 
<script>
import Swiper from "swiper"
import coursePanl from "./components/coursePanl"
export default {
    layout: "main",
    components:{
        coursePanl
    },
    data () {
        return {
            couseList: [
            {
                title:"室内设计1",
                id: 1,
                children: [
                    {title: '室内入门'},
                    {title: '3D建模'},
                    {title: '渲染表现'},
                    {title: '动画漫游'},
                ]
            },
            {
                title:"建筑景观",
                id: 1,
                children: [
                    { title: '建筑|景观建模'},
                    { title: '室外渲染表现'},
                    { title: '建筑动画'},
                    { title: '方案规划'},
                    { title: '建筑景观入门'},
                ]
            }
            ]
        }
    },
    mounted () {
        this.initSwiper()
        this.initHotSwiper()
    },
    methods: {
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
    }
}
</script>
<style lang="less" scoped>
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
        &-boby {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
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
    .swiper-hot {
        position: relative;
        overflow: hidden;
        width: 1200px;
        margin: 15px 0;
        &:hover .swiper-button-prev {
            opacity: 1;
            transform: scale(1);
        }
        &:hover .swiper-button-next{
            opacity: 1;
            transform: scale(1);
        }
    }
    .swiper-boxs {
        position: relative;
        overflow: hidden;
        width: 1036px;
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
    