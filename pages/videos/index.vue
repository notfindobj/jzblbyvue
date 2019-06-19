<template>
    <Scroll :on-reach-bottom="handleReachBottom" height="800">
        <div class="container">
            <div
                class="public-block"
                v-for="item in videoList"
                :key="item.TalkId"
                @click="clickVideo(item)"
            >
                <div class="block-head">
                    <div class="block-head-left">
                        <div class="avatar">
                            <img :src="item.HeadIcon" alt="">
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
                    <p>{{ item.TalkContent }}</p>
                    <div class="video-wrap" v-if="item.Imgs && item.Imgs.length > 0">
                        <div class="photo-wrap">
                            <div class="video">
                                <video controls :poster="item.Imgs[0].smallImgUrl">
                                    <source :src="fileBaseUrl + item.Imgs[0].videoUrl" type="video/mp4">
                                    <source :src="fileBaseUrl + item.Imgs[0].videoUrl" type="video/ogg">
                                    您的浏览器不支持Video标签。
                                </video>
                            </div>
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
        </div>
        <video-modal :isShowModal="isShowModal" :videoInfo="videoInfo" @closeModal="closeVideoModal"/>
    </Scroll>

</template>

<script>
  import VideoModal from '~/components/video/videoModal'

  export default {
    layout: 'main',
    components: {
      'video-modal': VideoModal
    },

    data() {
      return {
        fileBaseUrl: process.env.fileBaseUrl,   // 文件的域名
        pageNum: 1,
        videoList: [],
        nextList: [],    // 下一页数据
        total: 0,   // 总页数
        isShowModal: false, // 是否显示弹框
        videoInfo: {},  // 弹框视频的信息
      }
    },

    methods: {
      // 获取数据
      async getList() {
        const data = await this.$store.dispatch('getTalk', {
          TalkType: 2,
          Page: this.pageNum
        });

        this.nextList = data.retModels;
        this.total = data.paginationData.total

      },

      // 点击视频
      clickVideo(video) {
        this.videoInfo = video;
        this.isShowModal = true;
      },

      // 关闭视频弹框
      closeVideoModal() {
        this.isShowModal = false;
      },

      // 触底事件
      handleReachBottom() {
        this.pageNum++;
        this.getList();
        setTimeout(() => {
          this.videoList = this.videoList.concat(this.nextList);
          this.nextList = [];
        }, 1000)

      }
    },

    mounted() {
      console.log(this.videoList)
      this.pageNum++;
      this.getList();
    },

    async asyncData({ store }) {
      const data = await store.dispatch('getTalk', {
        TalkType: 2,
        Page: 0
      })

      return {
        videoList: data.retModels,
        total: data.paginationData.total
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "~assets/css/ModulesStyle/index.less";
</style>
