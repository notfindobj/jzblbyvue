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
                    <h2 v-if="detailInfo.TalkTitle" class="pictureBox-title">{{detailInfo.TalkTitle}}</h2>
                    <div v-html="detailInfo.TalkContent" class="pictureBox-con"></div>
                    <div v-for="(items, index) in detailInfo.ResourceObj" v-if="detailInfo.TalkType !== 5" :key="index">
                        <img :src="items.smallImgUrl" :alt="items.fileName" :data-original="items.bigImgUrl" />
                    </div>
                </div>
            </div> 
        </div>
        <div class="picture-right">
            <div class="picture-right-title">
                <img @click="goToPersonal(detailInfo)" :src="detailInfo.HeadIcon" alt="">
                <p>{{detailInfo.NickName}}</p>
                <div :class="!detailInfo.IsFollow ? 'focus-btn': 'focus-btn-gray'" @click="setFollow(detailInfo)">
                    {{!detailInfo.IsFollow? '+ 关注' : '已关注'}}
                </div>
            </div>
            <commentsCon
                :publish="detailInfo"
                @thumbsUp="thumbsUp"
                @Collection="Collection"
                @Forward="Forward"
            />
        </div>
        <ToTop/>
        <share :config="configModal" :qrcodeContent="qrcodeContent"/>
    </div>
</template>
<script>
import Viewer from 'viewerjs';
import share from '../../components/share'
import commentsCon from '../../components/commentBox/commentsCon'
import { setthumbsUp, setCollection, setFollow, setComments, recordFrequency, downloadFile, delComment} from '../../service/clientAPI'
import ToTop from '../../components/toTop'
import { mapState, mapGetters } from 'vuex'
export default {
    name: "pictureBox",
    layout: 'main',
    components: {
        commentsCon,
        ToTop,
        share
    },
    async asyncData({ store, params }) {
        const data = await store.dispatch('getQADetail', params.id);
        //记录用户访问
        let rec = await recordFrequency({
            ItemId: params.id,
            DomainType: data.TalkType
        })
        return {
            detailInfo: data,
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.overas.auth
        }),
        ...mapGetters(['isLogin'])
    },
    data () {
        return {
            isShowViewBox: false,
            isLeftPngF: require('../../assets/images/leftButtonColor.png'),
            isLeftPngR: require('../../assets/images/leftButton.png'),
            isLeft: false,
            isRight: false,
            Viewer: {},
            itemLength: 0,
            itemIndex: 0,
            isBtnSile: true,
            configModal: {
                isModal: false
            },
            qrcodeContent: {}
        }
    },
    mounted() {
      this.initView()
    },
    methods: {
        initView() {
            const ViewerDom = document.getElementById('pictureBox');
            let _this = this;
            _this.$nextTick(() => {
                _this.Viewer = new Viewer(ViewerDom, {
                    url: 'data-original',
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
        // 关注
        async setFollow(item) {
            if (!this.isLogin) {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
                return false
            }
            let queryData = {
                UserId: item.UserId,
                IsDelete: item.IsFollow
            }
            let collectionMsg = await setFollow(queryData);
            if (collectionMsg) {
                this.$set(item, 'IsFollow', !item.IsFollow)
            }
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
    .pictureBox-con {
        /deep/img {
            width: 100%;
        }
    }
    .pictureBox-title {
        text-align: center;
    }
    .picture {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        margin-top: 15px;
        justify-content: space-between;
        &-left {
            width: 850px;
            #pictureBox {
                img {
                    width: 100%;
                } 
                div {
                    p {
                        img {
                            width: 100%;
                        } 
                    }
                }
                font-size: 14px;
                background: #fff;
                padding: 10px 15px;
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
    .focus-btn {
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
        &-gray {
            background: #b0b0b0;
            cursor: pointer;
            width: 84px;
            height: 26px;
            margin: 0 auto;
            border-radius: 4px;
            line-height: 26px;
            text-align: center;
            font-size: 14px;
            color: #FFFFFF;
        }
    }
    .moveRight {
        transform: rotate(180deg);
    }
</style>