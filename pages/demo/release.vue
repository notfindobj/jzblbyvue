<template>
    <div>
        <input type="file" value="上传文件" @change="upData">
    </div>
</template>
<script>
// let client = new OSS({
//     region: 'oss-cn-shanghai',
//     accessKeyId: 'LTAI4FmRKvcZWCxx9xKhrtE2',
//     accessKeySecret: 'HMM8yiPdmJinY5kaLWojAX7BrnekuD',
//     bucket: 'jzbl-pic'
// });
import OSS from 'ali-oss'
import {getPostPolicy} from '../../service/clientAPI'
import ossRequest from '../../oss'
export default {
    data () {
        return {
            client: null
        }
    },
    methods: {
        upData (e) {
            let _this= this;
            let file = e.target.files[0];
            let query = {
                publishType: 0,
                fileType: 0
            }
            getPostPolicy(query).then(async res => {
                let uploadObj = res;
                // 获取到上传凭证成功之后 封装请求的数据
                let request = new FormData();
                request.append("OSSAccessKeyId", uploadObj.accessid); //Bucket 拥有者的Access Key Id。
                request.append("policy", uploadObj.policy); //policy规定了请求的表单域的合法性
                request.append("Signature", uploadObj.signature); //根据Access Key Secret和policy计算的签名信息，OSS验证该签名信息从而验证该Post请求的合法性
                request.append("key", `${uploadObj.publishpath+file.name}`); //文件名字，可设置路径
                request.append("success_action_status", '200'); // 让服务端返回200,不然，默认会返回204
                request.append('file', file); //需要上传的文件 file 
                let msg = await ossRequest.post(uploadObj.host, request);
                if (msg) {
                    console.log(msg)
                }
            }).catch(err => {
                console.log('>>>>>>>>>>', err)
            })
        }
    },
}
</script>