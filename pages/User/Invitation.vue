<template>
    <div>
        <Title/>
        <msgTab/>
        <div>
            <msgCard>
                <div slot="footer" class="invitation-foot">
                    <Button type="primary">拒绝</Button>
                    <Button type="primary">立即加入</Button>
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
    }
}
</script>
<style lang="less" scoped>
    .invitation-foot {
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
    }
</style>