<template>
    <div v-transfer-dom class="view-box-model" @click="handleClose" @keyup.esc="handleClose()" tabindex='1'>
        <div class="view-box" @click.stop>
             <div id="view">
                <video :ref="videoRef" :poster="baseUrlRegExp(itemVideo.smallImgUrl)" class="vjs-matrix video-js vjs-big-play-centered">
                    <source :src="baseUrlRegExp(itemVideo.videoUrl)" type="video/mp4" >
                </video>
             </div>
             <div class="close-box" @click="handleClose">
                <Icon type="ios-close-circle-outline" size="36" color="#fff"/>
            </div>
             <div class="view-box-right" @selectstart="selectstart">
               <div class="details-box">
                 <div class="details-box-img">
                   <div class="details-box-img-img">
                       <img :src="detaDetails.HeadIcon " style="width: 100%;height: 100%;" alt="">
                   </div>
                   <div class="details-box-img-right">
                     <p>{{detaDetails.NickName}}</p>
                     <p>发布日期：{{detaDetails.CreateDate}}</p>
                   </div>
                 </div>
                 <div class="details-box-brief">
                    <emotHtml v-model="detaDetails.TalkTitle"/>
                 </div>
               </div>
               <commentsCon
                    :publish="detaDetails"
                    @thumbsUp="thumbsUp"
                    @Collection="Collection"
                    @commentValue="commentValue"
                    @discussValue="discussValue"
                    @somePraise="somePraise"
               />
               <share :config="configShare"/>
             </div>
        </div>
    </div>
</template>
<script>
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import commentsCon from '../comments/commentsCon'
import share from '../../components/share'
import {getRanNum} from '../../plugins/untils/public'
import { setthumbsUp, setCollection, setFollow, setComments, getComments, recordFrequency, downloadFile} from '../../service/clientAPI'
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
            comments: [],
            isShowViewBox: true,
            videoRef: '',
            videoCon: '',
        }
    },
     created () {
        this.videoRef = getRanNum(9);
        this.videoCon = getRanNum(10);
        this.getCommentsList()
    },
    mounted() { 
        this.initVideo();
        document.addEventListener('keydown', this.EscClose);
    },
    beforeDestroy () {
        document.removeEventListener('keydown', this.EscClose);
    },
    methods: {
        EscClose (e) {
            if (!this.configShare.isModal) {
                if (e.keyCode === 27) {
                    this.handleClose()
                }
            }
        },
        selectstart () {
            return false
        },
        async getCommentsList () {
            let queryData = {
                ItemId: this.detaDetails.ItemId,
                ItemImgSrc: '',
                ScopeType: 2
            }
            let msg = await getComments(queryData);
            if (msg) {
                this.comments = msg;
            }
        },
        baseUrlRegExp (str) {
            let reg = RegExp(/\http:\/\//);
            if(str && str.match(reg)){
                return str
            } else {
                return this.fileBaseUrl+ str
            }
        },
        // 关闭按钮
        handleClose () {
            let row = JSON.parse(JSON.stringify(this.itemVideo));
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
                    let fullScreen = getRanNum(11);
                    let favorite = getRanNum(5);
                    let dianzan = getRanNum(4);
                    let IsLike = _this.detaDetails.itemOperateData.IsLike;
                    let IsCollection = _this.detaDetails.itemOperateData.IsCollection;
                    let barHtml = `
                        <div class="video-bar">
                            <span class="video-star iconfont ${IsLike ? 'icon-like-b' : 'icon-dianzan1'}" data-attr="${IsLike}" style="color: ${IsLike? '#FF3C00': ''}" id="${dianzan}"></span>
                            <span class="iconfont ${IsCollection ? 'icon-cc-star': 'icon-favorite'}" style="color: ${IsLike? '#FF3C00': ''}" id="${favorite}" data-attr="${IsCollection}"></span>
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
                    this.currentTime(_this.itemVideo.videoTime);
                    this.load();
                    this.play();
                }            
            );
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
        setDom (domId) {
            if (domId) {
                let dataDom = document.getElementById(domId);
                let data = dataDom.getAttribute('data-attr');
                if (data === 'true') {
                    dataDom.style.color = '';
                    if (domId.length === 4) {
                        dataDom.classList.remove('icon-like-b')
                        dataDom.classList.add('icon-dianzan1')
                    } else {
                        dataDom.classList.remove('icon-cc-star')
                        dataDom.classList.add('icon-favorite')
                    }
                    dataDom.setAttribute('data-attr', 'false');
                } else {
                    dataDom.style.color = '#FF3C00';
                    if (domId.length === 4) {
                        dataDom.classList.remove('icon-dianzan1');
                        dataDom.classList.add('icon-like-b');
                    } else {
                        dataDom.classList.remove('icon-favorite');
                        dataDom.classList.add('icon-cc-star');
                    }
                    dataDom.setAttribute('data-attr', 'true');
                }
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
        // 评论点赞
        async somePraise(item) {
            let queryData = {
                ItemId: item.ItemId,
                CommentsId: item.CommentsId,
                LikeType: 0,
                IsDelete: !item.IsCoutReply
            }
            let msg = await setthumbsUp(queryData);
            if (msg) {
                if (item.islikes) {
                    this.$set(item, 'LikeCount', item.LikeCount - 1)
                } else {
                    this.$set(item, 'LikeCount', item.LikeCount + 1)
                }
                this.$set(item, 'islikes', !item.islikes)
            }
        },
        //评论
        async commentValue(row, val) {
            let queryData = {
                ItemId: row.ItemId,
                IsReply: false,
                Message: val,
                ScopeType: 2
            }
            let commentMsg = await setComments(queryData)
            // await window.location.reload();
            if (commentMsg) {
                this.getCommentsList();
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
                ScopeType: 2 // 项目评论
            }
            let commentMsg = await setComments(queryData)
            if (commentMsg) {
                this.$Message.success('回复成功！');
                this.getCommentsList()
            }
        },
        // 转发
        Forward () {
            this.configShare.isModal = true;
        },
    }
};
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
    .close-box {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -14px;
        right: 16px;
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
        width: 1230px;
        height: 600px;
        z-index: 99;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
    }
    .view-box-model {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, .8);
        z-index: 1999;
    }
    .view-box-right {
        width: 330px;
        background: #F5F6F5;
        width: 300px;
        background: #F5F6F5;
        // -webkit-user-select:none;
        // -moz-user-select:none;
        // -ms-user-select:none;
        // user-select:none;
    }
    .details-box {
            background: #ffffff;
            padding: 0 15px;
            font-size: 12px;
            margin: 10px auto;
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