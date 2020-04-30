<template>
    <div class="grop">
        <div class="grop-name">
            <h4>群名称</h4>
            <p>{{gInfo.GroupName}}</p>
        </div >
        <div class="grop-user">
            <h4>群成员 ({{gInfo.Users && gInfo.Users.length > 0 ? gInfo.Users.length : 0}}/ 25)</h4>
            <ul class="user">
                <li @click="addUser" class="icon-size">
                    <i class="icon iconfont icon-add1"></i>
                    <p>添加成员</p>
                </li>
                <li @click="delUser" class="icon-size">
                    <i class="icon iconfont icon-shanchu"></i>
                    <p>删除成员</p>
                </li>
               <li v-if="gInfo.Users && gInfo.Users.length > 0" v-for="(item, index) in gInfo.Users" :key="index">
                    <img :src="item.HeadIcon" :alt="item.NickName">
                    <p>{{item.NickName}}</p>
                </li>
            </ul>
        </div>
        <div class="grop-boby">
            <h4>群简介</h4>
            <p>{{gInfo.GroupIntroduction}}</p>
        </div>
        <div>
            <Button type="error" long @click="dropOut">退出群组</Button>
        </div>
    </div>
</template>
<script>
import {getGroupInfo} from "../../../service/sign"
export default {
    props: {
        groupInfo: {
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
            gInfo: {}
        }
    },
    created () {
        getGroupInfo(this.groupInfo.RoomId).then(res =>{
            if (res) {
                this.gInfo = res
            }
        })
    },
    methods: {
        addUser () {
            this.$emit("addUser", this.gInfo, 1)
        },
        delUser () {
            this.$emit("delUser", this.gInfo, 0)
        },
        dropOut () {
            this.$emit("dropOut", this.gInfo)
        }
    }
}
</script>
<style lang="less" scoped>
.user {
    display: flex;
    width: 495px;
    flex-wrap: wrap;
    li {
        width: 50px;
        margin: 15px 18px 0 14px;
        font-size: 12px;
        cursor: pointer;
        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
        p {
            margin: 0;
            padding: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 30px;
            white-space: nowrap;
        }
    }
}
.grop {
    width: 500px;
    padding: 20px 15px;
    font-size: 14px;
    &-name, &-user {
        border-bottom: 1px solid #ddd;
        margin-bottom: 20px;
        padding-bottom: 10px;
        p {
            line-height: 30px;
            margin-top: 10px;
            padding-left: 10px;
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
    }
}
.icon-size {
    text-align: center;
    i {
        font-size: 37px;
        &:hover {
            color: #ff3c00;
        }
    }
}
</style>