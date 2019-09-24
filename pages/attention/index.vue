<template>
    <div>
        <crollBox :isLast="isLast" @willReachBottom ="willReachBottom" >
            <div class="container">
                <template v-for="(item, index) in attentionList">
                    <ImageAndText
                        :key="index"
                        v-if="item.TalkType !== 2"
                        :itemInfo="item"
                        :index="index"
                        @clickCollection="clickCollection"
                        @clickLike="clickLike"
                        @clickMenu="clickMenu"
                    ></ImageAndText>
                    <VideoItem
                        :key="index"
                        v-if="item.TalkType === 2"
                        :videoInfo="item"
                        :index="index"
                        @clickCollection="clickCollection"
                        @clickLike="clickLike"
                        @clickMenu="clickMenu"
                    ></VideoItem>
                </template>
                <div v-if="attentionList.length <= 0" class="attentionListSty">
                    暂无关注数据
                </div>
            </div>
            <ToTop ></ToTop>
            <Page v-show="pageNum > 4" :current="pageNum"  :total="records" show-elevator @on-change="onChangePage"/>
        </crollBox>
    </div>
</template>

<script>
    import ImageAndText from '../../components/projectType/imageAndText'
    import VideoItem from '../../components/projectType/video'
    import ToTop from '../../components/toTop'
    import crollBox from '../../components/crollBox'
    import { _throttle } from '../../plugins/untils/public'
    import { setComments, setthumbsUp, setCollection, setFollow, ItemOperat } from '../../service/clientAPI'
    export default {
        layout: 'main',
        name: 'attention',
        middleware: 'authenticated',
        data() {
            return {
                pageNum: 1,
                attentionList: [],
                isLast: false,
                records: 0,
                total: 0,   // 总页数
            }
        },
        components: {
            ImageAndText,
            VideoItem,
            crollBox,
            ToTop
        },
        methods: {
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
                                this.attentionList.splice(index, 1);
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
                        this.attentionList.splice(index, 1);
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
                this.isLast = false;
                if (this.pageNum >= this.total) {
                    this.$Message.info('已经是最后一页了');
                    return false;
                }
                this.pageNum++;
                this.getList();
            }, 1500),
            // 点击收藏
            clickCollection(index, flag) {
                setCollection({
                    ItemId: this.attentionList[index].ItemId,
                    ItemName: this.attentionList[index].TalkTitle,
                    ItemTitleImg: '',
                    IsDelete: !flag,
                    TalkType: this.attentionList[index].TalkType
                }).then(() => {
                    let dataInfo = JSON.parse(JSON.stringify(this.attentionList[index]));
                    dataInfo.itemOperateData.IsCollection = flag;
                    flag ? dataInfo.itemOperateData.CollectionCount += 1 : dataInfo.itemOperateData.CollectionCount -= 1;
                    this.$set(this.attentionList, index, dataInfo);
                })
            },
            // 点击点赞
            clickLike(index, flag) {
                setthumbsUp({
                    ItemId: this.attentionList[index].ItemId,
                    LikeType: this.attentionList[index].TalkType,
                    CommentsId: '',
                    IsDelete: !flag
                }).then(() => {
                    let itemInfo = JSON.parse(JSON.stringify(this.attentionList[index]));
                    itemInfo.itemOperateData.IsLike = flag;
                    flag ? itemInfo.itemOperateData.LikeCount += 1 : itemInfo.itemOperateData.LikeCount -= 1;
                    this.$set(this.attentionList, index, itemInfo);
                })
            },
            // 获取数据
            async getList(row, type) {
                const data = await this.$store.dispatch('getAttentionList', {
                    Page: this.pageNum,
                    Rows: 10
                });
                if (type === 1) {
                    this.attentionList = [];
                    this.attentionList = data.retModels;
                } else {
                    this.attentionList = this.attentionList.concat(data.retModels);
                }
                this.total = data.paginationData.total;
                this.pageNum = data.paginationData.page;
                this.records = data.paginationData.records;
            },
        },
        async asyncData({ store }) {
            const data = await store.dispatch('getAttentionList', {
                Page: 1,
                Rows: 10
            });
            return {
                attentionList: data.retModels,
                total: data.paginationData.total
            }
        }
    }
</script>

<style lang="less" scoped>
    .attentionListSty {
        text-align: center;
        font-size: 20px;
    }
    .ivu-page {
        text-align: center;
    }
    @import "~assets/css/ModulesStyle/index.less";
</style>
