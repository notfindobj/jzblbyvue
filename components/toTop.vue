<template>
    <div>
        <div v-if="scrollTop >= 400" class="to-top" @click="scrollToTop" v-show="isShowToTop">
            <Icon type="ios-arrow-up" color="#fff" size="30"/>
        </div>
        <div class="code-content qr-code">
            <img :src="qrCode" alt="" width="100%" height="100%" @mouseenter="mousemoveShowQr(true)" @mouseout="mousemoveShowQr(false)"> 
        </div>
        <div class="code-content code-er" v-if="isShowQr">
            <div class="er-box">
                <img :src="qrCode" alt="" width="100%" height="100%"> 
            </div>
            <i class="code-jian"></i>
        </div>
        <div v-if="isDemand" class="content pushObj"  @click="goPublish">发布</div>
        <div v-else class="demand"  @click="publishDemand">发布需求</div>
    </div>
</template>
<script>
import {addEvent} from '../plugins/untils/public'
import { mapGetters} from 'vuex'
export default {
    props: {
        isShowToTop: {
            type: Boolean,
            default: true
        },
        isDemand: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        ...mapGetters(['isLogin'])
    },
    data() {
        return {
            scrollTop: '',
            isShowQr: false,
            qrCode: require('../assets/images/qr-code.jpg')
        }
    },
    mounted() {
        let _this = this;
        addEvent(window,'scroll',function(){
            _this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        })
    },
    methods: {
        mousemoveShowQr (val) {
            this.isShowQr = val;
        },
        scrollToTop() {
            (function smoothscroll(){
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo (0,currentScroll - (currentScroll/5));
                }
            })();
        },
        publishDemand () {
            if (!this.isLogin) {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
                return false
            }
            this.$router.push('/release_demand')
        },
        goPublish() {
            if (!this.isLogin) {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
                return false
            }
            this.$router.push('/publish')
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
        background-color: #fff;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        transition: all .1s ease-in;
    }
    .demand {
        position: fixed;
        left: 50%;
        margin-left: 600px;
        width: 35px;
        padding-left: 5px;
        height: 80px;
        writing-mode: vertical-lr;
        text-align: center;
        top: 156px;
        background-color: #ff3c00;
        cursor: pointer;
        color: #fff;
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
    .code-content {
        bottom: 159px;
        margin-bottom: 1px;
        color: #fff;
        font-size: 16px;
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
    //  二维码
    .qr-code {
        bottom: 159px;
        width: 50px;
        height: 50px;
        padding: 8px;
        margin-bottom: 1px;
        color: #fff;
        background: #fff !important;
        font-size: 16px;
    }
    .code-content {
        position: fixed;
        left: 50%;
        margin-left: 600px;
        height: 50px;
        background-color: #C1C1C1;
        border-radius: 5px;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        transition: all .1s ease-in;
    }
    .code-er {
        bottom: 130px;
        padding: 10px;
        margin-bottom: 1px;
        color: #fff;
        font-size: 16px;
        left: 43%;
        height: 120px;
        width: 120px;
        z-index: 999999;
    }
    .er-box {
        width: 120px;
        height: 120px;;
        position: absolute;
        background: #fff;
        left: 0;
        top: 0;
        padding: 10px;
        z-index: 10;
    }
    .code-jian {
        position: absolute;
        width: 40px;
        background: #fff;
        height: 40px;
        transform: rotate(45deg);
        border-radius: 5px;
        right: -6px;
        top: 45px;
    }
</style>
