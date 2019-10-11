<template>
  <!-- <vpdf src="http://www.pic.jzbl.com/ItemFiles/0d54bf62-e42b-460b-aab4-7e6bd1990221/2637dac5-9407-41b2-b92f-b96729791ae7/6367882457649268563294295.pdf"></vpdf> -->
  <div>
    <canvas :id='"the-canvas"' class="pdf-content"></canvas>
  </div>
</template>
<script>
import PDFJS from 'pdfjs-dist'
PDFJS.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
export default {
  data () {
    return {
      pdfInfo: {
        serverUrl: "",
        pdfUrl: ""
      },
      totalPage: 0,
      pdfFile: ""
    }
  },
  mounted () {
    var url = 'http://www.pic.jzbl.com/ItemFiles/0d54bf62-e42b-460b-aab4-7e6bd1990221/2637dac5-9407-41b2-b92f-b96729791ae7/6367882457649268563294295.pdf';
    PDFJS.getDocument(url).then((pdf) => {
        this.totalPage = pdf.numPages
        return pdf.getPage(1);
    }).then((page) => {
        // 设置展示比例
        var scale = 1.5;
        // 获取pdf尺寸
        var viewport = page.getViewport(scale);
        // 获取需要渲染的元素
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
  }
}
</script>