<template>
    <div>
        <Form :model="registeredItem" :label-width="0">
            <FormItem>
                <Input v-model="registeredItem.mobile" size="large"  type="text" placeholder="请输入手机号码"/>
            </FormItem>
            <FormItem>
                <Input v-model="registeredItem.authcode" search  size="large" enter-button="获取验证码" @on-search = "getMobile" placeholder="请输入验证码" />
            </FormItem>
            <FormItem>
                <Input v-model="registeredItem.password" size="large"  type="password" placeholder="请设置密码"/>
            </FormItem>
            <FormItem>
                <Input v-model="registeredItem.passWordAgain" size="large"  type="password" placeholder="再次输入密码"/>
            </FormItem>
            <FormItem>
                <Checkbox v-model="registeredItem.state">我已同意并阅读用户协议</Checkbox>
            </FormItem>
            <FormItem>
                <Button type="primary" size="large" class="desabled-btn" @click="register">注册</Button>
            </FormItem>
        </Form>
        <div class="registered-some">
            <p>
                <span>已有账号，</span>
                <span @click="goToSignIn('signIn')" style="cursor: pointer;">马上登录</span>
            </p>
      </div>
    </div>
</template>
<script>
import {getMobileCode, registerUser} from '../../../service/clientAPI'
export default {
    data () {
        return{
            registeredItem: {
                name: '',
                mobile: '',
                password: '',
                authcode: '',
                passWordAgain: '',
                single: false
            }
        }
    },
    methods:{
        // 获取验证码
       async getMobile () {
            let queruys = {
            OperationType: 0,
            SendType: 0,
            MobileNumber: this.registeredItem.mobile
        }
        let mobile = await getMobileCode(queruys)
        console.log(mobile)
      },
      async register () {
            let queruyDate = {
                name: this.registeredItem.mobile,
                mobile: this.registeredItem.mobile,
                authcode: this.registeredItem.authcode,
                single: this.registeredItem.single,
                password: this.registeredItem.password,
                singuptype: 1,
                logintype: 0
            }
            let mes = await registerUser(queruyDate)
            console.log(mes)
      },
      goToSignIn (val) {
          this.$store.dispatch('LOGGEDIN', val);
      }
    }
}
</script>
<style lang="less" scoped>
    .desabled-btn {
        width: 100%;
    }
    .registered-some{
        line-height: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        >p{
          font-size: 14px;
          color: #999999;
          &:nth-child(1){
            flex: 1;
            span{
              &:nth-child(2){
                color: #FF3C00;
              }
            }
          }
          &:nth-child(2){
            width: 70px;
          }
        }
      }
</style>
