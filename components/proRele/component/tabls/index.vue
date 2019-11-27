<template>
    <ul class="editor-tab">
        <li :class="editorName === item.value ? 'editor-tab-active': ''" v-for="(item, index) in editorTool" :key="index" v-if="item.isShow" @click="clickEditor(item)">{{item.name}}</li>
    </ul>
</template>
<script>
export default {
    props: {
        editorTab: {
            type: Array,
            default: function () {
                return ['tw', 'tz', 'sp', 'wd', 'xm']
            }
        },
        editorName: {
            type: String,
            default: 'tw'
        }
    },
    created () {
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
    data () {
        return {
            editorTool: [
                {name:'发布图文', value: 'tw', isShow: true},
                {name:'发布文章', value: 'tz', isShow: true},
                {name:'发布视频', value: 'sp', isShow: true},
                {name:'发布项目', value: 'xm', isShow: true},
                {name:'发布问答', value: 'wd', isShow: true},
            ],
        }
    },
    methods: {
        // tab 切换
        clickEditor (row) {
            let lastTab = {}
            this.editorTool.forEach((eles) => {
                if (eles.value === this.editorName) {
                    lastTab = eles
                }
            })
            this.$emit('clickEditor', row, lastTab)
        },
    },
}
</script>
<style lang="less" scoped>
        .editor-tab {
        display: flex;
        line-height: 30px;
        font-size: 16px;
        font-weight: 600;
        border-bottom: 1px solid #d4d6d4;
        background: #fff;
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
</style>