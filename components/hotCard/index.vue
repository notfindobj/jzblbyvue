<template>
    <div class="hotCard">
        <div class="hotCard-content">
            <img :src="baseUrlRegExp(hotCard.ImgSrc)" alt="">
        </div>
        <div class="hotCard-top">
            <span><i class="iconfont icon-chakan"></i>{{hotCard.itemOperateData.Views}}</span>
            <span><i class="iconfont icon-favorite"></i>{{hotCard.itemOperateData.Collections}}</span>
        </div>
        <div class="hotCard-foote" >
            <span v-html="hotCard.Title"></span>
        </div>
    </div>
</template>
<script>
import {getRanNum} from '../../plugins/untils/public'
export default {
    props: {
        hotCard: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    methods: {
        baseUrlRegExp (str) {
            let reg = RegExp(/\http:\/\//);
            if(str && str.match(reg)){
                return str
            } else {
                return process.env.fileBaseUrl+ str
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .hotCard {
        display: inline-block;
        margin-top: 10px;
        width: 285px;
        height: 230px;
        position: relative;
        border-radius: 3px;
        box-shadow: none;
        transition: box-shadow 1s;
        border: 1px solid #ccc;
        overflow: hidden;
        cursor: pointer;
        box-shadow: none;
        transition: box-shadow 1s;
        &-top {
            position: absolute;
            top: 0;
            color: #fff;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 5px 10px;
        }
        &-content img {
            width: 100%;
            height: 100%;
            transform: scale(1);
            transition: transform 1s;
        }
        &-foote {
            position: absolute;
            height: 45px;
            background: #fff;
            width: 100%;
            bottom: -45px;
            transition: bottom 1s ;
        }
        &:hover &-foote{
            transition: bottom 1s ;
            bottom: 0;
        }
        &:hover &-content > img{
            transition: transform 1s;
            transform: scale(1.5);
        }
        &:hover {
            transition: box-shadow 1s;
            box-shadow: 0 2px 15px #999999;
        }
    }
</style>