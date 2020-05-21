<template>
    <div class="sys">
        <div class="sys-title">
            <span>
                讲师后台管理
            </span>
        </div>
        <div>
            <span>新建课程</span>
            <span>修改课程</span>
            <span>上传视频</span>
            <span>删除章节</span>
        </div>
        <div>
            <Panel :coursePanl="panel" />
        </div>
    </div>
</template>
<script>
import Panel from "./Panel"
export default {
    components: {
        Panel,
    },
    data () {
        return {
            panel: {
                "CourseID": "bd763b7e-faa6-4fa7-b6d2-9a28983d5b31",
                "CourseName": "33333333333333333333",
                "FirstImg": "https://img.3d66.com/soft/2020/20200413/14717ef5353853638a712330640ed667.jpg",
                "ClassHour": 3,
                "Level": "初级",
                "Number": 0,
                "CreateUserId": "94749b37-12ac-4651-9a85-86b03a475c3d",
                "NickName": "未知讲师",
                "HeadIcon": "http://www.pic1.jzbl.com/buildingcircle/94749b37-12ac-4651-9a85-86b03a475c3d/2020-04-30/i/1588212166376909.jpg"
            }
        }
    }
}
</script>
<style lang="less" scoped>
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
}

</style>