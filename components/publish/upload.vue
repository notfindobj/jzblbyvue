<template>
    <div class="upload" @click.stop="">
        <a href="javascript:">
            <input
                type="file"
                @change="fileSelected($event)"
                name="avatar"
                ref="avatarInput"
                multiple="multiple"
                accept="image/gif,image/jpeg,image/jpg,image/png"
            >
        </a>
        <i class="icon iconfont">&#xe613;</i>
    </div>
</template>

<script>
  import { uploadFile } from '../../service/clientAPI'

  export default {
    props: {
      uploadType: Number
    },

    methods: {
      fileSelected(e) {
        let file = e.target.files;
        if (file.length > 0) {
          let data = new FormData();
          for (let item of file) {
            data.append('files', item)
          }
          uploadFile(data, this.uploadType).then(res => {
            this.$emit('uploadSuccess', res);
          }).catch(err => {
            console.log(err, 'uploadErr')
          })
        }
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
        border: 1px dashed #ddd;
        color: #ddd;
        font-size: 16px;
        cursor: pointer;
        transition: all .2s linear;

        i {
            position: absolute;
            left: 26px;
            top: 22px;
            z-index: 1;
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
