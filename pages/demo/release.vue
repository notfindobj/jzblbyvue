<template>
    <div>
        <div>
            <button id="prev">Previous</button>
            <button id="next">Next</button>
            &nbsp; &nbsp;
            <span>Page: <span id="page_num"></span> / <span id="page_count"></span></span>
        </div>
        <canvas id="the-canvas"></canvas>
    </div>
</template>
<script>
import PDFJS from 'pdfjs-dist';
PDFJS.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
export default {
    data () {
        return {
            pdfDoc: '',
            url: 'http://www.pic.jzbl.com/itemfiles/3eb62c63-e608-41bf-95f4-30312481e96e/de34f6f0-ca59-4f69-af12-1f31b817bad9/6367884353151413896292782.pdf',
            pageNum: 1,
            pageRendering: false,
            pageNumPending: null,
            scale: 0.8,
            canvas: null,
            ctx: null
        }
    },
    mounted () {
       this.initpdf() 
    },
    methods: {
        initpdf () {
            let _this = this;
            PDFJS.getDocument(_this.url).promise.then(function(pdfDoc_) {
                console.log(pdfDoc_)
                _this.pdfDoc = pdfDoc_;
                document.getElementById('page_count').textContent = _this.pdfDoc.numPages;
                // Initial/first page rendering
                _this.renderPage(_this.pageNum);
            });
            _this.canvas = document.getElementById('the-canvas'),
            _this.ctx = _this.canvas.getContext('2d');
            document.getElementById('prev').addEventListener('click', _this.onPrevPage);
            document.getElementById('next').addEventListener('click', _this.onNextPage);
        },
        // 从文档中获取页面信息，相应地调整画布大小，并呈现页面
        // num页码。
        renderPage(num) {
            let _this = this;
            _this.pageRendering = true;
            // Using promise to fetch the page
            _this.pdfDoc.getPage(num).then(function(page) {
                let viewport = page.getViewport({scale: _this.scale});
                _this.canvas.height = viewport.height;
                _this.canvas.width = viewport.width;
                // Render PDF page into canvas context
                let renderContext = {
                    canvasContext: _this.ctx,
                    viewport: viewport
                };
                let renderTask = page.render(renderContext);
                // Wait for rendering to finish
                renderTask.promise.then(function() {
                    _this.pageRendering = false;
                    if (_this.pageNumPending !== null) {
                        // New page rendering is pending
                        _this.renderPage(_this.pageNumPending);
                        _this.pageNumPending = null;
                    }
                });
            });
            // Update page counters
            document.getElementById('page_num').textContent = num;
        },
        // 如果正在进行另一页呈现，请等待呈现完成  已完成。否则，立即执行渲染。
        queueRenderPage(num) {
            let _this = this;
            if (_this.pageRendering) {
                _this.pageNumPending = num;
            } else {
                _this.renderPage(num);
            }
        },
        onPrevPage() {
            let _this = this;
            if (_this.ageNum <= 1) {
                return;
            }
            _this.pageNum--;
            _this.queueRenderPage(_this.pageNum);
            
        },
        onNextPage() {
            let _this = this;
            if (_this.pageNum >= _this.pdfDoc.numPages) {
                return;
            }
            _this.pageNum++;
            _this.queueRenderPage(_this.pageNum);
        }
    },
}
</script>