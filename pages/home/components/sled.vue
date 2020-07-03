<!--  -->
<template>
    <div class='sled'>
      <div class="sled-top" @click="scrollToTop">
          <i class="icon iconfont icon-jiantoushang"></i>
      </div>
      <div class="sled-create">
          <i class="icon iconfont icon-jia"></i>
          <ul>
              <li @click="showPick">创建采集</li>
              <li @click="showBoard">创建画板</li>
          </ul>
      </div>
    <!-- 上传采集 -->
    <ModalBoard title="上传采集" @closeModal="closePick" v-if="isPick">
        <div class="newboard">
            <ossUp accept="image/*" @uploadSuccess="fileSuccess">
                <div :class="pickImgs.length > 0 ? 'upimg' : 'unupImg'">
                    <p>每次最多可上传10张，单张文件体积不超过20MB</p>
                </div>
            </ossUp>
            <select v-model="addPick.ID" v-if="pickImgs.length > 0">
                <option>选择分类</option>
                <option v-for="(items, index) in OwnAlbumList" :key="index" :value="items.AlbumID">{{items.AlbumName}}</option>
            </select>
            <div class="newboard-croll" v-if="pickImgs.length > 0">
                <div class="newboard-item" v-for="(items, index) in pickImgs" :key="index">
                    <label class="newboard-item-label">
                        <img :src="items.listImg.smallImgUrl" width="80px" height="80px" alt="">
                    </label>
                    <textarea cols="20" rows="3" v-model="items.Title" placeholder="填写作品相关描述"></textarea>
                </div>
            </div>
            <div class="newboard-footer">
                <span class="newboard-footer-del" @click="closePick"></span>
                <div>
                    <span class="newboard-footer-close" @click="closePick">取消</span>
                    <span class="newboard-footer-hua" @click="upPick">上传</span>
                </div>
            </div>
        </div>
    </ModalBoard>
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
    </div>
</template>

<script>
import ModalBoard from "./ModalBoard"
import ossUp from "../../../components/ossUp/ossUp"
import {postAlbum, getAlbumType, getOwnAlbum, addPicture} from "../../../service/find"
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        ModalBoard,
        ossUp
    },
    data() {
        return {
            isPick: false,
            pickImgs: [],
            addPick: {},
            isBoard: false,
            cover: {
                Name: "",
                TypeID: ""
            },
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        closePick () {
            this.isPick = false;
        },
        showPick () {
            this.isPick = true;
            this.pickImgs = []
        },
        // 创建/修改采集
        getOwnAlbumList () {
            let that = this;
            getOwnAlbum().then(res => {
                that.OwnAlbumList = res;
            }).catch(err => {})
        },
        // 上传图片
        fileSuccess(file) {
            let that = this;
            let img = new Image();
            img.src = file.smallImgUrl;
            img.onload = function() {
                that.pickImgs.push({
                    Desc: "",
                    listImg: {
                        fileName: file.name,
                        smallImgUrl: file.smallImgUrl,
                        width: img.naturalWidth,
                        height: img.naturalHeight
                    }
                })
            }
        },
        upPick () {
            let that = this;
            if (!this.addPick.ID) {
                this.$Message.error("请选择分类！")
                return false
            }
            let query = {
                AlbumID: this.addPick.ID,
                list: that.pickImgs
            }
            addPicture(query).then(res => {
                if (res) {
                    this.$Message.success("采集成功！")
                    that.isPick = false;
                }
            }).catch(err => {})
        },
        showBoard () {
            this.isBoard = true;
            this.cover=  {
                Name: "",
                TypeID: ""
            }
        },
        getAlbumTypeList () {
            let that = this;
            getAlbumType().then(res => {
                that.AlbumType = res;
            }).catch(err => {})
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
                }
            }).catch(err => {})
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
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getOwnAlbumList()
        this.getAlbumTypeList()
    },
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
//@import url(); 引入公共css类
.sled {
    position: fixed;
    right: 50px;
    bottom: 15px;
    &-top, &-create {
        cursor: pointer;
        width: 35px;
        height: 35px;
        background-color: rgba(0,0,0,.6);
        color: #fff;
        text-align: center;
        line-height: 35px;
        border-radius: 3px;
        i {
            font-size: 22px;
        }
    }
    &-top {

    }
    &-create {
        margin-top: 10px;
        position: relative;
        &:hover ul {
            display: inline-block;
        }
        ul {
            display: none;
            position: absolute;
            width: 200px;
            background: #fff;
            right: 35px;
            bottom: 0;
            color: #333;
            padding: 10px 0;
            li {
                &:hover {
                    background: #ededed;
                }
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
.upimg {
    max-height: 55px;
    width: 500px;
    p {
        color: #666;
        line-height: 55px;
    }
}
.unupImg {
    width: 500px;
    max-height: 330px;
    p {
        color: #666;
        line-height: 330px;
    }
}
.newboard {
    width: 500px;
    padding: 0 20px;
    padding-bottom: 20px;
    &-croll {
        max-height: 240px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    &-item {
        display: flex;
        label {
            width: 50px;
            margin-top: 10px;
        }
        &-label {
            width: 80px !important;
            margin-right: 10px;
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
</style>