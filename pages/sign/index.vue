<template>
    <div class="sg">
        <div class="sg-top">
            <div class="sg-top-left">
                <div class="user">
                    <img src="http://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif" alt="" width="140" height="140px">
                </div>
                <div class="user-sign">
                   <div class="user-sign-name">
                       <span>初九</span>
                       <span @click="signeds"><Icon type="md-clipboard" />签到</span>
                   </div>
                   <div class="user-sign-num">当前积分：<span class="user-sign-num-pir">32</span></div>
                   <div class="user-sign-num">累计积分：<span class="user-sign-num-pir">3200</span></div>
                </div>
            </div>
            <div>
                <h2>积分排行</h2>
                <!-- <div>
                    <div class="record-ul" v-for="index in 4" :key="index">
                        <span>嘿嘿嘿</span>
                        <span>38694.0</span>
                        <span>1556</span>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="exchange">
            <div class="exchange-title">
                <h2 class="exchange-title-h">积分兑换</h2>
                <p class="exchange-title-sub">建筑部落全新资源库专区，等你来发现更多惊喜！</p>
                <div class="exchange-title-con">
                    <template v-for="(item, index) in ExItem">
                        <baseCard :item="item" :key="index" @exchangeItems="exchangeItems"/>
                    </template>
                </div>
            </div>
        </div>
        <div class="exchange">
            <div class="exchange-title">
                <h2 class="exchange-title-h">积分抽奖</h2>
                <p class="exchange-title-sub">建筑部落APP积分抽奖100%有奖，卷尺工具及实物书籍等你来拿！</p>
                <div class="exchange-title-con">
                    <div class="luckDraw">
                        <div class="luck">
                            <span>当前积分：<span class="siNum">585255</span>    </span>
                            <Tooltip theme="light">
                                <span>抽奖规则</span>
                                <div slot="content">
                                    <p>1. 累计签到即可领取免费抽奖机会。</p>
                                    <p>2. 抽奖机会可通过积分兑换：100积分/次。</p>
                                    <p>3.虚拟奖品实时到账。</p>
                                </div>
                            </Tooltip>
                        </div>
                        <luckDraw :list="list" :prizes="prizes" @startLot="startLot" ref="luckDraw"/>
                    </div>
                    <div class="record">
                        <div class="swiper-container" v-if="WinerList&& WinerList.length > 0">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(items, index) in WinerList" :key="index">
                                    <div class="record-ul">
                                        <span>{{items.CreateUserName}}</span>
                                        <span>{{items.CreateDate | timestamp}}</span>
                                        <span>{{items.PrizeName}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="rule">
            <div class="rule-left">
                <p class="rule-left-title">
                    <span><Icon type="md-volume-up" />公告</span>
                    <span><nuxt-link to="/website">更多>></nuxt-link></span>
                </p>
                <ul class="rule-left-content">
                    <li v-for="(items, index) in noticeList" :key="index">
                        <div @click="viewAbout(items)">
                            <span v-if="items.IsTop" class="roof">顶</span>
                            <span class="roof-tit">{{items.ArticleTitle}}</span>
                        </div>
                        <span class="roof-time">{{items.CreateDate | datefmt('YYYY-MM-DD')}}</span>
                    </li>
                </ul>
            </div>
            <div class="rule-right">
                <p class="rule-right-title">
                    <span><Icon type="ios-paper-outline" />规则协议</span>
                    <span><nuxt-link to="/website">更多>></nuxt-link></span>
                </p>
                <ul class="rule-right-content">
                    <li v-for="(items, index) in ruleList" :key="index">
                        <span @click="viewAbout(items)">
                            <span v-if="items.IsTop" class="roof">顶</span>
                            <span class="roof-tit">{{items.ArticleTitle}}</span>
                        </span>
                        <span class="roof-time">{{items.CreateDate | datefmt('YYYY-MM-DD')}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <Signed v-if="isSign" @closeSign="closeSign"/>
    </div>
</template>
<script>
import baseCard from '../../components/baseCard'
import {getLottery, getWiner, ExChange, getSysList} from "../../service/sign"
import {downloadFile, addSignInData} from "../../service/clientAPI"
import Signed from "../../components/signed"
import {analogJump} from "../../plugins/untils/public"
import Swiper from "swiper"
export default {
    layout: "main",
    components: {
        baseCard,
        Signed
    },
    data () {
        return {
            list:[],
            WinerList: [],
            prizes: 0,
            isSign: false,
            modal2: false,
            modal_loading: false,
            items: {},
            noticeList: [],
            ruleList: []
        }
    },
    async asyncData({store}) {
        try {
            let mg = await store.dispatch('getPrizeInfo');
            let ite = await store.dispatch('getItemEx');
            return {
                list: mg,
                ExItem:ite
            }
        } catch (error) {
            return {
                list: [],
                ExItem: []
            }
        }
    },
    created () {
        this.getWinerList()
        this.getNotice()
        this.getRule()
    },
    methods: {
        getNotice () {
            let q = {
                typeId : "2c6e6fba-8d1b-4718-a646-98fb14f73442",
                page:0
            }
            getSysList(q).then(res => {
                this.noticeList = res.retModels
            }).catch(err => {})
        },
        getRule () {
            let q = {
                typeId : "3689182c-b54d-42f5-8d65-85d8a6e78f87",
                page:0
            }
            getSysList(q).then(res => {
                this.ruleList = res.retModels
            }).catch(err => {})
        },
        viewAbout (row) {
            let routeData = this.$router.resolve({ name: 'details-id', params: { id: row.ArticleId } });
            analogJump(routeData.href);
        },
        // 兑换商品
        exchangeItems (row) {
            let that = this;
            this.$Modal.confirm({
                title: `<Icon type="ios-information-circle"></Icon><span>下载提示</span>`,
                content: `<div style="text-align:center">
                        <p>您此次将要兑换的奖品为${row.ItemName},所需积分${row.Integral},是否确认</p>
                    </div>`,
                loading: true,
                onOk: () => {
                    if (row.isExchange === 0) {
                        let q ={
                            EId: row.ID
                        }
                        that.modal_loading = true
                        ExChange(q).then(res => {
                            if (res) {
                                that.$Modal.remove();
                                row.isExchange = 1
                                row.Stock -= 1
                                that.downloadFiles(row.ItemId)
                            }
                        }).catch(err => {})
                    }
                }
            })
        },
        async downloadFiles (id) {
            let msg = await downloadFile(id);
            try {
                let name = msg.split('&')[1]
                var eleLink = document.createElement('a');
                eleLink.download = '';
                eleLink.style.display = 'none';
                eleLink.href = msg.split('&')[0];
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);
            } catch (error) {
                console.log('下载出错')
            }
        },
        closeSign () {
            this.isSign = false
        },
        async signeds () {
            let msg = await addSignInData();
            if (msg) {
                // this.account.IsSignIn = true
                this.isSign = true
            }
            
        },
        // 获取中奖者接口
        getWinerList () {
            let that = this
            getWiner().then(res => {
                that.WinerList = res
                that.initSwiper();
            }).catch(err => {})
        },
        // 抽奖
        startLot () {
            let that = this
            getLottery().then(res => {
                that.prizes = res
            }).then(res => {
                this.$refs.luckDraw.clickStartRoll()
            }).catch(err => {})
        },
        initSwiper () {
            let that= this;
            this.$nextTick(function () {
                new Swiper(".swiper-container",{
                    direction: 'vertical',
                    slidesPerView : "auto",
                    loopedSlides: 12,
                    speed: 100,
                    disableOnInteraction: true,  //触碰后自动切换停止
                    autoplay: {   
                        delay: 1000, 
                        stopOnLastSlide: false,   
                        disableOnInteraction: false
                    },
                    circular: true,
                    observer:true,
                    observeParents: true,//修改swiper的父元素时，自动初始化swiper
                    loop:true,  //循环
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .siNum {
        color: #ff3c00;
    }
    .luck{
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        font-size: 15px;
    }
    .sg {
        width: 1200px;
        margin: 0 auto;
        color: #333;
        &-top {
            display: flex;
            height: 200px;
            background: #fff;
            padding: 30px 30px;
            margin-top: 15px;
            &-left,&-right {
                width: 600px;
            }
        }
    }
    .user {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        float: left;
        overflow: hidden;
    }
    .user-sign {
        float: right;
        width: 440px;
        margin-left: 20px;
        &-name {
            font-size: 20px;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            span {
                line-height: 44px;
                &:last-child {
                    position: relative;
                    margin-right: 80px;
                    cursor: pointer;
                    width: 150px;
                    height: 44px;
                    line-height: 44px;
                    text-align: center;
                    border-radius: 44px;
                    cursor: pointer;
                    font-weight: 100;
                    background: #ff3c00;
                    color: #fff;
                    i {
                        position:absolute;
                        top: 26%;
                        left: 24%;
                    }
                }
            }
        }
        &-num {
            line-height: 30px;
            font-size: 12px;
            &-pir {
                font-size: 14px;
                font-weight: bold;
                color: #ff3c00;
                margin-top: 10px;
            }
        }
    }
    .exchange {
        margin-top: 15px;
        &-title {
            text-align: center;
            padding-bottom: 20px;
            &-h {
                text-align: center;
                position: relative;
                display: inline-block;
                &::before {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 7px;
                    background: url(../../assets/images/zuo.png) no-repeat;
                    width: 26px;
                    height: 14px;
                    left: -40px;
                }
                &::after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 7px;
                    background: url(../../assets/images/you.png) no-repeat;
                    width: 26px;
                    height: 14px;
                    right: -40px;
                }
            }
            &-sub {
                line-height: 24px;
                font-size: 14px;
            }
            &-con {
                margin-top: 15px;
                justify-content: space-between;
                display: flex;
                flex-wrap: wrap;
                background: #fff;
                padding: 20px 10px 30px;
            }
        }
    }
    .luckDraw {
        margin: 10px 0 0 70px;
    }
    .record {
        width: 500px;
        height: 520px;
        background: url(../../assets/images/zj_bg1.png) no-repeat 50% 90%;
        text-align: center;
        &-ul {
            color: #000;
            width: 330px;
            display: flex;
            line-height: 35px;
            justify-content: space-between;
            padding: 0 30px;
            span {
                &:last-child {
                    color: #ff3c00;
                }
            }
        }
    }
    .roof {
        display: inline-block;
        padding: 0 6px;
        background: #fc4d5a;
        color: #fff;
        font-size: 12px;
        margin-right: 6px;
        margin-top: 3px;
        border-radius: 2px;
    }
    .swiper-container {
        width: 330px;
        height: 420px;
        margin-top: 80px;
    }
    .swiper-slide {
        height: 35px !important;
    }
    .rule {
        display: flex;
        justify-content: space-between;
        &-right {
            float: right;
        }
        &-left {
            float: left;
        }
        &-left, &-right {
            width: 590px;
            padding: 20px;
            background: #fff;
            &-title {
                display: flex;
                justify-content: space-between;
                line-height: 30px;
                a {
                    :hover {
                        color: #ff3c00;
                    }
                }
            }
            &-content {
                li {
                    line-height: 30px;
                    border-bottom: 1px dashed #ddd;
                    margin: 10px;
                    cursor: pointer;
                    display: flex;
                    font-size: 14px;
                    justify-content: space-between;
                    &:hover {
                        color: #ff3c00;
                    }
                    &:last-child {
                        border: none;
                    }
                }
            }
        }
    }
</style>