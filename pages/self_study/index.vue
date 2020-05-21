<template>
    <div class="study">
        <div class="study-lf">
            <div class="header">
                <span class="header-img">
                    <img src="https://thirdwx.qlogo.cn/mmopen/UzDKzRS1VCa9KTO83t1tmVNeiadrb2ibNvS8A57ibvxmQ4O5w0Sic7IYHY8KL9UD9pPrxsPKrcUrBQmibudxfs9h4nyCpnyLxibMg5/132" alt="">
                </span>
                <p class="header-name">初九</p>
            </div>
            <ul class="nav">
                <li class="active">课程订单</li>
                <li>后台管理</li>
                <li>我的评论</li>
            </ul>
        </div>
        <div class="study-lr">
            <Backstage/>
        </div>
    </div>
</template>
<script>
import Backstage from "./components/Backstage"
export default {
    layout: "course",
    components:{
        Backstage
    }
}
</script>
<style lang="less" scoped>
    .study {
        width: 1200px;
        margin: 15px auto;
        display: flex;
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