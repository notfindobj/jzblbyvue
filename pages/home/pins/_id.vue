<template>
    <div :class="isPins ? 'payms' : 'paym'" v-if="isPannel || isPins">
        <div class="paym-close"></div>
        <div class="paym-btn" v-if="!isPins">
            <div class="paym-btn-left" @click="movePaym(1)">
                <i class="icon iconfont icon-jiantou2" style="transform: rotate(90deg);display: inline-block;"></i>
            </div>
            <div class="paym-btn-right" @click="movePaym(2)">
                <i class="icon iconfont icon-jiantou2" style="transform: rotate(-90deg);display: inline-block;"></i>
            </div>
        </div>
        <div class="paym-closePin" v-if="!isPins">
            <i class="icon iconfont icon-chahao3" @click="closePins"></i>
        </div>
        <div v-cloak class="paym-content" ref="findModal" v-if="pictureDetail && pictureDetail.listImg">
            <div class="paym-content-main">
                <div :class="!isPins? 'paym-content-main-left paym-as' : 'paym-content-main-left'" >
                    <div class="content-main-top">
                        <div class="paym-content-main-left-title">
                            <span class="find-btn" @click="clickColl(pictureDetail)">采集</span>
                        </div>
                        <div class="paym-content-main-left-content">
                            <img v-lazy="pictureDetail.listImg.bigImgUrl"  :data-original="pictureDetail.listImg.bigImgUrl" :alt="pictureDetail.AlbumName">
                        </div>
                        <!-- <div class="paym-content-main-left-footer">
                            <span class="pins-btn">喜欢</span>
                            <span class="pins-btn">评论</span>
                        </div> -->
                    </div>
                    <div class="piece"> 
                        <div class="piece-user">
                           <div class="piece-user-info">
                                <span>
                                    <nuxt-link :to="`/home/info?id=${pictureDetail.CreateUserId}`">
                                        <img :src="pictureDetail.HeadIcon" alt="" width="50px" height="50px">
                                    </nuxt-link>
                                </span>
                                <div class="piece-user-info-name">
                                    <h3><span>{{pictureDetail.NickName}}</span><em v-if="pictureDetail.Source === 1">从<span>{{pictureDetail.CollectNickName}}</span></em></h3>
                                    <p><span>转采于</span><span>{{pictureDetail.CreateDate | timestamp}}</span></p>
                                </div>
                           </div>
                           <div class="piece-user-des">{{pictureDetail.Title}}</div>
                        </div>
                    </div>
                    
                </div>
                <div class="paym-content-main-right">
                    <div class="pin-tag">
                        <div class="pin-tag-tit">
                            <div class="pin-tag-tit-lf">
                                <p class="pin-tag-tit-lf-name">{{pictureDetail.AlbumName}}</p>
                                <p>{{pictureDetail.Number}} &nbsp;&nbsp;&nbsp;采集</p>
                            </div>
                            <!-- <span class="pins-btn pin-tag-tit-rf">关注</span> -->
                        </div>
                        <div class="pin-tag-con">
                            <boardPins :albumList="albumList" v-if="albumList.length > 0" @silePins="silePins"/>
                        </div>
                    </div>
                    <a v-if="pictureDetail.Link" class="pin-source" :href="`http://${pictureDetail.Link}`" target="_blank" rel="noopener noreferrer">
                        <div class="pin-source-www">{{pictureDetail.Link}}</div>
                        <div>来源网站</div>
                    </a>
                </div>
            </div>
        </div>
        <crollBox @willReachBottom="willReachBottom">
            <div class="find">
                <div class="find-name">
                    <span>为您推荐</span>
                </div>
                <div v-masonry="findContainer" item-selector=".item" class="masonry-container" gutter="10">
                    <div v-masonry-tile class="item" :key="index" v-for="(item, index) in samePicture">
                        <div class="find-box">
                            <div class="find-box-tit">
                                <img v-lazy="item.listImg.bigImgUrl" referrer="no-referrer|origin|unsafe-url" alt="" :data-original="item.listImg.bigImgUrl" :style="`width: 232px;height: ${calculatedH(item.listImg)}`"/>
                                <div class="find-box-tit-model find-box-tit-models" @click="showPins(item, index)">
                                    <div class="find-model">
                                        <span class="find-btn" @click.stop="clickColl(item)">采集</span>
                                    </div>
                                </div>
                                <p class="find-box-bottom-sub" v-if="item.Title">{{item.Title}}</p>
                                <div class="find-box-tit-pins">
                                    <!-- <sidePin :AlbumId="item.AlbumId"/> -->
                                </div>
                            </div>
                            <div class="find-box-bottom">
                                <div class="find-box-bottom-footer">
                                    <nuxt-link :to="`/home/info?id=${item.CreateUserId}`">
                                        <img v-lazy="item.HeadIcon" :data-original="item.HeadIcon" :alt="item.NickName">
                                    </nuxt-link>
                                    <div class="find-box-bottom-footer-pin">
                                        <p> <nuxt-link :to="`/home/info?id=${item.CreateUserId}`"><span class="pin-name">{{item.NickName}}</span></nuxt-link><span> 采集到</span></p>
                                        <p>
                                        <nuxt-link :to="`/home/boards/${item.AlbumID}`">{{item.AlbumName}}</nuxt-link>
                                        </p>
                                    </div>
                                    <div class="find-box-bottom-footer-num">{{item.Number}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </crollBox>
        <collection :coll="coll" v-if="isColl" @closeModal="closeColl"></collection>
    </div>
</template>
<script>
import crollBox from '../../../components/crollBox'
import boardPins from "../components/boardPins"
import collection from "../components/collection"
import {getPictureDetail, getAlbumDetail, getSamePicture} from "../../../service/find"
export default {
    layout: "find",
    props: {
        isPannel: {
            type: Boolean,
            default: false
        },
        pannelOndex: {
            type: Number,
            default: 0
        },
        // paramsId: {
        //     type: String,
        //     default: ''
        // }
    },
    components: {
        boardPins,
        collection,
        crollBox
    },
    data () {
        return {
            paramsId: this.value,
            findContainer:"findContainer",
            isPin: false,
            isPins: false,
            pictureDetail: {},
            albumList: [],
            coll: {},
            isColl: false,
            alb: {
                AlbumId: "",
                Page:	1,
                Rows: 15
            },
            query: {
                pictureId: "",
                total: 0,
                "Page":1,
                "Rows":30
            },
            samePicture: []
        }
    },
    created () {
        if (this.$route.params.id) {
            this.isPins = true;
            this.getDetail()
            this.getSameList()
        }
    },
    mounted () {
        let taht = this
        this.getAlbumList()
        if (!this.isPins) {
            taht.getDetail()
            taht.getSameList()
        }
    },
    methods: {
        showPins (row, index) {
            var stateObject = {};
            var title = "Wow Title";
            var newUrl = `/home/pins/${row.ID}`;
            history.pushState(stateObject,title,newUrl);
            this.paramsId = row.ID;
            this.$emit('input', row.ID);
            sessionStorage.setItem("pins", row.AlbumID);
            (function smoothscroll(){
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo (0,currentScroll - (currentScroll/5));
                }
            })();
            this.getAlbumList()
            this.getDetail()
            this.getSameList()
        },
        async willReachBottom () {
            if (!(this.query.Page + 1 >  this.query.total)) {
                this.query.Page += 1;
                this.query.pictureId = this.$route.params.id ||this.paramsId,
                getSamePicture(this.query).then(res => {
                    this.samePicture.push(...res.piclist)
                    this.query.total = res.pagination.total;
                    this.$nextTick(() => {
                        this.$redrawVueMasonry(this.findContainer)
                    })
                }).catch(err => {})
            }
        },
        calculatedH (imgInfo, w=232) {
            var file = {
                w: w,
                h: 0
            }
            file.h = parseInt(imgInfo.height * w / imgInfo.width)
            return file.h+"px"
        },
        getSameList () {
            let query = {
                pictureId: this.$route.params.id ||this.paramsId,
                "Page":1,
                "Rows":30
            }
            getSamePicture(query).then(res => {
                this.samePicture = res.piclist;
                this.query.total = res.pagination.total;
                this.$nextTick(() => {
                    this.$redrawVueMasonry(this.findContainer)
                })
            }).catch(err => {})
        },
        // 采集
        clickColl (row) {
            this.coll = JSON.parse(JSON.stringify(row))
            this.isColl = true
        },
        closeColl () {
            this.isColl = false
        },
        initView () {
            this.getDetail()
            this.getAlbumList()
        },
        movePaym (type) {
            this.$emit("movePaym", type, this.pannelOndex)
        },
        closePins () {
            this.isPins = false;
            this.$emit("closePins")
        },
        silePins (row) {
            this.$emit("silePins", row)
        },
        getAlbumList (id) {
            this.albumList = []
            this.alb.AlbumId = sessionStorage.getItem("pins")
            getAlbumDetail(this.alb).then(res => {
                this.albumList = res.PicList;
            })
        },
        getDetail () {
            let query = {
                pictureId: this.$route.params.id || this.paramsId
            }
            getPictureDetail(query).then(res => {
                this.pictureDetail = res;

            }).catch(err => {})
        }
    }
}
</script>
<style lang="less" scoped>
    .find {
        width: 1200px;
        margin: 0 auto;
        margin-top: 20px;
        &-name {
            font-size: 20px;
            color: #666;
            line-height: 40px;
            border-bottom: 1px solid #d6d6d6;
            margin-bottom: 10px;
        }
        &-box {
            cursor: pointer;
            &:hover {
                box-shadow: 0 1px 3px rgba(0,0,0,.02) ;
                transform: translateY(-1px);
            }
            &:hover &-bottom-footer-pins{
                bottom: 63px;
            }
            &-tit {
                background: #fff;
                position: relative;
                &-models {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 5px;
                    z-index: 11;
                    background: #ffffff14;
                }
                &-model {
                    display: none;
                }
                &:hover &-model {
                    display: inline-block;
                }
                &-pins {
                    display: none;
                    position: absolute;
                    top: 0;
                    background: #000;
                    left: 0;
                    right: 0;
                    bottom: -1px;
                    z-index: 99;
                    &::after {
                        content: "";
                        display: inline-block;
                        position: absolute;
                        border: 10px solid;
                        width: 0;
                        height: 0;
                        background: #000;
                        bottom: -8px;
                        transform: rotate(45deg);
                        right: 37px;
                        border-top-color: transparent;
                        border-left-color: transparent;
                    }
                }
            
            }
            &-bottom {
                background: #fff;
                // position: relative;
                &-sub {
                    // display: inline-block;
                    width: 232px;
                    padding: 10px 16px;
                    line-height: 1.35em;
                    overflow: hidden;
                    word-wrap: break-word;
                    border-bottom: 1px solid #f2f2f2;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                
                }
                &-footer {
                    margin-bottom: 10px;
                    display: flex;
                    padding: 0 16px;
                    >a {
                        display: inline-block;
                        width: 34px;
                        height: 34px;
                        margin: 16px 0;
                        img {
                            display: block;
                            width: 34px;
                            height: 34px;
                            border-radius: 50%;
                        }
                    }
                    &-pin{
                        height: 51px;
                        padding: 15px 0 0 10px;
                        line-height: 1.5;
                    }
                    &-num{
                        display: block;
                        min-width: 20px;
                        margin: 0 auto;
                        padding: 0 5px;
                        height: 24px;
                        line-height: 24px;
                        text-align: center;
                        white-space: nowrap;
                        border-radius: 2px;
                        border: 1px solid #e6e6e6;
                        color: #9e7e6b;
                        cursor: pointer;
                        margin-top: 15px;
                        &:hover .find-box-tit-pins {
                            display: inline-block;
                        }
                    }
                }
            }
        }
    }
    .paym-as {
        margin-top: 30px;
    }   
    .pin-source {
        position: relative;
        display: block;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        background: #fff;
        color: #999;
        position: sticky;
        top: 451px;
        &-www {
            color: #333;
            width: 190px;
            overflow: hidden;
            overflow-wrap: break-word;
            &:hover {
                color: #9a0000;
                text-decoration: underline;
            }
        }
    }
    .piece {
        background: #fff;
        padding: 16px 20px;
        margin-top: 20px;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,.02), 0 4px 8px 0 rgba(0,0,0,.02);
        &-user {
            &-info {
                display: flex;
                margin-bottom: 15px;
                color: #999;
                &-name {
                    width: 100%;
                    em {
                        font-style: inherit;
                    }
                    h3 {
                        font-size: 20px;
                        font-weight: 100;
                        span {
                            color: #333;
                            margin: 0 10px;
                        }
                    }
                    p {
                        span {
                            margin: 0 10px;
                        }
                    }
                }
            }
            &-des{
                line-height: 1.2;
                color: #444;
                background-color: #fafafa;
                padding: 15px;
                margin-bottom: 20px;
                word-wrap: break-word;
            }
        }
    }
    .content-main-top {
        background: #fff;
        padding: 16px 20px;
    }
    .pin-tag {
        padding: 16px 20px;
        margin-bottom: 16px;
        background: #fff;
        position: sticky;
        top: 50px;
        &-tit {
            display: flex;
            justify-content: space-between;
            &-lf{
                font-size: 12px;
                color: #999;
                &-name {
                    font-size: 14px;
                    color: #9e7e6b;
                    margin-bottom: 3px;
                }
            }
            &-rf{
                border: none !important;
                margin-top: 4px;
                margin-right: 0!important;
            }
        }
        &-con {
            margin-bottom: 10px;
        }
    }
    .close-paym {
        position: absolute;
        right: 1px;
        top: -3px;
        display: inline-block;
        width: 28px;
        height: 28px;
        cursor: pointer;
        font-size: 32px;
        color: #a7a4a4;
        &:hover {
            color: #eb4844;
        }
    }
    .find-btn {
        height: 30px;
        line-height: 30px;
        text-shadow: none;
        background: #ec414d;
        color: #fff;
        box-shadow: none;
        border: 1px solid #ec414d;
        display: inline-block;
        border-radius: 2px;
        font-size: 14px;
        padding: 0 12px;
        cursor: pointer;
    }
    .pins-btn {
        display: inline-block;
        border-radius: 2px;
        font-size: 14px;
        height: 28px;
        cursor: pointer;
        color: #444;
        white-space: nowrap;
        line-height: 28px;
        text-align: center;
        border: 1px solid #ededed;
        background: #ededed;
        margin-right: 10px;
        padding: 0 11px;
    }
    .paym{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background: rgba(229,229,229,.95);
        overflow: auto;
        padding-top: 40px;
    }
    .paym, .payms {
        &-content {
            width: 1000px;
            margin: 20px auto 0;
            &-main {
                display: flex;
                justify-content: space-between;
                &-left {
                    width: 700px;
                    &-title {
                        margin-bottom: 16px;
                        position: relative;
                        z-index: 1;
                    }
                    &-content {
                        img {
                            width: 100%;
                        }
                    }
                    &-footer {
                        position: relative;
                        margin-top: 16px;
                    }
                }
                &-right {
                    width: 290px;
                    min-height: 385px;
                }
            }
        }
        &-closePin{
            text-align: right;
            padding-right: 20px;
            position: fixed;
            right: 20px;
            top: 0;
            cursor: pointer;
            i {
                font-size: 30px;
                &:hover {
                    color: #ff3c00;
                }
            }
        }
        &-btn {
            position: fixed;
            top: 40%;
            display: flex;
            justify-content: space-between;
            width: 100%;
            &-left, &-right {
                width: 60px;
                height: 150px;
                line-height: 150px;
                i {
                    font-size: 24px;
                }
                &:hover {
                    cursor: pointer;
                    color: #ff3c00;
                    background: #ddd;
                }
            }
        }
    }
</style>