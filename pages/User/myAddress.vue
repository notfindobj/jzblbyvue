<template>
    <div>
        <Title title="收货地址"/>
        <div class="address">
            <span class="address-tip">已经保存了{{addrssList.length}}条地址，还能保存{{20 - addrssList.length}}条地址</span>
            <Button @click="openAddress">添加地址</Button>
        </div>
        <div class="bill">
           <div>
               <publicTable :columns="columns" :columnsData="addrssList"/>
           </div>
        </div>
        <setAddress :isShow="isShow" :addressData="selectionRow" @closeBtn="closeBtn" @upAddres="upAddres"/>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import setAddress from './components/setAddress'
import {delAddressData, setAddressData} from '../../service/clientAPI'
export default {
    components: {
        Title,
        publicTable,
        setAddress
    },
    data () {
        return {
            columns: [
                {
                    cut: 'text',
                    title: '收货人',
                    key: 'Receiver',
                    width: 80
                },
                {
                    cut: 'keys',
                    title: '所在地区',
                    key: 'ProvinceName,CityName,CountName'
                },
                {
                    cut: 'text',
                    title: '详细地址',
                    key: 'DetailAddress'
                },
                {
                    cut: 'text',
                    title: '邮箱',
                    key: 'Email'
                },
                {
                    cut: 'text',
                    title: '手机号',
                    key: 'MobilePhone',
                    width: 110
                },
                {
                    cut: 'btn',
                    title: '操作',
                    width: 200,
                    key: 'address',
                    state: [{text: '修改', events: 'modify', style: 'info'}, 
                        {text: '删除', events: 'remove', style: 'error'}, 
                        {cut: 'state', key: 'IsDetail', events: 'setDefault', state: [{label: '默认地址', value: true, style: 'primary'}, {label: '设为默认', value: false}], }
                    ]
                }
            ],
            addrssList: [],
            selectionRow: {},
            CompanyArr: [],
            isShow: false
        }
    },
    async asyncData({store}) {
        let msg = await store.dispatch('getAddressData');
        return {
            addrssList: msg.RespShippAdds || []
        }
    },
    methods: {
        async upAddres () {
            this.isShow = false
            let msg = await this.$store.dispatch('getAddressData');
            if (msg) {
                this.addrssList= msg.RespShippAdds || [];
            }
        },
        // 打开
        openAddress () {
            this.isShow = true;
            this.CompanyArr = []
            this.selectionRow = {}
        },
        //关闭
        closeBtn () {
            this.isShow = false
        },
        modify (row) {
            let low = JSON.parse(JSON.stringify(row));
            this.selectionRow = low;
            this.$set(this.selectionRow, 'addList', [low.ProvinceAreaId+','+ low.ProvinceName, low.CityAreaId+','+ low.CityName, low.CountyAreaId+','+ low.CountName])
            this.isShow = true
        },
        async remove (row) {
            this.$Modal.confirm({
                title: '删除项目',
                content: '<p>确定删除地址？</p>',
                onOk: async () => {
                    let query = {
                        Id: row.Id
                    }
                    let mgs = await delAddressData(query);
                    if (mgs) {
                        this.upAddres()
                    }
                },
                onCancel: () => {
                    return false
                }
            });
        },
        async setDefault (row, store) {
            if (!row.IsDetail) {
                row.IsDetail = true
                let mgs = await setAddressData(row);
                if (mgs) {
                    this.upAddres()
                }
            }
            
        }
    },
}
</script>
<style lang="less" scoped>
    .address {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        &-tip {
            background: #de7261;
            flex: 1;
            margin: 0 15px;
            line-height: 30px;
            padding-left: 20px;
            border-radius: 3px;
            color: #ffffff;
        }
    }
</style>