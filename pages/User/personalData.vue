<template>
    <div>
        <Title title="账户资料"/>
        <Form class="personalData" ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
            <FormItem label="" >
                <div class="user-header">
                    <img src="http://www.pic.jzbl.com/ItemFiles/UserInfoImg/284bee74-7bd4-4dc7-9c78-54d93217d638/1576553145_s.jpg" alt="">
                </div>
            </FormItem>
            <FormItem label="名称（昵称）" prop="user">
                <Input size="small" type="text" v-model="formInline.user" disabled placeholder="名称（昵称）"></Input>
            </FormItem>
            <FormItem label="真实姓名" prop="user">
                <Input size="small" type="text" v-model="formInline.user" placeholder="真实姓名"></Input>
            </FormItem>
            <FormItem label="所在地" prop="user">
                <Cascader v-model="value2" clearable :data="data"></Cascader>
            </FormItem>
            <FormItem label="性别" prop="user">
                <Select v-model="model1" clearable >
                    <Option value="1">男</Option>
                    <Option value="0">女</Option>
                </Select>
            </FormItem>
            <FormItem label="感情状态" prop="user">
                <Select v-model="model1" clearable>
                    <Option value="1">单身</Option>
                    <Option value="0">已婚</Option>
                    <Option value="3">丧偶</Option>
                </Select>
            </FormItem>
            <FormItem label="生日" prop="user">
                <DatePicker type="date" clearable placeholder="Select date" ></DatePicker>
            </FormItem>
            <FormItem label="职业类型" prop="user">
                <Select v-model="model2" clearable>
                    <Option value="1">修图</Option>
                </Select>
            </FormItem>
            <FormItem label="个人擅长" prop="user">
                <Input size="small" type="text" clearable v-model="formInline.user" placeholder="个人擅长"></Input>
            </FormItem>
            <FormItem label="个人简介" prop="user">
                <Input v-model="value7" type="textarea" :autosize="{minRows: 2}" placeholder="个人简介" />
            </FormItem>
        </Form>
        <Title title="工作经历"/>
        <Form class="work" ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
            <Row>
                <Col span="11">
                    <FormItem label="单位名称：" prop="user">
                        <Input size="small" type="text" v-model="formInline.user" placeholder="单位名称"></Input>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="权限：" prop="user">
                        <Select v-model="model1" clearable>
                            <Option value="1">单身</Option>
                            <Option value="0">已婚</Option>
                            <Option value="3">丧偶</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="11">
                    <FormItem label="部门：" prop="user">
                        <Input size="small" type="text" v-model="formInline.user" placeholder="部门"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="11">
                    <FormItem label="工作时间：" prop="user">
                        <DatePicker type="date" clearable placeholder="工作时间" ></DatePicker>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="11">
                    <FormItem label="所在地：" prop="user">
                        <Cascader v-model="value2" clearable :data="data"></Cascader>
                    </FormItem>
                </Col>
            </Row>
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
    .work {
        width: 100%;
        display: inline-block;
        padding-left: 80px;
        margin-top: 20px;
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
        img {
            cursor: pointer;
            display: inline-block;
            background: #abc;
            border-radius: 50%;
            width: 80px;
            height: 80px;
        }
    }
</style>