<template>
    <div>
        <div class="editor-box">
            <div>
                <div ref="toolbar" class="editor-toolbar"></div>
                <div class="jzeditor">
                    <div class="jzeditor-placeholder" @click="jzEdPlac" v-if="showPlaceholder" ref="jzeditor">{{placeholders}}</div>
                    <div class="text" ref="editor"></div>
                </div>
            </div>
            <div class="editor-footer">
                <ul class="editor-footer-tool">
                    <li :class="!['sp'].includes(editorType)? 'editor-footer-tool-img' : 'editor-footer-tool-img prohibit'" >
                        <span class="add-img" @click="uploadPic()">
                            <i class=" icon iconfont">&#xe631;</i>
                            <ossUp
                                style="display:none"
                                accept="image/*"
                                @beforeUpload="fileSelected"
                                @uploadSuccess="fileSuccess">
                                <div ref="uploadPic" ></div>
                            </ossUp>
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
                                            <img :src="`${item.smallImgUrl}`" :alt="item.action">
                                            <!-- <img v-else :src="`${item.smallImgUrl}?x-oss-process=image/resize,m_fill,h_70,w_70`" :alt="item.action"> -->
                                            <div v-if="item.action" class="action-up">
                                                <span>正在上传</span>
                                            </div>
                                        </div>
                                    </draggable>
                                    <Upload class="upload" :uploadType="2" :nowLength="imgList.length" @beforeSuccessMD="beforeSuccessMD" @uploadSuccess="uploadSuccess" />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li :class="['sp'].includes(editorType)? 'editor-footer-tool-video' : 'prohibit editor-footer-tool-video '" >
                        <span class="add-video" @click="uploadVideo()">
                            <i class="icon iconfont">&#xe624;</i>视频
                        </span>
                        <div class="editor-footer-tool-videos" v-if="['sp'].includes(editorType) && isPanel">
                            <span class="update-horn"></span>
                            <div class="tool-updat-content">
                                <div class="updat-content-title">上传视频</div>
                                <p>发布后，视频将出现在我的部落</p>
                                <div class="upload-box">
                                    <uploadVideo
                                    :previewSrc='previewSrc'
                                    @clearVideo="clearVideo"
                                    @beforeSuccess="beforeSuccess"
                                    @uploadSuccess="uploadSuccessVideo" />
                                    <p class="upload-tip">仅支持MP4视频格式，大小不超过100M，请勿上传反动色情等违法视频。</p>
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
import {uploadFile, GetOperatPrivacy, getEmoticon} from '../../service/clientAPI'
import Upload from '../../components/publish/upload'
import { _debounce, analogJump, getRanNum} from '../../plugins/untils/public'
import uploadVideo from '../../components/publish/uploadVideo'
import draggable from 'vuedraggable'
import { sinaIcon} from './Emoticon'
import ossUp from "../ossUp/ossUp"
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
        uploadVideo,
        ossUp
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
            showPlaceholder: true,
            previewSrc: '',
            Duration: '',
            jzIcon: []
        }
    },
    created () {
        this.getPrivacyList();
    },
    mounted() {
        this.getEmoticonList()
        this.initEditor();
    },
    methods: {
        async getEmoticonList () {
            let isEmotion = localStorage ?  localStorage.getItem('Emotions') : false;
            let msg = []
            if (isEmotion) {
                msg = JSON.parse(isEmotion)
            } else {
                let data = await getEmoticon();
                if (data) {
                    localStorage.setItem('Emotions', JSON.stringify(data))
                    msg = data
                }
            }
            msg.forEach(ele => {
                let obg ={
                    "alt": `[${ele.content}]`,
                    "src": ele.path
                }
                this.jzIcon.push(obg)
            })
        },
        jzEdPlac () {
            if (this.$refs.jzeditor) {
                this.$refs.editor.focus();
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
            _this.editor.customConfig.zIndex = 400
            // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
            _this.editor.customConfig.emotions = [
                {
                    // tab 的标题
                    title: '默认',
                    // type -> 'emoji' / 'image'
                    type: 'image',
                    // content -> 数组
                    content: _this.jzIcon
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
                _this.onchange(html)
            }
            _this.editor.create();
        },
        ViewProtocol (row) {
            this.$store.dispatch('SETUP', false);
            let routeData = this.$router.resolve({ name: 'details-id', params: { id: "51088359-2291-4f1b-87b3-9d3920307d94"} });
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
        //  富文本上传图片
        async fileSelected (file) {
            this.editor.txt.append(`<p>
                    <div class="bl-loading loading${this.setImgClass(file.bmf)}">
                        <img data-action="loading" src="${file.smallImgUrl}" style="max-width:100%;"></img>
                        <div class="bl-mongolia" contenteditable="false">
                            <span>正在上传</span>
                        </div>
                    </div>
                </p>`);
            this.imgList.push(file);
        },
        // 富文本上传图片成功
        fileSuccess (file) {
            let name = file.name;
            let imgsrcs= ""
            this.imgList.forEach((ele, index) => {
                if (ele.bmf === file.name) {
                    ele.action = false
                    ele.smallImgUrl = ele.key;
                    imgsrcs = ele.key
                }
            })
            setTimeout(() => {
                $(`.loading${this.setImgClass(name)}`).replaceWith(`<p><img src="${imgsrcs}" style="max-width:100%;"></img></p>`);
                this.imgsrc = this.getSrc(this.editor.txt.html())
            }, 100)
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
        beforeSuccess (file) {
            this.imgList = [];
            this.getTimes(file)
        },
        beforeSuccessMD (obj) {
            if (this.imgList.length > 29) {
                this.$Message.info({
                    render: h => {
                        return h('span', `图片上传最多不能超过30张`)
                    }
                });
            } else {
                this.imgList.push(obj);
            }
        },
        uploadSuccess (file) {
            this.imgList.forEach((ele, index) => {
                if (ele.bmf === file.name) {
                    ele.action = false
                    ele.smallImgUrl = ele.key
                }
            })
        },
        // 视频
        clearVideo () {
            this.imgList = [];
            this.previewSrc = ''
        },
        uploadSuccessVideo (videoInfo) {
            let obj = videoInfo 
            obj.videoUrl = videoInfo.smallImgUrl
            obj.smallImgUrl = videoInfo.smallImgUrl+"?x-oss-process=video/snapshot,t_2000,f_jpg"
            this.imgList = [];
            this.previewSrc = obj.smallImgUrl
            this.imgList = [obj];
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
            this.previewSrc = ''
            this.publishMode = this.privacyList[0].Name + '|'+ this.privacyList[0].Id;
            // this.editor.txt.html(`<p>${placeholders}</p>`);
            this.editor.txt.html(`<p><br/></p>`);
            this.showPlaceholder = true
        },
        // 发布
        editorPush () {
            let content = {
                imgList: this.imgList,
                editorContent: `<p>${this.editor.txt.html()}</p>`,
                editortext: this.editor.txt.text(),
                publishMode: this.publishMode,
                isAgree: this.isAgree,
                Duration: this.Duration
            }
            this.$emit('editorPush',content )
        },
        setImgClass (val) {
            try {
               return val.replace(/[(|)|=|$|-|@|#|%|^|&|*|/|!|,|。|?|:|;|.| ]/g,"")
            } catch (error) {
                return val
            }
        },
        getTimes(content) {
            let _this = this
            //获取录音时长
            let url = URL.createObjectURL(content);
            //经测试，发现audio也可获取视频的时长
            let audioElement = new Audio(url);
            let duration;
            audioElement.addEventListener("loadedmetadata",  function (_event) {
                duration = parseInt(audioElement.duration);
                _this.Duration = _this.getTime(duration)
            });
        },
        getTime(duration) {
            let hour = parseInt(duration / 3600)
            if (duration >= 3600) {
                duration = duration % 3600
            }
            let min = parseInt(duration / 60);
            let sec = duration % 60;
            return this.getType(hour) + ":" +this.getType(min) + ":" + this.getType(sec);
        },
        getType(time) {
            return time<10 ? "0" + time : time;
        }
    }
}
</script>
<style lang="less" scoped>
    .max_w {
        width: 100%;
    }
    .action-up {
        position: absolute;
        top: 0;
        background: rgba(214, 214, 214, .6);
        color: #ffffff;
        width: 100%;
        height: 100%;
        span {
            position:absolute;
            display: inline-block;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            text-align: center;
        }
    }
    /deep/.bl-loading {
        position: relative;
        .bl-mongolia {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            background:rgba(255, 255, 255, 0.6);
            span {
                position: absolute;
                font-size: 20px;
                font-weight: bold;
                color: #fff;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
            }
        }
    }
    .jzeditor {
        position: relative;
        &-placeholder {
            position: absolute;
            color: #2b2b2b;
            top: 5px;
            z-index: 300;
            left: 11px;
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
        // border: 2px dashed #b6b6b6;
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
        font-weight: bold;
        i {
            position: relative;
            top: 1px;
            left: 2px;
        }
    }
    .add-video {
        color: #ff3c00;
        font-weight: bold;
        i {
            position: relative;
            top: 2px;
            left: -2px;
        }
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
        background: rgba(224, 224, 224, 0.5);
    }
</style>