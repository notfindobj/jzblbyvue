<template>
    <div class="test_two_box">
       <div class="video-box">
            <video :ref="videoRef" :poster="`${itemVideo.videoUrl}?x-oss-process=video/snapshot,t_10000,m_fast`" class="vjs-matrix video-js vjs-big-play-centered" >
                <source :src="itemVideo.videoUrl" type="video/mp4" >
            </video>
            <div class="video-img" @mouseover="videoMouseover" @mouseout="videoMouseout" @click="play" @dblclick="dbPlay"></div>
       </div>
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
import {getRanNum, addEvent, preventSliding} from '../../plugins/untils/public'
import { setComments, setthumbsUp , setCollection, getUserProAndFans, setFollow, recordFrequency} from '../../service/clientAPI'
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
            myPlayer: null,
            videoRef: '',
            videoCon: '',
            isShowViewBox: false,
            isPlay: '',
            controlPlay: {}
        };
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
        this.initScroll()
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
                muted: true,
                //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                preload: "meta",
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
                let fullScreen = getRanNum();
                let favorite = getRanNum(5);
                let dianzan = getRanNum(4);
                let IsLike = _this.detaDetails.itemOperateData.IsLike;
                let IsCollection = _this.detaDetails.itemOperateData.IsCollection;
                let barHtml = `
                    <div class="video-bar">
                        <span class="video-star iconfont ${IsLike ? 'icon-like-b' : 'icon-dianzan1'}" data-video="${IsLike}" style="color: ${IsLike? '#FF3C00': ''}" id="${dianzan}"></span>
                        <span class="iconfont ${IsCollection ? 'icon-cc-star': 'icon-favorite'}" style="color: ${IsLike? '#FF3C00': ''}" id="${favorite}" data-video="${IsCollection}"></span>
                        <span class="iconfont icon-shipinfangda" id="${fullScreen}"></span>
                    </div>`
                let bar = document.createElement('div');
                bar.innerHTML = barHtml;
                this.controlBar.el().appendChild(bar);
                // 收藏
                document.getElementById(favorite).addEventListener('click', function () {
                    _this.Collection(_this.detaDetails, favorite)
                })
                // 点赞
                document.getElementById(dianzan).addEventListener('click', function () {
                    _this.thumbsUp(_this.detaDetails, dianzan)
                })
                // 放大
                document.getElementById(fullScreen).addEventListener('click', async function () {
                    //记录用户访问
                    let rec = await recordFrequency({
                        ItemId: _this.detaDetails.ItemId,
                        DomainType: _this.detaDetails.TalkType
                    })
                    _this.isShowViewBox = !_this.isShowViewBox;
                    _this.stop()
                    _this.itemVideo.videoTime = that.currentTime();
                    _this.itemVideo.videoId = _this.videoRef
                    that.pause()
                })
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
        closVideoModel (row) {
            this.move()
            this.isShowViewBox = !this.isShowViewBox
            this[this.videoCon].currentTime(this.itemVideo.videoTime);
            this[this.videoCon].play();
        },
        play () {
            if (!this[this.videoCon].paused()) {
                this[this.videoCon].pause()
            } else {
                this[this.videoCon].play()
            }
            
        },
        dbPlay () {
            this[this.videoCon].play();
            this.isShowViewBox = !this.isShowViewBox;
            this.stop()
            this.itemVideo.videoTime = this[this.videoCon].currentTime();
            this.itemVideo.videoId = this.videoRef
            this[this.videoCon].pause()
        },
        videoMouseout () {
            this[this.videoCon].controls()
        },
        videoMouseover () {
            this[this.videoCon].controls()
        },
        // 收藏
        async Collection(item, domId) {
            let queryData = {
                ItemId: item.ItemId,
                TalkType: 2,
                IsDelete: item.itemOperateData.IsCollection
            }
            let collectionMsg = await setCollection(queryData);
            if (collectionMsg) {
                 if (item.itemOperateData.IsCollection) {
                    this.$set(item.itemOperateData, 'CollectionCount', item.itemOperateData.CollectionCount - 1)
                } else {
                    this.$set(item.itemOperateData, 'CollectionCount', item.itemOperateData.CollectionCount + 1)
                }
                this.setDom(domId)
                this.$set(item.itemOperateData, 'IsCollection', !item.itemOperateData.IsCollection)
            }
        },
        // 项目点赞
        async thumbsUp(item, domId) {
            let queryData = {
                ItemId: item.ItemId,
                LikeType: 1,
                IsDelete: item.itemOperateData.IsLike
            }
            let thumbsUpMsg = await setthumbsUp(queryData);
            if (item.itemOperateData.IsLike) {
                this.$set(item.itemOperateData, 'LikeCount', item.itemOperateData.LikeCount - 1)
            } else {
                this.$set(item.itemOperateData, 'LikeCount', item.itemOperateData.LikeCount + 1)
            }
            this.setDom(domId)
            this.$set(item.itemOperateData, 'IsLike', !item.itemOperateData.IsLike)
        },
        // 获取评论
        async getComment() {
            let queryData = {
                ItemId: this.detaDetails.ItemId,
                ScopeType: 2
            }
            let msg =  this.$store.dispatch('getGetComments', queryData)
        },
        initScroll () {
            let that = this;
            addEvent(window,'scroll',function(){
                try {
                    let controlPlay = that.$refs[that.videoRef].getBoundingClientRect();
                    if (that[that.isPlay] && (controlPlay.top < -290 || controlPlay.top > 230)) {
                        that[that.videoCon].pause()
                        that[that.isPlay] = false
                    }
                    if (!that[that.isPlay] && controlPlay.top > 0 && controlPlay.top < 230) {
                        that[that.videoCon].play();
                        that[that.isPlay] = true
                    }
                } catch (error) {}
            });
        },
        // 小视频框
        setDom (domId) {
            if (domId) {
                let dataDom = document.getElementById(domId);
                let data = dataDom.getAttribute('data-video');
                if (data === 'true') {
                    dataDom.style.color = '';
                    if (domId.length === 4) {
                        dataDom.classList.remove('icon-like-b')
                        dataDom.classList.add('icon-dianzan1')
                    } else {
                        dataDom.classList.remove('icon-cc-star')
                        dataDom.classList.add('icon-favorite')
                    }
                    dataDom.setAttribute('data-video', 'false');
                } else {
                    dataDom.style.color = '#FF3C00';
                    if (domId.length === 4) {
                        dataDom.classList.remove('icon-dianzan1');
                        dataDom.classList.add('icon-like-b');
                    } else {
                        dataDom.classList.remove('icon-favorite');
                        dataDom.classList.add('icon-cc-star');
                    }
                    dataDom.setAttribute('data-video', 'true');
                }
            }
        },
        //滑动限制
        stop(){
            var mo=function(e){e.preventDefault();};
            document.body.style.overflow='hidden';
            document.addEventListener("touchmove",mo,false);//禁止页面滑动
            },
        //取消滑动限制
        move(){
            var mo=function(e){e.preventDefault();};
            document.body.style.overflow='';//出现滚动条
            document.removeEventListener("touchmove",mo,false);
        }
    }
};
</script>
<style lang="less" scoped>
.video-box {
    position: relative;
    video {
        display: inline-block;
        vertical-align: baseline;
    }
    .video-img {
        position: absolute;
        top: 0;
        bottom: 60PX;
        width: 100%;
        background-size: 100% 100%;
        cursor:pointer;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
}
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
    .model-postion {
        position: fixed;
        width: 100%;
    }
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