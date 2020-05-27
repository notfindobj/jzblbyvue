<template>
    <div class="modal" ref="groupModal">
        <div class="modal-title">
            <span>{{title}}</span>
            <p>至少选1个，最多选4个，可随时调整</p>
            <i class="icon iconfont icon-chahao3" @click="closeModal"></i>
        </div>
        <div class="modal-boby">
            <ul class="modal-boby-course">
                <li v-for="(items, index) in field" :key="index" :class="selectField.includes(items.typeId) ? 'active' :'' " @click="selectFields(items.typeId)">{{items.typename}}</li>
            </ul>
        </div>
        <div class="modal-foot">
            <span class="modal-foot-btn" @click="closeModal">选好了</span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: "选择你想要学习的领域"
        },
        field: {
            type: Array,
            default: ()=> []
        },
    },
    data () {
        return {
            selectField: []
        }
    },
    mounted() {
        let taht = this
        this.$nextTick(function () {
            if (!localStorage.getItem("field")) {
                let fl = []
                taht.field.forEach((ele, index) => {
                    if (index < 4) {
                        fl.push(ele.typeId)
                    }
                })
                taht.selectField = fl
            } else {
                taht.selectField = localStorage.getItem("field").split(",")
            }
        })
        document.addEventListener('click',e => {
            if(this.$refs.groupModal && !this.$refs.groupModal.contains(e.target)){
                this.$emit("groupModal")
            }
        })
    },
    methods: {
        selectFields (id) {
            let flag = true
            let index = 0
            this.selectField.forEach((ele, inx) => {
                if (ele === id) {
                    flag = false
                    index = inx
                }
            })
            if (flag) {
                if (this.selectField.length > 3) {
                    this.$Message.warning("最多选4个")
                    return false
                }
                this.selectField.push(id)
            } else {
                this.selectField.splice(index, 1)
            }
            localStorage.setItem("field", this.selectField)
        },
        closeModal () {
            if (this.selectField.length < 1) {
                this.$Message.warning("最少选1个")
                return false
            }
            this.$emit("closeModal")
        }
    }
}
</script>
<style lang="less" scoped>
    .modal {
        padding: 50px;
        background-color: #fff;
        width: 637px;
        height: 436px;
        box-sizing: border-box;
        border-radius: 6px;
        position: fixed;
        min-width: 200px;
        min-height: 200px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 99;
        box-shadow: 0 0px 10px #000;
        &-title{
            text-align: center;
            position: relative;
            span {
                font-size: 20px;
                color: #333;
                margin-bottom: 20px;
            }
            i {
                position: absolute;
                right: 15px;
                top: 0;
                cursor: pointer;
                &:hover {
                    color: #ff3c00;
                }
            }
        }
        &-boby {
            &-course {
                display: flex;
                align-content: space-between;
                justify-content: flex-start;
                flex-wrap: wrap;
                li {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 120px;
                    height: 40px;
                    box-sizing: border-box;
                    border: 1px solid #eee;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-top: 15px;
                    margin-right: 19px;
                    &:nth-child(4n) {
                        margin-right: 0;
                    }
                }
                li.active {
                    color: #1abc9c;
                }
            }
            
        }
        &-foot {
            text-align: center;
            margin-top: 100px;
            &-btn {
                border-radius: 22px;
                cursor: pointer;
                background-color: #1abc9c;
                color: #fff;
                text-align: center;
                width: 150px;
                height: 44px;
                line-height: 44px;
                display: inline-block;
                font-size: 16px;
                vertical-align: middle;
                transition: all .3s;
                overflow: hidden;
                position: relative;
                z-index: 0;
            }
        }
    }
</style>