<template>
    <div class="sys">
        <div class="sys-title">
            <span :class="q.type === 0 ?'active' :''" @click="getStudyList(0)">全部课程</span>
            <span :class="q.type === 1 ?'active' :''" @click="getStudyList(1)">学习中</span>
            <span :class="q.type === 2 ?'active' :''" @click="getStudyList(2)">已学习</span>
            <span :class="q.type === 3 ?'active' :''" @click="getStudyList(3)">我的课程</span>
        </div>
        <ul class="sys-status">
            <li>今天学习：<span>{{(courseInfo.ToDayLearnTime / 3600).toFixed(1)}}小时</span></li>
            <li>学习课程：<span>{{courseInfo.TotalCourse}}门</span></li>
            <li>学习时长：<span>{{(courseInfo.LearnTime / 3600).toFixed(1)}}小时</span></li>
            <li>连续学习：<span>{{courseInfo.ContLearnDay}}天</span></li>
        </ul>
        <div class="sys-content">
            <template v-for="(items, index) in courseList" >
                <Panel :coursePanl="items" :key="index"/>
            </template>
           <div v-show="false">
               <img src="https://static.3d66.com/softv2/images/user-empty1.png" alt="">
           </div>
        </div>
    </div>
</template>
<script>
import Panel from "../components/Panel"
import {getStudyCourseList} from "../../../service/course"
export default {
    components: {
        Panel,
    },
    data () {
        return {
            courseList: [],
            courseInfo: {},
            page: {},
            q:{
                type: 0,
                page: 1,
                rows: 12
            }
        }
    },
    created () {
        this.getStudyList()
    },
    methods: {
        getStudyList (index = 0) {
            let q = this.q;
            q.type = index
            getStudyCourseList(q).then(res => {
                if (res) {
                    this.courseList = res.CourseData;
                    this.courseInfo = res.learnInfo;
                    this.page = res.pagination;
                }
            }).catch(err => {})
        },
    }
}
</script>
<style lang="less" scoped>
.pages {
    text-align: center;
    margin: 30px 0;
}
.sys {
    font-size: 14px;
    &-title {
        border-bottom: 1px solid #f1efef;
        span {
            display: inline-block;
            cursor: pointer;
            font-size: 16px;
            line-height: 35px;
            color: #999;
            padding: 0px 13px;
            border-radius: 4px 4px 0px 0px;
            margin-bottom: -1px;
        }
        span.active {
            color: #fff;
            background-color: #3bc66f;
        }
    }
    &-status {
        display: flex;
        margin: 20px 0;
        color: #333;
        li {
            color: #808080;
            margin-right: 15px;
            line-height: 24px;
            padding: 0 12px;
            span {
                font-size: 16px;
                color: #fda333;
            }
            &:first-child {
                padding: 0;
                cursor: text;
            }
        }
        li.active {
            background: #3bc66f;
            color: #fff;
        }
    }
    &-content{
       
    }
    
}

</style>