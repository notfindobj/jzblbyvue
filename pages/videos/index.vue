<template>
    <crollBox :isLast="isLast" @willReachBottom ="willReachBottom" >
        <div class="container">
            <video-item
                v-for="(item, index) in videoList"
                :key="item.TalkId"
                :videoInfo="item || {}"
                :index="index"
            ></video-item>
        </div>
        <ToTop :isShowToTop="false"></ToTop>
        <Page v-show="pageNum > 4" :current="pageNum"  :total="records" show-elevator @on-change="onChangePage"/>
    </crollBox>
</template>

<script>
    import VideoModal from '../../components/video/videoModal'
    import VideoItem from '../../components/projectType/video'
    import ToTop from '../../components/toTop'
    import crollBox from '../../components/crollBox'
    import { setComments, setthumbsUp, setCollection, setFollow } from '../../service/clientAPI'
    import { _throttle } from '../../plugins/untils/public'
    export default {
        layout: 'main',
        middleware: 'authenticated',
        components: {
            'video-modal': VideoModal,
            'video-item': VideoItem,
            ToTop,
            crollBox
        },
        data() {
            return {
                fileBaseUrl: process.env.fileBaseUrl,   // 文件的域名
                pageNum: 1,
                videoList: [],
                isLast: false,
                records: 0,
                nextList: [],    // 下一页数据
                total: 0,   // 总页数
                isShowModal: false, // 是否显示弹框
                videoInfo: {},  // 弹框视频的信息
                watchIndex: '', // 当前视频的index
            }
        },
        async asyncData({ store }) {
            const data = await store.dispatch('getTalk', {
                TalkType: 2,
                Page: 0
            })
            console.log(data);
            return {
                data,
                videoList: data.retModels,
                total: data.paginationData.total
            }
        },
        methods: {
            onChangePage (num, type = 1) {
                this.pageNum = num;
                this.getList(num, type);
                (function smoothscroll(){
                    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                    if (currentScroll > 0) {
                        window.requestAnimationFrame(smoothscroll);
                        window.scrollTo (0,currentScroll - (currentScroll/5));
                    }
                })();
            },
            // 触底事件
            willReachBottom: _throttle(function () {
                if (this.total === 1) {
                    this.isLast = true
                    return false
                }
                 this.isLast = false
                if (this.pageNum >= this.total) {
                    this.$Message.info('已经是最后一页了');
                    return false;
                }
                this.pageNum++;
                this.getList();
            }, 1500),
            // 获取数据
            async getList(row, type) {
                const data = await this.$store.dispatch('getTalk', {
                    TalkType: 2,
                    Page: this.pageNum
                });
                if (data) {
                    if (type === 1) {
                        this.videoList = [];
                        this.videoList = data.retModels;
                    } else {
                        this.videoList = this.videoList.concat(data.retModels);
                    }    
                    this.total = data.paginationData.total;
                    this.pageNum = data.paginationData.page;
                    this.records = data.paginationData.records;
                }
            }
        },
        mounted() {
            this.pageNum++;
            this.getList();
        }
    }
</script>

<style lang="less" scoped>
    .ivu-page {
      text-align: center;
    }
    .container {
        width: 1200px;
        margin: 30px auto;
    }
</style>
