<template>
    <div class="test_two_box">
        <video :ref="videoRef" :poster="baseUrlRegExp(itemVideo.smallImgUrl)" class="vjs-matrix video-js vjs-big-play-centered" >
            <source :src="baseUrlRegExp(itemVideo.videoUrl)" type="video/mp4" >
        </video>
        <videoModel 
        :attr="isShowViewBox"
        v-if="isShowViewBox"
        :detaDetails="detaDetails"
        :itemVideo="itemVideo"
        @closVideoMadel="closVideoModel"/>
    </div>
</template>
<script>
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import {getRanNum} from '../../plugins/untils/public'
export default {
    name: getRanNum(15),
    props: {
        itemId: {
            type: String,
            default: ''
        },
        itemVideo: {
            type: Object,
            default: () => {}
        },
        detaDetails: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            fileBaseUrl: process.env.fileBaseUrl,
            myPlayer: null,
            videoRef: '',
            videoCon: '',
            isShowViewBox: false
        };
    },
    created () {
        this.videoRef = getRanNum(10);
        this.videoCon = getRanNum(11);
    },
    mounted() { 
        this.initVideo();
        window.onscroll = () => {
            //变量t是滚动条滚动时，距离顶部的距离
            const h = document.documentElement.clientHeight;
        }
    },
    methods: {
        initVideo() {
            let _this = this;
            //初始化视频方法
            this[this.videoCon] = Video(this.$refs[this.videoRef], {
                //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                controls: true,
                //自动播放属性,muted:静音播放
                autoplay: false,
                //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                preload: "auto",
                //设置视频播放器的显示宽度（以像素为单位）
                width: "500px",
                //设置视频播放器的显示高度（以像素为单位）
                height: "300px",
                controlBar: {
                    volumePanel: {
                        inline: false
                    },
                    bigPlayButton:  false,
                    fullscreenToggle: false,
                    pictureInPictureToggle: false,
                    mouseTimeDisplay: false
                }
            }, function () {
                let that =this;
                let fullScreen = getRanNum()
                let barHtml = `
                    <div class="video-bar">
                        <span class="iconfont icon-favorite"></span>
                        <span class="video-star iconfont icon-dianzan1"></span>
                        <span class="iconfont icon-shipinfangda" id="${fullScreen}"></span>
                    </div>`
                let bar = document.createElement('div');
                bar.innerHTML = barHtml;
                this.controlBar.el().appendChild(bar);
                document.getElementById(fullScreen).addEventListener('click', function () {
                    _this.isShowViewBox = !_this.isShowViewBox
                    _this.itemVideo.videoTime = that.currentTime();
                    _this.itemVideo.videoId = _this.videoRef
                    that.pause()
                })
                //开始播放视频
                this.on('play', function () {
                    console.log('开始播放');
                });
                //结束
                this.on('ended', function () {
                    console.log('结束播放');
                });
                this.on('pause', function () {
                    console.log('暂停播放');
                });
                }            
            );
            },
        closVideoModel (row) {
            this.isShowViewBox = !this.isShowViewBox
            this[this.videoCon].currentTime(this.itemVideo.videoTime);
            this[this.videoCon].play();
        },
        clickEnlarge () {
            console.log('asdsdasd')
        },
        // 获取评论
        async getComment() {
            let queryData = {
                ItemId: this.detaDetails.ItemId,
                ScopeType: 2
            }
            let msg =  this.$store.dispatch('getGetComments', queryData)
        },
        baseUrlRegExp (str) {
            let reg = RegExp(/\http:\/\/www./);
            if(str.match(reg)){
                return str
            } else {
                return this.fileBaseUrl+ str
        }
      }
    }
};
</script>
<style lang="less" scoped>
.video-js .vjs-big-play-button {
    /* 这里的样式重写 */
}
video:not(:root):-webkit-full-screen {

}
/* 屏蔽双击放大 */
.vjs-tech {
    pointer-events: none;
}
.vjs-matrix.video-js {
//   color: #FF3C00;
}
.vjs-matrix .vjs-volume-level,
.vjs-matrix .vjs-play-progress,
.vjs-matrix .vjs-slider-bar {
//   background: #FF3C00;
}
.vjs-mycontrol-bar {
    display: flex;
    justify-content: flex-end;
}
.play-box {
    display: flex;
    justify-content: flex-end;
    height: 30px;
    line-height: 30px;
    z-index: 23;
}
.play-box-dian {
    cursor: pointer;
    margin-right: 30px;
}

.video-star {
    margin: 0 10px;
}
</style>
<style lang="less">
    .video-bar {
        display: flex;
        line-height: 29px;
        height: 32px;
        cursor: pointer;
        span {
            display: inline-block;
            padding: 0 10px;
            font-size: 14px;
        }
    }
</style>