<template>
    <div>
        <Title title="收货地址"/>
        <div class="address">
            <span class="address-tip">已经保存了{{addrssList.length}}条地址，还能保存{{20 - addrssList.length}}条地址</span>
            <Button >添加地址</Button>
        </div>
        <div class="bill">
           <div>
               <publicTable :columns="columns" :columnsData="addrssList"/>
           </div>
        </div>
        <setAddress :isShow="isShow" :addressData="selectionRow"/>
    </div>
</template>
<script>
import Title from './components/title'
import publicTable from './components/publicTable'
import setAddress from './components/setAddress'
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
                    state: [{text: '修改', events: 'modify'}, {text: '删除', events: 'addVal'}, {text: '设为默认', events: 'addVal'}]
                }
            ],
            selectionRow: {},
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
        modify (row) {
            this.selectionRow = row;
            this.isShow = true
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