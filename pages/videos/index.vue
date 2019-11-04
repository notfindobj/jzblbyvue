<template>
    <crollBox :isLast="isLast" @willReachBottom ="willReachBottom" >
        <div class="container-box">
            <div class="container">
                <video-item
                    v-for="(item, index) in videoList"
                    :key="item.TalkId"
                    :videoInfo="item || {}"
                    :index="index"
                    @clickMenu="clickMenu"
                ></video-item>
            </div>
            <div class="container-right">
                <div class="user-title" @click="goPersonalCenter(userInfo)">
                    <div class="user-title-l">
                        <img :src="userInfo.HeadIcon" alt="">
                    </div>
                    <div class="user-title-r">
                        <p>{{userInfo.NickName}}</p>
                    </div>
                </div>
                <ul class="user-cont">
                    <li>
                        <span>项目：</span>
                        <span>{{UserProAndFans.proCount || 0}}</span>
                    </li>
                    <li>
                        <span>粉丝：</span>
                        <span>{{UserProAndFans.Fans || 0}}</span>
                    </li>
                </ul>
          </div>
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
    import { setComments, setthumbsUp, setCollection, setFollow, ItemOperat, getUserProAndFans} from '../../service/clientAPI'
    import { _throttle } from '../../plugins/untils/public'
    import {mapGetters, mapState} from 'vuex'
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
                UserProAndFans: {},
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
        computed: {
            ...mapState({
                userInfo: state => state.overas.auth? state.overas.auth: {}
            })
        },
        created () {
            this.getUserPro(this.userInfo.UserId)
        },
        async asyncData({ store }) {
            const data = await store.dispatch('getTalk', {
                TalkType: 2,
                Page: 0
            })
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
            // 点击头像，去个人中心
            goPersonalCenter(item) {
                this.$router.push({
                name: 'HeAndITribal-id',
                    query: {
                        id: item.UserId
                    }
                })
            },
            async getUserPro (id) {
                let msg = await getUserProAndFans(id)
                if (msg) {
                this.UserProAndFans = msg;
                }
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
        .container-box {
      width: 1200px;
      margin: 0 auto;
      text-align: left;
      display: flex;
      justify-content: space-between;
    }
    .container-right {
      width: 330px;
      background: #fff;
      margin-top: 10px;
      max-height:150px;
      position: sticky;
      top: 70px;
      text-align: center;
    }
    .user-title {
        cursor: pointer;
        display: flex;
        padding: 15px 25px 0;
        display: inline-block;
        &-l {
            border-radius: 50%;
            overflow: hidden;
            display: inline-block;
            width: 50px;
            height: 50px;
            img {
            width: 100%;
            height: 100%;
            }
        }
        &-r {
            margin-left: 15px;
            p {
            font-size: 16px;
            font-weight: bold;
            }
        }
    }
    .user-cont {
      padding: 15px 25px;
      display: flex;
      font-size: 16px;
      justify-content: space-around;
      li {
        flex: 1;
        display: flex;
        justify-content: center;
        position: relative;
        &:first-child {
          &::after {
            content: '';
            display: inline-block;
            width: 1px;
            position: absolute;
            right: 0;
            height: 100%;
            background: #d4d6d4;
          }
        }
      }
    }
    .ivu-page {
      text-align: center;
    }
    .container {
        width: 850px;
        display: inline-block;
    }
</style>
