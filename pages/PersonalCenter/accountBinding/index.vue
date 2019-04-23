<template>
    <div class="message">
       <div class="message-items message-items-text">
           <div class="message-items-left">
               <span class="message-items-left-label">手机号</span>
           </div>
           <div class="message-items-right">
              <span>绑定手机号可使用手机号直接登录</span>
           </div>
           <div class="message-items-operation">编辑</div>
       </div>
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">qq号</span>
            </div>
            <div class="message-items-right">
                <span>未绑定</span>
            </div>
            <div class="message-items-operation">编辑</div>
        </div>
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">微信</span>
            </div>
            <div class="message-items-right">
                <span>未绑定</span>
            </div>
            <div class="message-items-operation">编辑</div>
        </div>
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">邮箱绑定</span>
            </div>
            <div class="message-items-right">
                <span>绑定邮箱后可使用电子邮箱重置密码</span>
            </div>
            <div class="message-items-operation">编辑</div>
        </div>
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
export default {
    
}
</script>
<style lang="less" scoped>
    .message {
        &-items {
            padding-bottom: 30px;
            border-bottom: 1px solid #EEEEEE;
            display: flex;
            justify-content: space-between;
            align-items: center;
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
            }
            &-operation{
                width: 40px;
                text-align: right;
            }
            &-text {
                padding-top: 30px;
            }
        }
    }
</style>
