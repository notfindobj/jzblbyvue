<template>
    <div>
        <Title title="账户资料"/>
        <Form class="personalData" ref="formInline" :model="userInfo" :rules="ruleInline" :label-width="100">
            <FormItem label="" >
                <div class="user-header">
                    <img :src="userInfo.HeadIconSrc" alt="">
                    <div class="user-header-mol">
                        <span>修改头像</span>
                    </div>
                </div>
            </FormItem>
            <FormItem label="名称（昵称）" prop="user">
                <Input size="small" type="text" v-model="userInfo.Nickname" placeholder="名称（昵称）"></Input>
            </FormItem>
            <FormItem label="真实姓名" prop="user">
                <Input size="small" type="text" v-model="userInfo.RealName" placeholder="真实姓名"></Input>
            </FormItem>
            <FormItem label="所在地" prop="user">
                <Cascader v-model="userInfo.addresList" :data="cascaderList" :load-data="loadData"></Cascader>
            </FormItem>
            <FormItem label="性别" prop="user">
                <Select v-model="userInfo.Gender" clearable >
                    <Option :value="1">男</Option>
                    <Option :value="0">女</Option>
                </Select>
            </FormItem>
            <FormItem label="感情状态" prop="user">
                <Select v-model="userInfo.EmotionalState" clearable>
                    <Option v-for="(items, index) in Privacy" :key="index" :value="items.Id+'|'+items.Name">
                        {{items.Name}}
                    </Option>
                </Select>
            </FormItem>
            <FormItem label="生日" prop="user">
                <DatePicker v-model="userInfo.Birthday" type="date" clearable placeholder="请选择生日" ></DatePicker>
            </FormItem>
            <FormItem label="职业类型" prop="user">
                <Select v-model="model2" clearable>
                    <Option value="1">修图</Option>
                </Select>
            </FormItem>
            <FormItem label="个人擅长" prop="user">
                <Input size="small" type="text" clearable v-model="formInline.user" placeholder="个人擅长"></Input>
            </FormItem>
            <FormItem label="个人简介" prop="user">
                <Input v-model="userInfo.Description" type="textarea" :autosize="{minRows: 2}" placeholder="个人简介" />
            </FormItem>
        </Form>
        <Title title="工作经历"/>
        <template v-for="(items, index) in jobInfo">
            <Form class="work" ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100" :key="index">
                <Row>
                    <Col span="11">
                        <FormItem label="单位名称：" prop="user">
                            <Input size="small" type="text" v-model="items.CompanyName" placeholder="单位名称"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="权限：" prop="user">
                            <Select v-model="model1" clearable>
                                <Option value="1">单身</Option>
                                <Option value="0">已婚</Option>
                                <Option value="3">丧偶</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                        <FormItem label="部门：" prop="user">
                            <Input size="small" type="text" v-model="items.DepaOrPosi" placeholder="部门"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                        <FormItem label="工作时间：" prop="user">
                            <div class="operatHours">
                                <DatePicker type="date" v-model="items.OperatHoursStart" clearable placeholder="工作时间" ></DatePicker>
                                <span> - </span>
                                <DatePicker type="date" v-model="items.OperatHoursEnd" clearable placeholder="工作时间" ></DatePicker>
                            </div>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="11">
                        <FormItem label="所在地：" prop="user">
                            <Cascader v-model="items.addresList" :data="cascaderList" :load-data="loadData"></Cascader>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </template>
        
    </div>
</template>
<script>
import Title from './components/title'
import {getProvinceList, getUserData, GetOperatPrivacy,GetThisUserJobInfo} from '../../service/clientAPI'
import { mapState, mapGetters} from 'vuex'
export default {
    components: { 
        Title,
    },
    data () {
        return {
            formInline: {},
            ruleInline: {},
            model1: '1',
            model2: '1',
            value7: '',
            value2: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
            data: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
            }],
            userInfo: {},
            jobInfo: [],
            Privacy: [],
            cascaderList: [], // 城市信息
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
        this.getJobList(query)
    },
    methods: {
        // 获取账信息
        async getUserInfo(value) {
            let msg = await getUserData(value);
            if (msg) {
                this.userInfo = msg;
                this.userInfo.EmotionalState = msg.EmotionalStateId + '|' + msg.EmotionalState;
                this.userInfo.addresList = [msg.ProvinceAreaId, msg.CityAreaId, msg.CountyAreaId];
            }
        },
        // 获取职业信息
        async getJobList (value) {
            let msg = await GetThisUserJobInfo(value);
            if (msg.jobInfos) {
                msg.jobInfos.forEach(ele => {
                    ele.addresList = [ele.ProvinceAreaId, ele.CityAreaId, ele.CountyAreaId];
                })
                this.jobInfo = msg.jobInfos;
            }
        },
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
                ele.value = ele.ProvinceCode
                ele.label = ele.ProvinceName
            })
            if (msg) {
                this.cascaderList = msg.respProvince;
            }
        },
        async loadData (item, callback) {
            item.loading = true;
            let queryData = {
                ProvinceCode: item.value
            }
            let msg = await getProvinceList(queryData);
            if (msg.respProvince instanceof Array) {
                msg.respProvince.forEach(ele => {
                    if (item.level < 2) {
                        ele.level = item.level + 1;
                        ele.loading = false;
                        ele.children = [];
                    }
                    ele.value = ele.ProvinceCode
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
    },
}
</script>
<style lang="less" scoped>
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
        img {
            cursor: pointer;
            display: inline-block;
            background: #abc;
            border-radius: 50%;
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