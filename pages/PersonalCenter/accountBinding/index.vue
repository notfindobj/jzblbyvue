<template>
    <div class="message">
        <!-- 手机号 -->
       <div class="message-items message-items-text">
           <div class="message-items-left">
               <span class="message-items-left-label">手机号</span>
           </div>
           <div class="message-items-right">
                <span v-if="cellPhone">绑定手机号可使用手机号直接登录</span>
                <div v-if="!cellPhone" class="message-items-right-edit">
                    <div class="means">
                        <div class="means-left">
                            绑定手机号可使用手机号直接登录
                        </div>
                    </div>
                    <div  class="means">
                        <div class="means-left">
                            <span class="means-left-label">旧手机号：</span>
                            <Input type="text" style="width: 160px;" v-model="setMobile.OldPhoneNumber" size="small" />
                        </div>
                    </div>
                    <div  class="means">
                        <div >
                            <span class="means-left-label">新手机号：</span>
                            <Input type="text" style="width: 160px;" v-model="setMobile.NewPhoneNumber" size="small" />
                            <span class="cerificationCode" @click="getMobileCodeData">{{bindingText}}</span>
                        </div>
                    </div>
                    <div class="means">
                        <div class="means-left">
                            <span class="means-left-label">验证码：</span>
                            <Input type="text" style="width: 160px;" v-model="setMobile.VerificationCode" size="small" />
                            
                        </div>
                    </div>
                    <div class="message-items-right-save">
                        <div class="modifying-head" @click="changeNumber">保存</div>
                        <div class="modifying-cancel">取消</div>
                    </div>
                </div>
           </div>
           <div class="message-items-operation" @click="cellPhone = !cellPhone">{{cellPhone ?"编辑" : "收起"}}</div>
        </div>
        <!-- qq号 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">qq号</span>
            </div>
            <div class="message-items-right">
                <span>未绑定</span>
            </div>
            <div class="message-items-operation">编辑</div>
        </div>
        <!-- 微信 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">微信</span>
            </div>
            <div class="message-items-right">
                <span>未绑定</span>
            </div>
            <div class="message-items-operation" @click="bindingWX">绑定</div>
        </div>
        <!-- 邮箱绑定 -->
        <!-- <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">邮箱绑定</span>
            </div>
            <div class="message-items-right">
                <span v-if="mailbox">绑定邮箱后可使用电子邮箱重置密码</span>
                 <div v-if="!mailbox" class="message-items-right-edit">
                    <div class="means">
                        <div class="means-left">
                            绑定手机号可使用手机号直接登录
                        </div>
                    </div>
                    <div  class="means">
                        <div>
                            <span class="means-left-label">邮箱：</span>
                            <Input type="text" style="width: 160px;" size="small" />
                            <span class="cerificationCode">获取验证码</span>
                        </div>
                    </div>
                    <div class="means">
                        <div class="">
                            <span class="means-left-label">验证码：</span>
                            <Input type="text" style="width: 160px;" size="small" />
                        </div>
                    </div>
                    <div class="message-items-right-save">
                        <div class="modifying-head">保存</div>
                        <div class="modifying-cancel">取消</div>
                    </div>
                </div>
            </div>
            <div class="message-items-operation" @click="mailbox = !mailbox">{{mailbox ?"编辑" : "收起"}}</div>
        </div> -->
        <!-- 支付宝 -->
        <!-- <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">支付宝</span>
            </div>
            <div class="message-items-right">
                <span>未绑定</span>
            </div>
            <div class="message-items-operation">编辑</div>
        </div> -->
    </div>
</template>
<script>
import {loginByWX, bindingByWX, SetChangeMobile, getMobileCode} from '../../../service/clientAPI'
import { mapState } from 'vuex'
export default {
    data () {
        return {
            cellPhone:  true,
            mailbox: true,
            isTime: false,
            bindingText: '获取验证码',
            setMobile: {
                OldPhoneNumber: '',
                NewPhoneNumber: '',
                VerificationCode: ''
            }
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.overas.auth
        }),
    },
    methods: {
        async bindingWX () {
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
                }).then(res => {
                    // if (!res.token) {
                    //         this.$store.dispatch('WXREGISTER', res);
                    //         this.goToRegister('register');
                    // } else {
                    //     localStorage.removeItem('code');
                    //     localStorage.removeItem('state');
                    //     this.$store.dispatch('LOGININ', res);
                    //     localStorage.setItem('LOGININ', JSON.stringify(res))
                    //     this.$store.dispatch('SETUP', false)
                    //     this.$Message.success('登录成功');
                    // }
                });
                clearInterval(interId);
                }
            }, 2000)
            })
        },
        // 打开登录窗口 type 1 qq登录 2 微信登录
        loginAtQQ(url, type) {
            const LEFT = (window.screen.width - 685) / 2;
            const TOP = (window.screen.height - 555) / 2;
            return window.open(url,'oauth2Login_qq','height=555,width=685, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes, top=' + TOP + ', left=' + LEFT);
        },
        async changeNumber () {
            if (!this.setMobile.VerificationCode) {
                this.$Message.warning('验证码不能为空！');
                return false
            }
            let msg= await SetChangeMobile(this.setMobile);
            if (msg) {
                this.cellPhone = !this.cellPhone;
                this.$Message.success('手机号修改成功！');
            }
        },
        async getMobileCodeData () {
            if (!this.setMobile.OldPhoneNumber) {
                this.$Message.warning('请填写手机号！');
                return false
            }
            if (!this.setMobile.NewPhoneNumber) {
                this.$Message.warning('请填写新手机号！');
                return false
            }
            if (this.isTime) {
                return false
            }
            let queryData  = {
                MobileNumber: this.setMobile.NewPhoneNumber,
                SendType: 0,
                OperationType: 2
            }
            let msg = await getMobileCode(queryData);
            if (msg) {
                this.isTime = true;
                this.$Message.success("验证码已发送！");
                this.setTiming()
            }
        },
        setTiming () {
            let bingTime = 60
            this.textType = false;
            this.initInterval = setInterval (() => {
                this.bindingText =  bingTime-- + 's'
                if (bingTime < 1) {
                    clearInterval(this.initInterval)
                    this.isTime = false;
                    this.bindingText = '获取验证码'
                }
            }, 1000) 
        },
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
                }
                &-fill {
                    color: #FF3C00;
                    cursor: pointer;
                }
                &-edit {
                    // margin-top: 30px;
                    &-lable {
                        margin-left: 15px;
                        font-size: 14px;
                        color: #999999;
                    }
                    &:first-child {
                        margin-top: 0;
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
                width: 80px;
                display: inline-block;
            }
        }
        &-right {
            flex: 1;
        }
        &-textarea {
            width: 98%;
        }
        
    }
    .cerificationCode {
        color: #FFFFFF;
        padding: 5px 15px;
        background: #3E85FF;
        border-radius: 3px;
        cursor: pointer;
        margin-left: 10px;
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
</style>
``