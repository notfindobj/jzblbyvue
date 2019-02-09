<template>
    <div>
        <div @click="tipClick" class="a">按钮</div>
    </div>
</template>
<script>
export default {
    head () {
        return {
            title: `关于我们`,
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'about', name: 'about', content: "关于我们" }
            ],
        }
    },
    asyncData() {
        $axios.get('/journalismApi').then(res => {
            console.log(res)
        })
    },
    created() {
        // let 
        this.$axios.get('/journalismApi').then(res => {
            console.log(res)
        })
    },
    methods: {
        tipClick () {
            this.$Message.info('This is a info tip');
        }
    }
}
</script>
<style>

</style>
