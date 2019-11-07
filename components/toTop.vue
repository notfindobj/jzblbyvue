<template>
    <div v-show="scrollTop >= 0">
        <div class="to-top" @click="scrollToTop" v-show="isShowToTop">
            <Icon type="ios-arrow-up" color="#fff" size="30"/>
        </div>
        <div class="content pushObj"  @click="goPublish">发布</div>
        <!-- <div class="content my-tribe"  @click="goPublish">
            <p>我的</p>
            <p>部落</p>
        </div> -->
    </div>
</template>
<script>
import {addEvent} from '../plugins/untils/public'
export default {
    props: {
        isShowToTop: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            scrollTop: ''
        }
    },
    mounted() {
        addEvent(window,'scroll',function(){
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        })
    },
    methods: {
        scrollToTop() {
            (function smoothscroll(){
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo (0,currentScroll - (currentScroll/5));
                }
            })();
        },
        goPublish() {
            this.$router.push('/publish/imageText')
        }
    }
}
</script>

<style lang="less" scoped>
    .to-top, .content {
        position: fixed;
        left: 50%;
        margin-left: 600px;
        bottom: 110px;
        width: 50px;
        height: 50px;
        background-color: #C1C1C1;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        transition: all .1s ease-in;
    }
    .content {
        bottom: 200px;
        margin-bottom: 1px;
        color: #fff;
        font-size: 16px;
    }
    .content:hover, .to-top:hover {
        background-color: #ff3c00;
        
    }
    .pushObj {
        top: 156px;
        background-color: #ff3c00;
        border-radius: 50%;
    }
    .my-tribe {
        top: 207px;
        background-color: #ff3c00;
        border-radius: 50%; 
        font-size: 12px;
        line-height: 20px;
        padding-top: 5px;
    }
    .ivu-icon-ios-arrow-up {
        color: #ff3c00 !important;
    }
    .to-top:hover .ivu-icon-ios-arrow-up {
        color: #ffffff !important;
    }
</style>
