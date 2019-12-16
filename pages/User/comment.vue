<template>
    <div>
        <Title/>
        <msgTab/>
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
    }
}
</script>