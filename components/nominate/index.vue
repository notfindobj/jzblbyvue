<template>
<!-- 建筑圈右侧内容 -->
    <div class="nominate">
        <div class="container-right" v-if="UserProAndFans">
            <div class="user-title" @click="goPersonalCenter(userInfo)">
                <div class="user-title-l">
                <img :src="userInfo.HeadIcon" alt="">
                </div>
                <div class="user-title-r">
                <p>{{userInfo.NickName}}</p>
                </div>
            </div>
            <ul class="user-cont">
                <li>
                    <span>项目：</span>
                    <span>{{UserProAndFans.proCount || 0}}</span>
                </li>
                <li>
                    <span>粉丝：</span>
                    <span>{{UserProAndFans.Fans || 0}}</span>
                </li>
            </ul>
        </div>
        <div class="recommend-box" v-if="answers.length > 0 || recommend.length > 0" >
            <div class="recommend" v-if="recommend.length > 0">
                <span class="recommend-title">猜你喜欢</span>
                <span>换一换</span>
            </div>
            <div class="Swiper-nominate">
                <div class="swiper-wrapper">
                    <template v-for="(items, index) in recommend">
                        <div class="swiper-slide" v-if="[1,2,4].includes(items.TypeId)"  :key="index">
                            <nuxt-link v-if="items.TypeId === 2" target="_blank" :to="{name: 'videoDetails-id', params: {id:items.ItemId}}">
                                <img :src="baseUrlRegExp(items.ImgSrc)" alt="">
                            </nuxt-link>
                            <nuxt-link v-else-if="items.TypeId === 4" target="_blank" :to="{name: 'DataDetails', query: {id:items.ItemId, layout: true}}">
                                <img :src="baseUrlRegExp(items.ImgSrc)" alt="">
                            </nuxt-link>
                            <nuxt-link v-else target="_blank" :to="{name: 'pictureDetails-id', params: {id:items.ItemId, }}">
                                <img :src="baseUrlRegExp(items.ImgSrc)" alt="">
                            </nuxt-link>
                        </div>
                    </template>
                </div>
                <div class="swiper-pagination swiper-pagination-bullets"></div>
            </div>
            <div class="recommend" v-if="answers.length > 0">
                <span class="recommend-title">猜你喜欢</span>
                <span>换一换</span>
            </div>
            <ul class="recommend-problem">
                <li v-for="(items, index) in answers" :key="index">
                    <nuxt-link target="_blank" :to="{name: 'QuestionsAndAnswers-id', params: {id:items.ItemId}}">{{items.Title}}</nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
import {getUserProAndFans, getRecommend} from '../../service/clientAPI'
import Swiper from "swiper"
// import 'swiper/dist/css/swiper.min.css'
export default {
    props: {
        valType: {
            type: String,
            default: '1,2,3,4'
        }
    },
    data () {
        return {
            UserProAndFans: null,
            swiperBox: {},
            answers: [],
            recommend: [{}]
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.overas.auth? state.overas.auth: {}
        })
    },
    created () {
        if (this.userInfo.UserId) {
            this.getUserPro(this.userInfo.UserId);
        }
        this.getRecommendList()
    },
    mounted () {
        this.initSwiper();
    },
    methods: {
        initSwiper () {
            let swiper = new Swiper (".Swiper-nominate",{
                direction: 'horizontal',
                loop:true,  //循环
                loopFillGroupWithBlank: true,  
                observer:true,//修改swiper自己或子元素时，自动初始化swiper
            　　 observeParents:true,//修改swiper的父元素时，自动初始化swiper
                //使用分页器
                paginationClickable :true,
                pagination: {
                　　el: '.swiper-pagination',
                    clickable: true,
                    renderBullet(index, className) {
                        return `<span class="${className} swiper-pagination-bullet-custom">${index + 1}</span>`
                    }
                },    
                autoplay: {
                　　disableOnInteraction: false,  //触碰后自动切换停止
            　　}
            })
        },
        baseUrlRegExp (str) {
            let reg = RegExp(/\http:\/\//);
            if(str && str && str.match(reg)){
                return str
            } else {
                return process.env.fileBaseUrl+ str
            }
        },
        // 获取推荐
        async getRecommendList (val) {
            let msg = await getRecommend(this.valType)
            if (msg) {
                let rec = []
                msg.forEach(ele =>{
                    if (ele.TypeId === 3) {
                        this.answers.push(ele)
                    } else {
                        rec.push(ele)
                    }
                })
                this.recommend = rec;
            }
        },
        async getUserPro (id) {
            let msg = await getUserProAndFans(id)
            if (msg) {
                this.UserProAndFans = msg;
            }
        },
        // 点击头像，去个人中心
        goPersonalCenter(item) {
            this.$router.push({
            name: 'HeAndITribal-id',
                query: {
                    id: item.UserId
                }
            })
        },
    },
}
</script>
<style lang="less" scoped>
    .Swiper-nominate {
        width: 330px;
        height: 200px;
        overflow: hidden;
        position: relative;
        img {
            width: 100%;
            height: 200px;
        }
    }
    .recommend-problem {
        padding: 10px;
        font-size: 16px;
        width: 330px;
        background: #fff;
        border-top: 1px solid #f0f0f0;
        li a {
            display: inline-block;
            line-height: 25px;
            &:hover {
                color: #FF3C00;
                text-decoration: underline;
            }
        }
    }
    .recommend {
        background: #fff;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        padding: 10px;
        &-title {
            font-weight: bold;
            cursor: pointer;
        }
    }
    /deep/.swiper-pagination-bullet{
        width: 18px;
        height: 18px;
        color: #fff;
    }
    /deep/.swiper-pagination-bullet-active {
        background: #FF3C00;
    }
    .nominate {
        position: sticky;
        display: inline-block;
        max-height: 800px;
        top: 70px;
    }
    .container-right {
      width: 330px;
      background: #fff;
      margin-top: 10px;
    //   max-height:150px;
      text-align: center;
    }
    .user-title {
        cursor: pointer;
        display: flex;
        padding: 15px 25px 0;
        display: inline-block;
        &-l {
          border-radius: 50%;
          overflow: hidden;
          display: inline-block;
          width: 50px;
          height: 50px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      &-r {
        margin-left: 15px;
        p {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .user-cont {
      padding: 15px 25px;
      display: flex;
      font-size: 16px;
      justify-content: space-around;
      li {
        flex: 1;
        display: flex;
        justify-content: center;
        position: relative;
        &:first-child {
          &::after {
            content: '';
            display: inline-block;
            width: 1px;
            position: absolute;
            right: 0;
            height: 100%;
            background: #d4d6d4;
          }
        }
      }
    }
    
</style>