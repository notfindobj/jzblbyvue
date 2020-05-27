<template>
    <div class="sys">
        <div class="sys-title">
            <span>
                讲师后台管理
            </span>
        </div>
        <div  class="sys-nav">
            <span>
                <nuxt-link to="/self_study/new_study?type=1">新建课程</nuxt-link>
            </span>
            <span><nuxt-link to="/self_study/new_study?type=2">编辑课程</nuxt-link></span>
            <span @click="delCourse">删除课程</span>
        </div>
        <div>
            <template v-for="(item, index) in courseList" >
                <backPanl :class="courseIndex === index ? 'active' :'unactive'" @click.native="clcikCourse(index, item)" :key="index" :coursePanl="item" />
            </template>
        </div>
    </div>
</template>
<script>
import backPanl from "./backPanl"
import { mapState} from 'vuex'
import {delCourseData} from "../../../service/course"
export default {
    components: {
        backPanl,
    },
    data () {
        return {
            courseList: [],
            courseIndex: null
        }
    },
    computed: {
        ...mapState({
            auth: state => state.overas.auth,
        }),
    },
    created () {
        this.getLecturer()
    },
    methods: {
        clcikCourse (index, row) {
            localStorage.setItem('courseIndex', JSON.stringify(row))
            this.courseIndex = index;
        },
        async getLecturer () {
            let q = {
                LecturerId: this.auth.UserId
            };
            let msg = await this.$store.dispatch('getLecturerDetail', q);
            if (msg) {
                this.courseList= msg.courseList;
            }
        },
        delCourse () {
            if (this.courseIndex !== null) {
                let row = JSON.parse(localStorage.getItem('courseIndex'))
                let q = {
                    CourseID: row.CourseID
                }
                delCourseData(q).then(res => {
                    if (res) {
                        this.getLecturer()
                        this.$Message.success("视频已删除！")
                    }
                }).catch(err => {})
            } else {
                this.$Message.warning("请先选择要删除的视频")
            }
            
        },
    }
}
</script>
<style lang="less" scoped>
.active {
    border: 1px solid #1bbc9b;
}
.unactive {
    border: 1px solid transparent;
}
.sys {
    font-size: 14px;
    &-title {
        border-bottom: 1px solid #f1efef;
        span {
            display: inline-block;
            font-size: 16px;
            line-height: 35px;
            color: #999;
            padding: 0px 13px;
            border-radius: 4px 4px 0px 0px;
            color: #fff;
            margin-bottom: -1px;
            background-color: #3bc66f;
        }
    }
    &-nav {
        line-height: 30px;
        margin-top: 10px;
        &:last-child {
            padding-left: 0;
        }
        span {
            padding: 5px 10px;
            cursor: pointer;
            &:hover {
                color: #3bc66f;
            }
            a{
                &:hover {
                    color: #3bc66f;
                }
            }
        }
    }
}

</style>