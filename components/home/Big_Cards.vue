<template>
    <div class="cards">
        <div class="cards-top">
            <img src="http://iph.href.lu/594x356?text=[自定义文字]" alt="" width="594px" height="356px">
            <div class="cards-eye">
                <div>
                    <i class="iconfont icon-shangchuan"></i>
                    5245
                </div>
                <div class="cards-eye-name">
                    <i class="iconfont icon-shangchuan"></i>
                    <span>杨小幂</span>
                </div>
            </div>
        </div>
        <div class="cards-foot">
            <div class="cards-foot-title">广东江门龙溪湖公园改造设计</div>
            <div class="cards-foot-sub">装饰画在酒店的装饰</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            nam: 2.222
        }
    },
}
</script>
<style lang="scss" scoped>
    .cards {
        position: relative;
        margin-top: 5px;
        display: inline-block;
        border-radius: 3px;
        &-top {
            position: relative;
            height: 356px;
            display: inline-block;
            cursor: pointer;
        }
        &-foot {
            padding: 0 6px;
            font-size: 14px;
            line-height: 30px;
            color: #666666;
            &-title {
                font-size: 20px;
                padding: 20px 0 10px;
            }
            &-sub {
                padding-bottom: 20px;
            }
        }
        &-eye {
            position: absolute;
            display: flex;
            width: 100%;
            bottom: 3px;
            padding: 0 10px 0 6px;
            color: #ffffff;
            justify-content: space-between;
            > &:hover &-name{
                background: red;
                display: block;
            }
            &-name {
                // display: none;
            }
        }
        &:hover {
            box-shadow: 0 2px 15px #999999;
        }
    }
</style>
