<template>
    <div>
        <Title title="意见反馈"/>
        <div>
            欢迎反馈问题，您的意见与建议就是我们的动力！
        </div>
        <Form class="feedback" ref="formInline" :model="formInline" :rules="ruleInline" :label-width="100">
            <FormItem label="标题" prop="user">
                <Input size="small" type="text" v-model="formInline.user" placeholder="标题"></Input>
            </FormItem>
            <FormItem label="反馈类型" prop="user">
                <Select v-model="model1" clearable >
                    <Option value="1">男</Option>
                    <Option value="0">女</Option>
                </Select>
            </FormItem>
            <FormItem label="反馈内容" prop="user">
                <Input v-model="value7" type="textarea" :autosize="{minRows: 2}" placeholder="反馈内容" />
            </FormItem>
            <div>
                将对您的联系方式严格保密
            </div>
            <FormItem label="QQ" prop="user">
                <Input size="small" type="text" v-model="formInline.user" placeholder="QQ"></Input>
            </FormItem>
            <FormItem label="联系人电话" prop="user">
                <Input size="small" type="text" v-model="formInline.user" placeholder="联系人电话"></Input>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import Title from './components/title'
export default {
    key: to => to.fullPath,
    components: {
        Title
    },
    data () {
        return {
            formInline: {},
            ruleInline: {},
            model1: '',
            value7: ''
        }
    }
}
</script>
<style lang="less" scoped>
    .feedback {
        padding-left: 100px;
        padding-right: 300px;
    }
</style>