<template>
    <div>
        <Form :model="registeredItem" :label-width="0">
            <template v-if="nextSteps === 0">
                <FormItem>
                    <Input v-model="registeredItem.mobile" size="large"  type="text" placeholder="请输入手机号码"/>
                </FormItem>
                <FormItem>
                    <Input v-model="registeredItem.mobileVerifyCode" size="large" placeholder="请输入验证码">
                        <Button :disabled="isDisabled"  :class="!isDisabled ? 'getMobile' : 'defMobile'" slot="append"  size="large" type="primary" @click="getMobile">{{enterButtonText}}</Button>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" :disabled="registeredItem.mobileVerifyCode.length < 6" class="desabled-btn" @click="nextStep">下一步</Button>
                </FormItem>
            </template>
            <template v-if="nextSteps === 1">
                <FormItem>
                    <Input v-model="registeredItem.newPwd" type="password" size="large" placeholder="请输入8-20位数字与字母"/>
                </FormItem>
                <FormItem>
                    <Input v-model="registeredItem.affirmNewPwd" type="password" size="large" placeholder="确认密码"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" :disabled="registeredItem.affirmNewPwd.length < 6" class="desabled-btn" @click="nextStep">下一步</Button>
                </FormItem>
            </template>
        </Form>
        <div v-if="nextSteps === 2">
            <div class="registered-true-con">
                <div class="registered-true-img"></div>
            </div>
            <p class="registered-true-tip">请妥善保存您的密码！</p>
            <Button type="primary" size="large" class="desabled-btn" @click="nextSignIn">马上登录</Button>
        </div>
    </div>
</template>
<script>
import {getMobileCode, ResetPwd} from '../../../service/clientAPI'
export default {
    data () {
        return {
            nextSteps: 0,
            registeredItem: {
                mobile: '',
                mobileVerifyCode: '',
                newPwd: '',
                affirmNewPwd: ''
            },
            enterButtonText: '获取验证码',
            enterButtonTime: '',
            isDisabled: false
        }
    },
    methods: {
        async getMobile () {
            // 获取验证码
            let queruys = {
                OperationType: '1',
                SendType: 0,
                MobileNumber: this.registeredItem.mobile
            }
            if (!this.registeredItem.mobile) {
                this.$Message.warning('请输入手机号')
                return false
            };
            let mobile = await getMobileCode(queruys)
            if (mobile) {
                this.$Message.success('信息已发送，请注意查收！');
                // 倒计时
                if (!this.enterButtonTime) {
                    let enterButton = 60;
                    this.isDisabled = true;
                    this.enterButtonTime =  setInterval( () =>{
                        enterButton = enterButton -1
                        this.enterButtonText =  enterButton + 'S'
                        if (enterButton <=0 ) {
                            clearInterval(this.enterButtonTime)
                            this.enterButtonTime = ''
                            this.isDisabled = false;
                            this.enterButtonText = '获取验证码'
                        };
                    }, 1000) 
                }
            }
        },
        async nextStep (){
            if (this.nextSteps === 1) {
                let queruys = {
                    mobile: this.registeredItem.mobile,
                    mobileVerifyCode: this.registeredItem.mobileVerifyCode,
                    newPwd: this.registeredItem.newPwd,
                    affirmNewPwd: this.registeredItem.affirmNewPwd
                }
                let msg = await ResetPwd(queruys)
                if (msg) {
                    this.$Message.success('密码修改成功！');
                    this.nextSteps++
                }
            }
            if (this.nextSteps === 0) {
                this.nextSteps++
            }
        },
        nextSignIn () {
            this.$store.dispatch('LOGGEDIN', 'signIn');
            this.nextSteps= 0
        }
    }
}
</script>
<style lang="less" scoped>
    .desabled-btn {
        width: 100%;
    }
    .registered-true-con{
        width: 100%;
        height: 112px;
        margin-bottom: 9px;
        .registered-true-img{
          width: 112px;
          height: 112px;
          margin: 0 auto;
          background: url("../../../assets/images/registered-true.png") no-repeat center;
        }
    }
    .registered-true-tip{
        height: 22px;
        line-height: 22px;
        text-align: center;
        font-size: 16px;
        color: #333333;
        margin-bottom: 40px;
    }
    .getMobile {
        background: #FF3C00 !important;
        width: 100px;
        color: #ffffff  !important;
    }
    .defMobile {
        width: 100px;
    }
</style>
