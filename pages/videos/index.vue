<template>
    <Scroll :on-reach-bottom="handleReachBottom" height="800">
        <div class="container">
            <video-item
                v-for="(item, index) in videoList"
                :key="item.TalkId"
                :videoInfo="item"
                :index="index"
                @clickVideo="clickVideo(item, index)"
                @clickCollection="clickCollection"
                @clickLike="clickLike"
            ></video-item>
        </div>
        <video-modal
            :isShowModal="isShowModal"
            :videoInfo="videoInfo"
            @closeModal="closeVideoModal"
            @likeSuccess="likeSuccess"
            @collectionSuccess="collectionSuccess"
        />
        <ToTop :isShowToTop="false"></ToTop>
    </Scroll>

</template>

<script>
    import VideoModal from '~/components/video/videoModal'
    import VideoItem from '~/components/projectType/video'
    import ToTop from '../../components/toTop'
    import { setComments, setthumbsUp, setCollection, setFollow } from '../../service/clientAPI'

    export default {
        layout: 'main',
        components: {
            'video-modal': VideoModal,
            'video-item': VideoItem,
            ToTop
        },
        data() {
            return {
                fileBaseUrl: process.env.fileBaseUrl,   // 文件的域名
                pageNum: 1,
                videoList: [],
                nextList: [],    // 下一页数据
                total: 0,   // 总页数
                isShowModal: false, // 是否显示弹框
                videoInfo: {},  // 弹框视频的信息
                watchIndex: '', // 当前视频的index
            }
        },
        methods: {
            // 获取数据
            async getList() {
                const data = await this.$store.dispatch('getTalk', {
                    TalkType: 2,
                    Page: this.pageNum
                });

                this.nextList = data.retModels;
                this.total = data.paginationData.total

            },
            // 点击视频
            clickVideo(video, index) {
                this.videoInfo = video;
                this.watchIndex = index;
                this.isShowModal = true;
            },
            // 关闭视频弹框
            closeVideoModal() {
                this.isShowModal = false;
            },
            // 弹出框点赞成功
            likeSuccess(flag) {
                this.clickLike(this.watchIndex, flag);
            },
            // 收藏
            collectionSuccess(flag) {
                this.clickCollection(this.watchIndex, flag);
            },
            // 点击点赞
            clickLike(index, flag) {
                setthumbsUp({
                    ItemId: this.videoList[index].ItemId,
                    LikeType: 2,
                    CommentsId: '',
                    IsDelete: !flag
                }).then(() => {
                    let videoInfo = JSON.parse(JSON.stringify(this.videoList[index]));
                    videoInfo.itemOperateData.IsLike = flag;
                    flag ? videoInfo.itemOperateData.LikeCount += 1 : videoInfo.itemOperateData.LikeCount -= 1;
                    this.$set(this.videoList, index, videoInfo);

                    // 如果是点击的弹框中的，就更新videoInfo
                    if (this.isShowModal) {
                        this.$set(this.videoInfo, 'itemOperateData', videoInfo.itemOperateData)
                    }
                })
            },
            // 点击收藏
            clickCollection(index, flag) {
                setCollection({
                    ItemId: this.videoList[index].ItemId,
                    ItemName: this.videoList[index].TalkTitle,
                    ItemTitleImg: '',
                    IsDelete: !flag,
                    TalkType: 2
                }).then(() => {
                    let videoInfo = JSON.parse(JSON.stringify(this.videoList[index]));
                    videoInfo.itemOperateData.IsCollection = flag;
                    flag ? videoInfo.itemOperateData.CollectionCount += 1 : videoInfo.itemOperateData.CollectionCount -= 1;
                    this.$set(this.videoList, index, videoInfo);

                    // 如果是点击的弹框中的，就更新videoInfo
                    if (this.isShowModal) {
                        this.$set(this.videoInfo, 'itemOperateData', videoInfo.itemOperateData)
                    }
                })
            },
            // 触底事件
            handleReachBottom() {
                this.pageNum++;
                this.getList();
                setTimeout(() => {
                    this.videoList = this.videoList.concat(this.nextList);
                    this.nextList = [];
                }, 1000)
            }
        },
        mounted() {
            this.pageNum++;
            this.getList();
        },
        async asyncData({ store }) {
            const data = await store.dispatch('getTalk', {
                TalkType: 2,
                Page: 0
            })

            return {
                data,
                videoList: data.retModels,
                total: data.paginationData.total
            }
        }
    }
</script>

<style lang="less" scoped>
    .container {
        width: 1200px;
        margin: 30px auto;
    }
</style>
