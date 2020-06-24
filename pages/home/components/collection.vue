<!--  -->
<template>
    <div class=''>
        <ModalBoard title="" @closeModal="closePins">
            <div class="coll">
                <div class="coll-lf">
                    <div class="coll-lf-cont">
                        <div class="coll-lf-cont-img">
                            <img :src="coll.listImg.bigImgUrl" alt="" width="220px">
                        </div>
                        <div>{{coll.Desc}}</div>
                        <p></p>
                    </div>
                </div>
                <div class="coll-lr">
                    <h2>采集</h2>
                    <div :class="coll.AlbumID === items.AlbumID ? 'coll-lr-item active' :'coll-lr-item ' " v-for="(items, index) in OwnAlbumList" :key="index">
                        <span>{{items.AlbumName}}</span>
                        <div class="coll-lr-item-btn">
                            <span >采下来</span>
                        </div>
                    </div>
                </div>
            </div>
        </ModalBoard>
    </div>
</template>

<script>
import ModalBoard from "./ModalBoard"
import {getOwnAlbum} from "../../../service/find"
export default {
    props: {
        coll: {
            type: Object,
            default: () => {
                AlbumID: ""
            }
        }
    },
//import引入的组件需要注入到对象中才能使用
components: {
    ModalBoard
},
data() {
    return {
        OwnAlbumList: []
    };
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    closePins () {
        this.$emit("closeModal")
    },
    // 画板列表
    getOwnAlbumList () {
        let that = this;
        getOwnAlbum().then(res => {
            that.OwnAlbumList = res;
        }).catch(err => {})
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.getOwnAlbumList()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

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
.coll {
    display: flex;
    justify-content: space-between;
    &-lf {
        width: 300px;
        padding: 0 40px 20px 40px;
        background: #f2f2f2;
        overflow: hidden;
        position: relative;
        min-height: 555px;
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
        h2 {
            margin-bottom: 25px;
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
            &.active {
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