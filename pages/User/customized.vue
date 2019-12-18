<template>
    <div>
        <Title/>
        <msgTab :TabList="TabList"/>
        <div>
            <msgCard>
                <div slot="header" class="custom">
                    <div>
                        嘿嘿嘿定制了您发布的
                    </div>
                    <Button type="primary">查看</Button>
                </div>
            </msgCard>
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
<style lang="less" scoped>
    .custom {
        display: flex;
        line-height: 30px;
        justify-content: space-between;
        width: 100%;
    }
</style>