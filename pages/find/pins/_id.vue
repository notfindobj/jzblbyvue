<template>
    <div :class="isPins ? 'payms' : 'paym'" v-if="isPannel || isPins">
        <div class="paym-close"></div>
        <div class="paym-btn" v-if="!isPins">
            <div class="paym-btn-left">👈</div>
            <div class="paym-btn-right">👉</div>
        </div>
        <div @click="closePins" v-if="!isPins">
            X
        </div>
        <div v-cloak class="paym-content" ref="findModal" v-if="pictureDetail.listImg">
            <div class="paym-content-main">
                <div class="paym-content-main-left">
                    <div class="content-main-top">
                        <div class="paym-content-main-left-title">
                            <span class="find-btn">采集</span>
                        </div>
                        <div class="paym-content-main-left-content">
                            <img v-lazy="pictureDetail.listImg.bigImgUrl"  :data-original="pictureDetail.listImg.bigImgUrl" :alt="pictureDetail.AlbumName">
                        </div>
                        <div class="paym-content-main-left-footer">
                            <span class="pins-btn">喜欢</span>
                            <span class="pins-btn">评论</span>
                        </div>
                    </div>
                    <div class="piece"> 
                        <div class="piece-user">
                           <div class="piece-user-info">
                                <span>
                                    <img :src="pictureDetail.HeadIcon" alt="" width="50px" height="50px">
                                </span>
                                <div class="piece-user-info-name">
                                    <h3><span>{{pictureDetail.NickName}}</span><em v-if="pictureDetail.Source === 1">从<span>{{pictureDetail.CollectNickName}}</span></em></h3>
                                    <p><span>转采于</span><span> 18 小时前</span></p>
                                </div>
                           </div>
                           <div class="piece-user-des">{{pictureDetail.Desc}}</div>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div class="paym-content-main-right">
                    <div class="pin-tag">
                        <div class="pin-tag-tit">
                            <div class="pin-tag-tit-lf">
                                <p class="pin-tag-tit-lf-name">{{pictureDetail.AlbumName}}</p>
                                <p>{{pictureDetail.Number}}采集</p>
                            </div>
                            <span class="pins-btn pin-tag-tit-rf">关注</span>
                        </div>
                        <div class="pin-tag-con">
                            <boardPins :albumList="albumList"/>
                        </div>
                    </div>
                    <a v-if="pictureDetail.Link" class="pin-source" href="http://" target="_blank" rel="noopener noreferrer">
                        <div class="pin-source-www">wwww.baidu.com</div>
                        <div>来源网站</div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import boardPins from "../components/boardPins"
import {getPictureDetail, getAlbumDetail} from "../../../service/find"
export default {
    props: {
        isPannel: {
            type: Boolean,
            default: false
        }
    },
    components: {
        boardPins
    },
    layout: "main",
    data () {
        return {
            isPins: false,
            pictureDetail: {},
            albumList: [],
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
        if (taht.$route.params.id) {
            taht.getDetail()
        }
    },
    methods: {
        closePins () {
            this.isPins = false;
            this.$emit("closePins")
        },
        getAlbumList (id) {
            this.alb.AlbumId = sessionStorage.getItem("pins")
            getAlbumDetail(this.alb).then(res => {
                this.albumList = res.PicList
            })
        },
        getDetail () {
            let query = {
                pictureId: this.$route.params.id
            }
            getPictureDetail(query).then(res => {
                this.pictureDetail = res;

            }).catch(err => {})
        }
    }
}
</script>
<style lang="less" scoped>
    .pin-source {
        position: relative;
        display: block;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        background: #fff;
        color: #999;
        &-www {
            color: #333;
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
        &-tit {
            display: flex;
            justify-content: space-between;
            &-lf{
                font-size: 12px;
                color: #999;
                &-name {
                    font-size: 14px;
                    color: #9e7e6b;
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
            margin: 0 auto;
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
        &-btn {
            position: absolute;
            top: 40%;
            display: flex;
            justify-content: space-between;
            width: 100%;
            &-left, &-right {
                width: 60px;
                height: 150px;
                line-height: 150px;
                &:hover {
                    cursor: pointer;
                    background: #ddd;
                }
            }
        }
    }
</style>