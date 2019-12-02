<template>
    <div>
        <iframe class="pdfIframe" width="100%" height="100%" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"
                :src="`${pdfBaseUrl}pdfjs/web/viewer.html?path=${PdfInfo.FilePath}`"
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
    },
    data () {
        return {
          pdfBaseUrl: process.env.fileBaseUrl
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
