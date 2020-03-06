<template>
    <div>
        <Upload
            multiple
            type="drag"
            :headers= "headers"
            :action="uploadHost"
            :data="uploadData"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
        >
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
        </Upload>
        <img :src="`${filePath}?x-oss-process=image/resize,m_fill,h_100,w_200`" alt="">
    </div>
</template>
<script>
// 引入生成上传参数方法
import {oss} from './ossUpload.js'
export default{
  data() {
    return{
        headers: {
            "Content-Type" : "image/jpg"
        },
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
      return oss(file.name).then(res => {
        console.log('ossupload', res);
        
        this.uploadHost = res.host
        this.uploadData = res;
      })
    },
    // 上传成功的回调函数
    handleSuccess(res, file, fileList) {
      console.log('handleSuccess',res)
      /* 上传成功后，文件服务器会返回上传文件在oss上存储位置、文件名及相关信息
      {
        filename: "test/file-dir/JdzYDhdrtF.jpg"
        height: "683"
        mimeType: "image/jpeg"
        size: "186142"
        url: "http://xxxx.xxx.com/test/file-dir/JdzYDhdrtF.jpg"
        width: "1024"
      }
     *
    */

    // 根据自己的业务场景，将返回的文件位置信息和其他表单信息一起提交给后端进行业务关联，在其他地方需要使用附件时可以根据url位置找到上传的文件 
    //   this.fileName= res.data.filename,
      this.filePath= this.uploadData.host + '/'+ this.uploadData.key
    }
  }
}
</script>