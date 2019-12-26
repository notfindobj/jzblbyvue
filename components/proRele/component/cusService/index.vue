<template>
    <!-- 定制服务 -->
    <Modal v-model="cusConfig.serviceModal" width="594" title="提供定制服务"  class-name="service-box" >
        <div class="service-box-content">
            <Form ref="serviceValidate" :model="serviceValidate" :rules="rulesValidate" :label-width="100" >
                <FormItem label="定制类型:">
                    <template v-for="(item) in serviceList" >
                        <Button :type="serviceValidate.serviceId === item.ItemDetailId ? 'primary': 'default'" class="service-btn" :key="'btn'+item.ItemDetailId" @click.native="selectSerice(item.ItemDetailId, item.ItemValue)" > {{ item.ItemValue }} </Button>
                    </template>
                </FormItem>
                <FormItem label="定制金额:" prop="money">
                    <Input type="number" v-model="serviceValidate.money" placeholder="请选择"></Input>
                </FormItem>
                <FormItem label="手机号码:" prop="mobile">
                    <Input type="number" v-model="serviceValidate.mobile" placeholder="请输入11位手机号码"></Input>
                </FormItem>
                <FormItem label="定制描述:" prop="desc">
                    <Input v-model="serviceValidate.desc" type="textarea" :maxlength="500" :autosize="{minRows: 5,maxRows: 5}" placeholder="请填写0-500字定制描述"></Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button @click="cancelService">取消</Button>
            <Button type="primary" @click="clickModalConfirm('serviceValidate')">确定</Button>
        </div>
    </Modal>
</template>
<script>
import {validateNum, validatePassCheck} from '../../../../plugins/untils/Verify'
export default {
    props:{
        cusConfig: {
            required: true,
            type: Object,
            default: function () {
                return {
                    serviceModal: false
                }
            }
        },
        serviceList: {
            required: true,
            type: Array,
            default: function () {
                return []
            }
        }
    },
    data () {
        return {
            isUpdateService: false,
            serviceName: '',
            serviceValidate: {// 定制服务
                serviceId: '',
                money: '',
                mobile: '',
                desc: ''
            },
            rulesValidate: {// 定制服务rules
                money: [
                    {required: true, validator: validateNum, trigger: 'blur' }
                ],
                mobile: [
                    {required: true, validator: validatePassCheck, trigger: 'blur' }
                ],
                desc: [
                    {required: true, message: '描述不能为空', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        // 清除定制服务内容
        cancelService () {
            this.serviceValidate = {
                serviceId: '',
                type: '',
                money: '',
                mobile: '',
                desc: ''
            }
        },
        selectSerice (id, name) {
            this.serviceValidate.serviceId = id;
            this.serviceName = name;
        },
        // 点击定制服务弹出框确定
        clickModalConfirm() {
            let _this = this;
            if (this.serviceValidate.serviceId === '') {
                this.$Message.warning('请选择定制类型');
                return false;
            }
            this.$refs['serviceValidate'].validate((valid) => {
                if (valid) {
                    const obj = {
                        name: this.serviceName,
                        customizedTypeId: this.serviceValidate.serviceId,
                        customizedMoney: this.serviceValidate.money,
                        customizeMobile: this.serviceValidate.mobile,
                        customizeDescription: this.serviceValidate.desc
                    };
                    _this.$emit('clickModalConfirm', obj)
                }
            })
            
        }
    },
}
</script>
<style lang="less" scoped>
    
</style>