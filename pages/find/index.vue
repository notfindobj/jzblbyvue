<template>
    <crollBox @willReachBottom="willReachBottom">
        <div class="find">
            <Pin :isPannel="isPin" @closePins="isPin = false" v-if="isPin"/>
            <div v-masonry="findContainer" transition-duration="3s" item-selector=".item" class="masonry-container" gutter="10">
                <div v-masonry-tile class="item" :key="index" v-for="(item, index) in pictureList">
                    <div class="find-box">
                        <div class="find-box-tit">
                            <img v-lazy="item.listImg.smallImgUrl" referrer="no-referrer|origin|unsafe-url" alt="" :data-original="item.listImg.smallImgUrl" :style="`width: 230px;height: ${calculatedH(item.listImg)}`"/>
                            <div class="find-box-tit-model find-box-tit-models" @click="showPins(item)">
                                <div class="find-model">
                                    <span class="find-btn">采集</span>
                                </div>
                            </div>
                        </div>
                        <div class="find-box-bottom">
                            <p class="find-box-bottom-sub">{{item.Desc}}</p>
                            <div class="find-box-bottom-footer">
                                <a href="">
                                    <img v-lazy="item.HeadIcon"  :data-original="item.HeadIcon" :alt="item.NickName">
                                </a>
                                <div class="find-box-bottom-footer-pin">
                                    <p><span>{{item.NickName}}</span><span> 采集到</span></p>
                                    <p>
                                        <a href="">{{item.AlbumName}}</a>
                                    </p>
                                </div>
                                <div class="find-box-bottom-footer-num">
                                    {{item.Number}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </crollBox>
</template>
<script>
import Pin from "./pins/_id"
import crollBox from '../../components/crollBox'
export default {
    layout: "main",
    components: {
        Pin,
        crollBox
    } ,
    data () {
        return {
            findContainer: "findContainer",
            isPin:  false,
            pictureList: [],
            q: {
                "typeId":"",
                "Page":1,
                "Rows":30
            }
        }
    },
    async asyncData({store}) {
        let q = {
            "typeId":"",
            "Page":1,
            "Rows":30,
            "total": ""
        }
        let res = await store.dispatch('getPicturelist', q);
        q.total=  res.pagination.total
        return {
            pictureList: res.piclist,
            q
        }
    },
    created () {
    },
    mounted () {
        if (typeof this.$redrawVueMasonry === 'function') {
            this.$redrawVueMasonry()
        }
    },
    methods: {
        async willReachBottom () {
            if (!(this.q.Page + 1 >  this.q.total)) {
                this.q.Page += 1;
                let res = await this.$store.dispatch('getPicturelist', q);
                if (res) {
                    res
                    this.pictureList = res.piclist
                    this.q.total = res.pagination.total
                }
            }
        },
        closeModal () {
            // this.isPin = false
        },
        showPins (row) {
            this.isPin = true;
            var stateObject = {};
            var title = "Wow Title";
            var newUrl = `/find/pins/${row.ID}`;
            history.pushState(stateObject,title,newUrl);
            sessionStorage.setItem("pins", row.AlbumID)
            return false
        },
        calculatedH (imgInfo, w=256) {
            var file = {
                w: w,
                h: 0
            }
            file.h = parseInt(imgInfo.height * w / imgInfo.width)
            return file.h+"px"
        }
    }
}
</script>
<style lang="less" scoped>
.find {
    width: 1200px;
    margin: 0 auto;
    &-box {
        cursor: pointer;
        &:hover {
            box-shadow: 0 1px 3px rgba(0,0,0,.02), 0 16px 32px -4px rgba(0,0,0,.17);
            transform: translateY(-1px);
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
        }
        &-bottom {
            background: #fff;
            position: relative;
            &-sub {
                display: block;
                padding: 10px 16px;
                line-height: 1.35em;
                overflow: hidden;
                word-wrap: break-word;
                border-bottom: 1px solid #f2f2f2;
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
                    margin: 0 15px; 
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
                }
            }
        }
    }
}
.item {
}
.find-model{
    margin-top: 10px;
    margin-left: 10px;
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
</style>
