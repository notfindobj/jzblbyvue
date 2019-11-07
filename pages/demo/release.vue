<template>
    <div>
        <div ref="toolbar"></div>
        <div class="text" ref="editor"></div>
    </div>
</template>
<script>
import {uploadFile} from '../../service/clientAPI'
export default {
    name: 'editor',
    data () {
        return {
            editorContent: '',
            imgsrc: []
        }
    },
    mounted() {
        let _this = this;
        const Editor = process.browser ? require('wangeditor') : undefined;
        let editor = new Editor(this.$refs.toolbar, this.$refs.editor);
        editor.customConfig.menus = [
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
          'image', // 插入图片
          'undo', // 撤销
          'redo', // 重复
        ],
        editor.customConfig.showLinkImg = false
        // 配置服务器端地址
        editor.customConfig.customUploadImg  =  async function (files, insert) {
            let form = new FormData()
            for (let i = 0; i < files.length; i++) {
                form.append('file', files[i])
            }
            let imgUrls = await uploadFile(form, 1);
            // files 是 input 中选中的文件列表
            // insert 是获取图片 url 后，插入到编辑器的方法
            // 上传代码返回结果之后，将图片插入到编辑器中
            for (let q = 0; q < imgUrls.length; q++) {
                insert(imgUrls[q].smallImgUrl)
            }
            
            _this.imgsrc = _this.getSrc(editor.txt.html())

        }
        _this.$refs.editor.addEventListener('click', function (e) {
            if (e.target.tagName === 'IMG') {
                console.log('aaa', e.target.getAttribute('src'))
            }
        })
        editor.customConfig.onchange = function (html) {
          _this.onchange(html)
        }
        editor.create();
        console.log(editor)
    },
    methods: {
        /**
         * 文本域发生变化
         */
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
        /**
         * 取出区域内所有img的src
         */
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
        }
    }
}
</script>
<style lang="less" scoped>
    /deep/ .w-e-text {
        padding: 0 10px;
        min-height: 150px;
    }
    .text {
        min-height: 150px;
        border: 1px solid #ababab;
    }
</style>