<template>
    <div class="acc">
        <div class="ac" v-for="(item, index) in GoodList" :key="index" >
            <nuxt-link :to="`good_details/${item.ID}`">
                <div class="ac-tit">
                    <span class="hot"></span> 
                    <img width="100%" height="200" :src="item.ItemTitleImg" alt="">
                </div>
                <div class="la">
                    <strong>{{item.ItemName}}</strong>
                    <div class="la-btn">
                        {{item.ItemTag}}
                    </div>
                    <div class="la-jia">
                        <span>活动价：{{item.DiscountedPrice}}元</span>
                        <span>原价：{{item.OriginalPrice}}元</span>
                    </div>
                </div>
            </nuxt-link>
        </div>
    </div>
</template>
<script>
import {getSaleList} from "../../service/sign"
export default {
    layout: "main",
    data () {
        return {
            GoodList: []
        }
    },
    created () {
        this.getDataList()
    },
    mounted () {
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            this.$router.push('/m_activity')
        }else{
            this.$router.push('/activity')
        }
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
    .hot {
        background: url(../../assets/images/hot.png);
        width: 60px;
        height: 30px;
        background-size: 100% 100%;
        display: inline-block;
    }
    .la-btn {
        display: flex;
        justify-content: space-between;
        height: 38px;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        overflow: hidden;
        margin-top: 10px;
    }
    .acc {
        width: 1200px;
        margin: 0 auto;
        &::after, &::before {
            content: "";
            display: block;
            height: 0;
            clear:both;
            visibility: hidden;
        }
    }
    .la {
        padding: 15px; 
        strong {
            width: 100%;
            display: block;
            font-size: 18px;
            color: #333333;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
    .ac {
        margin-top: 15px;
        background: #fff;
        width: 280px;
        float: left;
        margin-right: 15px;
        &-tit {
            height: 200px;
            overflow: hidden;
            position: relative;
            cursor: pointer;
        }
        
    }
</style>