<template>
    <div class="chat">
        <div class="chat-box">
            <div class="chat-box-side">
                <div class="chat-user-title">
                    <div class="chat-user-title-lf">
                        <img :src="userInfo.HeadIcon" alt="" width="50px" height="50px">
                        <span>{{userInfo.NickName}}</span>
                    </div>
                    <div @click="openNewGroup">
                        <i class="icon iconfont icon-add1 icon-size"></i>
                    </div>
                </div>
                <div class="chat-user-search">
                    <div class="chat-user-search-c">
                        <Icon type="md-search" />
                        <input type="text" v-model="seaUser" placeholder="查找联系人" @keyup.enter="getUserList">
                    </div>
                </div>
                <ul class="contacts">
                    <li :class="items.ToUserId === beforePerson.ToUserId ? 'contacts-items contacts-active': 'contacts-items '" 
                    v-for="(items, index) in contactsList" :key="index" @click="searUser(items)" @mousedown="openMent(items, items.IsGroup ? 2: 0)">
                        <div class="contacts-items-lf">
                            <div class="contacts-items-lf-img">
                                <img :src="items.HeadIcon" alt="" width="50px" height="50px">
                            </div>
                        </div>
                        <div class="contacts-items-lf-user">
                            <p class="contacts-items-lf-user-name">
                                <span>{{items.NickName}}</span>
                                <span>{{items.MsgSendDateTime | datefmt("h:mm:ss a", 1)}}</span>
                            </p>
                            <p class="contacts-items-lf-user-sub">
                                <span>{{setNew(items)}}</span>
                                <i v-if="items.OppositeStatus === 2" class="icon iconfont icon-jinzhi"></i>
                                <span  class="shuzi" v-if="items.UnreadMsg > 0">{{items.UnreadMsg}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="chat-box-con" v-if="beforePerson">
                <div class="chat-box-con-tit">
                    <span>{{beforePerson.NickName}}</span>
                    <div v-if="beforePerson.IsGroup">
                        <span @click="openGroupInfo"><i class="icon iconfont icon-qunzu icon-size"></i></span>
                        <span @click="isShare = true"><i class="icon iconfont icon-fenxiang icon-size"></i></span>
                    </div>
                    <span v-if="!beforePerson.IsGroup" @click="openNewGroup"><i class="icon iconfont icon-qunzu icon-size"></i></span>
                </div>
                <div class="chat-box-con-chat" id="chatBox">
                    <div class="user-ship" v-if="beforePerson.OppositeStatus !== 0">
                        <span >{{setUsetShip(beforePerson)}}
                            <i @click="setUserShip" v-if="beforePerson.OppositeStatus === 1" class="icon iconfont icon-yanjing yan"></i>
                            <span @click="setUserShip" v-if="beforePerson.OppositeStatus === 2" style="color: #ff3c00;">解除屏蔽</span>
                        </span> 
                    </div>
                    <ul class="news-box" id="newTypeImg">
                        <template v-for="item in newList" v-if="item.id === beforePerson.RoomId">
                            <template v-for="(items, indexs) in item.list">
                                <template v-if="items.BaseMsgType === 1">
                                    <li class="news-box-item" :key="indexs">
                                        <p class="news-box-item-time">{{items.MsgObj.MsgSendDateTime | datefmt("h:mm:ss a", 1)}}</p>
                                        <div class="news-box-item-con">
                                            <div :class="`news-box-item-con-img ${!items.MsgObj.IsSelf ? ' new-lf' : 'new-rf'}`">
                                                <img data-w-e="0" :src="items.MsgObj.HeadIcon" alt="" width="100%" height="100%">
                                            </div>
                                            <div :class="`news-box-item-con-txt ${!items.MsgObj.IsSelf ? ' new-lf' : 'new-rf'}`"  @mousedown="openMent(items.MsgObj, 1)">
                                                <div :class="`news-box-item-con-txt-lf ${!items.MsgObj.IsSelf ? ' triangle-lf' : 'triangle-rf'}`"></div>
                                                <div class="news-box-item-con-txt-rf">
                                                    <template v-if="items.MsgObj.MsgType === 0">
                                                    <emotHtml v-model="items.MsgObj.Msg"></emotHtml>
                                                    </template>
                                                    <template v-if="items.MsgObj.MsgType === 1">
                                                        <img :data-magnify="items.MsgObj.MsgSendDateTime" :data-src="items.MsgObj.Msg" :src="items.MsgObj.Msg" width="100%">
                                                        <!-- <img  :src="items.MsgObj.Msg" :data-original="items.MsgObj.Msg" alt="" width="100%"> -->
                                                    </template>
                                                    <template v-if="items.MsgObj.MsgType === 2" >
                                                        <div class="down-file">
                                                            <span>{{items.MsgObj.Msg.split("|")[1]}}</span>
                                                            <span @click="downFile(items.MsgObj.Msg.split('|')[0])">下载</span>
                                                        </div>
                                                    </template>
                                                </div>
                                                <span v-if="items.MsgObj.SendType !==1 && items.MsgObj.SendType !==2" :class="`${!items.MsgObj.IsSelf ? 'send-status-lf' : 'send-status-rf'}`">
                                                    <i class="icon iconfont icon-zhongfa"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                </template>
                                <template v-if="items.BaseMsgType === 0">
                                    <li class="news-box-item" :key="indexs">
                                        <p class="news-box-item-time">{{items.MsgObj.MsgSendDateTime | datefmt("h:mm:ss a", 1)}}</p>
                                        <div class="news-box-item-con">
                                            <div :class="`news-box-item-con-img ${!items.MsgObj.IsSelf ? ' new-lf' : 'new-rf'}`">
                                                <img data-w-e="0" :src="items.MsgObj.HeadIcon" alt="" width="100%" height="100%">
                                            </div>
                                            <div :class="`news-box-item-con-txt ${!items.MsgObj.IsSelf ? ' new-lf' : 'new-rf'}`"  @mousedown="openMent(items.MsgObj, 1)">
                                                <div :class="`news-box-item-con-txt-lf ${!items.MsgObj.IsSelf ? ' triangle-lf' : 'triangle-rf'}`"></div>
                                                <div class="news-box-item-con-txt-rf">
                                                    <!--  0文字 -->
                                                    <template v-if="items.MsgObj.MsgType === 0">
                                                        <span>{{items.MsgObj.Msg}}</span>
                                                    </template>
                                                    <!--  1 图片 -->
                                                    <template v-if="items.MsgObj.MsgType === 1">
                                                        <img @click="$().zoomify()" :src="items.MsgObj.Msg" :data-original="items.MsgObj.Msg" alt="" width="100%">
                                                    </template>
                                                    <!--  2 文件 -->
                                                    <template v-if="items.MsgObj.MsgType === 2" >
                                                        <div class="down-file">
                                                            <span>{{items.MsgObj.Msg.split("|")[1]}}</span>
                                                            <span @click="downFile(items.MsgObj.Msg.split('|')[0])">下载</span>
                                                        </div>
                                                    </template>
                                                </div>
                                                <span v-if="items.MsgObj.SendType !==1 && items.MsgObj.SendType !==2" :class="`${!items.MsgObj.IsSelf ? 'send-status-lf' : 'send-status-rf'}`">
                                                    <i class="icon iconfont icon-zhongfa"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="ship-tips">
                                            <span>{{items.MsgObj.SysMsg}}</span>
                                        </div>
                                    </li>
                                </template>
                                <template v-if="items.BaseMsgType === 2">
                                    <li class="news-box-item sysMsg" :key="indexs">
                                        {{items.MsgObj.SysMsg}}
                                    </li>
                                </template>
                            </template>
                        </template>
                    </ul>
                </div>
                <div class="chat-box-con-edit">
                    <Emotion :class="'panl-emotion'" v-if="isEmotion"
                    @closeEmotion="closeEmotion"
                    @emotion="handleEmotion"
                    :height="120"/>
                    <div class="chat-box-con-edit-tit">
                        <span><i class="icon iconfont icon-xiaolian" @click="isEmotion = true"></i></span>
                        <span><i class="icon iconfont icon-tupian1" @click="$refs.SendImg.click()"></i>
                            <input ref="SendImg" type="file" accept="image/*"  style="display:none;" @change="loadSendImg">
                        </span>
                        <span><i class="icon iconfont icon-wenjian"  @click="$refs.SendFile.click()"></i>
                            <input ref="SendFile" type="file"  accept=".js,.doc,.docx,.xls,.xlsx,.pdf" style="display:none;" @change="loadSendFile">
                        </span>
                    </div>
                    <textarea cols="30" rows="4" v-model="sendContent" @keydown="sendMegess" ></textarea>
                    <div class="chat-edit">
                        <span>按下Enter发送内容/ Ctrl+Enter换行</span>
                        <Button @click="sendMegessBtn">发送</Button>
                    </div>
                </div>
            </div>
        </div>
        <Pannel :isPannel="isPannel" :Client="Client" @Pannel="isPannel = false">
            <!--  用户 -->
            <template v-if="panRow.mentType === 0">
                <li @click="viewBl">查看部落</li>
                <li @click="ShieldAndDdel(1)"> {{panRow.OppositeStatus === 2 ? "解除屏蔽此人": "屏蔽此人"}} </li>
                <li @click="ShieldAndDdel(2)">删除对话</li>
            </template>
            <!--  群组 -->
            <template v-if="panRow.mentType === 2">
                <li @click="openGroupInfo">查看群资料</li>
                <!-- <li @click="ShieldAndDdel(1)"> {{panRow.OppositeStatus === 2 ? "打开群消息通知": "群消息免打扰"}} </li> -->
                <li @click="ShieldAndDdel(2)">删除对话</li>
            </template>
             <!--  消息 -->
            <template v-if="panRow.mentType === 1">
                <li @click="delDia()">删除对话</li>
            </template>
        </Pannel>
        <!-- 新建群联 -->
        <Modal :title="newGroup === 1 ? '新建群聊' : '新建群聊-选择联系人'" v-if="newGroup === 1 || newGroup === 2" @closeModal="closeNewGroup"> 
            <newGrop v-if="newGroup === 1" 
            :newGroup="newGroupInfo"
            @nextStep="nextStep" />

            <selectPerson v-if="newGroup === 2" 
            :modalRow="beforePerson" 
            :modalType="0" 
            @sumAdd="sumAdd" 
            @backStop="backStop"/>
        </Modal>
        <!-- 查看群信息 -->
        <!-- panRow.mentType ? panRow : beforePerson判断是在那里点击的群组 -->
        <Modal :title="viewGroup === 1 ? '群信息' : modalType === 1 ?  '添加成员': '删除成员'" v-if="viewGroup === 1 || viewGroup === 2" @closeModal="viewGroup= 0" > 
            <groupInfo v-if="viewGroup === 1" 
            :groupInfo="panRow.mentType? panRow : beforePerson"
            @delUser="delUser"
            @dropOut="dropOut"
            @addUser="addUser" />
            <selectPerson v-if="viewGroup === 2" 
            :modalRow="panRow.mentType? panRow : beforePerson" 
            :modalType="modalType" 
            :enterText="modalType === 1 ?  '确认添加': '确认删除'"
            @sumAdd="viewPerson" 
            @backStop="viewGroup = 1"/>
        </Modal>
        <Modal v-if="isShare" title="分享群组" @closeModal="isShare= false" > 
            <selectPerson
            :modalRow="beforePerson" 
            :modalType="1" 
            enterText="确认分享"
            @sumAdd="sharePerson" 
            @backStop="isShare = false"/>
        </Modal>
    </div>
</template>
<script>
import Viewer from 'viewerjs';
import { mapState } from 'vuex'
import {uploadFile} from "../../service/clientAPI"
import {getChatUserList, getChatHistory, setShip, getRoom, CreateGroup, delGroupUser, addGroupUser} from "../../service/sign"
import {createSocket, sendWSPush} from "./websocket"
import Emotion from '../../components/Emotion'
import {analogJump, Notifiy} from '../../plugins/untils/public'
import Pannel from "./components/Pannel"
import Modal from "./components/Modal"
import newGrop from "./components/newGrop"
import selectPerson from "./components/selectPerson"
import groupInfo from "./components/groupInfo"
export default {
    layout: "chat",
    components: {
        Emotion,
        Pannel,
        Modal,
        newGrop,
        selectPerson,
        groupInfo
    },
    data () {
        return {
            contactsList: [], // 房间列表
            beforePerson: {},
            newList: [], // 消息列表
            isPannel: false,
            Client: {},
            Viewer: {},
            seaUser: "",
            sendContent: "",
            panRow: {},
            Socket: null,
            isEmotion: false,
            PageAction: false,
            userList: [],
            newGroup: 0, // 添加群组,
            newGroupInfo: {
                GroupName: "",
                GroupIntroduction: ""
            },
            viewGroup: 0,
            modalType: 0,
            isShare: false
        }
    },
    created () {
        this.getUserList()
    },
    computed: {
        ...mapState({
            userInfo: state => state.overas.auth ? state.overas.auth: ""
        }),
    },
    mounted () {
        this.initSocket(this.userInfo.token)
        this.changeEvent()
        this.initView()
    },
    methods: {
        addUser () {
            this.viewGroup = 2;
            this.modalType = 1
        },
        delUser () {
            this.viewGroup = 2
            this.modalType = 2
        },
        openNewGroup () {
            this.viewGroup = 0;
            this.newGroup = 1
            this.isPannel = false
        },
        openGroupInfo () {
            this.viewGroup = 1;
            this.newGroup = 0
            this.isPannel = false
        },
        // 新建群名基础信息
        nextStep () {
            this.newGroup = 2;
        },
        backStop () {
            this.newGroup = 1
        },
        closeNewGroup () {
            this.newGroup = 0;
            this.newGroupInfo = {
                GroupName: "",
                GroupIntroduction: ""
            }
        },
        // 新建群组
        sumAdd (users) {
            let arr = []
            users.forEach(o => {
                arr.push(o.UserId)
            })
            let q = this.newGroupInfo
            q.UserIds = arr.join(",")
            CreateGroup(q).then(res => {
                if (res) {
                    this.newGroup = 0;
                    this.$Message.success("创建群组成功")
                    this.newGroupInfo = {
                        GroupName: "",
                        GroupIntroduction: ""
                    }
                    if (this.contactsList.length > 0) {
                        this.contactsList.unshift(res)
                    } else {
                        this.contactsList.push(res)
                    }
                    
                }
            }).catch(err => {err})
        },
        viewPerson (row) {
            let that = this;
            let arr = []
            row.forEach(o => {
                arr.push(o.UserId)
            })
            let RoomId = this.panRow.RoomId ? this.panRow.RoomId : this.beforePerson.RoomId
            // 添加
            if (this.modalType === 1) {
                addGroupUser(arr.join(","), RoomId, 1).then(res => {
                    this.viewGroup = 0;
                    this.$Message.success("添加成功")
                    let obg = {
                        Msg: res.CallbackInfo.msgid,
                        Token: that.userInfo.token,
                        RoomId: that.beforePerson.RoomId,
                        MsgType: 3
                    }
                    sendWSPush(obg)
                }).catch(err => {})
                return false
            }
            // 删除
            if (this.modalType === 2) {
                delGroupUser(arr.join(","),RoomId).then(res => {
                    this.viewGroup = 0;
                    this.$Message.success("删除成功")
                    let obg = {
                        Msg: res.CallbackInfo.msgid,
                        Token: that.userInfo.token,
                        RoomId: that.beforePerson.RoomId,
                        MsgType: 3
                    }
                    sendWSPush(obg)
                }).catch(err => {})
                return false
            }
        },
        // 退出
        dropOut (row) {
            let that = this;
            let RoomId = this.panRow.RoomId ? this.panRow.RoomId : this.beforePerson.RoomId
            delGroupUser(this.userInfo.UserId, RoomId).then(res => {
                this.viewGroup = 0;
                this.$Message.success("退出成功")
                that.contactsList.forEach((ele, index) => {
                    if (ele.RoomId === arr.MsgObj.RoomId) {
                        that.contactsList.splice(index, 1)
                    }
                })
            }).catch(err => {})
        },
        // 分享
        sharePerson (row) {
            let that = this;
            let arr = []
            row.forEach(o => {
                arr.push(o.UserId)
            })
            let RoomId = this.panRow.RoomId ? this.panRow.RoomId : this.beforePerson.RoomId
            addGroupUser(arr.join(","), RoomId , 2).then(res => {
                this.isShare = false;
                this.$Message.success("分享成功")
            }).catch(err => {})
        },
        closeEmotion (val) {
            this.isEmotion = val
        },
        handleEmotion (item) {
            // 选择表情
            this.sendContent += `[${item.content}]`
        },
        sendMegessBtn () {
            //提交的执行函数
            if (this.sendContent !== "") {
                let obg = {
                    Msg: this.sendContent,
                    Token: this.userInfo.token,
                    RoomId: this.beforePerson.RoomId,
                    MsgType: 0
                }
                sendWSPush(obg)
                this.sendContent =""
            }
        },
        // 发送文字
        sendMegess(){
            if(event.keyCode == 13 && event.ctrlKey){
                this.sendContent += "\n"; //换行
            }else if(event.keyCode == 13){
                //提交的执行函数
                this.sendMegessBtn()
                event.preventDefault();//禁止回车的默认换行
                return false
            }
        },
        // 跳转部落
        viewBl() {
            let routeData = this.$router.resolve({ name: 'HeAndITribal-id', query: {id: this.panRow.ToUserId} });
            analogJump(routeData.href);
        },
        //
        async ShieldAndDdel (type) {
            let msg = await setShip(this.panRow.RoomId, type)
            if (type === 1) {
                this.panRow.OppositeStatus = msg
                this.$Message.success(`${msg === 2 ? "屏蔽对方成功！" : "解除屏蔽"}`)
            }
            if (type === 2) {
                    let RoomIdIdex = null
                    let panIndex = null
                    let userList = this.contactsList.length;
                    if (userList > 1) {
                        for (let i= 0; i < userList; i++) {
                            if (this.contactsList[i].RoomId === this.panRow.RoomId) {
                                panIndex = i
                            }
                            if (this.contactsList[i].RoomId === this.beforePerson.RoomId) {
                                RoomIdIdex = i
                            }
                        }
                        if (panIndex === RoomIdIdex) {
                            if (RoomIdIdex + 1 >= userList) {
                                this.beforePerson = this.contactsList[RoomIdIdex - 1]
                            } else {
                                this.beforePerson = this.contactsList[RoomIdIdex + 1]
                            }
                        } else {
                        this.beforePerson = this.contactsList[RoomIdIdex]
                        }
                        this.getHistory(this.beforePerson.RoomId)
                        this.isPannel = false
                        this.contactsList.splice(panIndex, 1)
                    } else {
                        this.contactsList = []
                        this.panRow = {}
                        this.beforePerson = {}
                        this.newList = []
                    }
            }
            this.isPannel = false
        },
        // 删除一条消息
        async delDia (type = 3) {
            let msg = await setShip(this.panRow.MsgId, type)
            try {
                this.newList.forEach(ele => {
                    if (ele.id  === this.panRow.RoomId) {
                        ele.list.forEach((e, i) => {
                            if (e.MsgObj.MsgId === this.panRow.MsgId) {
                                ele.list.splice(i, 1)
                            }
                            
                        })
                    }
                })
                this.isPannel = false
            } catch (error) {}
        },
        // 初始化链接
        initSocket (token) {
            let that =this;
            this.Socket = new createSocket(token)
            this.Socket.onmessageWS = function (e) {
                let isFlag = false;
                let newFlag = false
                try {
                    let arr = JSON.parse(e.data)
                    that.setStatus(arr.MsgObj.OppositeStatus)
                   
                    let r = []
                    that.newList.forEach((ele, index) => {
                        if (ele.id === arr.MsgObj.RoomId) {
                            newFlag = true
                            ele.list.push(arr)
                        }
                    })
                    if (!newFlag) {
                        let obg = {
                            id: arr.MsgObj.RoomId,
                            list: [arr]
                        }
                        that.newList.push(obg)
                    }
                    if (arr.MsgObj.IsSelf) {
                        // 联系人置前
                        that.contactsList.forEach((ele, index) => {
                            if (ele.RoomId === arr.MsgObj.RoomId) {
                                if (arr.BaseMsgType === 2) {
                                    ele.HeadIcon = ele.HeadIcon +"?a="+Date.parse(new  Date());
                                }
                                isFlag = true
                                r = that.contactsList.splice(index, 1)[0];
                                that.$set(r, "Msg", arr.MsgObj.Msg)
                                that.$set(r, "MsgType", arr.MsgObj.MsgType)
                                that.beforePerson = r
                            }
                        })
                        if (that.contactsList.length > 0) {
                            that.contactsList.unshift(r)
                        } else {
                            that.contactsList.push(r)
                        }
                    } else {
                        // 联系人置前
                        that.contactsList.forEach((ele, index) => {
                            if (ele.RoomId === arr.MsgObj.RoomId) {
                                isFlag = true
                                that.$set(ele, "Msg", arr.MsgObj.Msg)
                                that.$set(ele, "MsgType", arr.MsgObj.MsgType)
                                if (that.beforePerson.RoomId !== arr.MsgObj.RoomId) {
                                    that.$set(ele, "UnreadMsg", ele.UnreadMsg + 1 || 1)
                                }
                            }
                        })
                    }
                    // 页面通知
                    if (!that.PageAction && !arr.MsgObj.IsSelf) {
                        console.log("通知消息")
                        Notifiy(arr)
                    }
                    // 添加联系人
                    if (!isFlag) {
                        that.getUserRm(arr.MsgObj.RoomId);
                        return false
                    }
                } catch (error) {}
                that.$nextTick(function(){
                    let divscll = document.getElementById('chatBox');
                    divscll.scrollTop = divscll.scrollHeight;
                });
            }
        },
        // 获取单个用户
        getUserRm (id) {
            let that = this
            getRoom(id).then(res => {
                if (res) {
                     if (that.contactsList.length > 0) {
                        that.contactsList.unshift(res)
                    } else {
                        that.contactsList.push(res)
                    }
                    that.beforePerson = res
                }
            })
        },
        // 发送图片
        loadSendImg () {
            let that = this;
            let file = event.target.files;
            if (file) {
                let data = new FormData();
                for (let item of file) {
                    data.append('files', item)
                }
                uploadFile(data, 12).then(res => {
                    let obg = {
                        Msg: res.fileUrl,
                        Token: that.userInfo.token,
                        RoomId: that.beforePerson.RoomId,
                        MsgType: 1
                    }
                    sendWSPush(obg)
                }).catch(err => {
                    console.log(err, 'uploadErr')
                })
            }
        },
        // 发送图片
        loadSendFile () {
            let that = this;
            let file = event.target.files;
            if (file) {
                let data = new FormData();
                for (let item of file) {
                    data.append('files', item)
                }
                uploadFile(data, 13).then(res => {
                    let obg = {
                        Msg: `${res.fileUrl}|${res.fileName}`,
                        Token: that.userInfo.token,
                        RoomId: that.beforePerson.RoomId,
                        MsgType: 2
                    }
                    sendWSPush(obg)
                }).catch(err => {
                    console.log(err, 'uploadErr')
                })
            }
        },
        // 下载文件
        downFile (row) {
            try {
                var eleLink = document.createElement('a');
                eleLink.download = '';
                eleLink.style.display = 'none';
                eleLink.href = row;
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);
                event.preventDefault()
            } catch (error) {
                console.log('下载出错');
            }
        },
        // 获取聊天人列表
        async getUserList () {
            let m = await getChatUserList(this.seaUser);
            if (m && m.length > 0) {
                this.contactsList = m
                this.beforePerson = m[0]
                this.getHistory(this.beforePerson.RoomId)
            }
        },
        // 设置聊天人关系
        async setUserShip () {
            let msg = await setShip(this.beforePerson.RoomId, 1)
            this.setStatus(msg)
            this.$Message.success(`${msg === 2 ? "屏蔽对方成功！" : "解除屏蔽"}`)
        },
        setStatus (row) {
            this.beforePerson.OppositeStatus = row
            this.contactsList.forEach(element => {
                if (element.RoomId === this.beforePerson.RoomId) {
                    element.OppositeStatus = row
                }
            });
        },
        // 获取聊天历史
        async getHistory (id) {
           let ms = await getChatHistory(id)
           if (ms) {
               let isFlag =  false
               this.newList.forEach(ele => {
                   if (ele.id  === this.beforePerson.RoomId) {
                       isFlag = true
                       ele.list = ms
                   }
               })
               if (!isFlag) {
                   let obg = {
                        id: this.beforePerson.RoomId,
                        list: ms
                   }
                   this.newList.push(obg)
               }
           }
           this.$nextTick(function(){
                let divscll = document.getElementById('chatBox');
                divscll.scrollTop = divscll.scrollHeight;
            });
        },
        // 放大图片
        initView() {
            const ViewerDom = document.getElementById('newTypeImg');
            let _this = this;
            _this.$nextTick(() => {
                let viewers = new Viewer(ViewerDom, {
                    url: 'data-original',
                    tooltip:false,
                    zIndex: 3018,
                })
            })
        },
        // 选择聊天用户
        searUser (row) { 
            // 留着优化用
            this.$set(row, "UnreadMsg", 0)
            this.beforePerson = row
            this.getHistory(row.RoomId)
        },
        // 打开面板
        openMent (row, type) {
            event.preventDefault();
            document.oncontextmenu= function () {return false;}
            row.mentType = type
            if (event.which === 3) {
                this.isPannel = true
                this.panRow = row
                this.Client =  {x: event.clientX, y: event.clientY}
            }
        },
        // 
        setNew (row) {
            switch (row.MsgType) {
                case 0:
                    return row.Msg
                    break;
                case 1:
                    return "【图片】"
                    break;
                case 2:
                    return "【文件】"
                    break;
                default:
                   return row.Msg
            }
        },
        setUsetShip (row) {
            switch (row.OppositeStatus) {
                case 1:
                    return "该对话来自于未关注人"
                    break;
                case 2:
                    return "该用户已屏蔽，回复后即可解锁，或点击此处"
                    break;
                default:
                   return ""
            }
        },
        changeEvent () {
            let that = this;
            var hiddenProperty = 'hidden' in document ? 'hidden' :    
            'webkitHidden' in document ? 'webkitHidden' :    
            'mozHidden' in document ? 'mozHidden' : null;
            var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
            var onVisibilityChange = function(){
                if (!document[hiddenProperty]) { 
                    console.log('页面激活');
                    that.PageAction = true
                    return true   
                }else{
                    that.PageAction = false
                    console.log('页面未激活')
                    return false
                }
            }
            document.addEventListener(visibilityChangeEvent, onVisibilityChange);
        }
    }
}
</script>
<style lang="less" scoped>
    .sysMsg {
        text-align: center;
    }
    .panl-emotion {
        bottom: ~"calc(100vh - (100vh - 275px))";
        position: absolute;
        width: 870px;
    }
    .chat-edit {
        text-align: right;
        color: #a5a5a5;
    }
    .down-file {
        span {
            &:last-child {
                cursor: pointer;
                color: #ff3c00;
            }
        }
    }
    .yan {
        position: absolute;
        top: 0px;
        right: -20px;
        display: none;
    }
    .send-status-lf {
        position: absolute;
        right: -20px;
        bottom: 0;
        color: red;
    }
    .send-status-rf {
        position: absolute;
        left: -20px;
        bottom: 0;
        color: red;
    }
    .ship-tips {
        text-align: center;
        font-weight: bold;
        span {
            padding: 5px 40px;
            border-radius: 10px;
            background: #b5b5b5dd;
        }
    }
    .user-ship {
        position: sticky;
        top: 0;
        background: #ddd;
        text-align: center;
        z-index: 100;
        line-height: 35px;
        &:hover {
            span >i {
                display: inline-block;
            }
        }
        span {
            cursor: pointer;
            display: inline-block;
            position: relative;
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
            overflow: hidden;
            border-bottom: 1px solid #2c2e31;
            &:hover {
                background: #3a3c42;
            }
            &-lf {
                display: flex;
                overflow: hidden;
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
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    width: 0px;
                    &-name {
                        color: #fff;
                        margin-top: 15px;
                        display: flex;
                        justify-content: space-between;
                        span {
                            &:first-child {
                                max-width: 140px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            &:last-child {
                                font-size: 12px;
                                color: #999999;
                            }
                        }
                    }
                    &-sub {
                        color: #999;
                        line-height: 30px;
                        display: flex;
                        justify-content: space-between;
                        span {
                            &:first-child {
                                max-width: 192px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
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
            justify-content: space-between;
            &-lf {
                display: flex;
                img {
                    border-radius: 50%;
                    margin-right: 20px;
                }
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
        padding: 10px 0 0 0;
        position: relative;
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
                &::after, &::before {
                    content: "";
                    display: block;
                    height: 0;
                    clear:both;
                    visibility: hidden;
                }
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
                    height: 50px;
                    font-size: 16px;
                    padding: 0 20px;
                    border-bottom: 1px solid #e2dddd;
                    display: flex;
                    justify-content: space-between;
                }
                &-chat {
                    height: ~"calc(100vh - 220px)";
                    background: #fff;
                    overflow-x: hidden;
                    overflow-y: auto;
                }
                &-edit {
                    bottom: 0;
                    position: absolute;
                    width: 870px;
                    height: 170px;
                    background: #ddd;
                    &-tit {
                        line-height: 20px;
                        height: 20px;
                        margin-top: 10px;
                        padding: 0 10px;
                        span {
                            margin-left: 10px;
                            cursor: pointer;
                            i {
                                &:hover {
                                    color: #ff3c00;
                                }
                            }
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
                        height: 100px;
                        resize: none;
                        overflow-x: hidden;
                        text-align: justify;
                        overflow-y: auto;
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
    .shuzi {
        color: #ff3c00;
    }
    .icon-size {
        font-size: 25px;
        cursor: pointer;
        &:hover {
            color: #ff3c00;
        }
    }
</style>