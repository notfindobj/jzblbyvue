<template>
    <div>
       <iframe class="pdfIframe" src="http://www.pic.jzbl.com/pdfjs/web/viewer.html?path=/ItemFiles/3eb62c63-e608-41bf-95f4-30312481e96e/8f51ebea-dcf1-45a7-acb2-44a6982e4ba3/6368081391281068504757357.pdf" frameborder="0"></iframe> 
    </div>
</template>
<script>
export default {
    props: {
        detaDetails: {
            type: Object,
            required: true,
            default: function () {
            return {}
            }
        }
    }
}
</script>
<style>
    .pdfIframe {
        width: 800px;
        height: 1500px;
    }
</style>
