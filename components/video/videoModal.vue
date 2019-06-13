<template>
    <div>
        <Modal
            v-model="modal6"
            :closable="false"
            :footer-hide="true"
            width="1280"
            class="video-modal"
        >
            <div class="modal-content">
                <div class="close-box">
                    <Icon type="ios-close-circle-outline" size="36" color="#fff"/>
                </div>
                <div class="video-wrap">
                    <video ref="video"
                           poster="http://www.pic.jzbl.com/buildingcircle/0e70e8ea-d343-4136-a2f8-0af82ebe7c67/2019-05-29/v/s/1648e317_afa9a2db1559138648.jpg">
                        <source
                            src="http://www.pic.jzbl.com/buildingcircle/0e70e8ea-d343-4136-a2f8-0af82ebe7c67/2019-05-29/v/afa9a2db1559138648.mp4"
                            type="video/mp4">
                        <source
                            src="http://www.pic.jzbl.com/buildingcircle/0e70e8ea-d343-4136-a2f8-0af82ebe7c67/2019-05-29/v/afa9a2db1559138648.mp4"
                            type="video/ogg">
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
                            <span>15</span>
                        </div>
                        <div class="icon-box">
                            <i class="icon iconfont zan">&#xe67e;</i>
                            <span>15</span>
                        </div>
                        <Icon class="contract" type="md-contract" size="20" color="#fff"/>
                    </div>
                </div>
                <div class="info-wrap">
                    <div class="video-content">
                        <div class="content-head">
                            <div class="avatar"></div>
                            <div class="head-center">
                                <span class="nick-name">梅赛德斯·赵四</span>
                                <span class="time-str">发布日期：2018-11-15</span>
                            </div>
                            <div class="head-right">
                                <i class="icon iconfont">&#xe61b;</i>
                                <span>200</span>
                            </div>
                        </div>
                        <p class="content-text">项目介绍：零零落落零零落落零零落落零零落落零零落落零零落落啦啦啦啦啦啦啦，噢噢噢噢噢噢噢噢噢噢噢噢噢噢噢噢噢噢，密密麻麻密密麻麻吗</p>
                        <span class="btn-open">展开详情 <Icon type="ios-arrow-down"/></span>
                    </div>
                    <div class="operator-box">
                        <div class="operator-bar">
                            <p>
                                <i class="icon iconfont icon1">&#xe643;</i>
                                <span>100</span>
                            </p>
                            <Divider type="vertical"/>
                            <p>
                                <i class="icon iconfont icon2">&#xe609;</i>
                                <span>200</span>
                            </p>
                            <Divider type="vertical"/>
                            <p>
                                <i class="icon iconfont icon3">&#xe696;</i>
                                <span>200</span>
                            </p>
                            <Divider type="vertical"/>
                            <p>
                                <i class="icon iconfont icon4">&#xe664;</i>
                                <span>300</span>
                            </p>
                        </div>
                        <div class="comment-box">
                            <div class="textarea-wrap">
                                <textarea placeholder="来说两句吧···" ></textarea>
                                <span class="tip">
                                    还可以输入<span>500</span>字
                                </span>
                            </div>
                            <div class="comment-bottom">
                                <i class="icon iconfont select-icon">&#xe64e;</i>
                                <Button type="primary" size="small">发表评论</Button>
                            </div>
                        </div>
                    </div>
                    <div class="comment-list">
                        <div class="comment-item">
                            <div class="commenter-avatar"></div>
                            <div class="comment-info">
                                <p class="comment-nickname">梅赛德斯·赵四</p>
                                <p class="comment-time">31分钟前</p>
                                <p class="comment-con">在这个项目中，很重要的一点是要做一个能立即吸引公众注意的室内，让他们经过并开车去一个新的地方。作为基础，有一个相当小和简单的空间。我们希望保留这种简单性</p>
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
  export default {
    data() {
      return {
        modal6: true,
        isEnd: false,   // 是否结束状态
        isPause: true,  // 是否暂停状态
        progressWidth: 0,   // 播放进度百分比
        currentTime: '0:00',    // 视频当前播放时长
        duration: '',   // 视频总时长
      }
    },
    mounted() {
      setTimeout(() => {
        this.duration = this.formatTime(this.$refs.video.duration);
      }, 100);

      this.$refs.video.addEventListener('play', () => {
        this.isPause = false;
      });

      this.$refs.video.addEventListener('pause', () => {
        this.isPause = true;
      });

      this.$refs.video.addEventListener('timeupdate', () => {
        console.log(this.$refs.video.currentTime, this.$refs.video.duration);
        this.progressWidth = (this.$refs.video.currentTime / this.$refs.video.duration) * 100 + '%';
        this.currentTime = this.formatTime(this.$refs.video.currentTime);
      });

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

      // 点击开始
      playVideo() {
        this.$refs.video.play();
      },

      // 暂停播放
      pauseVideo() {
        this.$refs.video.pause();
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

                        .icon1 {
                            position: relative;
                            font-size: 17px;
                            bottom: 2px;
                        }

                        .icon2 {
                            font-size: 14px;
                        }

                        .icon3 {
                            position: relative;
                            bottom: 1px;
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
                            resize:none;
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
