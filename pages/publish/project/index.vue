<template>
    <div class="page" @click="isShowUpload = false">
        <div class="content">
            <Form
                ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                class="form-box publish-project-form"
                :label-width="110"
            >
                <FormItem label="项目图片" prop="img">
                    <div class="upload-img-wrap" v-if="formValidate.img">
                        <img class="title-img" :src="formValidate.img" alt="">
                    </div>
                    <div class="upload-img-wrap">
                        <div class="upload-component">
                            <a href="javascript:">
                                <input
                                    type="file"
                                    @change="fileSelected($event)"
                                    accept="image/gif,image/jpeg,image/jpg,image/png"
                                >
                            </a>
                            <Icon type="ios-add-circle" size="35" color="#ff3c00"/>
                        </div>
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
                    <i
                        v-for="item in typeList"
                        :key="item.id"
                    >
                        <Button
                            size="large"
                            v-if="typeId === item.id"
                            type="primary"
                        >{{ item.ItemValue }}
                        </Button>
                        <Button
                            size="large"
                            v-else
                            @click="clickType(item.id)"
                        >{{ item.ItemValue }}
                        </Button>
                    </i>

                </FormItem>
                <FormItem label="定制服务" class="make-service">
                    <span class="add-service-btn" @click="serviceModal = true">
                        <Icon type="md-add" size="12"/>
                        添加定制服务
                    </span>
                </FormItem>
                <FormItem label="项目描述" class="description">
                    <textarea v-model="formValidate.description" placeholder="请填写项目描述"></textarea>
                </FormItem>
                <FormItem label="项目内容">
                    <div class="editor-wrap">
                        <div class="quill-editor"
                             :content="formValidate.content"
                             @change="onEditorChange($event)"
                             v-quill:myQuillEditor="editorOption"
                        >
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
        <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>

        <Modal
            v-model="serviceModal"
            width="594"
            title="提供定制服务"
            class-name="service-box"
        >

            <div class="service-box-content">
                <Form
                    ref="serviceValidate"
                    :model="serviceValidate"
                    :rules="ruleServiceValidate"
                    :label-width="80"
                >
                    <FormItem label="定制类型:" prop="type">
                        <span
                            class="service-type-name"
                            :class="{'service-active': item.ItemDetailId === serviceValidate.serviceId}"
                            v-for="item in serviceList"
                            :key="item.ItemDetailId"
                            @click="selectSerice(item.ItemDetailId)"
                        >{{ item.ItemValue }}</span>
                    </FormItem>

                    <FormItem label="定制金额:" prop="money">
                        <Input v-model="serviceValidate.money" placeholder="请选择"></Input>
                    </FormItem>
                    <FormItem label="手机号码:" prop="mobile">
                        <Input v-model="serviceValidate.mobile" placeholder="请输入11位手机号码"></Input>
                    </FormItem>
                    <FormItem label="定制描述:" prop="desc">
                        <Input
                            v-model="serviceValidate.desc"
                            type="textarea"
                            :autosize="{minRows: 5,maxRows: 5}"
                            placeholder="请填写0-200字简介"
                        ></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="cancelService">取消</Button>
                <Button type="primary" @click="serviceModal = false">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
  import { uploadFile, getProjectType, getCustomizeService, getMenu } from '../../../service/clientAPI'

  export default {
    data() {
      return {
        typeId: '',
        typeList: [],
        serviceModal: false,
        serviceId: '',
        formValidate: {
          name: '',
          img: '',
          content: '',
          description: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          img: [
            { required: true, message: '图片不能为空', trigger: 'blur' }
          ],
        },
        serviceValidate: {
          serviceId: '',
          money: '',
          mobile: '',
          desc: ''
        },
        ruleServiceValidate: {
          type: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
          money: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: ' ', trigger: 'blur' }
          ]
        },
        spinShow: false,
        serviceList: [],
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
    },
    methods: {

      // 选择定制服务
      selectSerice(id) {
        this.$set(this.serviceValidate, 'serviceId', id);
      },

      // 取消定制服务
      cancelService() {
        this.serviceModal = false;
        this.serviceValidate = {
          type: '',
          money: '',
          mobile: '',
          desc: ''
        }
      },

      // 选择图片
      fileSelected(e) {
        let file = e.target.files;
        if (file) {
          let data = new FormData();
          for (let item of file) {
            data.append('files', item)
          }
          this.spinShow = true;
          uploadFile(data, this.uploadType).then(res => {
            this.spinShow = false;
            this.$set(this.formValidate, 'img', res.smallImgUrl);
          }).catch(err => {
            console.log(err, 'uploadErr')
          })
        }
      },

      // 选择类型
      clickType(id) {
        this.typeId = id;
        getProjectType(id).then(res => {

        })
        getCustomizeService(id).then(res => {
          this.serviceList = res;
        })
      },
    },

    async asyncData() {
      const data = await Promise.all([getProjectType(''), getMenu()])
      return {
        typeList: data[0],
        menu: data[1]
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
            float: left;
            width: 260px;
            height: 196px;
            background-color: #f5f5f5;
            text-align: center;
            margin-right: 20px;

            .title-img {
                width: 100%;
                height: 100%;
            }

            p {
                font-size: 12px;
                color: #999;
            }

            .upload-component {
                position: relative;
                height: 88px;
                cursor: pointer;

                a {
                    position: absolute;
                    top: 40px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    z-index: 2;
                    cursor: pointer;
                }

                i {
                    position: absolute;
                    top: 40px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    z-index: 1;
                }

                input[type="file"] {
                    width: 35px;
                    height: 35px;
                    opacity: 0;
                    filter: alpha(opacity=0);
                    cursor: pointer;
                }
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
                resize: none;
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

    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    .service-type-name {
        font-size: 12px;
        color: #666;
        margin-right: 20px;
        cursor: pointer;
    }

    .service-active {
        color: #ff3c00;
    }

</style>
