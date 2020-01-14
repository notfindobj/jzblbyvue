<template>
    <div>
        <Title title="账户资料"/>
        <div class="user-box">
            <Form class="personalData" :model="userInfo" :rules="ruleInline" :label-width="100">
                <FormItem label="" >
                    <div class="user-header">
                        <img :src="Identity.HeadIcon" alt="">
                        <div class="user-header-mol" @click="modifyHead">
                            <span>修改头像</span>
                            <input type="file" style="display: none;" ref="headIcon" @change="upHeadIcon">
                        </div>
                    </div>
                </FormItem>
                <FormItem label="名称（昵称）" prop="user">
                    <Input size="small" type="text" v-model="userInfo.Nickname" :disabled="controlUser" placeholder="名称（昵称）"></Input>
                </FormItem>
                <FormItem label="真实姓名" prop="user">
                    <Input size="small" type="text" v-model="userInfo.RealName" :disabled="controlUser" placeholder="真实姓名"></Input>
                </FormItem>
                <FormItem label="所在地" prop="user">
                    <Cascader v-model="userInfo.addresList" :data="cascaderList" :disabled="controlUser" :load-data="loadData"></Cascader>
                </FormItem>
                <FormItem label="性别" prop="user">
                    <Select v-model="userInfo.Gender" :disabled="controlUser" clearable >
                        <Option :value="1">男</Option>
                        <Option :value="0">女</Option>
                    </Select>
                </FormItem>
                <FormItem label="感情状态" prop="user">
                    <Select v-model="userInfo.EmotionalState" clearable :disabled="controlUser">
                        <Option v-for="(items, index) in Privacy" :key="index" :value="items.Id+'|'+items.Name">
                            {{items.Name}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem label="生日" prop="user">
                    <DatePicker v-model="userInfo.Birthday" :disabled="controlUser" type="date" clearable placeholder="请选择生日" ></DatePicker>
                </FormItem>
                <FormItem label="职业类型" prop="user">
                    <template v-for="(item, index) in userInfo.Careers">
                        <Tag :key="index" closable color="warning" :name="item.delId" @on-close="delUserTyepLabel(index, item.delId)">{{item.label}}</Tag>
                    </template>
                    <template>
                        <div v-if="!controlUser">
                            <Cascader :data="jobType" v-model="Careers"></Cascader> 
                            <Button @click="addCareers">确定添加</Button>
                        </div>
                    </template>
                </FormItem>
                <FormItem label="个人擅长" prop="user">
                    <template v-for="(item, index) in userInfo.LabelData">
                        <Tag :key="index" closable color="warning"  :name="item.LabelId" @on-close="delUserLabel(index, item.LabelId)">{{item.LabelName}}</Tag>
                    </template>
                    <div v-if="!controlUser">
                        <Input size="small" type="text" v-if="!controlUser" v-model="labelD" clearable placeholder="个人擅长"></Input>
                        <Button @click="addLabel">确定添加</Button>
                    </div>
                </FormItem>
                <FormItem label="个人简介" prop="user">
                    <Input v-model="userInfo.Description"  :disabled="controlUser" type="textarea" :autosize="{minRows: 2}" placeholder="个人简介" />
                </FormItem>
            </Form>
            <div class="user-btn">
                <Button @click="saveInfo">{{controlUser? '修改资料' : '保存资料'}}</Button>
            </div>
        </div>
        <Title title="工作经历"/>
        <template v-for="(items, index) in userInfo.Jobs">
            <Form class="work" :model="items" :rules="ruleInline" :label-width="100" :key="index">
                <Row>
                    <Col span="11">
                        <FormItem label="单位名称：" prop="user">
                            <Input size="small" type="text" v-model="items.CompanyName" :disabled="controlwork" placeholder="单位名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="权限：" prop="user">
                            <Select v-model="items.PrivacyId" clearable :disabled="controlwork">
                                <Option v-for="(items, index) in Jurisdiction" :key="index" :value="items.Id+'|'+items.Name">
                                    {{items.Name}}
                                </Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem >
                            <Button @click="saveWork">{{controlwork? '修改工作经历' : '保存工作经历'}}</Button>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                        <FormItem label="部门：" prop="user">
                            <Input size="small" type="text" :disabled="controlwork" v-model="items.DepaOrPosi" placeholder="部门"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                        <FormItem label="工作时间：" prop="user">
                            <div class="operatHours">
                                <DatePicker type="date" format="yyyy/MM/dd" v-model="items.OperatHoursStart" :disabled="controlwork"  @on-chang.native="timeChang"  clearable placeholder="工作时间" ></DatePicker>
                                <span> - </span>
                                <DatePicker type="date" format="yyyy/MM/dd" v-model="items.OperatHoursEnd" :disabled="controlwork" clearable placeholder="工作时间" ></DatePicker>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                        <FormItem label="所在地：" prop="user">
                            <Cascader v-model="items.addresList" :data="cascaderList" :disabled="controlwork" :load-data="loadData"></Cascader>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </template>
    </div>
</template>
<script>
import Title from './components/title'
import {getProvinceList, getUserData, GetOperatPrivacy,GetThisUserJobInfo,
delareerTyepInfo,delUserExpertise,
setUserData, SetOrAddThisUserJobInfo, uploadFile, getCareerData} from '../../service/clientAPI'
import { mapState, mapGetters} from 'vuex'
export default {
    components: { 
        Title,
    },
    data () {
        return {
            ruleInline: {},
            model1: '1',
            model2: '1',
            controlUser: true,
            controlwork: true,
            userInfo: {},
            jobInfo: [],
            Privacy: [],
            cascaderList: [], // 城市信息
            Jurisdiction: [],  // 权限
            jobType: [],
            Careers:[], // 职业类型,
            labelD: ''
        }
    },
    computed: {
        ...mapState({
            Identity: state => state.overas.auth || {}
        }),
        ...mapGetters(['isLogin'])
    },
    asyncData({store}) {
        
    },
    mounted () {
        let query = {
            userId: this.Identity.UserId
        }
        this.getUserInfo(query)
        this.getCascaderData()
        this.getOperaList()
        this.getWorkList()
        this.getCareerList()
    },
    methods: {
        // 删除职业类型
        async delUserTyepLabel (index, name) {
            let query = {
                userId: this.Identity.UserId
            }
            this.$Modal.confirm({
                title: '删除标签',
                content: '<p>请否确定职业类型标签!</p>',
                onOk: async () => {
                    if (!name) {
                        this.userInfo.Careers.splice(index, 1)
                        return
                    }
                    let msg = await delareerTyepInfo(name);
                    if (msg) { 
                        this.getUserInfo(query)
                    }
                },
                onCancel: () => {
                    return false
                }
            });
        },
        // 删除标签
        async delUserLabel (index, name) {
            this.$Modal.confirm({
                title: '删除标签',
                content: '<p>请否确定删除标签!</p>',
                onOk: async () => {
                    if (!name) {
                        this.userInfo.LabelData.splice(index, 1)
                        return
                    }
                    let msg = await delUserExpertise({LabelId: name});
                    if (msg) { 
                        let query = {
                            userId: this.Identity.UserId
                        }
                        this.getUserInfo(query)
                    }
                },
                onCancel: () => {
                    return false
                }
            });
        },
        // 获取账户信息
        async getUserInfo(value) {
            let msg = await getUserData(value);
            if (msg) {
                this.userInfo = msg;
                this.$set(this.userInfo, 'addresList', [msg.ProvinceAreaId + '|' + msg.ProvinceName,msg.CityAreaId + '|' + msg.CityName, msg.CountyAreaId + '|' + msg.CountyName])
            }
        },
        // 个人资料 感觉状态
        async getOperaList () {
            let msg = await GetOperatPrivacy(2);
            if (msg) {
                this.Privacy = msg.respOperatPrivacy;
            }
        },
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
        // 修改基础资料
        async saveInfo () {
            if (this.controlUser) {
                this.controlUser = false;
                return false
            }
            if (!this.controlUser) {
                let query = this.userInfo;
                try {
                    query.ProvinceAreaId = this.userInfo.addresList[0].split('|')[0];
                    query.ProvinceName = this.userInfo.addresList[0].split('|')[1];
                    query.CityAreaId = this.userInfo.addresList[1].split('|')[0];
                    query.CityName = this.userInfo.addresList[1].split('|')[1];
                    query.CountyAreaId = this.userInfo.addresList[2].split('|')[0];
                    query.CountyName = this.userInfo.addresList[2].split('|')[1];
                } catch (error) {
                    
                }
                query.Lables = ''
                query.CareersIds = ''
                query.LabelData.forEach(ele => {
                    query.Lables += ele.LabelName+','
                })
                query.Careers.forEach(ele => {
                    query.CareersIds += ele.value+','
                })
                let msg = await setUserData(query);
                if (msg) {
                    this.controlUser = true;
                    this.$Message.success({
                        render: h => {
                            return h('span', '信息修改成功')
                        }
                    });
                }
            }
        },
        // 工作经历 权限
        async getWorkList () {
            let msg = await GetOperatPrivacy(1);
            if (msg) {
                this.Jurisdiction = msg.respOperatPrivacy;
            }
        },
        // 保存工作经历
        async saveWork () {
            if (this.controlwork) {
                this.controlwork = false;
                return false
            }
            if (!this.controlwork) {
                let query = this.userInfo.Jobs[0];
                let t = this.userInfo.Jobs[0];
                try {
                    query.ProvinceAreaId = t.addresList[0].split('|')[0];
                    query.ProvinceName = t.addresList[0].split('|')[1];
                    query.CityAreaId = t.addresList[1].split('|')[0];
                    query.CityName = t.addresList[1].split('|')[1];
                    query.CountyAreaId = t.addresList[2].split('|')[0];
                    query.CountyName = t.addresList[2].split('|')[1];
                } catch (error) {}
                if (query.OperatHoursEnd > query.OperatHoursStart) {
                    let msg = await SetOrAddThisUserJobInfo(query)
                    if (msg) {
                        this.controlwork = true;
                        this.$Message.success({
                            render: h => {
                                return h('span', '信息修改成功')
                            }
                        });
                    }
                } else {
                    this.$Message.warning({
                        render: h => {
                            return h('span', '结束时间不能小于开始时间');
                        }
                    });
                }
            }
        },
        // 添加职业类型
        addCareers () {
            let query = {
                "delId":"",
                "value":this.Careers[1].split('|')[0],
                "label": this.Careers[1].split('|')[1],
                "children":""
            }
           this.userInfo.Careers.push(query);
           this.Careers = []
        },
        addLabel () {
            let query = {
                "LabelId":"",
                "LabelName": this.labelD,
                "SortCode":""
            }
           this.userInfo.LabelData.push(query);
           this.labelD = ''
        },
        modifyHead () {
            this.$refs.headIcon.click()
        },
        // 修改头像
        async upHeadIcon (event) {
            let file = event.target.files;
            let data = new FormData();
            for (let item of file) {
                data.append('files', item)
            }
            let msg = await uploadFile(data, 8);
            if (msg) {
                this.userInfo.HeadIconSrc = msg.smallImgUrl;
                let info = JSON.parse(JSON.stringify(this.Identity));
                this.userInfo.HeadIconSrc = msg.smallImgUrl;
                info.HeadIcon = msg.smallImgUrl;
                this.$store.dispatch('LOGININ', info);
                localStorage.setItem('LOGININ', JSON.stringify(info))
            }
        },
        async getCareerList () {
            let msg = await getCareerData();
            if (msg) {
                msg.Careers.forEach(ele => {
                    ele.value = ele.value+'|'+ele.label;
                    if (ele.children.length > 0) {
                        ele.children.forEach(e => {
                            e.value = e.value+'|'+e.label;
                        })
                    }
                })
                this.jobType = msg.Careers;
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .bg-Tag {
        background: #ff3c00;
    }
    .user-box {
        display: flex;
        justify-content: space-between;
    }
    .user-btn {
        margin-top: 20px;
        margin-right: 20px;
    }
    .operatHours {
        display: flex;
    }
    .work {
        width: 100%;
        display: inline-block;
        padding-left: 80px;
        margin-top: 20px;
    }
    .personalData {
        width: 380px;
        margin-top: 20px;
        display: inline-block;
        margin-left: 80px;
    }
    .user-header {
        display: inline-block;
        position: relative;
        height: 80px;
        img {
            cursor: pointer;
            border: 1px solid #eaeaea;
            border-radius: 50%;
            display: inline-block;
            background: #abc;
            width: 80px;
            height: 80px;
        }
        &:hover .user-header-mol{
            display: inline-block;
        }
        &-mol {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            display: none;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            background: rgba(0,0,0,.4);
            color: #ffffff;
            text-align: center;
            span {
                font-size: 14px;
                line-height: 80px;
            }
        }
    }
</style>