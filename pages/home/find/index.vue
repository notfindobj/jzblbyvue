<template>
    <div>
        <div class="find-nav">
            <div class="find-nav-kong"></div>
            <ul>
                <li :class="q.typeId === '' ? 'action': ''" @click="selectType({})">全部</li>
                <li :class="q.typeId === items.ID ? 'action': ''" v-for="(items, index) in AlbumType" :key="index" @click="selectType(items)">{{items.Name}}</li>
            </ul>
        </div>
        <crollBox @willReachBottom="willReachBottom">
            <div class="find">
                <Pin :isPannel="isPin" @closePins="closeModal" v-if="isPin" v-model="paramsId" :pannelOndex="pannelOndex" @movePaym="movePaym" ref="Pin"/>
                <div v-if="pictureList.length <= 0" style="text-align: center;">
                    暂无数据
                </div>
                <div v-masonry="findContainer" transition-duration="3s" item-selector=".item" class="masonry-container" gutter="10">
                    <div v-masonry-tile class="item" :key="index" v-for="(item, index) in pictureList">
                        <div class="find-box">
                            <div class="find-box-tit">
                                <img v-lazy="item.listImg.bigImgUrl" referrer="no-referrer|origin|unsafe-url" alt="" :data-original="item.listImg.bigImgUrl" :style="`width: 232px;height: ${calculatedH(item.listImg)}`"/>
                                <div class="find-box-tit-model find-box-tit-models" @click="showPins(item, index)">
                                    <div class="find-model">
                                        <span class="find-btn" @click.stop="clickColl(item)">采集</span>
                                    </div>
                                </div>
                            </div>
                            <div class="find-box-bottom">
                                <p class="find-box-bottom-sub" v-if="item.Title">{{item.Title}}</p>
                                <div class="find-box-bottom-footer">
                                    <nuxt-link :to="`/home/info?id=${item.CreateUserId}`">
                                        <img v-lazy="item.HeadIcon" :data-original="item.HeadIcon" :alt="item.NickName">
                                    </nuxt-link>
                                    <div class="find-box-bottom-footer-pin">
                                        <p><span>{{item.NickName}}</span><span> 采集到</span></p>
                                        <p>
                                            <nuxt-link :to="`/home/boards/${item.AlbumID}`">
                                                {{item.AlbumName}}
                                            </nuxt-link>
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
            <collection :coll="coll" v-if="isColl" @closeModal="closeColl"></collection>
        </crollBox>
    </div>
</template>
<script>
import Pin from "../pins/_id"
import crollBox from '../../../components/crollBox'
import {getAlbumType } from "../../../service/find"
import collection from "../components/collection"
export default {
    layout: "find",
    components: {
        Pin,
        crollBox,
        collection
    } ,
    data () {
        return {
            findContainer: "findCon",
            isPin:  false,
            pictureList: [],
            paramsId: '',
            coll: {},
            isColl: false,
            AlbumType: [],
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
    created () {
        this.getAlbumTypeList()
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
        selectType (row) {
            this.q.typeId = row.ID;
            this.q.Page = 0;
            this.q.total = 1
            this.willReachBottom(true)
        },
        getAlbumTypeList () {
            let that = this;
            getAlbumType().then(res => {
                that.AlbumType = res;
            }).catch(err => {})
        },
        async willReachBottom (type = false) {
            if (!(this.q.Page + 1 >  this.q.total)) {
                this.q.Page += 1;
                let res = await this.$store.dispatch('getPicturelist', this.q);
                if (res) {
                    if (type) {
                        this.pictureList = res.piclist
                    } else {
                        this.pictureList.push(...res.piclist)
                    }
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
            var newUrl = `/home/find`;
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
            var stateObject = {};
            document.body.style.overflow = "hidden"
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
.find-nav {
    position: sticky;
    top: 60px;
    z-index: 99;
    border-top: 1px solid #ddd;
    background: #f2f4f2;
    &-kong {
        margin: 0 10px;
        height: 1px;
        display: inline-block;
    }
    ul {
        background: #fff;
        display: flex;
        line-height: 40px;
        width: 1200px;
        background: #fff;
        margin: 0 auto;
        padding: 5px 15px;
        li.action {
            color: #ff3c00;
        }
        li {
            margin-right: 15px;
            cursor: pointer;
            
        }
    }
}
.find {
    width: 1200px;
    margin: 0 auto;
    margin-top: 20px;
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
                display: inline-block;
                width: 232px;
                padding: 10px 16px;
                line-height: 1.35em;
                overflow: hidden;
                word-wrap: break-word;
                border-bottom: 1px solid #f2f2f2;
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
