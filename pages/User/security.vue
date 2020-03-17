<template>
    <div>
        <Title title="账户安全"/>
        <ul class="security">
            <li>
                <div class="security-txt">
                    <span class="security-txt-title">账户安全:</span>
                    <span>建议您经常修改密码，以保障账号安全</span>
                </div>
                <Button @click="modifyPwd">立即修改</Button>
            </li>
            <li>
                <div class="security-txt">
                    <span class="security-txt-title">手机号码:</span>
                    <span>{{bindInfo.bindPhone}}</span>
                </div>
                <Button @click="modifyMobile">修改手机号</Button>
            </li>
            <li>
                <div class="security-txt">
                    <span class="security-txt-title">微信:</span>
                    <span> 绑定后，可使用微信快捷登录直接登录建筑部落</span>
                </div>
                <Button v-if="bindInfo.isBindWX" type="success" @click="bindingWX">解绑微信</Button>
                <Button v-if="!bindInfo.isBindWX" @click="bindingWX">绑定</Button>
            </li>
            <li>
                <div class="security-txt">
                    <span class="security-txt-title">QQ:</span>
                    <span> 绑定后，可使用QQ快捷登录直接登录建筑部落</span>
                </div>
                <Button v-if="bindInfo.isBindQQ" type="success" @click="bindingWX">解绑QQ</Button>
                <Button v-if="!bindInfo.isBindQQ" @click="bindQQ">绑定</Button>
            </li>
            <li>
                <div class="security-txt">
                    <span class="security-txt-title">账户注销:</span>
                    <span>账户注销后，您相关的数据将全部被清除，请谨慎操作！</span>
                </div>
                <Button @click="openCan">注销</Button>
            </li>
        </ul>
        <Modal v-model="modal2" width="520">
            <p slot="header" style="text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>建筑部落用户注销协议</span>
            </p>
            <div class="agreement">
                在您注销您的帐号之前，请充分阅读、理解并同意下列事项：
                <br>
                &nbsp;&nbsp;&nbsp;&nbsp;您注销建筑部落帐号的行为，将导致我们终止对您提供本服务，可能会给您的后续使用带来不便。注销成功后，我们将删除您的个人信息，使其保持不可被检索、访问的状态，或对其进行匿名化处理。请您知晓并理解，根据相关法律规定相关交易记录须在建筑部落保存 1 年甚至更长的时间。
                <br><br>
                如果您仍需要注销帐号，您的帐号需同时满足以下条件：<br>
                &nbsp;&nbsp;&nbsp;&nbsp;帐号在建筑部落系统中无资产、无欠款；<br>
                &nbsp;&nbsp;&nbsp;&nbsp;帐号内无未完成的订单、已提供服务但未支付的订单/服务；<br>
                &nbsp;&nbsp;&nbsp;&nbsp;帐号无任何纠纷，包括投诉举报或被投诉举报；<br>
                &nbsp;&nbsp;&nbsp;&nbsp;帐号为正常使用中的帐号且无任何帐号被限制的记录；<br> <br>
                在建筑部落帐号注销期间，如果您的建筑部落帐号涉及争议纠纷，包括但不限于投诉、举报、诉讼、仲裁、国家有权机关调查等，建筑部落有权自行终止本建筑部落帐号的注销而无需另行得到您的同意。<br>
                请您在提交注销申请前，务必解绑其他相关帐号，具体可与我们的客服联系。<br>
                建筑部落帐号一旦被注销将不可恢复，请您在操作之前自行备份帐号相关的所有信息和数据。注销建筑部落帐号，您将无法再使用本建筑部落帐号，也将无法找回您建筑部落帐号中及与帐号相关的任何内容或信息（即使您使用相同的手机号码再次注册并使用建筑部落），包括但不限于：<br><br>
                &nbsp;&nbsp;&nbsp;&nbsp;您将无法登录、使用建筑部落帐号；<br>
                &nbsp;&nbsp;&nbsp;&nbsp;建筑部落帐号的个人资料和历史信息（包括但不限于用户名、昵称、头像、问题、回答、站内信等）都将无法找回；<br>
                &nbsp;&nbsp;&nbsp;&nbsp;您通过建筑部落帐号进行登录的建筑部落旗下各网站、App 的所有记录将无法找回。您将无法再登录、使用前述服务，您曾获得的优惠券、积分、及其他卡券等视为您自行放弃，将无法继续使用。您理解并同意，建筑部落无法协助您重新恢复前述服务。<br>
                &nbsp;&nbsp;&nbsp;&nbsp;注销建筑部落帐号并不代表建筑部落帐号注销前的帐号行为和相关责任得到豁免或减轻。<br>
                <div class="agreement-check">
                    <Checkbox v-model="agreement">
                        <span class="agreement-check-name">同意用户注销协议</span>
                    </Checkbox>
                </div>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long @click="closeAccount">确认注销</Button>
            </div>
        </Modal>
        <Modal v-model="isMobile" width="360" @on-cancel="onCancel">
            <p slot="header" style="text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>绑定手机号可使用手机号直接登录</span>
            </p>
            <Form ref="ruleMobile" :model="setMobile" label-position="left" :rules="ruleMobile" :label-width="70">
                <FormItem label="旧手机号" prop="OldPhoneNumber">
                    <Input v-model="setMobile.OldPhoneNumber" placeholder="旧手机号"></Input>
                </FormItem>
                <FormItem label="新手机号" prop="NewPhoneNumber">
                    <Input v-model="setMobile.NewPhoneNumber" search :enter-button="bindingText" @on-search="getMobileCodeData" placeholder="新手机号" />
                </FormItem>
                <FormItem label="验证码" prop="VerificationCode">
                    <Input v-model="setMobile.VerificationCode" placeholder="验证码"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="error" size="large" long @click="saveewPhone">保存</Button>
            </div>
        </Modal>
        <Modal v-model="isPwd" width="360" @on-cancel="onCancel">
            <p slot="header" style="text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>建议您经常修改密码，以保障账号安全</span>
            </p>
            <Form ref="ruleMobile" :model="userPwd" label-position="left" :rules="ruleMobile" :label-width="70">
                <FormItem label="手机号码" >
                    <Input v-model="userPwd.mobile" placeholder="手机号码"></Input>
                </FormItem>
                <FormItem label="验证码" >
                    <Input v-model="userPwd.MobileVerifyCode" search :enter-button="bindingText" @on-search="getMobilePwdData" placeholder="验证码" />
                </FormItem>
                <FormItem label="新密码" >
                    <Input v-model="userPwd.NewPwd" placeholder="新密码"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="error" size="large" long @click="saveewPhone">保存</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import Title from './components/title'
import {getAccountBindInfo, loginByWX, bindingByWX, loginByQQ, getMobileCode, SetChangeMobile,writOffUser} from '../../service/clientAPI'
export default {
    scrollToTop: true,
    components: {
        Title,
    },
    data () {
        return {
            bindInfo: {
                bindPhone: '',
                isBindQQ: false,
                isBindWX: false
            },
            ruleMobile: {
                OldPhoneNumber: [
                    {required: true, type: 'string', min: 11, max: 11, message: '手机号有错', trigger: 'blur' }
                ],
                NewPhoneNumber: [
                    {required: true, type: 'string', min: 11, max: 11, message: '手机号有错', trigger: 'blur' }
                ],
                VerificationCode: [
                    {required: true, type: 'string', min: 6, max: 6, message: '验证码有错', trigger: 'blur' }
                ]
            },
            setMobile: {}, // 修改手机号
            bindingText: '验证码',
            initInterval: null,
            btnDisabled : true,
            modal2: false,
            isMobile: false,
            isPwd: false,
            userPwd: {
                mobile: '',
                MobileVerifyCode: '',
                NewPwd: ''
            },
            agreement: false
        }
    },
    created () {
        this.getBindInfo()
    },
    methods: {
        async getBindInfo () {
            let msg = await getAccountBindInfo();
            if (msg) {
                this.bindInfo.bindPhone = msg.PhoneNumber;
                this.bindInfo.isBindQQ = msg.QQ;
                this.bindInfo.isBindWX = msg.WeChat;
            }
        },
        // 打开登录窗口 type 1 qq登录 2 微信登录
        loginAtQQ(url, type) {
            const LEFT = (window.screen.width - 685) / 2;
            const TOP = (window.screen.height - 555) / 2;
            return window.open(url, 'oauth2Login_qq', 'height=555,width=685, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes, top=' + TOP + ', left=' + LEFT);
        },
        //绑定微信
        async bindingWX() {
            loginByWX().then(res => {
                const wxWindow = this.loginAtQQ(res, 2);
                const interId = setInterval(() => {
                    const code = localStorage.getItem('code');
                    const state = localStorage.getItem('state');
                    if (code && state) {
                        wxWindow.close();
                        bindingByWX({
                            code,
                            state
                        }).then(() => {
                            localStorage.removeItem('code');
                            localStorage.removeItem('state');
                            this.getInfo();
                        }).catch(() => {
                            localStorage.removeItem('code');
                            localStorage.removeItem('state');
                        });
                        clearInterval(interId);
                    }
                }, 2000)
            })
        },
        //绑定qq
        bindQQ() {
            loginByQQ().then(res => {
                const qqWindow = this.loginAtQQ(res, 1);
                const interId = setInterval(() => {
                    const code = localStorage.getItem('code');
                    const state = localStorage.getItem('state');
                    if (code && state) {
                        qqWindow.close();
                        getUserByQQ({
                            code,
                            state,
                            Authorization: JSON.parse(localStorage.getItem('LOGININ')).token
                        }).then(() => {
                            this.getInfo();
                            localStorage.removeItem('code');
                            localStorage.removeItem('state');
                        }).catch(() => {
                            localStorage.removeItem('code');
                            localStorage.removeItem('state');
                        });
                        clearInterval(interId);
                    }
                }, 200)
            })
        },
        openCan () {
            this.modal2 = true;
        },
        modifyMobile () {
            this.isMobile = true
        },
        onCancel () {
            this.btnDisabled = true;
        },
        setTiming() {
            let bingTime = 60
            // this.textType = false;
            this.initInterval = setInterval(() => {
                this.bindingText = bingTime-- + 's'
                if (bingTime < 1) {
                    clearInterval(this.initInterval)
                    this.btnDisabled = true;
                    this.bindingText = '验证码'
                }
            }, 1000)
        },
        // 获取验证码
        async getMobileCodeData() {
            if (!this.setMobile.OldPhoneNumber) {
                this.$Message.warning('请填写手机号！');
                return false
            }
            if (!this.setMobile.NewPhoneNumber) {
                this.$Message.warning('请填写新手机号！');
                return false
            }
            if (!this.btnDisabled) {
                return false
            }
            let queryData = {
                MobileNumber: this.setMobile.NewPhoneNumber,
                SendType: 0,
                OperationType: 2
            }
            let msg = await getMobileCode(queryData);
            if (msg) {
                this.btnDisabled = false;
                this.$Message.success("验证码已发送！");
                this.setTiming()
            }
        },
        // 修改手机号
        saveewPhone () {
            this.$refs['ruleMobile'].validate(async (valid) => {
                if (valid) {
                    let msg = await SetChangeMobile(this.setMobile);
                    if (msg) {
                        this.$Message.success('手机号修改成功！');
                        this.isMobile = false
                    }
                }
            })
        },
        modifyPwd () {
            this.isPwd = true
        },
        // 设置新密码验证码
        getMobilePwdData () {
            if (!this.userPwd.mobile) {
                this.$Message.warning('请填写手机号！');
                return false
            }
            let queryData  = {
                MobileNumber: this.userPwd.mobile,
                SendType: 0,
                OperationType: 1
            }
            let msg = getMobileCode(queryData);
            if (msg) {
                this.$Message.success("验证码已发送！");
                this.setTiming()
            }
        },
        async setUserPwd () {
            let queruys = {
                    mobile: this.userPwd.mobile,
                    mobileVerifyCode: this.userPwd.MobileVerifyCode,
                    newPwd: this.userPwd.NewPwd,
                    affirmNewPwd: this.userPwd.NewPwd
                }
                let msg = await ResetPwd(queruys)
                if (msg) {
                    this.$Message.success('密码修改成功！');
                    this.isPwd = false
                    this.userPwd ={
                        mobile: "",
                        MobileVerifyCode: "",
                        NewPwd: ""
                    }
                }
        },
        // 用户注销
        async closeAccount () {
            if (this.agreement) {
                let msg = await writOffUser();
                if (msg) {
                    this.$Message.warning("请先同意注销协议");
                }
            } else {
                this.$Message.success("请先同意注销协议");
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .agreement {
        max-height: 450px;
        overflow-y: auto;
        overflow-x: hidden;
        &-check {
            text-align: center;
        }
        .agreement-check-name {
            font-size: 14px;
            font-weight: bold;
        }
    }
    .security {
        li {
            border-bottom: 1px solid #eaeaea;
            display: flex;
            justify-content: space-between;
            margin: 10px;
            padding-bottom: 10px;
            .security-txt {
                line-height: 30px;
                &-title {
                    display: inline-block;
                    width: 65px;
                    text-align: left;
                }
            }
        }
    }
</style>