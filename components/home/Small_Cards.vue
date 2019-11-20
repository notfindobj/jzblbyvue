<template>
    <div class="cards" @click="viewItem(smallCardsDate)">
        <div class="cards-top">
            <div class="cards-top-bgimg">
                <div class="works-introduce-view"  v-show="smallCardsDate.IsDownload || smallCardsDate.IsCustomize">
                    <i v-if="smallCardsDate.IsDownload" class="iconfont icon-iconfontzhizuobiaozhun43" title="可下载"></i>
                    <i v-if="smallCardsDate.IsCustomize" class="iconfont icon-3ding" title="可定制"></i>
                </div>
                <img :src="smallCardsDate.ItemTitleImg" alt="" width=100% height=100% >
            </div>
            <div class="cards-eye">
                <div>
                    <i class="iconfont icon-chakan"></i>
                    {{ smallCardsDate.Views }}
                </div>
                <div class="cards-eye-name" @click.stop="vivewCol(smallCardsDate)">
                    <i class="iconfont icon-favorite"></i>
                    <span>{{smallCardsDate.Collections}}</span>
                </div>
            </div>
        </div>
        <div class="cards-foot">
            {{smallCardsDate.ItemName}}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        smallCardsDate: {
            type: Object,
            default: function () {
                return {}
            }
        },
        ClassType: {
            type: Object,
            // required: true,
            default: function () {
                return {}
            }
        }
    },
    data() {
        return {
            nam: 2.222
        }
    },
    methods: {
        viewItem (item) {
            this.$emit("viewItem", item)
        },
        vivewCol () {
            console.log('收藏')
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
                font-size: 22px !important;
            }
        }
    }
    .cards {
        position: relative;
        margin-top: 10px;
        display: inline-block;
        border-radius: 3px;
        border: 1px solid #ccc;
        box-shadow: none;
        transition: box-shadow .5s;
        &-top {
            position: relative;
            height: 194px;
            display: inline-block;
            cursor: pointer;
            &-bgimg {
                width: 283px;
                height: 194px;
                position: relative;
                overflow: hidden;
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
            z-index: 12;
        }
        &-foot {
            padding: 0 6px;
            line-height: 30px;
            color: #666666;
        }
        &-eye {
            position: absolute;
            display: flex;
            width: 100%;
            bottom: 3px;
            padding: 0 10px 0 6px;
            color: #ffffff;
            justify-content: space-between;
            &-name {
                display: none;
            }
        }
        &:hover {
            transition: box-shadow .5s;
            box-shadow: 0 2px 15px #999999;
        }
    }
</style>
