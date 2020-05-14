<template>
    <div>
        <video ref="courseVideo" poster="https://img.3d66.com/soft/2020/20200107/9cc0a427e820505c831efb94b1e5983b.jpg" class="vjs-matrix video-js vjs-fluid vjs-big-play-centered">
            <source src="http://www.pic1.jzbl.com/buildingcircle/060f10e0-cc85-4edc-8b15-4553617db8ec/2020-04-24/v/1587716283122650.mp4" type="video/mp4" >
        </video>
    </div>
</template>
<script>
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import Bus from "../../../plugins/untils/Bus"
export default {
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
            //初始化视频方法
            this.myVideo = new Video(this.$refs.courseVideo,
                {
                    controls: true,
                    autoplay: true,
                    preload: "auto",
                    width: "930px",
                    height: "697px",
                    fluid: false,
                    controlBar: {
                        // volumePanel: {
                        //     inline: false
                        // },
                        // bigPlayButton:  false,
                        // // fullscreenToggle: false,
                        // pictureInPictureToggle: false,
                        // mouseTimeDisplay: false
                    }
                }, 
            );
        },
        setVideo (val) {
            if (val) {
                this.myVideo.width(1200);
                this.myVideo.height(697);
            } else {
                this.myVideo.width(930);
                this.myVideo.height(697);
            }
            
        },
    }
}
</script>
<style lang="less" scoped>

</style>