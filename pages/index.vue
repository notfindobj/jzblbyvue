<template>
    <div>
        <!-- banner -->
        <div class="banner-box">
            <div v-swiper:mySwiper="swiperOption" class="swiper-box">
                <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(banner, index) in banners" :key="index">
                    <img :src="banner" alt="">
                </div>
                </div>
                <div class="swiper-pagination swiper-pagination-bullets"></div>
            </div>
            <ul class="banner-nav" >
                <!-- nav-atvite -->
                <li class="" v-for="(items, index) in oneMeun" @mouseenter="enter(index)" @mouseleave="leave" :key="index">
                   <i :class="`iconfont ${items.icon}`"></i>
                    <span>{{items.name}}</span>
                </li>
            </ul>
            <div v-for="(sub, subs) in oneMeun" :key="subs" class="banner-nav-items" v-show="isOneMeun === subs">{{sub.name}}</div>
        </div>
        <div class="main-box">
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
                    <!-- <i-col span="12"> <Big-Cards/> </i-col> -->
                    <i-col span="24">
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                    </i-col>
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
                    <i-col span="12"> <Big-Cards/> </i-col>
                    <i-col span="12">
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                    </i-col>
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
                    <i-col span="12">
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                    </i-col>
                     <i-col span="12"> <Big-Cards/> </i-col>
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
                    <i-col span="12"> <Big-Cards/> </i-col>
                    <i-col span="12">
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                    </i-col>
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
                    <i-col span="12">
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                    </i-col>
                     <i-col span="12"> <Big-Cards/> </i-col>
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
                    <i-col span="12"> <Big-Cards/> </i-col>
                    <i-col span="12">
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                        <Small-Cards/>
                    </i-col>
                </Row>
            </div>
        </div>
        <ul>
            <li class="a" @click="showLogin">登录</li>
            <li><nuxt-link to="/About">关于我们</nuxt-link></li>
        </ul>
      <sign-in-and-out v-if="showSign"></sign-in-and-out>
    </div>
</template>
<script>
  import SignInAndOut from '../components/SignInAndOut'
  export default {
      data () {
          return {
              banners: [
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
              isOneMeun: null,
              // 一级菜单
              oneMeun: [
                  {icon: 'icon-erweima', name: '示范区'},
                  {icon: 'icon-erweima', name: '楼盘'},
                  {icon: 'icon-erweima', name: '效果图'},
                  {icon: 'icon-erweima', name: 'su模型'},
                  {icon: 'icon-erweima', name: '总图'},
                  {icon: 'icon-erweima', name: '平面'},
                  {icon: 'icon-erweima', name: '建筑部落'},
                  {icon: 'icon-erweima', name: '室内设计'},
                  {icon: 'icon-erweima', name: '文本'},
              ],
            showSign:false
          }
      },
      components: {
        SignInAndOut
      },
      async asyncData (conment) {
          let data = await conment.app.$axios('apiMenu/GetType').then(res => {console.log('>>>>>>>', res)})
      },
      beforeCreate () {},
      created () {
          this.getData()
      },
      methods: {
            enter (index) {
                this.isOneMeun = index
            },
            leave () {

            },
            showLogin() {
                this.showSign = true
            },
            getData () {
                this.$axios('Menu/GetAll').then(res => {console.log('>>>>>>>', res)})
            }
      }
  }
</script>
<style lang="scss" scope>
    .banner-box {
        position: relative;
        width: 1200px;
        margin: 0 auto;
    }
    .swiper-box {
        height: 374px;
    }
    .banner-nav {
        position: absolute;
        z-index: 9;
        font-size: 14px;
        top: 0px;
        color: #ffffff;
        background: rgba(0,0,0, .6);
        height: 100%;
        > li {
            width: 142.56px;
            line-height: 40px;
            padding-left: 20px;
            cursor: pointer;
        }
        li:first-child {
            margin-top: 4px;
        }
    }
    .banner-nav-items {
        z-index: 9;
        position: absolute;
        width: 595px;
        min-height: 260px;
        top: 4px;
        left: 142.56px;
        background: #ffffff;
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
</style>
