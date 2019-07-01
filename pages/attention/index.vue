<template>
    <Scroll :on-reach-bottom="handleReachBottom" height="800">
        <div class="container">
            <div
                class="public-block"
                v-for="item in attentionList"
                :key="item.ItemId"
            >
                <div class="block-head">
                    <div class="block-head-left">
                        <div class="avatar">
                            <img :src="item.HeadIcon" :alt="item.NickName">
                        </div>
                        <div class="info">
                            <p class="name">{{ item.NickName }}</p>
                            <p class="time">{{ item.CreateDate }}</p>
                        </div>
                    </div>
                    <div class="block-head-right">
                        <Dropdown placement="bottom-end" trigger="click">
                            <a href="javascript:void(0)">
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem>帮上头条</DropdownItem>
                                <DropdownItem>投诉</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div class="content">
                    <p v-if="item.TalkType !== 3">{{ item.TalkContent }}</p>
                    <p v-if="item.TalkType === 3" class="ql-editor detail-text" v-html="item.TalkContent"></p>
                    <div class="photo-wrap" v-if="item.TalkType !== 2">
                        <div
                            class="img"
                            v-for="(img, index) in item.Imgs"
                            :key="index"
                        >
                            <img :src="baseUrl + img.smallImgUrl" alt="">
                        </div>
                    </div>
                    <div class="photo-wrap" v-if="item.TalkType === 2">
                        <div
                            class="video"
                            v-for="(video, index) in item.Imgs"
                            :key="index"
                        >
                            <video controls>
                                <source :src="baseUrl + video.videoUrl" type="video/mp4">
                                <source :src="baseUrl + video.videoUrl" type="video/ogg">
                                您的浏览器不支持Video标签。
                            </video>
                        </div>
                    </div>
                </div>
                <div class="block-foot">
                    <div class="foot-child">
                        <i class="icon iconfont">&#xe696;</i>
                        <span>收藏</span>
                    </div>
                    <div class="foot-child">
                        <i class="icon iconfont">&#xe6be;</i>
                        <span>12</span>
                    </div>
                    <div class="foot-child">
                        <i class="icon iconfont">&#xe664;</i>
                        <span>评论</span>
                    </div>
                    <div class="foot-child">
                        <i class="icon iconfont">&#xe67e;</i>
                        <span>点赞</span>
                    </div>
                </div>
            </div>
            <!--            <div class="public-block recommend">-->
            <!--                <div class="recommend-title">-->
            <!--                    <i class="icon iconfont">&#xe60b;</i>-->
            <!--                    <span>推荐</span>-->
            <!--                </div>-->
            <!--                <div class="recommend-list">-->
            <!--                    <div class="recommend-item">-->
            <!--                        <div class="img-wrap"></div>-->
            <!--                        <div class="name">-->
            <!--                            张小杰-->
            <!--                            <div class="hidden-box">-->
            <!--                                <div class="avatar"></div>-->
            <!--                                <p class="user-name">杨小幂</p>-->
            <!--                                <div class="user-data">-->
            <!--                                    <div class="data data-left">-->
            <!--                                        <span class="data-name">项目</span>-->
            <!--                                        <span class="data-value">1334</span>-->
            <!--                                    </div>-->
            <!--                                    <div class="line"></div>-->
            <!--                                    <div class="data data-left">-->
            <!--                                        <span class="data-name">粉丝</span>-->
            <!--                                        <span class="data-value">1.3万</span>-->
            <!--                                    </div>-->
            <!--                                </div>-->
            <!--                                <div class="hidden-btns">-->
            <!--                                    <Button size="small" type="primary">关注</Button>-->
            <!--                                    <Button size="small">私信</Button>-->
            <!--                                </div>-->
            <!--                            </div>-->
            <!--                        </div>-->
            <!--                        <p class="info">一个有态度的设计师，给你精彩</p>-->
            <!--                    </div>-->
            <!--                    <div class="recommend-item">-->
            <!--                        <div class="img-wrap"></div>-->
            <!--                        <div class="name">张小杰</div>-->
            <!--                        <p class="info">一个有态度的设计师，给你精彩</p>-->
            <!--                    </div>-->
            <!--                    <div class="recommend-item">-->
            <!--                        <div class="img-wrap"></div>-->
            <!--                        <div class="name">张小杰</div>-->
            <!--                        <p class="info">一个有态度的设计师，给你精彩</p>-->
            <!--                    </div>-->
            <!--                    <div class="recommend-item">-->
            <!--                        <div class="img-wrap"></div>-->
            <!--                        <div class="name">张小杰</div>-->
            <!--                        <p class="info">一个有态度的设计师，给你精彩</p>-->
            <!--                    </div>-->
            <!--                    <div class="to-pre">-->
            <!--                        <i class="icon iconfont">&#xe62e;</i>-->
            <!--                    </div>-->
            <!--                    <div class="to-next">-->
            <!--                        <i class="icon iconfont">&#xe62e;</i>-->
            <!--                    </div>-->
            <!--                </div>-->
            <!--            </div>-->
        </div>
    </Scroll>
</template>

<script>

  export default {
    layout: 'main',
    middleware: 'authenticated',
    data() {
      return {
        baseUrl: process.env.fileBaseUrl,
        pageNum: 1,
        attentionList: [],
        totle: 0,   // 总页数
      }
    },

    methods: {

      // 获取数据
      async getList() {
        const data = await this.$store.dispatch('getAttentionList', {
          Page: this.pageNum,
          Rows: 10
        });

        this.attentionList = this.attentionList.concat(data.retModels);
        this.totle = data.paginationData.total;
      },

      // 触底事件
      handleReachBottom() {
        if (this.pageNum >= this.totle) {
          this.$Message.info('已经是最后一页了');
          return false;
        }
        this.pageNum++;
        this.getList();
      }
    },

    async asyncData({ store }) {
      const data = await store.dispatch('getAttentionList', {
        Page: 1,
        Rows: 10
      });

      return {
        attentionList: data.retModels,
        totle: data.paginationData.total
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "~assets/css/ModulesStyle/index.less";
</style>
