<template>
    <div class="dropdown">
        <slot></slot>
        <div v-if="!isLast" class="loading-box">
            <div class="loading-wrap" v-if="isShowLoadingIcon">
                <i class="icon iconfont loading-icon" >&#xe6ac;</i>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'crollBox',
        props: {
            isLast: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                isShowLoadingIcon: false
            }
        },
        mounted() {
            window.onscroll = () => {
                //变量t是滚动条滚动时，距离顶部的距离
                const h = document.documentElement.clientHeight;
                const t = document.documentElement.scrollTop || document.body.scrollTop;
                const sh = document.documentElement.scrollHeight || document.body.scrollHeight;
                let bt = parseInt(sh - (h + t));
                if (this.isShowLoadingIcon) {
                    this.isShowLoadingIcon = false;
                }
                if (bt <= 10) {
                    if (!this.isLast) {
                        this.isShowLoadingIcon = true
                    }
                    this.debounce(this.$emit('willReachBottom'), 1500)
                }
            }
        },
        methods: {
            debounce(fn, wait) {    
                var timeout = null;    
                return function() {        
                    if(timeout !== null)   clearTimeout(timeout);        
                    timeout = setTimeout(fn, wait);    
                }
            }
        }
    }
</script>
<style scoped lang="less">
    @keyframes rotate {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .loading-box {
        text-align: center;
        padding: 10px 0 20px;

        .loading-wrap {
            width: 30px;
            height: 30px;
            margin: 0 auto;
            text-align: center;
            line-height: 30px;
            animation: rotate 1.2s linear infinite;
        }

        .loading-icon {
            font-size: 30px;
        }
    }

</style>
