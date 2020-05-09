<template>
    <div class="def">
        <Breadcrumb separator=">" class="box">
            <BreadcrumbItem>当前位置：</BreadcrumbItem>
            <BreadcrumbItem to="/course">课程首页</BreadcrumbItem>
            <BreadcrumbItem>全部课程</BreadcrumbItem>
        </Breadcrumb>
        <div class="def-wrap">
            <div class="def-wrap-item">
                <label class="def-wrap-item-name">大类</label>
                <div class="def-wrap-item-list">
                    <ul>
                        <li class="active">全部</li>
                        <li>室内设计</li>
                        <li>建筑景观</li>
                        <li>视频制作</li>
                        <li>平面设计</li>
                        <li>游戏动画</li>
                        <li>工业|产品</li>
                    </ul>
                    <span v-if="false" class="def-wrap-item-list-extend icon iconfont icon-jiantouxia"></span>
                </div>
            </div>
            <div class="def-wrap-item">
                <label class="def-wrap-item-name">小类</label>
                <div class="def-wrap-item-list">
                    <ul ref="itemList" :style="`height: ${isShow ? 75 : 'auto' }px;`">
                        <li>全部</li>
                        <li>室内设计</li>
                        <li>建筑景观</li>
                        <li>视频制作</li>
                        <li>平面设计</li>
                        <li>游戏动画</li>
                        <li>工业|产品</li>
                        <li>全部</li>
                        <li>室内设计</li>
                        <li>建筑景观</li>
                        <li>视频制作</li>
                        <li>平面设计</li>
                        <li>游戏动画</li>
                        <li>工业|产品</li>
                        <li>全部</li>
                        <li>室内设计</li>
                        <li>建筑景观</li>
                        <li>视频制作</li>
                        <li>平面设计</li>
                        <li>游戏动画</li>
                        <li>工业|产品</li>
                        <li>全部</li>
                        <li>室内设计</li>
                        <li>建筑景观</li>
                        <li>视频制作</li>
                        <li>平面设计</li>
                        <li>游戏动画</li>
                        <li>工业|产品</li>
                        <li>全部</li>
                        <li>室内设计</li>
                        <li>建筑景观</li>
                        <li>视频制作</li>
                        <li>平面设计</li>
                        <li>游戏动画</li>
                        <li>工业|产品</li>
                    </ul>
                    <span v-if="!isShow" class="def-wrap-item-list-extend icon iconfont icon-jiantouxia"></span>
                </div>
            </div>
        </div>
        <div class="def-screen">
            <label class="def-screen-name">筛选：</label>
            <ul class="def-screen-sub">
                <li class="active">全部</li>
                <li>免费</li>
                <li>热门</li>
                <li>最新</li>
            </ul>
        </div>
        <div class="def-boby">
            <coursePanl/>
            <coursePanl/>
            <coursePanl/>
            <coursePanl/>
            <coursePanl/>
            <coursePanl/>
            <coursePanl/>
            <coursePanl/>
            <coursePanl/>
        </div>
        <div class="def-page">
            <Page :total="100" />
        </div>
    </div>
</template>
<script>
import coursePanl from "../course/components/coursePanl"
export default {
    layout: "main",
    components: {
        coursePanl
    },
    data () {
        return {
            isShow: true
        }
    },
    mounted() {
        if (this.$refs.itemList.offsetHeight > 75) {
            this.isShow = true
        } else {
            this.isShow = false
        }
    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
.box {
    margin-top: 15px;
}
.def {
    width: 1200px;
    margin: 0 auto;
    &-boby {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    &-wrap {
        font-size: 14px;
        margin-top: 15px;
        background-color: #f9f9f9;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 4px;
        &-item {
            display: flex;
            padding: 15px 0;
            &:not(:last-child) {
                border-bottom: 1px solid #ddd;
            }
            &-name {
                width: 40px;
                margin-top: 6px;
            }
            &-list {
                width: 1120px;
                position: relative;
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    overflow: hidden;
                    li {
                        display: inline-block;
                        border-radius: 4px;
                        font-size: 14px;
                        color: #999;
                        margin-bottom: 8px;
                        padding: 6px 10px;
                        transition: background-color .3s;
                        margin-left: 10px;
                        border-radius: 13px;
                        cursor: pointer;
                        &:hover {
                            color: #fff;
                            background-color: #1abc9c;
                        }
                    }
                    li.active {
                        color: #fff;
                        background-color: #1abc9c;
                    }
                }
                &-extend {
                    cursor: pointer;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
        }
    }
    &-screen {
        padding: 15px 0;
        &-name {
            padding: 3px 9px;
        }
        &-sub {
            display: inline-block;
            li {
                display: inline-block;
                padding: 3px 9px;
                border-radius: 12px;
                margin-right: 15px;
            }
            li.active {
                background-color: #e0fef8;
                border: 1px solid #1abc9c;
                color: #1abc9c;
            }
        }
    }
    &-page {
        text-align: center;
        margin: 20px 0;
    }
}
</style>