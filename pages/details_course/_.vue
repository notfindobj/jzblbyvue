<template>
<div class="details">
    <div class="details-titile">
        <Breadcrumb separator=">" class="box">
            <BreadcrumbItem>当前位置：</BreadcrumbItem>
            <BreadcrumbItem to="/course">课程首页</BreadcrumbItem>
            <BreadcrumbItem>课程介绍</BreadcrumbItem>
        </Breadcrumb>
        <div class="details-titile-video" >
            <div class="details-titile-video-box">
                <nuxt-link :to="`/details_course/${courseDet.CourseID}?id=${courseDet.LecturerId}`">
                    <div class="video-md"></div>
                </nuxt-link>
                <courseVideo :video="courseDet" width="800"/>
            </div>
            <div v-if="courseDet.IsBuy === 0" class="info">
                <div class="info-wrap">
                    <h3>{{courseDet.CourseName}}</h3>
                    <p class="info-wrap-sub">{{courseDet.Desc}}</p>
                    <p class="info-wrap-name">
                        <span> 授课老师：{{courseDet.Teacher}}</span>
                        <span>{{courseDet.StartDate}}推出该课程 </span>
                    </p>
                    <p class="info-wrap-name">
                        <span>课时：{{courseDet.StartDate}}节</span>
                        <span>难易度：{{courseDet.Level}}</span>
                        <span>{{courseDet.Number}}人在学</span>
                    </p>
                    <p class="info-wrap-name">
                        <span>课程软件：3dmax2014</span>
                        <span>课程总时长：{{courseDet.TotalTime}}</span>
                    </p>
                </div>
                <div class="info-num">
                    <span>价格： ￥{{courseDet.DiscountedPrice}}</span>
                    <s>￥{{courseDet.OriginalPrice}}</s>
                </div>
                <div class="info-btn">
                    <span @click="goDetails(courseDet)">免费试看</span>
                    <span @click="isBuy = true">购买课程</span>
                </div>
                <span class="info-des">购买后，请加小溜qq:1078523032,讲师提供售后服务哦</span>
            </div>
            <template v-if="courseDet.IsBuy === 1">
                <videoSile/>
            </template>
        </div>
    </div>
    <div class="details-course">
        <div class="details-course-lf">
            <ul class="details-course-lf-nav" @click="navSlideBar">
                <li data-index="0" :class="slideIndex === 0 ? 'active': ''">课程介绍</li>
                <li data-index="1" :class="slideIndex === 1 ? 'active': ''">课程大纲</li>
                <!-- <li data-index="2" :class="slideIndex === 2 ? 'active': ''">学习资料</li> -->
                <li data-index="3" :class="slideIndex === 3 ? 'active': ''">学员评价</li>
                <div class="details-course-lf-nav-bar" :style="`left: ${slideLeft}px`"></div>
            </ul>
            <div v-show="slideIndex === 0" >
                <div class="contents" v-html="courseDet.Contents"></div>
            </div>
            <div v-show="slideIndex === 1">
                <sidle :crouseList="course" :LecturerId="courseDet.LecturerId"/>
            </div>
            <!-- <div v-show="slideIndex === 2">
                学习资料
            </div> -->
            <div v-show="slideIndex === 3">
              <comment :evaluation="evaluation.evaluationList"/>
            </div>
        </div>
        <div class="details-course-lr">
            <div class="details-course-lr-teach">
               <h2>
                   <i></i>
                   授课老师
               </h2>
            </div>
            <div class="details-course-lr-sub">
                <nuxt-link :to="`/teacher/${lecturerInfo.UserId}`">
                    <span>
                        <img :src="lecturerInfo.HeadIcon" :alt="lecturerInfo.FullName">
                    </span>
                </nuxt-link>
                <p class="details-course-lr-sub-name">{{lecturerInfo.FullName}} </p>
                <p class="details-course-lr-sub-subs">{{lecturerInfo.Description}}</p>
            </div>
            <div class="details-course-lr-other">
                <div class="details-course-lr-other-tit">
                    <span>老师其他课程</span>
                    <nuxt-link :to="`/teacher/${lecturerInfo.UserId}`">
                        <span>更多</span>
                    </nuxt-link>
                </div>
                <ul class="details-course-lr-other-item">
                    <template v-if="lecturerList && lecturerList.length > 0" >
                        <nuxt-link v-for="(item, index) in lecturerList" :key="index" :to="`/teacher/${item.CreateUserId}`" >
                            <li>
                                <img :src="item.FirstImg" :alt="item.CourseName">
                                <p>{{item.CourseName}}</p>
                            </li>
                        </nuxt-link>
                    </template>
                    <div v-else>
                        暂无其他课程
                    </div>
                </ul>
            </div>
            <div class="details-course-lr-more">
                <div class="details-course-lr-more-title">
                    <h2>
                        <i></i>
                        相关课程
                    </h2>
                    <span>更多></span>
                </div>
                <ul class="details-course-lr-more-item">
                    <template v-for="(items, index) in samecourseList">
                        <nuxt-link to="/all_course" :key="index">
                            <li>{{items.CourseName}}</li>
                        </nuxt-link>
                    </template>
                </ul>
            </div>
        </div>
    </div>
    <play :setMeal="courseDet" v-if="isBuy" @closePay="closePay"/>
</div>
</template>
<script>
import courseVideo from "./components/courseVideo"
import videoSile from "./components/videoSile"
import sidle from "./components/sidle"
import { getCourseDetail } from "../../service/course";
import play from "./components/play"
import comment from "./components/comment"
export default {
    layout: "course",
    components: {
        courseVideo,
        videoSile,
        sidle,
        play,
        comment
    },
    data () {
        return {
            isBuy: false,
            slideLeft: 22,
            slideIndex: 0,
            course: {},
            courseDet: {},
        }
    },
    async asyncData({route, store, env, params, query}) {
        let courId = params.pathMatch.split("/")[0]
        let teachId = params.pathMatch.split("/")[1]
        let q = {
            courseId: courId,
            LecturerId: teachId,
            page: 1,
            rows: 4
        };
        let de = {
            courseId: courId,
        };
        let msg = await store.dispatch('getLecturerDetail', q);
        let olne = await store.dispatch('getCourseOutline', {courseId: courId});
        let res = await store.dispatch('getCourseDetail', {courseId: courId});
        res.LecturerId = teachId
        let eva = await store.dispatch('getCourseEvaluation', de);
        olne.Courselist.forEach(ele => {
            ele.fold = true
            ele.ChildNode.forEach(eles => {
                eles.free = true
            })
        })
        return {
            evaluation: eva,
            courseDet: res,
            course: olne,
            lecturerInfo: msg.lecturerInfo,
            lecturerList: msg.courseList,
            samecourseList: msg.samecourseList,
        }
    },
    methods: {
        closePay (row) {
            this.isBuy = !this.isBuy
            if (row) {
                this.$router.push({ name: "details_course-id", params: {id: this.courseDet.CourseID}});
            }
        },
        goDetails (row) {
            this.$router.push({ name: "details_course-id", params: {id: row.CourseID}, query: {id: row.LecturerId}});
        },
        navSlideBar () {
            if (event.target.localName === "li") {
                this.slideLeft = event.target.offsetLeft;
                this.slideIndex = Number(event.target.attributes["data-index"].value)
            }
        }
    }
}
</script>
<style lang="less" scoped>
.box {
    width: 1200px;
    margin: 0 auto;
    padding: 15px 0;
}
.info{
    background-color: #000;
    &-des {
        margin-top: 15px;
        color: #e4fffa;
        display: inline-block;
        padding: 0 15px;
        font-size: 12px;
    }
    &-btn {
        display: flex;
        justify-content: space-between;
        margin-top: 25px;
        padding: 0 15px;
        span {
            width: 126px;
            height: 40px;
            font-size: 16px;
            line-height: 40px;
            border-radius: 4px;
            display: inline-block;
            cursor: pointer;
            text-align: center;
            vertical-align: middle;
            &:last-child {
                color: #fff;
                background-color: #1abc9c;
                margin-left: 25px;
            }
            &:first-child {
                border: 1px solid #1abc9c;
                color: #1abc9c;
            }
        }
    }
    &-wrap {
        padding: 30px 33px 30px 25px;
        margin-top: 40px;
        font-size: 14px;
        color: #999;
        position: relative;
        font-size: 14px;
        border-bottom: 1px solid #2c2c2c;
        &-sub {
            margin-top: 12px;
            line-height: 24px;
            max-height: 69px;
            line-clamp: 3;
            overflow: hidden;
        }
        &-name {
            display: flex;
            justify-content: space-between;
            margin: 10px 0;
        }
        h3 {
            line-clamp: 2;
            font-size: 18px;
            max-height: 48px;
            color: #fff;
            word-break: break-all;
            overflow: hidden;
        }
    }
    &-num {
        padding: 0 25px;
        color: #fff;
        height: 50px;
        line-height: 50px;
        font-size: 22px;
        background-color: #1abc9c;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 30px;
        s {
            font-size: 16px;
        }
    }
}
.contents {
    font-size: 14px;
    margin-top: 25px;
}
.details {
    &-titile {
        background-color: #292929;
        &-video {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            &-box {
                position: relative;
            }
        }
    }
    &-course {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        &-lf {
            width: 850px;
            padding: 20px 30px;
            background: #fff;
            place-self: flex-start;
            &-nav {
                height: 58px;
                line-height: 58px;
                padding-left: 22px;
                position: relative;
                padding-bottom: 2px;
                border-bottom: 1px solid #eee;
                li {
                    float: left;
                    cursor: pointer;
                    height: 58px;
                    box-sizing: border-box;
                    color: #333;
                    font-size: 16px;
                    margin-right: 65px;
                    transition: color .3s;
                    &:hover {
                        color: #1abc9c;
                    }
                }
                li.active {
                    color: #1abc9c;
                }
                &-bar {
                    height: 2px;
                    width: 64px;
                    background: #1abc9c;
                    position: absolute;
                    bottom: 0;
                    left: 22px;
                    transition: all .5s;
                }
            }
        }
        &-lr {
            background: #fff;
            padding: 20px;
            width: 330px;
            place-self: flex-start;
            // max-height: 730px;
            // align-self: flex-start;
            &-teach {
                i {
                    vertical-align: -3px;
                    margin-right: 10px;
                    display: inline-block;
                    width: 4px;
                    height:15px;
                    border-radius: 2px;
                    background-color: #1abc9c;
                }
                h2 {
                    width: 300px;
                    padding-bottom: 10px;
                    margin-top: 20px;
                    color: #333;
                    font-size: 16px;
                    font-weight: 400;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                border-bottom: 1px solid #eee;
            }
            &-sub {
                border-bottom: 1px dashed #eee;
                padding-bottom: 30px;
                span {
                    text-align: center;
                    display: inline-block;
                    width: 100%;
                    img {
                        border-radius: 50%;
                        width: 100px;
                        height: 100px;
                        margin: 0 auto;
                        margin-top: 20px;
                    }
                   
                }
                &-name {
                    margin-bottom: 12px;
                    font-weight: 400px;
                    color: #333;
                    font-size: 14px;
                    text-align: center;
                }
                &-subs {
                    text-align: justify;
                    text-justify: distribute-all-lines;
                    font-size: 12px;
                    color: #999;
                    line-height: 25px;
                }
            }
            &-other {
                &-tit {
                    display: flex;
                    justify-content: space-between;
                    padding: 30px 0 20px;
                    zoom: 1;
                    span {
                        &:last-child {
                            color: #999;
                            cursor: pointer;
                            &:hover {
                                color: #1abc9c;
                            }
                        }
                    }
                }
                &-item {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    li {
                        cursor: pointer;
                        font-size: 14px;
                        width: 140px;
                        overflow: hidden;
                        display: inline-block;
                        margin-bottom: 20px;
                        img {
                            width: 100%;
                            height: 110px;
                        }
                        p {
                            margin-top: 10px;
                            word-break: break-all;
                            line-clamp: 2;
                            overflow: hidden;
                            max-height: 32px;
                            height: 32px;
                            max-width: 140px;
                            font-size: 12px;
                        }
                        &:hover {
                            color: #1abc9c;
                        }
                    }
                }
            }
            &-more {
                &-title {
                    display: flex;
                    justify-content: space-between;
                    padding: 20px 0 10px;
                    border-bottom: 1px dashed #eee;
                    h2 {
                        color: #333;
                        font-size: 16px;
                        float: left;
                        max-width: 300px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        i {
                            vertical-align: -3px;
                            margin-right: 10px;
                            display: inline-block;
                            width: 4px;
                            height: 16px;
                            border-radius: 2px;
                            background-color: #1abc9c;
                        }
                    }
                    
                }
                &-item {
                    padding-bottom: 12px;
                    max-height: 220px;
                    overflow: hidden;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    li {
                        margin: 10px 0;
                        cursor: pointer;
                        &:hover {
                            color: #1abc9c;
                        }
                    }
                }
            }
        }
    }
}
.video-md {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    cursor: pointer;
}
</style>