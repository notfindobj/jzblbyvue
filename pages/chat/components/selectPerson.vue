<template>
    <div class="person">
        <div class="person-lf">
            <div class="person-lf-search">
                <i class="icon iconfont icon-sousuo"></i>
                <input type="text" v-model="keyWord" @change="openGroup">
            </div>
            <ul class="select-per per-list">
                <li class="select-per-li" v-for="(item, index) in userList" :key="index" @click="pushPerson(item)">
                    <div class="select-per-li-lf">
                        <img :src="item.HeadIcon" alt="">
                        <span>{{item.NickName}}</span>
                    </div>
                    <span>X</span>
                </li>
            </ul>
        </div>
        <div class="person-rf ">
            <p>以选择联系人</p>
            <ul class="select-per select-per-list">
                <li class="select-per-li" v-for="(item, index) in selectList" :key="index">
                    <div class="select-per-li-lf">
                        <img :src="item.HeadIcon" alt="">
                        <span>{{item.NickName}}</span>
                    </div>
                    <span>X</span>
                </li>
            </ul>
            <div class="person-rf-btn">
                <Button type="error" @click="sumAdd">{{enterText}}</Button>
                <Button type="error" @click="backStop">返回</Button>
            </div>
        </div>
    </div>
</template>
<script>
import {getGroupUser} from "../../../service/sign"
export default {
    props: {
        modalRow: {
            type: Object,
            default: ()=> {}
        },
        modalType: {
            type: Number,
            default: 0
        },
        enterText: {
            type: String,
            default: "确定添加"
        }
    },
    data () {
        return {
            userList: [],
            selectList: [],
            keyWord: ""
        }
    },
    created () {
        this.openGroup()
    },
    methods: {
        // 群组用户列表
        openGroup () {
            let that = this;
            let q = {}
            // 添加
            if (this.modalType === 1) {
               q ={
                    roomId: this.modalRow.RoomId,
                    opType: 0,
                    keyword: this.keyWord
                }
            }
            // 删除
            if (this.modalType === 2) {
               q ={
                    roomId: this.modalRow.RoomId,
                    opType: 1,
                    keyword: this.keyWord
                }
            }
            getGroupUser(q).then(res => {
                if (res) {
                    that.userList = res
                }
            }).catch(err =>{})
        },
        pushPerson (row) {
            let isFlag = true
            if (this.selectList.length <= 0) {
                this.selectList.push(row)
                return false
            }
            this.selectList.forEach((ele, index) => {
                if (ele.UserId === row.UserId) {
                    isFlag = false
                    this.selectList.splice(index, 1)
                }
            })
            if (isFlag) {
                this.selectList.push(row)
            }
        },
        sumAdd () {
            this.$emit("sumAdd", this.selectList)
        },
        backStop () {
            this.$emit("backStop", this.selectList)
        }
    }
}
</script>
<style lang="less" scoped>
.person {
    display: flex;
    width: 600px;
    height: 560px;
    justify-content: space-between;
    p {
        margin: 10px 0;
    }
    >div {
        &:first-child {
            border-right: 1px solid #ddd;
        }
    }
    &-lf, &-rf {
        flex: 1;
        padding: 10px 10px;
        &-search {
            display: flex;
            border: 1px solid #ddd;
            margin: 10px 15px;
            padding: 0 8px;
            input {
                width: 100%;
                outline: none;
                border: 0;
                padding-left: 10px;
            }
        }
        &-btn {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
    }
}
.select-per {
    overflow-x: hidden;
    &-li {
        display: flex;
        justify-content: space-between;
        line-height: 30px;
        cursor: pointer;
        margin-bottom: 10px;
        height: 35px;
        &:hover {
            background: #ddd;
        }
        &-lf {
            display: flex;
            img {
                width: 35px;
                height: 35px;
                display: inline-block;
                border-radius: 50%;
                margin-right: 15px;
            }
        }
    }
}
.select-per-list {
    height: 445px;
}
.per-list {
    height: 490px;
}
&::-webkit-scrollbar {
    width: 0.16rem;
    background: rgba(117, 180, 253, 0.2);
    box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(1, 69, 132, 0.5);
}
&::-webkit-scrollbar-track {
    background-color: transparent;
}

&::-webkit-scrollbar-thumb {
    background: #cbe3ec;
}
/*滚动条的上下两端的按钮*/
&::-webkit-scrollbar-button {
    height: 0px;
}
</style>