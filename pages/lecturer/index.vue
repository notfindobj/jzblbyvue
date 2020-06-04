<template>
    <div class="lecturer">
        <h1>建筑学院讲师入驻表</h1>
        <p class="lecturer-sub">请如实填写如下信息，提交即有机会作为【建筑学院讲师】，获得高额的课酬。通过审核后，我们将在1-2个工作日内，通过电话或QQ与您联系，届时请保持联系通畅。</p>
        <Form ref="lecturer" :model="lecturer" :rules="ruleLecturer" >
        <FormItem label="姓名" prop="FullName">
            <Input v-model="lecturer.FullName" placeholder="姓名"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="Phone">
            <Input v-model="lecturer.Phone" placeholder="手机号码"></Input>
        </FormItem>
        <FormItem label="微信号" prop="WeChatID">
            <Input v-model="lecturer.WeChatID" placeholder="微信号"></Input>
        </FormItem>
        <FormItem label="QQ号" prop="QQID">
            <Input v-model="lecturer.QQID" placeholder="QQ号"></Input>
        </FormItem>
        <FormItem label="哪个联系您比较方便" prop="HopeContactWay">
            <br>
            <RadioGroup v-model="lecturer.HopeContactWay">
                <Radio label="0">QQ</Radio>
                <Radio label="1">微信</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="现任职业" prop="CurrentCareer">
            <Input v-model="lecturer.CurrentCareer" placeholder="现任职业"></Input>
        </FormItem>
        <FormItem label="是否录制过课程" prop="IsRecordeCourse">
            <Select v-model="lecturer.IsRecordeCourse" placeholder="是否录制过课程">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
            </Select>
        </FormItem>
        <FormItem label="录制过的教程查看地址(网址)" prop="Url">
            <Input v-model="lecturer.Url" placeholder="录制过的教程查看地址"></Input>
        </FormItem>
        <FormItem label="擅长课程类型" prop="GoodAtCourse">
            <Input v-model="lecturer.GoodAtCourse" placeholder="擅长课程类型"></Input>
        </FormItem>
        <FormItem label="个人简介" prop="Description">
            <Input v-model="lecturer.Description" placeholder="个人简介"></Input>
        </FormItem>
        <FormItem label="申请理由" prop="Reason">
            <Input v-model="lecturer.Reason" placeholder="申请理由"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('lecturer')">申请</Button>
            <Button @click="handleReset('lecturer')" style="margin-left: 8px">重写</Button>
        </FormItem>
    </Form>
    </div>
</template>
<script>
import { LecturerApply } from "../../service/course";
export default {
    layout: "course",
    data () {
        return {
            lecturer: {
                ID: "",
                FullName: '',
                Phone: '',
                WeChatID: '',
                QQID: '',
                HopeContactWay: '',
                CurrentCareer: '',
                GoodAtCourse: '',
                IsRecordeCourse: '',
                Url: '',
                Description: '',
                Reason: ''
            },
            ruleLecturer: {
                FullName: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' }
                ],
                Phone: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' }
                ],
                WeChatID: [
                    { required: true, message: '微信号不能为空', trigger: 'blur' }
                ],
                QQID: [
                    { required: true, message: 'QQ号不能为空', trigger: 'blur' }
                ],
                HopeContactWay: [
                    { required: true, message: '希望联系方式不能为空', trigger: 'blur' }
                ],
                CurrentCareer: [
                    { required: true, message: '现任职业不能为空', trigger: 'blur' }
                ],
                GoodAtCourse: [
                    { required: true, message: '擅长课程类型不能为空', trigger: 'blur' }
                ],
                IsRecordeCourse: [
                    { required: true, message: '是否录制过课程不能为空', trigger: 'blur' }
                ],
                Url: [
                    { required: true, message: '教程地址不能为空', trigger: 'blur' }
                ],
                Description: [
                    { required: true, message: '个人简介不能为空', trigger: 'blur' }
                ],
                Reason: [
                    { required: true, message: '申请理由不能为空', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        handleSubmit (name) {
            let that = this;
            this.$refs[name].validate((valid) => {
                if (valid) {
                    LecturerApply(that.lecturer).then(res => {
                        this.$Message.success('申请成功，请等待审核！');
                        this.$refs[name].resetFields();
                    }).catch(err => {})
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