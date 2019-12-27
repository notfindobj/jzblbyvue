<template>
    <crollBox :isLast="isLast" @willReachBottom ="willReachBottom" >
        <div class="container-box">
            <div class="container">
                <div class="editor-jzbl">
                    <proRele :editorName="editorName" @clickEditor="clickEditor" @relSuccessfully="relSuccessfully"/>
                </div>
                <video-item
                    v-for="(item, index) in videoList"
                    :key="item.TalkId"
                    :videoInfo="item || {}"
                    :index="index"
                    @clickMenu="clickMenu"
                ></video-item>
            </div>
            <nominate valType="2"/>
        </div>
        <ToTop></ToTop>
        <Page v-show="pageNum > 4" :current="pageNum"  :total="records" show-elevator @on-change="onChangePage"/>
    </crollBox>
</template>

<script>
    import VideoModal from '../../components/video/videoModal'
    import VideoItem from '../../components/projectType/video'
    import ToTop from '../../components/toTop'
    import crollBox from '../../components/crollBox'
    import nominate from '../../components/nominate'
    import proRele from "../../components/proRele"
    import { setComments, setthumbsUp, setCollection, setFollow, ItemOperat, getUserProAndFans, getRecommend} from '../../service/clientAPI'
    import { _throttle } from '../../plugins/untils/public'
    import {mapGetters, mapState} from 'vuex'
    export default {
        layout: 'main',
        components: {
            'video-modal': VideoModal,
            'video-item': VideoItem,
            ToTop,
            crollBox,
            nominate,
            proRele
        },
        data() {
            return {
                editorName: 'sp',
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
            let queryData = {
                TalkType: 99,
                Page: 1
            };
            const data = await store.dispatch('getTalk', {queryData});
            if (data.retModels && data.retModels instanceof Array) {
                data.retModels.forEach(element => {
                    if (element.imglistNew) { 
                        element.videoList = []
                        element.imglistNew.replace(',', '')
                        element.videoList = [ {
                            smallImgUrl: element.smallImgUrl,
                            videoUrl: element.imglistNew
                        }]
                    }
                });
            }
            if (data) {
                return {
                    videoList: data.retModels || [],
                    total: data.paginationData ? data.paginationData.total : 0
                }
            } else {
                return {
                    videoList:[],
                    total: 0
                }
            }
        },
        methods: {
            clickEditor (val) {
                this.editorName = val
            },
            relSuccessfully () {

            },
            // 点击头像，去个人中心
            goPersonalCenter(item) {
                this.$router.push({
                name: 'HeAndITribal-id',
                    query: {
                        id: item.UserId
                    }
                })
            },
            async clickMenu (row, item, index) {
                let qieryData = {
                    "ItemId": row.ItemId,
                    "TalkType": row.TalkType,
                    "Follow": { // 关注
                        "UserId": row.UserId,
                        "IsDelete": row.IsFollow
                    },
                    "OperateId": item.OperateId,
                    "OperatValue": item.OperatValue
                }
                if (item.OperatValue !== "FollowThisUser" && item.OperatValue !== "UnfollowThisUser") {
                    qieryData.Follow = {}
                }
                if (item.OperatValue == "Delete" ) {
                    this.$Modal.confirm({
                        title: '删除项目',
                        content: '<p>请否确定删除项目!</p>',
                        onOk: async () => {
                            let msg = await ItemOperat (qieryData);
                            if (msg) { 
                            if (item.OperatValue == "Delete") {
                                this.videoList.splice(index, 1);
                                return false
                            }
                            }
                        },
                        onCancel: () => {
                            return false
                        }
                    });
                    return false
                }
                let msg = await ItemOperat (qieryData);
                if (msg) {
                    // 关注
                    if (item.OperatValue == "FollowThisUser") {
                        this.$set(row, 'IsFollow', !row.IsFollow);
                        this.$set(item, 'OperatName', '取消关注');
                        this.$set(item, 'OperatValue', 'UnfollowThisUser');
                        return false
                    }
                    // 取消关注
                    if (item.OperatValue == "UnfollowThisUser") {
                        this.$set(row, 'IsFollow', !row.IsFollow);
                        this.$set(item, 'OperatName', '关注');
                        this.$set(item, 'OperatValue', 'FollowThisUser');
                        return false
                    }
                    if (item.OperatValue == "Delete") {
                        this.videoList.splice(index, 1);
                        return false
                    }
                }
            },
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
                let queryData = {
                    TalkType: '99',
                    Page: this.pageNum
                };
                const data = await this.$store.dispatch('getTalk', {queryData});
                if (data.retModels && data.retModels instanceof Array) {
                    data.retModels.forEach(element => {
                        if (element.imglistNew) {
                            element.videoList = []
                            element.imglistNew.replace(',', '')
                            element.videoList = [ {
                                smallImgUrl: element.smallImgUrl,
                                videoUrl: element.imglistNew
                            }]
                        }                        
                    });
                } else {
                    return false
                }
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
    .editor-jzbl {
        background: #fff;
    }
    .container-box {
      width: 1200px;
      margin: 0 auto;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }
    .ivu-page {
      text-align: center;
    }
    .container {
        width: 850px;
        display: inline-block;
    }
</style>
