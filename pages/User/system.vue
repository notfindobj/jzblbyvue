<template>
    <div>
        <Title/>
        <msgTab/>
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
    }
}
</script>