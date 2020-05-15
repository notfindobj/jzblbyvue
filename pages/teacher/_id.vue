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
                            <img :src="lecturerInfo.HeadIcon" :alt="lecturerInfo.FullName">
                        </div>
                        <h3>{{lecturerInfo.FullName}}</h3>
                   </div>
                   <div class="teacher-attr">
                       <div class="teacher-attr-lf">
                           <span>课程</span>
                           <span>{{courseList.length}}</span>
                       </div>
                       <div class="teacher-attr-lr">
                           <span>在学</span>
                           <span>{{lecturerInfo.CourseCount}}</span>
                       </div>
                   </div>
                   <div class="teacher-sub">{{lecturerInfo.Description}}</div>
                </div>
            </div>
        </div>
        <div class="teacher-content">
            <div class="teacher-content-tit">
                <i></i>
                老师课程
                <span>({{courseList.length}})</span>
            </div>
            <div class="teacher-content-boby">
                <template v-for="(items, index) in courseList">
                    <coursePanl :coursePanl="items" :key="index"/>
                </template>
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
    async asyncData({route, store, env, params, query}) {
        let q = {
            LecturerId: params.id
        };
        let msg = await store.dispatch('getLecturerDetail', q);
        return {
            lecturerInfo: msg.lecturerInfo,
            courseList: msg.courseList,
        }
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
                flex-wrap: wrap;
                margin-bottom: 30px;
                >div {
                    margin-right: 26.6px;
                    &:nth-child(4n) {
                        margin-right: 0;
                    }
                }
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