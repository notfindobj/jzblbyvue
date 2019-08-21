<template>
    <div>
        <Modal
            title="Title"
            v-model="showModal"
            :width="modalwidth"
            footer-hide
            :mask-closable="false"
            @on-visible-change="visibleChange"
            class-name="vertical-center-modal">
            <p slot="header" class="modal-header">
                <i v-if="isItLogged !== 'signIn' && isItLogged !== 'perOrCom'" @click="goBack(oldvals)" class="icon iconfont icon-jiantou1 modal-header-jiantou"></i>
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
import perOrCom from './perOrCom'
import comReg from './comReg'

export default {
    data () {
        return {
            showModal:  false,
            modalwidth: 400,
            isItLogged: 'signIn',
            oldvals: 'signIn',
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
        retrieve,
        perOrCom,
        comReg
    },
    watch: {
        showSign: function(newVal) {
            this.showModal = newVal
        },
        isItLoggedIn: function(newVal, oldVal) {
            this.oldvals = oldVal;
            this.isItLogged = newVal;
            if (newVal === 'signIn') {
                this.modalwidth = 400
            }
        }
    },
    methods: {
        visibleChange (val) {
            this.$store.dispatch('SETUP', val);
        },
        goBack (val) {
            this.isItLogged = val || 'signIn';
            this.modalwidth = 400;
            this.$store.dispatch('LOGGEDIN', val);
        },
        setTitle (val) {
            let title = ''
            switch(val) {
                case"signIn": 
                    title = "用户登录"
                    break;
                case"register": 
                    title = "个人用户注册"
                    break;
                case"retrieve": 
                    title = "忘记密码"
                    break;
                case"perOrCom": 
                    title = "选择注册类型"
                    break;
                case"comReg": 
                    this.modalwidth = 600
                    title = "企业用户注册"
                    break;
                default:
                    this.modalwidth = 400
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
