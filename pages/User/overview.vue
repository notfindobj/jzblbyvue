<template>
    <div class="overview">
        <div class="overview-property">
            <div class="overview-property-item">
                <p class="overview-property-item-name">人民币余额:</p>
                <p class="overview-property-item-num">0</p>
                <div class="overview-property-item-btn">
                    <span>提现</span>
                </div>
            </div>
            <div class="overview-property-item">
                <p class="overview-property-item-name">部落币余额:</p>
                <p class="overview-property-item-num">0</p>
                <div class="overview-property-item-btn">
                    <span>充值</span>
                    <span>提现</span>
                </div>
            </div>
            <div class="overview-property-item">
                <p class="overview-property-item-name">我的积分:</p>
                <p class="overview-property-item-num">0</p>
                <div class="overview-property-item-btn">
                    <span>签到</span>
                    <span>获取更多</span>
                </div>
            </div>
            <div class="overview-property-item">
                <p class="overview-property-item-name">我的卡券:</p>
                <p class="overview-property-item-num">0</p>
                <div class="overview-property-item-btn">
                    <span>卡券中心</span>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
    .overview {
        &-property {
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
            &-item {
                width: 200px;
                height: 80px;
                background: #eaeaea;
                padding: 10px;
                border-radius: 3px;
                &-name {
                    font-size: 14px;
                    font-weight: 600;
                }
                &-num {
                    font-size: 14px;
                    font-weight: 600;
                }
                &-btn {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 3px;
                    > span {
                        cursor: pointer;
                        &:hover {
                            color: #ff3c00;
                        }
                    }
                }
            }
        }
    }
</style>