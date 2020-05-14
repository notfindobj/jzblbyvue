<template>
    <div class="lecturer">
        <h1>建筑学院讲师入驻表</h1>
        <p class="lecturer-sub">请如实填写如下信息，提交即有机会作为【溜溜自学讲师】，获得高额的课酬。通过审核后，我们将在1-2个工作日内，通过电话或QQ与您联系，届时请保持联系通畅。</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" >
        <FormItem label="姓名" prop="name">
            <Input v-model="formValidate.name" placeholder="姓名"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="name">
            <Input v-model="formValidate.name" placeholder="手机号码"></Input>
        </FormItem>
        <FormItem label="微信号" prop="name">
            <Input v-model="formValidate.name" placeholder="微信号"></Input>
        </FormItem>
        <FormItem label="QQ号" prop="name">
            <Input v-model="formValidate.name" placeholder="QQ号"></Input>
        </FormItem>
        <FormItem label="哪个联系您比较方便" prop="gender">
            <br>
            <RadioGroup v-model="formValidate.gender">
                <Radio label="QQ">QQ</Radio>
                <Radio label="微信">微信</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="现任职业" prop="name">
            <Input v-model="formValidate.name" placeholder="现任职业"></Input>
        </FormItem>
        <FormItem label="是否录制过课程" prop="city">
            <Select v-model="formValidate.city" placeholder="是否录制过课程">
                <Option value="beijing">是</Option>
                <Option value="shanghai">否</Option>
            </Select>
        </FormItem>
        <FormItem label="录制过的教程查看地址(网址)" prop="name">
            <Input v-model="formValidate.name" placeholder="录制过的教程查看地址"></Input>
        </FormItem>
        <FormItem label="擅长课程类型" prop="name">
            <Input v-model="formValidate.name" placeholder="擅长课程类型"></Input>
        </FormItem>
        <FormItem label="个人简介" prop="name">
            <Input v-model="formValidate.name" placeholder="个人简介"></Input>
        </FormItem>
        <FormItem label="申请理由" prop="name">
            <Input v-model="formValidate.name" placeholder="申请理由"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">申请</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重写</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
export default {
    layout: "chat",
      data () {
            return {
                formValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
}
</script>
<style lang="less" scoped>
.lecturer {
    padding: 50px;
    font-size: 14px;
    margin: 0 auto;
    width: 1200px;
    background: #fff;
    h1 {
        font-size: 18px;
    }
    &-sub {
        margin-top: 20px;
        padding-bottom: 20px;
        border-bottom: 3px solid #53a4f4;
    }
}
</style>