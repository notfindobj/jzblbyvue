<template>
    <div class="hotVide">
        <div class="hotVide-content" @click="enterVideo(hotVideo)">
            <video v-if="hotVideo.ResourceObj.length > 0" :ref="videoRef" autoplay="autoplay" :poster="hotVideo.ResourceObj[0].smallImgUrl" class="vjs-matrix video-js vjs-big-play-centered" >
                <source :src="hotVideo.ResourceObj[0].videoUrl" type="video/mp4" >
            </video>
        </div>
        <div class="hotVide-top" v-html="hotVideo.Title"></div>
    </div>
</template>
<script>
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import {getRanNum} from '../../plugins/untils/public'
export default {
    props: {
       hotVideo: {
           type: Object,
           default: function () {
               return []
           }
       } 
    },
    data () {
        return {
            videoRef: '',
            videoCon: '',
            isPlay: '',
            controlPlay: {},
        }
    },
    created () {
        this.videoRef = getRanNum(18);
        this.videoCon = getRanNum(11);
        this.controlPlay = getRanNum(16);
        this.isPlay = getRanNum(8);
        this[this.isPlay] = false;
    },
    mounted() { 
        this.initVideo();
    },
    methods: {
        enterVideo (hotVideo) {
            this.$emit('enterVideo', hotVideo)
        },
        initVideo() {
            let _this = this;
            //初始化视频方法
            this[this.videoCon] = Video(this.$refs[this.videoRef], {
                //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                controls: true,
                //自动播放属性,muted:静音播放
                autoplay: true,
                loop : true,
                muted: true,
                //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                preload: "meta",
                //设置视频播放器的显示宽度（以像素为单位）
                width: "595px",
                //设置视频播放器的显示高度（以像素为单位）
                height: "340px",
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
                //开始播放视频
                this.on('play', function () {
                    console.log('开始播放');
                    this[this.videoCon] = true
                });
                //结束
                this.on('ended', function () {
                    this[this.videoCon] = false
                    console.log('结束播放');
                });
                this.on('pause', function () {
                    console.log('暂停播放');
                    this[this.videoCon] = false
                });
                }            
            );
        },
    },
}
</script>
<style lang="less" scoped>
    /* 屏蔽双击放大 */
    .vjs-tech {
        pointer-events: none;
    }
    /deep/.vjs-has-started .vjs-control-bar {
        opacity: 0;
    }
    .hotVide {
        display: inline-block;
        margin-top: 10px;
        width: 595px;
        height: 340px;
        position: relative;
        border-radius: 3px;
        box-shadow: none;
        transition: box-shadow 1s;
        overflow: hidden;
        cursor: pointer;
        &-content img {
            width: 100%;
            height: 100%;
            transform: scale(1);
            transition: transform 1s;
        }
        &-top {
            position: absolute;
            height: 45px;
            width: 100%;
            padding: 0 10px;
            color: #fff;
            top: -45px;
            transition: top .5s ;
        }
        &:hover &-top{
            transition: top .5s;
            top: 0;
        }
        &:hover &-content > img{
            transition: transform 1s;
            transform: scale(1.5);
        }
        &:hover {
            transition: box-shadow .5s;
            box-shadow: 0 2px 15px #999999;
        }
    }
</style>