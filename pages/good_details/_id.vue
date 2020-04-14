<template>
    <div>
        <Breadcrumb separator=">" class="box">
            <BreadcrumbItem>当前位置：</BreadcrumbItem>
            <BreadcrumbItem to="/">建筑部落</BreadcrumbItem>
            <BreadcrumbItem to="/activity">特价商品</BreadcrumbItem>
            <BreadcrumbItem>{{SaleDetail.ItemName}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="good">
            <div class="good-lf" v-html="SaleDetail.ItemContent"></div>
            <div class="good-rf">
                <div class="good-Head">
                    <img :src="SaleDetail.CreateUserHeadIcon" alt="" width="80px" height="80px">
                </div>
                <ul>
                    <li><label>发布人:</label> <span>{{SaleDetail.CreateUserName}}</span></li>
                    <li><label>商品名称:</label> <span>{{SaleDetail.ItemName}}</span></li>
                    <li class="good-sub"><label >商品描述:</label> <span>{{SaleDetail.ItemTag}}</span></li>
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
import play from "./component/play"
import ToTop from '../../components/toTop'
export default {
    layout: "main",
    data () {
        return {
            isDown: false,
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
    methods: {
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
</style>