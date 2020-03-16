<template>
    <div class="demand">
        <div class="demand-bg">
            <div class="demand-bg-form">
                <div class="demand-bg-form-box">
                    <p>已有594,005位业主提交设计需求</p>
                    <Form class="demand-form" ref="formValidate" >
                        <FormItem >
                            <Input v-model="FullName" placeholder="您的称呼"></Input>
                        </FormItem>
                        <FormItem>
                            <Cascader v-model="CompanyArr" :data="cascaderList" :load-data="loadData" placeholder="设计师省市区"></Cascader>
                        </FormItem>
                        <FormItem v-for="(items, index) in orderType" :key="index">
                            <template v-if="items.typename === '建筑面积'">
                                <Input v-model="Area" placeholder="请输入建筑面积">
                                    <span slot="append">m²</span>
                                </Input>
                            </template>
                            <template v-else>
                                <Select :placeholder="items.typename" v-model="items.typeId">
                                    <Option v-for="(item, indexs) in items.list" :key="indexs" :value="item.ModuleId+'|'+item.FullName">{{item.FullName}}</Option>
                                </Select>
                            </template>
                        </FormItem>
                        <FormItem>
                            <Input type="textarea" v-model="Remark" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注"></Input>
                        </FormItem>
                        <FormItem>
                            <Button type="error" long @click="Submission">立即提交</Button>
                        </FormItem>
                         <FormItem>
                            <p class="demand-re">
                                <Icon type="ios-alert-outline" style="color:#ff3c00;"/>
                                我们承诺：为了您的利益以及我们的口碑，您的隐私将被严格保密，请放心填写
                            </p>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getProvinceList, putOrder} from '../../service/clientAPI'
export default {
    layout: 'main',
    data () {
        return {
            CompanyArr: [],
            cascaderList: [],
            FullName: '',
            Remark: '',
            Area: ''
        }
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
        console.log(orderType)
        return {
            orderType : [orderType.datas[1], orderType.datas[2], orderType.datas[3], orderType.datas[4]]
        }
    },
    mounted () {
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
                ele.value = ele.ProvinceCode+"|"+ele.ProvinceName
                ele.label = ele.ProvinceName
            })
            if (msg) {
                this.cascaderList = msg.respProvince;
            }
        },
        async loadData (item, callback) {
            item.loading = true;
            let queryData = {
                ProvinceCode: item.value.split("|")[0]
            }
            let msg = await getProvinceList(queryData);
            if (msg.respProvince instanceof Array) {
                msg.respProvince.forEach(ele => {
                    if (item.level < 2) {
                        ele.level = item.level + 1;
                        ele.loading = false;
                        ele.children = [];
                    }
                    ele.value = ele.ProvinceCode+"|"+ele.ProvinceName
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
        async Submission () {
            if (!this.FullName) {
                this.$Message.error("名称不能为空")
                return false
            }
            if (!(this.CompanyArr.length > 0)) {
                this.$Message.error("城市不能为空")
                return false
            }
            let isSub = true;
            for (let i=0;i<this.orderType.length ;i++) {
                if (isSub && !this.orderType[i].typeId && !(this.orderType[i].typename === '建筑面积')) {
                    this.$Message.error(`${this.orderType[i].typename}不能为空`);
                    isSub = false
                }
            }
            let queryData = {
                FullName: this.FullName,
                ProvinceAreaId: this.CompanyArr[0].split("|")[0],
                ProvinceName: this.CompanyArr[0].split("|")[1],
                CityAreaId: this.CompanyArr[1].split("|")[0],
                CityName: this.CompanyArr[1].split("|")[1],
                BudgetId: this.orderType[3].typeId.split("|")[0],
                BudgetName: this.orderType[3].typeId.split("|")[1],
                WorkTypeId: this.orderType[1].typeId.split("|")[0],
                WorkTypeName:this.orderType[1].typeId.split("|")[1],
                TypeId: this.orderType[0].typeId.split("|")[0],
                TypeName: this.orderType[0].typeId.split("|")[1],
                Remark: this.Remark,
                Area: this.Area
            }
            let msg = await putOrder(queryData);
            if (msg) {
                this.$Notice.success({
                    title: '提交订单成功',
                    desc: '请等待工作人员与您联系，请保持电话畅通！'
                });
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .demand-re {
        text-align: left;
        line-height: 20px;
        color: #9e9c9c;
    }
    .demand {
        background: url('../../assets/images/banner_bg.jpg') center;
        width: 100%;
        min-width: 1200px;
        &-bg {
            margin: 0 auto;
            width: 1200px;
            height: 660px;
           &-form {
               float: right;
               height: 620px;
               width: 400px;
               &-box {
                   background: #ffffff;
                   margin-top: 40px;
                   height: 580px;
                   padding: 15px 0;
                    > p {
                       text-align: center;
                   }
               }
           }
        }
    }
    .demand-form {
        margin-top: 10px;
        padding: 0 20px;
    }
</style>