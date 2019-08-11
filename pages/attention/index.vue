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
                    ></ImageAndText>
                    <VideoItem
                        :key="index"
                        v-if="item.TalkType === 2"
                        :videoInfo="item"
                        :index="index"
                        @clickCollection="clickCollection"
                        @clickLike="clickLike"
                    ></VideoItem>
                </template>
            </div>
            <!-- <ToTop :isShowToTop="false"></ToTop> -->
            <Page v-show="pageNum > 8" :current="pageNum"  :total="records" show-elevator @on-change="onChangePage"/>
        </crollBox>
    </div>
</template>

<script>
    import ImageAndText from '../../components/projectType/imageAndText'
    import VideoItem from '../../components/projectType/video'
    // import ToTop from '../../components/toTop'
    import crollBox from '../../components/crollBox'
    import { setComments, setthumbsUp, setCollection, setFollow } from '../../service/clientAPI'
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
            crollBox
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
            willReachBottom () {
                if (this.pageNum >= this.total) {
                    this.$Message.info('已经是最后一页了');
                    return false;
                }
                this.pageNum++;
                this.getList();
            },
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

                    // // 如果是点击的弹框中的，就更新videoInfo
                    // if (this.isShowModal) {
                    //   this.$set(this.videoInfo, 'itemOperateData', itemInfo.itemOperateData)
                    // }
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
    .ivu-page {
        text-align: center;
    }
    @import "~assets/css/ModulesStyle/index.less";
</style>
