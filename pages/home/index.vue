<template>
    <crollBox @willReachBottom="willReachBottom">
        <div class="find">
            <Pin :isPannel="isPin" @closePins="closeModal()" v-if="isPin" :paramsId="paramsId" :pannelOndex="pannelOndex" @movePaym="movePaym" ref="Pin"/>
            <div v-masonry="findContainer" item-selector=".item" class="masonry-container" gutter="10">
                <div v-masonry-tile class="item" :key="index" v-for="(item, index) in pictureList">
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
        <collection :coll="coll" v-if="isColl" @closeModal="closeColl"></collection>
    </crollBox>
</template>
<script>
import Pin from "./pins/_id"
import sidePin from "./components/sidePins"
import crollBox from '../../components/crollBox'
import collection from "./components/collection"
export default {
    layout: "find",
    components: {
        Pin,
        crollBox,
        collection,
        sidePin
    } ,
    data () {
        return {
            findContainer: "findContainer",
            isPin:  false,
            pictureList: [],
            paramsId: '',
            coll: {},
            isColl: false,
            pannelOndex: 0,
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
    mounted () {
        if (typeof this.$redrawVueMasonry === 'function') {
            this.$redrawVueMasonry()
        }
    },
    methods: {
        closeColl () {
            this.isColl = false
        },
        // 采集
        clickColl (row) {
            this.coll = JSON.parse(JSON.stringify(row))
            this.isColl = true
        },
        async willReachBottom () {
            if (!(this.q.Page + 1 >  this.q.total)) {
                this.q.Page += 1;
                let res = await this.$store.dispatch('getPicturelist', this.q);
                if (res) {
                    this.pictureList.push(...res.piclist)
                    this.q.total = res.pagination.total;
                    this.$nextTick(() => {
                        this.$redrawVueMasonry(this.findContainer)
                    })
                }
            }
        },
        closeModal () {
            this.isPin = false;
            document.body.style.overflow = "auto"
            var stateObject = {};
            var title = "Wow Title";
            var newUrl = `/home`;
            history.pushState(stateObject,title,newUrl);
            return false
        },
        movePaym (val, index) {
            let row = {}
            // 左翻
            if (val === 1) {
               row = index- 1 >= 0 ? this.pictureList[index -1 ]: false
            } else if (val === 2) {
                row = index + 1 <= this.pictureList.length ? this.pictureList[index + 1]: false
            }
            if (row) {
                this.isPin = true;
                document.body.style.overflow = "hidden"
                let stateObject = {};
                let title = "Wow Title";
                let newUrl = `/home/pins/${row.ID}`;
                this.paramsId = row.ID
                this.pannelOndex = val === 1 ? index- 1 : index + 1
                history.pushState(stateObject,title,newUrl);
                sessionStorage.setItem("pins", row.AlbumID)
                this.$refs.Pin.initView()
            }
            return false
        },
        showPins (row, index) {
            this.isPin = true;
            document.body.style.overflow = "hidden"
            var stateObject = {};
            var title = "Wow Title";
            var newUrl = `/home/pins/${row.ID}`;
            this.paramsId = row.ID
            this.pannelOndex = index
            history.pushState(stateObject,title,newUrl);
            sessionStorage.setItem("pins", row.AlbumID)
            return false
        },
        calculatedH (imgInfo, w=232) {
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
.pin-name {
    text-decoration: underline;
}
.find {
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
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
