<template>
    <div>
        <div class="bl">
            <img width="30%" src="../../assets/images/top_logo.png" alt="">
            <div>
                电脑端访问www.jzbl.com <br>
                体验更好哦！
            </div>
        </div>
        <div class="activity">
            <Row :gutter="12">
                <Col v-for="(item, index) in GoodList" :key="index" :xs="12" :sm="12" :md="6" :lg="8">
                    <nuxt-link :to="`good_details/${item.ID}`">
                        <div class="activity-item-box">
                            <div class="ac">
                                <div class="ac-tit">
                                    <img  width="100%" height="100%" :src="item.ItemTitleImg" alt="">
                                </div>
                                <div class="la">
                                    <strong>{{item.ItemName}}</strong>
                                    <div class="la-btn">
                                        <p>{{item.ItemTag}}</p>
                                    </div>
                                    <div class="la-jia">
                                        <span>活动价： {{item.DiscountedPrice}}</span>
                                        <span>原价： {{item.OriginalPrice}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nuxt-link>
                </Col>
            </Row>
        </div>
        <div class="bl-ft">
            <p>活动咨询</p>
            <div style="text-align: center;">
                <div style="margin-bottom: 32px;">
                    <img src="../../assets/images/qr-code.jpg" width="50%" alt="微信公众号">
                    <p>
                        微信公众号
                    </p>
                </div>
                <div>
                    <img src="../../assets/images/weixinqun.png" width="46%" alt="微信交流群">
                     <p>
                        微信交流群
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import floating from '../../components/floating'
import {getSaleList} from "../../service/sign"
export default {
    layout: "chat",
    data () {
        return {
            GoodList: []
        }
    },
    components: {
        floating
    },
    created () {
        this.getDataList()
    },
    methods: {
        getDataList () {
            getSaleList().then(res => {
                if (res) {
                    this.GoodList = res
                }
            }).catch(err => {})
        }
    }
}
</script>
<style lang="less" scoped>
    .bl {
        background: #fff;
        padding: .8rem;
        display: flex;
        justify-content: space-between;

    }
    .bl-ft {
        background: #fff;
        margin-top: 2rem;
        padding: 1rem;
        p {
            font-size: 1.5rem;
        }
    }
    .activity {
        padding: 0 1rem;
        margin: 0 auto;
    }
    .ac {
        margin-top: 1rem;
        background: #fff;
        padding: .6rem;
        &-tit {
            overflow: hidden;
            height: 8rem;
        }
    }
    .la {
        padding: 15px; 
        strong {
            width: 100%;
            display: block;
            font-size: 20px;
            color: #333333;
        }
        &-jia {
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            margin-top: 10px;
            color: #ff3c00;
            span {
                &:last-child {
                    text-decoration: line-through;
                    color: #5e6065;
                }
            } 
        }
        p {
            height: 15px;
            margin-top: 10px;
            font-size: 12px;
            color: #666;
        }
    }
</style>