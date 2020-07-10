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
                        <div></div>
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
        <collection :coll="coll" v-if="isColl" @closeModal="closeColl"></collection>
    </div>
</template>
<script>
import boardPins from "../components/boardPins"
import collection from "../components/collection"
import {getPictureDetail, getAlbumDetail} from "../../../service/find"
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
        paramsId: {
            type: String,
            default: ''
        }
    },
    components: {
        boardPins,
        collection
    },
    data () {
        return {
            isPins: false,
            pictureDetail: {},
            albumList: [],
            coll: {},
            isColl: false,
            alb: {
                AlbumId: "",
                Page:	1,
                Rows: 15
            }
        }
    },
    created () {
        if (this.$route.params.id) {
            this.isPins = true;
            this.getDetail()
        }
    },
    mounted () {
        let taht = this
        document.addEventListener('click', e => {
            // if(this.$refs.findModal && !this.$refs.findModal.contains(e.target)){
            //     this.$emit("closeModal", false)
            // }
        })
        this.getAlbumList()
        if (!this.isPins) {
            taht.getDetail()
        }
    },
    methods: {
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
                pictureId: this.$route.params.id ||this.paramsId
            }
            getPictureDetail(query).then(res => {
                this.pictureDetail = res;

            }).catch(err => {})
        }
    }
}
</script>
<style lang="less" scoped>
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
        margin-bottom: 16px;
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
            margin: 20px auto;
            &-main {
                display: flex;
                justify-content: space-between;
                &-left {
                    width: 700px;
                    margin-bottom: 16px;
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