<template>
    <div class="dropdown" ref="dropdown" >
        <slot ></slot>
        <div v-if="Loading">
            加载中....
        </div>
    </div>
</template>
<script>
    export default {
        name:'crollBox',
        props: {
            crollHeight: {
                type: Number,
                default: 800
            },
            idLoading: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                pX: 0,
                pY: 0,
                Loading: true
            }
        },
        computed: {
            // Loading () {
            //     console.log('>>>>>>>>>>>>', this.idLoading)
            //     return this.idLoading
            // }
        },
        mounted () {
            let _this = this;
            window.onscroll= function(){
                //变量t是滚动条滚动时，距离顶部的距离
                const h = document.documentElement.clientHeight
                const t = document.documentElement.scrollTop||document.body.scrollTop;
                const s = document.querySelector('.dropdown').clientHeight; 
                const sh = document.documentElement.scrollHeight||document.body.scrollHeight;
                let bt = parseInt(sh- (h + t))
                // if( !(bt <= _this.crollHeight)){
                //     _this.Loading = true
                // }
                if (_this.Loading) {
                    if((_this.crollHeight-100) < bt < _this.crollHeight){
                        _this.Loading = false
                          console.log('执行加载')
                        _this.$emit('loadMore');
                        setTimeout(() => {
                            _this.Loading = true;
                            console.log('执行完成')
                        }, 5000)
                    }
                }
            }
        },
        methods: {
            
        }
    }
</script>`