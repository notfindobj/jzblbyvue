<template>
    <div>
        <div class="editor-box">
            <ul class="editor-tab">
                <li :class="editorName === item.value ? 'editor-tab-active': ''" v-for="(item, index) in editorTool" :key="index" v-if="item.isShow" @click="clickEditor(item)">{{item.name}}</li>
            </ul>
            <div v-if="placeholder">
                <input v-model="editorTitle" :placeholder="placeholder" class="editor-title" />
            </div>
            <div ref="toolbar" class="editor-toolbar"></div>
            <div class="text" ref="editor"></div>
            <div class="editor-footer">
                <ul class="editor-footer-tool">
                    <li :class="editorName !== 'sp'? 'editor-footer-tool-img' : 'editor-footer-tool-img prohibit'" >
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
                        <div class="editor-footer-tool-update" v-if="(editorName === 'tw' || editorName === 'wd')  && isPanel">
                            <span class="update-horn"></span>
                            <div class="tool-updat-content">
                                <div class="updat-content-title">本地上传</div>
                                <p>共{{imgList.length}}张，还能上传{{30 -imgList.length}}张</p>
                                <div>
                                    <draggable v-model="imgList" group="people" @start="drag=true" @end="drag=false" :animation="500">
                                        <div class="img-item" v-for="(item, index) in imgList" :key="index" >
                                            <i class="icon iconfont icon-chahao2 chahao" @click.stop="delImg(index)"></i>
                                            <img :src="item.smallImgUrl" alt="">
                                        </div>
                                    </draggable>
                                    <Upload
                                        class="upload"
                                        :uploadType="2"
                                        @uploadSuccess="uploadSuccess"
                                    />
                                </div>
                            </div>
                        </div>
                    </li>
                    <li :class="editorName === 'sp' ? 'editor-footer-tool-video' : 'prohibit editor-footer-tool-video '" >
                        <span class="add-video" @click="uploadVideo()">
                            <i class=" icon iconfont">&#xe624;</i>
                            视频
                        </span>
                        <div class="editor-footer-tool-update" v-if="editorName === 'sp' && isPanel">
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
                    <li>
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
import uploadVideo from '../../components/publish/uploadVideo'
import draggable from 'vuedraggable'
export default {
    name: 'editor',
    components: {
        draggable,
        Upload,
        uploadVideo
    },
    props: {
        editorTab: {
            type: Array,
            default: function () {
                return ['tw', 'tz', 'sp', 'wd']
            }
        }
    },
    data () {
        return {
            isPanel: false,
            imgList: [],
            spinShow: false,
            editorName: 'tw',
            editorContent: '',
            editorTool: [
                {name:'发布图文', value: 'tw', title: '', content: '有什么新鲜事想告诉大家？', isShow: true},
                {name:'发布文章', value: 'tz', title: '请输入文章标题', content: '请输入正文...', isShow: true},
                {name:'发布视频', value: 'sp', title: '', content: '有什么新鲜事想告诉大家？', isShow: true},
                {name:'发布项目', value: 'xm', title: '项目名称', content: '有什么新鲜事想告诉大家？', isShow: true},
                {name:'发布问答', value: 'wd', title: '请输入问题标题（4-40字）', content: '添加问题背景描述（选填，0-40字）', isShow: true},
            ],
            imgsrc: [],
            editor: {},
            editorTitle: '',
            placeholder: '',
            publishMode: '公开',
            privacyList: [],
        }
    },
    created () {
        this.getPrivacyList();
        this.editorTool.forEach((eles) => {
            let isT = false
            this.editorTab.forEach(ele => {
                if ( eles.value === ele) {
                    isT = true;
                }
                eles.isShow = isT
            })
        })
    },
    mounted() {
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
        _this.editor.customConfig.showLinkImg = false
        _this.$refs.editor.addEventListener('click', function (e) {
            if (e.target.tagName === 'IMG') {
                console.log('aaa', e.target.getAttribute('src'))
            }
        })
        _this.editor.customConfig.onchange = function (html) {
          _this.onchange(html)
        }
        _this.editor.create();
    },
    methods: {
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
                        _this.editor.txt.append(`<img src="${res[q].smallImgUrl}" style="max-width:100%;"></img>`)
                    }
                    _this.imgsrc = _this.getSrc(_this.editor.txt.html())
                }).catch(err => {
                    console.log(err, 'uploadErr')
                })
            }
        },
        // 图片
        uploadPic () {
            if (this.editorName === 'sp') {
                return false
            }
            if (this.editorName === 'tw' || this.editorName === 'wd') {
                this.isPanel = !this.isPanel;
                return false
            }
            this.$refs.uploadPic.click();
        },
        uploadVideo () {
            if (this.editorName !== 'sp') {
                return false
            }
            if (this.editorName === 'sp') {
                this.isPanel = !this.isPanel;
                return false
            }
        },
        // tab 切换
        clickEditor (row) {
            this.editorName = row.value;
            this.placeholder = row.title;
            this.isPanel = false;
            this.imgsrc = [];
            this.editorTitle = '';
            this.publishMode = this.privacyList[0].Name + '|'+ this.privacyList[0].Id;
            this.editor.txt.html(`<p>${row.content||''}</p>`)
        },
        delImg () {
            // this.$delete(this.imgList, index);
        },
        uploadSuccess (fileList) {
            for(let i of fileList) {
                this.imgList.push(i);
            }
        },
        // 视频
        clearVideo () {
            this.imgList = [];
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
                console.log(merge)
                for (let x in merge) {
                    let colds = merge[x].split('/')
                    console.log(colds)
                    // this.deleteImage(colds) //服务器删除文件
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
        clearEditor () {
            this.editorName = this.editorName;
            this.placeholder= this.placeholder;
            this.isPanel = false;
            this.imgsrc = [];
            this.imgList = [];
            this.editorTitle = '';
            this.publishMode = this.privacyList[0].Name + '|'+ this.privacyList[0].Id;
            this.editor.txt.html(`<p></p>`)
        },
        // 发布
        editorPush () {
            let content = {
                imgList: this.imgList,
                editorContent: this.editor.txt.html(),
                editortext: this.editor.txt.text(),
                editorTitle: this.editorTitle,
                publishMode: this.publishMode,
                editorName: this.editorName
            }
            this.$emit('editorPush',content )
        }
    }
}
</script>
<style lang="less" scoped>
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
            &-update {
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
        width: 120px;
        line-height: 42px;
        text-align: center;
        font-size: 14px;
        background-color: #ff3c00;
        color: #fff;
        cursor: pointer;
    }
    .editor-box {
        border: 1px solid #d4d6d4;
        background: #fff;
        margin-top: 10px;
    }
    .editor-toolbar {
        border-bottom: 1px solid #ececec;
    }
    /deep/ .w-e-text {
        padding: 0 10px;
        min-height: 100px;
    }
    /deep/ .w-e-text {
        overflow: hidden;
        background: #eeed;
    }
    .text {
        min-height: 100px;
        z-index: 10 !important;
    }
</style>