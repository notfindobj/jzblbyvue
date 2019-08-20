<template>
     <div class="comreg">
        <Form :model="formLeft" :rules="rules" label-position="right" :label-width="120">
            <FormItem label="公司名称:" prop="name">
                <Input v-model="formLeft.input1" style="width: 300px;"></Input>
            </FormItem>
            <FormItem label="营业执照注册号:" prop="name">
                <Input v-model="formLeft.input2" style="width: 300px;"></Input>
            </FormItem>
            <FormItem label="营业执照:" prop="name">
                <div @click="changeFile" class="updataFile-camera ivu-icon ivu-icon-ios-camera">
                    <input ref="updataFile" type="file" style="display: none;">
                </div>
                <!-- <Input v-model="formLeft.input3" style="width: 300px;"></Input> -->
            </FormItem>
             <FormItem label="营业期限:" prop="name">
                <Input v-model="formLeft.input3" style="width: 300px;"></Input>
            </FormItem>
        </Form>
     </div>
</template>
<script>
export default {
    layout: 'main',
    // middleware: 'authenticated',
    data() {
        return {
            formLeft: {},
            rules: {
                name: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        changeFile () {
            this.$refs.updataFile.click()
        }
    }
}
</script>
<style lang="less" scoped>
    .updataFile-camera {
        font-size: 26px;
        border: 1px dotted #8e8e8e;
        cursor: pointer;
        padding: 10px;
        &:hover {
            border: 1px dotted #ff3c00;
        }
    }
    .comreg {
        width: 1000px;
        padding: 30px;
        background: #ffffff;
        margin-top: 20px;
        margin: 0 auto;
    }
</style>