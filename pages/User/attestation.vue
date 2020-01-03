<template>
<!-- 个人认证 -->
    <div>
        <Title title="身份认证"/>
        <div class="attestation">
            <Form class="personalData" ref="formInline" :model="userInfo" :rules="ruleInline" :label-width="100">
                <FormItem label="真实姓名" prop="IDCardName">
                    <Input size="small" type="text" v-model="userInfo.IDCardName" placeholder="真实姓名" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="身份证号码" prop="IDCard">
                    <Input size="small" type="text" v-model="userInfo.IDCard" placeholder="身份证号码" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="个人头像" prop="user">
                    <div class="user-header">
                        <img :src="userInfo.HeadIcon" alt="">
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
                    <div class="card" @click="modifyHead('IDCardImgPos')" :style="`background-image: url(${userInfo.IDCardImgPosiSrc});`">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <input type="file" style="display: none;" ref="IDCardImgPos" @change="upHeadIcon('IDCardImgPos')">
                    </div>
                </FormItem>
                <FormItem label="身份证反面" prop="user">
                    <div class="card" @click="modifyHead('IDCardImgNega')" :style="`background-image: url(${userInfo.IDCardImgNegaSrc});`">
                        <Icon class="card-icon" type="ios-cloud-upload" size="52" style="color: #3399ff" v-if="userInfo.IDCardImgNegaSrc"></Icon>
                        <input type="file" style="display: none;" ref="IDCardImgNega" @change="upHeadIcon('IDCardImgNega')">
                    </div>
                    <div class="card-tips">
                        请上传彩色二代身份证，可以是扫描件或数码相机照片，要求姓名、证件号码、脸部、地址都清晰可见。支持JPG，PNG，BMP格式，文件大小不超过200K。查看范例
                    </div>
                </FormItem>
                <div class="tips">
                    请填写银行账户信息，银行账号可以是企业对公账号或法人名下账号，以保障提现时汇款顺利！
                </div>
                <FormItem label="银行名称" prop="user">
                    <Select v-model="userInfo.BankId" clearable style="width: 240px;">
                        <Option v-for="(item, index) in bankList" :value="item.BankId" :key="index">{{item.BankName}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="银行卡号" prop="user">
                    <Input size="small" type="text" clearable v-model="userInfo.BankCardNumber" placeholder="银行卡号" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="银行预留手机号" prop="user">
                    <Input size="small" type="text" clearable v-model="userInfo.BankPhone" placeholder="银行预留手机号" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="开户行" prop="user">
                    <Input size="small" type="text" clearable v-model="userInfo.OpeningBank" placeholder="开户行所在地" style="width: 240px;"></Input>
                </FormItem>
                <FormItem  prop="user">
                     <Button type="primary" @click="setCer">立即认证</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import Title from './components/title'
import { userInfo } from 'os'
import {getUserInfo, setCertification, uploadFile, getBankList} from '../../service/clientAPI'
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
            bankList: [],
            BankId: '',
            userInfo: {}
        }
    },
    created () {
        this.getUserInfoList();
        this.getBankData();
    },
    methods: {
        async getUserInfoList () {
            let msg = await getUserInfo();
            if (msg) {
                this.userInfo = msg;
            }
        },
        async setCer () {
            let queery  = {};
            queery = this.userInfo
            let msg = await setCertification(queery);
            if (msg) {
                this.$Message.success('资料提交成功，请等待后台审核！')
            }
        },
        modifyHead (name) {
            this.$refs[name].click()
        },
        async getBankData () {
            let msg = await getBankList();
            if (msg) {
                this.bankList = msg
            }
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
                    debugger
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
        background-size: 100% 100%;
    }
    .card {
        border: 1px dashed #cccccc;
        cursor: pointer;
        width: 250px;
        text-align: center;
        height: 55px;
        height: 160px;
        line-height: 160px;
        background-size: 100% 100%;
    }
</style>