<template>
    <div>
        <video ref="courseVideo" :poster="video.VideoImg" class="vjs-matrix video-js vjs-fluid vjs-big-play-centered">
            <source :src="video.VideoUrl" type="video/mp4" >
        </video>
    </div>
</template>
<script>
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import Bus from "../../../plugins/untils/Bus"
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
    data () {
        return {
            myVideo: null,
        }
    },
    mounted () {
        let that = this;
        Bus.$on("extendDrag", function (val)  {
            that.setVideo(val)
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
                    autoplay: true,
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
                    this.on('click', function () {
                        console.log('click');
                    });
                    //开始播放视频
                    this.on('play', function () {
                        if (_this.video.IsBuy === 0) {
                            this.pause()
                        }
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