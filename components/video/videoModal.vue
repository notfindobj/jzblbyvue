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
                <div class="video-wrap">
                    <video ref="video" poster="http://www.pic.jzbl.com/buildingcircle/0e70e8ea-d343-4136-a2f8-0af82ebe7c67/2019-05-29/v/s/1648e317_afa9a2db1559138648.jpg">
                        <source src="http://www.pic.jzbl.com/buildingcircle/0e70e8ea-d343-4136-a2f8-0af82ebe7c67/2019-05-29/v/afa9a2db1559138648.mp4" type="video/mp4">
                        <source src="http://www.pic.jzbl.com/buildingcircle/0e70e8ea-d343-4136-a2f8-0af82ebe7c67/2019-05-29/v/afa9a2db1559138648.mp4" type="video/ogg">
                        您的浏览器不支持Video标签。
                    </video>
                    <div class="controls-box">
                        <Icon v-show="isPause" type="md-play" color="#fff" size="20" @click="playVideo" />
                        <Icon v-show="!isPause" type="md-pause" color="#fff" size="20" @click="pauseVideo" />
                        <div class="progress-wrap">
                            <div class="progress-content" :style="{width: progressWidth}"></div>
                        </div>
                    </div>
                </div>
                <div class="info-wrap"></div>
            </div>
        </Modal>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        modal6: true,
        isEnd: false,
        isPause: true,
        progressWidth: 0
      }
    },
    mounted() {
      this.$refs.video.addEventListener('play', () => {
        this.isPause = false;
      });

      this.$refs.video.addEventListener('pause', () => {
        this.isPause = true;
      });

      this.$refs.video.addEventListener('timeupdate', () => {
        this.progressWidth = (this.$refs.video.currentTime / this.$refs.video.duration) * 100 + '%';

      });

    },


    methods: {
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
        height: 655px;
        .video-wrap {
            width: 900px;
            height: 100%;
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
            }

        }
        .info-wrap {
            width: 380px;
            height: 100%;
        }
    }
</style>
