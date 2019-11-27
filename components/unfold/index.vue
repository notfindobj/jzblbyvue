<template>
    <div class="unfold">
        <div v-if="!isUnfold" class="unfold-top" ref="redArticle" :style="`max-height: ${height+1}px`" v-html="getSimpleText(html)"></div>
        <div v-if="isUnfold" v-html="html"></div>
        <span class="unfold-btn" v-if="redArticle > height" @click="Unfold">
            {{!isUnfold ?'...展开': '收起'}}
        </span>
    </div>
</template>
<script>
export default {
    props: {
        html: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 65
        },
        isUnfold: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            redArticle: 0,
        }
    },
    mounted () {
        this.newAddBtn()
    },
    methods: {
        newAddBtn(){
            let _this = this;
            this.$nextTick(function () {
            if (_this.$refs.redArticle) {
                _this.redArticle = _this.$refs.redArticle.offsetHeight
            }
            })
        },
       getSimpleText(html){
            // 剔除除表情后的所有标签
            var re1 = new RegExp("<(?!(img).*(data-w-e)).*?>","g");//
            var msg = html.replace(re1,'');//执行替换成空字符
            return msg;
        },
        Unfold () {
            this.$emit('Unfold', !this.isUnfold)
        }
    },
}
</script>
<style lang="less" scoped>
    .unfold {
        position: relative;
        font-size: 14px;
        text-align: justify;
        &-top {
            overflow: hidden;
        }
        &-btn {
            color: #ff3c00;
            cursor: pointer;
            position: absolute;
            bottom: 0;
            right: 0;
            background: #fff;
            box-shadow: -11px 2px 17px #fff;
            border-radius: 5px;
            &:hover {
                text-decoration: underline;
            }
        }
    }
</style>