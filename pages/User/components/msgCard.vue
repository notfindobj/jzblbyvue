<template>
    <div class="card">
        <div class="card-left">
           <img src="http://www.pic.jzbl.com/ItemFiles/UserInfoImg/0e70e8ea-d343-4136-a2f8-0af82ebe7c67/1566125301_s.jpeg" alt="">
        </div>
        <div class="card-right">
            <div class="card-right-title">
                <slot name="header">
                    <span>消息标题</span>
                </slot>
                <i class="icon iconfont icon-chahao3"></i>
            </div>
            <div class="card-right-body">
                <slot name="body">
                    <div class="card-right-body-content">
                        设计本年度盛典自启动以来，受到广大设计师朋友们的支持及参与，目前大赛进入到紧张的投票环节，目的是传播优质设计，让生活更美好。但这2天系统检测到及设计本组委会收到用户反馈，部分设计师有刷票嫌疑。设计本组委会将公平公正的核查，一经发现，取消参赛资格并全站通告。
                    </div>
                    <div class="card-right-body-img" v-if="bodyType">
                        <img src="https://www.pic.jzbl.com//buildingcircle/ee8e00ed-6390-4eba-9214-6c457d50b2fa/2019-12-09/i/s/e770a39f1575945579.jpg" alt="">
                    </div>
                 </slot>
            </div>
            <div>
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        bodyType: {
            type: Boolean,
            default: true
        },
    }
}
</script>
<style lang="less" scoped>
    .card {
        display: flex;
        width: 480px;
        justify-content: start;
        margin-top: 20px;
        cursor: pointer;
        &:hover .card-right-title i{
            display: inline-block;
        }
        &-left {
            width: 40px;
            height: 40px;
            overflow: hidden;
            border-radius: 50%;
            margin: 0 15px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        &-right {
            background: #f5f5f5;
            width: 400px;
            border-radius: 3px;
            padding: 10px;
            &-title {
                display: flex;
                position: relative;
                span {
                    font-size: 14px;
                    font-weight: 600;
                }
                i {
                    position: absolute;
                    right: -7px;
                    top: -10px;
                    font-size: 12px;
                    display: none;
                }
            }
            &-body {
                &-content {
                    margin: 10px 0;
                    color: #5f5f5f;
                }
                &-img {
                    height: 165px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    
                }
            }
        }
    }
</style>