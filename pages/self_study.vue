<template>
    <div class="study">
        <div class="study-lf">
            <div class="header">
                <div>
                    <span class="header-img">
                        <img :src="userInfo.HeadIcon" alt="">
                    </span>
                    <p class="header-name">{{userInfo.NickName}}</p>
                </div>
                <!-- <div>
                    asdasdas
                </div> -->
            </div>
            <ul class="nav" @click="clickTab()">
                <li :class="$route.name === 'self_study-MyStudy' ? 'active' : ''" >
                    <nuxt-link to="/self_study/MyStudy">我的学习</nuxt-link>
                </li>
                <li :class="$route.name === 'self_study-MyComment' ? 'active' : ''">
                    <nuxt-link to="/self_study/MyComment">我的评论</nuxt-link>
                </li>
                <li :class="$route.name === 'self_study-CourseOrder' ? 'active' : ''">
                    <nuxt-link to="/self_study/CourseOrder">课程订单</nuxt-link>
                </li>
                <li :class="$route.name === 'self_study-Backstage' ? 'active' : ''">
                    <nuxt-link to="/self_study/Backstage">后台管理</nuxt-link>
                </li>
            </ul>
        </div>
        <div class="study-lr">
            <nuxt-child />
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    layout: "course",
    head: {
        title: '建筑学院',
    },
    computed: {
        ...mapState({
            userInfo: state => state.overas.auth ? state.overas.auth: ""
        }),
    },
    data () {
        return {
            indexStudy: 0
        }
    },
    methods: {
        clickTab () {
            console.log(this.$route.name)
            try {
                let dataindex = event.target.attributes["data-index"]
                let index = dataindex.value;
                this.indexStudy = Number(index);
            } catch (error) {
                this.indexStudy = 0;
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .study {
        width: 1200px;
        margin: 15px auto;
        display: flex;
        align-items: flex-start;
        &-lf {
            width: 200px;
            margin-right: 20px;
            background: #fff;
        }
        &-lr {
            width: 980px;
            background: #fff;
            padding: 10px 15px;
            min-height: 550px;
        }
    }
    .header{
        border-bottom: 1px solid #f1efef;
        padding-bottom: 15px;
        &-img {
            display: block;
            width: 90px;
            height: 90px;
            margin: 10px auto 0 auto;
            border: solid 6px #f1efef;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        &-name {
            margin-top: 6px;
            font-size: 16px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .nav {
        padding: 10px 15px;
        font-size: 14px;
        li {
            padding-left: 60px;
            cursor: pointer;
            position: relative;
            margin: 10px 0;
            font-size: 16px;
            line-height: 30px;
            &:hover {
                color: #3bc66f;
            }
        }
        li.active {
            color: #3bc66f;
            &::before {
                content: "";
                display: inline-block;
                position: absolute;
                width: 3px;
                height: 30px;
                background: #3bc66f;
                left: -15px;
            }
        }
    }
</style>