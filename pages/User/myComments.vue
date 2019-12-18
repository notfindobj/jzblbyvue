<template>
    <div>
        <Title/>
        <msgTab :TabList="TabList"/>
        <div>
           <comCard/>
            <comCard :left="false"/>
            <comCard :cintent="false "/>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import msgTab from './components/msgTab'
import comCard from './components/comCard'
export default {
    components: {
        Title,
        msgTab,
        comCard
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