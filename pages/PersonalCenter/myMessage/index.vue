<template>
    <div class="message">
        <div class="message-items">
           <div class="message-items-left">
               <span class="message-items-left-label">头像</span>
           </div>
           <div class="message-items-right">
               <div class="message-items-right-header">

               </div>
           </div>
           <div class="message-items-operation">编辑</div>
       </div>
       <div class="message-items message-items-text">
           <div class="message-items-left">
               <span class="message-items-left-label">昵称</span>
           </div>
           <div class="message-items-right">
              <span>尼古拉斯·赵四</span>
           </div>
           <div class="message-items-operation">编辑</div>
       </div>
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">个人资料</span>
            </div>
            <div class="message-items-right">
                <span>未完善完全</span>
            </div>
            <div class="message-items-operation">编辑</div>
        </div>
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">教育信息</span>
            </div>
            <div class="message-items-right">
                <span class="message-items-right-fill">马上填写</span>
                <span>你的教育信息，让他人更好的了解你，与更多的同学在建筑部落相遇！</span>
            </div>
            <div class="message-items-operation">编辑</div>
        </div>
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">个人擅长</span>
            </div>
            <div class="message-items-right">
                <span class="message-items-right-fill">马上填写</span>
                <span>自己的标签，让大家全方位了解你！</span>
            </div>
            <div class="message-items-operation">编辑</div>
        </div>
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">职业信息</span>
            </div>
            <div class="message-items-right">
                <span class="message-items-right-fill">马上填写</span>
                <span>你的职业信息，让他人更好的了解你，与更多的同事在建筑部落相遇！</span>
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
