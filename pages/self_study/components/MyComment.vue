<template>
    <ul class="sys">
        <li class="sys-item" v-for="(items, index) in commentList" :key="index">
            <div class="sys-item-comment"><span>{{items.NickName}}:</span>{{items.MsgContext}}</div>
            <div class="sys-item-content">
                <div class="sys-item-content-img">
                    <img :src="items.ItemTitleImg" alt="">
                </div>
                <div class="sys-item-content-pro">
                    <h4>《{{Iitems.temName}}》</h4>
                    <p>{{Iitems.ItemContent}}</p>
                    <p></p>
                </div>
            </div>
        </li>
    </ul>
</template>
<script>
import {getMyEvaluation} from "../../../service/course"
export default {
    data () {
        return {
            commentList: []
        }
    },
    methods: {
        getComment () {
            let that = this
            getMyEvaluation().then(res => {
                that.commentList = res
            }).catch(err => {})
        }
    }
}
</script>
<style lang="less" scoped>
.pages {
    text-align: center;
    margin: 30px 0;
}
.sys {
    font-size: 14px;
    &-item {
        padding: 10px 0 20px;
        border-bottom: 1px dashed #ddd;
        &:last-child {
            border-bottom: none;
        }
        &-comment {
            line-height: 24px;
            margin-bottom: 10px;
            span {
                color: #3bc66f;
                margin-right: 10px;
            }
        }
        &-content {
            display: flex;
            background: #f1f1f1;
            &-img {
                width: 100px;
                height: 100px;
                margin-right: 20px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            &-pro {
                h4 {
                    line-height: 30px;
                    margin-top: 10px;
                }
                p {
                    line-height: 30px;
                    color: #999;
                }
            }
        }
    }
}

</style>