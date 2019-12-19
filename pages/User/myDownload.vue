<template>
    <div>
        <Title/>
        <msgTab :TabList="TabList"/>
        <div class="release">
            <template v-for="item in 9">
                <baseCard :key="item"/>
            </template>
            <div class="release-page">
                <Page :total="100" />
            </div>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import msgTab from './components/msgTab'
import baseCard from '../../components/baseCard'
export default {
    key: to => to.fullPath,
    components: {
        Title,
        msgTab,
        baseCard
    },
    data () {
        return {
            TabList: [
                {path: '/User/myRelease', label: '我的发布'},
                {path: '/User/myCollection', label: '我的收藏'},
                {path: '/User/myDownload', label: '我的下载'},
                {path: '/User/myComments', label: '我的评论'},
                {path: '/User/myConcern', label: '我的关注'},
                {path: '/User/myRecommended', label: '被推荐作品'},
                {path: '/User/browseRecord', label: '浏览记录'}
            ]
        }
    }
}
</script>
<style lang="less" scoped>
    .release {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        &-page {
            text-align: center;
            width: 100%;
            margin-top: 10px;
        }
    }
</style>