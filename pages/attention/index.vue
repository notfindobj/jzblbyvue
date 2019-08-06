<template>
    <div>
        <Scroll :on-reach-bottom="handleReachBottom" height="800">
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
                <!--            <div class="public-block recommend">-->
                <!--                <div class="recommend-title">-->
                <!--                    <i class="icon iconfont">&#xe60b;</i>-->
                <!--                    <span>推荐</span>-->
                <!--                </div>-->
                <!--                <div class="recommend-list">-->
                <!--                    <div class="recommend-item">-->
                <!--                        <div class="img-wrap"></div>-->
                <!--                        <div class="name">-->
                <!--                            张小杰-->
                <!--                            <div class="hidden-box">-->
                <!--                                <div class="avatar"></div>-->
                <!--                                <p class="user-name">杨小幂</p>-->
                <!--                                <div class="user-data">-->
                <!--                                    <div class="data data-left">-->
                <!--                                        <span class="data-name">项目</span>-->
                <!--                                        <span class="data-value">1334</span>-->
                <!--                                    </div>-->
                <!--                                    <div class="line"></div>-->
                <!--                                    <div class="data data-left">-->
                <!--                                        <span class="data-name">粉丝</span>-->
                <!--                                        <span class="data-value">1.3万</span>-->
                <!--                                    </div>-->
                <!--                                </div>-->
                <!--                                <div class="hidden-btns">-->
                <!--                                    <Button size="small" type="primary">关注</Button>-->
                <!--                                    <Button size="small">私信</Button>-->
                <!--                                </div>-->
                <!--                            </div>-->
                <!--                        </div>-->
                <!--                        <p class="info">一个有态度的设计师，给你精彩</p>-->
                <!--                    </div>-->
                <!--                    <div class="recommend-item">-->
                <!--                        <div class="img-wrap"></div>-->
                <!--                        <div class="name">张小杰</div>-->
                <!--                        <p class="info">一个有态度的设计师，给你精彩</p>-->
                <!--                    </div>-->
                <!--                    <div class="recommend-item">-->
                <!--                        <div class="img-wrap"></div>-->
                <!--                        <div class="name">张小杰</div>-->
                <!--                        <p class="info">一个有态度的设计师，给你精彩</p>-->
                <!--                    </div>-->
                <!--                    <div class="recommend-item">-->
                <!--                        <div class="img-wrap"></div>-->
                <!--                        <div class="name">张小杰</div>-->
                <!--                        <p class="info">一个有态度的设计师，给你精彩</p>-->
                <!--                    </div>-->
                <!--                    <div class="to-pre">-->
                <!--                        <i class="icon iconfont">&#xe62e;</i>-->
                <!--                    </div>-->
                <!--                    <div class="to-next">-->
                <!--                        <i class="icon iconfont">&#xe62e;</i>-->
                <!--                    </div>-->
                <!--                </div>-->
                <!--            </div>-->
            </div>
            <ToTop :isShowToTop="false"></ToTop>
        </Scroll>
    </div>
</template>

<script>
    import ImageAndText from '~/components/projectType/imageAndText'
    import VideoItem from '~/components/projectType/video'
    import ToTop from '../../components/toTop'
    import { setComments, setthumbsUp, setCollection, setFollow } from '../../service/clientAPI'

    export default {
        layout: 'main',
        middleware: 'authenticated',
        data() {
            return {
                pageNum: 1,
                attentionList: [],
                total: 0,   // 总页数
            }
        },
        components: {
            ImageAndText,
            VideoItem,
            ToTop
        },

        methods: {
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

                    // // 如果是点击的弹框中的，就更新videoInfo
                    // if (this.isShowModal) {
                    //   this.$set(this.dataList, 'itemOperateData', dataInfo.itemOperateData)
                    // }
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
            async getList() {
                const data = await this.$store.dispatch('getAttentionList', {
                    Page: this.pageNum,
                    Rows: 10
                });

                this.attentionList = this.attentionList.concat(data.retModels);
                this.total = data.paginationData.total;
            },

            // 触底事件
            handleReachBottom() {
                if (this.pageNum >= this.total) {
                    this.$Message.info('已经是最后一页了');
                    return false;
                }
                this.pageNum++;
                this.getList();
            }
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
    @import "~assets/css/ModulesStyle/index.less";
</style>
