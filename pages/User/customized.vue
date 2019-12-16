<template>
    <div>
        <Title/>
        <msgTab/>
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
    }
}
</script>
<style lang="less" scoped>
    .custom {
        display: flex;
        justify-content: space-between;
        line-height: 30px;
    }
</style>