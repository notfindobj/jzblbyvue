<template>
    <div>
        <Tabls :editorTab="['tw', 'tz', 'sp', 'wd', 'xm']" :editorName="editorName" @clickEditor="clickEditor"/>
        <dataBank ref="protPush"  v-if="editorName === 'xm'" @protPush="protPush"/>
        <div v-if="['tz', 'wd'].includes(editorName)">
            <input v-model="editorTitle" :placeholder="ArticleTitle.title" class="editor-title" />
        </div>
        <blEditor ref="editor" :editorType="editorName" @editorPush="editorPush" @notLogged="notLogged"/>
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
import { mapGetters} from 'vuex'
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
            protPushData: {},
            Building: ['da970ced-f63b-4c93-96d2-8ccffc860f02', 'e5082f90-f590-4107-8d42-2d37897ef261' ,'412c275f-3a6b-45b0-b3b2-a69a36666e8a'],
            pdfBul: ['f7399e5e-82a6-47e0-942e-fcae1a68af40', 'efa20b33-6dd9-4eb4-85c8-55ea854fee89'],
            navigationID: [
                {
                    value: 'e5082f90-f590-4107-8d42-2d37897ef261',
                    label: '示范区'
                },
                {
                    value: '412c275f-3a6b-45b0-b3b2-a69a36666e8a',
                    label: '楼盘'
                },
                {
                    value: 'da970ced-f63b-4c93-96d2-8ccffc860f02',
                    label: '效果图'
                },
                {
                    value: '0607ac33-06c6-4430-86f0-3bb7ef83eca3',
                    label: 'SU模型'
                },
                {
                    value: '03b6f0e1-f0ef-4654-86d3-d7c8d35b7fd3',
                    label: '总图'
                },
                {
                    value: '642cdb69-a95a-4b84-9242-8ad4cc6ddabf',
                    label: '平面'
                },
                {
                    value: '9626945d-6f04-4b61-9190-a273a4d94e05',
                    label: '文本'
                },
                {
                    value: 'f7399e5e-82a6-47e0-942e-fcae1a68af40',
                    label: '建筑规范'
                },
                {
                    value: 'efa20b33-6dd9-4eb4-85c8-55ea854fee89',
                    label: '室内案例'
                },
                {
                    value: '7bb57c36-0180-44ac-85c4-a38a66d3a780',
                    label: '新楼盘'
                }
            ]
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
        },
        ...mapGetters(['isLogin'])
    },
    methods: {
        // 是否登录
        notLogged () {
            this.$store.dispatch('SETUP', true);
            this.$store.dispatch('LOGGEDIN', 'signIn');
        },
        clickEditor (tab) {
            this.editorTitle = '';
            this.$refs.editor.clearEditor();
            this.$emit('clickEditor', tab.value)
        },
        protPush (row) {
            this.protPushData = row || {};
        },
        async editorPush (row) {
            if (!this.isLogin) {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
                return false
            }
            if (this.editorName === 'xm') {
                this.$refs.protPush.protPush();
                if (row.editortext === '' || row.imgList.length < 1) {
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
                        if (this.$route.name === 'BuildingCircle-id' && this.Building.includes(this.protPushData.TypeModel.ItemTypeId)) {
                            this.$Message.success('发布成功！');
                            this.spinShow = false;
                            this.$refs.editor.clearEditor();
                            this.$refs.protPush.clearEditor();
                            this.$emit('relSuccessfully', true)
                        } else{
                            let layout = true
                            if (this.pdfBul.includes(this.protPushData.TypeModel.ItemTypeId)) {
                                layout = false
                            }
                            this.$router.push({name: 'DataDetails',query: {id: msg.ItemId, layout: layout}})
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
                    if (this.$route.name === 'BuildingCircle-id') {
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
                    if (this.$route.name === 'BuildingCircle-id') {
                        this.$Message.success('发布成功！');
                        this.$refs.editor.clearEditor();
                        this.spinShow = false
                        this.$emit('relSuccessfully', true)
                    } else{
                        this.$router.push({ name: "BuildingCircle-id"})
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