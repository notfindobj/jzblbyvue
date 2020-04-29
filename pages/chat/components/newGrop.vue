<template>
    <div class="grop">
        <div class="grop-name">
            <h4>群名称</h4>
            <p v-show="isGropTiele" @click="isGropTiele = false">{{newGroup.GroupName ? newGroup.GroupName : "输入群名称"}}</p>
            <input v-show="!isGropTiele" ref="autofocus" type="text" v-model="newGroup.GroupName" max="15" @blur="isGropTiele = !isGropTiele">
        </div >
        <div class="grop-boby">
            <h4>群简介</h4>
            <p v-show="isGropBoby" @click="isGropBoby = false">{{newGroup.GroupIntroduction ? newGroup.GroupIntroduction : "暂无群简介（选填）"}}</p>
            <textarea cols="30" rows="4" v-show="!isGropBoby" placeholder="在此输入群简介" ref="autofocusBoby" type="text" v-model="newGroup.GroupIntroduction" max="15" @blur="isGropBoby = !isGropBoby"></textarea>
        </div>
        <div>
            <Button type="error" long @click="nextStep">下一步</Button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        newGroup: {
            type: Object,
            default: function() {
                return {
                    GroupName: "",
                    GroupIntroduction: ""
                }
            }
        }
    },
    data() {
        return {
            isGropTiele: true,
            isGropBoby: true
        }
    },
    watch: {
        // 每次变化，input获取焦点
        isGropTiele: function(a, b) {
            if (b == true) {
                this.$nextTick(function() {
                    this.$refs.autofocus.focus()
                    
                })
            }
        },
        isGropBoby: function(a, b) {
            if (b == true) {
                this.$nextTick(function() {
                    this.$refs.autofocusBoby.focus()
                })
            }
        }
    },
    methods: {
        nextStep () {
            this.$emit("nextStep", this.newGroup)
        }
    }
}
</script>
<style lang="less" scoped>
.grop {
    width: 500px;
    padding: 20px 15px;
    font-size: 14px;
    &-name {
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
        padding-bottom: 10px;
        p {
            line-height: 30px;
            margin-top: 10px;
            padding-left: 10px;
        }
        input {
            width: 100%;
            outline: none;
            border: 0;
            padding-left: 10px;
            border: 1px solid #ff3c00;
            line-height: 28px;
            margin-top: 10px;
        }
    }
    &-boby {
        margin-bottom: 20px;
        padding-bottom: 10px;
        p {
            line-height: 30px;
            margin-top: 10px;
            padding-left: 10px;
        }
        textarea {
            width: 100%;
            outline: none;
            word-break: break-all;
            border: 1px solid #ff3c00;
            padding-left: 10px;
            margin-top: 10px;
        }
    }
}
</style>