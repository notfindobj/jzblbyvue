<template>
<!-- 建筑圈右侧内容 -->
    <div class="nominate">
        <div class="container-right">
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
        <div>
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
    </div>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
import {getUserProAndFans, getRecommend} from '../../service/clientAPI'
export default {
    data () {
        return {
            UserProAndFans: {},
            userItem: [],
            swiperOption: {
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
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
        ...mapState({
            userInfo: state => state.overas.auth? state.overas.auth: {}
        })
    },
    created () {
      this.getUserPro(this.userInfo.UserId)
    //   this.getRecommendList()
    },
    methods: {
        async getRecommendList () {
            let msg = await getRecommend("1,2,3,4")
            if (msg) {
                this.userItem = msg;
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