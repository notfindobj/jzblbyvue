<template>
    <div v-if="!loading">
    </div>
</template>
<script>
export default {
    props: {
        loading: {
            type: Boolean,
            default: true
        }
    }
}
</script>