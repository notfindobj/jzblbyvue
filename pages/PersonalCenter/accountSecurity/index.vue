<template>
    <div class="message">
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">登录密码</span>
            </div>
            <div class="message-items-right">
                <span v-if="account">建议您经常修改密码，以保障账号安全</span>
                <div v-if="!account" class="message-items-right-edit">
                    <div class="means">
                        <div class="means-left">
                            建议您经常修改密码，以保障账号安全
                        </div>
                    </div>
                    <div  class="means">
                        <div >
                            <span class="means-left-label">手机号码：</span>
                            <Input type="text" style="width: 160px;" size="small" />
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">验证码：</span>
                            <Input type="text" style="width: 160px;" size="small" />
                            <span class="cerificationCode">获取验证码</span>
                        </div>
                    </div>
                    <div  class="means">
                        <div >
                            <span class="means-left-label">新密码：</span>
                            <Input type="text" style="width: 160px;" size="small" />
                        </div>
                    </div>
                    <div class="message-items-right-save">
                        <div class="modifying-head">更改密码</div>
                        <div class="modifying-cancel">取消</div>
                    </div>
                </div>
            </div>
            <div class="message-items-operation" @click="account = !account">{{account ?"编辑" : "收起"}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            account: true
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
