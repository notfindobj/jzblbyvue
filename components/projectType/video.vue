<template>
    <div class="public-block" @click="clickVideo">
        <div class="block-head">
            <div class="block-head-left">
                <div class="avatar">
                    <img :src="videoInfo.HeadIcon" alt="">
                </div>
                <div class="info">
                    <p class="name">{{ videoInfo.NickName }}</p>
                    <p class="time">{{ videoInfo.CreateDate }}</p>
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
            <p>{{ videoInfo.TalkContent }}</p>
            <div class="video-wrap" v-if="videoInfo.Imgs.length > 0">
                <div class="photo-wrap">
                    <div class="video" @click.stop="">
                        <video controls :poster="videoInfo.Imgs[0].smallImgUrl">
                            <source :src="fileBaseUrl + videoInfo.Imgs[0].videoUrl" type="video/mp4">
                            <source :src="fileBaseUrl + videoInfo.Imgs[0].videoUrl" type="video/ogg">
                            您的浏览器不支持Video标签。
                        </video>
                    </div>
                </div>
            </div>
        </div>
        <div class="block-foot" @click.stop="">
            <div class="foot-child">
                <i
                    class="icon iconfont"
                    v-show="!videoInfo.itemOperateData.IsCollection"
                    @click="clickCollection(true)"
                >&#xe696;</i>
                <i class="icon iconfont"
                   style="color: #ff3c00; font-size: 17px;"
                   v-show="videoInfo.itemOperateData.IsCollection"
                   @click="clickCollection(false)"
                >&#xe69d;</i>
                <span :class="{ active: videoInfo.itemOperateData.IsCollection }">收藏</span>
            </div>
            <div class="foot-child">
                <i class="icon iconfont">&#xe6be;</i>
                <span>{{ videoInfo.itemOperateData.ShareCount }}</span>
            </div>
            <div class="foot-child">
                <i class="icon iconfont">&#xe664;</i>
                <span>评论</span>
            </div>
            <div class="foot-child">
                <i
                    class="icon iconfont"
                    v-show="!videoInfo.itemOperateData.IsLike"
                    @click="clickLike(true)"
                >&#xe67e;</i>
                <i
                    class="icon iconfont"
                    style="color: #ff3c00;"
                    v-show="videoInfo.itemOperateData.IsLike"
                    @click="clickLike(false)"
                >&#xe621;</i>
                <span :class="{ active: videoInfo.itemOperateData.IsLike }">点赞</span>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    props: {
      videoInfo: {
        type: Object,
        default: function () {
          return {}
        }
      },
      index: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        fileBaseUrl: process.env.fileBaseUrl,
      }
    },

    methods: {
      // 收藏
      clickCollection(flag) {
        this.$emit('clickCollection', this.index, flag)
      },

      // 赞
      clickLike(flag) {
        this.$emit('clickLike', this.index, flag)
      },

      // 点击弹出详情
      clickVideo() {
        this.$emit('clickVideo', this.videoInfo, this.index);
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "~assets/css/ModulesStyle/index.less";
</style>
