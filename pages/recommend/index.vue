<template>
    <Scroll :on-reach-bottom="handleReachBottom" height="800">
        <div class="container">

            <image-text
                v-for="(item, index) in recommendContent"
                :key="index"
                :project="item"
                :index="index"
            ></image-text>

            <div class="public-block recommend">
                <div class="recommend-title">
                    <i class="icon iconfont">&#xe60b;</i>
                    <span>推荐</span>
                </div>
                <div class="recommend-list">
                    <div class="recommend-item">
                        <div class="img-wrap"></div>
                        <div class="name">
                            张小杰
                            <div class="hidden-box">
                                <div class="avatar"></div>
                                <p class="user-name">杨小幂</p>
                                <div class="user-data">
                                    <div class="data data-left">
                                        <span class="data-name">项目</span>
                                        <span class="data-value">1334</span>
                                    </div>
                                    <div class="line"></div>
                                    <div class="data data-left">
                                        <span class="data-name">粉丝</span>
                                        <span class="data-value">1.3万</span>
                                    </div>
                                </div>
                                <div class="hidden-btns">
                                    <Button size="small" type="primary">关注</Button>
                                    <Button size="small">私信</Button>
                                </div>
                            </div>
                        </div>
                        <p class="info">一个有态度的设计师，给你精彩</p>
                    </div>
                    <div class="recommend-item">
                        <div class="img-wrap"></div>
                        <div class="name">张小杰</div>
                        <p class="info">一个有态度的设计师，给你精彩</p>
                    </div>
                    <div class="recommend-item">
                        <div class="img-wrap"></div>
                        <div class="name">张小杰</div>
                        <p class="info">一个有态度的设计师，给你精彩</p>
                    </div>
                    <div class="recommend-item">
                        <div class="img-wrap"></div>
                        <div class="name">张小杰</div>
                        <p class="info">一个有态度的设计师，给你精彩</p>
                    </div>
                    <div class="to-pre">
                        <i class="icon iconfont">&#xe62e;</i>
                    </div>
                    <div class="to-next">
                        <i class="icon iconfont">&#xe62e;</i>
                    </div>
                </div>
            </div>
        </div>
    </Scroll>

</template>

<script>
  import ImagesText from '~/components/projectType/ImageAndText'

  export default {
    layout: 'main',
    components: {
      'image-text': ImagesText
    },

    // async asyncData({ app, store, route }) {
    //   let recommendContent = await store.dispatch('getRecommendContent', {
    //     Page: 1,
    //     Rows: 10
    //   });
    //   return {
    //     recommendContent: recommendContent
    //   }
    // },
    data() {
      return {
        recommendContent: [0, 3, 4, 5, 6]
      }
    },
    methods: {
      handleReachBottom() {
        console.log(1222)
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "~assets/css/ModulesStyle/index.less";

</style>
