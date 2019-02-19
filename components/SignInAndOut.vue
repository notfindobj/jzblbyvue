<template>
  <div class="sign-mask">
    <!----------------------------------------登录----------------------------------------------->
    <div class="sign-box default-box" v-if="isSignIn">
      <i class="close-icon">X</i>
      <h4 class="sign-in-title">用户登录</h4>
      <input class="sign-input" type="text" placeholder="请输入手机号码">
      <input class="sign-input" type="password" placeholder="请输入密码">
      <div class="btn mb15 desabled-btn">登录</div>
      <div class="sign-some">
        <p>
          <span>没有账户，</span>
          <span>免费注册</span>
        </p>
        <p>忘记密码？</p>
      </div>
      <div class="third-party">第三方登录</div>
      <div class="third-party-iocn">
        <i></i>
        <i></i>
      </div>
    </div> 
    <!----------------------------------------注册----------------------------------------------->
    <div class="default-box registered-box"  v-if="isRegistered">
      <i class="close-icon">X</i>
      <h4 class="sign-in-title">注册</h4>
      <input class="sign-input" type="text" placeholder="请输入手机号码">
      <div class="validation-box">
        <input class="sign-input" type="text" placeholder="请输入验证码">
        <div class="get-validation">获取验证码</div>
      </div>
      <input class="sign-input" type="password" placeholder="请设置密码">
      <input class="sign-input mb15" type="password" placeholder="再次输入密码">
      <div class="agreement-look"><input class="agreed" type="checkbox"/>我已同意并阅读用户协议</div>
      <div class="btn mb15 desabled-btn">注册</div>
      <div class="registered-some">
        <p>
          <span>已有账号，</span>
          <span>马上登录</span>
        </p>
      </div>
    </div>
    <!----------------------------------------注册成功----------------------------------------------->
    <div class="default-box registered-true-box"  v-if="isRegisteredTrue">
      <i class="close-icon">X</i>
      <h4 class="sign-in-title">注册成功</h4>
      <div class="registered-true-con">
        <div class="registered-true-img"></div>
      </div>
      <p class="registered-true-tip">请妥善保存您的密码！</p>
      <div class="btn mb15">马上登录</div>
    </div>
    <!----------------------------------------忘记密码----------------------------------------------->
    <div class="default-box forget-password-box"  v-if="isForgetPassword">
      <i class="close-icon">X</i>
      <h4 class="sign-in-title">忘记密码</h4>
      <input class="sign-input" type="text" placeholder="请输入手机号码">
      <div class="validation-box">
        <input class="sign-input" type="text" placeholder="请输入验证码">
        <div class="get-validation">获取验证码</div>
      </div>
      <div class="btn mb15 desabled-btn" @click="nextStep">下一步</div>
    </div>
    <!----------------------------------------重设密码----------------------------------------------->
    <div class="default-box registered-box"  v-if="isResetPassword">
      <i class="close-icon">X</i>
      <h4 class="sign-in-title">重设密码</h4>
      <input class="sign-input" type="text" placeholder="请输入8-20位数字与字母">
      <input class="sign-input" type="password" placeholder="确认密码">
      <div class="btn mb15 desabled-btn" @click="resetPassworTrue">下一步</div>
    </div>
    <!----------------------------------------重设密码成功----------------------------------------------->
    <div class="default-box registered-true-box"  v-if="isResetPassworTrue">
      <i class="close-icon">X</i>
      <h4 class="sign-in-title">重设密码成功</h4>
      <div class="registered-true-con">
        <div class="registered-true-img"></div>
      </div>
      <p class="registered-true-tip">请妥善保存您的密码！</p>
      <div class="btn mb15">马上登录</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SignInAndOut',
    data() {
      return {
        isSignIn:false,
        isRegistered:false,
        isRegisteredTrue:false,
        isResetPassworTrue:false,
        isForgetPassword:true,
        isResetPassword:false
      }
    },
    components: {
    },
    mounted() {
    },
    methods: {
      nextStep () {
        this.isResetPassword = true;
        this.isForgetPassword = false;
      },
      resetPassworTrue () {
        this.isResetPassworTrue = true;
        this.isResetPassword = false;
      }
    },
  }
</script>
<style lang="scss" scoped>
  .sign-mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.3);
    position: fixed;
    left:0;
    top:0;
    z-index: 999;
    .default-box{
      width: 400px;
      height: auto;
      background: #ffffff;
      border-radius: 5px;
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      padding: 35px 30px 30px;
      position: absolute;
      .close-icon{
        display: block;
        width: 25px;
        height: 25px;
        position: absolute;
        right: 30px;
        top:20px;
      }
      .sign-in-title{
        font-size: 20px;
        line-height: 28px;
        color: #333333;
        text-align: center;
        margin-bottom: 40px;
      }
      .sign-input{
        width: 100%;
        height: 44px;
        font-size: 16px;
        color: #999999;
        text-indent: 10px;
        box-sizing: border-box;
        border: 1px solid #CCCCCC;
        border-radius: 3px;
        margin-bottom: 30px;
      }
      .mb15{
        margin-bottom: 15px;
      }
      .btn{
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-size: 16px;
        background: #FF3C00;
        color: #FFFFFF;
        border-radius: 4px;
      }
      .desabled-btn{
        opacity: 0.3;
        background: #FF3C00;
      }
    }
    .sign-box{
      .sign-some{
        line-height: 20px;
        margin-bottom: 25px;
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
          background: url("../assets/images/weixin.png") no-repeat center;
        }
      }
    }
    .registered-box{
      .validation-box{
        position: relative;
        .get-validation{
          height: 42px;
          width: 72px;
          text-align: center;
          line-height: 42px;
          font-size: 14px;
          color: #FF3C00;
          position: absolute;
          top: 0;
          right: 12px;
          cursor: pointer;
        }
      }
      .agreement-look{
        height: 17px;
        line-height: 17px;
        font-size: 12px;
        color: #CCCCCC;
        margin-bottom: 15px;
        .agreed{
          margin-right: 5px;
        }
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
    }
    .registered-true-box{
      .registered-true-con{
        width: 100%;
        height: 112px;
        margin-bottom: 9px;
        .registered-true-img{
          width: 112px;
          height: 112px;
          margin: 0 auto;
          background: url("../assets/images/registered-true.png") no-repeat center;
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
    }
    .forget-password-box{
      .validation-box{
        position: relative;
        .get-validation{
          height: 42px;
          width: 72px;
          text-align: center;
          line-height: 42px;
          font-size: 14px;
          color: #FF3C00;
          position: absolute;
          top: 0;
          right: 12px;
          cursor: pointer;
        }
      }
    }
  }
  .mb15{
    margin-bottom: 15px;
  }
</style>
