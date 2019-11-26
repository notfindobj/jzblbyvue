<template>
     <div class="comreg">
        <Form :model="companyAttr" ref="companyAttr" :rules="rules" label-position="right" :label-width="100">
            <Row>
                <Col span="12" style="padding-right:10px">
                    <FormItem label="公司名称:" prop="CompanyName">
                        <Input v-model="companyAttr.CompanyName"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                   <FormItem label="公司简称:" prop="CompanyProfile">
                        <Input v-model="companyAttr.CompanyProfile"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12" style="padding-right:10px">
                    <FormItem label="公司类型:" prop="CompanyTypeId">
                        <Select v-model="companyAttr.CompanyTypeId" clearable >
                            <Option v-for="item in entTypeList" :value="item.EntTypeId" :key="item.EntTypeId">{{ item.EntName }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="营业期限:" prop="Business">
                        <DatePicker type="daterange" format="yyyy/MM/dd" v-model="companyAttr.Business" placement="bottom-end" placeholder="Select date" style="width: 100%"></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="16" style="padding-right:10px">
                    <FormItem label="营业执照证照编号:" prop="BusLicRegNum">
                        <Input v-model="companyAttr.BusLicRegNum"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12" style="padding-right:10px">
                    <FormItem label="营业执照:" prop="BusLicImgId">
                        <div @click="changeFile('updataFile')" :class="companyAttr.BusLicImgId ? 'updataFile-cameras ivu-icon ivu-icon-ios-camera' : 'updataFile-camera ivu-icon ivu-icon-ios-camera'" :style="`background-image: url('${baseUrlRegExp(companyAttr.BusLicImg)}');`">
                            <input ref="updataFile" type="file" @change="changeUpFile('updataFile', 10)" style="display: none;">
                        </div>
                    </FormItem>
                </Col>
                <Col span="12" style="padding-right:10px">
                    <FormItem label="企业LOGO:" >
                        <div @click="changeFile('logo')" :class="companyAttr.CompanyImgId ? 'updataFile-cameras ivu-icon ivu-icon-ios-camera' : 'updataFile-camera ivu-icon ivu-icon-ios-camera'" :style="`background-image: url('${baseUrlRegExp(companyAttr.CompanyImg)}');`">
                            <input ref="logo" type="file" @change="changeUpFile('logo', 11)" style="display: none;">
                        </div>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12" style="padding-right:10px">
                    <FormItem label="经办人姓名:" prop="IDCardName">
                        <Input v-model="companyAttr.IDCardName"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="经办人身份证号码:" prop="IDCordId">
                        <Input v-model="companyAttr.IDCordId"></Input>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="经办人身份证:" prop="IDCardImgNegaId">
                <div @click="changeFile('card')"
                :class="companyAttr.IDCardImgPosiId ? 'updataFile-cameras iconfont icon-shenfenzhengzhengmian' : 'updataFile-camera iconfont icon-shenfenzhengzhengmian'" :style="`background-image: url('${baseUrlRegExp(companyAttr.IDCardImgPosi)}');`"
                 >
                    <input ref="card" type="file" @change="changeUpFile('card', 9)" style="display: none;">
                </div>
                <div  @click="changeFile('unCard')" 
                :class="companyAttr.IDCardImgNegaId ? 'updataFile-cameras iconfont icon-shenfenzhengfanmian' : 'updataFile-camera iconfont icon-shenfenzhengfanmian'" :style="`background-image: url('${baseUrlRegExp(companyAttr.IDCardImgNega)}');`">
                    <input ref="unCard" type="file" @change="changeUpFile('unCard', 9)" style="display: none;">
                </div>
            </FormItem>
            <Row>
                <Col span="12" style="padding-right:10px">
                    <FormItem label="手机号:" prop="CellphoneNumber">
                        <Input v-model="companyAttr.CellphoneNumber"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                   
                    <FormItem label="验证码:" prop="Authcode">
                        <Input v-model="companyAttr.Authcode" placeholder="请输入验证码">
                            <Button :disabled="isDisabled" :class="!isDisabled ? 'getMobile' : 'defMobile'" slot="append"
                                   type="primary" @click="getMobile">{{enterButtonText}}
                            </Button>
                        </Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="16" style="padding-right:10px">
                    <FormItem label="登陆密码:" prop="Password">
                        <Input v-model="companyAttr.Password"></Input>
                    </FormItem>
                </Col>
            </Row>
            <FormItem>
                <Button type="primary" @click="registComUser('companyAttr')">提交</Button>
            </FormItem>
        </Form>
        <Modal
            v-model="modal10"
            :footer-hide="true"
            :header-hide="true"
            width="400"
            :mask-closable="false"
            @on-cancel="onCancel"
            class-name="vertical-center-modal">
            <p class="Modalcenter">提交成功，请等待管理员审核!</p>
        </Modal>
     </div>
</template>
<script>
import {baseUrlRegExp} from '../../../plugins/untils/public'
import {getEntType, registerEnterprise , uploadFile, getMobileCode} from '../../../service/clientAPI'
import {validatePassCheck, validateIdentity} from '../../../plugins/untils/Verify'
export default {
    layout: 'main',
    middleware: 'authenticated',
    data() {
        return {
            baseUrlRegExp,
            companyAttr: {
                Business:[],
                "CompanyName": "", // 公司名称 
                "CompanyProfile": "", // 公司简称
                "BusLicRegNum": "", // 营业执照注册号
                "BusLicImgId": "", // 营业执照上传的图片Id
                "BusLicImg": "", // 营业执照上传的图片Id
                "BusLicBegin": "", // 营业执照期限开始时间
                "BusLicEnd": "", // 营业执照期限结束时间 pattern
                "IDCardImgPosi": "", // 身份证正面上传图片Id
                "IDCardImgPosiId": "", // 身份证正面上传图片Id
                "IDCardImgNega": "", // 身份证反面上传图片Id
                "IDCardImgNegaId": "", // 身份证反面上传图片Id
                "CompanyImgId": "", // 身份证Logo
                "CompanyImg": "", // 身份证Logo
                "IDCardName": "", // 身份证姓名
                "IDCordId": "", // 身份证号码
                "CompanyTypeId": "", // 公司类型Id
                "CellphoneNumber": "", // 联系人手机号码
                "Password": "", // 联系人登陆密码
                "Authcode": "" // 手机号码验证码
            },
            entTypeList: [],
            rules: {
                IDCardImgNegaId:[
                    {required: true, message: '身份证必须上传', trigger: 'blur'}
                ],
                BusLicImgId:[
                    {required: true, message: '营业执照必须上传', trigger: 'blur'}
                ],
                Password: [
                    {required: true, message: '选项不能为空！', trigger: 'blur'}
                ],
                Authcode: [
                    {required: true, message: '选项不能为空！', trigger: 'blur'}
                ],
                IDCordId: [
                    {required: true, message: '选项不能为空！', trigger: 'blur'}
                ],
                IDCardName: [
                    {required: true, message: '选项不能为空！', trigger: 'blur'}
                ],
                CompanyName: [
                    {required: true, message: '公司名称不能为空！', trigger: 'blur'}
                ],
                CompanyProfile: [
                    {required: true, message: '公司简介不能为空！', trigger: 'blur'}
                ],
                CompanyTypeId: [
                    {required: true, message: '选项不能为空！', trigger: 'change'}
                ],
                Business: [
                    {required: true, message: '选项不能为空！', trigger: 'blur', pattern: /.+/}
                ],
                BusLicRegNum: [
                    {required: true, message: '选项不能为空！', trigger: 'blur'}
                ],
                CellphoneNumber: [
                    {required: true, validator: validatePassCheck, trigger: 'blur' }
                ],
                IDCordId: [
                    {required: true, validator: validateIdentity, trigger: 'blur' }
                ]
            },
            isDisabled: false,
            enterButtonText: '获取验证码',
            modal10: false
        }
    },
    mounted () {
        this.getEntTypeList();
        if (localStorage.getItem('entInfo')) {
            let entInfo = JSON.parse(localStorage.getItem('entInfo'));
            this.companyAttr= {
                Business:[entInfo.BusLicBegin, entInfo.BusLicEnd],
                CompanyName: entInfo.CompanyName, // 公司名称 
                CompanyProfile: entInfo.CompanyProfile,
                BusLicRegNum: entInfo.BusLicRegNum,
                BusLicImgId: entInfo.BusLicImgId,
                BusLicImg: entInfo.BusLicImgSrc,
                BusLicBegin: entInfo.BusLicBegin,
                BusLicEnd:  entInfo.BusLicEnd,
                IDCardImgPosi: entInfo.IDCardImgPosiSrc,
                IDCardImgPosiId: entInfo.IDCardImgPosiId,
                IDCardImgNega: entInfo.IDCardImgPosiSrc,
                IDCardImgNegaId: entInfo.IDCardImgNegaId,
                IDCardName: entInfo.IDCardName,
                IDCordId: entInfo.IDCordId,
                CompanyTypeId: entInfo.CompanyTypeId,
                CellphoneNumber: entInfo.CellphoneNumber,
                CompanyImgId: entInfo.CompanyImgId,
                CompanyImg: entInfo.CompanyImgSrc,
                Password: '',
                Authcode: '',
            }

        }
        console.log(JSON.parse(localStorage.getItem('entInfo')))
    },
    methods: {
        // 获取验证码
        async getMobile() {
            let queruys = {
                OperationType: 3,
                SendType: 0,
                MobileNumber: this.companyAttr.CellphoneNumber
            };
            if (!this.companyAttr.CellphoneNumber) {
                this.$Message.warning('请输入手机号');
                return false
            }

            let mobile = await getMobileCode(queruys)// 倒计时
            if (mobile) {
                this.$Message.success('信息已发送，请注意查收！');
                // 倒计时
                if (!this.enterButtonTime) {
                    let enterButton = 60;
                    this.isDisabled = true;
                    this.enterButtonTime = setInterval(() => {
                        enterButton = enterButton - 1
                        this.enterButtonText = enterButton + 'S'
                        if (enterButton <= 0) {
                        clearInterval(this.enterButtonTime)
                        this.enterButtonTime = ''
                        this.isDisabled = false;
                        this.enterButtonText = '获取验证码'
                        };
                    }, 1000)
                }
            }
        },
        changeFile (val) {
            this.$refs[val].click();
        },
        async getEntTypeList () {
            let msg = await getEntType();
            if (msg) {
                this.entTypeList = msg;
            }   
        },
        registComUser (name) {
            localStorage.removeItem('entInfo');
            this.$refs[name].validate(async (valid) => {
                if (valid) {
                    let comUser = JSON.parse(JSON.stringify(this.companyAttr));
                    comUser.BusLicBegin = comUser.Business[0];
                    comUser.BusLicEnd =  comUser.Business[1];
                    delete comUser.Business;
                    delete comUser.BusLicImg;
                    delete comUser.IDCardImgPosi;
                    delete comUser.IDCardImgNega;
                    let msg = await registerEnterprise(comUser);
                    if (msg) {
                        this.modal10 = true;
                    }
                }
            })
        },
        onCancel () {
            this.$store.dispatch('LOGGEDIN', 'signIn');
            this.$store.dispatch('SETUP', false)
        },
        changeUpFile (attr, type = 9) {
            let item = event.target.files[0];
            if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(item.name)) {    
                alert("图片类型必须是.gif,jpeg,jpg,png中的一种");    
                return false;    
            } 
            let data = new FormData();
            data.append('files', item)
            uploadFile(data, type).then(res => {
                if (attr === 'updataFile') {
                    this.companyAttr.BusLicImgId = res.fileId
                    this.companyAttr.BusLicImg = res.fileUrl
                }
                if (attr === 'card') {
                    this.companyAttr.IDCardImgPosiId = res.fileId
                    this.companyAttr.IDCardImgPosi = res.fileUrl
                }
                if (attr === 'unCard') {
                    this.companyAttr.IDCardImgNegaId = res.fileId
                    this.companyAttr.IDCardImgNega = res.fileUrl
                }
                if (attr === 'logo') {
                    this.companyAttr.CompanyImgId = res.fileId
                    this.companyAttr.CompanyImg = res.fileUrl
                }

            }).catch(err => {
                console.log(err, 'uploadErr')
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .Modalcenter {
        font-weight: bold;
        color: #FF3C00;
        font-size: 20px;
    }
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
    .getMobile {
        background: #FF3C00 !important;
        width: 100px;
        color: #ffffff !important;
    }

    .defMobile {
        width: 100px;
    }
    .updataFile-camera {
        font-size: 50px;
        display: inline-block;
        cursor: pointer;
        padding: 10px;
        background-size: 100% 100%;
    }
    .updataFile-cameras {
        font-size: 50px;
        display: inline-block;
        cursor: pointer;
        padding: 10px;
        background-size: 100% 100%;
        &:hover::before {
            opacity: 1;
        }
        &::before {
            opacity: 0;
        }    
    }
    .comreg {
        padding: 30px;
        background: #ffffff;
        margin-top: 20px;
        margin: 0 auto;
    }
</style>