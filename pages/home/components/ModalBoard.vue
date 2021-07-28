<template>
    <div class="modal" ref="groupModal">
        <div class="modal-title">
            <span>{{title}}</span>
            <i class="icon iconfont icon-chahao3" @click="closeModal"></i>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: "新建群聊"
        }
    },
    mounted() {
        let taht = this
        document.addEventListener('click',e => {
            if(this.$refs.groupModal && !this.$refs.groupModal.contains(e.target)){
                this.$emit("groupModal")
            }
        })
    },
    methods: {
        closeModal () {
            this.$emit("closeModal")
        }
    }
}
</script>
<style lang="less" scoped>
    .modal {
        position: fixed;
        min-width: 200px;
        min-height: 200px;
        top: 43%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        background: #fff;
        box-shadow: 0 0px 10px #000;
        &-title{
            padding-left: 20px;
            line-height: 44px;
            position: relative;
            border-bottom: 1px solid #ededed;
            margin-bottom: 10px;
            span {
                font-size: 18px;
            }
            i {
                position: absolute;
                right: 15px;
                cursor: pointer;
                z-index: 99;
                &:hover {
                    color: #ff3c00;
                }
            }
        }
    }
</style>