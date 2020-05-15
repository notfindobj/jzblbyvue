<template>
<div class="details">
    <div class="details-titile">
        <Breadcrumb separator=">" class="box">
            <BreadcrumbItem>当前位置121：</BreadcrumbItem>
            <BreadcrumbItem to="/course">课程首页</BreadcrumbItem>
            <BreadcrumbItem>全部课程</BreadcrumbItem>
        </Breadcrumb>
        <div class="details-titile-video" >
            <div>          
                <courseVideo :video="courseDet" width="850"/>
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
                <li data-index="1" :class="slideIndex === 1 ? 'active': ''">课程大纲（83）</li>
                <li data-index="2" :class="slideIndex === 2 ? 'active': ''">学习资料（2）</li>
                <li data-index="3" :class="slideIndex === 3 ? 'active': ''">学员评价（88）</li>
                <div class="details-course-lf-nav-bar" :style="`left: ${slideLeft}px`"></div>
            </ul>
            <div v-show="slideIndex === 0">
                <sidle/>
            </div>
            <div v-show="slideIndex === 1">
                <sidle/>
            </div>
            <div v-show="slideIndex === 2">
                学习资料
            </div>
            <div v-show="slideIndex === 3">
                学员评价
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
                <span>
                    <img src="https://img.3d66.com/soft/2020/20200427/31c644ab72711dfe6fb1fd1449e71631.jpg" alt="">
                </span>
                <p class="details-course-lr-sub-name">XIMI DESIGN </p>
                <p class="details-course-lr-sub-subs">始于2012年，专注于室内设计教育，秉承“身以感悟，挚于创造”。</p>
            </div>
            <div class="details-course-lr-other">
                <div class="details-course-lr-other-tit">
                    <span>老师其他课程</span>
                    <span>更多</span>
                </div>
                <ul class="details-course-lr-other-item">
                    <li>
                        <img src="https://img.3d66.com/soft/2019/20191105/1af041c47d63e155d1620cd618e3b3ba.jpg" alt="">
                        <p>3DMAX VR漫游生长灯光景深动画教程</p>
                    </li>
                     <li>
                        <img src="https://img.3d66.com/soft/2019/20191105/1af041c47d63e155d1620cd618e3b3ba.jpg" alt="">
                        <p>3DMAX VR漫游生长灯光景深动画教程</p>
                    </li>
                    <li>
                        <img src="https://img.3d66.com/soft/2019/20191105/1af041c47d63e155d1620cd618e3b3ba.jpg" alt="">
                        <p>3DMAX VR漫游生长灯光景深动画教程</p>
                    </li>
                    <li>
                        <img src="https://img.3d66.com/soft/2019/20191105/1af041c47d63e155d1620cd618e3b3ba.jpg" alt="">
                        <p>3DMAX VR漫游生长灯光景深动画教程</p>
                    </li>
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
                    <li>3DMax+VRay4.1零基础教学视频教程</li>
                    <li>3DMax+VRay4.1零基础教学视频教程</li>
                    <li>3DMax+VRay4.1零基础教学视频教程</li>
                    <li>3DMax+VRay4.1零基础教学视频教程</li>
                    <li>3DMax+VRay4.1零基础教学视频教程</li>
                    <li>3DMax+VRay4.1零基础教学视频教程</li>
                    <li>3DMax+VRay4.1零基础教学视频教程</li>
                </ul>
            </div>
        </div>
    </div>
</div>
    
</template>
<script>
import courseVideo from "./components/courseVideo"
import videoSile from "./components/videoSile"
import sidle from "./components/sidle"
export default {
    layout: "course",
    components: {
        courseVideo,
        videoSile,
        sidle
    },
    data () {
        return {
            slideLeft: 22,
            slideIndex: 0,
        }
    },
    async asyncData({route, store, env, params, query}) {
        let courId = params.id
        let de = {
            courseId: courId,
        };
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
            course: olne
        }
    },
    methods: {
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
.box {
    width: 1200px;
    margin: 0 auto;
    padding: 15px 0;
}
.details {
    &-titile {
        background-color: #292929;
        &-video {
            width: 1200px;
            margin: 0 auto;
            display: flex;
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
                z-index: 1000;
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
                        display: inline-block;
                        margin-bottom: 20px;
                        img {
                            width: 100%;
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