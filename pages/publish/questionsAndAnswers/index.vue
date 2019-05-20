<template>
    <div class="page" @click="isShowUpload = false">
        <div class="content">
            <Form
                ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                class="form-box"
            >
                <FormItem prop="title">
                    <p class="input-title">
                        <span class="red-dot"></span>
                        <span class="input-label">标题</span>
                    </p>
                    <Input
                        v-model="formValidate.title"
                        placeholder="请填写项目名称（举例：新中式景观廊架su模型）"
                        size="large"
                        class="publish-input"
                    ></Input>
                    <span class="error-info" v-if="titleIsError">
                        <Icon type="ios-alert" size="27" color="#ff3c00"/>
                        必填项
                    </span>
                </FormItem>
                <FormItem prop="title" style="margin-bottom: 0;">
                    <p class="input-title">
                        <span class="red-dot"></span>
                        <span class="input-label">上传问题及说明</span>
                    </p>
                    <div class="editor-wrap">
                        <div class="quill-editor"
                             :content="formValidate.content"
                             @change="onEditorChange($event)"
                             v-quill:myQuillEditor="editorOption">
                        </div>
                    </div>
                </FormItem>
                <div class="toolbar">
                    <div class="toolbar-left">
                    <span class="tools add-img" @click.stop="isShowUpload = !isShowUpload">
                        <i class="icon iconfont">&#xe631;</i>
                        <span class="text">添加图片</span>
                    </span>
                    </div>
                    <div class="upload-box" v-show="isShowUpload">
                        <h3>本地上传</h3>
                        <p class="sub-title">共0张，还能上传9张</p>
                        <div class="upload-main">
                            <div class="img-item" v-for="item in imgList" :key="item"></div>
                            <v-upload class="upload"/>
                        </div>
                    </div>
                    <div class="upload-box-top" v-show="isShowUpload"></div>
                </div>
                <div class="tags-row">
                    <p class="input-title">
                        <span class="red-dot"></span>
                        <span class="input-label">标签</span>
                    </p>
                    <div class="tags-area" @click="inputTag">
                        <span class="tag-item" v-for="item in 3" :key="item" @click.stop="">
                            示范区
                            <i class="icon iconfont">&#xe6f1;</i>
                        </span>
                        <input type="text" ref="input" placeholder="点击空白处输入标签">
                    </div>
                </div>
                <div class="recommend-tags">
                    <span class="recommend-title">推荐标签: </span>
                    <span class="tag-item" v-for="item in 10" :key="item">
                        <i class="icon iconfont">&#xe61c;</i>
                        示范区去
                    </span>
                </div>
                <p class="btn-change">
                    换一换
                </p>
            </Form>
        </div>
        <div class="submit-box">
            <p>
                <Checkbox class="checkbox" size="large"></Checkbox>
                我已仔细阅读并同意<span>《建筑部落用户协议》</span>
            </p>
            <Button type="primary" @click="handleSubmit(formValidate)">完成上传</Button>
        </div>
    </div>
</template>

<script>
  import Upload from '~/components/publish/upload'
  import { getQALabel } from '../../../service/clientAPI'

  export default {
    data() {

      const validateTitle = (rule, value, callback) => {
        if (value.trim() === '') {
          this.titleIsError = true;
          callback();
        } else {
          this.titleIsError = false;
          callback();
        }
      };
      return {
        formValidate: {
          title: '',
          content: ''
        },
        ruleValidate: {
          title: [
            { validator: validateTitle, trigger: 'blur' }
          ]
        },
        titleIsError: false,  // 是否显示标题校验错误信息
        isShowUpload: false,    // 是否显示上传图片
        imgList: [1, 2, 3, 4, 5, 6],
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['image']
            ]
          },
          placeholder: '详细描述你遇到的问题，可获得更好的回答！'
        }
      }
    },

    components: {
      'v-upload': Upload
    },

    methods: {

      onEditorChange(e) {
        this.formValidate.content = e.html;
      },

      inputTag() {
        this.$refs.input.focus();
      }
    },

    // async asyncData({store}) {
    //   const data = await getQALabel();
    //   console.log(data);
    // }
  }
</script>


<style lang="less" scoped>
    @import "~assets/css/publish/index.less";
    .editor-wrap {
        width: 900px;
    }

    .quill-editor {
        height: 318px;
        overflow-y: auto;
        border-radius: 0 0 4px 4px;
        border: 1px solid #d8d8d8;
    }

    .toolbar {
        position: relative;
        overflow: visible;
    }

    .toolbar:after {
        content: '';
        display: block;
        overflow: hidden;
        clear: both;
    }

    .upload-box {
        bottom: -253px;
        left: 8px;
    }

    .upload-box-top {
        bottom: -49px;
        left: 16px;
    }

    .tag-item {
        float: left;
        position: relative;
        height: 25px;
        margin: 10px 10px 10px 0;
        padding: 0 8px;
        line-height: 25px;
        background-color: #F5F6F5;
        border: 1px solid #D7D7D7;
        border-radius: 2px;
        cursor: pointer;

        i {
            position: relative;
            top: -1px;
            vertical-align: middle;
        }
    }

    .tag-item:after {
        content: '';
        display: block;
        position: absolute;
        top: 7px;
        left: -4px;
        width: 7px;
        height: 7px;
        transform: rotate(-45deg);
        background-color: #F5F6F5;
        border-top: 1px solid #D7D7D7;
        border-left: 1px solid #D7D7D7;
        border-radius: 1px;
    }

    .tags-row {
        margin-top: 30px;
        overflow: hidden;

        .input-title {
            float: left;
        }

        .tags-area {
            float: left;
            width: 838px;
            margin-left: 20px;
            padding: 0 10px;
            border: 1px solid #d8d8d8;
            overflow: hidden;

            input {
                float: left;
                border: none;
                outline: none;
                margin: 10px;
                line-height: 25px;
            }

            input::placeholder {
                color: #999;
            }
        }
    }

    .recommend-tags {
        width: 900px;
        margin-top: 10px;
        padding-left: 60px;
        overflow: hidden;
        .recommend-title {
            margin-right: 25px;
        }
        span {
            float: left;
            margin: 0 12px 10px 0;
            line-height: 25px;
        }
        .tag-item {
            i {
                line-height: 13px;
                font-size: 12px;
                color: #FF3C00;
            }
        }
    }

    .btn-change {
        width: 900px;
        text-align: right;
        font-size: 14px;
        color: #559BDC;
        cursor: pointer;
        margin-bottom: 20px;
    }
</style>
