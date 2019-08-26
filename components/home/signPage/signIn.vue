<template>
    <div>
        <Form ref="formInline" :model="userItem" :label-width="0">
            <FormItem prop="userName">
                <Input v-model="userItem.mobile" size="large" type="text" placeholder="请输入手机号码"/>
            </FormItem>
            <FormItem prop="passWord">
                <Input v-model="userItem.password" size="large" type="password" placeholder="请输入密码" @keyup.enter.native="handleSubmit"/>
            </FormItem>
            <FormItem>
                <Button type="primary" size="large" class="desabled-btn" @click="handleSubmit">登录</Button>
            </FormItem>
        </Form>
        <div class="sign-some">
            <p>
                <span>没有账户，</span>
                <!-- <span @click="goToRegister('register')" style="cursor: pointer;">免费注册</span> -->
                <span @click="goToRegister('perOrCom')" style="cursor: pointer;">免费注册</span>
            </p>
            <p @click="retrieve('retrieve')">忘记密码？</p>
        </div>
        <div class="third-party">第三方登录</div>
        <div class="third-party-iocn">
            <i class="icon iconfont" @click="handleLoginByWX">&#xe73b;</i>
            <i class="icon iconfont" @click="handleLoginByQQ">&#xe73e;</i>
        </div>
        <!-- <div class="block-none">
            您好！此网站暂未对外开放，了解更多请联系：15121173536
        </div> -->
    </div>
</template>
<script>
    import { lognIn, loginByQQ, loginByWX, getUserByWX, getUserByQQ } from '../../../service/clientAPI'
    import { login } from '../../../LocalAPI'

    export default {
        data() {
            return {
                userItem: {
                    // mobile: '18321284508',
                    mobile: '',
                    // password: '123456'
                    password: ''
                },
                ruleInline: {
                    mobile: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    passWord: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        {
                            type: 'string',
                            min: 6,
                            message: 'The password length cannot be less than 6 bits',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        methods: {
            // qq登录
            handleLoginByQQ() {
                if (localStorage.getItem('code') || localStorage.getItem('state')) {
                    localStorage.removeItem('code');
                    localStorage.removeItem('state');
                }
                loginByQQ().then(res => {
                    const qqWindow = this.loginAtQQ(res, 1);
                    const interId = setInterval(() => {
                        const code = localStorage.getItem('code');
                        const state = localStorage.getItem('state');
                        if (code && state) {
                            qqWindow.close();
                            getUserByQQ({
                                code,
                                state
                            }).then(res => {
                                if (!res.token) {
                                    this.$store.dispatch('WXREGISTER', res);
                                    this.goToRegister('register');
                                } else {
                                    localStorage.removeItem('code');
                                    localStorage.removeItem('state');
                                    this.$store.dispatch('LOGININ', res);
                                    localStorage.setItem('LOGININ', JSON.stringify(res))
                                    this.$store.dispatch('SETUP', false)
                                    this.$Message.success('登录成功');
                                }
                            });
                            clearInterval(interId);
                        }
                    }, 200)
                })
            },
            // 微信登录
            handleLoginByWX() {
                if (localStorage.getItem('code') || localStorage.getItem('state')) {
                    localStorage.removeItem('code');
                    localStorage.removeItem('state');
                }
                loginByWX().then(res => {
                    const wxWindow = this.loginAtQQ(res, 2);
                    const interId = setInterval(() => {
                        const code = localStorage.getItem('code');
                        const state = localStorage.getItem('state');
                        if (code && state) {
                            wxWindow.close();
                            getUserByWX({
                                code,
                                state
                            }).then(res => {
                                if (!res.token) {
                                    this.$store.dispatch('WXREGISTER', res);
                                    this.goToRegister('register');
                                } else {
                                    localStorage.removeItem('code');
                                    localStorage.removeItem('state');
                                    this.$store.dispatch('LOGININ', res);
                                    localStorage.setItem('LOGININ', JSON.stringify(res))
                                    this.$store.dispatch('SETUP', false)
                                    this.$Message.success('登录成功');
                                }
                            });
                            clearInterval(interId);
                        }
                    }, 200)
                })
            },
            // 打开登录窗口 type 1 qq登录 2 微信登录
            loginAtQQ(url, type) {
                const LEFT = (window.screen.width - 685) / 2;
                const TOP = (window.screen.height - 555) / 2;
                return window.open(url, 'oauth2Login_qq', 'height=555,width=685, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes, top=' + TOP + ', left=' + LEFT);
            },
            goToRegister(val) {
                this.$store.dispatch('LOGGEDIN', val);
            },
            retrieve(val) {
                this.$store.dispatch('LOGGEDIN', val);
            },
            async handleSubmit() {
                let postData = {
                    mobile: this.userItem.mobile,
                    password: this.userItem.password
                }
                let msg = await login(postData);
                if (msg) {
                    // ApprovedType 0 审核中 1 不通过
                    if (msg.ApprovedType === 0) {
                        this.$Message.warning('您的企业账号还在审核中，请耐心等待！');
                        return false
                    } 
                    if (msg.ApprovedType === 1) {
                        localStorage.setItem('entInfo', JSON.stringify(msg.entInfo));
                        this.$store.dispatch('LOGGEDIN', 'comReg');
                    } else {
                        this.$store.dispatch('LOGININ', msg);
                        localStorage.setItem('LOGININ', JSON.stringify(msg))
                        this.$store.dispatch('SETUP', false)
                        this.$Message.success('登录成功！');
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .ivu-modal-body {
        padding: 40px 30px 20px 30px;
    }

    .block-none {
        position: absolute;
        top: 210px;
        left: 0;
        width: 100%;
        height: 91px;
        padding-top: 15px;
        background-color: #ff3c00;
        color: #fff;
        font-size: 18px;
        text-align: center;
    }

    .desabled-btn {
        width: 100%;
    }

    .sign-some {
        line-height: 20px;
        margin-bottom: 25px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        > p {
            font-size: 14px;
            color: #999999;

            &:nth-child(1) {
                flex: 1;

                span {
                    &:nth-child(2) {
                        color: #FF3C00;
                    }
                }
            }

            &:nth-child(2) {
                width: 70px;
            }
        }
    }

    .third-party {
        line-height: 17px;
        font-size: 12px;
        color: #999999;
        text-align: center;
        margin-bottom: 20px;
        position: relative;

        &:before {
            width: 135px;
            height: 1px;
            content: '';
            background: #D8D8D8;
            position: absolute;
            left: 0;
            top: 6px;
        }

        &:after {
            width: 135px;
            height: 1px;
            content: '';
            background: #D8D8D8;
            position: absolute;
            right: 0;
            top: 6px;
        }
    }

    .third-party-iocn {
        padding: 0 110px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        > i {
            display: block;
            font-size: 35px;
            cursor: pointer;

            &:first-child {
                color: #6CB37A;
            }

            &:last-child {
                color: #54A4D8;
            }
        }
    }
</style>
