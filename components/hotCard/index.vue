<template>
    <div class="hotCard" @click="enterBuild(hotCard)">
        <div class="hotCard-content">
            <img :src="hotCard.ImgSrc" alt="">
        </div>
        <div class="hotCard-top">
            <span><i class="iconfont icon-chakan"></i>{{hotCard.itemOperateData.ReadCount}}</span>
            <span><i class="iconfont icon-favorite"></i>{{hotCard.itemOperateData.CollectionCount}}</span>
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
        enterBuild (hotCard) {
            this.$emit('enterBuild', hotCard);
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
        border: 1px solid #ccc;
        overflow: hidden;
        cursor: pointer;
        box-shadow: none;
        transition: box-shadow .5s;
        &-top {
            position: absolute;
            top: 0;
            color: #fff;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 5px 10px;
        }
        &-content {
            height: 230px;;
            img {
                width: 100%;
                height: 100%;
                transform: scale(1);
                transition: transform .5s;
            }
        }
        &-foote {
            position: absolute;
            padding-left: 10px;
            height: 40px;
            background: #fff;
            line-height: 20px;
            width: 100%;
            bottom: -45px;
            transition: bottom .5s ;
        }
        &:hover &-foote{
            transition: bottom .5s ;
            bottom: 0;
        }
        &:hover &-content > img{
            transition: transform .5s;
            transform: scale(1.2);
        }
        &:hover {
            transition: box-shadow .5s;
            box-shadow: 0 2px 15px #999999;
        }
    }
</style>