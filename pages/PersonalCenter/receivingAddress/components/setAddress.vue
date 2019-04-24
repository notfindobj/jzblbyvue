<template>
    <div class="model" v-if="isShow">
        <div class="model-box">
            <div class="model-box-header">
                <span class="model-box-header-title">添加收货地址</span>
                <span class="model-box-header-icon"> <i class="icon iconfont icon-chahao2"></i> </span>
            </div>
            <div class="model-box-boby">
                <Form class="model-box-boby-form" :label-width="80">
                    <FormItem label="收货人：">
                        <Input  placeholder="收货人" style="width: 160px;" />
                    </FormItem>
                    <FormItem label="所在地区：">
                        <Cascader :data="data" v-model="value1" style="width: 340px;"></Cascader>
                    </FormItem>
                    <FormItem label="详细地址：">
                        <Input  placeholder="详细地址" style="width: 340px;" />
                    </FormItem>
                    <FormItem label="手机号码：">
                        <Input  placeholder="手机号码" style="width: 160px;" />
                    </FormItem>
                    <FormItem label="固定电话：">
                        <Input  placeholder="固定电话" style="width: 240px;" />
                    </FormItem>
                    <FormItem label="邮箱：">
                        <Input  placeholder="邮箱" style="width: 240px;" />
                    </FormItem>
                    <FormItem label="地址别名：">
                        <Input  placeholder="地址别名" style="width: 240px;" />
                    </FormItem>
                </Form>
            </div>
            <div class="model-box-footer">
                <div class="modifying-head">保存</div>
                <div class="modifying-cancel">取消</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'setAddress',
    props: {
        isShow: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    data () {
        return {
            value1: [],
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
    .model {
        z-index: 1006;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.3);
        &-box {
            position: relative;
            top: 50%;
            left: 55%;
            transform: translate(-50% ,-50%);
            width: 812px;
            height: 530px;
            background: #ffffff;
            font-size: 14px;
            &-header {
                height: 42px;
                background: #F2F2F2;
                display: flex;
                justify-content: space-between;
                line-height: 42px;
                &-title {
                    font-size: 16px;
                    color: #333333;
                    padding-left: 20px;
                }
                &-icon {
                    padding-right: 20px;
                    cursor: pointer;
                }
            }
            &-boby {
                margin-top: 25px;
                padding-left: 40px;
                &-form {
                    
                }
            }
            &-footer {
                margin-left: 30%;
            }
        }
    }
    .modifying-head {
        font-size: 16px;
        color: #FFFFFF;
        padding: 4px 18px;
        background: #FF3C00;
        display: inline-block;
        border-radius: 3px;
        cursor: pointer;
    }
    .modifying-cancel {
        font-size: 16px;
        color: #666666;
        padding: 4px 18px;
        margin-left: 50px;
        border: 1px solid #DDDDDD;
        display: inline-block;
        border-radius: 3px;
        cursor: pointer;
    }
</style>
