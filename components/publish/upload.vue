<template>
    <div class="upload">
        <a href="javascript:">
            <input
                type="file"
                @change="fileSelected($event)"
                name="avatar"
                ref="avatarInput"
                accept="image/gif,image/jpeg,image/jpg,image/png"
            >
        </a>
        <i class="icon iconfont">&#xe613;</i>
    </div>
</template>

<script>
  export default {
    methods: {
      fileSelected(e) {
        let file = e.target.files[0];
        if (file) {
          let files = this.$refs.avatarInput.files;
          let fileData = {};
          if (files instanceof Array) {
            fileData = files[0]
          } else {
            fileData = file
          }
          let data = new FormData();
          data.append('files', fileData);
          this.$axios({
            url: '/customer/file/upload',
            method: 'post',
            headers: {
              "Content-Type": "multipart/form-data"
            },
            data: data
          }).then(res => {
            this.$emit('uploadSuccess', res.data[0].url);
          }).catch(err => {
            this.$Notice.error({
              title: '上传出错',
              desc: ''
            });
          });
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
    }
</style>
