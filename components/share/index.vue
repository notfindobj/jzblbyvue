<template>
     <Modal v-model="config.isModal" footer-hide width="400" class-name="vertical-center-modal">
        <div class="qrcode-title">
            打开微信“扫一扫”，打开网页后点击屏幕右上角分享按钮
        </div>
        <div class="qrcode">
            <div id="qrcode" style="display:  inline-block;"></div>  
        </div>
    </Modal>
</template>
<script>
// import QRCode from 'qrcodejs2'
export default {
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            modal3: true
        }
    },
    mounted () {
        this.qrcode()
    },
    methods: {
        qrcode () {
          let qrcode = new QRCode('qrcode', {  
                width: 200,  
                height: 200, // 高度  [图片上传失败...(image-9ad77b-1525851843730)]
                text: 'http://www.jzbl.com/', // 二维码内容  
                render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                // background: '#f0f'  
                // foreground: '#ff0'  
            })  
        }  
    }
}
</script>
<style lang="less" >
    .qrcode-title {
        color: #000000;
        margin: 30px 0;
        text-align: center;

    }
    .qrcode {
        text-align: center;
        margin-bottom: 20px;
    }
     .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
    }
</style>
