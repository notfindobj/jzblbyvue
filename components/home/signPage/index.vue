<template>
    <div>
        <Modal
            title="Title"
            v-model="showModal"
            width="400"
            footer-hide
            :mask-closable="false"
            @on-visible-change="visibleChange"
            class-name="vertical-center-modal">
            <p slot="header" class="modal-header">
                <i v-if="isItLogged === 'retrieve'" @click="goBack" class="icon iconfont icon-jiantou1 modal-header-jiantou"></i>
                <span>{{setTitle(isItLogged)}}</span>
            </p>
            <div :is="isItLogged" class="modal-box"></div>
        </Modal>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import signIn from './signIn'
import register from './register'
import retrieve from './retrieve'
export default {
    data () {
        return {
            showModal:  false,
            isItLogged: 'signIn'
        }
    },
    computed: {
        ...mapState({
            showSign: state => state.overas.showSign,
            isItLoggedIn: state => state.overas.isItLoggedIn
        })
    },
    components: {
        signIn,
        register,
        retrieve
    },
    watch: {
        showSign: function(newVal) {
            this.showModal = newVal
        },
        isItLoggedIn: function(newVal) {
            this.isItLogged = newVal
        }
    },
    methods: {
        visibleChange (val) {
            this.$store.dispatch('SETUP', val);
        },
        goBack () {
            this.isItLogged = 'signIn'
            this.$store.dispatch('LOGGEDIN', 'signIn');
        },
        setTitle (val) {
            let title = ''
            switch(val) {
                case"signIn": 
                    title = "用户登录"
                    break;
                case"register": 
                    title = "用户注册"
                    break;
                case"retrieve": 
                    title = "忘记密码"
                    break;
                default:
                    title = "用户登录"
            }
            return title
        }
    }
}
</script>
<style lang="less" scoped>
    .modal-header {
        font-size: 20px;
        line-height: 28px;
        height: 30px;
        color: #333333;
        text-align: center;
        &-jiantou {
            position: absolute;
            left: 32px;
            cursor: pointer;
        }
    }
    .modal-box {
        padding: 10px 14px 24px 14px;
    }
    .ivu-modal-header {
        border-bottom: none !important;
    }
</style>
