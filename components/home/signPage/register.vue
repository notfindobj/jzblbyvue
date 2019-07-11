<template>
    <div>
        <Form :model="registeredItem" :label-width="0">
            <FormItem>
                <Input v-model="registeredItem.mobile" size="large" type="text" placeholder="请输入手机号码"/>
            </FormItem>
            <FormItem>
                <Input v-model="registeredItem.authcode" size="large" placeholder="请输入验证码">
                    <Button :disabled="isDisabled" :class="!isDisabled ? 'getMobile' : 'defMobile'" slot="append"
                            size="large" type="primary" @click="getMobile">{{enterButtonText}}
                    </Button>
                </Input>
            </FormItem>
            <FormItem>
                <Input v-model="registeredItem.password" size="large" type="password" placeholder="请设置密码"/>
            </FormItem>
            <FormItem>
                <Input v-model="registeredItem.passWordAgain" size="large" type="password" placeholder="再次输入密码"/>
            </FormItem>
            <FormItem>
                <Checkbox v-model="registeredItem.isAgree">我已阅读并同意用户协议</Checkbox>
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
  import { getMobileCode, registerUser } from '../../../service/clientAPI'

  export default {
    data() {
      return {
        registeredItem: {
          name: '',
          mobile: '',
          password: '',
          authcode: '',
          passWordAgain: '',
          singuptype: 0,
          state: '',
          isAgree: false
        },
        enterButtonText: '获取验证码',
        enterButtonTime: '',
        isDisabled: false
      }
    },

    mounted() {
      if (this.$store.state.overas.wxRegister.Name) {
        this.$set(this.registeredItem, 'name', this.$store.state.overas.wxRegister.Name);
        this.$set(this.registeredItem, 'singuptype', this.$store.state.overas.wxRegister.OpCode);
        this.$set(this.registeredItem, 'state', this.$store.state.overas.wxRegister.State);
        localStorage.removeItem('code');
        localStorage.removeItem('state');
      }
    },

    methods: {
      // 获取验证码
      async getMobile() {
        let queruys = {
          OperationType: 0,
          SendType: 0,
          MobileNumber: this.registeredItem.mobile
        };
        if (!this.registeredItem.mobile) {
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
              }
              ;
            }, 1000)
          }
        }
      },
      async register() {
        if (!this.registeredItem.isAgree) {
          this.$Message.warning('请先阅读并同意用户协议');
          return false;
        }
        let queruyDate = {
          name: this.registeredItem.name,
          mobile: this.registeredItem.mobile,
          authcode: this.registeredItem.authcode,
          password: this.registeredItem.password,
          singuptype: this.registeredItem.singuptype,
          state: this.registeredItem.state
        }
        let msg = await registerUser(queruyDate)
        if (msg) {
          this.$Message.success('注册成功！');
          this.$store.dispatch('LOGGEDIN', 'signIn');
        }
      },
      goToSignIn(val) {
        this.$store.dispatch('LOGGEDIN', val);
      }
    }
  }
</script>
<style lang="less" scoped>
    .desabled-btn {
        width: 100%;
    }

    .registered-some {
        line-height: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

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

    .getMobile {
        background: #FF3C00 !important;
        width: 100px;
        color: #ffffff !important;
    }

    .defMobile {
        width: 100px;
    }
</style>
