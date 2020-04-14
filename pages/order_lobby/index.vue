<template>
    <div class="order">
        <div class="order-title">
            <div class="order-title-item" v-if="searchData.length > 0">
                <label class="order-title-item-left">选择属性：</label>
                <template v-for="(items, searcindex) in searchData">
                    <div class="order-title-item-rightTop" :key="searcindex+ 1000">
                        <span @click="delSelectBtns(items)">
                            {{items.AttrValueFullName}}
                            <i class="iconfont icon-chahao3"></i>
                        </span>
                    </div>
                </template>
            </div>
            <template v-for="(items, indexs) in orderType">
                <div class="order-title-item" :key="`${indexs}${items.typename}`" v-if="items.list.length > 0">
                    <label class="order-title-item-left">{{items.typename}}：</label>
                    <div class="order-title-item-right">
                        <template v-for="(item, index) in items.list">
                            <span @click="selectBtns(item, items)" v-if="index <= 20" :key="index">{{item.FullName}}</span>
                            <span @click="selectBtns(item, items)" :key="index" v-if="index > 20 && isviewMore">{{item.FullName}}</span>
                        </template>
                        <label v-if="indexs === 0" @click="viewMore">{{!isviewMore ? "查看更多" : "收起"}}</label>
                    </div>
                </div>
            </template>
        </div>
        <div class="order-choice">
            <div class="order-choice-left">
                <span :class="quertData.sortby === 1 ? 'bgColor' : ''" @click="screenData(1)">
                    发布时间
                    <i class="iconfont icon-jiantou_xia"></i>
                </span>
                <span :class="quertData.sortby === 2 ? 'bgColor' : ''" @click="screenData(2)">
                    总面积
                    <i class="iconfont icon-jiantou_xia"></i>
                </span>
                <Checkbox v-model="sortby" @on-change="checkboxChange">仅显示可接单项目</Checkbox>
            </div>
            <div class="order-choice-right">
                总订单数：{{paginationData.records}}
            </div>
        </div>
        <div class="order-list">
            <div class="order-list-left">
                <div class="order-list-left-items" :key="index" v-for="(items, index) in orderList">
                    <div class="order-list-left-items-left">
                        <div class="order-list-left-items-left-title" @click="getUserInfo(items.ID)">
                            <span class="order-list-left-items-left-title-name">{{items.ProvinceName}}{{items.CityName}}{{items.Area}}m²{{items.TypeName}}设计</span> 
                            <span class="order-list-left-items-left-title-price">{{items.BudgetName}}</span>
                        </div>
                        <ul>
                            <li>{{items.ProvinceName}}</li>
                            <li>{{items.TypeName}}</li>
                            <li>{{items.Area}}m²</li>
                            <li>{{setTime(items.CreateDate)}}</li>
                        </ul>
                    </div>
                    <div class="order-list-left-items-right">
                        <Button v-if="items.Status === 0" style="background: #ff3c00;color:#ffffff;" @click="orderLpbby(items)">申请接单</Button>
                        <Button v-if="items.Status === 1 || items.Status === 2"  style="background: #dddddd;color:#898989;" @click="getUserInfo(items.ID)">查看详情</Button>
                    </div>
                </div>
                <Page :total="paginationData.records" @on-change="pageChange"/>
            </div>
            <div class="order-list-right"></div>
        </div>
        <Modal
            title="温馨提示"
            v-model="authentication"
            @on-ok="onOk"
            class-name="vertical-center-modal">
            <p>您还没有实名认证，请先实名认证。确定跳转到认证页面吗？</p>
        </Modal>
        <Modal
            title="请选择所在城市"
            v-model="isviewMore"
            @on-ok="onMoreOk"
            class-name="vertical-center-modal">
            <div>
                <Select v-model="oneFullName" style="width:200px" @on-change="changeSelect">
                    <Option v-for="item in cascaderList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="FullName" style="width:200px">
                    <Option v-for="item in cascader" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        </Modal>
        <ToTop :isDemand="false"></ToTop>
    </div>
</template>
<script>
import $moment from 'moment'
import ToTop from '../../components/toTop'
import {analogJump } from '../../plugins/untils/public'
import {getProvinceList, putOrder, takeOrders} from '../../service/clientAPI'
import { mapState} from 'vuex'
export default {
    layout: 'main',
    components: {
        ToTop
    },
    data () {
        return {
            isviewMore: false,
            orderList: [],
            paginationData: {},
            typeList: {
                CityName: '',
                BudgetId: '',
                BudgetName: '',
                WorkTypeId: '',
                WorkTypeName: '',
                Area: ''
            },
            quertData: {
                sortby: 1,
                isaccept: 0,
                Page: 1,
                Rows: 10
            },
            searchData: [],
            orderType: [],
            sortby: false,
            authentication: false,
            cascaderList: [],
            cascader: [],
            FullName: "",
            oneFullName: ""
        }
    },
    computed: {
        ...mapState({
            Identity: state => state.overas.auth || {}
        })
    },
    async asyncData({ store }) {
        let typeList = {
            CityName: '',
            BudgetId: '',
            BudgetName: '',
            WorkTypeId: '',
            WorkTypeName: '',
            Area: ''
        }
        const orderType = await store.dispatch('getOrderType', typeList);
        let quertData = {
            CityName: '',
            TypeId: '',
            BudgetId: '',
            WorkTypeId: '',
            Area: '',
            sortby: '',
            isaccept: '',
            Page: 1,
            Rows: 10
        }
        const orderList = await store.dispatch('getOrderList', quertData);
        return {
            orderType: orderType.datas,
            orderList: orderList.datalist,
            paginationData: orderList.paginationData
        }
    },
    created () {
        this.getTypeList()
        this.getCascaderData()
    },
    methods: {
        changeSelect (val) {
            this.getTwoData(val)
        },
        onMoreOk () {
            this.typeList.CityName = this.FullName.split('|')[1]
            this.getTypeList()
            this.getOrderList()
        },
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
                ele.value = ele.ProvinceCode+"|"+ele.ProvinceName
                ele.label = ele.ProvinceName
            })
            if (msg) {
                this.cascaderList = msg.respProvince;
            }
        },
        async getTwoData (item) {
            let queryData = {
                ProvinceCode: item.split("|")[0]
            }
            let msg = await getProvinceList(queryData);
            msg.respProvince.forEach(ele => {
                ele.loading = false;
                ele.children = [];
                ele.children = [];
                ele.level = 1;
                ele.value = ele.ProvinceCode+"|"+ele.ProvinceName
                ele.label = ele.ProvinceName
            })
            if (msg) {
                this.cascader = msg.respProvince;
            }
        },
        async orderLpbby (row) {
            if (this.Identity.IsCertificate === 1) {
                let query =  {
                    Id: row.ID,
                    Remark: "" 
                }
                let msg = await takeOrders(query);
                if (msg) {
                    this.$Notice.success({
                        title: '订单通知',
                        desc: '您的需求以通知甲方，待甲方同意后您可获取甲方的联系方式！'
                    });
                }
                return false
            } else {
                this.authentication = true;
            }
        },
        onOk () {
            let routeData = this.$router.resolve({ name: 'User-attestation'});
            analogJump(routeData.href);
        },
        delSelectBtns (rows) {
            switch (rows.AttrKeyFullName) {
                case '所在城市':
                    this.typeList.CityName = ""
                    break;
                case "项目类型":
                    this.typeList.TypeId = ""
                    this.typeList.TypeName = ""
                    break;
                case "工作内容":
                    this.typeList.WorkTypeId = ""
                    this.typeList.WorkTypeName = ""
                    break;
                case "建筑面积":
                    this.typeList.Area = ""
                    this.typeList.AreaId = ""
                    break;
                case "设计预算":
                    this.typeList.BudgetName = ""
                    this.typeList.BudgetId = ""
                    break;
            }
            this.getTypeList()
            this.getOrderList()
        },
        selectBtns (row, rows) {
             switch (rows.typename) {
                case '所在城市':
                    this.typeList.CityName = row.FullName
                    break;
                case "项目类型":
                    this.typeList.TypeId = row.ModuleId
                    this.typeList.TypeName = row.FullName
                    break;
                case "工作内容":
                    this.typeList.WorkTypeId = row.ModuleId
                    this.typeList.WorkTypeName = row.FullName
                    break;
                case "建筑面积":
                    this.typeList.Area = row.FullName
                    this.typeList.AreaId = row.ModuleId
                    break;
                case "设计预算":
                    this.typeList.BudgetName = row.FullName
                    this.typeList.BudgetId = row.ModuleId
                    break;
            }
            this.getTypeList()
            this.getOrderList()
        },
        pageChange (index) {
            this.quertData.Page = index;
            this.getOrderList()
        },
        screenData (val) {
            this.quertData.sortby = val;
            this.sortby = false;
            this.quertData.isaccept = 0;
            this.getOrderList()
        },
        // 可接订单
        checkboxChange (val) {
            this.quertData.isaccept = val ? 1 : 0;
            this.quertData.sortby = '';
            this.getOrderList()
        },
        async getTypeList () {
            let quertData = this.typeList
            let order = await this.$store.dispatch('getOrderType', quertData);
            if (order) {
                this.orderType= order.datas
                this.searchData = order.selectBtns
            }
        },
        //  获取订单列表
        async getOrderList () {
            let quertData = { ...this.quertData, ...this.typeList}
            let order = await this.$store.dispatch('getOrderList', quertData);
            if (order) {    
                this.orderList= order.datalist,
                this.paginationData= order.paginationData
            }
        },
        // 个人资料
        viewMore () {
            this.FullName= "",
            this.oneFullName= ""
            this.isviewMore = !this.isviewMore
        },
        getUserInfo(id) {
            this.$router.push({name: 'order_lobby-id', params: {id: id}})
        },
        setTime (time) {
            $moment.locale('zh-cn'); 
            return $moment(time).format('LL'); 
        },
        setArea (val) {
            let area = []
            val.split("-").forEach((ele, index) => {
                area[index] = parseInt(ele);
            });
            let parm = `${area[0]},${area[1] ? area[1] : 0}`;
            return parm
        }
    }
}
</script>
<style lang="less" scoped>
    .bgColor {
        color: #ff3c00;
    }
    .ivu-page {
        text-align: center;
        margin-top: 40px;
    }
    .order {
        width: 1200px;
        margin: 0 auto;
        font-size: 14px;
        &-title {
            background: #fff;
            padding-left: 30px;
            padding: 20px 30px 20px 20px;
            color: #666;
            &-item {
                display: inline-block;
                margin-top: 8px;
                &-left {
                    font-weight: bold;
                    padding-top: 5px;
                    float: left;
                    width: 75px;
                }
                &-right {
                    float: right;
                    width: 1050px;
                    label {
                        color: #ff3c00;
                        cursor: pointer;
                    }
                    span {
                        padding: 5px 10px;
                        display: inline-block;
                        &:hover {
                            cursor: pointer;
                            color: #ffffff;
                            background: #ff3c00;
                            border-radius: 5px;
                        }
                    }
                }
                &-rightTop {
                    display: inline-block;
                    margin-right: 15px;
                    label {
                        color: #ff3c00;
                        cursor: pointer;
                    }
                    span {
                        padding: 2px 10px;
                        display: inline-block;
                        border: 1px solid #e2e2e2;
                        border-radius: 3px;
                        margin-top: 3px;
                        color: #333333;
                        i  {
                            font-size: 10px;
                        }
                        &:hover {
                            cursor: pointer;
                            color: #ff3c00;
                        }
                    }
                }
            }
        }
        &-choice {
            background: #ffffff;
            width: 1200px;
            display: inline-block;
            margin: 10px 0 15px;
            padding: 15px 20px;
            &-left {
                float: left;
                span {
                    margin-right: 10px;
                    cursor: pointer;
                    i {
                        font-size: 14px;
                        margin-left: -5px;
                    }
                }
            }
            &-right {
                float: right;
            }
        }
        &-list {
            &-left {
                background: #fff;
                width: 910px;
                display: inline-block;
                padding: 15px 20px;
                &-items {
                    padding-top: 20px;
                    margin-bottom: 20px;
                    border-top: 1px solid #dddddd;
                    &-left {
                        display: inline-block;
                        &-title {
                            margin-bottom: 5px;
                            cursor: pointer;
                            &-name {
                                font-weight: bold;
                            }
                            &-price {
                                color: #ff3c00;
                                font-weight: 600;
                                margin-left: 20px;
                            }
                        }
                        ul li {
                            display: inline-block;
                            padding-right: 15px;
                            color: #9d9d9d;
                            &:not(:last-child):after {
                                content: ' ';
                                display: inline-block;
                                width: 1px;
                                height: 20px;
                                background: #9d9d9d;
                                position: relative;
                                top: 5px;
                                right:-7px;
                            }
                        }
                    }
                    &-right {
                        display: inline-block;
                        float: right;
                    }
                    &:first-child {
                        border-top: none;
                    }
                }
            }
            &-right {
                float: right;
                width: 280px;
                height: 250px;
                background: url('../../assets/images/lf_ad.jpg');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                cursor: pointer;
                background-position-x: 100%;
            }
        }
    }
</style>