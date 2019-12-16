<template>
    <div class="comCard">
        <div class="comCard-content">
           <div class="comCard-content-txt">
               <span class="comCard-content-txt-name">嘿嘿嘿</span>:
               <span>
                   <span>回复</span>
                    <span class="comCard-content-txt-rep">@666</span>:
               </span>
               <span>
                   啊啊啊啊啊啊啊啊啊啊啊啊啊
               </span>
           </div>
           <i class="icon iconfont icon-chahao3"></i>
        </div>
        <div class="comCard-pro">
            <div class="comCard-pro-left" v-if="left">
                <img src="https://www.pic.jzbl.com//buildingcircle/ee8e00ed-6390-4eba-9214-6c457d50b2fa/2019-12-09/i/s/e770a39f1575945579.jpg" alt="">
            </div>
            <div class="comCard-pro-right">
                <div>
                    <span class="comCard-pro-right-title">标题</span>
                    <span>项目</span>
                </div>
                <div v-if="cintent">
                   设计本年度盛典自启动以来，受到广大设计师朋友们的支持及参与，目前大赛进入到紧张的投票环节，目的是传播优质设计，让生活更美好。但这2天系统检测到及设计本组委会收到用户反馈，部分设计师有刷票嫌疑。设计本组委会将公平公正的核查，一经发现，取消参赛资格并全站通告。
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        left: {
            type: Boolean,
            default: true
        },
        cintent: {
            type: Boolean,
            default: true
        },
    }
}
</script>
<style lang="less" scoped>
    .comCard {
        border: 1px solid #ddd;
        display: inline-block;
        width: 700px;
        padding: 10px;
        margin-top: 20px;
        border-radius: 3px;
        cursor: pointer;
        &:hover .comCard-content i{
            display: inline-block;
        }
        &-content {
            display: flex;
            justify-content: space-between;
            position: relative;
            line-height: 25px;
            margin-bottom: 5px;
            &-txt {
                &-name, &-rep {
                    color: #ff3c00;
                    cursor: pointer;
                }
            }
            i {
                position: absolute;
                right: -8px;
                top: -9px;
                font-size: 12px;
                display: none;
            }
        }
        &-pro {
            display: flex;
            justify-content: flex-start;
            background: #f5f5f5;
            &-left {
                width: 90px;
                height: 90px;
                margin-right: 10px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            &-right {
                flex: 1;
                &-title {
                    font-size: 14px;
                    font-weight: 600;
                }
            }
        }
    }
</style>