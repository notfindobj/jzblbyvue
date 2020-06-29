<!--  -->
<template>
<div class='user'>
    <div class="user-card">
        <div class="user-card-header">
            <span>
                <img :src="userInfo.HeadIcon" width="140px" height="140px" alt="">
            </span>
            <!-- <div  class="user-card-header-info">
                <div>
                    <p>0</p>
                    <span>粉丝</span>
                </div>
                <div>
                    <p>0</p>
                    <span>关注</span>
                </div>
            </div> -->
        </div>
        <div class="user-card-name">
            <div class="user-card-name-na">{{userInfo.NickName}}</div>
            <span>设置</span>
        </div>
    </div>
    <div class="user-nav">
        <ul>
            <li>{{userInfo.Albums}}画板</li>
            <li>{{userInfo.Pictures}}采集</li>
            <li>喜欢</li>
        </ul>
    </div> 
    <div class="board-box">
        <div class="board">
            <div class="board-add" @click="isSelf && showBoard()">
                <div class="board-add-box">
                    <Icon type="ios-add-circle-outline" />
                    <p>添加画板</p>
                </div>
            </div>
        </div>
        <template v-for="(items) in AlbumList">
            <div class="board" :key="items.ID">
                <nuxt-link :to="`/home/boards/${items.ID}`">
                    <div class="board-header">
                        <div :class="items.PicInfos.length > 0 ?'board-header-tag':'board-header-tag board-header-untag'">
                            <p>{{items.Name}}</p>
                            <div class="board-header-tag-cai">
                                <span>{{items.Number}}采集</span>
                            </div>
                        </div>
                        <img v-if="items.PicInfos[0]" :src="items.PicInfos[0].smallImgUrl"  alt="">
                    </div>
                </nuxt-link>
                <nuxt-link :to="`/home/boards/${items.ID}`">
                    <div class="board-boby">
                        <template v-for="(idx) in 3">
                            <!-- <template v-for="(item, idx) in items.PicInfos"> -->
                            <div class="board-boby-item" :key="idx">
                                <img v-if="items.PicInfos[idx]" :src="items.PicInfos[idx].smallImgUrl" :alt="items.PicInfos[idx].fileName">
                            </div>
                            <!-- <div class="board-boby-item" :key="idx" v-if="idx< 3">
                                <img :src="item.smallImgUrl" :alt="item.fileName">
                            </div>
                            <div class="board-boby-item" :key="idx" v-if="idx< 3">
                                <img :src="item.smallImgUrl" :alt="item.fileName">
                            </div> -->
                        </template>
                        <!-- <div class="board-boby-item">
                            <img src="http://www.pic1.jzbl.com/buildingcircle/94749b37-12ac-4651-9a85-86b03a475c3d/2020-04-30/i/1588212166376909.jpg" alt="">
                        </div>
                        <div class="board-boby-item">
                            <img src="http://www.pic1.jzbl.com/buildingcircle/94749b37-12ac-4651-9a85-86b03a475c3d/2020-04-30/i/1588212166376909.jpg" alt="">
                        </div> -->
                    </div>
                </nuxt-link>
                <div class="board-footer">
                    <span class="board-footer-btn" @click="isSelf && edBoard(items)">编辑</span>
                </div>
            </div>
        </template>
    </div>
    <!-- 新建画板 -->
    <ModalBoard title="新建画板" @closeModal="closeNewGroup" v-if="isBoard"> 
       <div class="newboard">
           <input type="text" v-model="cover.Name" placeholder="画板标题，不能超过32个字符">
           <select v-model="cover.TypeID">
               <option>选择分类</option>
               <option v-for="(items, index) in AlbumType" :key="index" :value="items.ID">{{items.Name}}</option>
           </select>
           <div class="newboard-footer">
               <span class="newboard-footer-del" @click="closeNewGroup"></span>
               <div>
                    <span class="newboard-footer-close" @click="closeNewGroup">取消</span>
                    <span class="newboard-footer-hua" @click="createAlbum">创建画板</span>
               </div>
           </div>
       </div>
    </ModalBoard>
    <!-- 编辑画板 -->
    <ModalBoard title="编辑画板" @closeModal="closeEditBoard" v-if="editBoard"> 
       <div class="newboard">
           <div class="newboard-item">
               <label for="">标题:</label>
               <input type="text" v-model="editCover.Name" placeholder="画板标题，不能超过32个字符">
           </div>
           <div class="newboard-item">
               <label for="">描述:</label>
               <textarea cols="30" rows="4" v-model="editCover.Desc" placeholder="画板简介"></textarea>
           </div>
           <div class="newboard-item">
               <label for="">分类:</label>
               <select v-model="editCover.TypeID">
                <option value="">分类</option>
                <option v-for="(items, index) in AlbumType" :key="index" :value="items.ID">{{items.Name}}</option>
            </select>
           </div>
           <div class="newboard-footer">
               <span class="newboard-footer-del" @click="delBoard(editCover)">删除画板</span>
               <div>
                    <span class="newboard-footer-close" @click="closeEditBoard">取消</span>
                    <span class="newboard-footer-hua" @click="editAlbum">确认</span>
               </div>
           </div>
       </div>
    </ModalBoard>
</div>
</template>

<script>
import { mapState } from 'vuex'
import ModalBoard from "../components/ModalBoard"
import {getAlbumType, postAlbum, getOwnInfo, delAlbum} from "../../../service/find"
export default {
    //import引入的组件需要注入到对象中才能使用
    layout: "find",
    components: {
        ModalBoard
    },
    data() {
        return {
            AlbumType: [],
            AlbumList: [],
            isBoard: false,
            editBoard: false,
            userInfo: {},
            cover: {
                Name: "",
                TypeID: ""
            },
            editCover: {},
            isSelf: true
        };
    },
    //监听属性 类似于data概念
    computed: {
        ...mapState({
            auth: state => state.overas.auth,
        }),
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getUserInfo () {
            let that = this;
            let query = {
                "viewuserId": this.$route.query.id || that.auth.UserId
            }
            getOwnInfo(query).then(res => {
                if (res) {
                    that.userInfo = res;
                }
            }).catch(err => {})
        },
        async getAlbumList () {
            let that = this;
            let query = {
                "userId": this.$route.query.id || that.auth.UserId,
                "keyvalue": "",
                "Page":1,
                "Rows":30
            }
            let res = await this.$store.dispatch('getAlbumList', query);
            if (res) {
                that.AlbumList= res.albumlist;
            }
        },
        closeEditBoard () {
            this.editBoard = false
        },
        showBoard () {
            this.isBoard = true;
            this.cover=  {
                Name: "",
                TypeID: ""
            }
        },
        closeNewGroup () {
            this.isBoard = false;
            this.cover=  {
                Name: "",
                TypeID: ""
            }
        },
        createAlbum () {
            let that = this;
            postAlbum(this.cover).then(res => {
                if (res) {
                    that.isBoard = false;
                    that.getAlbumList()
                }
            }).catch(err => {})
        },
        editAlbum () {
            let that = this;
            let query = {
                "ID": this.editCover.ID,
                "Name": this.editCover.Name,
                "TypeID": this.editCover.TypeID,
                "Desc": this.editCover.Desc,
                "Sort": this.editCover.Sort,
                "IsPrivate": this.editCover.IsPrivate,
                "CoverType": this.editCover.CoverType,
                "CoverID": this.editCover.CoverID,
            }
            postAlbum(query).then(res => {
                if (res) {
                    that.editBoard = false;
                    that.getAlbumList()
                }
            }).catch(err => {})
        },
        edBoard (row) {
            this.editCover = row;
            this.editBoard = true
        },
        delBoard (row) {
            let that = this;
            let query = {
                Ids: row.ID
            }
            this.$Modal.confirm({
                title: "删除画板",
                content: `<p>确定删除画板？</p>`,
                onOk: async () => {
                    delAlbum(query).then(res => {
                        this.editBoard = false
                        that.getAlbumList()
                    }).catch(err => {})
                },
                onCancel: () => {
                    return false
                }
            });
        },
        getAlbumTypeList () {
            let that = this;
            getAlbumType().then(res => {
                that.AlbumType = res;
            }).catch(err => {})
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        if (this.$route.query.id) {
            this.isSelf = false
        }
        this.getUserInfo()
        this.getAlbumTypeList()
        this.getAlbumList()
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
.newboard {
    width: 500px;
    padding: 0 20px;
    padding-bottom: 20px;
    &-item {
        display: flex;
        label {
            width: 50px;
            margin-top: 10px;
        }
    }
    &-footer {
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        margin-top: 10px;
        div {
            span {
                font-size: 16px;
                padding: 0 15px;
                border-radius: 2px;
                height: 36px;
                line-height: 36px;
                // background: #ff3c00;
                cursor: pointer;
                display: inline-block;
            }
            .newboard-footer-close {
                background: #ededed;
                margin-right: 15px;
                color: #444;
            }
            .newboard-footer-hua {
                background: #ff3c00;
                color: #fff;
            }
        }
    }
}
input,select, option{
    width: 100%;
    outline: none;
    border: 0;
    height: 30px;
    padding-left: 10px;
    border: 1px solid #ff3c00;
    line-height: 30px;
    margin-top: 10px;
}
textarea {
    width: 100%;
    outline: none;
    word-break: break-all;
    border: 1px solid #ff3c00;
    padding-left: 10px;
    margin-top: 10px;
}
//@import url(); 引入公共css类
.user {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    margin-top: 60px;
    font-size: 14px;
    margin-bottom: 25px;
    &-card {
        padding: 0 20px;
        height: 130px;
        background: #fff;
        &-header {
            position: absolute;
            top: -30px;
            padding: 5px;
            background: #fff;
            &-info {
                padding-top: 10px;
                text-decoration: none;
                color: #999;
                display: flex;
                justify-content: space-around;
                text-align: center;
                p {
                    font-size: 16px;
                    font-weight: 700;
                    color: #444;
                    line-height: 1;
                    margin-bottom: 5px;
                }
            }
        }
        &-name {
            padding-left: 170px;
            display: flex;
            justify-content: space-between;
            margin: 20px 0 10px;
            &-na {
                font-size: 24px;
                font-weight: 700;
                color: #444;
                display: inline-block;
                margin-right: 10px;
            }
        }
    }
    &-nav {
        border-top: 1px solid #ededed;
        line-height: 49px;
        background: #fff;
        ul {
            display: flex;
            color: #777;
            li {
                padding: 0 20px;
            }
        }
    }
}
.board-box {
    display: flex;
    flex-wrap: wrap;
}
.board {
    width: 230px;
    height: 326px;
    background: #fff;
    padding: 10px;
    margin-right: 12px;
    margin-top: 10px;
    overflow: hidden;
    &:nth-child(5n) {
        margin-right: 0;
    }
    // opacity: .6;
    &:hover {
        opacity: 1;
        transition: box-shadow 0.5s;
        box-shadow: 0 2px 15px #999999;
    }
    &-header {
        height: 204px;
        position: relative;
        border: 1px solid #dedede;
        &-tag{
            position: absolute;
            padding: 10px;
            color: #fff;
            font-size: 14px;
            p {
                font-weight: 600;
            }
            &-cai {
                display: flex;
                span {
                    margin-right: 10px;
                }
            }
        }
        &-untag {
            color: #999;
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
    &-boby {
        height: 68px;
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        &-item {
            width: 66.66px;
            height: 68px;
            overflow: hidden;
            border: 1px solid #dedede;
            img {
                width: 66.66px;
            }
        }
        &:nth-child(3n) {
            margin-right: 0;
        }
    }
    &-footer {
        height: 34px;
        &-btn {
            display: inline-block;
            width: 80px;
            line-height: 30px;
            background: #dedede;
            margin-top: 4px;
            text-align: center;
            cursor: pointer;
        }
    }
}
.board-add {
    height: 100%;
    width: 100%;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 2px dashed #dedede;
    &-box {
        .ivu-icon {
            font-size: 55px;
        }
    }
    
}
</style>