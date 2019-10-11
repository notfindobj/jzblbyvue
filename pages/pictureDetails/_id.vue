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
                    <div>
                        {{detailInfo.TalkContent}}
                    </div>
                    <div v-for="(items, index) in detailInfo.Imgs" :key="index">
                        <img :src="baseUrlRegExp(items.smallImgUrl)" :alt="items.fileName" >
                    </div>
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
            <!-- <commentsCon/> -->
        </div>
        <ToTop/>
    </div>
</template>
<script>
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';
import commentsCon from '../../components/comments/commentsCon.vue'
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
        return {
            detailInfo: data
        }
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
            isBtnSile: true
        }
    },
    mounted() {
      this.initView()
    },
    methods: {
         baseUrlRegExp (str) {
            let reg = RegExp(/\http:\/\/www./);
            if(str.match(reg)){
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
                    ready: function () {
                        console.log('ready')
                    },
                    build: function () {
                        console.log('build')
                    },
                    built: function () {
                        console.log('built')
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
        }
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