<template>
    <ossUp
     @uploadSuccess="uploadSuccess"
     @beforeUpload="beforeUpload">
        <div class="upload" >
          <i class="icon iconfont">&#xe613;</i>
      </div>
    </ossUp>
</template>

<script>
  import { uploadFile } from '../../service/clientAPI'
  import ossUp from "../ossUp/ossUp"
  export default {
    components: {
      ossUp
    },
    props: {
      uploadType: Number,
      nowLength: {
        type: Number,
        default: 0
      },
      maxLength: {
          type: Number,
          default: 30
      }
    },
    methods: {
      async beforeUpload (obj) {
        this.$emit('beforeSuccessMD', obj);
      },
      async uploadSuccess(res, file, filelist) {
        this.$emit('uploadSuccess', res);
      }
    }
  }
</script>

<style lang="less" scoped>
    .upload {
        position: relative;
        width: 70px;
        height: 70px;
        border-radius: 4px;
        // border: 1px dashed #ddd;
        color: #ddd;
        font-size: 16px;
        cursor: pointer;
        transition: all .2s linear;

        i {
            position: absolute;
            left: 22px;
            top: 22px;
            z-index: 1;
            font-size: 22px;
            color: #b6b6b6;
        }

        a {
            position: absolute;
            z-index: 2;
        }
    }

    .upload:hover {
        border-color: #ff3c00;
    }

    input[type="file"] {
        width: 70px;
        height: 70px;
        opacity: 0;
        filter: alpha(opacity=0);
        cursor: pointer;
    }
</style>
