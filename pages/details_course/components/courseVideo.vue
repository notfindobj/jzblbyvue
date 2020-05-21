<template>
    <div>
        <video ref="courseVideo" :poster="videoDetail.VideoImg" class="vjs-matrix video-js vjs-fluid vjs-big-play-centered">
            <source :src="videoDetail.VideoUrl" type="video/mp4" >
        </video>
    </div>
</template>
<script>
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import Bus from "../../../plugins/untils/Bus"
import {CourseLearn} from "../../../service/course"
export default {
    props: {
        video: {
            type: Object,
            default: ()=>{}
        },
        width: {
            type: String,
            default: '930px'
        },
        height: {
            type: String,
            default: '697px'
        }
    },
    created () {
        this.videoDetail = this.video
    },
    data () {
        return {
            videoDetail: {},
            myVideo: null,
        }
    },
    mounted () {
        let that = this;
        Bus.$on("extendDrag", function (val)  {
            that.setVideo(val)
        })
        Bus.$on("videoSource", function (val)  {
            that.videoSources(val)
        })
        this.initVideo()
    },
    methods: {
        initVideo () {
            let _this = this;
            Video.plugin ('myPlugin', function (myPluginOptions){
               myPluginOptions = myPluginOptions || {};
               var player = this;
               var alertText = myPluginOptions.text || "玩家在玩！"
               player.on('play',  function(){
                 alert(alertText);
               });
             });
            //初始化视频方法
            this.myVideo = new Video(this.$refs.courseVideo,
                {
                    myPlugin: {
                        text: 'Custom text!'
                    },
                    controls: true,
                    autoplay: false,
                    preload: "auto",
                    width: _this.width,
                    height: _this.height,
                    fluid: false,
                    controlBar: {
                        // children: [
                        //     {name: '全屏'} // 全屏
                        // ]
                        // volumePanel: {
                        //     inline: false
                        // },
                        // bigPlayButton:  false,
                        // // fullscreenToggle: false,
                        // pictureInPictureToggle: false,
                        // mouseTimeDisplay: false
                    }
                },
                function () {
                    //开始播放视频
                    this.on('play', function () {
                        console.log('开始播放', _this.setViewTime());
                    });
                    this.on('play', function () {
                        console.log('开始播放', _this.setViewTime());
                    });
                    //结束
                    this.on('ended', function () {
                        console.log('结束播放', _this.setViewTime());
                    });
                    this.on('pause', function () {
                        console.log('暂停播放', _this.setViewTime());
                    });
                }   
            );
        },
        setViewTime () {
            try {
                let ariaValueText = document.querySelector('.vjs-progress-control .vjs-progress-holder').getAttribute('aria-valuetext').split(" ");
                let tvalue = ariaValueText[0].split(":")
                let hour = 0
                let min = 0
                let sec = 0
                if (tvalue.length > 2) {
                    hour = tvalue[0];
                    min = tvalue[1];
                    sec = tvalue[2];
                } else {
                    min = tvalue[0];
                    sec = tvalue[1];
                }
                let s = Number(hour*3600) + Number(min*60) + Number(sec);
                CourseLearn({courseDetailId: this.videoDetail.ID, readVideoLen: s})
            } catch (error) {}
        },
        videoSources (row) {
            this.videoDetail = row
            this.myVideo.src(this.videoDetail.VideoUrl);
            this.myVideo.load(this.videoDetail.VideoUrl);
        },
        setVideo (val) {
            if (val) {
                this.myVideo.width(1200);
                this.myVideo.height(this.height);
            } else {
                this.myVideo.width(this.width);
                this.myVideo.height(this.height);
            }
            
        },
    }
}
</script>
<style lang="less" scoped>
/deep/.vjs-tech {
  pointer-events: none;
}
/deep/.video-js .vjs-big-play-button {
    height: 80px;
    width: 80px;
    line-height: 80px;
    border-radius: 50%;
}
</style>