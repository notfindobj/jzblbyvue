<template>
    <div class="picture">
        <div class="picture-left">
            <div >
                <div class="view-left-move-del" @mouseenter="mousemoveLeft(1)"
                    @mouseleave="mousemoveRight" @click="moveLeftClick(1)">
                    <img :src="!isLeft ? isLeftPngF : isLeftPngR" width="50px" alt="">
                </div>
                <div class="view-right-move-del" @mouseenter="mousemoveLeft(2)"
                    @mouseleave="mousemoveRight" @click="moveLeftClick(2)">
                    <img class="moveRight" :src="!isRight ? isLeftPngF : isLeftPngR" width="50px" alt="">
                </div>
                <div style="width：800px" id="pictureBox">
                    <div v-html="detailInfo.TalkContent"></div>
                    <!-- <div v-for="(items, index) in detailInfo.ResourceObj" :key="index">
                        <img :src="baseUrlRegExp(items.smallImgUrl)" :alt="items.fileName" >
                    </div> -->
                </div>
            </div> 
        </div>
        <div class="picture-right">
            <div class="picture-right-title">
                <img @click="goToPersonal(detailInfo)" :src="detailInfo.HeadIcon" alt="">
                <p>{{detailInfo.NickName}}</p>
                <div class="btn-guan">
                    关注
                </div>
            </div>
            <commentsCon
                :publish="detailInfo"
                :comments="commentsData"
                @thumbsUp="thumbsUp"
                @Collection="Collection"
                @commentValue="commentValue"
                @discussValue="discussValue"
                @somePraise="somePraise"
                @Forward="Forward"
                @delComment="delComments"
            />
        </div>
        <ToTop/>
    </div>
</template>
<script>
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import commentsCon from '../../components/comments/commentsCon.vue'
import { setthumbsUp, setCollection, setFollow, setComments, recordFrequency, downloadFile, delComment} from '../../service/clientAPI'
import ToTop from '../../components/toTop'
export default {
    name: "pictureBox",
    layout: 'main',
    components: {
        commentsCon,
        ToTop
    },
    async asyncData({ store, params }) {
        const data = await store.dispatch('getQADetail', params.id);
        let queryData ={
            ItemId: params.id,
            ScopeType: 2
        }
        const cmsg = await store.dispatch('getGetComments', queryData);
        return {
            detailInfo: data,
            commentsData: cmsg
        }
    },
    data () {
        return {
            commentsData: [],
            isShowViewBox: false,
            isLeftPngF: require('../../assets/images/leftButtonColor.png'),
            isLeftPngR: require('../../assets/images/leftButton.png'),
            isLeft: false,
            isRight: false,
            Viewer: {},
            itemLength: 0,
            itemIndex: 0,
            isBtnSile: true
        }
    },
    mounted() {
      this.initView()
    },
    methods: {
        baseUrlRegExp (str) {
            let reg = RegExp(/\http:\/\//);
            if(str && str.match(reg)){
                return str
            } else {
                return process.env.fileBaseUrl+ str
            }
        },
        initView() {
            const ViewerDom = document.getElementById('pictureBox');
            let _this = this;
            _this.$nextTick(() => {
                _this.Viewer = new Viewer(ViewerDom, {
                    url: 'data-original',
                    button: false,
                    toolbar: true,
                    navbar: true,
                    title: false,
                    zoomRatio: 0.4,
                    maxZoomRatio: 3,
                    show: function (e) {
                        _this.isShowViewBox = true;
                    },
                    view: function (e) {
                        _this.itemLength = document.querySelectorAll('.viewer-list > li').length;
                        _this.itemIndex = e.detail.index;
                    },
                    shown: function (e) {
                        _this.isBtnSile = true;
                        var that = e.target.viewer;
                        $(e.target.viewer.viewer).find(".viewer-canvas").on("dblclick", "img", function () {
                            that.hide();
                        });
                    },
                    hidden() {
                        _this.isBtnSile = false;
                        _this.viewShowBox()
                    }
                })
            })
        },
        moveLeftClick(val) {
            if (!this.isBtnSile) {
                this.$emit('pageTurning', val)
            } else {
                if (val === 2) {
                    if (this.itemLength - 1 === this.itemIndex) {
                        this.Viewer.close();
                        this.Viewer.hide();
                    } else {
                        this.Viewer.next()
                    } 
                }
                if (val === 1) {
                    if (this.itemIndex === 0) {
                        this.Viewer.close();
                        this.Viewer.hide();
                    } else {
                        this.Viewer.prev()
                    }
                }
            }
        },
        mousemoveLeft() {
            this.isLeft = true
            this.isRight = true
        },
        // 跳转部落
        goToPersonal (row) {
            this.$router.push({
                name: 'HeAndITribal-id',
                query: {
                    id: row.UserId
                }
            })
        },
        mousemoveRight() {
            this.isLeft = false
            this.isRight = false
        },
        viewShowBox() {
            document.getElementsByTagName('body')[0].className = '';
            document.body.style.paddingRight = '0';
            this.isShowViewBox = false;
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
                TalkType: 4,
                IsDelete: item.iscollections
            }
            let collectionMsg = await setCollection(queryData)
            if (item.iscollections) {
                this.$set(item, 'collections', item.collections - 1)
            } else {
                this.$set(item, 'collections', item.collections + 1)
            }
            this.$set(item, 'iscollections', !item.iscollections)
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
        Forward () {
            this.configShare.isModal = true;
        },
    },
}
</script>
<style lang="less" scoped>
    .picture {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        &-left {
            width: 850px;
            #pictureBox {
                img {
                    width: 100%;
                }
            }
        }
        &-right {
            width: 340px;
            margin-left: 10px;
            &-title {
                height: 170px;
                background: #fff;
                padding: 20px 0 0;
                text-align: center;
                margin-bottom: 10px;
                img {
                    width: 75px;
                    height: 75px;
                    cursor: pointer;
                    border-radius: 50%;
                }
                p {
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 0;
                    text-align: center;
                    margin-bottom: 11px;
                }
                div.btn-guan {
                    cursor: pointer;
                    width: 84px;
                    height: 26px;
                    margin: 0 auto;
                    background: #FF3C00;
                    border-radius: 4px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 14px;
                    color: #FFFFFF;
                }
            }
        }
    }
    .view-left-move-del {
        cursor: pointer;
        position: fixed;
        display: inline-block;
        width: 150px;
        // height: 100%;
        background: transparent;
        z-index: 8888;
        top: 50%;
        left: 0;
        padding-left: 30px;

        img {
            width: 60px;
        }
    }
    .view-right-move-del {
        cursor: pointer;
        position: fixed;
        display: inline-block;
        width: 150px;
        background: transparent;
        z-index: 8888;
        top: 50%;
        right: 0;
        text-align: right;
        padding-right: 30px;
        > img {
            width: 60px;
        }
    }
    .view-left-move {
        cursor: pointer;
        position: fixed;
        display: inline-block;
        width: 150px;
        height: 100%;
        background: transparent;
        z-index: 9999;
        top: 0;
        left: 0;
        padding-left: 30px;

        > img {
            top: 50%;
            width: 80px;
            position: relative;
        }
    }
    .view-right-move {
        cursor: pointer;
        position: fixed;
        display: inline-block;
        width: 150px;
        height: 100%;
        background: transparent;
        z-index: 9999;
        top: 0;
        right: 0;
        text-align: right;
        padding-right: 30px;

        > img {
            top: 50%;
            width: 80px;
            position: relative;

        }
    }
    .moveRight {
        transform: rotate(180deg);
    }
</style>