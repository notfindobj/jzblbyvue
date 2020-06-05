<template>
<div class="main-box">
    <Breadcrumb separator=">" class="box">
        <BreadcrumbItem>当前位置：</BreadcrumbItem>
        <BreadcrumbItem to="/course">我的自学</BreadcrumbItem>
        <BreadcrumbItem to="/self_study/Backstage">后台管理</BreadcrumbItem>
        <BreadcrumbItem>新建课程</BreadcrumbItem>
    </Breadcrumb>
    <div class="new" v-if="type === '1'">
        <div class="new-from">
            <label>课程封面</label>
            <ossUp 
                accept="image/*"
                :fileType="1"
                @uploadSuccess="coverSuccess">
                <div class="upvideo"  title="课程封面" :style="`background-image: url(${course.FirstImg}`">
                    <Icon type="ios-cloud-upload" size="35" color="#1bbc9b"/>
                </div>
            </ossUp>
        </div>
        <div class="new-from">
            <label>课程名称</label>
            <input v-model="course.CourseName" type="text" placeholder="课程名称">
        </div>
        <div class="new-from">
            <label>课程类型</label>
            <Cascader :data="couseList" v-model="course.coursetype"></Cascader>
        </div>
        <div class="new-from">
            <label>课程描述</label>
            <textarea v-model="course.Desc" type="text" placeholder="课程描述"></textarea>
        </div>
        <div class="new-from">
            <label>难易程度</label>
            <select v-model="course.Level">
                <option v-for="(item, index) in levelname" :key="index" :value="item.value">{{item.label}}</option>
            </select>
        </div>
        <div class="new-from">
            <label>原价</label>
            <input type="text" v-model="course.OriginalPrice" placeholder="原价">
        </div>
        <div class="new-from">
            <label>折扣价</label>
            <input type="text" v-model="course.DiscountedPrice" placeholder="折扣价">
        </div>
        <div class="new-from">
            <label>合适人群</label>
            <select v-model="course.SuitsTheCrowd">
                <option v-for="(item, index) in typename" :key="index" :value="item.value">{{item.label}}</option>
            </select>
        </div>
        <div class="new-from">
            <label>课程介绍</label>
            <div class="ditor">
                <div ref="toolbar" class="editor-toolbar">
                    <div class="w-e-menu" >
                        <ossUp 
                        accept="image/*"
                        :fileType="1"
                        @uploadSuccess="editorSuccess"
                        class="menutupian">
                            <i class="icon iconfont icon-tupian"></i>
                        </ossUp>
                    </div>
                </div>
                <div class="jzeditor">
                    <div class="text" ref="editor"></div>
                </div>
            </div>
            <!-- <textarea type="text" v-model="course.Contents" placeholder="课程介绍"></textarea> -->
        </div>
        <div class="new-from">
            <span class="new-from-btn" @click="setCourseData()">下一步</span>
        </div>
    </div>
    <div class="new" v-if="type === '2'">
        <span @click="openChapter(0)">新建章节</span>
        <ul class="box">
            <li class="box-item" v-for="(items, index) in outlineData.outlineDatas" :key="index">
                <div class="box-item-title">
                    <div class="box-item-title-name">
                        <span>{{items.Name}}</span>
                        <div>
                            <span class="title-expand" @click="openChapter(1, items)">修改</span>
                            <span class="title-expand" @click="delCouseline(items, outlineData)">删除</span>
                        </div>
                    </div>
                    <i class="`icon iconfont icon-jiantoushang"></i>
                </div>
                <dl class="box-item-expand">
                    <dd class="box-item-expand-items" v-for="(item, inx) in items.ChildNode" :key="inx">
                        <div class="box-item-expand-items-left">
                            <img :src="`${item.FirstImg}?x-oss-process=video/snapshot,t_2000,f_jpg);`" alt="">
                        </div>
                        <div class="box-item-expand-items-right">
                            <div class="box-item-expand-items-right-name">
                                <span>{{item.Name}}</span>
                                <span>{{item.IsApproved === 0 ? '正在审核' : item.IsApproved === 1 ? '通过' : '不通过' }}</span>
                            </div>
                            <div class="box-item-expand-items-right-attr">
                                <div>
                                    <div class="item-attr">
                                        <span>创建时间： {{item.CreateDate}}</span>
                                        <span>审核时间： {{item.AuditDate}}</span>
                                    </div>
                                    <div class="item-attr">
                                        <span>时长： {{item.Duration}}</span>
                                        <span>是否免费：{{item.IsFree === 1? '免费': '收费'}}</span>
                                    </div>
                                </div>
                                <div class="item-control">
                                    <span @click="openCourse(1, item)">修改</span>
                                    <span @click="delCouseline(item)">删除</span>
                                </div>
                            </div>
                        </div>
                    </dd>
                </dl>
                <div>
                    <span @click="openCourse(0, items)">添加课程</span>
                </div>
            </li>
        </ul>
    </div>
    <Modal title="新建章节" v-if="isChapter" @closeModal="isChapter = false">
        <input class="chapter" type="text" v-model="chapter.Name">
        <div class="chapter-foot">
            <span @click="okChapter(0)">确认</span>
        </div>
    </Modal>
    <Modal title="上传课程" v-if="isCourse" @closeModal="isCourse = false">
        <div class="new-video ">
            <label>课程名称</label>
            <input type="text" v-model="chapter.Name" placeholder="课程名称"></input>
        </div>
        <div class="new-video ">
            <label>是否免费</label>
            <select v-model="chapter.IsFree">
                <option :value="1">是</option>
                <option :value="0">否</option>
            </select>
        </div>
        <div class="new-video">
            <label>随堂资料</label>
            <ossUp  
                accept=".zip,.rar"
                :fileType="1"
                @uploadSuccess="fileSuccess">
                <div class="upload-component" title="上传随堂资料">
                    <Icon type="ios-cloud-upload" size="35" color="#1bbc9b"/>
                </div>
                <div>{{chapter.Accessory.fileName}}</div>
            </ossUp>
        </div>
        <div class="new-video">
            <label>上传视频</label>
            <ossUp 
                accept="video/*"
                :fileType="1"
                @beforeUpload="getVideoInfo"
                @uploadSuccess="videoSuccess">
                <div class="upvideo"  title="上传视频" :style="`background-image: url(${chapter.FirstImg}?x-oss-process=video/snapshot,t_2000,f_jpg);`">
                    <Icon type="ios-cloud-upload" size="35" color="#1bbc9b"/>
                </div>
            </ossUp>
        </div>
        <div class="chapter-foot foot">
            <span @click="okCourse(0)">确认</span>
        </div>
    </Modal>
</div>
</template>
<script>
import Modal from "../components/Modal"
import ossUp from "../../../components/ossUp/ossUp"
import { sinaIcon} from '../../../components/blEditor/Emoticon'
import {getPostPolicy} from '../../../service/clientAPI'
import {addCourseOutline, addCourseData,getHomeCourseType, getCourseDetail, delCourseOutline} from "../../../service/course"
export default {
    layout: "course",
    components: {
        Modal,
        ossUp
    },
    data () {
        return {
            couseList: [],
            levelname: [
                {value:0, label: "基础入门"},
                {value:1, label: "初级"},
                {value:2, label: "中级"},
                {value:3, label: "高级"},
                {value:4, label: "初级|中级"},
                {value:5, label: "中级|高级"},
            ],
            typename: [
                {value:0, label: "零基础"},
                {value:1, label: "学生"},
                {value:2, label: "建筑表现师、环境设计师、设计院校学生及设计爱好者"},
            ],
            course: { // 大纲
                CourseID:"",
                CourseName: "",
                Desc: "",
                Level: 0,
                IsFree: 0,
                OriginalPrice: "",
                DiscountedPrice: "",
                SuitsTheCrowd: "",
                Contents: " ",
                FirstImg: "",
                TypeId:'',
                coursetype: []
            },
            outlineData:{
                CourseID : "",
                outlineDatas: []
            },
            isChapter: false,
            chapter: {
                "outlineId":"",
                "Name":"",
                "FirstImg":"",
                "VideoUrl":"",
                "Duration":"",
                "IsFree":"",
                "Sort":"",
                "Accessory":{},
                "ChildNode": []
            },
            isCourse: false,
            type: "1",
            editor: null
        }
    },
    async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        let list = await store.dispatch('getHomeCourseType');
        if (list) {
            list.forEach(ele => {
                ele.value = ele.typeId
                ele.label = ele.typename
                ele.children= []
                ele.typelist.forEach(eles =>{
                    let obg = {
                        value : eles.ID,
                        label : eles.Name
                    }
                    ele.children.push(obg)
                })
            })
        }
        return {
            couseList: list,
        }
    },
    created () {
        this.type = this.$route.query.type || "1"
        if (this.type === '2') {
            this.getOutlineList()
        }
    },
    mounted () {
        if (this.type === '1') {
            this.initEditor()
        }
        
    },
    methods: {
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
                'undo', // 撤销
                'redo', // 重复
            ],
            _this.editor.customConfig.zIndex = 400
            // 表情面板可以有多个 tab ，因此要配置成一个数组。数组每个元素代表一个 tab 的配置
            _this.editor.customConfig.emotions = [
                {
                    // tab 的标题
                    title: '热门',
                    // type -> 'emoji' / 'image'
                    type: 'image',
                    // content -> 数组
                    content: sinaIcon
                },
                
            ]
            _this.editor.customConfig.onchange = function (html) {
                let placeholderValue = _this.editor.txt.html();
                _this.course.Contents = placeholderValue
            }
            _this.editor.create();
        },
        // 编辑器上传图片
        editorSuccess (res) {
            let img =  `<img src="${res.smallImgUrl}" style="width: 100%;"></img> <br/>`
            this.editor.txt.html(img)
            this.course.Contents += img
        },
        async getOutlineList () {
            let row = JSON.parse(localStorage.getItem('courseIndex'))
            let res = await this.$store.dispatch('getCourseOutline', {courseId: row.CourseID});
            this.outlineData.CourseID = res.CourseID
            this.outlineData.outlineDatas = res.Courselist
        },
        openChapter (type= 0, row) {
            this.isChapter = true
            // 修改1 新建0
            if (type === 0) {
                this.chapter.Sort = ""
                this.chapter.outlineId = ""
                this.chapter.Name = ""
            }
            if (type === 1) {
                this.chapter = JSON.parse(JSON.stringify(row))
            }
        },
        okChapter () {
            if (this.chapter && this.chapter.Sort === "") {
                this.chapter.Sort = this.outlineData.outlineDatas.length;
                let obg = JSON.parse(JSON.stringify(this.chapter));
                this.outlineData.outlineDatas.push(obg);
            } else {
                this.outlineData.outlineDatas.forEach(ele => {
                    if (ele.Sort ===  this.chapter.Sort) {
                        ele.Name = this.chapter.Name;
                    }
                });
            }
            this.isChapter = false
        },
        // 添加课程
        openCourse (type= 0, row) {
            this.isCourse = true
            // 修改1 新建0
            if (type === 0) {
                this.chapter = {
                    "outlineId": "",
                    "Name": "",
                    "FirstImg": "",
                    "VideoUrl": "",
                    "Duration": "",
                    "IsFree": "",
                    "Sort": row.Sort,
                    "Accessory": {},
                    "ChildNode": []
                }
            }
            if (type === 1) {
                this.chapter = JSON.parse(JSON.stringify(row))
            }
        },
        // 下一步
        setCourseData () {
            let that = this;
            this.course.coursetypeDatas = this.course.coursetype.join(',')
            addCourseData(this.course).then(res => {
                if (res) {
                    that.type = "2"
                    that.outlineData.CourseID = res
                }
            }).catch(err => {})
        },
        // 上传封面
        coverSuccess (res) {
            this.course.FirstImg = res.smallImgUrl
        },
        // 上传资料
        fileSuccess (res) {
            this.chapter.Accessory ={}
            this.chapter.Accessory.fileUrl = res.smallImgUrl
            this.chapter.Accessory.fileName = res.name
        },
        videoSuccess (res) {
            this.chapter.VideoUrl = res.smallImgUrl
            this.chapter.FirstImg= res.smallImgUrl
        },
        // 确认上传课程
        okCourse () {
            let that = this;
            let line = {}
            let lineRow = {}
            line.CourseID = this.outlineData.CourseID
            this.outlineData.outlineDatas.forEach((ele, index) =>{
                if (ele.Sort === this.chapter.Sort) {
                    lineRow = JSON.parse(JSON.stringify(ele))
                    lineRow.ChildNode = []
                }
            });
            line.outlineDatas = []
            lineRow.ChildNode = [this.chapter]
            line.outlineDatas= [lineRow]
            addCourseOutline(line).then(res => {
               if (res) {
                   that.getOutlineList()
                   that.isCourse = false
               }
           }).catch(err => {})
        },
        delCouseline (row) {
            let q = {
                OutlineID: row.outlineId,
                CourseID: row.CourseID
            }
            delCourseOutline(q).then(res => {
                
            }).catch(err => {})
        },
        getVideoInfo (content) {
            let _this = this
            //获取录音时长
            let url = URL.createObjectURL(content);
            //经测试，发现audio也可获取视频的时长
            let audioElement = new Audio(url);
            let duration;
            audioElement.addEventListener("loadedmetadata",  function (_event) {
                duration = parseInt(audioElement.duration);
                _this.chapter.Duration = _this.getTime(duration)
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
.menutupian{
    /deep/.ivu-upload-drag {
        border: none;
        &:hover {
            border: none;
        }
    }
}
.ditor {
    border: 1px solid #eee;
    .editor-toolbar {
        border: 1px solid #eee;
    }
    .jzeditor{
        min-height: 300px;
        width: 600px;
        overflow-x: hidden;
    }
    /deep/.w-e-text {
        overflow-y:auto;
        img {
            width: 100%;
        }
    }
}
.upload-component {
    position: relative;
    height: 60px;
    width: 200px;
    a {
        position: absolute;
        top: 20px;
        left: 0;
        right: 0;
        margin: 0 auto;
        z-index: 2;
        cursor: pointer;
    }
    i {
        position: absolute;
        top: 15px;
        left: 0;
        right: 0;
        margin: 0 auto;
        z-index: 1;
    }
    input[type="file"] {
        width: 35px;
        height: 35px;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
    }
}
.upvideo {
    width: 200px;
    height: 190px;
    cursor: pointer;
    line-height: 190px;
    background-size: 100% 100%;
}
.new-data {
    background: #64c9e0;
    line-height: 30px;
    padding: 4px 10px;
    border-radius: 3px;
    cursor: pointer;
}
.foot {
    margin: 20px;
}
.new-video {
    display: flex;
    margin: 8px 0;
    position: relative;
    width: 500px;
    padding: 0 20px;
    .ivu-cascader {
        width: 400px;
    }
    label {
        width: 80px;
        line-height: 29px;
    }
}
input, textarea, select{
    font-size: 14px;
    width: 100%;
    outline: none;
    padding: 3px 10px;
    color: #333;
    border-radius: 4px;
    border: 1px solid #d4d4d4;
    &:hover {
        border-color: #ff6333;
    }
    &:active {
        border-color: #ff6333;
    }
}
select {
    height: 29px;
}
.chapter {
    margin: 20px 15px;
    width: 300px;
}
.chapter-foot {
    text-align: center;
    span {
        display: inline-block;
        width: 80px;
        background: #1bbc9b;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
    }
}
.new {
    font-size: 14px;
    width: 1200px;
    margin: 15px auto;
    padding: 15px 15px 50px;
    background: #fff;
    &-from {
        display: flex;
        margin: 8px 0;
        width: 60%;
        position: relative;
        .ivu-cascader {
            width: 400px;
        }
        label {
            width: 80px;
        }
        > input, textarea, select{
            font-size: 14px;
            width: 400px;
            outline: none;
            padding: 3px 10px;
            color: #333;
            border-radius: 4px;
            border: 1px solid #d4d4d4;
        }
        &-btn{
            position: absolute;
            left: 50%;
            background: #ddd;
            padding: 5px 30px;
            top: 10px;
            cursor: pointer;
            transform: translateX(-50%);
        }
    }
}
.box {
    &-item{
        &-title{
            cursor: pointer;
            line-height: 30px;
            font-size: 16px;
            font-weight: 600;
            padding: 8px 30px 8px 5px;
            background: rgba(238,238,238,0.93333);
            display: flex;
            justify-content: space-between;
            &:hover .title-expand{
                display: inline-block;
            }
            &-name {
                display: flex;
                flex: 1;
                justify-content: space-between;
                padding-right: 40px;
                .title-expand {
                    display: none;
                    &:hover{
                        color: #1bbc9b;
                    }
                }
            }
        }
        &-expand {
            &-items {
                padding: 10px;
                border-bottom: 1px dashed #eee;
                display: flex;
                &-left {
                    width: 100px;
                    height: 100px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                &-right {
                    padding: 0 15px;
                    flex: 1;
                    cursor: pointer;
                    &-name{
                        display: flex;
                        justify-content: space-between;
                        font-size: 16px;
                        line-height: 35px;
                        span {
                            &:last-child {
                                color: #1bbc9b;
                            }
                        }
                    }
                    &-attr {
                        display: flex;
                        > div {
                            flex: 1;
                        }
                    }
                }
            }
        }
    }
}
.item-attr {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    color: #999;
}
.item-control {
    align-self: flex-end;
    text-align: right;
    span {
        &:last-child {
            margin-left: 20px;
        }
        &:hover {
            color: #1bbc9b;
        }
    }
}
</style>