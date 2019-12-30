<template>
    <div class="card">
        <div class="card-left">
           <img :src="content.HeadIcon" alt="">
        </div>
        <div class="card-right">
            <div class="card-right-title">
                <slot name="header">
                    <span>{{content.MsgTitle}}</span>
                </slot>
                <i class="icon iconfont icon-chahao3"></i>
            </div>
            <div class="card-right-body">
                <slot name="body">
                    <div class="card-right-body-content">
                        {{content.Description}}
                    </div>
                    <div class="card-right-body-img" v-if="content.ItemTitleImg" @click="clickCom(content)">
                        <img :src="content.ItemTitleImg" alt="">
                    </div>
                 </slot>
            </div>
            <div>
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        content: {
            type: Object,
            default: () => {}   
        }
    },
    methods: {
        clickCom (row) {
            this.$emit('clickCom', row)
        }
    },
}
</script>
<style lang="less" scoped>
    .card {
        display: flex;
        width: 480px;
        flex: start;
        margin-top: 20px;
        cursor: pointer;
        &:hover .card-right-title i{
            display: inline-block;
        }
        &-left {
            width: 40px;
            height: 40px;
            overflow: hidden;
            border-radius: 50%;
            margin: 0 15px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        &-right {
            background: #f5f5f5;
            width: 400px;
            border-radius: 3px;
            padding: 10px;
            &-title {
                display: flex;
                position: relative;
                span {
                    font-size: 14px;
                    font-weight: 600;
                }
                i {
                    position: absolute;
                    right: -7px;
                    top: -10px;
                    font-size: 12px;
                    display: none;
                }
            }
            &-body {
                &-content {
                    margin: 10px 0;
                    color: #5f5f5f;
                }
                &-img {
                    height: 165px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    
                }
            }
        }
    }
</style>