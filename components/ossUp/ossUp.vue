<template>
    <Upload
        ref="uploadFile"
        multiple
        type="drag"
        :show-upload-list="showUploadList"
        :accept="accept"
        :action="uploadHost"
        :data="uploadData"
        :before-upload="beforeUpload"
        :on-success="handleSuccess" >
        <slot>
          <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </slot>
    </Upload>
</template>
<script>
// 引入生成上传参数方法
import {oss} from './ossUpload.js'
import BMF from 'browser-md5-file'
export default{
  props: {
      accept: String,
      maxsize: {
        type: Number,
        default: 10240
      },
      showUploadList: {
        type: Boolean,
        default: false
      }
    },
  data() {
    return{
        imgBaseUrl: process.env.imgBaseUrl,
        // 附件上传路径
        uploadHost: '',
        // 附件上传携带参数
        uploadData: {},
        // 上传后返回的存储的文件名
        fileName: '',
        // 上传后返回的文件存储地址
        filePath: ''
      }
  
  },
  methods: {
    // 在Upload组件的钩子before-upload中获取到生成的参数信息
    beforeUpload(file) {
      let _this = this;
      return oss(file.name).then(res => {
        this.uploadHost = res.host
        this.uploadData = res;
        if (this.accept === "video/mp4") {
          _this.$refs['uploadFile'].clearFiles();
          _this.$emit('beforeUpload',file,  res)
          return false
        } else {
          let obj = {
            action: true,
            smallImgUrl: window.URL.createObjectURL(file),
            bmf: file.name
          }
          _this.$emit('beforeUpload', obj)
        }
      })
    },
    // 上传成功的回调函数 imgBaseUrl
    handleSuccess(res, file, filelist) {
      let obj = {
        name: file.name,
        action: false,
        smallImgUrl: this.imgBaseUrl + '/'+ this.uploadData.key
      }
      this.$emit('uploadSuccess', obj);
    }
  }
}
</script>