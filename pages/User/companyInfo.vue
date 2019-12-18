<template>
    <div>
        <Title title="账户资料"/>
        <Form class="personalData" ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
            <FormItem >
                <div class="user-header">
                    <img src="http://www.pic.jzbl.com/ItemFiles/UserInfoImg/284bee74-7bd4-4dc7-9c78-54d93217d638/1576553145_s.jpg" alt="">
                    <div class="user-header-mol">
                        <span>修改头像</span>
                    </div>
                </div>
            </FormItem>
            <FormItem label="公司名称" prop="user">
                <Input size="small" type="text" v-model="formInline.user" disabled placeholder="公司名称"></Input>
            </FormItem>
            <FormItem label="公司全称" prop="user">
                <Input size="small" type="text" v-model="formInline.user" placeholder="公司全称"></Input>
            </FormItem>
            <FormItem label="公司类型" prop="user">
                <Select v-model="model1" clearable >
                    <Option value="1">男</Option>
                    <Option value="0">女</Option>
                </Select>
            </FormItem>
            <FormItem label="公司擅长" prop="user">
                <Input size="small" type="text" clearable v-model="formInline.user" placeholder="个人擅长"></Input>
            </FormItem>
            <FormItem label="公司邮件" prop="user">
                <Input size="small" type="text" clearable v-model="formInline.user" placeholder="个人擅长"></Input>
            </FormItem>
            <FormItem label="公司所在地" prop="user">
                <Cascader v-model="value2" clearable :data="data"></Cascader>
            </FormItem>
            <FormItem label="详细地址" prop="user">
                <Input size="small" type="text" clearable v-model="formInline.user" placeholder="个人擅长"></Input>
            </FormItem>
            <FormItem label="公司简介" prop="user">
                <Input v-model="value7" type="textarea" :autosize="{minRows: 2}" placeholder="个人简介" />
            </FormItem>
        </Form>
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