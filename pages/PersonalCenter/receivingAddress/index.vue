<template>
    <div class="message">
        <div class="message-items">
            <div class="message-items-left">
                <span class="message-items-left-label">收货地址</span>
            </div>
            <div class="message-items-right">
                <span v-if="false">您还没有收货地址</span>
                <div>您已创建 <span class="num-color">2</span> 个收货地址，最多可创建 <span class="num-color">20</span> 个</div>
            </div>
            <div class="message-items-operation">
                <i class="icon iconfont icon-add"></i> 
                <span class="message-items-operation-pointer">新增收货地址</span>
            </div>
        </div>
        <div class="message-adders">
            <div class="message-adders-card">
                <div class="message-adders-card-title">
                    <span class="message-adders-card-title-name">尼古拉斯·四儿</span>
                    <span class="default-address">默认地址</span>
                     <span class="message-adders-card-fork">
                        <i class="icon iconfont icon-chahao2"></i>
                    </span>
                </div>
                <div class="message-adders-content">
                    <div class="message-adders-content-box">
                        <div class="message-adders-content-box-title">收货人</div>
                        <div class="message-adders-content-box-content">尼古拉斯·四儿</div>
                    </div>
                </div>
                <div class="message-adders-content">
                    <div class="message-adders-content-box">
                        <div class="message-adders-content-box-title">所在地区</div>
                        <div class="message-adders-content-box-content">浙江省杭州市上城区</div>
                    </div>
                </div>
                <div class="message-adders-content">
                    <div class="message-adders-content-box">
                        <div class="message-adders-content-box-title">地址</div>
                        <div class="message-adders-content-box-content">XX街道XXXX小区XX幢</div>
                    </div>
                </div>
                <div class="message-adders-content">
                    <div class="message-adders-content-box">
                        <div class="message-adders-content-box-title">手机</div>
                        <div class="message-adders-content-box-content">1234****1234</div>
                    </div>
                </div>
                <div class="message-adders-content">
                    <div class="message-adders-content-box">
                        <div class="message-adders-content-box-title">固定电话</div>
                        <div class="message-adders-content-box-content">0371-1234567</div>
                    </div>
                </div>
                <div class="message-adders-content">
                    <div class="message-adders-content-box">
                        <div class="message-adders-content-box-title">电子邮箱</div>
                        <div class="message-adders-content-box-content message-adders-content-box-until">
                            <span>12345678909@163.com</span>
                            <div>
                                <span class="num-color cursor">设为默认</span>
                                <span class="blue-color cursor">编辑</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 16px;
            &-left {
                width: 110px;
                text-align: left;
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
                width: 180px;
                text-align: right;
                color: #FF3C00;
                cursor: pointer;
                &-pointer {
                    border-bottom: 1px solid #FF3C00;
                }
            }
            &-text {
                padding-top: 30px;
            }
        }
        &-adders {
            margin-left: 83px;
            width: 797px;
            height: 252px;
            border: 1px solid #dddddd;
            border-radius: 4px;
            font-size: 14px;
            color: #666666;
            position: relative;
            &-card {
                font-size: 16px;
                margin: 20px 0;
                &-title {
                    display: inline-block;
                    margin-bottom: 20px;
                    &-name {
                        display: inline-block;
                        padding-right: 20px;
                        width: 139px;;
                        color: #333333;
                        font-weight: 500;
                        text-align: right;
                    }
                }
                &-fork {
                    position: absolute;
                    right: 7px;
                    top: 2px;
                    cursor: pointer;
                    &:hover {
                        color: #FF3C00;
                    }
                }
            }
            &-content {
                line-height: 30px;
                color: #666666;
                font-size: 14px;
                &-box {
                    display: flex;
                    &-title {
                        text-align: right;
                        padding-right: 20px;
                        width: 139px;
                    }
                    &-content {
                        display: flex;
                        justify-content: space-between;
                    }
                    &-until {
                        width: 635px;
                    }
                }
            }
        }
    }
    .default-address {
        background: #FF3C00;
        padding: 4px 12px;
        color: #ffffff;
        border-radius: 4px;
        cursor: pointer;
    }
    .cursor {
        cursor: pointer;
    }
    .blue-color {
        color: #3E85FF;
    }
    .num-color {
        color: #FF3C00;
    }
</style>
