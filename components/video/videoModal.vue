<template>
    <div>
        <Modal
            v-model="isShowModal"
            :closable="false"
            :footer-hide="true"
            :mask-closable="false"
            width="1280"
            class="video-modal"
        >
            <div class="modal-content">
                <div class="close-box" @click="handleClose">
                    <Icon type="ios-close-circle-outline" size="36" color="#fff"/>
                </div>
                <div class="video-wrap" v-if="isShowModal">
                    <video
                        ref="video"
                        :poster="videoInfo.Imgs[0].smallImgUrl"
                    >
                        <source
                            :src="fileBaseUrl + videoInfo.Imgs[0].videoUrl"
                            type="video/mp4"
                        >
                        <source
                            :src="fileBaseUrl + videoInfo.Imgs[0].videoUrl"
                            type="video/ogg"
                        >
                        您的浏览器不支持Video标签。
                    </video>
                    <div class="controls-box">
                        <Icon v-show="isPause" type="md-play" color="#fff" size="20" @click="playVideo"/>
                        <Icon v-show="!isPause" type="md-pause" color="#fff" size="20" @click="pauseVideo"/>
                        <div class="progress-wrap">
                            <div class="progress-content" :style="{width: progressWidth}"></div>
                        </div>
                        <span class="time">{{ currentTime }}/{{ duration }}</span>
                        <div class="icon-box">
                            <i class="icon iconfont star">&#xe696;</i>
                            <span>{{ videoInfo.itemOperateData.CollectionCount }}</span>
                        </div>
                        <div class="icon-box">
                            <i class="icon iconfont zan">&#xe67e;</i>
                            <span>{{ videoInfo.itemOperateData.LikeCount }}</span>
                        </div>
                        <Icon class="contract" type="md-contract" size="20" color="#fff"/>
                    </div>
                </div>
                <div class="info-wrap" v-if="isShowModal">
                    <div class="video-content">
                        <div class="content-head">
                            <div class="avatar">
                                <img :src="videoInfo.HeadIcon" alt="">
                            </div>
                            <div class="head-center">
                                <span class="nick-name">{{ videoInfo.NickName }}</span>
                                <span class="time-str">发布日期：{{ videoInfo.CreateDate }}</span>
                            </div>
                            <div class="head-right">
                                <i class="icon iconfont">&#xe61b;</i>
                                <span>{{ videoInfo.itemOperateData.ReadCount }}</span>
                            </div>
                        </div>
                        <p class="content-text" v-show="videoInfo.TalkContent.length > 60 && !isShowAll">项目介绍：{{
                            videoInfo.TalkContent.substr(0,60) }}</p>
                        <p class="content-text" v-show="videoInfo.TalkContent.length > 60 && isShowAll">项目介绍：{{
                            videoInfo.TalkContent }}</p>
                        <span
                            class="btn-open"
                            v-show="videoInfo.TalkContent.length > 60 && !isShowAll"
                            @click="isShowAll = true"
                        >
                            展开详情
                            <Icon type="ios-arrow-down"/>
                        </span>
                        <span
                            class="btn-open"
                            v-show="videoInfo.TalkContent.length > 60 && isShowAll"
                            @click="isShowAll = false"
                        >
                            展开详情
                            <Icon type="ios-arrow-down"/>
                        </span>
                    </div>
                    <div class="operator-box">
                        <div class="operator-bar">
                            <p>
                                <i
                                    class="icon iconfont icon1"
                                    v-show="!videoInfo.itemOperateData.IsLike"
                                    @click="clickLike(true)"
                                >&#xe643;</i>
                                <i
                                    class="icon iconfont icon1-active"
                                    v-show="videoInfo.itemOperateData.IsLike"
                                    @click="clickLike(false)"
                                >&#xe621;</i>
                                <span>{{ videoInfo.itemOperateData.LikeCount }}</span>
                            </p>
                            <Divider type="vertical"/>
                            <p>
                                <i class="icon iconfont icon2" v-show="!videoInfo.itemOperateData.IsShare">&#xe609;</i>
                                <i class="icon iconfont icon2-active" v-show="videoInfo.itemOperateData.IsShare">&#xe609;</i>
                                <span>{{ videoInfo.itemOperateData.ShareCount }}</span>
                            </p>
                            <Divider type="vertical"/>
                            <p>
                                <i class="icon iconfont icon3"
                                   v-show="!videoInfo.itemOperateData.IsCollection"
                                   @click="clickCollection(true)"
                                >&#xe696;</i>
                                <i class="icon iconfont icon3 icon3-active"
                                   v-show="videoInfo.itemOperateData.IsCollection"
                                   @click="clickCollection(false)"
                                >&#xe69d;</i>
                                <span>{{ videoInfo.itemOperateData.CollectionCount }}</span>
                            </p>
                            <Divider type="vertical"/>
                            <p>
                                <i class="icon iconfont icon4"
                                   v-show="!videoInfo.itemOperateData.IsComment">&#xe664;</i>
                                <i class="icon iconfont icon4-active" v-show="videoInfo.itemOperateData.IsComment">&#xe664;</i>
                                <span>{{ videoInfo.itemOperateData.CommentCount }}</span>
                            </p>
                        </div>
                        <div class="comment-box" @click="isShowEmotion = false">
                            <div class="textarea-wrap">
                                <textarea placeholder="来说两句吧···" v-model="commentContent"></textarea>
                                <span class="tip">
                                    还可以输入<span>{{ 500 - commentContent.length }}</span>字
                                </span>
                            </div>
                            <div class="comment-bottom">
                                <i class="icon iconfont select-icon" @click.stop="isShowEmotion = true">&#xe64e;</i>
                                <Button type="primary" size="small" @click="handleSubmit">发表评论</Button>
                            </div>
                            <emotion
                                class="emotion"
                                @emotion="handleEmotion"
                                :height="200"
                                v-show="isShowEmotion"
                            ></emotion>
                        </div>
                    </div>
                    <div class="comment-list" v-if="commentList.length > 0">
                        <Spin size="large" fix v-if="isLoadingComment"></Spin>
                        <div
                            class="comment-item"
                            v-for="item in commentList"
                            :key="item.CommentsId"
                        >
                            <div class="commenter-avatar">
                                <img :src="item.HeadIcon" alt="">
                            </div>
                            <div class="comment-info">
                                <p class="comment-nickname">{{ item.NickName }}</p>
                                <p class="comment-time">{{ item.CreateDate }}</p>
                                <p class="comment-con">
                                    {{ item.Message }}
                                </p>
                                <div class="comment-operation">
                                    <p>
                                        <i class="icon iconfont icon1">&#xe643;</i>
                                        <span>点赞</span>
                                    </p>
                                    <Divider type="vertical" style="margin: 0 10px;"/>
                                    <p>
                                        <i class="icon iconfont icon4">&#xe664;</i>
                                        <span>评论</span>
                                    </p>
                                </div>
                                <div class="show-more-box">
                                    <span>梅赛德斯·斯儿</span>等人<span>共15条回复</span> <i class="icon iconfont">&#xe64a;</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
  import Emotion from '~/components/Emotion/index'
  import { setComments } from '../../service/clientAPI'

  export default {
    props: {
      isShowModal: {
        type: Boolean,
        default: false
      },
      videoInfo: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        fileBaseUrl: process.env.fileBaseUrl,   // 文件的域名
        isEnd: false,   // 是否结束状态
        isPause: true,  // 是否暂停状态
        progressWidth: 0,   // 播放进度百分比
        currentTime: '0:00',    // 视频当前播放时长
        duration: '',   // 视频总时长
        isLoadingComment: true, // 是否正在加载评论
        commentList: [],    // 评论列表
        commentContent: '', // 评论的内容
        isShowEmotion: false,   // 是否显示表情选择
      }
    },

    components: {
      Emotion
    },

    watch: {
      videoInfo(val, oldVal) {
        // 获取视频总时长
        setTimeout(() => {
          this.duration = this.formatTime(this.$refs.video.duration);
          // 监听开始事件
          this.$refs.video.addEventListener('play', () => {
            this.isPause = false;
          });

          // 监听暂停事件
          this.$refs.video.addEventListener('pause', () => {
            this.isPause = true;
          });

          // 监听视频播放事件
          this.$refs.video.addEventListener('timeupdate', () => {
            this.progressWidth = (this.$refs.video.currentTime / this.$refs.video.duration) * 100 + '%';
            this.currentTime = this.formatTime(this.$refs.video.currentTime);
          });

          // 获取评论
          this.isLoadingComment = true;
          this.getComment(val.ItemId);
        }, 200);
      }
    },

    methods: {

      // 格式化时间 params: timeStr 视频的秒数，有小数
      formatTime(timeStr) {
        let [hours, mins, seconds] = ['', '', ''];
        if (timeStr >= 36000) {
          hours = Math.floor(timeStr / 3600);
          mins = Math.floor(timeStr % 3600 / 60);
          seconds = Math.floor(timeStr % 3600 / 60 % 60) >= 10 ? Math.floor(timeStr % 3600 / 60 % 60) : '0' + Math.floor(timeStr % 3600 / 60 % 60);
          return hours + ":" + mins + ':' + seconds
        } else if (timeStr >= 3600) {
          hours = '0' + Math.floor(timeStr / 3600);
          mins = Math.floor(timeStr % 3600 / 60);
          seconds = Math.floor(timeStr % 3600 / 60 % 60) >= 10 ? Math.floor(timeStr % 3600 / 60 % 60) : '0' + Math.floor(timeStr % 3600 / 60 % 60);
          return hours + ":" + mins + ':' + seconds
        } else {
          mins = Math.floor(timeStr / 60);
          seconds = Math.floor(timeStr % 60) >= 10 ? Math.floor(timeStr % 60) : '0' + Math.floor(timeStr % 60);
          return mins + ':' + seconds
        }
      },

      // 关闭窗口
      handleClose() {
        this.pauseVideo();
        this.$emit('closeModal');
      },

      // 点击开始
      playVideo() {
        this.$refs.video.play();
      },

      // 暂停播放
      pauseVideo() {
        this.$refs.video.pause();
      },

      // 获取评论
      getComment(id) {
        this.$store.dispatch('getGetComments', {
          ItemId: id,
          ScopeType: 2
        }).then(res => {
          this.isLoadingComment = false;
          this.commentList = res;
        })
      },

      // 选择表情
      handleEmotion(item) {
        this.commentContent += `[${ item.content }]`
      },

      // 发表评论
      handleSubmit() {
        if (this.commentContent.length === 0) {
          this.$Message.warning('请填写评论内容！');
          return false;
        }
        setComments({
          ItemId: this.videoInfo.ItemId,
          ReplyId: '',
          ReplyUserId: '',
          IsReply: false,
          Message: this.commentContent,
          ItemImgSrc: '',
          ScopeType: 2
        }).then(res => {
          this.$Message.success('评论成功');
          this.commentContent = '';
          this.getComment(this.videoInfo.ItemId);
        })
      },

      // 点赞 flag 点赞/取消点赞
      clickLike(flag) {
        this.$emit('likeSuccess', flag)
      },

      // 收藏
      clickCollection(flag) {
        this.$emit('collectionSuccess', flag)
      }
    }
  }
</script>

<style lang="less" scoped>
    .modal-content {
        display: flex;
        position: relative;
        height: 655px;

        .close-box {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top: -14px;
            right: -14px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background-color: #4D4D4D;
            cursor: pointer;
        }

        .video-wrap {
            width: 900px;
            height: 100%;
            font-size: 0;

            video {
                width: 100%;
                height: 615px;
                outline: none;
            }

            .controls-box {
                display: flex;
                align-items: center;
                width: 100%;
                height: 40px;
                padding: 0 20px;
                background-color: #333;

                i {
                    cursor: pointer;
                }

                .progress-wrap {
                    width: 573px;
                    height: 3px;
                    margin-left: 20px;
                    background-color: #fff;

                    .progress-content {
                        height: 100%;
                        background-color: #FFA00A;
                    }
                }

                .time {
                    margin-left: 20px;
                    color: #fff;
                    font-size: 14px;
                }

                .icon-box {
                    margin-left: 20px;

                    color: #fff;

                    i {
                        font-size: 15px;
                    }

                    .star {
                        font-size: 16px;
                    }

                    span {
                        font-size: 12px;
                        padding-left: 5px;
                    }
                }

                .contract {
                    margin-left: 20px;
                }
            }

        }

        .info-wrap {
            width: 380px;
            height: 100%;
            padding: 20px 20px 0;
            background-color: #F5F6F5;
            overflow-y: scroll;

            .video-content {
                width: 100%;
                border-radius: 4px;
                background-color: #fff;
                padding: 10px;
                margin-bottom: 20px;

                .content-head {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 10px;

                    .avatar {
                        width: 40px;
                        height: 40px;
                        background-color: #ccc;
                        border-radius: 50%;
                        overflow: hidden;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .head-center {
                        width: 200px;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        align-items: flex-start;

                        .nick-name {
                            font-size: 14px;
                            color: #333;
                        }

                        .time-str {
                            font-size: 12px;
                            color: #999;
                        }
                    }

                    .head-right {
                        color: #666;

                        i {
                            position: relative;
                            bottom: 1px;
                            vertical-align: middle;
                        }
                    }
                }

                .content-text {
                    font-size: 14px;
                    color: #333;
                }

                .btn-open {
                    font-size: 14px;
                    color: #FF3C00;
                    margin-top: 5px;
                }
            }

            .operator-box {
                width: 100%;
                padding: 5px 10px 10px;
                background-color: #fff;
                border-radius: 4px;

                .operator-bar {
                    width: 100%;
                    height: 30px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;

                    p {
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                        width: 45px;
                        color: #333;

                        i {
                            cursor: pointer;
                        }

                        .icon1 {
                            position: relative;
                            font-size: 17px;
                            bottom: 2px;
                        }

                        .icon1-active {
                            font-size: 15px;
                            color: #ff3c00;
                        }

                        .icon2 {
                            font-size: 14px;
                        }

                        .icon2-active {
                            font-size: 14px;
                            color: #ff3c00;
                        }

                        .icon3 {
                            position: relative;
                            bottom: 1px;
                        }

                        .icon3-active {
                            color: #ff3c00;
                        }

                        .icon4-active {
                            color: #ff3c00;
                        }
                    }
                }

                .comment-box {
                    position: relative;
                    width: 100%;
                    padding: 10px;
                    background-color: #F6F6F8;
                    border-radius: 4px;

                    .textarea-wrap {
                        position: relative;

                        .tip {
                            position: absolute;
                            right: 7px;
                            bottom: 10px;
                            font-size: 12px;
                            color: #666;

                            span {
                                color: #ff3c00;
                            }
                        }

                        textarea {
                            width: 100%;
                            height: 82px;
                            padding: 4px;
                            border: 1px solid #ff3c00;
                            outline: none;
                            border-radius: 4px;
                            resize: none;
                            color: #333;
                        }
                    }

                    .comment-bottom {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .select-icon {
                            font-size: 15px;
                            color: #ff3c00;
                            cursor: pointer;
                        }

                        button {
                            height: 21px;
                            line-height: 19px;
                        }
                    }
                }

                .comment-box:after {
                    position: absolute;
                    content: '';
                    top: -21px;
                    right: 24px;
                    width: 0;
                    height: 0;
                    border: 15px solid transparent;
                    border-bottom-color: #F6F6F8;
                }
            }

            .comment-list {
                position: relative;
                width: 100%;
                min-height: 280px;
                background-color: #fff;
                border-radius: 4px;
                padding: 10px;
                margin-top: 10px;

                .comment-item {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-start;
                }

                .commenter-avatar {
                    width: 30px;
                    height: 30px;
                    background-color: #ccc;
                    border-radius: 50%;
                    margin-right: 10px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .comment-info {
                    width: 88%;

                    .comment-nickname {
                        font-size: 12px;
                        color: #333;
                    }

                    .comment-time {
                        font-size: 12px;
                        color: #999;
                    }

                    .comment-con {
                        margin-top: 5px;
                        font-size: 12px;
                        color: #000;
                    }

                    .comment-operation {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;

                        p {
                            display: flex;
                            align-items: center;

                            span {
                                margin-left: 2px;
                            }

                            .icon1 {
                                position: relative;
                                bottom: 2px;
                            }
                        }
                    }

                    .show-more-box {
                        width: 100%;
                        height: 37px;
                        margin-top: 10px;
                        padding: 0 10px;
                        background-color: #f6f6f6;
                        border-radius: 4px;
                        line-height: 37px;
                        color: #333;

                        span {
                            color: #3E85FF;
                            cursor: pointer;
                        }

                        i {
                            color: #3E85FF;
                            font-size: 13px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>
