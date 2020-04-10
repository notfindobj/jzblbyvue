<template>
    <div class="chat">
        <div class="chat-box">
            <div class="chat-box-side">
                <div class="chat-user-title">
                    <img src="https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif" alt="" width="50px" height="50px">
                    <span>初九</span>
                </div>
                <div class="chat-user-search">
                    <div class="chat-user-search-c">
                        <Icon type="md-search" />
                        <input type="text" v-model="seaUser" placeholder="查找联系人" >
                    </div>
                </div>
                <ul class="contacts">
                    <li :class="items.active ? 'contacts-items contacts-active': 'contacts-items '" v-for="(items, index) in contactsList" :key="index" @click="searUser(items)" @mousedown="openMent">
                        <div class="contacts-items-lf">
                            <div class="contacts-items-lf-img">
                                <img :src="items.HeadIcon" alt="" width="50px" height="50px">
                            </div>
                            <div class="contacts-items-lf-user">
                                <p class="contacts-items-lf-user-name">{{items.NickName}}</p>
                                <p class="contacts-items-lf-user-sub">{{items.LatestMsg}}</p>
                            </div>
                        </div>
                        <div class="contacts-items-time">{{items.MsgDateTime}}</div>
                    </li>
                </ul>
            </div>
            <div class="chat-box-con">
                <div class="chat-box-con-tit">
                    {{beforePerson.userName}}
                </div>
                <div class="chat-box-con-chat">
                    <ul class="news-box" id="newTypeImg">
                        <template v-for="(items, index) in newList">
                            <li class="news-box-item" :key="index">
                                <p class="news-box-item-time">{{items.time}}</p>
                                <div class="news-box-item-con">
                                    <div :class="`news-box-item-con-img ${!items.isSelf ? ' new-lf' : 'new-rf'}`">
                                        <img data-w-e="1" :src="items.headIcon" alt="" width="100%" height="100%">
                                    </div>
                                    <div  :class="`news-box-item-con-txt ${!items.isSelf ? ' new-lf' : 'new-rf'}`">
                                        <div :class="`news-box-item-con-txt-lf ${!items.isSelf ? ' triangle-lf' : 'triangle-rf'}`"></div>
                                        <div class="news-box-item-con-txt-rf">
                                            <template v-if="items.newType === 1">
                                                <span>{{items.content}}</span>
                                            </template>
                                            <template v-if="items.newType === 2">
                                                <img :src="items.content" :data-original="items.content" alt="" width="100%">
                                            </template>
                                            <template v-if="items.newType === 3" >
                                                <div>
                                                    下载 <span>index.vue</span>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </template>
                    </ul>
                </div>
                <div class="chat-box-con-edit">
                    <div class="chat-box-con-edit-tit">
                        <span><i class="icon iconfont icon-xiaolian"></i></span>
                        <span><i class="icon iconfont icon-tupian1"></i></span>
                        <span><i class="icon iconfont icon-wenjian"></i></span>
                    </div>
                    <textarea cols="30" rows="4"></textarea>
                </div>
            </div>
        </div>
         <ul v-if="isPannel" ref="menuPanel" class="menuPanel menulist" :style="`left: ${Client.x}px;top: ${Client.y}px;`">
            <li>查看部落</li>
            <li>屏蔽此人</li>
            <li>删除对话</li>
        </ul>
    </div>
</template>
<script>
import Viewer from 'viewerjs';
import { mapState } from 'vuex'
import {getChatUserList} from "../../service/sign"
export default {
    layout: "chat",
    components: {},
    data () {
        return {
            contactsList: [
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "初九",
                    firNew: "你好啊",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 1
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "嘿嘿嘿",
                    firNew: "在吗",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 2
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "初九",
                    firNew: "你好啊",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 3
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "嘿嘿嘿",
                    firNew: "在吗",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 4
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "初九",
                    firNew: "你好啊",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 5
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "嘿嘿嘿",
                    firNew: "在吗",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 6
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "初九",
                    firNew: "你好啊",
                    time: "18:06",
                    active: false
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "嘿嘿嘿",
                    firNew: "在吗",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 7
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "初九",
                    firNew: "你好啊",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 8
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "嘿嘿嘿",
                    firNew: "在吗",
                    time: "18:06",
                    active: true,
                    id: 9
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "初九",
                    firNew: "你好啊",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 10
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "嘿嘿嘿",
                    firNew: "在吗",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 11
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "初九",
                    firNew: "你好啊",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 12
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "嘿嘿嘿",
                    firNew: "在吗",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 13
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "初九",
                    firNew: "你好啊",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 14
                },
                {
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    userName: "嘿嘿嘿",
                    firNew: "在吗",
                    time: "18:06",
                    active: false,
                    isSearch: true,
                    id: 15
                }
            ],
            beforePerson: {},
            newList: [
                // 1 文本 2 图片  3 文件
                {
                    userName: "初九",
                    headIcon: "",
                    newType: 1,
                    content: '@微公益 您关注的“疫情一线医护•守护者后盾行动” 公益项目进展已更新，请点击：http://t.cn/A6PaVOGY查看详情',
                    time: '2020-06-08',
                    isSelf: false
                },
                {
                    userName: "初九",
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    newType: 2,
                    content: 'https://www.pic1.jzbl.com/buildingcircle/d5b4fbaa-40a0-4145-a119-88af91c3bf8f/2020-03-24/f/cKkscczSjF1585104280.jpg?x-oss-process=image/quality,q_80/watermark,image_V2F0ZXJtYXJrL3dhdGVybWFyay5wbmc=,size_20,type_d3F5LXplbmhlaQ,text_QOWImOeDqA,color_E94743,shadow_50,order_0,align_2,interval_10,t_90,g_sw,x_20,y_20',
                    time: '2020-06-08',
                    isSelf: false
                },
                {
                    userName: "初九",
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    newType: 1,
                    content: '@微公益 您关注的“疫情一线医护•守护者后盾行动” 公益项目进展已更新，请点击：http://t.cn/A6PaVOGY查看详情',
                    time: '2020-06-08',
                    isSelf: true
                },
                {
                    userName: "初九",
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    newType: 3,
                    content: '@微公益 您关注的“疫情一线医护•守护者后盾行动” 公益项目进展已更新，请点击：http://t.cn/A6PaVOGY查看详情',
                    time: '2020-06-08',
                    isSelf: false
                },
                {
                    userName: "初九",
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    newType: 1,
                    content: '@微公益 您关注的“疫情一线医护•守护者后盾行动” 公益项目进展已更新，请点击：http://t.cn/A6PaVOGY查看详情',
                    time: '2020-06-08',
                    isSelf: true
                },
                {
                    userName: "初九",
                    headIcon: "https://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif",
                    newType: 3,
                    content: '@微公益 您关注的“疫情一线医护•守护者后盾行动” 公益项目进展已更新，请点击：http://t.cn/A6PaVOGY查看详情',
                    time: '2020-06-08',
                    isSelf: false
                }
            ],
            isPannel: false,
            Client: {},
            Viewer: {},
            seaUser: ""
        }
    },
    created () {
        this.beforePerson = this.contactsList[0]
    },
     computed: {
        ...mapState({
            userInfo: state => state.overas.auth ? state.overas.auth: ""
        }),
    },
    mounted () {
        this.newWebSocket()
        document.addEventListener('click',e => {
            if(this.$refs.menuPanel && !this.$refs.menuPanel.contains(e.target)){
                this.isPannel = false
            }
        })
        this.initView()
        this.getUserList()
    },
    methods: {
        async getUserList () {
            this.contactsList = [
                {
                    "DialogId": "",
                    "NickName": "666",
                    "HeadIcon": "https://www.pic.jzbl.com/itemfiles/userinfoimg/baseimg/user.png",
                    "LatestMsg": "在不在啊",
                    "MsgDateTime": "1586309630",
                    "ToUserId": "d5b4fbaa-40a0-4145-a119-88af91c3bf8f",
                    "UserOnLine": 1,
                    "UnreadMsg": 0
                }
            ]
            // let m = await getChatUserList();
            // if (m) {
            //     this.contactsList = [
            //     ]
            // }
        },
        initView() {
            const ViewerDom = document.getElementById('newTypeImg');
            let _this = this;
            _this.$nextTick(() => {
                let viewers = new Viewer(ViewerDom, {
                    url: 'data-original',
                    tooltip:false,
                    zIndex: 3018,
                    // filter: function (e) {
                    //     if (e.getAttribute('data-w-e') !== '1') {
                    //         return e
                    //     }
                    // },
                    // button: false,
                    // toolbar: true,
                    // navbar: true,
                    // title: false,
                    // zoomRatio: 0.4,
                    // maxZoomRatio: 3,
                    // minZoomRatio: 0.5,
                    // shown: function (e) {
                    //     var that = e.target.viewer;
                    //     $(e.target.viewer.viewer).find(".viewer-canvas").on("dblclick", "img", function () {
                    //         // that.hide();
                    //     });
                    // },
                })
            })
        },
        searUser (row) {
            this.contactsList.filter(o => {o.id === row.id ? o.active = true : o.active = false});
            this.beforePerson = row
        },
        openMent (event) {
            event.preventDefault();
            document.oncontextmenu= function () {return false;}
            console.log(event)
            if (event.which === 3) {
                this.isPannel = true
                this.Client = this.getClient(event)
            }
        },
        getClient (event) {
            return {x: event.clientX, y: event.clientY}
        },
        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            })
        },
        newWebSocket () {
            let that = this;
            // 判断浏览器是否支持WebSocket
            var is_support = ("WebSocket" in window);
            if (is_support) {
                // 打开一个 web socket
                var ws = new WebSocket(`ws://192.168.10.19:600/api/chatd2d?token=${this.userInfo.token}`);
                //  Web Socket 已连接上
                ws.onopen = function() {
                    // let msg = {
                    //     MsgId: that.guid(),
                    //     Token: that.userInfo.token,
                    //     ToUserId: "d5b4fbaa-40a0-4145-a119-88af91c3bf8f",
                    //     DialgId: "fd26eb84-2c1e-4082-a615-be3f9e2afc61",
                    //     Content: "你好"
                    // }
                    // // 使用 send() 方法向服务器发送数据 数据
                    ws.send(JSON.stringify({}));
                    console.log("数据发送中...");
                };
                //  接受服务器数据
                ws.onmessage = function(e) {
                    console.log("数据已接收...", e);
                };
                //  连接关闭
                ws.onclose = function() {
                    // that.newWebSocket()
                    // 关闭 websocket
                    console.log("连接已关闭...");
                };
            } else {
                // 浏览器不支持 WebSocket
                alert("您的浏览器不支持 WebSocket!");
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .menulist{
        background: #fff;
        border: 1px solid #f2f2f5;
        border-bottom: none;
        border-radius: 2px;
        box-shadow: 0 2px 8px 1px rgba(0,0,0,.2);
        padding: 2px;
        li {
            font-size: 12px;
            cursor: pointer;
            line-height: 12px;
            position: relative;
            display: block;
            white-space: nowrap;
            min-width: 50px;
            padding: 14px 35px 14px 16px;
            color: #333;
            &:hover {
                background: #f2f2f5;
                color: #f5846c;
            }
        }
    }
    
    .contacts {
        background-color: #33353a;
        height: ~"calc(100vh - 118px)";
        overflow-x: hidden;
        overflow-y: auto;
        &-active {
            background: #292b2e;
            &::before {
                content: "";
                position: absolute;
                width: 2px;
                height: 80px;
                left: 0;
                top: 0;
                background: #ff3c00;
            }
        }
        &-items {
            position: relative;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            height: 80px;
            line-height: 80px;
            cursor: pointer;
            border-bottom: 1px solid #2c2e31;
            &:hover {
                background: #3a3c42;
            }
            &-lf {
                display: flex;
                &-img {
                    width: 50px;
                    height: 50px;
                    background: #fff;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-top: 15px;
                }
                &-user {
                    font-size: 14px;
                    line-height: 25px;
                    margin-left: 15px;
                    &-name {
                        color: #fff;
                        margin-top: 15px;
                    }
                    &-sub {
                        color: #999;
                    }
                }
            }
            &-time {
                color: #51555e;
                vertical-align: top;
            }
        }
    }
    /**/
    .chat-user {
        &-title {
            font-size: 16px;
            height: 70px;
            display: flex;
            line-height: 50px;
            padding: 10px 15px;
            img {
                border-radius: 50%;
                margin-right: 20px;
            }
        } 
        &-search{
            padding: 12px 16px 3px 16px;
            border-bottom: 1px solid #404247;
            input {
                background-color: hsla(0,0%,75.3%,.2);
                outline: none;
                border: none;
                height: 32px;
                width: 100%;
                color: #fff;
                padding-left: 10px;
                &::placeholder {
                    color: #fff;
                }
            }
            &-c {
                background-color: rgba(192, 192, 192, 0.2);
                display: flex;
                line-height: 32px;
                border-radius: 5px;
                overflow: hidden;
                i {
                    padding: 0 5px;
                    font-size: 20px;
                    line-height: 32px;
                }
            }
        }
    }
    /**
    右侧内容
    */
    .new-lf {
        float: left;
        margin-left: 20px;
    }
    .new-rf {
        float: right;
        margin-right: 20px;
    }
    .triangle-lf {
        left: -9px;
    }
    .triangle-rf {
        right: -9px;
    }
    .news-box {
        padding: 10px 0 50px 0;
        &-item {
            padding: 8px 18px;
             &::after, &::before {
                content: "";
                display: block;
                height: 0;
                clear:both;
                visibility: hidden;
            }
            &-time {
                text-align: center;
                margin: 5px 0;
            }
            &-con {
                &-img {
                    width: 35px;
                    height: 35px;
                    background: #ddaabb;
                    border-radius: 50%;
                    overflow: hidden;
                }
                &-txt {
                    display: flex;
                    position: relative;
                    &-lf {
                        border-right-color: #f5f5f5;
                        top: 10px;
                        width: 0;
                        height: 0;
                        z-index: 99;
                        border: 10px solid rgba(0, 0, 0, 0);
                        border-top-color: #f5f5f5;
                        display: inline-block;
                        position: absolute;
                    }
                    &-rf {
                        background: #f5f5f5;
                        padding: 10px 15px;
                        border-radius: 6px;
                        max-width: 400px;
                        line-height: 25px;
                    }
                }
            }
        }
    }
    .chat {
        width: 100%;
        height: 100vh;
        &-box {
            width: 1200px;
            margin: 0 auto;
            height: 100%;
            &-side {
                width: 320px;
                background: #33353a;
                height: 100%;
                float: left;
                color: #fff;
            }
            &-con {
                width: 870px;
                background: #fff;
                float: right;
                height: 100%;
                margin-left: 10px;
                &-tit {
                    line-height: 50px;
                    font-size: 16px;
                    padding: 0 20px;
                    border-bottom: 1px solid #e2dddd;
                }
                &-chat {
                    height: ~"calc(100vh - 205px)";
                    background: #fff;
                    overflow-x: hidden;
                    overflow-y: auto;
                }
                &-edit {
                    bottom: 0;
                    position: absolute;
                    width: 870px;
                    height: 155px;
                    background: #ddd;
                    &-tit {
                        line-height: 20px;
                        height: 20px;
                        margin-top: 10px;
                        padding: 0 10px;
                        span {
                            margin-left: 10px;
                            cursor: pointer;
                            &:first-child {
                                margin-left: 0;
                            }
                        }
                    }
                    textarea {
                        padding: 0 10px;
                        width: 100%;
                        line-height: 25px;
                        font-size: 15px;
                        background: #ddd;
                        color: #333;
                        border: none;
                        &:focus {
                            border: none;
                            outline: none;
                        }
                    }
                }
            }
        }
    }
    &::-webkit-scrollbar {
        width: 0.16rem;
        background: rgba(117, 180, 253, 0.2);
        box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(1, 69, 132, 0.5);
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #cbe3ec;
    }
    /*滚动条的上下两端的按钮*/
    &::-webkit-scrollbar-button {
        height: 0px;
    }
</style>