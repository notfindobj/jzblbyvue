<template>
    <div class="message">
        <!-- 头像 -->
        <div class="message-items">
           <div class="message-items-left">
               <span class="message-items-left-label left-label">头像</span>
           </div>
           <div class="message-items-right">
               <div class="message-items-right-header"></div>
               <div v-if="!modifying" class="modifying-head">修改头像</div>
           </div>
           <div class="message-items-operation operation-label" @click="modifying = !modifying">{{modifying ?"编辑" : "收起"}}</div>
        </div>
        <!-- 昵称 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">昵称</span>
            </div>
            <div class="message-items-right">
                <span v-if="nickname">尼古拉斯·赵四</span>
                <div v-if="!nickname" class="message-items-right-edit">
                    <div>
                        <Input type="text" size="small" style="width: 160px;" />
                        <span class="message-items-right-edit-lable">用户您好，建筑部落允许用户一年修改一次昵称，请谨慎提交</span>
                    </div>
                    <div class="message-items-right-save">
                        <div class="modifying-head">保存</div>
                        <div class="modifying-cancel">取消</div>
                    </div>
                </div>
            </div>
            <div class="message-items-operation" @click="nickname = !nickname">{{nickname ?"编辑" : "收起"}}</div>
        </div>
        <!-- 个人资料 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">个人资料</span>
            </div>
            <div class="message-items-right">
                <span v-if="means">未完善完全</span>
                <div v-if="!means" class="message-items-right-edit">
                    <div class="means">
                        <div class="means-left">
                                <span class="means-left-label">真实姓名：</span>
                                <Input type="text" style="width: 160px;" size="small" />
                        </div>
                        <div class="means-right">
                                <span class="means-left-label">所在地：</span>
                                <Select size="small" style="width:160px">
                                    <Option value="New York" >New York</Option>
                                </Select>
                                <Select size="small" style="width:160px">
                                    <Option value="New York" >New York</Option>
                                </Select>
                        </div>
                    </div>
                    <div class="means">
                        <div class="means-left">
                            <span class="means-left-label">性别：</span>
                            <Input type="text" style="width: 160px;" size="small" />
                        </div>
                        <div class="means-right">
                            <span class="means-left-label">感情状况：</span>
                            <Select size="small" style="width:160px">
                                <Option value="New York" >New York</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="means">
                        <div>
                                <span class="means-left-label">生日：</span>
                                <Select size="small" style="width:160px">
                                    <Option value="New York" >New York</Option>
                                </Select>
                                <Select size="small" style="width:160px">
                                    <Option value="New York" >New York</Option>
                                </Select>
                                <Select size="small" style="width:160px">
                                    <Option value="New York" >New York</Option>
                                </Select>
                        </div>
                    </div>
                    <div class="means">
                        <div class="means-textarea">
                                <span class="means-left-label">个人简介：</span>
                                <Input  type="textarea" :rows="4" placeholder="Enter something..." />
                        </div>
                    </div>
                    <div class="message-items-right-save">
                        <div class="modifying-head">保存</div>
                        <div class="modifying-cancel">取消</div>
                    </div>
                </div>
            </div>
            <div class="message-items-operation" @click="means = !means">{{means ?"编辑" : "收起"}}</div>
        </div>
        <!-- 教育信息 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">教育信息</span>
            </div>
            <div class="message-items-right">
                <div v-if="educational">
                     <span class="message-items-right-fill">马上填写</span>
                    <span>你的教育信息，让他人更好的了解你，与更多的同学在建筑部落相遇！</span>
                </div>
                <div v-if="!educational" class="message-items-right-edit">
                    <div class="means">
                        <div class="means-left">
                            <span class="means-left-label">学校类型：</span>
                            <Select size="small" style="width:160px">
                                <Option value="New York" >New York</Option>
                            </Select>
                        </div>
                        <div class="means-right content-right">
                            <div class="means-right-option">
                                <Select size="small" style="width:160px">
                                    <Option value="New York" >New York</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">学校名称：</span>
                            <Select size="small" style="width:340px">
                                <Option value="New York" >New York</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="means">
                        <div class="means-left">
                            <span class="means-left-label">入学时间：</span>
                            <DatePicker type="date" placeholder="Select date" style="width: 160px"></DatePicker>
                        </div>
                    </div>
                    <div class="means">
                        <div class="means-left">
                            <span class="means-left-label">院系：</span>
                            <Select size="small" style="width:160px">
                                <Option value="New York" >New York</Option>
                            </Select>
                        </div>
                    </div>
                     <div class="message-items-right-save">
                        <div class="modifying-head">保存</div>
                        <div class="modifying-cancel">取消</div>
                    </div>
                </div>
            </div>
            <div class="message-items-operation" @click="educational = !educational">{{educational ?"编辑" : "收起"}}</div>
        </div>
        <!-- 个人擅长 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">个人擅长</span>
            </div>
            <div class="message-items-right">
                <span class="message-items-right-fill">马上填写</span>
                <span>自己的标签，让大家全方位了解你！</span>
            </div>
            <div class="message-items-operation">编辑</div>
        </div>
        <!-- 职业信息 -->
        <div class="message-items message-items-text">
            <div class="message-items-left">
                <span class="message-items-left-label">职业信息</span>
            </div>
            <div class="message-items-right">
                <div v-if="career">
                    <span class="message-items-right-fill">马上填写</span>
                    <span>你的职业信息，让他人更好的了解你，与更多的同事在建筑部落相遇！</span>
                </div>
                <div v-if="!career" class="message-items-right-edit">
                    <div class="means">
                        <div>
                            <span class="means-left-label">单位名称：</span>
                            <Input type="text" style="width: 340px;" size="small" />
                        </div>
                        <div class="means-right content-right">
                            <div class="means-right-option">
                                <Select size="small" style="width:160px">
                                    <Option value="New York" >New York</Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">部门/职业：</span>
                            <Input type="text" style="width: 340px;" size="small" />
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">工作时间：</span>
                            <DatePicker type="date" placeholder="Select date" style="width: 340px"></DatePicker>
                        </div>
                    </div>
                    <div class="means">
                        <div>
                            <span class="means-left-label">所在地：</span>
                            <Cascader :data="data" style="width: 340px"></Cascader>
                        </div>
                    </div>
                     <div class="message-items-right-save">
                        <div class="modifying-head">保存</div>
                        <div class="modifying-cancel">取消</div>
                    </div>
                </div>
            </div>
            <div class="message-items-operation" @click="career = !career">{{career ?"编辑" : "收起"}}</div>
        </div>
    </div>
</template>
<script>
import {getUserData} from '../../../service/clientAPI'
export default {
    data () {
        return {
            modifying: true,
            nickname: true,
            means: true,
            educational: true,
            career: true,
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
                }, 
                {
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
    },
    created () {
        this.getUserInfo()
    },
    methods: {
        async getUserInfo () {
            let msg =await getUserData();
            // console.log(msg)
        }
    },
    async asyncData({store}) {
        let msg = store.dispatch('getUserData');
        // console.log('>>1111111111111111111>>', msg)
        return {
            userInfo: msg
        }
    },
}
</script>
<style lang="less" scoped>
    .message {
        &-items {
            padding-bottom: 30px;
            border-bottom: 1px solid #EEEEEE;
            display: flex;
            justify-content: space-between;
            // align-items: center;
            font-size: 16px;
            &-left {
                width: 110px;
                text-align: left;
                display:table;
                &-label{
                    vertical-align:middle; 
                    color: #000000;
                }
            }
            &-right {
                width: 100%;
                &-header {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: #999999;
                }
                &-fill {
                    color: #FF3C00;
                    cursor: pointer;
                }
                &-edit {
                    margin-top: 30px;
                    &-lable {
                        margin-left: 15px;
                        font-size: 14px;
                        color: #999999;
                    }
                }
                &-save {
                    margin-top: 30px;
                }
            }
            &-operation{
                width: 40px;
                text-align: right;
                cursor: pointer;
            }
            &-text {
                padding-top: 30px;
            }
        }
    }
    .means {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        &-left {
            width: 320px;
            &-label {
                width: 85px;
                display: inline-block;
            }
        }
        &-right {
            flex: 1;
            &-option {
                text-align: left;
                display: inline-block;
            }
        }
        &-textarea {
            width: 98%;
        }
    }
    .left-label {
        position: absolute;
        margin-top: 40px;
    }
    .operation-label {
        position: relative;
        margin-top: 40px;
    }
    .modifying-head {
        font-size: 16px;
        color: #FFFFFF;
        padding: 4px 18px;
        background: #FF3C00;
        display: inline-block;
        border-radius: 3px;
        cursor: pointer;
        margin-top: 10px;
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
        margin-top: 10px;
    }
    .content-right {
        text-align: right;
        padding-right: 20px;
    }
    .ivu-cascader {
        display: inline-block;
    }
</style>
