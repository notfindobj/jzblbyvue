<template>
    <div>
        <div class="editor-box">
            <div>
                <div ref="toolbar" class="editor-toolbar"></div>
                <div class="jzeditor">
                    <div class="text" ref="editor">
                        <p>{{placeholders}}</p>
                    </div>
                    <div class="jzeditor-placeholder" @click="jzEdPlac" v-if="showPlaceholder" ref="jzeditor"></div>
                </div>
            </div>
            <div class="editor-footer">
                <ul class="editor-footer-tool">
                    <li :class="!['sp'].includes(editorType)? 'editor-footer-tool-img' : 'editor-footer-tool-img prohibit'" >
                        <span class="add-img" @click="uploadPic()">
                            <i class=" icon iconfont">&#xe631;</i>
                            <input
                                style="display:none;"
                                type="file"
                                @change="fileSelected"
                                name="avatar"
                                ref="uploadPic"
                                multiple="multiple"
                                accept="image/gif,image/jpeg,image/jpg,image/png" >
                            图片
                        </span>
                        <div class="editor-footer-tool-pic" :style="`width: ${boxWidth};height: ${boxHeight}`" v-if="['tw', 'wd'].includes(editorType)  && isPanel">
                            <span class="update-horn"></span>
                            <div class="tool-updat-content">
                                <div class="updat-content-title">本地上传</div>
                                <p>共{{imgList.length}}张，还能上传{{30 - imgList.length}}张</p>
                                <div>
                                    <draggable v-model="imgList" group="people" @start="drag=true" @end="drag=false" :animation="500">
                                        <div class="img-item" v-for="(item, index) in imgList" :key="index" >
                                            <i class="icon iconfont icon-chahao2 chahao" @click.stop="delImg(index)"></i>
                                            <img :src="baseUrlRegExp(item.smallImgUrl)" alt="">
                                        </div>
                                    </draggable>
                                    <Upload class="upload" :uploadType="2" :nowLength="imgList.length" @uploadSuccess="uploadSuccess" />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li :class="['sp'].includes(editorType)? 'editor-footer-tool-video' : 'prohibit editor-footer-tool-video '" >
                        <span class="add-video" @click="uploadVideo()">
                            <i class=" icon iconfont">&#xe624;</i>
                            视频
                        </span>
                        <div class="editor-footer-tool-videos" v-if="['sp'].includes(editorType) && isPanel">
                            <span class="update-horn"></span>
                            <div class="tool-updat-content">
                                <div class="updat-content-title">上传视频</div>
                                <p>发布后，视频将出现在我的部落</p>
                                <div class="upload-box">
                                    <uploadVideo 
                                    @clearVideo="clearVideo"
                                    @uploadSuccess="uploadSuccessVideo" />
                                    <p class="upload-tip">仅支持MP4视频格式，大小不超过50M，请勿上传反动色情等违法视频。</p>
                                    <Spin fix v-if="spinShow">
                                        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                        <div>上传中</div>
                                    </Spin>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="editor-footer-tools">
                    <li v-if="!['xm'].includes(editorType)">
                        <Dropdown placement="bottom" trigger="click" @on-click="selectIsPublic" >
                            <a href="javascript:void(0)">
                                {{publishMode | interceptText}}
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list" v-if="privacyList.length > 0">
                                <DropdownItem v-for="(item, index) in privacyList" :name="item.Name + '|'+ item.Id" :key="index">{{item.Name}}</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </li>
                    <li v-if="['xm'].includes(editorType)">
                        <p>
                            <Checkbox class="checkbox" v-model="isAgree">我已仔细阅读并同意</Checkbox>
                            <span @click="ViewProtocol">《建筑部落用户发布协议》</span>
                        </p>
                    </li>
                    <li>
                        <span @click="editorPush" class="editor-push">发布</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {uploadFile, GetOperatPrivacy} from '../../service/clientAPI'
import Upload from '../../components/publish/upload'
import { _debounce, analogJump } from '../../plugins/untils/public'
import uploadVideo from '../../components/publish/uploadVideo'
import draggable from 'vuedraggable'
import { sinaIcon, jzIcon} from '../../assets/Emoticon'
import { mapGetters } from 'vuex'
export default {
    name: 'editor',
    props: {
        editorType: {
            type: String,
            default: 'xm'
        },
        placeholders: {
            type: String,
            default: '分享建筑动态！'  
        }
    },
    components: {
        draggable,
        Upload,
        uploadVideo
    },
    computed: {
        ...mapGetters(['isLogin']),
        boxWidth () {
            if (this.imgList.length < 4) {
                return '350px'
            } else if (this.imgList.length >= 4 && this.imgList.length< 10){
                return 350 + (this.imgList.length - 3) * 80 + 'px'
            } else {
                return '850px'
            }
        },
        boxHeight () {
            let imgLength = this.imgList.length+1 
            if (imgLength/ 10  > 2 ) {
                return (240 + (imgLength / 10 - 1) * 80) + 'px'
            } else {
                return '240px'
            }
        }
    },
    data () {
        return {
            isPanel: false,
            imgList: [],
            spinShow: false,
            editorContent: '',
            imgsrc: [],
            editorTitle: '',
            placeholder: '',
            editor: {},
            isAgree: false,
            publishMode: '公开',
            privacyList: [],
            showPlaceholder: false
        }
    },
    created () {
        this.getPrivacyList();
    },
    mounted() {
        this.initEditor();
    },
    methods: {
        jzEdPlac () {
            if (this.$refs.jzeditor) {
                this.$refs.editor.focus()
                console.log('...........')
            }
        },
        initEditor () {
            let _this = this;
            const Editor = process.browser ? require('wangeditor') : undefined;
            _this.editor = new Editor(this.$refs.toolbar, this.$refs.editor);
            _this.editor.customConfig.menus = [
                'head', // 标题
                'bold', // 粗体
                'italic', // 斜体
                'underline', // 下划线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                //   'image', // 插入图片
                'undo', // 撤销
                'redo', // 重复
            ],
            // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
            _this.editor.customConfig.emotions = [
                {
                    // tab 的标题
                    title: '默认',
                    // type -> 'emoji' / 'image'
                    type: 'image',
                    // content -> 数组
                    content: jzIcon
                },
                {
                    // tab 的标题
                    title: '热门',
                    // type -> 'emoji' / 'image'
                    type: 'image',
                    // content -> 数组
                    content: sinaIcon
                },
                
            ]
            _this.editor.customConfig.showLinkImg = false
            _this.$refs.editor.addEventListener('click', function (e) {
                if (e.target.tagName === 'IMG') {
                    console.log('aaa', e.target.getAttribute('src'))
                }
            })
            _this.editor.customConfig.onchange = function (html) {
                let placeholderValue = _this.editor.txt.text();
                if (placeholderValue.length > 0) {
                    _this.showPlaceholder= false
                } else {
                    _this.showPlaceholder= true
                }
                var reg = new RegExp(/(分享建筑动态！)|(项目详情！)/);
                if(html.match(reg)){
                    _this.editor.txt.html(_this.getSimpleText(html))
                }
                _this.onchange(html)
            }
            _this.editor.create();
        },
        getSimpleText(html){
        // 剔除除表情后的所有标签
            var re1 = new RegExp(/(分享建筑动态！)|(项目详情！)/);//
            var msg = html.replace(re1,'');//执行替换成空字符
            return msg;
        },
        baseUrlRegExp (str) {
            let reg = RegExp(/\http:\/\//);
            if(str && str.match(reg)){
                return str
            } else {
                return this.fileBaseUrl+ str
            }
        },
        ViewProtocol (row) {
            this.$store.dispatch('SETUP', false);
            let routeData = this.$router.resolve({ name: 'other-id', params: { id: "51088359-2291-4f1b-87b3-9d3920307d94"} });
            analogJump(routeData.href);
        },
        // 权限
        async getPrivacyList () {
            let msg = await GetOperatPrivacy(3);
            if (msg) {
                this.privacyList = msg.respOperatPrivacy;
                this.publishMode = this.privacyList[0].Name + '|'+ this.privacyList[0].Id;
            }
        },
        selectIsPublic (name) {
            this.publishMode = name;
        },
        replaceImgs (val) {
            let regex = "/i/s/";
            return val.replace(regex, "/i/");
        },
        //  富文本上传图片
        fileSelected (e) {
            let _this= this;
            let file = e.target.files;
            if (file.length > 0) {
                let data = new FormData();
                for (let item of file) {
                    data.append('files', item)
                }
                uploadFile(data, 1).then(res => {
                    for (let q = 0; q < res.length; q++) {
                        _this.editor.txt.append(`<p><img src="${res[q].smallImgUrl}" style="max-width:100%;"></img><p><br></p></p>`);
                        _this.imgList.push(res[q]);
                    }
                    _this.imgsrc = _this.getSrc(_this.editor.txt.html())
                }).catch(err => {
                    console.log(err, 'uploadErr')
                })
            }
        },
        // 图片
        uploadPic () {
            if (!this.isLogin) {
                this.$emit('notLogged');
                return false
            }
            if (['sp'].includes(this.editorType)) {
                return false
            }
            if (['tw', 'wd'].includes(this.editorType)) {
                this.isPanel = !this.isPanel;
                return false
            }
            this.$refs.uploadPic.click();
        },
        uploadVideo () {
            if (!this.isLogin) {
                this.$emit('notLogged');
                return false
            }
            if (!['sp'].includes(this.editorType)) {
                return false
            }
            if (['sp'].includes(this.editorType)) {
                this.isPanel = !this.isPanel;
                return false
            }
        },
        delImg (index) {
            this.imgList.splice(index, 1)
            // this.$delete(this.imgList, index);
        },
        // 上传前的钩子函数
        beforeUpload (fileList) {
        },
        uploadSuccess (fileList) {
            for(let i of fileList) {
                this.imgList.push(i);
            }
        },
        // 视频
        clearVideo () {
            this.imgList = []
        },
        uploadSuccessVideo (videoInfo) {
            this.imgList = [];
            this.imgList = [videoInfo];
        },
        // 文本域发生变化
        onchange (html) {
            // html 即变化之后的内容
            if (this.imgsrc.length !== 0) {
                let nowimgs = this.getSrc(html)
                let merge = this.imgsrc.concat(nowimgs).filter(function (v, i, arr) {
                    return arr.indexOf(v) === arr.lastIndexOf(v)
                })
                for (let x in merge) {
                    let colds = merge[x].split('/')
                }
                this.imgsrc = nowimgs
            }
        },
        //  取出区域内所有img的src
        getSrc (html) {
            var imgReg = /<img.*?(?:>|\/>)/gi
            // 匹配src属性
            var srcReg = /src=[\\"]?([^\\"]*)[\\"]?/i
            var arr = html.match(imgReg)
            let imgs = []
            if (arr) {
            for (let i = 0; i < arr.length; i++) {
                var src = arr[i].match(srcReg)[1]
                imgs.push(src)
            }
            }
            return imgs
        },
        auxiliary () {
            let content = {
                imgList: this.imgList,
                editorContent: `<p>${this.editor.txt.html()}</p>`,
                editortext: this.editor.txt.text(),
                publishMode: this.publishMode,
                isAgree: this.isAgree
            }
            this.$emit('auxiliary',content )
        },
        clearEditor (placeholders ='') {
            this.isPanel = false;
            this.imgsrc = [];
            this.imgList = [];
            this.publishMode = this.privacyList[0].Name + '|'+ this.privacyList[0].Id;
            this.editor.txt.html(`<p>${placeholders}</p>`);
        },
        // 发布
        editorPush () {
            let content = {
                imgList: this.imgList,
                editorContent: `<p>${this.editor.txt.html()}</p>`,
                editortext: this.editor.txt.text(),
                publishMode: this.publishMode,
                isAgree: this.isAgree
            }
            this.$emit('editorPush',content )
        }
    }
}
</script>
<style lang="less" scoped>
    .jzeditor {
        position: relative;
        &-placeholder {
            position: absolute;
            top: 5px;
            z-index: 1111;
            left: 5px;
        }
    }
    /deep/.w-e-toolbar .w-e-menu {
        z-index: 99 !important;
    }
    .ivu-spin-fix {
        z-index: 99999;
    }
    .editor-title{
        outline: none;
        border-left-color: transparent;
        border-right-color: transparent;
        border-top-color: transparent;
        height: 40px;
        padding: 0 10px;
        width: 100%;
        font-size: 16px;
        color: #666;
        &:focus {
            border-bottom-color: #ff0000;
        }
    }
    .prohibit {
        opacity: .3;
        cursor: no-drop!important;
    }
    .chahao {
        position: absolute;
        right: -2px;
        top: -4px;
        color: #ffffff;
        img {
            width: 100%;
            height: 100%;
        }
        &:hover{
            color: #ff3c00;
            -webkit-transform:rotate(180deg) ;
            transform: rotate(180deg);
            transform-origin: 50% 50%;
            transition: all 0.5s ease-in-out;
      }
    }
    .upload {
        float: left;
        margin-top: 10px;
    }
    .upload-box {
        margin-top: 10px;
        display: flex;
    }
    .upload-tip {
        padding-left: 10px;
    }
    .img-item{
        float: left;
        width: 70px;
        height: 70px;
        margin: 10px 10px 0 0;
        border-radius: 2px;
        background-color: #ccc;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .updat-content-title {
        font-size: 14px;
        color: #000;
    }
    .tool-updat-content {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        background: #fff;
        padding: 15px;
        line-height: 25px;
    }
    .update-horn  {
        position: absolute;
        left: 18px;
        width: 0;
        height: 0;
        border: 15px solid #fff;
        top: -5px;
        transform: rotate(45deg);
        z-index: 1;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
    }
    .add-img {
        color: #00B358;
    }
    .add-video {
        color: #ff3c00;
    }
    .editor-tab {
        display: flex;
        line-height: 30px;
        font-size: 16px;
        font-weight: 600;
        border-bottom: 1px solid #d4d6d4;
        li {
            padding: 8px 10px;
            cursor: pointer;
            position: relative;
        }
        li.editor-tab-active::after {
            content: "";
            display:inline-block;
            width: 100%;
            height: 2px;
            position: absolute;
            background: #ff3c00;
            left: 0;
            bottom: -1px;
        }
    }
    .editor-footer {
        border-top: 1px solid #d4d6d4;
        display: flex;
        justify-content: space-between;
        line-height: 40px;
        position: sticky;
        bottom: 0;
        background: #fff;
        z-index: 999;
        &-tools {
            display: flex;
            >li {
                display: inline-block;
                height: 100%;
                cursor: pointer;
            }
        }
        &-tool {
            display: flex;
            li {
                display: inline-block;
                height: 100%;
                padding: 0 15px;
                margin-right: 10px;
                cursor: pointer;
                width: 80px;
            }
            &-img {
                position: relative;
            }
            &-video {
                position: relative;
            }
            &-pic {
                position:absolute;
                z-index: 666;
                left: 0;
                background: #fff;
                width: 400px;
                height: 240px;
                border-radius: 3px;
                box-shadow:0px 2px 5px #000000;
                cursor: auto;
            }
            &-videos {
                position:absolute;
                z-index: 666;
                left: 0;
                background: #fff;
                width: 400px;
                height: 240px;
                border-radius: 3px;
                box-shadow:0px 2px 5px #000000;
                cursor: auto;
            }
        }
    }
    .editor-push {
        display: inline-block;
        width: 90px;
        line-height: 42px;
        text-align: center;
        font-size: 14px;
        background-color: #ff3c00;
        color: #fff;
        cursor: pointer;
    }
    .editor-box {
        // border: 1px solid #d4d6d4;
        background: #fff;
        margin-top: 10px;
    }
    .editor-toolbar {
        border-bottom: 1px solid #ececec;
        position: relative;
        z-index: 1000;
    }
    /deep/ .w-e-text {
        padding: 0 10px;
        min-height: 150px;
        overflow: hidden;
        background: #eeed;
        p {
            span {
                font-size: 16px !important;
            }
        }
    }
    /deep/ .w-e-emoticon-container .w-e-item{
        img {
            width: 25px;
        }
    }
    /deep/ .w-e-text-container .w-e-panel-container .w-e-panel-tab-content {
        height: 118px !important;
    }
    .text {
        min-height: 150px;
        z-index: 400 !important;
    }
</style>