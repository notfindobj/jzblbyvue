<template>
    <div>
        <video ref="courseVideo" poster="https://img.3d66.com/soft/2020/20200107/9cc0a427e820505c831efb94b1e5983b.jpg" class="vjs-matrix video-js vjs-big-play-centered">
            <source src="http://www.pic1.jzbl.com/buildingcircle/060f10e0-cc85-4edc-8b15-4553617db8ec/2020-04-24/v/1587716283122650.mp4" type="video/mp4" >
        </video>
    </div>
</template>
<script>
import Video from 'video.js'
import 'video.js/dist/video-js.css'
export default {
    methods: {
        initVideo () {
            let _this = this;
            //初始化视频方法
            Video(this.$refs.courseVideo,
                {
                    controls: true,
                    autoplay: true,
                    preload: "auto",
                    width: "990px",
                    height: "660px",
                    controlBar: {
                        volumePanel: {
                            inline: false
                        },
                        bigPlayButton:  false,
                        // fullscreenToggle: false,
                        pictureInPictureToggle: false,
                        mouseTimeDisplay: false
                    }
                }, 
            );
        }
    }
}
</script>
<style lang="less" scoped>

</style>