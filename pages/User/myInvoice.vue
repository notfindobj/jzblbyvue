<template>
    <div>
        <Title :bottomLine="false"/>
        <msgTab title="我的发票" :TabList="TabList"/>
         <nuxt-child />
    </div>
</template>
<script>
import Title from './components/title'
import msgTab from './components/msgTab'
import baseCard from '../../components/baseCard'
export default {
    components: {
        Title,
        msgTab,
        baseCard
    },
    data () {
        return {
            TabList: [
                {path: '/User/myInvoice', label: '我的发票'},
                {path: '/User/myInvoice', label: '发票设置'},
            ]
        }
    }
}
</script>
<style lang="less" scoped>
  
</style>