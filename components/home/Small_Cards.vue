<template>
    <div class="cards" @click="viewItem(smallCardsDate)">
        <div class="cards-top">
            <div class="cards-top-bgimg">
                <img :src="smallCardsDate.ItemTitleImg" alt="" width=100% height=100% >
            </div>
            <div class="cards-eye">
                <div>
                    <i class="iconfont icon-shangchuan"></i>
                    {{ smallCardsDate.Views }}
                </div>
                <div class="cards-eye-name" @click.stop="vivewCol(smallCardsDate)">
                    <i class="iconfont icon-shangchuan"></i>
                    <span>{{smallCardsDate.CreateUserName}}</span>
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
    .cards {
        position: relative;
        margin-top: 10px;
        display: inline-block;
        border-radius: 3px;
        border: 1px solid #ccc;
        &-top {
            position: relative;
            height: 194px;
            display: inline-block;
            cursor: pointer;
            &-bgimg {
                width: 283px;
                height: 194px;
                // background-repeat: no-repeat;
                // background-size: cover;
                // object-fit: fill;
                img {
                    width: 100%;
                    height: 100%;
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
            box-shadow: 0 2px 15px #999999;
        }
    }
</style>
