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
  import BMF from 'browser-md5-file'
  export default {
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
      async fileSelected(e) {
        let file = e.target.files;
        let now =  this.nowLength + file.length;
        if (now > this.maxLength) {
          this.$Message.info({
                render: h => {
                    return h('span', `图片上传最多不能超过${this.maxLength}张`)
                }
            });
          return false
        }
        const bmf = new BMF();
        if (file.length > 0) {
          for (let i= 0;i< file.length; i++) {
            let msg = await bmf.md5(file[i], (err, md5) => {
                if (err) return false
                let obj = {
                  action: true,
                  smallImgUrl: window.URL.createObjectURL(file[i]),
                  bmf: md5
                }
                this.$emit('beforeSuccessMD', obj);
                let data = new FormData();
                data.append('files', file[i])
                uploadFile(data, this.uploadType, md5).then(res => {
                  this.$emit('uploadSuccess', res);
                }).catch(err => {
                  console.log(err, 'uploadErr')
                })
              },
              progress => {
                console.log('progress number:', progress);
              },
            );
          }
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
