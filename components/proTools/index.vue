<template>
    <ul class="pro-tool">
        <li>
            <span  @click="goDetail(itemTools)">
                <i class="icon iconfont icon-yidongappxiexiaoxi"></i>
                <span>写问答</span>
            </span>
        </li>
        <li>
            <span @click="goDetail(itemTools)">
                <i class="icon iconfont">&#xe664;</i>
                <span>评论 {{itemTools.ReplyCount}}</span>
            </span>
        </li>
        <li>
            <span @click="Collection(itemTools)">
                <i class="iconfont icon-cc-star"></i>
                <span>收藏</span>
            </span>
        </li>
        <li>
            <span>
                <i class="iconfont">&#xe6be;</i>
                <span>转发</span>
            </span>
        </li>
        <li>
            <span @click="liked(itemTools)">
                <i class="iconfont icon-dianzan1"></i>
                <span>点赞</span>
            </span>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        itemTools: {
            type:Object,
            default: () => {}
        }
    },
    methods: {
        goDetail (row) {
            this.$emit('goDetail', row.QAId);
        },
        Collection (row) {
            this.$emit('collection', row);
        },
        liked (row) {
            this.$emit('liked', row);
        }
    },
}
</script>
<style lang="less" scoped>
    .pro-tool {
        font-size: 14px;
        display: flex;
        flex: 1;
        justify-content: space-around;
        line-height: 40px;
        li {
            width: 100%;
            text-align: center;
            span {
                cursor: pointer;
                &:hover {
                    color: #ff3c00;
                }
            }
        }
    }
</style>