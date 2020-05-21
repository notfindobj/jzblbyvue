<template>
    <div class="course-wrap">
        <h2>共{{courseWrap.CourseCount}}节课</h2>
        <p>{{courseWrap.TypeName}}</p>
        <span class="line"></span>
        <nuxt-link :to="`/all_course?f=${courseWrap.TypeId}`">
            <div class="viewmore">
                <div class="anim"></div>
                查看更多
            </div>
        </nuxt-link>
    </div>
</template>
<script>
export default {
    props:{
        courseWrap: {
            type: Object,
            default: () => {}
        }
    }
}
</script>
<style lang="less" scoped>
    .course-wrap {
        display: inline-block;
        margin-top: 15px;
        width: 280px;
        height: 313px;
        background: url(https://static.3d66.com/zixuev2/images/zixue2.1/cover-bg4.png) no-repeat 50%;
        transition: opacity .2s;
        padding-left: 45px;
        padding-top: 50px;
        color: #fff;
        cursor: pointer;
        &:hover {
            opacity: .8;
        }
        h2 {
            font-size: 34px;
            font-weight: 700;
        }
        p {
            font-size: 22px;
            margin-top: 18px;
            margin-bottom: 24px;
        }
        .line {
            display: block;
            width: 30px;
            height: 2px;
            background-color: #fff;
            opacity: .6;
        }
        .viewmore {
            margin-top: 50px;
            border-radius: 19px;
            cursor: pointer;
            background-color: #fff;
            color: #55d38e;
            text-align: center;
            width: 120px;
            height: 38px;
            line-height: 38px;
            display: inline-block;
            font-size: 16px;
            vertical-align: middle;
            transition: all 1s;
            overflow: hidden;
            position: relative;
            z-index: 0;
            margin-left: 25px;
            &:hover .anim {
                animation: anim-out .8s;
                animation-iteration-count:1;
            }
            .anim {
                position: absolute;
                transform: translate(-50%, -50%);
                top: 50%;
                left: 50%;
                border-radius: 50%;
                background: #f3f3f3;
                z-index: -1;
            }
        }
    }
    @keyframes anim-out {
        0%   {width: 0; height: 0;}
        100% {width: 120px; height: 120px;}
    }
</style>