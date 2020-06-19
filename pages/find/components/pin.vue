<template>
    <div>
        <modal @closeModal="closeModal"/>
    </div>
</template>
<script>
import modal from "./modal"
export default {
    components: {
        modal
    },
    methods: {
        closeModal () {
            this.$emit("closeModal")
        }
    }
}
</script>