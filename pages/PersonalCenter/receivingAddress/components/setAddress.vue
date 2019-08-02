<template>
    <div class="model" v-if="isShow">
        <div class="model-box">
            <div class="model-box-header">
                <span class="model-box-header-title">添加收货地址</span>
                <span class="model-box-header-icon"> <i class="icon iconfont icon-chahao2" @click="closeBtn"></i> </span>
            </div>
            <div class="model-box-boby">
                <Form class="model-box-boby-form" :label-width="80">
                    <FormItem label="收货人：">
                        <Input  placeholder="收货人"  v-model="addressData.Receiver" style="width: 160px;" />
                    </FormItem>
                    <FormItem label="所在地区：">
                        <!-- <Cascader :data="data" v-model="value1" style="width: 340px;"></Cascader> -->
                        <Select size="small" v-model="addressData.ProvinceArea" style="width:95px" @on-change="onChange">
                            <Option v-for="(items, index) in province" :key="index" :value="items.ProvinceCode+'|'+items.ProvinceName" >{{items.ProvinceName}}</Option>
                        </Select>
                        <Select size="small" v-model="addressData.CityArea" @on-change="onTwoChange" style="width:95px">
                            <Option v-for="(items, index) in city" :key="index" :value="items.ProvinceCode+'|'+items.ProvinceName" >{{items.ProvinceName}}</Option>
                        </Select>
                        <Select size="small" v-model="addressData.CountyArea" style="width:95px">
                            <Option v-for="(items, index) in count" :key="index" :value="items.ProvinceCode+'|'+items.ProvinceName" >{{items.ProvinceName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="详细地址：">
                        <Input  placeholder="详细地址" v-model="addressData.DetailAddress" style="width: 340px;" />
                    </FormItem>
                    <FormItem label="手机号码：">
                        <Input  placeholder="手机号码" v-model="addressData.MobilePhone" style="width: 160px;" />
                    </FormItem>
                    <FormItem label="固定电话：">
                        <Input  placeholder="固定电话" v-model="addressData.FixedTelephone" style="width: 240px;" />
                    </FormItem>
                    <FormItem label="邮箱：">
                        <Input  placeholder="邮箱" v-model="addressData.Email" style="width: 240px;" />
                    </FormItem>
                    <FormItem label="地址别名：">
                        <Input  placeholder="地址别名" v-model="addressData.AddressAlias" style="width: 240px;" />
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
import {setAddressData, getProvinceList} from '../../../../service/clientAPI'
// import {city} from '../../../../static/city'
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
            city: [],
            count: [],
            province: []
        }
    },
    mounted() {
        this.getCityList();
        if (this.addressData.CityArea) {
            this.onChange(this.addressData.ProvinceArea)
        }
        if (this.addressData.CountyArea) {
            this.onTwoChange(this.addressData.CityArea)
        }
    },
    methods: {
        closeBtn () {
            this.$emit('closeBtn')
        },
        async getCityList (id = '', index) {
            let queryData = {
                ProvinceCode: id
            }
            let msg = await getProvinceList(queryData);
            if (msg) {
                if (id) {
                    this.city = msg.respProvince;
                } else {
                    this.province = msg.respProvince;
                }
            }
        },
        onChange (value) {
            let val = value.split('|')[0];
            this.getCityList(val)
        },
         async onTwoChange (value) {
            if (value) {
                let val = value.split('|')[0];
                let queryData = {
                    ProvinceCode: val
                }
                let msg = await getProvinceList(queryData);
                if (msg) {
                    this.count = msg.respProvince;
                }
            }
        },
        async saveAddres () {
            let queryData = {
                Id: this.addressData.Id,
                Receiver: this.addressData.Receiver,
                ProvinceAreaId: this.addressData.ProvinceArea.split('|')[0],
                ProvinceName: this.addressData.ProvinceArea.split('|')[1],
                CityAreaId: this.addressData.CityArea.split('|')[0],
                CityName: this.addressData.CityArea.split('|')[1],
                CountyAreaId: this.addressData.CountyArea.split('|')[0],
                CountName: this.addressData.CountyArea.split('|')[1],
                DetailAddress: this.addressData.DetailAddress,
                MobilePhone: this.addressData.MobilePhone,
                FixedTelephone: this.addressData.FixedTelephone,
                Email: this.addressData.Email,
                AddressAlias: this.addressData.AddressAlias,
                IsDetail: this.addressData.inCount,
            }
            let msg  = await setAddressData(queryData);
            if (msg) {
                this.$Message.success('添加成功');
                this.$emit('upAddres', true)
            }
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
            width: 812px;
            height: 534px;
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
