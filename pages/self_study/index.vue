<template>
    <div class="study">
        <div class="study-lf">
            <div class="header">
                <span class="header-img">
                    <img src="https://thirdwx.qlogo.cn/mmopen/UzDKzRS1VCa9KTO83t1tmVNeiadrb2ibNvS8A57ibvxmQ4O5w0Sic7IYHY8KL9UD9pPrxsPKrcUrBQmibudxfs9h4nyCpnyLxibMg5/132" alt="">
                </span>
                <p class="header-name">初九</p>
            </div>
            <ul class="nav" @click="clickTab()">
                <li data-index="0" :class="indexStudy === 0 ? 'active' : ''" >我的学习</li>
                <li data-index="1" :class="indexStudy === 1 ? 'active' : ''">我的评论</li>
                <li data-index="2" :class="indexStudy === 2 ? 'active' : ''">课程订单</li>
                <li data-index="3" :class="indexStudy === 3 ? 'active' : ''">后台管理</li>
            </ul>
        </div>
        <div class="study-lr">
            <MyStudy v-if="indexStudy === 0" />
            <MyComment v-if="indexStudy === 1"/>
            <CourseOrder v-if="indexStudy === 2"/>
            <Backstage v-if="indexStudy === 3"/>
        </div>
    </div>
</template>
<script>
import Backstage from "./components/Backstage"
import CourseOrder from "./components/CourseOrder"
import MyStudy from "./components/MyStudy"
import MyComment from "./components/MyComment"
export default {
    layout: "course",
    components:{
        Backstage,
        CourseOrder,
        MyStudy,
        MyComment
    },
    data () {
        return {
            indexStudy: 0
        }
    },
    methods: {
        clickTab () {
            let index = Number(event.target.attributes["data-index"].value);
            this.indexStudy = index;
        }
    }
}
</script>
<style lang="less" scoped>
    .study {
        width: 1200px;
        margin: 15px auto;
        display: flex;
        align-items: flex-start;
        &-lf {
            width: 200px;
            margin-right: 20px;
            background: #fff;
        }
        &-lr {
            width: 980px;
            background: #fff;
            padding: 10px 15px;
        }
    }
    .header{
        border-bottom: 1px solid #f1efef;
        padding-bottom: 15px;
        &-img {
            display: block;
            width: 90px;
            height: 90px;
            margin: 10px auto 0 auto;
            border: solid 6px #f1efef;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        &-name {
            margin-top: 6px;
            font-size: 16px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .nav {
        padding: 10px 15px;
        font-size: 14px;
        li {
            padding-left: 60px;
            cursor: pointer;
            position: relative;
            margin: 10px 0;
            font-size: 16px;
            line-height: 30px;
        }
        li.active {
            &::before {
                content: "";
                display: inline-block;
                position: absolute;
                width: 3px;
                height: 30px;
                background: #3bc66f;
                left: -15px;
            }
        }
    }
</style>