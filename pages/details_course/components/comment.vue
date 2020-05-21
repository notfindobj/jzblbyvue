<template>
    <div class="comment">
        <ul class="comment-wrap">
            <li class="comment-wrap-list" v-for="(items, index) in evaluation" :key="index">
                <div class="comment-wrap-list-header">
                    <img :src="items.HeadIcon" alt="">
                </div>
                <div class="comment-wrap-list-content">
                    <span>{{items.CreateDate}}</span>
                    <p>{{items.Contents}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        evaluation: {
            type: Array,
            default: () => []
        }
    }
}
</script>
<style lang="less" scoped>
.comment {
    &-wrap {
        &-list {
            padding-top: 30px;
            padding-bottom: 30px;
            border-bottom: 1px dashed #eee;
            display: flex;
            &-header {
                width: 50px;
                height: 50px;
                display: inline-block;
                overflow: hidden;
                margin-right: 20px;
                border-radius: 50%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            &-content {
                span {
                    font-size: 12px;
                    color: #999;
                }
                p {
                    font-size: 14px;
                    margin: 20px 0;
                }
            }
            &:last-child {
                border-bottom: none
            }
        }
    }
}
</style>