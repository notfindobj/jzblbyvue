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
                                <span>1234****909</span>
                        </div>
                    </div>
                    <div  class="means">
                        <div >
                            <span class="means-left-label">新手机号：</span>
                            <Input type="text" style="width: 160px;" size="small" />
                            <span class="cerificationCode">获取验证码</span>
                        </div>
                    </div>
                    <div class="means">
                        <div class="means-left">
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
        <div class="message-items message-items-text">
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
        </div>
        <!-- 支付宝 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">支付宝</span>
            </div>
            <div class="message-items-right">
                <span>未绑定</span>
            </div>
            <div class="message-items-operation">编辑</div>
        </div>
    </div>
</template>
<script>
import {bindingByWX} from '../../../service/clientAPI'
export default {
    data () {
        return {
            cellPhone:  true,
            mailbox: true
        }
    },
    methods: {
        async bindingWX () {
            let msg = await bindingByWX()
            if (msg) {
                window.open(msg)
            }
        }
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
                    margin-top: 30px;
                    &-lable {
                        margin-left: 15px;
                        font-size: 14px;
                        color: #999999;
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
