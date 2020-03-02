<template>
    <div class="cards">
        <div class="cards-top" @click="viewItem(bigCardsDate)">
            <div class="cards-top-bgimg">
                <div class="works-introduce-view"  v-show="bigCardsDate.IsDownload || bigCardsDate.IsCustomize">
                    <i v-if="bigCardsDate.IsDownload" class="iconfont icon-iconfontzhizuobiaozhun43" title="可下载"></i>
                    <i v-if="bigCardsDate.IsCustomize" class="iconfont icon-3ding" title="可定制"></i>
                </div>
                <img :src="bigCardsDate.ItemTitleImg" alt="" width=100% height=100% >
            </div>
            <div class="cards-eye">
                <div>
                    <i class="iconfont icon-chakan"></i>
                    {{ bigCardsDate.Views }}
                </div>
                <div class="cards-eye-name">
                    <i class="iconfont icon-favorite"></i>
                    <span>{{bigCardsDate.Collections}}</span>
                </div>
            </div>
        </div>
        <div class="cards-foot">
            <div class="cards-foot-title">{{bigCardsDate.ItemName}}</div>
            <div class="cards-foot-sub">{{bigCardsDate.Address}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        bigCardsDate: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    beforeCreate () {},
    data() {
        return {
            nam: 2.222
        }
    },
    methods: {
        viewItem (item) {
            this.$emit("viewItem", item)
        }
    }
}
</script>
<style lang="less" scoped>
    .works-introduce-view {
        position: absolute;
        color: #ff3c00;
        i {
            &::before {
                font-size: 26px !important;
            }
        }
    }
    .cards {
        position: relative;
        margin-top: 5px;
        display: inline-block;
        border-radius: 3px;
        height: 466px;
        border: 1px solid #ccc;
        box-shadow: none;
        transition: box-shadow .5s;
        &-top {
            position: relative;
            height: 356px;
            display: inline-block;
            cursor: pointer;
            &-bgimg {
                width: 594px;
                overflow: hidden;
                height: 356px;
                img {
                    width: 100%;
                    height: 100%; 
                    transform: scale(1);
                    transition: transform 1s;
                }
                &:hover img {
                    transform: scale(1.2);
                    transition: transform 1s;
                }
            }
        }
        &-top:hover .cards-eye-name{
            display: block;
        }
        &-foot {
            padding: 0 6px;
            font-size: 14px;
            line-height: 30px;
            color: #666666;
            &-title {
                // text-align: left;
                font-size: 20px;
                padding: 20px 0 10px;
            }
            &-sub {
                padding-bottom: 20px;
            }
        }
        &-eye {
            position: absolute;
            display: none;
            display: flex;
            width: 100%;
            bottom: 3px;
            padding: 0 10px 0 6px;
            color: #ffffff;
            justify-content: space-between;
            &-name {
                display: none
            }
        }
        &:hover {
            transition: box-shadow .5s;
            box-shadow: 0 2px 15px #999999;
        }
    }
</style>
