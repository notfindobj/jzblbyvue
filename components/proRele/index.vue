<template>
    <div>
        <Tabls :editorTab="['tw', 'tz', 'sp', 'wd', 'xm']" :editorName="editorName" @clickEditor="clickEditor"/>
        <dataBank ref="protPush"  v-if="editorName === 'xm'" @protPush="protPush"/>
        <div v-if="['tz', 'wd'].includes(editorName)">
            <input v-model="editorTitle" :placeholder="ArticleTitle.title" class="editor-title" />
        </div>
        <blEditor ref="editor" :editorType="editorName" @editorPush="editorPush" />
        <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>上传中</div>
        </Spin>
    </div>
</template>
<script>
import Tabls from './component/tabls'
import dataBank from './component/dataBank'
import blEditor from '../blEditor'
import {publishProject, uploadFile, releaseStatement} from '../../service/clientAPI'
export default {
    components: {
        Tabls,
        blEditor,
        dataBank
    },
    props: {
        editorName: {
            type: String,
            default: 'tw'
        }
    },
    data () {
        return {
            spinShow: false,
            editorTitle: '',
            protPushData: {}
        }
    },
    computed: {
        ArticleTitle: function () {
            let editorTool = [
                {name:'发布图文', value: 'tw', title: '', content: '有什么新鲜事想告诉大家？', isShow: true},
                {name:'发布文章', value: 'tz', title: '请输入文章标题', content: '请输入正文...', isShow: true},
                {name:'发布视频', value: 'sp', title: '', content: '有什么新鲜事想告诉大家？', isShow: true},
                {name:'发布项目', value: 'xm', title: '项目名称', content: '有什么新鲜事想告诉大家？', isShow: true},
                {name:'发布问答', value: 'wd', title: '请输入问题标题（4-40字）', content: '添加问题背景描述（选填，0-40字）', isShow: true},
            ]
            for (let i=0;i<editorTool.length; i++) {
                if (editorTool[i].value === this.editorName) {
                    return editorTool[i]
                    break;
                }
            }
        }
    },
    methods: {
        clickEditor (tab) {
            this.editorTitle = '';
            this.$refs.editor.clearEditor();
            this.$emit('clickEditor', tab.value)
        },
        protPush (row) {
            this.protPushData = row || {};
        },
        async editorPush (row) {
            if (this.editorName === 'xm') {
                this.$refs.protPush.protPush();
                this.$refs.editor.clearEditor();
                this.$refs.protPush.clearEditor();
                return false
                if (row.editortext === '') {
                    this.$Message.warning('项目内容不能为空');
                    return false
                }
                if (!row.isAgree) {
                    this.$Message.warning('请阅读并同意《建筑部落用户协议》');
                    return false
                }
                if (JSON.stringify(this.protPushData) !== '{}') {
                    this.protPushData.ItemContent = row.editorContent
                    this.spinShow = true
                    let msg = await publishProject(this.protPushData);
                    if (msg) {
                        if (this.$route.name === 'BuildingCircle') {
                            this.$Message.success('发布成功！');
                            this.spinShow = false;
                            this.$refs.editor.clearEditor();
                            this.$refs.protPush.clearEditor();
                            this.$emit('relSuccessfully', true)
                        } else{
                            this.$router.push({ name: "BuildingCircle"})
                        }
                    } 
                }
            }
            if (this.editorName === 'tw') {
                if (row.editortext === '') {
                    this.$Message.warning('内容不能为空');
                    return false
                }
                this.spinShow = true
                let obg = {
                    talkType: 1,
                    talkTitle: '',
                    displayPrivacyId: row.publishMode.split('|')[1],
                    talkContent: row.editorContent,
                    listImg: row.imgList
                }
                let msg = await releaseStatement(obg);
                if (msg) {
                    if (this.$route.name === 'BuildingCircle') {
                        this.$Message.success('发布成功！');
                        this.$refs.editor.clearEditor();
                        this.spinShow = false
                        this.$emit('relSuccessfully', true)
                    } else{
                        this.$router.push({ name: "BuildingCircle"})
                    }
                } 
            }
            if (this.editorName === 'sp' && row.editortext !== '') {
                if (row.editortext === '') {
                    this.$Message.warning('内容不能为空');
                    return false
                }
                this.spinShow = true
                let obg = {
                    talkType: 2,
                    talkTitle: row.editorContent,
                    talkContent: '',
                    displayPrivacyId: row.publishMode.split('|')[1],
                    listImg: row.imgList
                }
                let msg = await releaseStatement(obg);
                if (msg) {
                    if (this.$route.name === 'videos') {
                        this.$Message.success('发布成功！');
                        this.$refs.editor.clearEditor();
                        this.spinShow = false
                        this.$emit('relSuccessfully', true)
                    } else {
                        this.$router.push({ name: "videos"})
                    }
                    
                } 
            }
            if (this.editorName === 'wd') {
                if (row.editortext === '') {
                    this.$Message.warning('内容不能为空');
                    return false
                }
                this.spinShow = true
                let obg = {
                    talkType: 3,
                    talkTitle: this.editorTitle,
                    talkContent: row.editorContent,
                    webLabel: [],
                    displayPrivacyId: row.publishMode.split('|')[1],
                    listImg: row.imgList
                }
                let msg = await releaseStatement(obg);
                if (msg) {
                    if (this.$route.name === 'QuestionsAndAnswers') {
                       this.$Message.success('发布成功！');
                        this.$refs.editor.clearEditor();
                        this.spinShow = false
                        this.$emit('relSuccessfully', true) 
                    } else {
                        this.$router.push({ name: "QuestionsAndAnswers"})
                    }
                } 
            }
            if (this.editorName === 'tz') {
                if (row.editortext === '') {
                    this.$Message.warning('内容不能为空');
                    return false
                }
                this.spinShow = true
                let obg = {
                    talkType: 5,
                    talkTitle: this.editorTitle,
                    talkContent: row.editorContent,
                    displayPrivacyId: row.publishMode.split('|')[1],
                    listImg: row.imgList
                }
                let msg = await releaseStatement(obg);
                if (msg) {
                    if (this.$route.name === 'BuildingCircle') {
                        this.$Message.success('发布成功！');
                        this.$refs.editor.clearEditor();
                        this.spinShow = false
                        this.$emit('relSuccessfully', true)
                    } else{
                        this.$router.push({ name: "BuildingCircle"})
                    }
                    
                } 
            }
            this.editorTitle = '';
        }
    },
}
</script>
<style lang="less" scoped>
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
</style>