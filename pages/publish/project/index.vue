<template>
    <div class="page" @click="isShowUpload = false">
        <div class="content">
            <Form
                ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                class="form-box"
                :label-width="110"
            >
                <FormItem label="项目图片" prop="img">
                    <div class="upload-img-wrap">
                        <Upload action="" class="upload-component" accept="image/gif,image/jpeg,image/jpg,image/png">
                            <Icon type="ios-add-circle" size="35" color="#ff3c00"/>
                        </Upload>
                        <p>图片将会自动压缩</p>
                        <p>图片建议不要超过20M</p>
                    </div>
                </FormItem>
                <FormItem label="项目名称" prop="name">
                    <Input
                        v-model="formValidate.name"
                        placeholder="请填写项目名称（举例；新中式su模型）"
                        class="publish-input"
                        size="large"
                    ></Input>
                </FormItem>
                <FormItem label="类型选择" class="type-select">
                    <Button size="large">示范区</Button>
                    <Button size="large">楼盘</Button>
                    <Button size="large">示范区</Button>
                    <Button type="primary" size="large">示范区</Button>
                </FormItem>
                <FormItem label="定制服务" class="make-service">
                    <span class="add-service-btn">
                        <Icon type="md-add" size="12"/>
                        添加定制服务
                    </span>
                </FormItem>
                <FormItem label="项目描述" class="description">
                    <textarea placeholder="请填写项目描述"></textarea>
                </FormItem>
                <FormItem label="项目内容">
                    <div class="editor-wrap">
                        <div class="quill-editor"
                             :content="formValidate.content"
                             @change="onEditorChange($event)"
                             v-quill:myQuillEditor="editorOption">
                        </div>
                    </div>
                </FormItem>
            </Form>
        </div>
        <div class="submit-box">
            <p>
                <Checkbox class="checkbox" size="large"></Checkbox>
                我已仔细阅读并同意<span>《建筑部落用户协议》</span>
            </p>
            <Button type="primary">完成上传</Button>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        formValidate: {
          name: '',
          img: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          img: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
        },
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
          placeholder: '填写项目内容'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "~assets/css/publish/index.less";

    .content {
        padding-left: 10px;
    }

    .form-box {
        padding: 0;

        .publish-input {
            width: 770px;
            margin-left: 4px;
        }

        .upload-img-wrap {
            width: 260px;
            height: 196px;
            background-color: #f5f5f5;
            text-align: center;

            p {
                font-size: 12px;
                color: #999;
            }

            .upload-component {
                padding-top: 46px;
                cursor: pointer;
            }
        }

        .type-select {
            button {
                margin-right: 13px;
            }
        }

        .add-service-btn {
            display: inline-block;
            width: 120px;
            height: 36px;
            line-height: 36px;
            background-color: #f5f5f5;
            color: #999;
            font-size: 14px;
            text-align: center;
            border-radius: 2px;
            cursor: pointer;
        }

        .description {
            textarea {
                width: 770px;
                height: 120px;
                padding: 0 10px;
                border: 1px solid #d8d8d8;
                border-radius: 4px;
                outline: none;
                resize:none;
            }
            textarea::placeholder {
                color: #999;
            }
        }

        .editor-wrap {
            width: 770px;
        }
        .quill-editor {
            height: 318px;
            overflow-y: auto;
            border-radius: 0 0 4px 4px;
            border: 1px solid #d8d8d8;
        }
    }

</style>
