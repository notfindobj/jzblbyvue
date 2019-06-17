<template>
    <Scroll :on-reach-bottom="handleReachBottom" height="800">
        <div class="container">
            <video-item
                v-for="(item, index) in videoList"
                :key="item.TalkId"
                :videoInfo="item"
                :index="index"
                @clickVideo="clickVideo(item, index)"
                @clickCollection="clickCollection"
                @clickLike="clickLike"
            ></video-item>
<!--            <div-->
<!--                class="public-block"-->
<!--                v-for="(item, index) in videoList"-->
<!--                :key="item.TalkId"-->
<!--                @click="clickVideo(item, index)"-->
<!--            >-->
<!--                <div class="block-head">-->
<!--                    <div class="block-head-left">-->
<!--                        <div class="avatar">-->
<!--                            <img :src="item.HeadIcon" alt="">-->
<!--                        </div>-->
<!--                        <div class="info">-->
<!--                            <p class="name">{{ item.NickName }}</p>-->
<!--                            <p class="time">{{ item.CreateDate }}</p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="block-head-right">-->
<!--                        <Dropdown placement="bottom-end" trigger="click">-->
<!--                            <a href="javascript:void(0)">-->
<!--                                <Icon type="ios-arrow-down"></Icon>-->
<!--                            </a>-->
<!--                            <DropdownMenu slot="list">-->
<!--                                <DropdownItem>帮上头条</DropdownItem>-->
<!--                                <DropdownItem>投诉</DropdownItem>-->
<!--                            </DropdownMenu>-->
<!--                        </Dropdown>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="content">-->
<!--                    <p>{{ item.TalkContent }}</p>-->
<!--                    <div class="video-wrap" v-if="item.Imgs.length > 0">-->
<!--                        <div class="photo-wrap">-->
<!--                            <div class="video" @click.stop="">-->
<!--                                <video controls :poster="item.Imgs[0].smallImgUrl">-->
<!--                                    <source :src="fileBaseUrl + item.Imgs[0].videoUrl" type="video/mp4">-->
<!--                                    <source :src="fileBaseUrl + item.Imgs[0].videoUrl" type="video/ogg">-->
<!--                                    您的浏览器不支持Video标签。-->
<!--                                </video>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="block-foot" @click.stop="">-->
<!--                    <div class="foot-child">-->
<!--                        <i-->
<!--                            class="icon iconfont"-->
<!--                            v-show="!item.itemOperateData.IsCollection"-->
<!--                            @click="clickCollection(index, true)"-->
<!--                        >&#xe696;</i>-->
<!--                        <i class="icon iconfont"-->
<!--                           style="color: #ff3c00; font-size: 17px;"-->
<!--                           v-show="item.itemOperateData.IsCollection"-->
<!--                           @click="clickCollection(index, false)"-->
<!--                        >&#xe69d;</i>-->
<!--                        <span :class="{ active: item.itemOperateData.IsCollection }">收藏</span>-->
<!--                    </div>-->
<!--                    <div class="foot-child">-->
<!--                        <i class="icon iconfont">&#xe6be;</i>-->
<!--                        <span>{{ item.itemOperateData.ShareCount }}</span>-->
<!--                    </div>-->
<!--                    <div class="foot-child">-->
<!--                        <i class="icon iconfont">&#xe664;</i>-->
<!--                        <span>评论</span>-->
<!--                    </div>-->
<!--                    <div class="foot-child">-->
<!--                        <i-->
<!--                            class="icon iconfont"-->
<!--                            v-show="!item.itemOperateData.IsLike"-->
<!--                            @click="clickLike(index, true)"-->
<!--                        >&#xe67e;</i>-->
<!--                        <i-->
<!--                            class="icon iconfont"-->
<!--                            style="color: #ff3c00;"-->
<!--                            v-show="item.itemOperateData.IsLike"-->
<!--                            @click="clickLike(index, false)"-->
<!--                        >&#xe621;</i>-->
<!--                        <span :class="{ active: item.itemOperateData.IsLike }">点赞</span>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
        </div>
        <video-modal
            :isShowModal="isShowModal"
            :videoInfo="videoInfo"
            @closeModal="closeVideoModal"
            @likeSuccess="likeSuccess"
            @collectionSuccess="collectionSuccess"
        />
    </Scroll>

</template>

<script>
  import VideoModal from '~/components/video/videoModal'
  import VideoItem from '~/components/projectType/video'
  import { setComments, setthumbsUp, setCollection, setFollow } from '../../service/clientAPI'

  export default {
    layout: 'main',
    components: {
      'video-modal': VideoModal,
      'video-item': VideoItem
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
        watchIndex: '', // 当前视频的index
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
      clickVideo(video, index) {
        this.videoInfo = video;
        this.watchIndex = index;
        this.isShowModal = true;
      },

      // 关闭视频弹框
      closeVideoModal() {
        this.isShowModal = false;
      },

      // 弹出框点赞成功
      likeSuccess(flag) {
        this.clickLike(this.watchIndex, flag);
      },

      // 收藏
      collectionSuccess(flag) {
        this.clickCollection(this.watchIndex, flag);
      },

      // 点击点赞
      clickLike(index, flag) {
        setthumbsUp({
          ItemId: this.videoList[index].ItemId,
          LikeType: 1,
          CommentsId: '',
          IsDelete: flag ? 0 : 1
        }).then(() => {
          let videoInfo = JSON.parse(JSON.stringify(this.videoList[index]));
          videoInfo.itemOperateData.IsLike = flag;
          flag ? videoInfo.itemOperateData.LikeCount += 1 : videoInfo.itemOperateData.LikeCount -= 1;
          this.$set(this.videoList, index, videoInfo);

          // 如果是点击的弹框中的，就更新videoInfo
          if (this.isShowModal) {
            this.$set(this.videoInfo, 'itemOperateData', videoInfo.itemOperateData)
          }
        })
      },

      // 点击收藏
      clickCollection(index, flag) {
        setCollection({
          ItemId: this.videoList[index].ItemId,
          ItemName: this.videoList[index].TalkTitle,
          ItemTitleImg: '',
          IsDelete: flag ? 0 : 1,
          TalkType: 2
        }).then(() => {
          let videoInfo = JSON.parse(JSON.stringify(this.videoList[index]));
          videoInfo.itemOperateData.IsCollection = flag;
          flag ? videoInfo.itemOperateData.CollectionCount += 1 : videoInfo.itemOperateData.CollectionCount -= 1;
          this.$set(this.videoList, index, videoInfo);

          // 如果是点击的弹框中的，就更新videoInfo
          if (this.isShowModal) {
            this.$set(this.videoInfo, 'itemOperateData', videoInfo.itemOperateData)
          }
        })
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
