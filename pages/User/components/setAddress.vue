<template>
    <div class="model" v-if="isShow">
        <div class="model-box">
            <div class="model-box-header">
                <span class="model-box-header-title">添加收货地址</span>
                <span class="model-box-header-icon"> <i class="icon iconfont icon-chahao2" @click="closeBtn"></i> </span>
            </div>
            <div class="model-box-boby">
                <Form ref="addres" class="model-box-boby-form" :model="addressData" :rules="ruleAddres" :label-width="90">
                    <FormItem label="收货人：" prop="Receiver">
                        <Input  placeholder="收货人" v-model="addressData.Receiver" style="width: 240px;" />
                    </FormItem>
                    <FormItem label="所在地区：" prop="addList">
                        <Cascader v-model="addressData.addList" :data="cascaderList" :load-data="loadData" style="width: 240px;"></Cascader>
                    </FormItem>
                    <FormItem label="详细地址：" prop="DetailAddress">
                        <Input  placeholder="详细地址" v-model="addressData.DetailAddress" style="width: 340px;" />
                    </FormItem>
                    <FormItem label="手机号码：" prop="MobilePhone">
                        <Input  placeholder="手机号码" v-model="addressData.MobilePhone" style="width: 240px;" />
                    </FormItem>
                    <FormItem label="邮箱：" prop="Email">
                        <Input  placeholder="邮箱" v-model="addressData.Email" style="width: 240px;" />
                    </FormItem>
                </Form>
            </div>
            <div class="model-box-footer">
                <div class="modifying-head" @click="saveAddres">保存</div>
                <div class="modifying-cancel" @click="closeBtn">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
import {setAddressData, getProvinceList} from '../../../service/clientAPI'
export default {
    name: 'setAddress',
    props: {
        isShow: {
            type: Boolean,
            required: true,
            default: false
        },
        addressData: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            cascaderList: [], // 城市信息
            ruleAddres: {
                Receiver: [
                    { required: true, message: '收货人不能为空', trigger: 'blur' }
                ],
                addList: [
                    {type: 'array', required: true, message: '所在地区不能为空', trigger: 'change'}
                ],
                DetailAddress: [
                    { required: true, message: '详细地址不能为空', trigger: 'blur' }
                ],
                MobilePhone: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' }
                ],
                Email: [
                    { required: true, message: '邮箱不能为空', trigger: 'blur' }
                ],
            }
        }
    },
    mounted() {
        this.getCascaderData()
    },
    methods: {
        closeBtn () {
            this.$emit('closeBtn')
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
                ele.value = ele.ProvinceCode+','+ele.ProvinceName
                ele.label = ele.ProvinceName
            })
            if (msg) {
                this.cascaderList = msg.respProvince;
            }
        },
        async loadData (item, callback) {
            item.loading = true;
            let queryData = {
                ProvinceCode: item.value.split(',')[0]
            }
            let msg = await getProvinceList(queryData);
            if (msg.respProvince instanceof Array) {
                msg.respProvince.forEach(ele => {
                    if (item.level < 2) {
                        ele.level = item.level + 1;
                        ele.loading = false;
                        ele.children = [];
                    }
                    ele.value = ele.ProvinceCode+','+ele.ProvinceName
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
        saveAddres () {
            this.$refs['addres'].validate(async (valid) => {
                if (valid) {
                    let queryData ={}
                    try {
                        queryData = {
                            Id: this.addressData.Id,
                            Receiver: this.addressData.Receiver,
                            ProvinceAreaId: this.addressData.addList[0].split(',')[0],
                            ProvinceName: this.addressData.addList[0].split(',')[1],
                            CityAreaId: this.addressData.addList[1].split(',')[0],
                            CityName: this.addressData.addList[1].split(',')[1],
                            CountyAreaId: this.addressData.addList[2].split(',')[0],
                            CountName: this.addressData.addList[2].split(',')[1],
                            DetailAddress: this.addressData.DetailAddress,
                            MobilePhone: this.addressData.MobilePhone,
                            FixedTelephone: this.addressData.FixedTelephone,
                            Email: this.addressData.Email,
                            AddressAlias: this.addressData.AddressAlias,
                            IsDetail: this.addressData.IsDetail || false,
                        }
                    } catch (error) {
                        this.$Message.error('参数错误');
                        return false
                    }
                    let msg  = await setAddressData(queryData);
                    if (msg) {
                        this.$Message.success('添加成功');
                        this.$emit('upAddres', true)
                    }
                }
            })
            
        }
    }
}
</script>
<style lang="less" scoped>
    .model {
        z-index: 1006;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.3);
        &-box {
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50% ,-50%);
            width: 700px;
            height: 500px;
            background: #ffffff;
            font-size: 14px;
            &-header {
                height: 42px;
                background: #F2F2F2;
                display: flex;
                justify-content: space-between;
                line-height: 42px;
                &-title {
                    font-size: 16px;
                    color: #333333;
                    padding-left: 20px;
                }
                &-icon {
                    padding-right: 20px;
                    cursor: pointer;
                }
            }
            &-boby {
                margin-top: 25px;
                padding-left: 40px;
                &-form {
                    
                }
            }
            &-footer {
                margin-left: 30%;
            }
        }
    }
    .modifying-head {
        font-size: 16px;
        color: #FFFFFF;
        padding: 4px 18px;
        background: #FF3C00;
        display: inline-block;
        border-radius: 3px;
        cursor: pointer;
    }
    .modifying-cancel {
        font-size: 16px;
        color: #666666;
        padding: 4px 18px;
        margin-left: 50px;
        border: 1px solid #DDDDDD;
        display: inline-block;
        border-radius: 3px;
        cursor: pointer;
    }
</style>
