<template>
    <div class="videod">
        <div class="videod-title" v-html="videoDetails.TalkTitle"></div>
        <video ref="videoRef" :poster="videoDetails.ResourceObj[0].smallImgUrl" class="vjs-matrix video-js vjs-big-play-centered">
            <source :src="videoDetails.ResourceObj[0].videoUrl" type="video/mp4" >
        </video>
        <commentsCon
            :publish="videoDetails"
            @thumbsUp="thumbsUp"
            @Collection="Collection"
            @Forward="Forward"
        />
        <share :config="configModal" :qrcodeContent="qrcodeContent"/>
        <ToTop/>
    </div>
</template>
<script>
import Video from 'video.js'
import 'video.js/dist/video-js.css'
import {getRanNum} from '../../plugins/untils/public'
import commentsCon from '../../components/commentBox/commentsCon'
import ToTop from '../../components/toTop'
import share from '../../components/share'
import { setthumbsUp, setCollection, setFollow, setComments, recordFrequency, downloadFile, delComment} from '../../service/clientAPI'
export default {
    name: "videoBox",
    layout: 'main',
    data () {
        return {
            videoCon: null,
            videoDetails: {},
            resourcesVideo:{},
            commentsData: [],
            configModal: {
                isModal: false
            },
            qrcodeContent: {}
        }
    },
    components: {
        commentsCon,
        ToTop,
        share
    },
    async asyncData({route, store,params}) {
        const data = await store.dispatch('getQADetail', params.id);
        let queryData ={
            ItemId: params.id,
            ScopeType: 2
        }
        const cmsg = await store.dispatch('getGetComments', queryData);
        return {
            resourcesVideo: data.Imgs? data.Imgs[0].videoUrl : {},
            videoDetails: data,
            commentsData: cmsg
        } 
    },
    mounted () {
        this.initVideo()
    },
    methods: {
        initVideo() {
            let _this = this;
            //初始化视频方法
            this[this.videoCon] = Video(this.$refs.videoRef, {
                //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                controls: true,
                //自动播放属性,muted:静音播放
                autoplay: false,
                muted: true,
                //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                preload: "meta",
                //设置视频播放器的显示宽度（以像素为单位）
                width: "1200px",
                //设置视频播放器的显示高度（以像素为单位）
                height: "800px",
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
        // 项目点赞
        async thumbsUp(item) {
            let queryData = {
                ItemId: item.ItemId,
                LikeType: item.TalkType,
                IsDelete: item.itemOperateData.IsLike
            }
            let thumbsUpMsg = await setthumbsUp(queryData);
            if (thumbsUpMsg) {
                if (item.itemOperateData.IsLike) {
                    this.$set(item.itemOperateData, 'LikeCount', item.itemOperateData.LikeCount - 1)
                } else {
                    this.$set(item.itemOperateData, 'LikeCount', item.itemOperateData.LikeCount + 1)
                }
                this.$set(item.itemOperateData, 'IsLike', !item.itemOperateData.IsLike)
            }
        },
        async somePraise(item) {
            let queryData = {
                ItemId: item.ItemId,
                CommentsId: item.CommentsId,
                LikeType: 0,
                IsDelete: item.islikes
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
        // 收藏
        async Collection(item) {
            let queryData = {
                ItemId: item.ItemId,
                TalkType: item.TalkType,
                IsDelete: item.iscollections
            }
            let collectionMsg = await setCollection(queryData)
            if (collectionMsg) {
                if (item.itemOperateData.IsCollection) {
                    this.$set(item.itemOperateData, 'CollectionCount', item.itemOperateData.CollectionCount - 1)
                } else {
                    this.$set(item.itemOperateData, 'CollectionCount', item.itemOperateData.CollectionCount + 1)
                }
                this.$set(item.itemOperateData, 'IsCollection', !item.itemOperateData.IsCollection)
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
            if (commentMsg) {
                this.$set(row, 'commentss', row.commentss + 1);
                // 根据项目详情请求评论信息
                let Comment = {
                    itemId: this.$route.params.id,
                    ScopeType: 2
                }
                let msg = await this.$store.dispatch('getGetComments', Comment);
                if (msg) {
                    this.commentsData = msg
                }
            }
        },
        async delComments (row) {
            let msg = await delComment(row.CommentsId)
            if (msg) {
                // 根据项目详情请求评论信息
                let Comment = {
                    itemId: this.$route.params.id,
                    ScopeType: 2
                }
                let msg = await this.$store.dispatch('getGetComments', Comment);
                if (msg) {
                    this.commentsData = msg
                }
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
                ScopeType: 2// 项目评论
            }
            let commentMsg = await setComments(queryData)
            if (commentMsg) {
                this.$Message.success('回复成功！')
                // 根据项目详情请求评论信息
                let Comment = {
                    itemId: this.$route.params.id,
                    ScopeType: 2
                }
                let msg = await this.$store.dispatch('getGetComments', Comment);
                if (msg) {
                    this.commentsData = msg
                }
            }
        },
        // 关注
        async setFollow(item) {
            let queryData = {
                UserId: item.UserId,
                IsDelete: item.IsFollow
            }
            let collectionMsg = await setFollow(queryData)
            this.$set(item, 'IsFollow', !item.IsFollow)
        },
        // 转发
        Forward (row) {
            this.qrcodeContent = row;
            this.configModal.isModal = true;
        },
    },
}
</script>
<style lang="less" scoped>
    .videod {
        width: 1200px;
        margin: 0 auto;
        background: #fff;
        margin-top: 10px;
        &-title {
            text-align: center;
            font-size: 16px;
            line-height: 30px;
        }
    }
</style> 