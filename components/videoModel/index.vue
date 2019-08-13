<template>
    <div class="view-box-model" >
        <div class="view-box">
             <div id="view">
                <video :ref="videoRef" :poster="baseUrlRegExp(itemVideo.smallImgUrl)" class="vjs-matrix video-js vjs-big-play-centered">
                    <source :src="baseUrlRegExp(itemVideo.videoUrl)" type="video/mp4" >
                </video>
             </div>
             <div class="close-box" @click="handleClose">
                <Icon type="ios-close-circle-outline" size="36" color="#fff"/>
            </div>
             <div class="view-box-right">
               <div class="details-box">
                 <div class="details-box-img">
                   <div class="details-box-img-img">
                       <img :src="detaDetails.HeadIcon" style="width: 100%;height: 100%;" alt="">
                   </div>
                   <div class="details-box-img-right">
                     <p>{{detaDetails.NickName}}</p>
                     <p>发布日期：{{detaDetails.CreateDate}}</p>
                   </div>
                 </div>
                 <div class="details-box-brief">
                    {{detaDetails.TalkTitle}}
                 </div>
               </div>
               <commentsCon
                    :publish="detaDetails"
                    :comments="[]"
                    @thumbsUp="thumbsUp"
                    @commentValue="commentValue"
                    @discussValue="discussValue"
                    @somePraise="somePraise"
               />
               <discuss/>
               <share :config="configShare"/>
             </div>
        </div>
    </div>
</template>
<script>
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import discuss from '../comments/discuss'
import commentsCon from '../comments/commentsCon'
import share from '../../components/share'
import {getRanNum} from '../../plugins/untils/public'
import { setthumbsUp, setCollection, setFollow, setComments, recordFrequency, downloadFile} from '../../service/clientAPI'
export default {
    name: getRanNum(13),
    props: {
        itemVideo: {
            type: Object,
            default: ()=> {}
        },
        detaDetails: {
            type: Object,
            default: ()=> {}
        }
    },
    components: {
        discuss,
        share,
        commentsCon
    },
    data() {
        return {
            configShare: {
                isModal: false
            },
            fileBaseUrl: process.env.fileBaseUrl,
            attribute: [],
            isShowViewBox: true,
            videoRef: '',
            videoCon: '',
        }
    },
    created () {
        this.videoRef = getRanNum(9);
        this.videoCon = getRanNum(10);
    },
    mounted() { 
        this.initVideo();
    },
    methods: {
        baseUrlRegExp (str) {
            let reg = RegExp(/\http:\/\/www./);
            if(str.match(reg)){
                return str
            } else {
                return this.fileBaseUrl+ str
            }
        },
        handleClose () {
            let row = this.itemVideo
            row.videoTime =  this[this.videoCon].currentTime();
            this[this.videoCon].pause();
            this.$emit('closVideoMadel', row)
        },
        initVideo() {
            let _this = this;
            //初始化视频方法
            this[this.videoCon] = Video(this.$refs[this.videoRef],
                {
                    controls: true,
                    autoplay: true,
                    preload: "auto",
                    width: "900px",
                    height: "600px",
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
                function () {
                    let fullScreen = getRanNum(11)
                    let ctrlBar = createEle(); // 创建一个div节点
                    this.el().appendChild(ctrlBar);  // 添加进去，css设置好样式就可以了
                    let barHtml = `
                        <div class="video-bar">
                            <span>收藏</span>
                            <span class="video-star">点赞</span>
                        </div>`
                        // <span id="${fullScreen}">全屏</span>
                    let bar = document.createElement('div');
                    bar.innerHTML = barHtml;
                    this.controlBar.el().appendChild(bar);
                    this.currentTime(_this.itemVideo.videoTime);
                    this.load();
                    this.play();
                }            
            );
        },
        // 项目点赞
        async thumbsUp(item) {
            let queryData = {
                ItemId: item.ItemId,
                LikeType: 1,
                IsDelete: item.islikes
            }
            let thumbsUpMsg = await setthumbsUp(queryData);
            if (item.islikes) {
                this.$set(item, 'likes', item.likes - 1)
            } else {
                this.$set(item, 'likes', item.likes + 1)
            }
            this.$set(item, 'islikes', !item.islikes)
        },
        async somePraise(item) {
            let queryData = {
                ItemId: item.ItemId,
                CommentsId: item.CommentsId,
                LikeType: 0,
                IsDelete: !item.IsCoutReply
            }
            let msg = await setthumbsUp(queryData);
            // console.log(item)
            if (msg) {
            }
        },
        //评论
        async commentValue(row, val) {
            let queryData = {
                ItemId: row.ItemId,
                IsReply: false,
                Message: val,
                ScopeType: 0
            }
            let commentMsg = await setComments(queryData)
            await window.location.reload();
            if (!commentMsg) {
                this.$set(row, 'commentss', row.commentss + 1)
            }
        },
        // 评论回复
        async discussValue(row, val) {
            let queryData = {
                ItemId: row.ItemId, // 项目ID
                IsReply: true, // 回复
                ReplyId: row.CommentsId, // 被回复说说的Id  是取CommentsId 还是ReplyId
                ReplyUserId: row.UserId,// 被回复说说发布的ID ReplyUserId
                Message: val,
                ScopeType: 0 // 项目评论
            }
            let commentMsg = await setComments(queryData)
            if (commentMsg) {
                this.$Message.success('回复成功！')
            }
        },
        // 转发
        Forward () {
            this.configShare.isModal = true;
        },
    }
};
function createEle (){
      var _html = `
        <div></div>
        <div class="play-box">
          <div class="play-box-dian" onclick="clickPlay">
            点赞
          </div>
          <div class="vol-box fr">
            收藏
          </div>
        </div>
      `;
      let ctrlBar = document.createElement('div');
      ctrlBar.className = 'vjs-mycontrol-bar';
      ctrlBar.innerHTML = _html;
      return ctrlBar;
}
function clickPlay () {
}
</script>
<style lang="less" scoped>
    /* 屏蔽双击放大 */
    .vjs-tech {
        pointer-events: auto;
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
        margin-right: 20px;
        z-index: 23;
        &-dian {
            cursor: pointer;
            margin-right: 30px;
        }
    }
    .video-bar {
        display: flex;
        line-height: 36px;
        padding: 0 10px;
    }
    .video-star {
        margin: 0 10px;
    }
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
    #view {
        width: 900px;
        height: 600px;
        position: relative;
        background: rgba(0, 0, 0, .6)
    }
    .view-box {
        position: fixed;
        width: 1200px;
        height: 600px;
        z-index: 99;
        top: 50%;
        left: 49.5%;
        transform: translate(-50%, -50%);
        display: flex;
    }
    .view-box-model {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .3);
        z-index: 999;
    }
    .view-box-right {
        width: 300px;
        background: #F5F6F5;
    }
    .details-box {
            width: 270px;
            background: #ffffff;
            padding: 0 15px;
            font-size: 12px;
            margin: 20px auto;
            border-radius: 5px;
            ul {
                padding-bottom: 10px;
            }
            &-brief {
                padding-bottom: 10px;
            }
            &-img {
                display: flex;
                padding: 10px 0;

                &-img {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #dddddd;
                    overflow: hidden;
                }

                &-right {
                    margin-left: 10px;
                    height: 40px;
                }
            }

            &-list {
                height: 20px;

                &-title {
                    width: 60px;
                    display: inline-block;
                    text-align: justify;
                    height: 20px;
                }

                &-title:after {
                    content: '';
                    width: 100%;
                    display: inline-block;
                }

                &-content {
                    width: 170px;
                    padding-left: 10px;
                    display: inline-block;
                    height: 20px;
                }

                &-content:after {
                    content: '';
                    width: 100%;
                    display: inline-block;
                }
            }
        }
</style>