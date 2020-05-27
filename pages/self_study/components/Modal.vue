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
            default: "新建课程"
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
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        background: #fff;
        box-shadow: 0 0px 10px #000;
        &-title{
            text-align: center;
            line-height: 45px;
            background: #ddd;
            position: relative;
            span {
                font-size: 14px;
                font-weight: bold;
            }
            i {
                position: absolute;
                right: 15px;
                cursor: pointer;
                &:hover {
                    color: #ff3c00;
                }
            }
        }
    }
</style>