<template>
    <div>
        <Breadcrumb separator=">" class="box">
            <BreadcrumbItem>当前位置：</BreadcrumbItem>
            <BreadcrumbItem to="/">建筑部落</BreadcrumbItem>
            <BreadcrumbItem to="/activity">特价商品</BreadcrumbItem>
            <BreadcrumbItem>{{SaleDetail.ItemName}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="view-left-move-del" @mouseenter="mousemoveLeft(1)"
            @mouseleave="mousemoveRight" @click="moveLeftClick(1)">
            <img :src="!isLeft ? isLeftPngF : isLeftPngR" width="50px" alt="">
        </div>
        <div class="view-right-move-del" @mouseenter="mousemoveLeft(2)"
            @mouseleave="mousemoveRight" @click="moveLeftClick(2)">
            <img class="moveRight" :src="!isRight ? isLeftPngF : isLeftPngR" width="50px" alt="">
        </div>
        <div class="good">
            <div class="good-lf" id="pictureBox" >
                <div v-html="SaleDetail.ItemContent"></div>
            </div>
            <div class="good-rf">
                <div class="good-Head">
                    <img :src="SaleDetail.CreateUserHeadIcon" alt="" width="80px" height="80px">
                </div>
                <ul>
                    <li><label class="good-h">发布人:</label><span>{{SaleDetail.CreateUserName}}</span></li>
                    <li><label class="good-h">联系电话:</label><span>{{SaleDetail.Phone}}</span></li>
                    <li><label class="good-h">商品名称:</label> <span>{{SaleDetail.ItemName}}</span></li>
                    <li class="good-sub"><label  class="good-h">商品描述:</label> <span>{{SaleDetail.ItemTag}}</span></li>
                    <li class="good-coun"><span>活动价：{{SaleDetail.DiscountedPrice}}元</span><span>原价：{{SaleDetail.OriginalPrice}}元</span></li>
                     <li  class="good-dwon">
                        <span><span>立即下载：</span><a :href="SaleDetail.Link" target="_blank" >{{SaleDetail.Link}}</a></span>
                    </li>
                    <li v-if="SaleDetail.isbuy === 0" class="good-btn"><span @click="openPlay">获取提取码</span></li>
                    <li v-if="SaleDetail.isbuy === 1" class="good-dwon">
                        <span  @click="copyToClip(SaleDetail.Code)">提取码: {{SaleDetail.Code}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <play :setMeal="SaleDetail" v-if="isDown" @closePay="closePay"/>
        <ToTop />
    </div>
</template>
<script>
import Viewer from 'viewerjs';
import play from "./component/play"
import ToTop from '../../components/toTop'
export default {
    layout: "main",
    data () {
        return {
            isDown: false,
            isShowViewBox: false,
            isLeftPngF: require('../../assets/images/leftButtonColor.png'),
            isLeftPngR: require('../../assets/images/leftButton.png'),
            isLeft: false,
            isRight: false,
            Viewer: {},
            setMeal: {
                Money: 50
            }
        }
    },
    components: {
        play,
        ToTop
    },
    async asyncData({route, store}) {
        try {
            let q = {
                Id: route.params.id
            }
            let ms = await store.dispatch('getSaleDetails', q);
            return {
                SaleDetail: ms
            }
        } catch (error) {
            return {
                SaleDetail: {}
            }
        }
    },
    mounted() {
      this.initView()
    },
    methods: {
        viewShowBox() {
            document.getElementsByTagName('body')[0].className = '';
            document.body.style.paddingRight = '0';
            this.isShowViewBox = false;
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
        mousemoveRight() {
            this.isLeft = false
            this.isRight = false
        },
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
        closePay (row) {
            this.isDown = !this.isDown
            if (row) {
                this.SaleDetail.Link = row.link
                this.SaleDetail.Code = row.code
                this.SaleDetail.isbuy = row.status
            }
        },
        openPlay () {
            this.isDown = !this.isDown
        },
        copyToClip(content, message) {
            let aux = document.createElement("input"); 
            aux.setAttribute("value", content); 
            document.body.appendChild(aux); 
            aux.select();
            document.execCommand("copy"); 
            document.body.removeChild(aux);
            if (message == null) {
                alert("复制成功");
            } else{
                alert(message);
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .good-h {
        font-weight: bold;
    }
    .good-Head {
        text-align: center;
        img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
        }
    }
    .good-dwon {
        display: flex;
        justify-content: space-between;
        font-size: 15px;
        color: #000;
        font-weight: bold;
        a {
            font-weight: 100;
            font-size: 12px;
            &:hover {
                color: #eb4844;
            }
        }
    }
    .box {
        width: 1200px;
        margin: 10px auto;
    }
    .good {
    width: 1200px;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
    &-lf {
        width: 840px;
        padding: 15px;
        background: #fff;
        overflow: hidden;
        line-height: 25px;
        font-size: 14px;
        text-align: justify;
        color: #333;
        p {
            img {
                width: 100%;
            }
        }
        img {
            width: 100%;
        }
    }
    &-rf {
        width: 340px;
        background: #fff;
        height: 30%;
        position: sticky;
        top: 70px;
        text-align: left;
        line-height: 25px;
        font-size: 14px;
        padding: 15px 20px;
        label {
            width: 70px;
            display: inline-block;
        }
    }
}
.good-coun {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    margin: 10px 0;
    color: #eb4844;
    span {
        &:last-child {
            text-decoration: line-through;
            color: #807e7e;
        }
    }
}
.good-btn {
    span {
        display: inline-block;
        width: 100%;
        background: #eb4844;
        text-align: center;
        color: #fff;
        padding: 8px 10px;
        margin-bottom: 10px;
        border-radius: 3px;
        font-size: 16px;
        cursor: pointer;
    }
}
.good-sub {
    span {
        white-space: pre-wrap;
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