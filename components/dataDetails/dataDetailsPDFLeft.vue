<template>
    <div>
        <iframe class="pdfIframe"
                :src="'http://www.pic.jzbl.com/pdfjs/web/viewer.html?path=' + PdfInfo.FilePath"
                frameborder="0"></iframe>
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
      },
      PdfInfo: {
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
        width: 850px;
        height: 1500px;
    }
</style>
