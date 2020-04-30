<template>
<!-- 公司认证 -->
    <div>
        <Title title="公司认证"/>
        <div class="attestation">
            <Form class="personalData" ref="comData" :model="comData" :rules="ruleInline" :label-width="100">
                <FormItem label="企业类型" prop="user">
                   <Select v-model="comData.TypeOfEnterprise" clearable style="width: 240px;">
                        <Option :value="1">国企</Option>
                        <Option :value="2">私企</Option>
                    </Select>
                </FormItem>
                <FormItem label="组织机构代码" prop="user">
                    <Input size="small" type="text" clearable v-model="comData.OrganizationCode" placeholder="组织机构代码" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="法人代表" prop="user">
                    <Input size="small" type="text" clearable v-model="comData.LegalRepresentative" placeholder="法人代表" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="经营范围" prop="user">
                    <Input size="small" type="text" clearable v-model="comData.ScopeOfBusiness" placeholder="经营范围" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="企业规模" prop="user">
                    <Select v-model="comData.EnterpriseScale" clearable style="width: 240px;">
                        <Option :value="1">微型</Option>
                        <Option :value="2">小型</Option>
                        <Option :value="3">大型</Option>
                        <Option :value="4">特大型</Option>
                    </Select>
                </FormItem>
                <FormItem label="企业开户银行" prop="user">
                    <Input size="small" type="text" clearable v-model="comData.OpeningBank" placeholder="企业开户银行" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="企业银行账号" prop="user">
                    <Input size="small" type="text" clearable v-model="comData.BankCardNumber" placeholder="企业银行账号" style="width: 240px;"></Input>
                </FormItem>
            </Form>
        </div>
        <Title title="经办人信息"/>
        <div class="attestation">
            <Form class="personalData" ref="comData" :model="comData" :rules="ruleInline" :label-width="100">
                <FormItem label="真实姓名" prop="user">
                    <Input size="small" type="text" v-model="comData.IDCardName" placeholder="真实姓名" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="身份证号码" prop="user">
                    <Input size="small" type="text" v-model="comData.IDCard" placeholder="身份证号码" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="个人头像" prop="user">
                    <div class="user-header">
                        <img :src="comData.HeadIcon" alt="">
                        <div class="user-header-mol" @click="modifyHead('headIcon')">
                            <span>修改头像</span>
                             <input type="file" style="display: none;" ref="headIcon" @change="upHeadIcon('headIcon')">
                        </div>
                    </div>
                    <div class="user-tips">
                        实名认证需上传您的个人真实头像，如非真实头像，将影响认证审核
                    </div>
                </FormItem>
                <FormItem label="身份证正面" prop="user">
                    <div class="card" @click="modifyHead('IDCardImgPos')" :style="`background-image: url(${comData.IDCardImgPosiSrc});`">
                        <Icon type="ios-cloud-upload" custom="ivu-icon ivu-icon-ios-camera" size="52" style="color: #3399ff"></Icon>
                        <input type="file" style="display: none;" ref="IDCardImgPos" @change="upHeadIcon('IDCardImgPos')">
                    </div>
                </FormItem>
                <FormItem label="身份证反面" prop="user">
                    <div class="card" @click="modifyHead('IDCardImgNega')" :style="`background-image: url(${comData.IDCardImgNegaSrc});`">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <input type="file" style="display: none;" ref="IDCardImgNega" @change="upHeadIcon('IDCardImgNega')">
                    </div>
                    <div class="card-tips">
                        请上传彩色二代身份证，可以是扫描件或数码相机照片，要求姓名、证件号码、脸部、地址都清晰可见。支持JPG，PNG，BMP格式，文件大小不超过200K。查看范例
                    </div>
                </FormItem>
                <FormItem label="手机号" prop="user">
                    <Input size="small" type="text" clearable v-model="comData.CellphoneNumber" placeholder="手机号" style="width: 240px;"></Input>
                </FormItem>
                 <FormItem prop="user">
                    <Button type="primary" @click="setCer">立即认证</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import Title from './components/title'
import {getUserInfo, setCertification} from '../../service/clientAPI'
export default {
    scrollToTop: true,
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
            comData: {}
        }
    },
    created () {
        this.getComData()
    },
    methods: {
        async getComData () {
            let msg = await getUserInfo();
            if (msg) {
                this.comData = msg;
            }
        },
        async setCer () {
            let queery  = {};
            queery = this.comData
            let msg = await setCertification(queery);
            if (msg) {
                this.$Message.success('资料提交成功，请等待后台审核！')
            }
        },
        modifyHead (name) {
            this.$refs[name].click()
        },
         // 修改头像
        async upHeadIcon (name) {
            let file = event.target.files;
            let data = new FormData();
            for (let item of file) {
                data.append('files', item)
            }
            let msg = await uploadFile(data, 11);
            if (msg) {
                if (name === 'headIcon') {
                    this.$set(this.userInfo, 'HeadIcon', msg.fileUrl);
                    this.userInfo.HeadIconId = msg.fileId
                }
                if (name === 'IDCardImgPos') {
                    this.$set(this.userInfo, 'IDCardImgPosiSrc', msg.fileUrl);
                    this.userInfo.IDCardImgPosiId = msg.fileId
                }
                if (name === 'IDCardImgNega') {
                    this.$set(this.userInfo, 'IDCardImgNegaSrc', msg.fileUrl);
                    this.userInfo.IDCardImgNegaId = msg.fileId
                }
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .attestation {
        width: 100%;
        margin-top: 20px;
        display: inline-block;
        padding-left: 80px;
    }
    .tips {
        position: relative;
        margin-top: -20px;
        margin-bottom: 15px;
    }
    .user-header {
        display: inline-block;
        position: relative;
        img {
            cursor: pointer;
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
    .user-tips {
        position: relative;
        margin-top: -15px;
        margin-bottom: -10px;
        color: #8c8c8c
    }
    .card-tips {
        line-height: 20px;
        margin: 10px 0;
        color: #8c8c8c;
        padding-right: 30px;
    }
    .card {
        border: 1px dashed #cccccc;
        cursor: pointer;
        width: 250px;
        text-align: center;
        height: 160px;
        line-height: 160px;
        background-size: 100% 100%;
    }
</style>