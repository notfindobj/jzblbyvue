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
                    <Input v-model="formValidate.name" placeholder="请填写项目名称（举例；新中式su模型）" class="publish-input"></Input>
                </FormItem>
                <FormItem label="类型选择" class="type-select" prop="typeId">
                    <i v-for="(item) in menu" :key="'typeId'+item.value">
                        <Button v-if="formValidate.typeId === item.value" type="primary" >{{ item.text }} </Button>
                        <Button v-else @click="clickType(item.value, item.text, 'DesignLib')" >{{ item.text }} </Button>
                    </i>
                    <div class="attr-box" v-show="queryAttrList.length > 0">
                      <template v-for="(item, index) in queryAttrList" >
                          <div class="attr-select-item" v-if="item.ValueSource ==='SingleSel' || item.ValueSource ==='CompanyData'" :key="item.ItemAttributesId+index" >
                              <span >
                                  {{ item.ItemAttributesFullName }}
                              </span>
                              <Select v-model="item.ItemSubAttributeId" style="width:220px" >
                                  <Option v-for="subItem in item.ChildNode" :value="subItem.ItemAttributesId" :key="subItem.ItemAttributesId" >
                                      {{ subItem.ItemAttributesFullName }}
                                  </Option>
                              </Select>
                          </div>
                          <div class="attr-select-item attr-upload-item" v-if="item.ValueSource === 'FileUpload' || item.ValueSource === 'PDFFileUpload'" :key="item.ItemAttributesId+'select'" >
                              <span style="vertical-align: top;" >
                                  {{ item.ItemAttributesFullName }}
                              </span>
                              <Upload
                                  ref="uploadFile"
                                  v-if="item.ValueSource === 'FileUpload'"
                                  :action="baseUrl + 'Upload/DataUpload?uploadType=6'"
                                    :headers="{
                                      Authorization: token
                                    }"
                                    :format="['zip', 'rar']"
                                    :max-size="102400"
                                    :on-format-error="handleFormatError"
                                    :before-upload="clearUpload"
                                    :on-success="uploadSuccess"
                                    :on-remove="removeFile"
                                    :on-exceeded-size="handleMaxSize"
                                    style="display: inline-block;"
                                >
                                  <Button icon="ios-cloud-upload-outline" >上传文件</Button>
                              </Upload>
                              <Upload
                                  ref="uploadFile"
                                  v-if="item.ValueSource === 'PDFFileUpload'"
                                  :action="baseUrl + 'Upload/DataUpload?uploadType=4'"
                                  :headers="{ Authorization: token }"
                                  accept=".pdf"
                                  :before-upload="clearUpload"
                                  :on-success="uploadSuccess"
                                  :on-remove="removeFile"
                                  style="display: inline-block;">
                                <Button icon="ios-cloud-upload-outline" >上传PDF文件</Button>
                              </Upload>
                          </div>
                          <div class="attr-select-item attr-upload-item" v-if="item.ValueSource === 'FileUpload'" :key="index+'vertical'" >
                             <span style="vertical-align: top;">
                                收取费用
                            </span>
                            <Input v-model="price" :disabled="!typeFile" placeholder="请上传文件后输入价格" style="width: 230px;" />
                            <span style="width: 20px;">元</span>
                          </div>
                          <div class="attr-select-item attr-upload-item map-box" v-if="item&&item.ValueSource === 'MapLinkage'" :key="index+'vertical'" >
                            <div>
                              <span style="vertical-align: top;">{{item.ItemAttributesFullName}}</span>
                              <Select size="small" v-model="item.mitCode" style="width:95px" @on-change="onOneChange">
                                  <Option v-for="(items, index) in mitPro" :key="index" :value="items.ProvinceCode +'|' +items.ProvinceName" >{{items.ProvinceName}}</Option>
                              </Select>
                              <Select size="small" v-model="item.cityCode" @on-change="onTwoChange" style="width:95px">
                                  <Option v-for="(items, index) in cityPro" :key="index" :value="items.ProvinceCode +'|' +items.ProvinceName" >{{items.ProvinceName}}</Option>
                              </Select>
                              <Select size="small" v-model="item.ItemSubAttributeId"  style="width:95px" @on-change="onThrChange">
                                  <Option v-for="(items, index) in areaPro" :key="index" :value="items.ProvinceCode" >{{items.ProvinceName}}</Option>
                              </Select>
                            </div>
                            <div>
                                <span>详细地址</span>
                                <input v-model="item.MapAddress" type="text" id="tipinput" placeholder="请填写项目详细地址（选填）" style="width:190px">
                            </div>
                          </div>
                      </template>
                    </div>
                    <div class="attr-map-box">
                        <!-- <input type="text" id="tipinput" placeholder="请填写项目详细地址（选填）" style="width:190px"> -->
                        <div id="container" v-show="isMap" ref="container"></div>
                    </div>
                </FormItem>
                <FormItem label="定制服务" class="make-service" v-show="this.serviceList.length > 0">
                    <Tag type="border"  closable color="error" v-for="(item, index) in serviceSelectList" :key="index+item.serviceId" style="margin-right: 10px;" @on-close="handleClose(item,index)" @click.native="updateService(index)">{{ item.name }}</Tag>
                    <span class="add-service-btn" @click="addService">
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
                <Checkbox class="checkbox" size="large" v-model="isAgree">我已仔细阅读并同意</Checkbox>
                <span @click="ViewProtocol">《建筑部落用户发布协议》</span>
            </p>
            <Button type="primary" @click="clickSubmit">完成上传</Button>
        </div>
        <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
        <!-- 定制服务 -->
        <Modal v-model="serviceModal" width="594" title="提供定制服务"  class-name="service-box" >
            <div class="service-box-content">
                <Form ref="serviceValidate" :model="serviceValidate" :rules="rulesValidate" :label-width="100" >
                    <FormItem label="定制类型:">
                        <template v-if="!isUpdateService" v-for="item in serviceList" >
                            <Button class="service-btn" :key="'btn'+item.ItemDetailId"
                                v-if="item.ItemDetailId !== serviceValidate.serviceId"
                                @click.native="selectSerice(item.ItemDetailId, item.ItemValue)" >
                                {{ item.ItemValue }}
                            </Button>
                            <Button class="service-btn" :key="'service'+item.ItemDetailId" v-else type="primary" > {{item.ItemValue }} </Button>
                        </template>
                        <template v-if="isUpdateService">
                            <Button class="service-btn" type="primary" > {{ serviceName }} </Button>
                        </template>
                    </FormItem>
                    <FormItem label="定制金额:" prop="money">
                        <Input type="number" v-model="serviceValidate.money" placeholder="请选择"></Input>
                    </FormItem>
                    <FormItem label="手机号码:" prop="mobile">
                        <Input type="number" v-model="serviceValidate.mobile" placeholder="请输入11位手机号码"></Input>
                    </FormItem>
                    <FormItem label="定制描述:" prop="desc">
                        <Input v-model="serviceValidate.desc" type="textarea" :maxlength="500" :autosize="{minRows: 5,maxRows: 5}" placeholder="请填写0-500字定制描述"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer">
                <Button @click="cancelService">取消</Button>
                <Button type="primary" @click="clickModalConfirm('serviceValidate')">确定</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
  import { getCustomizeService, getDataByTypeId, getProjectType, publishProject, uploadFile, getProvinceList} from '../../../service/clientAPI'
  import { mapGetters } from 'vuex'
  import {setDemo} from '../../../LocalAPI'
  import { _debounce, analogJump } from '../../../plugins/untils/public'
  import {regText, validateNum, validatePassCheck} from '../../../plugins/untils/Verify'
  import { async } from 'q';
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
        serviceValidate: {// 定制服务
          serviceId: '',
          money: '',
          mobile: '',
          desc: ''
        },
        rulesValidate: {// 定制服务rules
          money: [
            {required: true, validator: validateNum, trigger: 'blur' }
          ],
          mobile: [
            {required: true, validator: validatePassCheck, trigger: 'blur' }
          ],
          desc: [
            {required: true, message: '描述不能为空', trigger: 'blur'}
          ]
        },
        spinShow: false,
        serviceList: [], // 定制服务类型
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
        showLayout: true,
        typyString: '',
        mitPro: [], // 省
        mitCode: "",
        cityPro: [], // 市
        cityCode: "",
        areaPro: [], // 区
        areaCode: "",
        aMap: {},
        isMap: false
      }
    },
    computed: {
      ...mapGetters(['getSessionStorage']),
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
      this.initMap();
      this.getCityList()
      this.token = "Bearer " + JSON.parse(localStorage.getItem('LOGININ')).token;
    },
    methods: {
      initMap () {
        let _this = this;
        _this.aMap = new AMap.Map('container', {
          center: [116.397428, 39.90923],//中心点坐标
          zoom: 11
        });
        this.showCityInfo()
      },
      showCityInfo() {
          let _this = this;
        //实例化城市查询类
          let citysearch = new AMap.CitySearch();
          //自动获取用户IP，返回当前城市
          citysearch.getLocalCity(function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
                if (result && result.city && result.bounds) {
                    _this.mitCode = result.adcode + result.province;
                    //地图显示当前城市
                    _this.aMap.setBounds(result.bounds);
                    _this.onOneChange(result.adcode)
                }
            }
        });
      },
      setAotucomplete () {
        let auto = new AMap.Autocomplete({
            input: "tipinput"
        });
      },
      onThrChange (code) {
        this.aMap.setCity(code)
      },
      async onTwoChange (code) {
          if (!code) return false
          let city = code.split('|')
          let queryData = {
              ProvinceCode: city[0]
          }
          this.aMap.setCity(city[0])
          let msg = await getProvinceList(queryData);
          if (msg) {
              this.areaPro = msg.respProvince;
          }
      },
      onOneChange (code) {
        this.cityCode = "";
        this.areaCode= "";
        let city = code.split('|')
        this.aMap.setCity(city[0])
        this.getCityList(city[0])
      },
      async getCityList (id = '') {
          let queryData = {
              ProvinceCode: id
          }
          let msg = await getProvinceList(queryData);
          if (msg) {
              if (id) {
                  this.cityPro = msg.respProvince;
              } else {
                  this.mitPro = msg.respProvince;
              }
          }
      },
      ViewProtocol (row) {
        this.$store.dispatch('SETUP', false)
        let routeData = this.$router.resolve({ name: 'other-id', params: { id: "51088359-2291-4f1b-87b3-9d3920307d94"} });
        analogJump(routeData.href);
      },
      handleMaxSize (file) {
        this.$Notice.warning({
              title: file.name,
              desc: '文件' + file.name + '过大, 不能超过 100M.'
          });
      },
      handleClose (row, index) {
        let obj = {
          ItemDetailId: row.serviceId,
          ItemValue: row.name
        }
        this.serviceList.push(obj)
        this.serviceSelectList.splice(index, 1);
      },
      // 项目缩略图
      enteUpload (val) {
        if (val) {
          this.isMove = true;
        }
      },
      leaveUpload (val) {
        if (val) {
          this.isMove = false;
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
      clickType(id, name, type) {
        let that = this;
        this.typeFile = null; // 清空已上传内容
        this.typyString = type;
        this.serviceSelectList = [];
        getProjectType(id).then(res => {
          let isP = true
          res.forEach(ele => {
            if (ele.ValueSource === "MapLinkage") {
              isP = false
            }
          })
          isP ? that.isMap = false: that.isMap = true
          this.queryAttrList = res;
          this.formValidate.typeId = id;
          this.typeName = name;
        });
        getCustomizeService(id).then(res => {
          this.serviceList = res;
        })
        setTimeout(() => {
          this.setAotucomplete()
        }, 800)
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
          if (!regText(this.serviceValidate.mobile)) {
              this.$Message.warning('手机号输入不正确!');
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
      clickSubmit:_debounce(function () {
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
            if (this.queryAttrList[i].ValueSource === 'FileUpload' || this.queryAttrList[i].ValueSource === 'PDFFileUpload') {
              continue;
            }
            if (this.queryAttrList[i].ItemSubAttributeId) {
              let addre = ""
              if (this.queryAttrList[i].ItemSubAttributeId) {
                addre = this.queryAttrList[i].ItemSubAttributeId
              } else if (this.queryAttrList[i].cityCode) {
                addre = this.queryAttrList[i].cityCode
              }
              // 拼接详细地址
              let qadd = ""
              let queryAttr = this.queryAttrList[i];
              try {
                qadd =  queryAttr.mitCode.split('|')[1] +queryAttr.cityCode.split('|')[1] + queryAttr.MapAddress
              } catch (error) {
                qadd = queryAttr.MapAddress
              }
              const attrItem = {
                AttributesId: '',
                ItemId: '',
                TypeId: this.formValidate.typeId,
                ItemAttributesId: this.queryAttrList[i].ItemAttributesId,
                ItemSubAttributeId: addre,
                MapAddress: qadd,
                sort: i
              };
              attributesList.push(attrItem);
            } else {
              if (this.queryAttrList[i].ItemSubAttributeCode !== 'dfgf' && this.queryAttrList[i].ItemSubAttributeCode !== 'gjgf') {
                this.$Message.warning('属性选择不完整');
                return false;
              }
            }
          }
          if (attributesList.length <= 0) {
            this.$Message.warning('属性最少选择一项！');
            return false;
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
      }, 1000),
      // 发送请求
      sendPost(attributesList) {
        let [ItemFilePath, ItemFileName, PdfModel] = ['', '', ''];
        if (this.typeFile && this.typeName === '建筑规范') {
          this.showLayout = false
          PdfModel = {
            ItemFileName: this.typeFile.fileName,
            ItemFilePath: this.typeFile.packageOrPdfUrl
          }
        } else if (this.typeFile && this.typeName === '文本') {
          this.showLayout = false
          PdfModel = {
            ItemFileName: this.typeFile.fileName,
            ItemFilePath: this.typeFile.packageOrPdfUrl
          }
        } else if (this.typeFile)  {
          this.showLayout = true
          ItemFilePath = this.typeFile.packageOrPdfUrl;
          ItemFileName = this.typeFile.fileName;
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
        publishProject(postData).then(async (res) => {
          this.$Spin.hide();
          if (res) {
            // 搜索页导航数据
            let baseSearchNav = {
                key: 'baseSearchNav',
                value: {
                    ClassTypeArrList: [{AttrKey: res.TypeId, AttrValue: this.typyString }]
                }
            }
            this.$store.dispatch('Serverstorage', baseSearchNav);
            let msgs = await setDemo('baseSearchNav', baseSearchNav);
            // 搜索页项目数据
            let baseSearchItem = {
                key: 'baseSearchItem',
                value: {
                    Pagination: {
                        SortType: 1,
                        KeyWords: "",
                        Order: true,
                        Page: 1,
                        Rows: 32
                    }
                }
            }
            this.$store.dispatch('Serverstorage', baseSearchItem);
            let msgss = await setDemo('baseSearchItem', baseSearchItem);
            this.$router.push({ name: 'DataDetails', query: { id: res.ItemId, layout: this.showLayout} });
          }
        })
      }
    },
    async asyncData() {
      const data = await getDataByTypeId();
      return {
        menu: data
      }
    }
  }
</script>

<style lang="less" scoped>
    .map-box {
      display: flex;
    }
    #container {width:1200px; height: 200px; margin: 0 auto;}  
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
          height: 150px;
          position: relative;
          width: 230px;
          background-size: cover;
          .upload-img-wrap {
            float: left;
            width: 230px;
            height: 150px;
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
                height: 60px;
                a {
                    position: absolute;
                    top: 20px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    z-index: 2;
                    cursor: pointer;
                }
                i {
                    position: absolute;
                    top: 20px;
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
        /deep/ .quill-editor {
            min-height: 320px;
            overflow-y: auto;
            border-radius: 0 0 4px 4px;
            border: 1px solid #d8d8d8;
             input {
              caret-color: #ff3c00;
            }
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
    .attr-map-box {
      width: 770px;
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        background-color: #FEF9F7;
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
