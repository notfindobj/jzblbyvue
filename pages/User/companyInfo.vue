<template>
    <div>
        <Title title="账户资料"/>
        <div class="user-box">
            <Form class="personalData" ref="formInline" :model="comInfo" :rules="ruleInline" :label-width="100">
                <FormItem >
                    <div class="user-header">
                        <img :src="Identity.HeadIcon" alt="">
                        <div class="user-header-mol" @click="modifyHead">
                            <span>修改头像</span>
                            <input type="file" style="display: none;" ref="headIcon" @change="upHeadIcon">
                        </div>
                    </div>
                </FormItem>
                <FormItem label="公司名称" prop="user">
                    <Input size="small" type="text" v-model="comInfo.Nickname" :disabled="controlCom" placeholder="公司名称"></Input>
                </FormItem>
                <FormItem label="公司全称" prop="user">
                    <Input size="small" type="text" v-model="comInfo.RealName"  :disabled="controlCom"  placeholder="公司全称"></Input>
                </FormItem>
                <FormItem label="公司擅长" prop="user">
                    <Input size="small" type="text" clearable v-model="formInline.user"  :disabled="controlCom"  placeholder="个人擅长"></Input>
                </FormItem>
                <FormItem label="公司电话" prop="user">
                    <Input size="small" type="text" clearable v-model="comInfo.Telephone"  :disabled="controlCom"  placeholder="个人擅长"></Input>
                </FormItem>
                <FormItem label="公司邮件" prop="user">
                    <Input size="small" type="text" clearable v-model="comInfo.Email"  :disabled="controlCom"  placeholder="个人擅长"></Input>
                </FormItem>
                <FormItem label="公司类型" prop="user">
                    <Select v-model="comInfo.EmotionalStateId" clearable  :disabled="controlCom" >
                        <Option v-for="item in entTypeList" :value="item.EntTypeId" :key="item.EntTypeId">{{ item.EntName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="公司所在地" prop="user">
                    <Cascader v-model="comInfo.addresList" :data="cascaderList" :load-data="loadData"  :disabled="controlCom" ></Cascader>
                </FormItem>
                <FormItem label="详细地址" prop="user">
                    <Input size="small" type="text" clearable v-model="comInfo.user" placeholder="详细地址"  :disabled="controlCom" ></Input>
                </FormItem>
                <FormItem label="公司简介" prop="user">
                    <Input v-model="comInfo.Description" type="textarea" :autosize="{minRows: 2}" placeholder="公司简介"  :disabled="controlCom" />
                </FormItem>
            </Form>
            <div class="user-btn">
                <Button @click="saveInfo">{{controlCom? '修改资料' : '保存资料'}}</Button>
            </div>
        </div>
    </div>
</template>
<script>
import Title from './components/title'
import {getUserData, getEntType, getProvinceList, uploadFile} from '../../service/clientAPI'
import { mapState, mapGetters} from 'vuex'
export default {
    components: { 
        Title,
    },
    data () {
        return {
            formInline: {},
            ruleInline: {},
            model1: '1',
            model2: '1',
            value7: '',
            value2: ['jiangsu', 'suzhou', 'zhuozhengyuan'],
            controlCom: true,
            comInfo: {},
            entTypeList: [],
            cascaderList: []
        }
    },
    computed: {
        ...mapState({
            Identity: state => state.overas.auth || {}
        }),
        ...mapGetters(['isLogin'])
    },
    created () {
        let query = {
            userId: this.Identity.UserId
        }
        this.getComInfo(query);
        this.getEntTypeList();
        this.getCascaderData();
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
        // 获取账户信息
        async getComInfo(value) {
            let msg = await getUserData(value);
            if (msg) {
                this.comInfo = msg;
                this.comInfo.addresList = [msg.ProvinceAreaId, msg.CityAreaId, msg.CountyAreaId];
            }
        },
        async getEntTypeList () {
            let msg = await getEntType();
            if (msg) {
                this.entTypeList = msg;
            }   
        },
        modifyHead () {
            this.$refs.headIcon.click()
        },
        // 修改头像
        async upHeadIcon (event) {
            let file = event.target.files;
            let data = new FormData();
            for (let item of file) {
                data.append('files', item)
            }
            let msg = await uploadFile(data, 8);
            if (msg) {
                this.comInfo.HeadIconSrc = msg.smallImgUrl;
                let info = JSON.parse(JSON.stringify(this.Identity));
                this.comInfo.HeadIconSrc = msg.smallImgUrl;
                info.HeadIcon = msg.smallImgUrl;
                this.$store.dispatch('LOGININ', info);
                localStorage.setItem('LOGININ', JSON.stringify(info))
            }
        },
        saveInfo () {
            if (this.controlCom) {
                this.controlCom = false;
                return false
            }
            if (!this.controlCom) {
                this.controlCom = true;
            }
        }
    },
}
</script>
<style lang="less" scoped>
    .user-box {
        display: flex;
        justify-content: space-between;
    }
    .user-btn {
        margin-top: 20px;
        margin-right: 20px;
    }
    .personalData {
        width: 380px;
        margin-top: 20px;
        display: inline-block;
        margin-left: 80px;
    }
    .user-header {
        text-align: center;
        display: flex;
        width: 60%;
        justify-content: center;
        position: relative;
        img {
            cursor: pointer;
            display: inline-block;
            background: #abc;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            
        }
        &:hover .user-header-mol{
            display: inline-block;
        }
        &-mol {
            position: absolute;
            cursor: pointer;
            top: 0;
            display: none;
            width: 80px;
            height: 80px;
            background: rgba(0,0,0,.4);
            border-radius: 50%;
            color: #ffffff;
            span {
                font-size: 14px;
                line-height: 80px;
            }
        }
    }
</style>