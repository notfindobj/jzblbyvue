<template>
    <div>
        <Form ref="formInline" :model="userItem" :label-width="0">
            <FormItem prop="userName">
            <Input v-model="userItem.mobile" size="large" type="text" placeholder="请输入手机号码"/>
            </FormItem>
            <FormItem prop="passWord">
            <Input v-model="userItem.password" size="large"  type="password" placeholder="请输入密码"/>
            </FormItem>
            <FormItem>
                <Button type="primary" size="large" class="desabled-btn" @click="handleSubmit">登录</Button>
            </FormItem>
        </Form>
        <div class="sign-some">
            <p>
                <span>没有账户，</span>
                <span @click="goToRegister('register')" style="cursor: pointer;">免费注册</span>
            </p>
            <p @click="retrieve('retrieve')">忘记密码？</p>
        </div>
        <div class="third-party">第三方登录</div>
        <div class="third-party-iocn">
            <i></i>
            <i></i>
        </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import {lognIn} from '../../../service/clientAPI'
export default {
    data () {
        return {
            userItem: {
                mobile: '18321284508',
                password: '123456'
            },
            ruleInline: {
                mobile: [
                    { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                    { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        goToRegister (val) {
            this.$store.dispatch('LOGGEDIN', val);
        },
        retrieve (val) {
            this.$store.dispatch('LOGGEDIN', val);
        },
        async handleSubmit () {
            let postData = {
                mobile: this.userItem.mobile,
                password: this.userItem.password
            }
            let config = {
                url: process.env.NODE_ENV === 'production' ? 'http://192.210.170.17:8889/front/mobileLogin' : 'http://127.0.0.1:8889/front/mobileLogin',
                withCredentials: true,
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify(postData)
            }
            axios(config)
            .then(res => {
                this.$store.dispatch('LOGININ', res.data.Data);
                localStorage.setItem('LOGININ', JSON.stringify(res.data.Data))
                this.$store.dispatch('SETUP',  false)
                this.$Message.success(res.data.Msg);
            })
        }
    }
}
</script>
<style lang="less" scoped>
    .ivu-modal-body {
        padding: 40px 30px 20px 30px;
    }
    .desabled-btn {
        width: 100%;
    }
    .sign-some{
        line-height: 20px;
        margin-bottom: 25px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
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
    .third-party{
        line-height: 17px;
        font-size: 12px;
        color: #999999;
        text-align: center;
        margin-bottom: 20px;
        position: relative;
        &:before{
          width: 135px;
          height: 1px;
          content: '';
          background: #D8D8D8;
          position: absolute;
          left: 0;
          top:6px;
        }
        &:after{
          width: 135px;
          height: 1px;
          content: '';
          background: #D8D8D8;
          position: absolute;
          right: 0;
          top:6px;
        }
      }
      .third-party-iocn{
        padding: 0 110px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        >i{
          display: block;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: url("../../../assets/images/weixin.png") no-repeat center;
        }
      }
</style>
