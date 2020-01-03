<template>
    <div>
        <Title title="我的发票" :bottomLine="false"/>
        <Tabs value="name1">
            <TabPane label="我的发票" name="name1">
                <div class="tribalBill-search">
                    <DatePicker type="daterange" placeholder="开票日期" style="width: 120px"></DatePicker>
                    <Input placeholder="发票代码" style="width: 120px" />
                    <Input placeholder="发票号码" style="width: 120px" />
                    <Input placeholder="发票类型" style="width: 120px" />
                    <Input placeholder="发票状态" style="width: 120px" />
                    <Button>搜索</Button>
            </div>
                <publicTable :columns="columns" :columnsData="data1"/>
            </TabPane>
            <TabPane label="发票设置" name="name2">
                <div>发票信息以当前选择为准，请谨慎填写。</div>
                <div class="type">
                    <div class="type-label">
                        发票类型
                    </div>
                    <div>
                        <Button size="small" :type="isType ? 'primary':'dashed'" @click="getInvoice(0)">个人</Button>
                        <Button size="small" :type="isType ? 'dashed':'primary'" @click="getInvoice(1)">企业</Button>
                    </div>
                </div>
                <!-- 个人类型 -->
                <Form v-if="isType" class="personalData" ref="formInline" :model="invoiceData" :rules="ruleInline" :label-width="100">
                    <FormItem label="纳税人类型" prop="user">
                        <Select v-model="invoiceData.TaxpayerType" clearable >
                            <Option :value="2">法人</Option>
                            <Option :value="1">个体工商户</Option>
                            <Option :value="0">自然人</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="开票类型" prop="user">
                        <Select v-model="invoiceData.InvoiceType" clearable >
                            <Option :value="1">男</Option>
                            <Option :value="0">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="客户名称" prop="user">
                        <Input size="small" type="text" v-model="invoiceData.CustomerName" placeholder="名称（昵称）"></Input>
                    </FormItem>
                    <FormItem label="发票抬头" prop="user">
                        <Input size="small" type="text" v-model="invoiceData.InvoiceTitle" placeholder="真实姓名"></Input>
                    </FormItem>
                    <FormItem label="邮寄地址" prop="user">
                        <Cascader v-model="invoiceAddress" :data="cascaderList" :load-data="loadData" style="width:225px"></Cascader>
                    </FormItem>
                    <FormItem label="详细地址" prop="user">
                        <Input size="small" type="text" v-model="invoiceData.DetailAddress" placeholder="详细地址"></Input>
                    </FormItem>
                    <FormItem label="联系人姓名" prop="user">
                        <Input size="small" type="text" v-model="invoiceData.ContactName" placeholder="联系人姓名"></Input>
                    </FormItem>
                    <FormItem label="联系人电话" prop="user">
                        <Input size="small" type="text" v-model="invoiceData.ContactPhone" placeholder="联系人电话"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="user">
                        <Input size="small" type="text" v-model="invoiceData.ContactEmail" placeholder="邮箱"></Input>
                    </FormItem>
                    <FormItem >
                        <Button type="primary" @click="setInvoice(0)">提交</Button>
                    </FormItem>
                </Form>
                <!-- 企业类型 -->
                <Form v-if="!isType" class="personalData" ref="formInline" :model="cominvoiceData" :rules="ruleInline" :label-width="100">
                    <FormItem label="纳税人类型" prop="user">
                        <Select v-model="cominvoiceData.TaxpayerType" clearable >
                            <Option :value="2">法人</Option>
                            <Option :value="1">个体工商户</Option>
                            <Option :value="0">自然人</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="开票类型" prop="user">
                        <Select v-model="cominvoiceData.InvoiceType" clearable >
                            <Option value="1">男</Option>
                            <Option value="0">女</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="公司名称" prop="CompanyName">
                        <Input size="small" type="text" v-model="cominvoiceData.CompanyName" placeholder="名称（昵称）"></Input>
                    </FormItem>
                    <FormItem label="发票抬头" prop="InvoiceTitle">
                        <Input size="small" type="text" v-model="cominvoiceData.InvoiceTitle" placeholder="发票抬头"></Input>
                    </FormItem>
                    <FormItem label="纳税人识别号" prop="Identification">
                        <Input size="small" type="text" v-model="cominvoiceData.Identification" placeholder="纳税人识别号"></Input>
                    </FormItem>
                    <FormItem label="注册地址" prop="RegisteredAddress">
                        <Input size="small" type="text" v-model="cominvoiceData.RegisteredAddress" placeholder="注册地址"></Input>
                    </FormItem>
                    <FormItem label="公司电话" prop="CompanyTel">
                        <Input size="small" type="text" v-model="cominvoiceData.CompanyTel" placeholder="公司电话"></Input>
                    </FormItem>
                    <FormItem label="开户行" prop="OpeningBank">
                        <Input size="small" type="text" v-model="cominvoiceData.OpeningBank" placeholder="开户行"></Input>
                    </FormItem>
                    <FormItem label="银行卡号" prop="BankCardNumber">
                        <Input size="small" type="text" v-model="cominvoiceData.BankCardNumber" placeholder="银行卡号"></Input>
                    </FormItem>
                    <FormItem label="邮寄地址" prop="MailingAddress">
                        <Cascader v-model="comAddress" :data="cascaderList" :load-data="loadData" style="width:225px"></Cascader>
                    </FormItem>
                    <FormItem label="详细地址" prop="DetailAddress">
                        <Input size="small" type="text" v-model="cominvoiceData.DetailAddress" placeholder="详细地址"></Input>
                    </FormItem>
                    <FormItem label="联系人姓名" prop="ContactName">
                        <Input size="small" type="text" v-model="cominvoiceData.ContactName" placeholder="联系人姓名"></Input>
                    </FormItem>
                    <FormItem label="联系人电话" prop="ContactPhoneuser">
                        <Input size="small" type="text" v-model="cominvoiceData.ContactPhone" placeholder="联系人电话"></Input>
                    </FormItem>
                    <FormItem label="邮箱" prop="ContactEmail">
                        <Input size="small" type="text" v-model="cominvoiceData.ContactEmail" placeholder="邮箱"></Input>
                    </FormItem>
                    <FormItem label="上传资料" prop="user">
                        <div class="upInvoive">
                            <div class="upInvoive-item"></div>
                        </div>
                    </FormItem>
                    <FormItem >
                        <Button type="primary" @click="setInvoice(1)">提交</Button>
                    </FormItem>
                </Form>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import {getUserInvoice, setUserInvoice, getProvinceList} from '../../service/clientAPI'
export default {
    components: {
        Title,
        publicTable
    },
    data () {
        return {
            ruleInline: {},
            value: '',
            columns: [
                {
                    title: '发票号码',
                    key: 'address',
                    state: '1'
                },
                {
                    title: '发票代码',
                    key: 'address',
                    state: '1'
                },
                {
                    title: '发票抬头',
                    key: 'address',
                    state: '1'
                },
                {
                    title: '发票类型',
                    key: 'address',
                    state: '1'
                },
                {
                    title: '发票金额',
                    key: 'address',
                    state: '1'
                },
                {
                    title: '开票日期',
                    key: 'address',
                    state: '1'
                },
                {
                    title: '开票状态',
                    key: 'address',
                    state: '1'
                },
                {
                    cut: 'btn',
                    title: '操作',
                    key: 'address',
                    state: [{text: '删除', events: 'addVal'}]
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: '0.00',
                    date: '2016-10-03',
                    state: '1'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01',
                    state: '1'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02',
                    state: '2'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04',
                    state: '3'
                }
            ],
            invoiceAddress: [],
            comAddress: [],
            invoiceData: {},
            cominvoiceData: {},
            cascaderList: [],
            isType: true
        }
    },
    created () {
        this.getInvoice()
        this.getCascaderData()
    },
    methods: {
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
        async setInvoice (index) {
            let query = {}
            if (index === 0) {
                query = this.invoiceData;
                query.ProvinceId = this.invoiceAddress[0];
                query.CityId = this.invoiceAddress[1];
                query.AreaId = this.invoiceAddress[2];
                query.Type = 0
            }
            if (index === 1) {
                query = this.cominvoiceData;
                query.ProvinceId = this.comAddress[0];
                query.CityId = this.comAddress[1];
                query.AreaId = this.comAddress[2];
                query.Type = 1
            }
            let msg = await setUserInvoice(query);
            if (msg) {
                this.$Message.success('信息提交成功！')
            }
        },
        async getInvoice (type = 0) {
            this.isType = type === 0 ? true : false;
            let query = {
                Type: type
            }
            this.invoiceData = {}
            let msg = await getUserInvoice(query);
            if (msg) {
                if (type === 0) {
                    this.invoiceData = msg;
                    this.invoiceAddress = [msg.ProvinceId, msg.CityId, msg.AreaId];
                }
                if (type === 1) {
                    this.cominvoiceData = msg;
                    this.comAddress = [msg.ProvinceId, msg.CityId, msg.AreaId];
                }
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .type {
        display: flex;
        margin-left: 70px;
        margin-bottom: 20px;
        margin-top: 20px;
        &-label {
            margin-right: 10px;
        }
    }
   .tribalBill {
       &-title {
           margin: 10px 0;
           &-num {
                display: inline-block;
                font-size: 14px;
                margin-right: 30px;
           }
       }
       &-search {
           margin-bottom: 10px;
       }
   }
   .personalData {
       display: inline-block;
       width: 380px;
       margin-left: 30px;
   }
   .Upload {
       width: 120px;
   }
   .upInvoive {
       display: flex;
       &-item {
           display: inline-block;
           width: 110px;
           height: 110px;
           background: #ddd;
       }
   }
</style>