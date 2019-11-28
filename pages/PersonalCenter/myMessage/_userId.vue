<template>
    <div class="message">
        <!-- 头像 -->
        <div class="message-items">
            <div class="message-items-left">
                <span class="message-items-left-label left-label">头像</span>
            </div>
            <div class="message-items-right">
                <div class="message-items-right-header"  @click="goToPersonal(GetUserData)">
                    <img v-if="isItMe" :src="Identity.HeadIcon " alt="" width="100px;">
                    <img v-else :src="GetUserData.HeadIconSrc " alt="" width="100px;">
                </div>
                <div v-if="!modifying" class="modifying-head" @click="$refs.uploadType.click()">修改头像</div>
                <input type="file" style="display:none;" ref="uploadType" @change="upHeaderImg">
            </div>
            <div v-if="isItMe" class="message-items-operation operation-label" :style="`color:${modifying ? '#ff3c00' : ''}`" @click="modifying = !modifying">{{modifying ?"编辑" :
                "收起"}}
            </div>
        </div>
        <!-- 昵称 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">{{EntCode === 2 ? '昵称' : '公司简称'}}</span>
            </div>
            <div class="message-items-right">
                <span v-if="nickname">{{userInfo.Nickname}}</span>
                <div v-if="!nickname" class="message-items-right-edit">
                    <div>
                        <span>昵称：</span>
                        <Input type="text" size="small" v-model="GetUserData.Nickname" style="width: 160px;"/>
                        <!-- <span class="message-items-right-edit-lable">用户您好，建筑部落允许用户一年修改一次昵称，请谨慎提交</span> -->
                    </div>
                    <div class="message-items-right-save">
                        <div class="modifying-head" @click="setNickName">保存</div>
                        <div class="modifying-cancel" @click="nickname = !nickname">取消</div>
                    </div>
                </div>
            </div>
            <div v-if="isItMe" class="message-items-operation" :style="`color:${nickname ? '#ff3c00' : ''}`"  @click="nickname = !nickname">{{nickname ?"编辑" : "收起"}}</div>
        </div>
        <!-- 个人资料 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">{{EntCode === 2 ? '个人资料' : '公司资料'}}</span>
            </div>
            <div class="message-items-right">
                <!-- <span v-if="means">未完善完全</span> -->
                <div class="message-items-right-edit">
                    <div class="means">
                        <div class="means-left">
                            <span class="means-left-label">{{EntCode === 2 ? '真实姓名：' : '公司全称：'}}</span>
                            <span v-if="means">{{userInfo.RealName}}</span>
                            <Input v-else type="text" style="width: 160px;" v-model="GetUserData.RealName" :disabled="EntCode === 2 ? false : true" size="small"/>
                        </div>
                        <div class="means-right">
                            <span class="means-left-label">所在地：</span>
                            <span v-if="means">{{userInfo.ProvinceName}}/{{userInfo.CityName}}/{{userInfo.CountyName}}</span>
                            <span v-else>
                                <Cascader key="CompanyArr" style="width: 160px;" size="small" v-model="CompanyArr" :data="cascaderList" :load-data="loadData"></Cascader>
                            </span>
                        </div>
                    </div>
                    <div class="means" v-if="EntCode === 2">
                        <div class="means-left">
                            <span class="means-left-label">性别：</span>
                            <span v-if="means">{{userInfo.Gender === 1 ? '男' : '女'}}</span>
                            <Select v-else size="small" v-model="GetUserData.Gender" style="width:160px">
                                <Option :value="1">男</Option>
                                <Option :value="0">女</Option>
                            </Select>
                        </div>
                        <div class="means-right">
                            <span class="means-left-label">感情状况：</span>
                            <span v-if="means">{{userInfo.EmotionalState}}</span>
                            <Select v-else size="small" v-model="GetUserData.Emotional" style="width:160px">
                                <Option v-for="(items, index) in Privacy" :key="index" :value="items.Id+'|'+items.Name">
                                    {{items.Name}}
                                </Option>
                            </Select>
                        </div>
                    </div>
                    <div class="means" v-if="EntCode === 2">
                        <div >
                            <span class="means-left-label">生日：</span>
                            <span v-if="means">{{userInfo.Birthday}}</span>
                            <DatePicker v-else style="width:160px" v-model="GetUserData.Birthday" format="yyyy/MM/dd" type="date" placeholder="Select date"></DatePicker>
                        </div>
                    </div>
                    <div class="means" v-if="EntCode !== 2">
                        <div >
                            <span class="means-left-label">公司邮箱：</span>
                            <span v-if="means">{{userInfo.Email}}</span>
                            <Input v-else type="text" style="width: 180px;" v-model="GetUserData.Email"
                                   size="small"/>
                        </div>
                    </div>
                    <div class="means" v-if="EntCode !== 2">
                        <div >
                            <span class="means-left-label">公司电话：</span>
                            <span v-if="means">{{userInfo.Telephone}}</span>
                            <Input v-else type="text" style="width: 180px;" v-model="GetUserData.Telephone"
                                   size="small"/>
                        </div>
                    </div>
                    <div class="means">
                        <div class="means-textarea">
                            <span class="means-left-label">{{EntCode === 2 ? '个人简介：' : '公司简介：'}}</span>
                            <span v-if="means">{{userInfo.Description}}</span>
                            <Input v-else type="textarea" :rows="4" v-model="GetUserData.Description" placeholder="Enter something..."/>
                        </div>
                    </div>
                    <div v-if="!means" class="message-items-right-save">
                        <div class="modifying-head" @click="userInfoDatas">保存</div>
                        <div class="modifying-cancel" @click="means = !means">取消</div>
                    </div>
                </div>
            </div>
            <div v-if="isItMe" class="message-items-operation" :style="`color:${means ? '#ff3c00' : ''}`" @click="meansClick">{{means ?"编辑" : "收起"}}</div>
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
        <!-- 职业类型  -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">{{EntCode === 2 ? '职业类型' : '公司类型'}}</span>
            </div>
            <div class="message-items-right">
                <span v-if="EntCode === 2">
                    <div v-if="careerTyep.length > 0">
                        <Tag type="dot" v-for="(items, index) in careerTyep" :closable="isItMe" color="success" class="userLabel-label"  :key="index" :name="items.delId" @on-close="delUserTyepLabel">{{items.label}}</Tag>
                    </div>
                    <span v-else>
                        <span class="message-items-right-fill">马上填写</span>
                        <span>自己的职业类型，让大家全方位了解你！</span>
                    </span>
                </span>
                <span v-if="EntCode !== 2">
                    <Tag v-if="careerTyep" type="dot" color="success" class="userLabel-label" >{{careerTyep}}</Tag>
                </span>
                <div class="message-items-right-edit" v-if="iscareer">
                    <Cascader key="careerData" :data="careerList" v-model="careerData" style="width:200px"></Cascader>
                </div>
                <div v-if="iscareer" class="message-items-right-save">
                    <div class="modifying-head" @click="setCareerTyepList()">保存</div>
                    <div class="modifying-cancel" @click="iscareer = !iscareer">取消</div>
                </div>
            </div>
            <div v-if="isItMe && EntCode === 2" class="message-items-operation" :style="`color:${!iscareer ? '#ff3c00' : ''}`" @click="iscareer = !iscareer">{{iscareer ? '收起' : '编辑'}}</div>
        </div>
        <!-- 个人擅长 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">{{EntCode === 2 ? '个人擅长' : '公司擅长'}}</span>
            </div>
            <div class="message-items-right">
                <span>
                    <Tag type="dot" v-if="userLabel.length > 0" v-for="(items, index) in userLabel" :closable="isItMe" color="success" class="userLabel-label"  :key="index" :name="items.LabelId" @on-close="delUserLabel">{{items.LabelName}}</Tag>
                    <span v-else>
                        <span class="message-items-right-fill">马上填写</span>
                        <span>自己的标签，让大家全方位了解你！</span>
                    </span>
                </span>
                <div class="message-items-right-edit" v-if="isLabel">
                    <Input style="width:230px" v-model="userLabelModel" search enter-button="添加" @on-search="addLabel" placeholder="请输入标签" />
                </div>
            </div>
            <div v-if="isItMe" class="message-items-operation" :style="`color:${!isLabel ? '#ff3c00' : ''}`" @click="isLabel = !isLabel">{{isLabel ? '收起' : '编辑'}}</div>
        </div>
        <!-- 工作经历 -->
        <div v-if="EntCode === 2"  class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">工作经历</span>
            </div>
            <div class="message-items-right">
                <div v-if="!JurisdiInfo.CompanyName">
                    <span class="message-items-right-fill">马上填写</span>
                    <span>你的工作经历，让他人更好的了解你，与更多的同事在建筑部落相遇！</span>
                </div>
                <div v-if="JurisdiInfo.CompanyName || !career" class="message-items-right-edit">
                    <div class="means">
                        <div>
                            <span class="means-left-label">单位名称：</span>
                            <span v-if="career">{{JurisdiInfo.CompanyName}}</span>
                            <Input v-else type="text" v-model="ModelJurisdiInfo.CompanyName" style="width: 340px;" size="small"/>
                        </div>
                        <div class="means-right content-right">
                            <div class="means-right-option">
                                <span v-if="career">{{JurisdiInfo.PrivacyName}}</span>
                                <Select v-else v-model="ModelJurisdiInfo.Privacy" size="small" style="width:160px">
                                    <Option v-for="(items, index) in Jurisdi" :key="index"
                                        :value="items.Id+'|'+items.Name">{{items.Name}}
                                    </Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">部门/职业：</span>
                            <span v-if="career">{{JurisdiInfo.DepaOrPosi}}</span>
                            <Input v-else type="text" v-model="ModelJurisdiInfo.DepaOrPosi" style="width: 340px;" size="small"/>
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">工作时间：</span>
                            <span v-if="career">{{JurisdiInfo.OperatHoursStart}}-{{JurisdiInfo.OperatHoursEnd}}</span>
                            <DatePicker v-else type="daterange" format="yyyy/MM/dd" v-model="ModelJurisdiInfo.OperatHours" placeholder="工作时间"
                                        style="width: 340px"></DatePicker>
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">所在地：</span>
                            <span v-if="career">{{JurisdiInfo.ProvinceName}}/{{JurisdiInfo.CityName}}/{{JurisdiInfo.CountyName}}</span>
                            <span v-else>
                                <Cascader key="23874987" style="width: 340px;"  size="small" v-model="jobCompanyArr" :data="cascaderList" :load-data="loadData"></Cascader>
                            </span>
                        </div>
                    </div>
                    <div v-if="!career" class="message-items-right-save">
                        <div class="modifying-head" @click="setJob(JurisdiInfo.Id)">保存</div>
                        <div class="modifying-cancel" @click="career = !career">取消</div>
                    </div>
                </div>
            </div>
            <div v-if="isItMe" class="message-items-operation" :style="`color:${career ? '#ff3c00' : ''}`" @click="clickCareer">{{career ?"编辑" : "收起"}}</div>
        </div>
    </div>
</template>
<script>
    import {
        uploadFile,
        getUserData,
        GetOperatPrivacy,
        getProvinceList,
        setUserData,
        SetUserNickNameData,
        GetUserExpertise,
        GetThisUserJobInfo,
        SetOrAddThisUserJobInfo,
        getQALabel,
        addUserLabel,
        saveUserExpertise,
        getCareerData,
        getCareerTyepInfo,
        setCareerTyepInfo,
        delareerTyepInfo,
        delUserExpertise
    } from '../../../service/clientAPI'
    import { setHearImg } from '../../../LocalAPI'
    import { analogJump } from '../../../plugins/untils/public'
    import { mapState, mapGetters} from 'vuex'
    export default {
        data() {
            return {
                isItMe: true,
                modifying: true,
                nickname: true,
                means: true,
                educational: true,
                career: true,
                isLabel: false,
                iscareer: false,
                Privacy: [],
                city: [],
                count: [],
                province: [],
                EntCode: 2, // 1 企业2 个人
                GetUserData: {
                    Email: "",
                    Telephone: "",
                    RealName: "",
                    Gender: '0',
                    Birthday: "",
                    Description: "",
                    Emotional: "",
                    ProvinceArea: "",
                    CityArea: "",
                    CountyArea: "",
                    Nickname: '',
                    HeadIconSrc:''
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
                JurisdiInfo: {},
                userLabel: [],
                userLabelModel: '',
                userId:'',
                careerList: [],
                careerTyep: "",
                careerData: [],
                cascaderList: [], // 城市信息
                CompanyArr: [],
                jobCompanyArr: []
            }
        },
        computed: {
            ...mapState({
                Identity: state => state.overas.auth || {}
            }),
            ...mapGetters(['isLogin'])
        },
        asyncData({params}) {
            return {
                queryId: params.userId
            }
        },
        created () {
            if (!this.isLogin) {
                this.isItMe = false;
            }
            this.getCareerDataList();
            this.getCareerTyepList();
        },
        mounted() {
            let query = {
                userId: this.queryId
            }
            this.userId = this.Identity.UserId
            if (this.$route.params.userId) {
                if (this.Identity.UserId === this.queryId) {
                    this.isItMe = true;
                } else {
                    this.isItMe = false;
                }
                query.userId = this.$route.params.userId
                this.userId = this.$route.params.userId
            }
            this.getUserInfo(query);
            this.getUserExpertiseList(query);
            this.getThisUserJobInfoList(query);
            this.getCascaderData()
        },
        methods: {
            // 获取联动信息
            async getCascaderData (id = '') {
                let queryData = {
                    ProvinceCode: id
                }
                let msg = await getProvinceList(queryData);
                msg.respProvince.forEach(ele => {
                    ele.loading = false;
                    ele.children = [];
                    ele.children = [];
                    ele.level = 1;
                    ele.value = ele.ProvinceCode+'|'+ele.ProvinceName
                    ele.label = ele.ProvinceName
                })
                if (msg) {
                    this.cascaderList = msg.respProvince;
                }
            },
            async loadData (item, callback) {
                item.loading = true;
                let queryData = {
                    ProvinceCode: item.value.split('|')[0]
                }
                let msg = await getProvinceList(queryData);
                if (msg.respProvince instanceof Array) {
                    msg.respProvince.forEach(ele => {
                        if (item.level < 2) {
                            ele.level = item.level + 1;
                            ele.loading = false;
                            ele.children = [];
                        }
                        ele.value = ele.ProvinceCode+'|'+ele.ProvinceName
                        ele.label = ele.ProvinceName
                    })
                } else {
                    return false
                }
                if (msg) {
                    item.children = msg.respProvince
                    item.loading = false;
                    callback();
                }
            },
            async getCareerTyepList () {
                let msg = await getCareerTyepInfo(this.queryId);
                if (msg) {
                    if (this.EntCode === 2) {
                        this.careerTyep = msg.DelCareers || [];
                    } else {
                        this.careerTyep = msg.EntTypeName;
                    }
                    
                }
            },
            async getCareerDataList () {
                let msg = await getCareerData();
                if (msg) {
                    this.careerList = msg.Careers;
                }
            },
            // 添加类型
            async setCareerTyepList () {
                if (this.careerTyep.length  > 2) {
                    this.$Message.warning('职业类型最多只能添加三个！')
                    return false
                }
                let ids = []
                this.careerTyep.forEach(ele => {
                    ids.push(ele.value)
                })
                ids.push(this.careerData[1])
                let types = Array.from(new Set(ids))
                if (ids.length  > types.length) {
                    this.$Message.warning('职业类型选择不能重复！')
                    return false
                }
                let msg =await setCareerTyepInfo(types.join(','))
                if (msg) {
                    this.careerData= []
                    this.getCareerTyepList()
                }
            },
            // 删除职业类型
            async delUserTyepLabel (e, name) {
                this.$Modal.confirm({
                    title: '删除标签',
                    content: '<p>请否确定职业类型标签!</p>',
                    onOk: async () => {
                        let msg = await delareerTyepInfo(name);
                        if (msg) { 
                            this.getCareerTyepList()
                        }
                    },
                    onCancel: () => {
                        return false
                    }
                });
            },
            // 删除标签
            async delUserLabel (e, name) {
                this.$Modal.confirm({
                    title: '删除标签',
                    content: '<p>请否确定删除标签!</p>',
                    onOk: async () => {
                        let msg = await delUserExpertise({LabelId: name});
                        if (msg) { 
                            let query = {
                                userId: this.Identity.UserId
                            }
                            this.getUserExpertiseList(query)
                        }
                    },
                    onCancel: () => {
                        return false
                    }
                });
            },
            goToPersonal (row) {
                let routeData = this.$router.resolve({ name: 'HeAndITribal-id', query: {id: this.userId} });
                analogJump(routeData.href);
            },
            // 上传头像
            async upHeaderImg(event) {
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
            async getUserInfo(value) {
                let msg = await getUserData(value);
                if (msg) {
                    this.EntCode = msg.EntCode;
                    this.userInfo = msg;
                    this.CompanyArr = [msg.ProvinceAreaId + '|' + msg.ProvinceName,msg.CityAreaId + '|' + msg.CityName, msg.CountyAreaId + '|' + msg.CountyName];
                    this.GetUserData = {
                        HeadIconSrc: msg.HeadIconSrc,
                        Nickname: msg.Nickname,
                        RealName: msg.RealName,
                        Gender: msg.Gender,
                        Telephone: msg.Telephone,
                        Email: msg.Email,
                        Birthday: msg.Birthday,
                        Description: msg.Description,
                        Emotional: msg.EmotionalStateId + '|' + msg.EmotionalState,
                    }
                    
                }
            },
            async getCityList(id = '', index) {
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
            async userInfoDatas() {
                let queryData = {}
                try {
                    queryData = {
                        Email: this.GetUserData.Email,
                        Telephone: this.GetUserData.Telephone,
                        RealName: this.GetUserData.RealName,
                        Gender: this.GetUserData.Gender,
                        Birthday: this.GetUserData.Birthday,
                        Description: this.GetUserData.Description,
                        EmotionalStateId: this.GetUserData.Emotional.split('|')[0],
                        EmotionalState: this.GetUserData.Emotional.split('|')[1],
                        ProvinceAreaId: this.CompanyArr[0].split('|')[0], //省份ID
                        ProvinceName: this.CompanyArr[0].split('|')[1], // 省份名称
                        CityAreaId: this.CompanyArr[1].split('|')[0], // 市ID
                        CityName: this.CompanyArr[1].split('|')[1], // 市名称
                        CountAreaId: this.CompanyArr[2].split('|')[0], // 区ID
                        CountyName: this.CompanyArr[2].split('|')[1], // // 区名称
                    }
                } catch (error) {

                }
                let msg = await setUserData(queryData);
                if (msg) {
                    this.$Message.success('添加成功');
                    let query = {
                        userId: this.queryId
                    }
                    this.getUserInfo(query);
                }
            },
            onChange(value) {
                let val = value.split('|')[0];
                this.getCityList(val)
            },
            async onTwoChange(value) {
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
            async getOperaList() {
                let msg = await GetOperatPrivacy(2)
                if (msg) {
                    this.Privacy = msg.respOperatPrivacy;
                }
            },
            meansClick() {
                let _this = this;
                this.means = !this.means;
                this.getOperaList();
            },
            clickCareer() {
                this.career = !this.career;
                this.getJurisdiList();
                // this.getCityList()
            },
            // 个人资料  END
            async setNickName() {
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
                    let query = {
                        userId: this.queryId
                    }
                    this.getUserInfo(query);
                }
            },
            // 获取当前用户所有职业信息接口 GetThisUserJobInfo
            async getThisUserJobInfoList(value) {
                let msg = await GetThisUserJobInfo(value);
                if (msg) {
                    if (msg.jobInfos) {
                        let val = msg.jobInfos[0]
                        this.JurisdiInfo = val;
                        this.jobCompanyArr = [val.ProvinceAreaId + '|' + val.ProvinceName,val.CityAreaId + '|' + val.CityName,val.CountyAreaId + '|' + val.CountName]
                        this.ModelJurisdiInfo = {
                            CompanyName: val.CompanyName,
                            CompanyId: val.CompanyName,
                            DepaOrPosi: val.DepaOrPosi,
                            OperatHours: [val.OperatHoursStart, val.OperatHoursEnd],
                            Privacy: val.PrivacyId + '|' + val.PrivacyName,
                            ProvinceArea: val.ProvinceAreaId + '|' + val.ProvinceName,
                            CityArea: val.CityAreaId + '|' + val.CityName,
                            CountyArea: val.CountyAreaId + '|' + val.CountName,
                        }
                    }
                    
                }
            },
            async setJob(id) {
                let queryData = {}
                try {
                    queryData = {
                        CompanyName: this.ModelJurisdiInfo.CompanyName,
                        CompanyId: "",
                        DepaOrPosi: this.ModelJurisdiInfo.DepaOrPosi,
                        OperatHoursStart: this.ModelJurisdiInfo.OperatHours[0],
                        OperatHoursEnd: this.ModelJurisdiInfo.OperatHours[1],
                        PrivacyId: this.ModelJurisdiInfo.Privacy.split('|')[0],
                        PrivacyName: this.ModelJurisdiInfo.Privacy.split('|')[1],
                        Id: id,
                        ProvinceAreaId: this.jobCompanyArr[0].split('|')[0], //省份ID
                        ProvinceName: this.jobCompanyArr[0].split('|')[1], // 省份名称
                        CityAreaId: this.jobCompanyArr[1].split('|')[0], // 市ID
                        CityName: this.jobCompanyArr[1].split('|')[1], // 市名称
                        CountyAreaId: this.jobCompanyArr[2].split('|')[0], // 区ID
                        CountyName: this.jobCompanyArr[2].split('|')[1], // // 区名称
                    }
                } catch (error) {
                }
                let msg = await SetOrAddThisUserJobInfo(queryData)
                if (msg) {
                    this.$Message.success('修改成功');
                    this.career = !this.career;
                    let query = {
                        userId: this.queryId
                    }
                    this.getThisUserJobInfoList(query);
                }
            },
            // 操作权限
            async getJurisdiList() {
                let msg = await GetOperatPrivacy(1)
                if (msg) {
                    this.Jurisdi = msg.respOperatPrivacy;
                }
            },
             // 个人擅长 GetUserExpertise
            async getUserExpertiseList(value) {
                let msg = await GetUserExpertise(value);
                if (msg) {
                   this.userLabel = msg || [];
                }
            },
            async addLabel () {
                let msg  = await addUserLabel({LabelName:  this.userLabelModel});
                if (msg) {
                    let q = {
                        SortCode: 0,
                        LabelId: msg.LabelId
                    }
                    let isadd = await saveUserExpertise(q)
                    if (isadd) {
                        this.userLabelModel = '';
                        this.getUserExpertiseList({userId: this.$route.params.userId});
                    }
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
                display: table;

                &-label {
                    vertical-align: middle;
                    color: #000000;
                }
            }

            &-right {
                width: 100%;
                .userLabel-label {
                    margin-left: 10px;
                    height: 25px;
                    line-height: 25px;
                    .ivu-tag-dot-inner {
                        margin-right: 5px;
                    }
                    .ivu-icon-ios-close {
                        margin-left: 5px !important;
                    }
                    &:first-child {
                        margin-left: 0;
                    }
                }
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

            &-operation {
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
