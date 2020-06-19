<template>
    <div class="paym" v-if="isPannel">
        <div class="paym-close"></div>
        <div class="paym-btn">
            <div class="paym-btn-left">👈</div>
            <div class="paym-btn-right">👉</div>
        </div>
        <div class="paym-content" ref="findModal">
            <div class="paym-content-main">
                <div class="paym-content-main-left">
                    <div class="content-main-top">
                        <div class="paym-content-main-left-title">
                            <span class="find-btn">采集</span>
                        </div>
                        <div class="paym-content-main-left-content">
                            <img src="https://img.zcool.cn/community/0116125eeb0db6a801215aa05d5826.jpg@1280w_1l_2o_100sh.jpg" alt="">
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
                                    <img src="http://www.pic1.jzbl.com/buildingcircle/94749b37-12ac-4651-9a85-86b03a475c3d/2020-04-30/i/1588212166376909.jpg" alt="" width="50px" height="50px">
                                </span>
                                <div class="piece-user-info-name">
                                    <h3><span>Li❤Ly</span>从<span>豆豆elfin</span></h3>
                                    <p><span>转采于</span><span> 18 小时前</span></p>
                                </div>
                           </div>
                           <div class="piece-user-des">雪球，投资门派测试#插画</div>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div class="paym-content-main-right">
                    <div class="pin-tag">
                        <div class="pin-tag-tit">
                            <div class="pin-tag-tit-lf">
                                <p class="pin-tag-tit-lf-name">1111</p>
                                <p>903采集</p>
                            </div>
                            <span class="pins-btn pin-tag-tit-rf">关注</span>
                        </div>
                        <div class="pin-tag-con">
                            <boardPins/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import boardPins from "./boardPins"
import {getPictureDetail} from "../../../service/find"
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
    created () {
        this.$route
    },
    data () {
        return {}
    },
    mounted () {
        let taht = this
        document.addEventListener('click', e => {
            // if(this.$refs.findModal && !this.$refs.findModal.contains(e.target)){
            //     this.$emit("closeModal", false)
            // }
        })
    },
    methods: {
        closePay () {
            this.$emit("closePay")
        },
    }
}
</script>
<style lang="less" scoped>
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
    .paym {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        background: rgba(229,229,229,.95);
        overflow: auto;
        padding-top: 40px;
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