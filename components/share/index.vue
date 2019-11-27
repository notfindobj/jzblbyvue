<template>
     <Modal v-model="config.isModal" footer-hide width="400" class-name="vertical-center-modal">
        <div class="qrcode-title">
            打开微信“扫一扫”，打开网页后点击屏幕右上角分享按钮
        </div>
        <div class="qrcode">
            <img :src="QRCodeData" alt="分享链接">
        </div>
    </Modal>
</template>
<script>
import QRCode from 'qrcode'
export default {
    props: {
        config: {
            type: Object,
            default: () => {}
        },
        qrcodeContent: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            QRCodeData: ''
        }
    },
    watch: {
        qrcodeContent(newValue, oldValue) {
            this.qrcode(newValue)
        }
    },
    methods: {
        qrcode (row) {
            let content = ''
            // 图文
            switch(row.TalkType) {
                case 1: 
                    content =  `${process.env.localUrl}pictureDetails/${row.ItemId}`
                    break;
                case 2: 
                    content =  `${process.env.localUrl}videoDetails/${row.ItemId}`
                    break;
                case 3: 
                    content =  `${process.env.localUrl}QuestionsAndAnswers/${row.ItemId}`
                    break;
                case 4: 
                    content =  `${process.env.localUrl}DataDetails?id=${row.ItemId}&layout=true`
                    break;
                case 5: 
                    content =  `${process.env.localUrl}pictureDetails/${row.ItemId}`
                    break;
                default:
                    content =  `${process.env.localUrl}pictureDetails/${this.$route.fullPath}`
            }
            QRCode.toDataURL(content)
            .then(url => {
                this.QRCodeData = url
            })
            .catch(err => {
                console.error(err)
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
