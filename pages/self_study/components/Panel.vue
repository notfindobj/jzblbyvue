<template >
   <div class="panl">
        <div class="panl-tit">
            <nuxt-link :to="`/details_course/${coursePanl.CourseID}/${coursePanl.CreateUserId}`">
                <img width="100%" :src="coursePanl.FirstImg" alt="">
                <span class="panl-tit-label">共{{coursePanl.ClassHour}}节课</span>
                <div class="panl-tit-hover">
                    <span class="panl-tit-hover-play"></span>
                </div>
            </nuxt-link>
        </div>
        <div class="panl-content">
            <p class="panl-content-title">{{coursePanl.CourseName}}</p>
            <div class="panl-content-author">
                <span class="panl-content-author-lf">
                    已学习 <span>1</span>/10节课程课程软件
                </span>
                <span>继续学习</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        coursePanl: {
            type: Object,
            default: () => {}
        }
    }
}
</script>
<style lang="less" scoped>
    .panl {
        display: inline-block;
        margin-top: 15px;
        background: #fff;
        width: 280px;
        &:active {
            border: 1px solid red;
        }
        &-tit {
            height: 200px;
            width: 280px;
            overflow: hidden;
            position: relative;
            cursor: pointer;
            &:hover img {
                transform: scale(1.1);
            }
            &:hover &-hover {
                opacity: 1;
                &-play {
                    transform: scale(1);
                }
            }
            &-label{
                position: absolute;
                bottom: 0;
                right: 0;
                font-size: 12px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                padding: 0 6px;
                color: hsla(0,0%,100%,.8);
                background-color: rgba(0,0,0,.3);
            }
            &-hover {
               position: absolute;
                top: 0;
                left: 0;
                opacity: 0;
                width: 100%;
                z-index: 11;
                height: 200px;
                line-height: 200px;
                text-align: center;
                transition: all .5s ease-out 0s;
                box-shadow: 0 1px 4px 0 rgba(0,0,0,.06);
                border-radius: 4px 4px 0 0;
                background-color: rgba(0,0,0,.5);
                &-play {
                    vertical-align: middle;
                    background: url(../../../assets/images/play.png);
                    display: inline-block;
                    width: 60px;
                    height: 60px;
                    transition: all .5s;
                    transform: scale(1.3);
                }
            }
            img {
                display: block;
                width: 310px;
                height: 220px;
                transition: all .5s;
                pointer-events: none;
            }
        }
        &-content {
            padding: 13px 15px;
            box-sizing: border-box;
            &-title {
                cursor: pointer;
                max-width: 250px;
                overflow: hidden;
                color: #333;
                display: inline-block;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 14px;
            }
            &-label{
                margin: 10px 0;
                font-size: 12px;
                justify-content: space-between;
                display: flex;
                vertical-align: middle;
                color: #999;
                padding-right: 6px;
                position: relative;
                margin-right: 6px;
                transition: all .3s;
                span {
                    &:last-child {
                        color: red;
                    }
                }
            }
            &-author{
                font-size: 12px;
                color: #999;
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                &-lf{
                    align-items: flex-end;
                    display: flex;
                    span {
                        color: #3bc66f;
                    }
                }
                >span{
                    &:last-child {
                        cursor: pointer;
                        color: #fff;
                        padding: 2px 5px;
                        border-radius: 4px;
                        font-size: 12px;
                        background-color: #3bc66f;
                    }
                } 
            }
        }
        &:hover {
            transition: box-shadow .5s;
            box-shadow: 0 2px 15px #999999;
        }
    }
</style>