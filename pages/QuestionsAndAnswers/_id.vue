<template>
    <div class="container" @click="isShowEmotion = false">
        <div v-show="isBtnSile" class="view-left-move" @mouseenter="mousemoveLeft(1)"
            @mouseleave="mousemoveRight" @click="moveLeftClick(1)">
            <img :src="!isLeft ? isLeftPngF : isLeftPngR" width="50px" alt="">
        </div>
        <div v-show="isBtnSile" class="view-right-move" @mouseenter="mousemoveLeft(2)"
            @mouseleave="mousemoveRight" @click="moveLeftClick(2)">
            <img class="moveRight" :src="!isRight ? isLeftPngF : isLeftPngR" width="50px" alt="">
        </div>
        <div class="main-left">
            <h3 class="detail-title">{{ detailInfo.TalkTitle }}</h3>
            <span>发布时间：{{detailInfo.CreateDate}}</span>
            <div class="ql-container ql-snow">
                <div class="ql-editor detail-text" v-html="detailInfo.TalkContent"></div>
            </div>
            <div class="img-row" :ref="mathId">
                <div class="img" v-for="item in detailInfo.ResourceObj" :key="item.smallImgUrl" >
                    <img :src="item.smallImgUrl" :data-original="item.bigImgUrl" alt="" >
                </div>
            </div>
            <div class="editor-wrap">
                <Input v-model="content" ref="autofocus" type="textarea" placeholder="写回答" :autosize="{minRows: 3}"/>
            </div>
            <div style="position: relative;">
                <div class="toolbar">
                    <div class="toolbar-left">
                    <span class="tools add-face" @click.stop="isShowEmotion = !isShowEmotion">
                        <i class="icon iconfont">&#xe64e;</i>
                        <span class="text">添加表情</span>
                    </span>
                    </div>
                    <div class="toolbar-right">
                        <Button class="publish-btn" type="primary" @click="submitComment">发表</Button>
                    </div>
                </div>
                <div style="width: 400px;">
                    <emotion
                        class="emotion"
                        @emotion="handleEmotion"
                        :height="200"
                        v-show="isShowEmotion"
                    ></emotion>
                </div>
            </div>
            <div class="answer-list">
                <commentTool ref="commentTool" :isTopInput="false" :itemInfo="detailInfo" v-show="true"  :firstLoading="true"/>
            </div>
        </div>
        <div class="main-right">
            <div class="right-top">
                <div class="author-avatar"  @click="goToPersonal(detailInfo)">
                    <img :src="detailInfo.HeadIcon " alt="">
                </div>
                <span class="author-name">{{ detailInfo.NickName }}</span>
               <div v-if="userInfoID != detailInfo.UserId">
                    <Button type="primary" class="attention-btn" v-show="!detailInfo.IsFollow" @click="handleGz(true)">
                        <Icon class="icon-add" type="ios-add" size="24"/>
                        关注
                    </Button>
                    <Button class="attention-btn" v-show="detailInfo.IsFollow" @click="handleGz(false)">
                        取消关注
                    </Button>
               </div>
            </div>
        </div>
        <ToTop></ToTop>
    </div>
</template>
<script>
    import Viewer from 'viewerjs';
    import 'viewerjs/dist/viewer.css';
    import Emotion from '../../components/Emotion/index'
    import commentTool from '../../components/commentTool'
    import ToTop from '../../components/toTop'
    import { setComments, setFollow, delComment} from '../../service/clientAPI'
    import { mapState } from 'vuex'
    export default {
        layout: 'main',
        data() {
            return {
                content: '',
                commentList: [],    // 评论列表
                isShowEmotion: false,
                isShowComment: true,
                isLoadingComment: false,
                mathId: '',
                isBtnSile: false,
                isLeftPngF: require('../../assets/images/leftButtonColor.png'),
                isLeftPngR: require('../../assets/images/leftButton.png'),
                isLeft: false,
                isRight: false,
            }
        },
        computed: {
            ...mapState({
                userInfoID: state => state.overas.auth? state.overas.auth.UserId: ""
            })
        },
        components: {
            Emotion,
            ToTop,
            commentTool
        },
        methods: {
            replaceImgs (val) {
                let regex = "/i/s/";
                return val.replace(regex, "/i/");
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
            async delComments (row) {
                let msg = await delComment(row.CommentsId)
                if (msg) {
                    this.getComment()
                }
            },
            initIview () {
                this.$nextTick(()=>{
                    this.$refs.autofocus.focus()
                })
            },
            moveLeftClick(val) {
                if (val === 2) {
                    if (this.itemLength - 1 === this.itemIndex) {
                    this[this.ViewerIndex].close();
                    this[this.ViewerIndex].hide();
                    } else {
                    this[this.ViewerIndex].next()
                    } 
                }
                if (val === 1) {
                    if (this.itemIndex === 0) {
                    this[this.ViewerIndex].close();
                    this[this.ViewerIndex].hide();
                    } else {
                    this[this.ViewerIndex].prev()
                    }
                }
            },
            mousemoveLeft() {
                this.isLeft = true
                this.isRight = true
            },
            mousemoveRight() {
                this.isLeft = false
                this.isRight = false
            },
            // 关注/取消关注
            async handleGz(flag) {
                let queryData = {
                    UserId: this.detailInfo.UserId,
                    IsDelete: !flag
                }
                let msg= await setFollow(queryData)
                if (msg) {
                    this.$set(this.detailInfo, 'IsFollow', flag)
                }
            },
            // 选择表情
            handleEmotion(item) {
                this.content += `[${ item.content }]`
            },
            // 评论
            submitComment() {
                if (!this.content) {
                    this.$Message.warning('请先输入回答内容哦~');
                    return false;
                }
                this.$refs.commentTool.setCommentsData(undefined, undefined, undefined, this.content)
                .then(res => {
                    this.content = '';
                })
                // setComments({
                //     ItemId: this.detailInfo.ItemId,
                //     ReplyId: '',
                //     ReplyUserId: '',
                //     IsReply: false,
                //     Message: this.content,
                //     ItemImgSrc: '',
                //     ScopeType: 3
                // }).then(res => {
                //     // this.$Message.success('评论成功');
                //     this.content = '';
                //     this.getComment();
                // })
            },
            // 回复
            submitReplay(params) {
                this.isLoadingComment = true;
                setComments({
                    ItemId: this.detailInfo.ItemId,
                    ReplyId: params.commentsId,
                    ReplyUserId: params.userId,
                    IsReply: true,
                    Message: params.content,
                    ItemImgSrc: '',
                    ScopeType: 3
                }).then(res => {
                    this.$Message.success('评论成功');
                    this.getComment();
                })
            },
            // 点赞回复
            submitLike(obj) {
                setthumbsUp({
                    ItemId: this.detailInfo.ItemId,
                    LikeType: 0,
                    CommentsId: obj.commentsId,
                    IsDelete: !obj.flag
                })
            },
            // 获取评论
            getComment() {
                this.$store.dispatch('getGetComments', {
                    ItemId: this.$route.params.id,
                    ItemImgSrc: '',
                    ScopeType: 3
                }).then(res => {
                    this.isLoadingComment = false;
                    this.commentList = res;
                })
            },
            initView() {
                const ViewerDom = document.getElementById(this.mathId);
                let _this = this;
                _this.$nextTick(() => {
                    _this[_this.ViewerIndex] = new Viewer(_this.$refs[this.mathId], {
                        url: 'data-original',
                        // 过滤表情
                        filter: function (e) {
                            if (e.getAttribute('data-w-e') !== '1') {
                                return e
                            }
                        },
                        button: false,
                        toolbar: true,
                        navbar: true,
                        title: false,
                        zoomRatio: 0.4,
                        maxZoomRatio: 3,
                        minZoomRatio: 0.5,
                        view: function(e) {
                            _this.itemLength = e.target.childElementCount;
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
                        // _this.Viewer.destroy();
                        // _this.viewShowBox()
                        }
                    })
                })
            },
            getRanNum(){
                let result = [];
                for(let i=0;i<8;i++){
                    let ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
                    result.push(String.fromCharCode(65+ranNum));
                }
                return  result.join('');
            },
        },
        created() {
            this.mathId = this.getRanNum();
            this.getComment();
        },
        mounted () {
            this.initView()
            this.initIview()
        },
        async asyncData({ store, params }) {
            const data = await store.dispatch('getQADetail', params.id);
            return {
                detailInfo: data
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "~assets/css/publish/index.less";
    .container {
        width: 1200px;
        margin: 0 auto;
        padding-top: 30px;
        padding-bottom: 60px;
        overflow: hidden;

        .main-left {
            float: left;
            width: 840px;
            padding: 20px 20px 68px;
            background-color: #fff;
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);

            .detail-title {
                font-size: 24px;
                color: #333;
                font-weight: normal;
            }

            .detail-text {
                margin-top: 15px;
                font-size: 14px;
                color: #666;
            }
            .img-row {
                margin-top: 20px;
                .img {
                    display: inline-block;
                    margin-right: 10px;
                    width: 220px;
                    height: 150px;
                    background-color: #ccc;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .editor-wrap {
                width: 800px;
                margin-top: 20px;
            }

            .quill-editor {
                min-height: 136px;
            }

            .ql-toolbar.ql-snow {
                background-color: #f5f6f5;
            }

            .answer-list {
                margin-top: 40px;

                .answer-item {
                    padding: 20px 0 15px;
                    border-top: 1px solid #d8d8d8;

                    .item-top {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .top-left {
                            display: flex;
                            align-items: center;
                        }

                        .avatar {
                            width: 24px;
                            height: 24px;
                            background-color: #ccc;
                            margin-right: 4px;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .user-name {
                            font-size: 14px;
                            color: #F16402;
                        }

                        .top-right {
                            font-size: 12px;
                            color: #999;
                        }
                    }

                    .item-middle {
                        margin-top: 4px;
                        padding-left: 28px;
                        font-size: 14px;
                        color: #333;
                    }

                    .item-bottom {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;

                        span {
                            margin-left: 4px;
                            font-size: 12px;
                            color: #666;
                        }
                    }
                }

                .answer-item:last-child {
                    border-bottom: 1px solid #d8d8d8;
                }
            }
        }

        .main-right {
            float: right;
            width: 340px;

            .right-top {
                width: 100%;
                height: 233px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                background-color: #fff;

                .author-avatar {
                    width: 74px;
                    height: 74px;
                    margin-top: 20px;
                    border-radius: 50%;
                    background-color: #ccc;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .author-name {
                    font-size: 14px;
                    color: #333;
                    line-height: 32px;
                }

                .attention-btn {
                    padding: 0 18px;
                    font-size: 14px;

                    .icon-add {
                        margin-right: -3px;
                        margin-top: -2px;
                    }
                }
            }

            .big-btn {
                width: 280px;
                height: 40px;
                margin-top: 20px;
            }

            .big-btn:hover {
                color: #fff;
                background-color: #EB4E27;
            }

            .block-btn {
                margin-top: 56px;
                text-align: center;
            }

        }
    }

    .ql-container.ql-snow {
        border: none;
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
            transform: rotate(180deg);
        }
    }
    .ql-editor {
        padding: 0;
    }
</style>
