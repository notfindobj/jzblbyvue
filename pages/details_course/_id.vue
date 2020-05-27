<template>
<div class="details">
    <div class="details-titile">
        <Breadcrumb separator=">" class="box">
            <BreadcrumbItem>当前位置：</BreadcrumbItem>
            <BreadcrumbItem to="/course">课程首页</BreadcrumbItem>
            <BreadcrumbItem>课程详情</BreadcrumbItem>
        </Breadcrumb>
        <div class="details-titile-video" >
            <div class="details-titile-video-box">
                <div class="video-md" v-if="videoDetails.IsFree === 0" >
                    <div class="tips-buy">
                        <h2>亲，您需要购买才能继续学习喔~</h2>
                        <p class="tips-buy-name">{{courseDet.CourseName}}</p>
                        <div class="tips-buy-block" >
                            <p>限时秒杀</p>
                            <p class="tips-buy-block-pire">
                                <span><em>{{courseDet.DiscountedPrice}}</em>元</span>
                                <s>原价：{{courseDet.OriginalPrice}}元</s>
                            </p>
                            <span class="tips-buy-block-btn" @click="isBuy = true">购买课程</span>
                        </div>
                    </div>
                </div>
                <courseVideo :video="videoDetails" width="850"/>
            </div>
            <template>
                <videoSile :crouseList="course" :name="courseDet.CourseName" @playVideo="playVideo"/>
            </template>
        </div>
    </div>
    <div class="details-course">
        <div class="details-course-lf">
            <ul class="details-course-lf-nav" @click="navSlideBar">
                <!-- <li data-index="2" :class="slideIndex === 2 ? 'active': ''">学习资料</li> -->
                <li data-index="3" :class="slideIndex === 3 ? 'active': ''">学员评价</li>
                <div class="details-course-lf-nav-bar" :style="`left: ${slideLeft}px`"></div>
            </ul>
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
            <div class="details-course-lr-more" v-if="samecourseList.length > 0">
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
                            <li >{{items.CourseName}}</li>
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
            slideIndex: 3,
            videoDetails: {},
            courseDet: {},
        }
    },
    async asyncData({route, store, env, params, query}) {
        let courId = params.id
        let q = {
            courseId: courId,
            LecturerId: query.id,
            page: 1,
            rows: 4
        };
        let de = {
            courseId: courId,
        };
        let msg = await store.dispatch('getLecturerDetail', q);
        let olne = await store.dispatch('getCourseOutline', {courseId: courId});
        let res = await store.dispatch('getCourseDetail', {courseId: courId});
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
            videoDetails: {
                CourseID: res.CourseID,
                IsFree: res.IsFree,
                IsBuy: res.IsBuy,
                VideoImg: res.VideoImg,
                VideoUrl: res.VideoUrl,
            }
        }
    },
    methods: {
        closePay (row) {
            this.isBuy = !this.isBuy
        },
        // 播放课程
        playVideo (row) {
            this.videoDetails = {
                CourseID: row.CourseID,
                IsFree: row.IsFree,
                IsBuy: row.IsBuy,
                VideoImg: row.VideoImg,
                VideoUrl: row.VideoUrl,
            }
        },
        getLecturer () {
            let q = {
                courseId: '5df8bd3d-674e-46f0-bfee-a0319cd0b862',
                outlineId: "",
                page:1,
                rows: 4
            }
            getLecturerDetail(q).then(res => {
                console.log(res)
            }).catch(err =>{})
        },
        getCourse () {
            let q = {
                courseId: '5df8bd3d-674e-46f0-bfee-a0319cd0b862'
            }
            getCourseOutline(q).then(res => {
                if (res) {
                    this.course = res
                }
            }).catch(err =>{})
        },
        getCourseDet () {
            let q = {
                courseId: '5df8bd3d-674e-46f0-bfee-a0319cd0b862'
            }
            getCourseDetail(q).then(res => {
                if (res) {
                    this.courseDet = res
                }
            }).catch(err =>{})
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
.tips-buy{
    display: inline-block;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    h2 {
        line-height: 1;
        font-size: 18px;
        color: #bbb;
        margin-bottom: 10px;
        text-align: center;
    }
    &-name{
        font-size: 12px;
        color: #7a7a7a;
        text-align: center;
    }
    &-block {
        margin: 25px auto 0;
        width: 350px;
        height: 180px;
        background-color: #24282f;
        border-radius: 4px;
        font-size: 14px;
        text-align: left;
        padding: 27px 39px 0;
        box-sizing: border-box;
        color: #fff;
        &-btn{
            margin-top: 22px;
            display: block;
            width: 270px;
            height: 44px;
            line-height: 44px;
            border-radius: 4px;
            color: #fff;
            background-color: #eb4e39;
            font-size: 14px;
            text-align: center;
            cursor: pointer;
            transition: all .3s;
        }
        &-pire {
            margin-top: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
                em {
                    font-size: 26px;
                    margin-right: 3px;
                    font-style: normal;
                    font-weight: 400;
                }
            }
            s {
                color: #50555c;
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
    background-color: #202429;
    z-index: 99;
}
.box {
    width: 1200px;
    margin: 0 auto;
    padding: 15px 0;
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
                position: sticky;
                top: 0px;
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
                        width: 124px;
                        height: 124px;
                        margin: 0 auto;
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
</style>