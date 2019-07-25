<template>
    <div class="page" @click="isShowUpload = false">
        <div class="content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class="form-box publish-project-form" :label-width="110" >
                <FormItem label="项目图片" prop="img">
                    <div class="upload-img-box" :style="`background-image:url(${formValidate.img});`" @mouseenter="enteUpload(formValidate.img)" @mouseleave="leaveUpload(formValidate.img)">
                    <div :class="!isMove ? 'upload-img-wrap upload-img-ente' : 'upload-img-wrap upload-img-leave'" 
                      :style="`display: ${!formValidate.img || isMove? 'inline-block;' : 'none;'} `" @click="uploadJeck">
                        <div class="upload-component">
                            <a href="javascript:" style="display:none;">
                                <input ref="imgFile" type="file" @change="fileSelected($event)" accept="image/gif,image/jpeg,image/jpg,image/png">
                            </a>
                            <Icon type="ios-add-circle" size="35" color="#ff3c00"/>
                        </div>
                        <p>图片将会自动压缩</p>
                        <p>图片建议不要超过20M</p>
                    </div>
                    </div>
                </FormItem>
                <FormItem label="项目名称" prop="name">
                    <Input v-model="formValidate.name" placeholder="请填写项目名称（举例；新中式su模型）" class="publish-input" size="large" ></Input>
                </FormItem>
                <FormItem label="类型选择" class="type-select" prop="typeId">
                    <i v-for="item in menu.RetMenuData" :key="item.ItemAttributesId" >
                        <Button size="large" v-if="formValidate.typeId === item.ItemAttributesId" type="primary" >{{ item.ItemAttributesFullName }} </Button>
                        <Button size="large" v-else @click="clickType(item.ItemAttributesId, item.ItemAttributesFullName)" >{{ item.ItemAttributesFullName }} </Button>
                    </i>
                    <div class="attr-box" v-show="attrList">
                        <div class="attr-select-item" v-for="(item, index) in queryAttrList" v-if="item.EnCode !== '[wjsc]' && item.EnCode !== '[pdfwjsc]'" :key="item.id" >
                            <span v-if="item.EnCode !== '[wjsc]' && item.EnCode !== '[pdfwjsc]'" >
                                {{ item.ItemValue }}
                            </span>
                            <Select v-if="item.EnCode !== '[wjsc]' && item.EnCode !== '[pdfwjsc]'" v-model="item.ItemSubAttributeId" style="width:220px" size="large" >
                                <Option v-for="subItem in attrList[index].ChildNode" :value="subItem.ItemAttributesId" :key="subItem.ItemAttributesId" >
                                    {{ subItem.ItemAttributesFullName }}
                                </Option>
                            </Select>
                        </div>
                        <div class="attr-select-item attr-upload-item" v-for="item in queryAttrList" v-if="item.EnCode === '[wjsc]' || item.EnCode === '[pdfwjsc]'" :key="item.id" >
                            <span v-if="item.EnCode === '[wjsc]'" style="vertical-align: top;" >
                                文件上传
                            </span>
                            <span v-if="item.EnCode === '[pdfwjsc]'" style="vertical-align: top;" >
                                PDF上传
                            </span>
                            <Upload
                                ref="uploadFile"
                                v-if="item.EnCode === '[wjsc]'"
                                :action="baseUrl + 'Upload/DataUpload?uploadType=6'"
                                :headers="{
                                    Authorization: token
                                }"
                                :format="['zip', 'rar']"
                                :on-format-error="handleFormatError"
                                :before-upload="clearUpload"
                                :on-success="uploadSuccess"
                                :on-remove="removeFile"
                                style="display: inline-block;"
                            >
                                <Button icon="ios-cloud-upload-outline" size="large">上传文件</Button>
                            </Upload>
                            <Upload
                                ref="uploadFile"
                                v-if="item.EnCode === '[pdfwjsc]'"
                                :action="baseUrl + 'Upload/DataUpload?uploadType=4'"
                                :headers="{ Authorization: token }"
                                accept=".pdf"
                                :before-upload="clearUpload"
                                :on-success="uploadSuccess"
                                :on-remove="removeFile"
                                style="display: inline-block;"
                            >
                                <Button icon="ios-cloud-upload-outline" size="large">上传PDF文件</Button>
                            </Upload>
                        </div>
                        <div class="attr-select-item attr-upload-item" v-for="(item, index) in queryAttrList" v-if="item.EnCode === '[wjsc]'" :key="index" >
                             <span style="vertical-align: top;">
                                收取费用
                            </span>
                            <Input v-model="price" size="large" :disabled="!typeFile" placeholder="请上传文件后输入价格" style="width: 300px;" />
                            <span style="width: 20px;">元</span>
                        </div>
                    </div>
                </FormItem>
                <FormItem label="定制服务" class="make-service">
                    <Button type="primary" v-for="(item, index) in serviceSelectList" :key="item.serviceId" size="small" style="margin-right: 10px;" @click="updateService(index)" >
                        {{ item.name }}
                    </Button>
                    <span class="add-service-btn" @click="addService" v-show="this.serviceList.length > 0">
                        <Icon type="md-add" size="12"/>
                        添加定制服务
                    </span>
                    <span class="add-service-btn" v-show="formValidate.typeId && serviceList.length === 0">
                        无可添加定制服务
                    </span>
                </FormItem>
                <FormItem label="项目描述" class="description">
                    <textarea v-model="formValidate.description" placeholder="请填写项目描述"></textarea>
                </FormItem>
                <FormItem label="项目内容" prop="content" v-show="typeName !== '建筑规范'">
                    <div class="editor-wrap">
                        <div class="quill-editor" :content="formValidate.content" @change="onEditorChange($event)" v-quill:myQuillEditor="editorOption" >
                        </div>
                    </div>
                </FormItem>
                <input type="file" style="display: none;" id="getFile"  @change="selectContentImg($event)" multiple accept="image/gif,image/jpeg,image/jpg,image/png" >
            </Form>
        </div>
        <div class="submit-box">
            <p>
                <Checkbox class="checkbox" size="large" v-model="isAgree"></Checkbox>
                我已仔细阅读并同意<span>《建筑部落用户协议》</span>
            </p>
            <Button type="primary" @click="clickSubmit">完成上传</Button>
        </div>
        <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <Modal v-model="serviceModal" width="594" title="提供定制服务"  class-name="service-box" >
            <div class="service-box-content">
                <Form ref="serviceValidate" :model="serviceValidate" :label-width="80" >
                    <FormItem label="定制类型:">
                        <template v-if="!isUpdateService" v-for="item in serviceList" >
                            <Button class="service-btn" size="small" :key="item.ItemDetailId"
                                v-if="item.ItemDetailId !== serviceValidate.serviceId"
                                @click="selectSerice(item.ItemDetailId, item.ItemValue)" >
                                {{ item.ItemValue }}
                            </Button>
                            <Button class="service-btn" size="small" :key="item.ItemDetailId" v-else type="primary" > {{item.ItemValue }} </Button>
                        </template>
                        <template v-if="isUpdateService">
                            <Button class="service-btn" size="small" type="primary" > {{ serviceName }} </Button>
                        </template>
                    </FormItem>
                    <FormItem label="定制金额:">
                        <Input type="number" v-model="serviceValidate.money" placeholder="请选择"></Input>
                    </FormItem>
                    <FormItem label="手机号码:">
                        <Input type="tel" v-model="serviceValidate.mobile" placeholder="请输入11位手机号码"></Input>
                    </FormItem>
                    <FormItem label="定制描述:">
                        <Input v-model="serviceValidate.desc" type="textarea" :maxlength="500" :autosize="{minRows: 5,maxRows: 5}" placeholder="请填写0-500字定制描述"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="cancelService">取消</Button>
                <Button type="primary" @click="clickModalConfirm()">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
  import { getCustomizeService, getMenu, getProjectType, publishProject, uploadFile } from '../../../service/clientAPI'

  export default {
    data() {
      return {
        baseUrl: process.env.baseUrl,
        isMove: false,
        token: '',
        typeFile: null,  // 选择类型需要上传文件时的，文件信息
        price: '',  // 上传文件时所填的价格
        typeName: '',
        serviceModal: false,    // 是否显示定制信息的输入框
        serviceId: '',
        formValidate: {
          name: '',
          img: '',
          content: '',
          description: '',
          typeId: ''
        },
        ruleValidate: {
          img: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '项目名称不能为空', trigger: 'blur' }
          ],
          typeId: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
          content: [
            { required: true, message: ' ', trigger: 'blur' }
          ]
        },
        serviceValidate: {
          serviceId: '',
          money: '',
          mobile: '',
          desc: ''
        },
        spinShow: false,
        serviceList: [],
        editorOption: {
          modules: {
            toolbar: {
              container: [
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
              ],
              handlers: {
                'image': function () {
                  document.getElementById('getFile').click();
                }
              }
            }
          },
          placeholder: '填写项目内容'
        },
        queryAttrList: [], // 通过类型id查询出的属性列表
        isAgree: false, // 是否同意
        serviceSelectList: [],
        serviceName: '',
        isUpdateService: false, // 是否是更新定制服务,
        showLayout: true
      }
    },
    computed: {
      // 查询所有菜单数据，根据id找出的属性列表
      attrList() {
        for (let i of this.menu.RetMenuData) {
          if (this.formValidate.typeId === i.ItemAttributesId) {
            return i.ChildNode;
          }
        }
      }
    },

    mounted() {
      this.token = "Bearer " + JSON.parse(localStorage.getItem('LOGININ')).token
    },

    methods: {
      // 
      enteUpload (val) {
        if (val) {
          this.isMove = true;
          console.log('进入', this.isMove)
        }
        
      },
      leaveUpload (val) {
        if (val) {
          this.isMove = false;
          console.log('离开', this.isMove)
        }
      },
      // 选择文件
      uploadJeck () {
        this.$refs.imgFile.click()
      },
      // 选择文件格式错误回调
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式错误',
          desc: file.name + '格式错误，请选择zip或者rar文件'
        });
      },

      // 输入内容
      onEditorChange(e) {
        this.formValidate.content = e.html;
      },

      // 添加定制服务
      addService() {
        this.serviceValidate.serviceId = this.serviceList[0].ItemDetailId;
        this.serviceName = this.serviceList[0].ItemValue;
        this.serviceModal = true;
      },

      // 选择定制服务
      selectSerice(id, name) {
        this.$set(this.serviceValidate, 'serviceId', id);
        this.serviceName = name;
      },

      // 取消定制服务
      cancelService() {
        this.serviceModal = false;
        this.isUpdateService = false;
        this.serviceValidate = {
          type: '',
          money: '',
          mobile: '',
          desc: ''
        }
      },

      // 更新定制服务
      updateService(index) {
        const temporaryObj = JSON.parse(JSON.stringify(this.serviceSelectList[index]));
        this.serviceName = temporaryObj.name;
        delete temporaryObj.name;
        this.serviceValidate = temporaryObj;
        this.isUpdateService = true;
        this.serviceModal = true;

      },

      // 选择图片
      fileSelected(e) {
        let file = e.target.files;
        if (file.length > 0) {
          let data = new FormData();
          for (let item of file) {
            data.append('files', item)
          }
          this.spinShow = true;
          uploadFile(data, 0).then(res => {
            this.spinShow = false;
            this.$set(this.formValidate, 'img', res.smallImgUrl);
          })
        }
      },

      // 富文本上传图片
      selectContentImg(e) {
        let file = e.target.files;
        if (file.length > 0) {
          let data = new FormData();
          for (let item of file) {
            data.append('files', item)
          }
          uploadFile(data, 1).then(res => {
            for (let i = 0; i < res.length; i++) {
              this.formValidate.content += `<img src="${ res[i].smallImgUrl }" alt="内容图片">`;
            }
          })
        }
      },

      // 选择类型
      clickType(id, name) {
        this.typeFile = null; // 清空已上传内容
        this.serviceSelectList = [];
        getProjectType(id).then(res => {
          this.queryAttrList = res;
          this.formValidate.typeId = id;
          this.typeName = name;
        });
        getCustomizeService(id).then(res => {
          this.serviceList = res;
        })
      },

      // 上传文件组件成功回调
      uploadSuccess(res) {
        this.typeFile = res.Data
      },

      // 上传之前清空上传列表
      clearUpload() {
        if (this.$refs.uploadFile[0].fileList.length > 0) {
          this.$refs.uploadFile[0].clearFiles();
        }
      },

      // 删除上传的文件
      removeFile() {
        this.typeFile = null;
      },

      // 点击定制服务弹出框确定
      clickModalConfirm() {
        if (this.serviceValidate.serviceId) {
          if (!this.serviceValidate.money || !this.serviceValidate.mobile || !this.serviceValidate.desc) {
            this.$Message.warning('请填写完整');
            return false;
          }
          if (this.serviceValidate.money < 0) {
            this.$Message.warning('定制金额不能小于0');
            return false;
          }
          if (this.serviceValidate.money > 5000) {
            this.$Message.warning('定制金额不能大于5000');
            return false;
          }
        }

        for (let i = 0; i < this.serviceSelectList.length; i++) {
          if (this.serviceSelectList[i].serviceId === this.serviceValidate.serviceId && !this.isUpdateService) {
            this.$Message.warning('不能重复添加定制服务');
            return false;
          } else if (this.serviceSelectList[i].serviceId === this.serviceValidate.serviceId && this.isUpdateService) {
            this.serviceSelectList[i] = {
              name: this.serviceName,
              serviceId: this.serviceValidate.serviceId,
              money: this.serviceValidate.money,
              mobile: this.serviceValidate.mobile,
              desc: this.serviceValidate.desc
            };

            this.serviceValidate = {
              serviceId: '',
              money: '',
              mobile: '',
              desc: ''
            };
            this.serviceName = '';
            this.isUpdateService = false;
            this.serviceModal = false;
            return false;
          }
        }
        const obj = {
          name: this.serviceName,
          serviceId: this.serviceValidate.serviceId,
          money: this.serviceValidate.money,
          mobile: this.serviceValidate.mobile,
          desc: this.serviceValidate.desc
        };
        this.serviceSelectList.push(obj);
        let arr = JSON.parse(JSON.stringify(this.serviceList));
        for (let i = 0; i < arr.length; i++) {
          if (this.serviceValidate.serviceId === arr[i].ItemDetailId) {
            arr.splice(i, 1);
            this.serviceList = arr;
          }
        }
        this.serviceValidate = {
          serviceId: '',
          money: '',
          mobile: '',
          desc: ''
        };
        this.serviceName = '';
        this.serviceModal = false;
      },
      // 点击完成上传
      clickSubmit() {
        this.$refs['formValidate'].validate(valid => {
          if (!this.formValidate.name) {
            this.$Message.warning('请填写项目名称');
            return false;
          }
          if (!this.formValidate.img) {
            this.$Message.warning('请上传项目图片');
            return false;
          }
          if (!this.formValidate.typeId || !this.typeName) {
            this.$Message.warning('请选择类型');
            return false;
          }

          let attributesList = [];
          for (let i in this.queryAttrList) {
            if (this.queryAttrList[i].EnCode === '[wjsc]' || this.queryAttrList[i].EnCode === '[pdfwjsc]') {
              continue;
            }
            if (this.queryAttrList[i].ItemSubAttributeId) {
              const attrItem = {
                AttributesId: '',
                ItemId: '',
                TypeId: this.formValidate.typeId,
                ItemAttributesId: this.queryAttrList[i].id,
                ItemSubAttributeId: this.queryAttrList[i].ItemSubAttributeId,
                sort: i
              };
              attributesList.push(attrItem);
            } else {
              this.$Message.warning('属性选择不完整');
              return false;
            }
          }

          if (['示范区', 'SU模型', '平面', '文本', '建筑规范'].includes(this.typeName)) {
            if (!this.typeFile) {
              this.$Message.warning('请上传文件');
              return false;
            }
          }
          if (this.typeName === '建筑规范') {
            this.$set(this.formValidate, 'content', this.typeName)
          } else {
            if (!this.formValidate.content) {
              this.$Message.warning('项目内容不能为空');
              return false;
            }
          }
          if (!this.isAgree) {
            this.$Message.warning('请阅读并同意《建筑部落用户协议》');
            return false;
          }
          this.sendPost(attributesList);
        })
      },
      // 发送请求
      sendPost(attributesList) {
        let [ItemFilePath, ItemFileName, PdfModel] = ['', '', ''];
        if (this.typeFile && this.typeName !== '建筑规范') {
          this.showLayout = true
          ItemFilePath = this.typeFile.packageOrPdfUrl;
          ItemFileName = this.typeFile.fileName;
        } else if (this.typeName === '建筑规范') {
          this.showLayout = false
          PdfModel = {
            ItemFileName: this.typeFile.fileName,
            ItemFilePath: this.typeFile.packageOrPdfUrl
          }
        }
        const CustomizeList = [];
        for (let i = 0; i < this.serviceSelectList.length; i++) {
          CustomizeList.push({
            customizedId: '',
            customizedTypeId: this.serviceSelectList[i].serviceId,
            customizedMoney: this.serviceSelectList[i].money,
            customizeMobile: this.serviceSelectList[i].mobile,
            customizeDescription: this.serviceSelectList[i].desc,
            ItemId: ''
          })
        }

        let postData = {
          ItemId: '',
          ItemName: this.formValidate.name,
          Price: this.price,
          Description: this.formValidate.description,
          ItemContent: this.formValidate.content,
          ItemTitleImg: this.formValidate.img,
          ItemFilePath,
          ItemFileName,
          ItemAnotherName: this.typeName + this.formValidate.name,
          TypeModel: {
            TypeId: '',
            ItemId: '',
            ItemTypeId: this.formValidate.typeId
          },
          AttributesList: attributesList,
          CustomizeList,
          PdfModel
        }
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'ios-loading',
                  size: 18
                }
              }),
              h('div', 'Loading')
            ])
          }
        });
        publishProject(postData).then(res => {
          this.$Spin.hide();
          if (res) {
            const queryData = {
              Id: res,
              showLayout: this.showLayout,
              reqItemList: {
                SortType: 0,
                KeyWords: "",
                Order: true,
                Page: 0,
                Rows: 32
              }
            };
            this.$router.push({
              name: "DataDetails",
              query: { dataBase: JSON.stringify(queryData) }
            });
          }
        })
      }
    },

    async asyncData() {
      const data = await Promise.all([getMenu(), getProjectType('')]);
      return {
        menu: data[0],
        typeList: data[1]
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
        .upload-img-box {
          height: 196px;
          position: relative;
          width: 260px;
          background-size: cover;
          .upload-img-wrap {
            float: left;
            width: 260px;
            height: 196px;
            text-align: center;
            margin-right: 20px;
            cursor: pointer;
            .title-img {
                width: 100%;
                height: 100%;
            }
            p {
                font-size: 12px;
            }
            .upload-component {
                position: relative;
                height: 88px;
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
          .upload-img-ente {
            background-color: #f5f5f5;
            color: #999;
          }
          .upload-img-leave {
            background-color: rgba(0,0,0,.5);
             color: #ffffff;
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
    .service-type-name {
        font-size: 12px;
        color: #666;
        margin-right: 20px;
        cursor: pointer;
    }
    .service-active {
        color: #ff3c00;
    }
    .attr-box {
        width: 770px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        margin-top: 20px;
        padding: 20px;
        background-color: #FEF9F7;
        .attr-select-item {
            width: 50%;
            padding: 15px;
            span {
                display: inline-block;
                width: 100px;
                text-align: center;
                font-size: 16px;
                color: #333;
                vertical-align: middle;
            }
        }
        .attr-upload-item {
            width: 100%;
        }
    }
    .service-item {
      font-size: 14px;
      margin-right: 5px;
    }
    .service-btn {
      margin-right: 10px;
    }
</style>

<style>
    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }
</style>
