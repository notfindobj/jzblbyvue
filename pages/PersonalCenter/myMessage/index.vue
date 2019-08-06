<template>
    <div class="message">
        <!-- 头像 -->
        <div class="message-items">
           <div class="message-items-left">
               <span class="message-items-left-label left-label">头像</span>
           </div>
           <div class="message-items-right">
               <div class="message-items-right-header">
                   <img :src="Identity.HeadIcon" alt="" width="100px;">
               </div>
               <div v-if="!modifying" class="modifying-head" @click="$refs.uploadType.click()">修改头像</div>
               <input type="file" style="display:none;" ref="uploadType" @change="upHeaderImg"> 
           </div>
           <div class="message-items-operation operation-label" @click="modifying = !modifying">{{modifying ?"编辑" : "收起"}}</div>
        </div>
        <!-- 昵称 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">昵称</span>
            </div>
            <div class="message-items-right">
                <span v-if="nickname">{{userInfo.Nickname}}</span>
                <div v-if="!nickname" class="message-items-right-edit">
                    <div>
                        <span>昵称：</span>
                        <Input type="text" size="small" v-model="GetUserData.Nickname" style="width: 160px;" />
                        <!-- <span class="message-items-right-edit-lable">用户您好，建筑部落允许用户一年修改一次昵称，请谨慎提交</span> -->
                    </div>
                    <div class="message-items-right-save">
                        <div class="modifying-head" @click="setNickName">保存</div>
                        <div class="modifying-cancel">取消</div>
                    </div>
                </div>
            </div>
            <div class="message-items-operation" @click="nickname = !nickname">{{nickname ?"编辑" : "收起"}}</div>
        </div>
        <!-- 个人资料 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">个人资料</span>
            </div>
            <div class="message-items-right">
                <!-- <span v-if="means">未完善完全</span> -->
                <div  class="message-items-right-edit">
                    <div class="means">
                        <div class="means-left">
                                <span class="means-left-label">真实姓名：</span>
                                <span v-if="means">{{userInfo.RealName}}</span>
                                <Input v-else type="text" style="width: 160px;" v-model="GetUserData.RealName" size="small" />
                        </div>
                        <div class="means-right">
                                <span class="means-left-label">所在地：</span>
                                <span v-if="means">{{userInfo.CityName}}/{{userInfo.CountyName}}/{{userInfo.ProvinceName}}</span>
                                <span v-else>
                                    <Select size="small" v-model="GetUserData.CityArea" style="width:95px" @on-change="onChange">
                                    <Option v-for="(items, index) in city" :key="index" :value="items.ProvinceCode+'|'+items.ProvinceName" >{{items.ProvinceName}}</Option>
                                    </Select>
                                    <Select size="small" v-model="GetUserData.CountyArea" @on-change="onTwoChange" style="width:95px">
                                        <Option v-for="(items, index) in count" :key="index" :value="items.ProvinceCode+'|'+items.ProvinceName" >{{items.ProvinceName}}</Option>
                                    </Select>
                                    <Select size="small" v-model="GetUserData.ProvinceArea"  style="width:95px">
                                        <Option v-for="(items, index) in province" :key="index" :value="items.ProvinceCode+'|'+items.ProvinceName" >{{items.ProvinceName}}</Option>
                                    </Select>
                                </span>
                        </div>
                    </div>
                    <div class="means">
                        <div class="means-left">
                            <span class="means-left-label">性别：</span>
                            <span v-if="means">{{userInfo.Gender === 1 ? '男' : '女'}}</span>
                            <Select v-else size="small" v-model="GetUserData.Gender" style="width:160px">
                                <Option :value="1" >男</Option>
                                <Option :value="0" >女</Option>
                            </Select>
                        </div>
                        <div class="means-right">
                            <span class="means-left-label">感情状况：</span>
                            <span v-if="means">{{userInfo.EmotionalState}}</span>
                            <Select v-else size="small" v-model="GetUserData.Emotional" style="width:160px">
                                <Option v-for="(items, index) in Privacy" :key="index" :value="items.Id+'|'+items.Name">{{items.Name}}</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">生日：</span>
                            <span v-if="means">{{userInfo.Birthday}}</span>
                            <DatePicker v-else style="width:160px" v-model="GetUserData.Birthday" format="yyyy/MM/dd" type="date" placeholder="Select date"></DatePicker>
                        </div>
                    </div>
                    <div class="means">
                        <div class="means-textarea">
                            <span class="means-left-label">个人简介：</span>
                            <span v-if="means">{{userInfo.Description}}</span>
                            <Input v-else type="textarea" :rows="4" v-model="GetUserData.Description" placeholder="Enter something..." />
                        </div>
                    </div>
                    <div v-if="!means" class="message-items-right-save">
                        <div class="modifying-head" @click="userInfoDatas">保存</div>
                        <div class="modifying-cancel" @click="means = !means">取消</div>
                    </div>
                </div>
            </div>
            <div class="message-items-operation" @click="meansClick">{{means ?"编辑" : "收起"}}</div>
        </div>
        <!-- 教育信息 -->
        <!-- <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">教育信息</span>
            </div>
            <div class="message-items-right">
                <div v-if="educational">
                     <span class="message-items-right-fill">马上填写</span>
                    <span>你的教育信息，让他人更好的了解你，与更多的同学在建筑部落相遇！</span>
                </div>
                <div v-if="!educational" class="message-items-right-edit">
                    <div class="means">
                        <div class="means-left">
                            <span class="means-left-label">学校类型：</span>
                            <Select size="small" style="width:160px">
                                <Option value="New York" >New York</Option>
                            </Select>
                        </div>
                        <div class="means-right content-right">
                            <div class="means-right-option">
                                <Select size="small" style="width:160px">
                                    <Option value="New York" >New York</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">学校名称：</span>
                            <Select size="small" style="width:340px">
                                <Option value="New York" >New York</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="means">
                        <div class="means-left">
                            <span class="means-left-label">入学时间：</span>
                            <DatePicker type="date" placeholder="Select date" style="width: 160px"></DatePicker>
                        </div>
                    </div>
                    <div class="means">
                        <div class="means-left">
                            <span class="means-left-label">院系：</span>
                            <Select size="small" style="width:160px">
                                <Option value="New York" >New York</Option>
                            </Select>
                        </div>
                    </div>
                     <div class="message-items-right-save">
                        <div class="modifying-head">保存</div>
                        <div class="modifying-cancel">取消</div>
                    </div>
                </div>
            </div>
            <div class="message-items-operation" @click="educational = !educational">{{educational ?"编辑" : "收起"}}</div>
        </div> -->
        <!-- 个人擅长 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">个人擅长</span>
            </div>
            <div class="message-items-right">
                <span class="message-items-right-fill">马上填写</span>
                <span>自己的标签，让大家全方位了解你！</span>
            </div>
            <div class="message-items-operation">编辑</div>
        </div>
        <!-- 职业信息 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">职业信息</span>
            </div>
            <div class="message-items-right">
                <div v-if="!JurisdiInfo.CompanyName">
                    <span class="message-items-right-fill">马上填写</span>
                    <span>你的职业信息，让他人更好的了解你，与更多的同事在建筑部落相遇！</span>
                </div>
                <div  class="message-items-right-edit">
                    <div class="means">
                        <div>
                            <span class="means-left-label">单位名称：</span>
                            <span v-if="career">{{JurisdiInfo.CompanyName}}</span>
                            <Input v-else type="text" v-model="ModelJurisdiInfo.CompanyName" style="width: 340px;" size="small" />
                        </div>
                        <div class="means-right content-right">
                            <div class="means-right-option">
                                <span v-if="career">{{JurisdiInfo.PrivacyName}}</span>
                                <Select v-else v-model="ModelJurisdiInfo.Privacy" size="small" style="width:160px">
                                    <Option v-for="(items, index) in Jurisdi" :key="index" :value="items.Id+'|'+items.Name">{{items.Name}}</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">部门/职业：</span>
                            <span v-if="career">{{JurisdiInfo.DepaOrPosi}}</span>
                            <Input  v-else type="text" v-model="ModelJurisdiInfo.DepaOrPosi" style="width: 340px;" size="small" />
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">工作时间：</span>
                            <span v-if="career">{{JurisdiInfo.OperatHoursStart}}-{{JurisdiInfo.OperatHoursEnd}}</span>
                            <DatePicker v-else type="daterange" format="yyyy/MM/dd" v-model="ModelJurisdiInfo.OperatHours" placeholder="Select date" style="width: 340px"></DatePicker>
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">所在地：</span>
                            <span v-if="career">{{JurisdiInfo.CityName}}/{{JurisdiInfo.CountName}}/{{JurisdiInfo.ProvinceName}}</span>
                            <span v-else>
                                <Select size="small" v-model="ModelJurisdiInfo.CityArea" style="width:110px" @on-change="onChange">
                                    <Option v-for="(items, index) in city" :key="index" :value="items.ProvinceCode+'|'+items.ProvinceName" >{{items.ProvinceName}}</Option>
                                </Select>
                                <Select size="small" v-model="ModelJurisdiInfo.CountyArea" @on-change="onTwoChange" style="width:110px">
                                    <Option v-for="(items, index) in count" :key="index" :value="items.ProvinceCode+'|'+items.ProvinceName" >{{items.ProvinceName}}</Option>
                                </Select>
                                <Select size="small" v-model="ModelJurisdiInfo.ProvinceArea"  style="width:110px">
                                    <Option v-for="(items, index) in province" :key="index" :value="items.ProvinceCode+'|'+items.ProvinceName" >{{items.ProvinceName}}</Option>
                                </Select>
                            </span>
                        </div>
                    </div>
                     <div v-if="!career" class="message-items-right-save">
                        <div class="modifying-head" @click="setJob(JurisdiInfo.Id)">保存</div>
                        <div class="modifying-cancel" @click="career = !career">取消</div>
                    </div>
                </div>
            </div>
            <div class="message-items-operation" @click="clickCareer">{{career ?"编辑" : "收起"}}</div>
        </div>
    </div>
</template>
<script>
import {uploadFile, getUserData, GetOperatPrivacy, getProvinceList, setUserData, SetUserNickNameData, GetUserExpertise, GetThisUserJobInfo, SetOrAddThisUserJobInfo} from '../../../service/clientAPI'
import {setHearImg} from '../../../LocalAPI'
import { mapState, mapGetters } from 'vuex'
export default {
    data () {
        return {
            modifying: true,
            nickname: true,
            means: true,
            educational: true,
            career: true,
            Privacy: [],
            city: [],
            count: [],
            province: [],
            GetUserData: {
                RealName: "",
                Gender: '0',
                Birthday: "",
                Description: "",
                Emotional: "",
                ProvinceArea: "",
                CityArea: "",
                CountyArea: "",
                Nickname: ''
            },
            userInfo: {},
            expertiseList: [],
            UserJob: {},
            Jurisdi: [],
            ModelJurisdiInfo: {
                CompanyName: '',
                CompanyId: '',
                DepaOrPosi: '',
                OperatHours: [],
                Privacy: "",
                ProvinceArea: "",
                CityArea: "",
                CountyArea: "",
            },
            JurisdiInfo: {} 
        }
    },
    computed: {
        ...mapState({
            Identity: state => state.overas.auth
        }),
    },
    created () {
        this.getUserInfo();
        this.getUserExpertiseList();
        this.getThisUserJobInfoList();
    },
    methods: {
        // 上传头像
        async upHeaderImg (event) {
            let file = event.target.files;
            if (file.length > 0) {
                let data = new FormData();
                for (let item of file) {
                    data.append('files', item)
                }
                let msg = await uploadFile(data, 8);
                if (msg) {
                    let user = {
                        headIcon: msg.smallImgUrl
                    }
                    let info = await setHearImg(user);
                    this.$store.dispatch('LOGININ', info);
                    localStorage.setItem('LOGININ', JSON.stringify(info))
                }
            }
        },
        // 个人资料 
        async getUserInfo () {
            let msg =await getUserData();
            if (msg) {
                this.userInfo = msg;
                this.GetUserData = {
                    Nickname: msg.Nickname,
                    RealName: msg.RealName,
                    Gender: msg.Gender,
                    Birthday: msg.Birthday,
                    Description: msg.Description,
                    Emotional: msg.EmotionalStateId+'|'+msg.EmotionalState,
                    ProvinceArea: msg.ProvinceAreaId+'|'+ msg.ProvinceName,
                    CityArea: msg.CityAreaId+'|'+msg.CityName,
                    CountyArea: msg.CountyAreaId+'|'+msg.CountyName,
                }
            }
        },
        async getCityList (id = '', index) {
            let queryData = {
                ProvinceCode: id
            }
            let msg = await getProvinceList(queryData);
            if (msg) {
                if (id) {
                    this.count = msg.respProvince;
                } else {
                    if (index === 1) {
                        this.province = msg.respProvince;
                    } else {
                        this.city = msg.respProvince;
                    }
                }
            }
        },
        async userInfoDatas () {
            let queryData = {}
            try {
                queryData = {
                    RealName: this.GetUserData.RealName,
                    Gender: this.GetUserData.Gender,
                    Birthday: this.GetUserData.Birthday,
                    Description: this.GetUserData.Description,
                    EmotionalStateId: this.GetUserData.Emotional.split('|')[0],
                    EmotionalState: this.GetUserData.Emotional.split('|')[1],
                    ProvinceAreaId: this.GetUserData.ProvinceArea.split('|')[0],
                    ProvinceName: this.GetUserData.ProvinceArea.split('|')[1],
                    CityAreaId: this.GetUserData.CityArea.split('|')[0],
                    CityName: this.GetUserData.CityArea.split('|')[1],
                    CountyAreaId: this.GetUserData.CountyArea.split('|')[0],
                    CountyName: this.GetUserData.CountyArea.split('|')[1],
                }
            } catch (error) {
                
            }
            let msg = await setUserData(queryData);
            if (msg) {
                this.$Message.success('添加成功');
                this.getUserInfo();
            }
        },
        onChange (value) {
            let val = value.split('|')[0];
            this.getCityList(val)
        },
        async onTwoChange (value) {
            if (value) {
                let val = value.split('|')[0];
                let queryData = {
                    ProvinceCode: val
                }
                let msg = await getProvinceList(queryData);
                if (msg) {
                    this.province = msg.respProvince;
                }
            }
        },
        // 感情状况：
        async getOperaList () {
            let msg = await GetOperatPrivacy(2)
            if (msg) {
                this.Privacy = msg.respOperatPrivacy;
            }
        },
        meansClick () {
            this.means = !this.means;
            this.getOperaList();
            this.getCityList();
            if (this.userInfo.CountyAreaId) {
                this.getCityList(this.userInfo.CityAreaId)
            }
            if (this.userInfo.ProvinceAreaId) {
                this.onTwoChange(this.userInfo.CountyAreaId+'|'+this.userInfo.CountyName)
            }
        },
        clickCareer () {
            this.career = !this.career;
            this.getJurisdiList();
            this.getCityList()
            if (this.JurisdiInfo.CountyAreaId) {
                this.getCityList(this.JurisdiInfo.CityAreaId);
            }
            if (this.JurisdiInfo.ProvinceAreaId) {
                this.onTwoChange(this.JurisdiInfo.CountyAreaId+'|'+this.JurisdiInfo.CountyName);
            }
        },
        // 个人资料  END
        async setNickName () {
            let msg = SetUserNickNameData(this.GetUserData.Nickname);
            if (msg) {
                this.$Message.success('昵称修改成功');
                let user = {
                    name: this.GetUserData.Nickname
                }
                let info = await setHearImg(user);
                this.$store.dispatch('LOGININ', info);
                localStorage.setItem('LOGININ', JSON.stringify(info))
                this.nickname = !this.nickname
                this.getUserInfo();
            }
        },
        // 个人擅长 GetUserExpertise
        async getUserExpertiseList () {
            let msg = await GetUserExpertise();
            if (msg) {
                // console.log(msg)
            }
        },
        // 获取当前用户所有职业信息接口 GetThisUserJobInfo
        async getThisUserJobInfoList () {
            let msg = await GetThisUserJobInfo();
            if (msg) {
                let val = msg.jobInfos[0]
                this.JurisdiInfo = val
                this.ModelJurisdiInfo = {
                    CompanyName: val.CompanyName,
                    CompanyId: val.CompanyName,
                    DepaOrPosi: val.DepaOrPosi,
                    OperatHours: [val.OperatHoursStart, val.OperatHoursEnd],
                    Privacy: val.PrivacyId+'|'+val.PrivacyName,
                    ProvinceArea: val.ProvinceAreaId+'|'+ val.ProvinceName,
                    CityArea: val.CityAreaId+'|'+val.CityName,
                    CountyArea: val.CountyAreaId+'|'+val.CountName,
                }
            }
        },
        async setJob (id) {
            let queryData = {}
            try {
                queryData = {
                    CompanyName: this.ModelJurisdiInfo.CompanyName,
                    CompanyId: "",
                    DepaOrPosi: this.ModelJurisdiInfo.DepaOrPosi,
                    OperatHoursStart: this.ModelJurisdiInfo.OperatHours[0],
                    OperatHoursEnd:  this.ModelJurisdiInfo.OperatHours[1],
                    PrivacyId: this.ModelJurisdiInfo.Privacy.split('|')[0],
                    PrivacyName: this.ModelJurisdiInfo.Privacy.split('|')[1],
                    ProvinceAreaId: this.ModelJurisdiInfo.ProvinceArea.split('|')[0],
                    ProvinceName: this.ModelJurisdiInfo.ProvinceArea.split('|')[1],
                    CityAreaId: this.ModelJurisdiInfo.CityArea.split('|')[0],
                    CityName: this.ModelJurisdiInfo.CityArea.split('|')[1],
                    CountyAreaId: this.ModelJurisdiInfo.CountyArea.split('|')[0],
                    CountName: this.ModelJurisdiInfo.CountyArea.split('|')[1],
                    Id: id
                }
            } catch (error) {}
            let msg = await SetOrAddThisUserJobInfo(queryData)
            if (msg) {
                this.$Message.success('修改成功');
                this.career = !this.career;
                this.getThisUserJobInfoList();
            }
        },
        // 操作权限
        async getJurisdiList () {
            let msg = await GetOperatPrivacy(1)
            if (msg) {
                this.Jurisdi = msg.respOperatPrivacy;
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .message {
        &-items {
            padding-bottom: 30px;
            border-bottom: 1px solid #EEEEEE;
            display: flex;
            justify-content: space-between;
            // align-items: center;
            font-size: 16px;
            &-left {
                width: 110px;
                text-align: left;
                display:table;
                &-label{
                    vertical-align:middle; 
                    color: #000000;
                }
            }
            &-right {
                width: 100%;
                &-header {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: #999999;
                    overflow: hidden;
                    img {
                        height: 100%;
                    }
                }
                &-fill {
                    color: #FF3C00;
                    cursor: pointer;
                }
                &-edit {
                    margin-top: 30px;
                    &-lable {
                        margin-left: 15px;
                        font-size: 14px;
                        color: #999999;
                    }
                }
                &-save {
                    margin-top: 30px;
                }
            }
            &-operation{
                width: 40px;
                text-align: right;
                cursor: pointer;
            }
            &-text {
                padding-top: 30px;
            }
        }
    }
    .means {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        &-left {
            width: 320px;
            &-label {
                width: 85px;
                display: inline-block;
            }
        }
        &-right {
            flex: 1;
            &-option {
                text-align: left;
                display: inline-block;
            }
        }
        &-textarea {
            width: 98%;
        }
    }
    .left-label {
        position: absolute;
        margin-top: 40px;
    }
    .operation-label {
        position: relative;
        margin-top: 40px;
    }
    .modifying-head {
        font-size: 16px;
        color: #FFFFFF;
        padding: 4px 18px;
        background: #FF3C00;
        display: inline-block;
        border-radius: 3px;
        cursor: pointer;
        margin-top: 10px;
    }
    .modifying-cancel {
        font-size: 16px;
        color: #666666;
        padding: 4px 18px;
        margin-left: 50px;
        border: 1px solid #DDDDDD;
        display: inline-block;
        border-radius: 3px;
        cursor: pointer;
        margin-top: 10px;
    }
    .content-right {
        text-align: right;
        padding-right: 20px;
    }
    .ivu-cascader {
        display: inline-block;
    }
</style>
