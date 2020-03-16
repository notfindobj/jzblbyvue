<template>
  <ossUp 
    accept="video/mp4"
    :maxsize="maxSize"
    :showUploadList="true"
    @uploadSuccess="uploadSuccess"
    @beforeUpload="beforeUpload">
      <div class="upload1">
        <img v-if="previewSrc !== ''" :src="`${previewSrc}?x-oss-process=video/snapshot,t_10000,m_fast`" alt="">
        <span v-else>
            <i class="icon iconfont">&#xe613;</i>
            添加视频
        </span>
      </div>
  </ossUp>
</template>
<script>
  import { mapState, mapGetters } from 'vuex'
  import ossUp from "../ossUp/ossUp"
  export default {
    components: {
      ossUp
    },
    props: {
      previewSrc: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        maxSize: 1024 * 50,
        baseUrl: process.env.baseUrl,
        token: ''
      }
    },
    computed: {
      ...mapState({
          userInfo: state => state.overas.auth || {},
      })
    },
    methods: {
      // 上传前
      beforeUpload(file) {
        this.$emit('beforeSuccess', file);
      },
      // 删除文件
      removeFile() {
        this.$emit('clearVideo');
      },
      // 上传成功
      uploadSuccess(res) {
        debugger
        this.$emit('uploadSuccess', res)
      }
    },
    created() {
      this.token = "Bearer " + this.userInfo.token || '';
    },
  }
</script>

<style lang="less" scoped>
    /deep/.ivu-upload-list {
      position: absolute;
    }
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
        img {
          width: 100%;
          height: 100%;
        }
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
