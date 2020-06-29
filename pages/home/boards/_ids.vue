<!--  -->
<template>
<crollBox @willReachBottom="willReachBottom">
    <div class='user'>
        <div class="user-card">
            <div class="user-card-header">
                <span>
                    <img :src="albumlInfo.HeadIcon" width="100px" height="100px" alt="">
                </span>
            </div>
            <div class="user-card-name">
                <div class="user-card-name-na">
                    <h2>{{albumlInfo.NickName}}</h2>
                    <p>画板名称：{{albumlInfo.Name}}</p>
                    <p v-if="albumlInfo.Desc">画板简介：{{albumlInfo.Desc}}</p>
                    <p>所属分类：{{albumlInfo.TypeName}}</p>
                </div>
                <span @click="isSelf && edBoard(albumlInfo)">设置</span>
            </div>
        </div>
        <div>
            <Pin :isPannel="isPin" @closePins="isPin = false" v-if="isPin" :paramsId="paramsId"/>
            <div v-masonry="findContainer" transition-duration="3s" item-selector=".item" class="masonry-container" gutter="10">
                <div class="board item" v-masonry-tile>
                    <div class="board-add" @click="isSelf && showPick()">
                        <div class="board-add-box">
                            <Icon type="ios-add-circle-outline" />
                            <p>添加采集</p>
                        </div>
                    </div>
                </div>
                <div v-masonry-tile class="item" :key="index" v-for="(item, index) in AlbumList">
                    <div class="find-box">
                        <div class="find-box-tit">
                            <img v-lazy="item.PicInfos.bigImgUrl" referrer="no-referrer|origin|unsafe-url" alt="" :data-original="item.PicInfos.bigImgUrl" :style="`width: 232px;height: ${calculatedH(item.PicInfos)}`"/>
                            <div class="find-box-tit-model find-box-tit-models" @click="showPins(item)">
                                <div class="find-model">
                                    <span class="find-btn find-redbtn" @click.stop="isSelf && clickColl(item)">采集</span>
                                    <span class="find-btn" @click.stop="isSelf && clickMining(item)">编辑</span>
                                </div>
                            </div>
                        </div>
                        <div class="find-box-bottom" v-if="item.PicTitle || item.PicInfos.fileName">
                            <p class="find-box-bottom-sub">{{item.PicTitle || item.PicInfos.fileName}}</p>
                        </div>
                    </div>
                </div>
            </div>
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
        <!-- 编辑画板 -->
        <ModalBoard title="编辑画板" @closeModal="closeEditBoard" v-if="editBoard">
            <div class="newboard">
                <div class="newboard-item">
                    <label for="" >标题:</label>
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
                    <span class="newboard-footer-del" @click="delBoard">删除画板</span>
                    <div>
                        <span class="newboard-footer-close" @click="closeEditBoard">取消</span>
                        <span class="newboard-footer-hua" @click="editAlbum">确认</span>
                    </div>
                </div>
            </div>
        </ModalBoard>
        <!-- 编辑采集 -->
        <ModalBoard title="编辑采集" @closeModal="closeMining" v-if="isMining">
            <div class="coll">
                <div class="coll-lf">
                    <div class="coll-lf-cont">
                        <div class="coll-lf-cont-img">
                            <!-- <img :src="mining.listImg.bigImgUrl" alt="" width="220px"> -->
                        </div>
                        <p></p>
                    </div>
                </div>
                <div class="coll-lr">
                    <div class="newboard-item">
                        <label for="">标题:</label>
                        <input type="text" v-model="editCover.Name" placeholder="画板标题，不能超过32个字符">
                    </div>
                    <div class="newboard-item">
                        <label for="">描述:</label>
                        <textarea cols="30" rows="4" v-model="editCover.Desc" placeholder="画板简介"></textarea>
                    </div>
                    <div class="newboard-item">
                        <label for="">来源:</label>
                        <input type="text" v-model="editCover.Name" placeholder="画板标题，不能超过32个字符">
                    </div>
                    <div class="newboard-item">
                        <label for="">分类:</label>
                        <select v-model="editCover.TypeID">
                            <option value="">分类</option>
                            <option v-for="(items, index) in AlbumType" :key="index" :value="items.ID">{{items.Name}}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="newboard">
                <div class="newboard-footer">
                    <span class="newboard-footer-del" @click="delBoard(editCover)">删除采集</span>
                    <div>
                        <span class="newboard-footer-close" @click="closeMining">取消</span>
                        <span class="newboard-footer-hua" @click="editAlbum">确认</span>
                    </div>
                </div>
            </div>
        </ModalBoard>
    </div>
    <collection :coll="coll" v-if="isColl" @closeModal="closeColl"></collection>
</crollBox>
</template>
</template>

<script>
import ModalBoard from "../components/ModalBoard"
import {getAlbumType, postAlbum, getAlbumDetail, addAlbum, getOwnAlbum, addPicture} from "../../../service/find"
import Pin from "../pins/_id"
import ossUp from "../../../components/ossUp/ossUp"
import crollBox from '../../../components/crollBox'
import collection from "../components/collection"
import { mapState } from 'vuex'
export default {
    //import引入的组件需要注入到对象中才能使用
    layout: "find",
    components: {
        ModalBoard,
        crollBox,
        Pin,
        ossUp,
        collection
    },
    data() {
        return {
            findContainer: "findContainer",
            isPin:  false,
            paramsId: '',
            AlbumType: [],
            AlbumList: [],
            albumlInfo: {},
            isPick: false,
            editBoard: false,
            pickImgs: [],
            addPick: {},
            OwnAlbumList: [],
            editCover: {},
            coll: {},
            isColl: false,
            query: {
                "AlbumId":"",
                "Page": 0,
                "Rows": 30,
                "total": 1
            },
            isMining:false,
            mining: {},
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
        closeColl () {
            this.isColl = false
        },
        closeMining () {
            this.isMining = false;
        },
        // 编辑采集
        clickMining (row) {
            this.isMining = true;
            this.mining = row;
        },
        // 采集
        clickColl (row) {
            this.coll =  {
                "listImg": row.PicInfos,
                "Title": row.Title,
                "Link": row.Link,
                "AlbumID": this.albumlInfo.ID,//
                "ID": row.PicId
            }
            this.isColl = true
        },
        // 获取列表
        willReachBottom (index) {
            if (!(this.query.Page + 1 >  this.query.total)) {
                this.query.Page += 1;
                this.query.AlbumId = this.$route.params.ids
                getAlbumDetail(this.query).then(res => {
                    if (res.CreateUserId !== this.auth.UserId) {
                        this.isSelf = false
                    }
                    if (this.query.Page === 1 ) {
                        this.AlbumList = res.PicList;
                    } else {
                        this.AlbumList.push(...res.PicList)
                    }
                    this.albumlInfo = res
                    this.$nextTick(() => {
                        this.$redrawVueMasonry(this.findContainer)
                    })
                })
            }
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
        // 获取宽高i
        calculatedH (imgInfo, w=256) {
            var file = {
                w: w,
                h: 0
            }
            file.h = parseInt(imgInfo.height * w / imgInfo.width)
            return file.h+"px"
        },
        // 查看详情
        showPins (row) {
            this.isPin = true;
            var stateObject = {};
            var title = "Wow Title";
            var newUrl = `/home/pins/${row.PicId}`;
            this.paramsId = row.PicId
            history.pushState(stateObject,title,newUrl);
            sessionStorage.setItem("pins", this.albumlInfo.ID)
            return false
        },
        closeEditBoard () {
            this.editBoard = false
        },
        showPick () {
            this.isPick = true
            this.pickImgs = []
            this.addPick =  JSON.parse(JSON.stringify(this.albumlInfo))
        },
        closePick () {
            this.isPick = false;
        },
        upPick () {
            let that = this;
            let query = {
                AlbumID: this.addPick.ID,
                list: that.pickImgs
            }
            addPicture(query).then(res => {
                if (res) {
                    that.isPick = false;
                    this.query.Page -=1
                    that.willReachBottom()
                }
            }).catch(err => {})
        },
        // 编辑画板
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
                    this.query.Page -=1
                    that.willReachBottom()
                }
            }).catch(err => {})
        },
        // 打开画板
        edBoard (row) {
            this.editCover = JSON.parse(JSON.stringify(row));
            this.editBoard = true
        },
        // 删除画板
        delBoard () {},
        // 创建/修改采集
        getOwnAlbumList () {
            let that = this;
            getOwnAlbum().then(res => {
                that.OwnAlbumList = res;
            }).catch(err => {})
        },
        // 获取图板类型
        getAlbumTypeList () {
            let that = this;
            getAlbumType().then(res => {
                that.AlbumType = res;
            }).catch(err => {})
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getOwnAlbumList()
        this.getAlbumTypeList()
        this.willReachBottom()
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        if (typeof this.$redrawVueMasonry === 'function') {
            this.$redrawVueMasonry(this.findContainer)
        }
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
    // width: 500px;
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
    margin-top: 30px;
    font-size: 14px;
    &-card {
        padding: 0 20px;
        height: 130px;
        display: flex;
        background: #fff;
        margin-bottom: 10px;
        &-header {
            background: #fff;
            padding: 5px;
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
            display: flex;
            justify-content: space-between;
            padding: 20px 10px 0 20px;
            width: 100%;
            &-na {
                // font-size: 24px;
                // font-weight: 700;
                color: #444;
                display: inline-block;
                margin-right: 10px;
                p {
                    margin-top: 5px;
                    color: #666;
                }
            }
        }
    }
}
.board-box {
    display: flex;
    flex-wrap: wrap;
}
.board {
    width: 232px;
    height: 150px;
    background: #fff;
    padding: 10px;
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
}
.find {
    width: 1200px;
    margin: 0 auto;
    &-box {
        cursor: pointer;
        &:hover {
            box-shadow: 0 1px 3px rgba(0,0,0,.02), 0 16px 32px -4px rgba(0,0,0,.17);
            transform: translateY(-1px);
        }
        &-tit {
            background: #fff;
            position: relative;
            &-models {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 5px;
                z-index: 11;
                background: #ffffff14;
            }
            &-model {
                display: none;
            }
            &:hover &-model {
                display: inline-block;
            }
        }
        &-bottom {
            background: #fff;
            position: relative;
            &-sub {
                display: inline-block;
                width: 232px;
                padding: 10px 16px;
                line-height: 1.35em;
                overflow: hidden;
                word-wrap: break-word;
                border-bottom: 1px solid #f2f2f2;
                -webkit-line-clamp: 3;
                overflow: hidden;
            }
            &-footer {
                margin-bottom: 10px;
                display: flex;
                padding: 0 16px;
                >a {
                    display: inline-block;
                    width: 34px;
                    height: 34px;
                    margin: 16px 0;
                    img {
                        display: block;
                        width: 34px;
                        height: 34px;
                        border-radius: 50%;
                    }
                }
                &-pin{
                    margin: 0 15px; 
                    height: 51px;
                    padding: 15px 0 0 10px;
                    line-height: 1.5;
                }
                &-num{
                    display: block;
                    min-width: 20px;
                    margin: 0 auto;
                    padding: 0 5px;
                    height: 24px;
                    line-height: 24px;
                    text-align: center;
                    white-space: nowrap;
                    border-radius: 2px;
                    border: 1px solid #e6e6e6;
                    color: #9e7e6b;
                    cursor: pointer;
                    margin-top: 15px;
                }
            }
        }
    }
    &-model {
        display: flex;
        justify-content: space-between;
        position: relative;
        top: 5px;
        padding: 0 5px;
    }
}
.find-btn {
    height: 30px;
    line-height: 30px;
    background: #ededed;
    color: #444;
    box-shadow: none;
    border: 1px solid #ededed;
    display: inline-block;
    border-radius: 2px;
    font-size: 14px;
    padding: 0 12px;
    cursor: pointer;
}
.find-redbtn {
    color: #fff;
    background: #ec414d;
    border: 1px solid #ec414d;
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
.coll {
    display: flex;
    justify-content: space-between;
    &-lf {
        width: 300px;
        padding: 0 40px 20px 40px;
        background: #f2f2f2;
        overflow: hidden;
        position: relative;
        min-height: 420px;
        &-cont {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            &-img {
                position: relative;
                display: block;
                width: 220px;
                max-height: 350px;
                overflow: hidden;
                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 20px;
                    background-image: linear-gradient(to bottom,transparent,#f2f2f2);
                }
            }
        }
    }
    &-lr {
        width: 400px;
        position: relative;
        overflow: hidden;
        padding: 0 30px;
        max-height: 555px;
        margin-top: 25px;
        h2 {
            margin-bottom: 25px;
        }
        &.active {
            background-image: linear-gradient(to right,#ededed,#fff);
        }
        &-item{
            padding-left: 10px;
            color: #4a4a4a;
            text-shadow: 0 1px 0 rgba(255,255,255,.5);
            cursor: pointer;
            line-height: 30px;
            transition: background-color .1s,background-image .1s;
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: flex;
            justify-content: space-between;
            &:hover &-btn{
                display: inline-block;
            }
            &:hover {
                background-image: linear-gradient(to right,#ededed,#fff);
            }
            &-btn {
                display: none;
                height: 28px;
                span {
                    display: inline-block;
                    border-radius: 3px;
                    font-size: 13px;
                    padding: 0 12px;
                    height: 28px;
                    line-height: 28px;
                    background: #ff3c00;
                    border: 1px solid #ededed;
                    cursor: pointer;
                    text-decoration: none;
                    color: #fff;
                    white-space: nowrap;
                    text-align: center;
                }
            }
        }
    }
}
</style>