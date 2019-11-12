<template>
    <Upload
        ref="uploadFile"
        @click.stop=""
        :action="baseUrl + 'Upload/DataUpload?uploadType=7'"
        :headers="{
            Authorization: token
        }"
        accept="video/mp4"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-remove="removeFile"
    >
        <div class="upload1">
            <span>
            <i class="icon iconfont">&#xe613;</i>
            添加视频
        </span>
        </div>
    </Upload>
</template>

<script>

  export default {
    data() {
      return {
        baseUrl: process.env.baseUrl,
        token: ''
      }
    },

    methods: {
      // 上传前
      beforeUpload() {
        if (this.$refs['uploadFile'].fileList.length > 0) {
          this.$refs['uploadFile'].clearFiles();
        }
          this.$emit('clearVideo');
      },
      // 删除文件
      removeFile() {
        this.$emit('clearVideo');
      },
      // 上传成功
      uploadSuccess(res) {
        this.$emit('uploadSuccess', res.Data)
      }
    },

    mounted() {
      this.token = "Bearer " + JSON.parse(localStorage.getItem('LOGININ')).token
    },
  }
</script>

<style lang="less" scoped>
    .upload1 {
        position: relative;
        width: 132px;
        height: 70px;
        border-radius: 4px;
        border: 1px dashed #ddd;
        color: #ddd;
        font-size: 16px;
        cursor: pointer;
        transition: all .2s linear;

        span {
            position: absolute;
            left: 26px;
            top: 22px;
            z-index: 1;
            color: #999;
        }

        a {
            position: absolute;
            z-index: 2;
        }
    }

    .upload1:hover {
        border-color: #ff3c00;
    }

    input[type="file"] {
        width: 132px;
        height: 70px;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
    }
</style>
