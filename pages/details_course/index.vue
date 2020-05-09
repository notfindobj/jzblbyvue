<template>
    <div class="details">
        <div class="details-video">
            <courseVideo/>
        </div>
        
    </div>
</template>
<script>
import courseVideo from "./components/courseVideo"
export default {
    layout: "main",
    components: {
        courseVideo
    }
}
</script>
<style lang="less" scoped>
.details {
    background-color: #292929;
    &-video {
        width: 1200px;
        margin: 0 auto;
    }
}
</style>