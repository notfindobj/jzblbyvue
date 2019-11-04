<template>
    <div>
        <div ref="toolbar"></div>
        <div class="text" ref="editor"></div>
    </div>
</template>
<script>
export default {
    name: 'editor',
    data () {
        return {
            editorContent: ''
        }
    },
    methods: {
        getContent: function () {
            alert(this.editorContent)
        }
    },
    mounted() {
        const Editor = process.browser ? require('wangeditor') : undefined;
        let editor = new Editor(this.$refs.toolbar, this.$refs.editor);
        editor.customConfig.menus = [
          'head', // 标题
          'bold', // 粗体
          'italic', // 斜体
          'underline', // 下划线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          'undo', // 撤销
          'redo', // 重复
        ],
        editor.customConfig.showLinkImg = false
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create();
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