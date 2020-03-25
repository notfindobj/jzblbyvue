<template>
    <div>
        <Form ref="dataBank" :model="formValidate" :rules="ruleValidate" class="form-box" :label-width="80" label-position="right">
            <FormItem label="项目图片" prop="img" >
                <div class="upload-img-box" :style="`background-image:url(${formValidate.img});`" @mouseenter="enteUpload(formValidate.img)" @mouseleave="leaveUpload(formValidate.img)">
                    <div :class="!isMove ? 'upload-img-wrap upload-img-ente' : 'upload-img-wrap upload-img-leave'" 
                    :style="`display: ${!formValidate.img || isMove? 'inline-block;' : 'none;'} `">
                        <ossUp
                            class="uploadc"
                            accept="image/*"
                            :fileType="1"
                            @uploadSuccess="fileSuccess">
                            <div class="upload-component">
                                <Icon type="ios-add-circle" size="35" color="#ff3c00"/>
                            </div>
                            <p>图片将会自动压缩</p>
                            <p>图片建议不要超过20M</p>
                        </ossUp>
                    </div>
                </div>
            </FormItem>
            <Row>
                <Col span="12">
                    <FormItem label="项目名称" prop="name">
                        <Input v-model="formValidate.name" placeholder="请填写项目名称（举例；新中式su模型）" class="publish-input"></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="是否原创" prop="name">
                        <RadioGroup v-model="IsOriginal">
                            <Radio label="true">原创</Radio>
                            <Radio label="false">非原创</Radio>
                        </RadioGroup>
                        <span class="original" @click="protocol">《原创免责协议》</span>
                    </FormItem>
                </Col>
            </Row>
            <FormItem label="类型选择" prop="typeString">
                <div class="type-select">
                    <template v-for="(item) in menuList">
                        <Button :key="'typeId'+item.value" :type="formValidate.typeString === item.value ?'primary': 'default'" @click="clickType(item.value, item.text, 'DesignLib')" >{{ item.text }} </Button>
                    </template>
                </div>
                <div v-if="typeAttrList.length > 0" class="typeAttrList-box">
                    <template v-for="(items, indexs) in typeAttrList">
                        <div :key="items.ItemSubAttributeId+indexs" class="typeAttrList-item" v-if="items.ValueSource ==='SingleSel' || items.ValueSource ==='CompanyData'">
                            <span>
                                <Icon type="ios-star" />
                                {{items.ItemAttributesFullName }}
                            </span>
                            <Select v-model="items.ItemSubAttributeId" style="width:220px" >
                                <Option v-for="(subItem, index) in items.ChildNode" :value="subItem.ItemAttributesId" :key="subItem.ItemAttributesId+index">
                                    {{ subItem.ItemAttributesFullName }}
                                </Option>
                            </Select>
                        </div>
                        <div :key="items.ItemSubAttributeId+indexs" class="typeAttrList-item" v-if="items.ValueSource === 'FileUpload' || items.ValueSource === 'PDFFileUpload'">
                            <span><Icon type="ios-star" />{{items.ItemAttributesFullName }}</span>
                            <ossUp
                                :accept="items.ValueSource === 'FileUpload'? '.zip,.rar' : '.pdf'"
                                :showUploadList="true"
                                :fileType="1"
                                @onRemove="removeFile"
                                @uploadSuccess="uploadSuccess">
                                <div class="cloud-upload">
                                    <Button type="text" icon="ios-cloud-upload-outline" >上传文件</Button>
                                </div>
                            </ossUp>
                            <!-- <Upload
                                    ref="uploadFile"
                                    :action="baseUrl + `Upload/DataUpload?uploadType=${items.ValueSource === 'FileUpload' ? 6 : 4}`"
                                    :headers="{Authorization: 'Bearer ' + userInfo.token}"
                                    :format="items.ValueSource === 'FileUpload'? ['zip', 'rar'] : ['pdf']"
                                    :accept="items.ValueSource === 'FileUpload'? '.zip,.rar' : '.pdf'"
                                    :max-size="102400"
                                    :with-credentials="true"
                                    :before-upload="clearUpload"
                                    :on-success="uploadSuccess"
                                    :on-remove="removeFile"
                                    :on-exceeded-size="handleMaxSize"
                                    style="display: inline-block;width: 220px;"
                                >
                                <Button icon="ios-cloud-upload-outline" >上传文件</Button>
                              </Upload> -->
                        </div>
                        <div :key="items.ItemSubAttributeId+indexs+'FileUpload'" class="typeAttrList-item" v-if="items.ValueSource === 'FileUpload'">
                            <span><Icon type="ios-star" />收取费用</span>
                            <div>
                                <Input v-model="price" :disabled="!typeFile" placeholder="请上传文件后输入价格" style="width: 210px;" />
                                <span style="width: 20px;">元</span>
                            </div>
                        </div>
                        <div :key="items.ItemSubAttributeId+indexs" class="typeAttrList-item" v-if="items.ValueSource ==='MapLinkage'">
                            <span><Icon type="ios-star" />{{items.ItemAttributesFullName }}</span>
                            <Cascader v-model="cascaderAddress" :data="cascaderList" :load-data="loadData" style="width:225px"></Cascader>
                        </div>
                        <div :key="items.ItemSubAttributeId+indexs+'MapLinkage'" class="typeAttrList-item" v-if="items.ValueSource ==='MapLinkage'">
                            <span>详细地址</span>
                            <input v-model="address" class="address-input" id="tipinput" placeholder="请输入详细地址（选填）" style="width: 220px;"/>
                        </div>
                        <div class="attr-map-box" :key="items.ItemSubAttributeId+indexs+'Map'" v-if="items.ValueSource ==='MapLinkage'">
                            <div id="container" ref="container"></div>
                        </div>
                    </template>
                </div>
            </FormItem>
            <FormItem label="定制服务" v-if="serviceList.length > 0 || serviceSelectList.length > 0">
                <Tag type="border"  closable color="error" v-for="(item, index) in serviceSelectList" :key="index+item.serviceId" style="margin-right: 10px;" @on-close="handleClose(item,index)" @click.native="updateService(index)">{{ item.name }}</Tag>
                <span class="add-service-btn" @click="addService">
                    <Icon type="md-add" size="12"/>
                    添加定制服务
                </span>
                <span class="add-service-btn" v-show="formValidate.typeId && serviceList.length === 0">
                    无可添加定制服务
                </span>
            </FormItem>
            <FormItem label="收费权限" v-if="isMonetary">
                <Checkbox v-model="IsAllowIntegral">支持积分下载</Checkbox>
                <Checkbox v-model="IsAllowTribalCoins">支持部落币下载</Checkbox>
                <div class="tishi">
                    温馨提示：1元 = 1部落币 &nbsp;&nbsp; 1部落币= 10积分
                </div>
            </FormItem>
            <FormItem label="项目描述">
                <Input v-model="formValidate.description" type="textarea" placeholder="请填写项目描述" />
            </FormItem>
        </Form>
        <cusService ref="cusService" :cusConfig="cusConfig" :serviceList="serviceList" @clickModalConfirm="clickModalConfirm"/>
    </div>
</template>
<script>
import { getCustomizeService, getDataByTypeId, getProjectType, publishProject, uploadFile, getProvinceList} from '../../../../service/clientAPI'
import { mapState, mapGetters } from 'vuex'
import {setDemo} from '../../../../LocalAPI'
import cusService from '../cusService'
import ossUp from "../../../ossUp/ossUp"
import {analogJump} from '../../../../plugins/untils/public'
export default {
    components: {
        cusService,
        ossUp
    },
    data () {
        return {
            baseUrl: process.env.baseUrl,
            formValidate: {
                img: '',
                name: '',
                typeString: ''
            },
            ruleValidate: {
                img: [
                    { required: true, message: ' ', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '项目名称不能为空', trigger: 'blur' }
                ],
                typeString: [
                    { required: true, message: ' ', trigger: 'blur' }
                ]
            },
            isMove: false,
            menuList: [],
            typeAttrList: [],
            serviceList: [], // 定制服务类型列表
            serviceSelectList: [], // 选择后定制服务类型列表  www.ijmc.xyz
            cusConfig: {
                serviceModal: false
            },
            price: '', // 收取费用
            typeFile: null,  // 选择类型需要上传文件时的，文件信息
            cascaderList: [], // 城市信息
            address: '',
            cascaderAddress: [],
            aMap: {},
            IsOriginal: 'false',
            isMonetary: false,
            IsAllowTribalCoins: false,
            IsAllowIntegral: false,  //积分
            monetarySupport: 0
        }
    },
    computed: {
        ...mapState({
            userInfo: state => state.overas.auth,
        }),
    },
    created () {
        this.getDataList();
        this.getCascaderData();
    },
    watch: {
      cascaderAddress(val) {
        this.aMap.setCity(val[val.length-1]);
        this.setAotucomplete(val);
      }
    },
    methods: {
        fileSuccess (res) {
            this.$set(this.formValidate, 'img', res.smallImgUrl);
        },
        protocol () {
            this.$store.dispatch('SETUP', false);
            let routeData = this.$router.resolve({ name: 'other-id', params: { id: "12s5q58cf-ce5a-4fef-b301-0a9d37c23e22"} });
            analogJump(routeData.href);
        },
        // 获取发布的类型
        async getDataList () {
            let msg = await getDataByTypeId();
            if (msg) {
                this.menuList = msg;
            }
        },
        // 项目缩略图
        enteUpload (val) {
            val? this.isMove = true : false
        },
        leaveUpload (val) {
            val ? this.isMove = false : false
        },
        clearEditor () {
            this.serviceList = [];
            this.serviceSelectList = [];
            this.serviceSelectList = [];
            this.formValidate = {
                description: '',
                typeString: '',
                name: '',
                img: ''
            }
            this.typeFile = null;
            this.price = '';
            this.address = '';
            this.cascaderAddress = [];
            this.typeAttrList = [];
            this.initMap()
        },
        // 选择类型
        async clickType(id, name, type) {
            this.isMonetary = false
            let m = ['efa20b33-6dd9-4eb4-85c8-55ea854fee89', '412c275f-3a6b-45b0-b3b2-a69a36666e8a']
            if (!m.includes(id)) {
                this.isMonetary = true;
            }
            let that = this;
            this.formValidate.typeString = id;
            this.typeFile = null;
            this.IsAllowIntegral = false,
            this.IsAllowTribalCoins = false,
            this.price = '';
            this.getServiceList(id)
            let msg = await this.getProjectTypeList(id);
            this.initMap()
        },
        // 获取选择类型列表
        async getProjectTypeList (id) {
            let msg = await getProjectType(id);
            if (msg) {
                this.typeAttrList = msg;
            }
        },
        // 获取定制服务列表
        async getServiceList (id) {
            let msg = await  getCustomizeService(id);
            if (msg) {
                this.serviceList = msg;
            }
        },
        // 添加定制服务
        addService () {
            if (this.serviceList.length > 0) {
                this.cusConfig.serviceModal = true
            }
        },
        // 删除定制服务
        handleClose (row, index) {
            let obg = {
                ItemDetailId: row.serviceId,
                ItemValue: row.name,
            }
            this.serviceList.push(obg);
            this.serviceSelectList.splice(index, 1);
        },
        // 添加定制服务
        clickModalConfirm (row) {
            this.cusConfig.serviceModal = false;
            let serNum = null
            this.serviceList.forEach((ele, index) => {
                 if (ele.serviceId === row.serviceId) {
                    serNum = index
                }
            })
            this.serviceList.splice(serNum, 1);
            let isP = false
            this.serviceSelectList.forEach(ele => {
                if (!isP) {
                    if (ele.serviceId === row.serviceId) {
                        isP = true
                    }
                }
                
            })
            if (!isP) {
                this.serviceSelectList.push(row)
            }
            this.$refs.cusService.cancelService()
        },
        // 上传文件组件成功回调
        uploadSuccess(res) {
            this.typeFile = res
        },
        // 删除上传的文件
        removeFile() {
            this.typeFile = null;
        },
        // 文件超限提示
        handleMaxSize (file) {
            this.$Notice.warning({
                title: file.name,
                desc: '文件' + file.name + '过大, 不能超过 100M.'
            });
        },
        // 获取联动信息
        async getCascaderData (id = '') {
            let queryData = {
                ProvinceCode: id
            }
            let msg = await getProvinceList(queryData);
            msg.respProvince.forEach(ele => {
                ele.loading = false;
                ele.children = [];
                ele.children = [];
                ele.level = 1;
                ele.value = ele.ProvinceCode
                ele.label = ele.ProvinceName
            })
            if (msg) {
                this.cascaderList = msg.respProvince;
            }
        },
        async loadData (item, callback) {
            item.loading = true;
            let queryData = {
                ProvinceCode: item.value
            }
            let msg = await getProvinceList(queryData);
            if (msg.respProvince instanceof Array) {
                msg.respProvince.forEach(ele => {
                    if (item.level < 2) {
                        ele.level = item.level + 1;
                        ele.loading = false;
                        ele.children = [];
                    }
                    ele.value = ele.ProvinceCode
                    ele.label = ele.ProvinceName
                })
            } else {
                return false
            }
            if (msg) {
                item.children = msg.respProvince
                item.loading = false;
                callback();
            }
        },
        // 地图初始化
        initMap () {
            let _this = this;
            _this.aMap = new AMap.Map('container', {
                center: [116.397428, 39.90923],//中心点坐标
                zoom: 11
            });
        },
        setAotucomplete (city) {
            let _this = this;
            let auto = new AMap.Autocomplete({
                input: 'tipinput',
                city: city[0],
            });
        },
        protPush () {
            let _this = this;
            let attrList = []
            let isBreak = false
            for (let i =0; i < this.typeAttrList.length; i ++) {
                if (this.typeAttrList[i].ValueSource === "SingleSel") {
                    if (this.typeAttrList[i].ItemSubAttributeId === '') {
                        isBreak = true
                        this.$Message.warning('属性选择不全');
                        break;
                    }
                }
            }
            if (isBreak) {
                return false
            }
            this.typeAttrList
            this.typeAttrList.forEach(ele => {
                let obg = {
                    AttributesId: "",
                    ItemId: '',
                    TypeId: this.formValidate.typeString,
                    ItemAttributesId: ele.ItemAttributesId,
                    ItemSubAttributeId: ele.ItemSubAttributeId,
                    SortCode: ele.Sort
                }
                if (ele.MapLinkage) {
                    if (this.cascaderAddress.length > 0) {
                        obg.MapLinkage = this.cascaderAddress[this.cascaderAddress.length - 1] + (this.address ? this.address : '');
                    } else {
                        this.$Message.warning('请选择属性： 所在地');
                        return false;
                    }
                }
                attrList.push(obg)
            })
            // 判断是PDF 还是文件 
            let Pdf = true
            let PdfModel = {}
            if (['f7399e5e-82a6-47e0-942e-fcae1a68af40', '9626945d-6f04-4b61-9190-a273a4d94e05'].includes(this.formValidate.typeString)) {
                Pdf = false
                PdfModel = {
                    ItemFileName: this.typeFile.name,
                    ItemFilePath: this.typeFile.smallImgUrl,
                }
            }
            let obg = {
                ItemName: this.formValidate.name,
                Description: this.formValidate.description,
                ItemTitleImg: this.formValidate.img,
                CustomizeList: this.serviceSelectList,
                AttributesList: attrList,
                IsOriginal: _this.IsOriginal,
                IsAllowIntegral: _this.IsAllowIntegral ? 1 : 0,//积分
                IsAllowTribalCoins: _this.IsAllowTribalCoins ? 1 : 0,  //部落币
                PdfModel,
                TypeModel: {
                    TypeId: "",
                    ItemId: "",
                    ItemTypeId: this.formValidate.typeString // 值在父级
                }
            }
            if (Pdf && this.typeFile) {
                obg.ItemFileName= this.typeFile.name,
                obg.ItemFilePath= this.typeFile.smallImgUrl
            }
            if (this.price) {
                obg.Price = this.price
            }
            this.$refs['dataBank'].validate((valid) => {
                if (valid) {
                    _this.$emit('protPush', obg)
                } else {
                    _this.$emit('protPush', false)
                }
            })
        }
    },
}
</script>
<style lang="less" scoped>
    .cloud-upload {
        width: 220px;
        .ivu-btn-text:focus {
            box-shadow:none;
        }
    }
    .tishi {
        color: #c3c3c3;
        line-height: 20px;
        font-size: 12px;
        margin-bottom: -15px;
    }
    .original {
        cursor: pointer;
    }
    .form-box {
        margin-top: 10px;
    }
    .address-input {
        border-radius: 5px;
        outline: none;
        border-width: 1px;
        box-shadow: none;
        padding: 0 15px;
        color: #333;
        &:focus {
            border-width: 1px;
            border-color: #ff3c00;
            outline: none;
            border-radius: 5px;
        }
        &:hover {
            border-color: #ff3c00;
        }
    }
    .attr-map-box {
        width: 100%;
        display: flex;
        height: 250px;
        flex-wrap: wrap;
        text-align: center;
        background-color: #FEF9F7;
        margin-top: 10px;
        #container {
            width: 100%;
            height: 100%;
        }
    }
    .typeAttrList-box {
        display: flex;
        flex-wrap: wrap;
        background: #FEF9F7;
        padding-bottom: 10px;
    
    }
    .typeAttrList-item {
        display: flex;
        width: 50%;
        justify-content: space-around;
        margin-top: 15px;
        position: relative;
        .ivu-icon {
            position: absolute;
            top: 9px;
            left: 15px;
            color: #ff3c00;
        }
        > span {
            display: inline-block;
            text-align: left;
            width: 120px;
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
    .type-select {
        display: flex;
        justify-content: space-between;
    }
    .uploadc {
        height: 150px;
        /deep/.ivu-upload-drag {
            height: 100%;
        }
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
            background-color: #fff;
            color: #999;
          }
          .upload-img-leave {
            background-color: rgba(0,0,0,.5);
            color: #999;
          }
        }
</style>
