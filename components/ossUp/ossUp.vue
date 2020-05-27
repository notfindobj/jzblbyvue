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
        :on-remove="onRemove"
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
      fileType: {
        type: Number,
        default: 0
      },
      maxSize: {
        type: Number,
        default: 1024
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
        fileName: {},
        // 上传后返回的文件存储地址
        filePath: ''
      }
  
  },
  methods: {
    // 在Upload组件的钩子before-upload中获取到生成的参数信息
    beforeUpload(file) {
      if (file.size > this.maxSize * 1024000) {
        this.$Message.error({
          content:`${file.name}超过了${this.maxSize}M，请压缩后重新上传！`,
          duration: 2
        })
        return false
      }
      let _this = this;
      return oss(file.name, _this.fileType).then(res => {
        this.uploadHost = res.host
        this.uploadData = res;
        this.fileName = res;
        if (this.accept === "video/*") {
          _this.$refs['uploadFile'].clearFiles();
          _this.$emit('beforeUpload', file,  res)
          return false
        } else {
          let obj = {
            action: true,
            key: _this.imgBaseUrl + res.key,
            smallImgUrl: window.URL.createObjectURL(file),
            bmf: file.name,
          }
          _this.$emit('beforeUpload', obj)
        }
        return res
      })
    },
    onRemove () {
      this.$emit("onRemove")
    },
    // 上传成功的回调函数 imgBaseUrl
    handleSuccess(res, file, filelist) {
      let obj = {
        name: file.name,
        action: false,
        key: file.key,
        smallImgUrl: this.imgBaseUrl + this.uploadData.key
      }
      this.$emit('uploadSuccess', obj);
    },
  }
}
</script>