<template>
    <div class="course">
        <div class="course-top">
            <ul class="course-top-lf">
                <li>建筑部落</li>
                <li>资料库</li>
                <li>建筑圈</li>
                <li>视频</li>
                <li>问答</li>
            </ul>
            <ul class="course-top-lr">
                <li>我的部落</li>
                <li>账号</li>
            </ul>
        </div>
        <div class="course-buttom">
            <div class="course-buttom-content">
                <ul class="course-buttom-content-lf">
                    <li>
                        <img src="https://static.3d66.com/softv2/images/logo.png" alt="">
                    </li>
                    <li>首页</li>
                    <li>全部课程</li>
                    <li>限时免费</li>
                </ul>
                <ul class="course-buttom-content-lr">
                    <li>
                        <div class="search">
                            <input type="text">
                            <i class="icon iconfont icon-sousuo"></i>
                        </div>
                    </li>
                    <li>讲师入住</li>
                    <li>我的自学</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.course {
        position: sticky;
        z-index: 999;
        top: -32px;
    &-top {
        position: relative;
        height: 32px;
        width: 1200px;
        margin: 0 auto;
        background: #f6f6f6;
        line-height: 31px;
        z-index: 998;
        display: flex;
        justify-content: space-between;
        color: #999;
        font-size: 12px;
        ul {
            display: flex;
        }
        &-lf{
            li {
                cursor: pointer;
                margin-right: 15px;
            }
        }
        &-lr{
            li {
                cursor: pointer;
                margin-left: 15px;
            }
        }
    }
    &-buttom {
        box-sizing: border-box;
        background-color: #2b333b;
        position: relative;
        height: 60px;
        font-size: 14px;
        top: 0;
        color: #fff;
        &-content{
            width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            &-lf {
                display: flex;
                li {
                    margin-right: 30px;
                    &:first-child {
                        img {
                            padding-top: 15px;
                        }
                    }
                    height: 60px;
                    line-height: 60px;
                    cursor: pointer;
                }
            }
            &-lr {
                display: flex;
                li {
                    cursor: pointer;
                    &:first-child {
                        margin-right: 30px;
                    }
                    &:last-child {
                        margin-left: 20px;
                        position: relative;
                        color: #1bbc9b;
                        &::after {
                            content: "";
                            position: absolute;
                            width: 2px;
                            height: 20px;
                            top: 20px;
                            background: #1bbc9b;
                            left: -10px;
                        }
                    }
                    height: 60px;
                    line-height: 60px;
                    cursor: pointer;
                }
            }
        }
    }
}
.search {
    height: 31px;
    background: #fff;
    line-height: 30px;
    padding: 0 15px;
    display: inline-block;
    border-radius: 4px;
    color: #999;
    input {
        border: none;
        outline: none;
        height: 30px;
    }
}
</style>