<template>
    <div class="message">
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">登录密码</span>
            </div>
            <div class="message-items-right">
                <span>建议您经常修改密码，以保障账号安全</span>
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
