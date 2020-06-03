<template>
    <div class="def">
        <Breadcrumb separator=">" class="box">
            <BreadcrumbItem>当前位置：</BreadcrumbItem>
            <BreadcrumbItem to="/course">课程首页</BreadcrumbItem>
            <BreadcrumbItem>全部课程</BreadcrumbItem>
        </Breadcrumb>
        <div class="def-wrap">
            <div class="def-wrap-item" v-for="(item, index) in courseType" :key="index">
                <label class="def-wrap-item-name">{{item.typename}}</label>
                <div class="def-wrap-item-list">
                    <ul :ref="`itemList${index}`"  :style="item.expand ? 'max-height:75px;':''">
                        <li v-for="(items, ins) in item.typelist" :class="items.active ? 'active': ''" :key="ins" @click="expandItem(items, index)">{{items.Name}}</li>
                    </ul>
                    <span v-if="item.isShow" class="def-wrap-item-list-extend icon iconfont icon-jiantouxia" @click="expandWarp(item)"></span>
                </div>
            </div>
        </div>
        <div class="def-screen">
            <label class="def-screen-name">排序：</label>
            <ul class="def-screen-sub">
                <li :class="q.sort === 0 ? 'active' : ''"  @click="searchItem(0)">综合</li>
                <li :class="q.sort === 1 ? 'active' : ''"  @click="searchItem(1)">热门</li>
                <li :class="q.sort === 2 ? 'active' : ''"  @click="searchItem(2)">最新</li>
            </ul>
        </div>
        <div class="def-boby">
            <template v-for="(items, index) in courseList">
                <coursePanl :key="index" :coursePanl="items"/>
            </template>
        </div>
        <div class="def-page">
            <Page :total="page.records" />
        </div>
    </div>
</template>
<script>
import coursePanl from "../course/components/coursePanl"
import {getCourseList} from '../../service/course'
export default {
    layout: "course",
    components: {
        coursePanl
    },
    data () {
        return {
            isShow: true,
            courseType: [],
            courseList: [],
            page: {},
            q: {
                parentId: '',
                typeId: '',
                sort: 0,
                level: -1,
                page: 1,
                rows: 16
            }
        }
    },
    created () {
        let query = this.$route.query
        if (query) {
            this.q.parentId = query.f || "";
            this.q.typeId = query.c || "";
        }
    },
    mounted() {
        this.getCourseTypeList()
    },
    methods: {
        expandWarp (row) {
            this.$set(row, "expand", !row.expand)
        },
        expandItem (row, index) {
            if (index === 0) {
                this.q.parentId = row.ID
                this.q.typeId = ""
            }
            if (index === 1) {
                this.q.typeId = row.ID
            }
            this.$set(row, "active", true)
            this.getCourseTypeList()
        },
        searchItem (index) {
            this.q.sort = index
            this.getCourseTypeList()
        },
        getCourseTypeList () {
            let that = this
            getCourseList(that.q).then(res => {
                if (res) {
                    let parArr = res.coursetypeList[0]
                    let childArr = res.coursetypeList[1]
                    parArr.typelist.forEach(ele => {
                        if (that.q.parentId === ele.ID) {
                            ele.active = true
                        } else {
                            ele.active = false
                        }
                    })
                    childArr.typelist.forEach(ele => {
                        if (that.q.typeId === ele.ID) {
                            ele.active = true
                        } else {
                            ele.active = false
                        }
                    })
                    that.courseType = res.coursetypeList
                    that.courseList = res.courseList
                    that.page = res.paginationData
                }
            }).then(res => {
                that.$nextTick(() => {
                    that.courseType.forEach((ele, index) => {
                        if (that.$refs['itemList'+index][0].offsetHeight >= 75) {
                            that.$set(ele, "isShow", true)
                            that.$set(ele, "expand", true)
                        } else {
                            that.$set(ele, "isShow", false)
                            that.$set(ele, "expand", false)
                        }
                    })
                })
            })
            .catch(err => {})
        }
    }
}
</script>
<style lang="less" scoped>
.box {
    margin-top: 15px;
}
.def {
    width: 1200px;
    margin: 0 auto;
    &-boby {
        display: flex;
        flex-wrap: wrap;
        >div   {
            margin-right: 26.6px;
            &:nth-child(4n) {
                margin-right: 0;
            }
        }
    }
    &-wrap {
        font-size: 14px;
        margin-top: 15px;
        background-color: #f9f9f9;
        padding-left: 20px;
        padding-right: 20px;
        border-radius: 4px;
        &-item {
            display: flex;
            padding: 15px 0;
            &:not(:last-child) {
                border-bottom: 1px solid #ddd;
            }
            &-name {
                width: 40px;
                margin-top: 6px;
            }
            &-list {
                width: 1120px;
                position: relative;
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    overflow: hidden;
                    align-content: flex-start;
                    transform: all .5s;
                    li {
                        display: inline-block;
                        border-radius: 4px;
                        font-size: 14px;
                        color: #999;
                        margin-bottom: 8px;
                        padding: 6px 10px;
                        transition: background-color .3s;
                        margin-left: 10px;
                        border-radius: 13px;
                        cursor: pointer;
                        &:hover {
                            color: #fff;
                            background-color: #1abc9c;
                        }
                    }
                    li.active {
                        color: #fff;
                        background-color: #1abc9c;
                    }
                }
                &-extend {
                    cursor: pointer;
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
        }
    }
    &-screen {
        padding: 15px 0;
        &-name {
            padding: 3px 9px;
        }
        &-sub {
            display: inline-block;
            li {
                display: inline-block;
                padding: 3px 9px;
                border-radius: 12px;
                cursor: pointer;
                margin-right: 15px;
            }
            li.active {
                background-color: #e0fef8;
                border: 1px solid #1abc9c;
                color: #1abc9c;
            }
        }
    }
    &-page {
        text-align: center;
        margin: 20px 0;
    }
}
</style>