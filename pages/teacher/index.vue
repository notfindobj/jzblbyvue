<template>
    <div class="teacher">
        <div class="teacher-header">
            <div class="teacher-header-title">
                <div class="teacher-header-title-mask"></div>
                <img src="https://static.3d66.com/zixuev2/images/teacher-bg.jpg" alt="">
            </div>
            <div class="teacher-header-container">
                <Breadcrumb separator=">" class="box">
                    <BreadcrumbItem>当前位置：</BreadcrumbItem>
                    <BreadcrumbItem to="/course">全部课程</BreadcrumbItem>
                    <BreadcrumbItem>老师详情</BreadcrumbItem>
                </Breadcrumb>
                <div class="teacher-header-container-info">
                   <div class="teacher-info">
                        <div class="teacher-info-img">
                            <img src="https://img.3d66.com/soft/2019/20191017/757446456ff612d54f101cb65d357430.jpg" alt="">
                        </div>
                        <h3>爱知趣教育</h3>
                   </div>
                   <div class="teacher-attr">
                       <div class="teacher-attr-lf">
                           <span>课程</span>
                           <span>11</span>
                       </div>
                       <div class="teacher-attr-lr">
                           <span>在学</span>
                           <span>11w</span>
                       </div>
                   </div>
                   <div class="teacher-sub">92爱知趣教育，一家专注互联教育的公司。倾力打造首家配字幕精品公开课课程，以优质的课程为起点，倾力打造“92爱知趣”品牌。主要开设职业类教学平面设计PS、CDR 、AI、UI、EXCEL、WORD、PPT等热门教程          
                   </div>
                </div>
            </div>
        </div>
        <div class="teacher-content">
            <div class="teacher-content-tit">
                <i></i>
                老师课程
                <span>(11)</span>
            </div>
            <div class="teacher-content-boby">
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
}
</script>
<style lang="less" scoped>
    .box {
        margin-top: 10px;
        /deep/.ivu-breadcrumb-item-link {
            color: #c0bebe;
        }
    }
    .teacher {
        &-header{
            position: relative;
            height: 320px;
            margin-bottom: 50px;
            width: 100%;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-self: center;
            &-title {
                &-mask {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,.5);
                }
            }
            &-container {
                width: 1200px;
                height: 320px;
                position: absolute;
                &-info {
                    text-align: center;
                    width: 800px;
                    margin: 28px auto 0;
                }
            }
        }
        &-content {
            width: 1200px;
            margin: 0 auto;
            &-tit {
                color: #333;
                display: block;
                font-size: 18px;
                padding-bottom: 15px;
                padding-top: 15px;
                border-bottom: 1px solid #eee;
                line-height: 1;
                i {
                    vertical-align: -3px;
                    margin-right: 10px;
                    display: inline-block;
                    width: 4px;
                    height: 18px;
                    border-radius: 2px;
                    background-color: #1abc9c;
                }
                span {
                    color: #999;
                }
            }
            &-boby {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                margin-bottom: 30px;
            }
        }
    }
    .teacher-info {
        &-img {
            margin: 0 auto;
            display: inline-block;
            border-radius: 50%;
            width: 100px;
            height: 100px;
            border: 5px solid hsla(0,0%,100%,.5);
            box-sizing: border-box;
            background-color: hsla(0,0%,100%,.5);
            box-shadow: 1px 2px 8px 0 rgba(31,31,31,.2);
            overflow: hidden;
            img {
                border: 0;
                width: 90px;
                height: 90px;
                display: block;
            }
        }
        h3 {
            line-height: 1;
            color: #fff;
            font-size: 16px;
            margin-top: 10px;
            margin-bottom: 20px;
        }
    }
    .teacher-attr {
        color: #fff;
        display: flex;
        font-size: 14px;
        justify-content: center;
        &-lf {
            border-right: 1px solid #989696;
            padding-right: 20px;
            span:last-child {
                margin-left: 8px;
            }
        }
        &-lr {
            padding-left: 20px;
            span:last-child {
                margin-right: 8px;
            }
        }
    }
    .teacher-sub {
        margin: 20px auto 0;
        max-width: 630px;
        max-height: 40px;
        word-break: all;
        word-break: break-all;
        display: -webkit-box;
        line-clamp: 2;
        overflow: hidden;
        text-align: justify;
        margin-top: 15px;
        line-height: 20px;
        color: hsla(0,0%,100%,.5);
        font-size: 14px;
    }
</style>