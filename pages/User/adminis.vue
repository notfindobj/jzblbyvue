<template>
<!-- 公司认证 -->
    <div>
        <Title title="公司认证"/>
        <div class="attestation">
            <Form class="personalData" ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
                <FormItem label="公司名称" prop="user">
                    <Input size="small" type="text" v-model="formInline.user" placeholder="公司名称" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="个人头像" prop="user">
                    <div class="user-header">
                        <img src="http://www.pic.jzbl.com/ItemFiles/UserInfoImg/284bee74-7bd4-4dc7-9c78-54d93217d638/1576553145_s.jpg" alt="">
                        <div class="user-header-mol">
                            <span>修改头像</span>
                        </div>
                    </div>
                    <div class="user-tips">
                        实名认证需上传您的个人真实头像，如非真实头像，将影响认证审核
                    </div>
                </FormItem>
                <FormItem label="身份证正面" prop="user">
                    <div class="card">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    </div>
                </FormItem>
                <FormItem label="身份证反面" prop="user">
                    <div class="card">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    </div>
                    <div class="card-tips">
                        请上传彩色二代身份证，可以是扫描件或数码相机照片，要求姓名、证件号码、脸部、地址都清晰可见。支持JPG，PNG，BMP格式，文件大小不超过200K。查看范例
                    </div>
                </FormItem>
                <div class="tips">
                    请填写银行账户信息，银行账号可以是企业对公账号或法人名下账号，以保障提现时汇款顺利！
                </div>
                <FormItem label="银行名称" prop="user">
                    <Select v-model="model2" clearable style="width: 240px;">
                        <Option value="1">工商银行</Option>
                    </Select>
                </FormItem>
                <FormItem label="银行卡号" prop="user">
                    <Input size="small" type="text" clearable v-model="formInline.user" placeholder="银行卡号" style="width: 240px;"></Input>
                </FormItem>
            </Form>
        </div>
        <Title title="管理人员信息"/>
        <div class="attestation">
            <Form class="personalData" ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
                <FormItem label="真实姓名" prop="user">
                    <Input size="small" type="text" v-model="formInline.user" placeholder="真实姓名" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="身份证号码" prop="user">
                    <Input size="small" type="text" v-model="formInline.user" placeholder="身份证号码" style="width: 240px;"></Input>
                </FormItem>
                <FormItem label="个人头像" prop="user">
                    <div class="user-header">
                        <img src="http://www.pic.jzbl.com/ItemFiles/UserInfoImg/284bee74-7bd4-4dc7-9c78-54d93217d638/1576553145_s.jpg" alt="">
                        <div class="user-header-mol">
                            <span>修改头像</span>
                        </div>
                    </div>
                    <div class="user-tips">
                        实名认证需上传您的个人真实头像，如非真实头像，将影响认证审核
                    </div>
                </FormItem>
                <FormItem label="身份证正面" prop="user">
                    <div class="card">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    </div>
                </FormItem>
                <FormItem label="身份证反面" prop="user">
                    <div class="card">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    </div>
                    <div class="card-tips">
                        请上传彩色二代身份证，可以是扫描件或数码相机照片，要求姓名、证件号码、脸部、地址都清晰可见。支持JPG，PNG，BMP格式，文件大小不超过200K。查看范例
                    </div>
                </FormItem>
                <FormItem label="手机号" prop="user">
                    <Input size="small" type="text" clearable v-model="formInline.user" placeholder="手机号" style="width: 240px;"></Input>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
import Title from './components/title'
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
            data: [{
                    value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            value: 'gugong',
                            label: '故宫'
                        },
                        {
                            value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
            }]
        }
    }
}
</script>
<style lang="less" scoped>
    .attestation {
        width: 100%;
        margin-top: 20px;
        display: inline-block;
        padding-left: 80px;
    }
    .tips {
        position: relative;
        margin-top: -20px;
        margin-bottom: 15px;
    }
    .user-header {
        display: inline-block;
        position: relative;
        img {
            cursor: pointer;
            display: inline-block;
            background: #abc;
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
            left: 0;
            display: none;
            width: 80px;
            height: 80px;
            background: rgba(0,0,0,.4);
            color: #ffffff;
            text-align: center;
            span {
                font-size: 14px;
                line-height: 80px;
            }
        }
    }
    .user-tips {
        position: relative;
        margin-top: -15px;
        margin-bottom: -10px;
        color: #8c8c8c
    }
    .card-tips {
        line-height: 20px;
        margin: 10px 0;
        color: #8c8c8c;
        padding-right: 30px;
    }
    .card {
        border: 1px dashed #cccccc;
        cursor: pointer;
        width: 250px;
        text-align: center;
        height: 55px;
    }
</style>