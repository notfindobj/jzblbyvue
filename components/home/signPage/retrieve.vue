<template>
    <div>
        <Form :model="registeredItem" :label-width="0">
            <template v-if="nextSteps === 0">
                <FormItem>
                    <Input v-model="registeredItem.mobile" size="large"  type="text" placeholder="请输入手机号码"/>
                </FormItem>
                <FormItem>
                    <Input v-model="registeredItem.authcode" search  size="large" enter-button="获取验证码" @on-search = "getMobile" placeholder="请输入验证码" />
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" class="desabled-btn" @click="nextStep">下一步</Button>
                </FormItem>
            </template>
            <template v-if="nextSteps === 1">
                <FormItem>
                    <Input v-model="registeredItem.mobile" size="large"  type="text" placeholder="请输入8-20位数字与字母"/>
                </FormItem>
                <FormItem>
                    <Input v-model="registeredItem.authcode" search  size="large" enter-button="获取验证码" @on-search = "getMobile" placeholder="请输入验证码" />
                </FormItem>
                <FormItem>
                    <Button type="primary" size="large" class="desabled-btn" @click="nextStep">下一步</Button>
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
export default {
    data () {
        return {
            nextSteps: 0,
            registeredItem: {
                mobile: '',
                authcode: ''
            }
        }
    },
    methods: {
        getMobile () {

        },
        nextStep (){
            this.nextSteps++
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
</style>
