<template>
    <div>
        <Title/>
        <msgTab :TabList="TabList"/>
        <div>
            <msgCard/>
            <msgCard :bodyType="false"/>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import msgTab from './components/msgTab'
import msgCard from './components/msgCard'
export default {
    components: {
        Title,
        msgTab,
        msgCard
    },
    data () {
        return {
            TabList: [
                {path: '/User/system', label: '系统消息'},
                {path: '/User/comment', label: '评论消息'},
                {path: '/User/customized', label: '定制消息'},
                {path: '/User/Invitation', label: '邀请消息'}
            ]
        }
    }
}
</script>