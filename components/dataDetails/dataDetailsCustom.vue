<template>
  <div class="mask">
    <div class="mask-cons">
      <div class="need-custom">
        <div class="need-custom-title">
          <span>提供同款服务</span>
          <span>您选择后我们将尽快联系您！</span>
        </div>
        <div class="need-type">
          <span>类型：</span>
          <ul>
            <li v-for="(items, index) in itemCustomizes" :key="index" :class="customizesContentIndex  === index? 'li-active' : ''" @click="changeCustom(items, index)">{{items.customizedTypeName}}</li>
          </ul>
        </div>
        <div class="need-con">
          <span>定制说明</span>
        </div>
        <p class="need-coc-box">{{customizesContent.customizedDescription}}</p>
        <p class="need-price">报价金额：{{customizesContent.customizedMoney}}元/套</p>
      </div>
      <div class="submit-custom">
          <div class="submit-custom-title">
            <span>购买同款服务</span>
            <span>您选择后我们将尽快联系您！</span>
            <i class="icon iconfont icon-chahao3 icon-position" @click="closeMask()"></i>
          </div>
          <p class="submit-type">类型：<span>{{customizesContent.customizedTypeName}}</span></p>
          <Form :model="customized" :rules="rules" :label-width="70" ref="customize">
            <FormItem label="描述" prop="customizedDescription">
              <Input type="textarea" v-model="customized.customizedDescription" placeholder="请填写定制需求..."></Input>
            </FormItem>
            <FormItem label="预算金额" prop="customizedMoney">
              <div style="display: flex;" >
                <Input v-model="customized.customizedMoney" placeholder="请填写" style="width:80px;"></Input> 
                <span class="star">元</span>
              </div>
            </FormItem>
            <FormItem label="手机号码" prop="customizedMobile">
              <Input v-model="customized.customizedMobile" placeholder="请填写手机号码" style="width:200px;"></Input>
            </FormItem>
          </Form>
        <div class="window-btn">
          <div @click="closeMask()">取消</div>
          <div @click="customMove('customize')">确定</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {getCustomizeDataByItemId, setReplyCustomize} from '../../service/clientAPI'
import {validatePassCheck, validateNum} from '../../plugins/untils/Verify'
  export default {
    name: 'detaDetailsCustom',
    props: {
      itemId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        currentNeedIndex:-1,
        itemCustomizes: {},
        customizesContent: {},
        customizesContentIndex: 0,
        customized: {
          itemId: "",
          customizedTypeId: "",
          customizedMoney: 0,
          customizedMobile: "",
          customizedDescription: ""
        },
        rules: {
          customizedMobile: [
            {required: true, validator: validatePassCheck, trigger: 'blur' }
          ],
          customizedDescription:[
            {required: true, message: '描述不能为空', trigger: 'blur'}
          ],
          customizedMoney: [
            {required: true, validator: validateNum, trigger: 'blur' }
          ]
        }
      }
    },
    created() {
    },
    mounted () {
      this.getCustomize()
    },
    methods: {
      changeCustom (row, index) {
        this.customizesContentIndex = index;
        this.customizesContent = JSON.parse(JSON.stringify(row));
      },
      choseNeedType (inx) {
        this.currentNeedIndex = inx
      },
      // 获取定制数据
      async getCustomize() {
        let msg = await getCustomizeDataByItemId(this.itemId);
        if (msg) {
          this.itemCustomizes = msg.itemCustomizes;
          this.customizesContent = JSON.parse(JSON.stringify(msg.itemCustomizes[0]))
        }
      },
      // 定制回复
      async customMove (name) {
        this.$refs[name].validate(async (valid) => {
                if (valid) {
                    this.customized.itemId = this.itemId;
                    this.customized.customizedTypeId = this.customizesContent.customizedTypeId;
                    let fM = Number(this.customizesContent.customizedMoney) * 0.7;
                    let lM = Number(this.customizesContent.customizedMoney) * 1.3;
                    if (this.customized.customizedMoney > fM && this.customized.customizedMoney < lM) {
                      let msg = await setReplyCustomize(this.customized)
                      if (msg) {
                        this.$Message.success('提交成功！');
                        setTimeout(() => {
                          this.closeMask()
                        }, 300)
                      }
                    } else {
                      this.$Message.warning('预算金额必须在报价金额30%左右！');
                    }
                }
            })
      },
      closeMask () {
        this.$emit('dataDetailsMaskClose',{type:'Custom'})
      }
    }
  }
</script>
<style lang="less" scoped>
  .star {
    margin: 0 15px;
    color: #FF3C00;
    &-left {
      margin-left: 15px;
    }
  }
  .mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.4);
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 999;
    .mask-cons{
      width: 1100px;
      height: 435px;
      padding: 25px 30px 30px 30px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content:center;
      background: #FFFFFF;
      border-radius: 4px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .need-custom{
        flex: 1;
        height: 100%;
        padding-right: 60px;
        position: relative;
        &:before{
          width: 1px;
          height: 367px;
          content: '';
          background: #D8D8D8;
          border-radius: 1px;
          position: absolute;
          right: 0;
          top:0px;
        }
        .need-custom-title{
          height: 40px;
          padding-top: 5px;
          line-height: 35px;
          margin-bottom: 34px;
          border-bottom: 1px solid #D9D9D9;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: flex-start;
          position: relative;
          >span{
            &:nth-child(1){
              font-size: 22px;
              color: #333333;
              margin-right: 10px;
            }
            &:nth-child(2){
              font-size: 12px;
              color: #999999;
              line-height: 30px;
            }
          }
        }
        .need-type{
          height: 26px;
          line-height: 26px;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          margin-bottom: 34px;
          cursor: pointer;
          >span{
            font-size: 14px;
            color: #333333;
          }
          >ul{
            flex: 1;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            >li{
              font-size: 14px;
              padding:0px 8px;
              color: #666666;
              position: relative;
              &:before{
                width: 1px;
                height: 15px;
                content: '';
                background: #D8D8D8;
                border-radius: 1px;
                position: absolute;
                right: 0;
                top:6px;
              }
              &:last-child{
                &:before{
                  width: 0px;
                  height: 15px;
                  content: '';
                  background: #D8D8D8;
                  border-radius: 1px;
                  position: absolute;
                  right: 0;
                  top:6px;
                }
              }
            }
            .li-active{
              color: #FF3C00;
              &:after{
                width: 30px;
                height: 1px;
                content: '';
                background: #FF3C00;
                border-radius: 1px;
                position: absolute;
                left: 50%;
                top:26px;
                transform: translateX(-50%);
              }
            }
          }
        }
        .need-con{
          height: 20px;
          padding-bottom: 7px;
          border-bottom: 1px solid #D9D9D9;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: flex-start;
          margin-bottom: 8px;
          >span{
            font-size: 14px;
            color: #333333;
            margin-right: 10px;
          }
        }
        .need-coc-box{
          font-size: 12px;
          color: #999999;
          margin-bottom: 34px;
        }
        .need-price{
          line-height: 20px;
          font-size: 14px;
          color: #333333;
          margin-bottom: 16px;
        }
      }
      .submit-custom{
        flex: 1;
        height: 100%;
        padding-left: 60px;
        .submit-custom-title{
          height: 40px;
          padding-top: 5px;
          line-height: 35px;
          margin-bottom: 34px;
          border-bottom: 1px solid #D9D9D9;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: flex-start;
          position: relative;
          >span{
            &:nth-child(1){
              font-size: 22px;
              color: #333333;
              margin-right: 10px;
            }
            &:nth-child(2){
              font-size: 12px;
              color: #999999;
              line-height: 30px;
            }
          }
          .icon-position{
            cursor: pointer;
            display: block;
            width: 16px;
            height: 16px;
            position: absolute;
            right: 0px;
            top: -5px;
            color: #999999;
          }
        }
        .submit-type{
          font-size: 14px;
          color: #333333;
          margin-bottom: 34px;
          >span{
            font-size: 14px;
            color: #FF3C00;
            margin-left: 10px;
          }
        }
        .submit-describe{
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          margin-bottom: 10px;
          >span{
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            font-size: 14px;
            color: #333333;
            >i{
              font-size: 14px;
              color: #FF3C00;
              margin-right: 2px;
            }
          }
          >textarea{
            flex: 1;
            height: 72px;
            resize: none;
            border: 1px solid #D9D9D9;
            border-radius: 4px;
            margin-left: 10px;
          }
        }
        .submit-budget{
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          >span{
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            font-size: 14px;
            color: #333333;
            >i{
              font-size: 14px;
              color: #FF3C00;
              margin-right: 4px;
            }
          }
          .submit-budget-con{
            flex: 1;
            margin-left: 10px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            margin-bottom: 10px;
            >i{
              font-size: 14px;
              color: #FF3C00;
              margin-right: 4px;
            }
            >input{
              width: 109px;
              height: 25px;
              margin-right: 10px;
              border: 1px solid #D9D9D9;
              border-radius: 4px;
            }
            >span{
              font-size: 14px;
              color: #FF3C00;
              margin-left: 6px;
            }
          }
        }
        .submit-phone{
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          >span{
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            font-size: 14px;
            color: #333333;
            >i{
              font-size: 14px;
              color: #FF3C00;
              margin-right: 4px;
            }
          }
          .submit-phone-con{
            flex: 1;
            margin-left: 10px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            margin-bottom: 10px;
            >input{
              width: 109px;
              height: 25px;
              margin-right: 20px;
              border: 1px solid #D9D9D9;
              border-radius: 4px;
            }
            >div{
              width: 82px;
              height: 25px;
              text-align: center;
              line-height: 25px;
              background: #FF3C00;
              border-radius: 4px;
              font-size: 12px;
              color: #FFFFFF;
            }
          }
        }
        .submit-validation{
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: center;
          margin-bottom: 34px;
          >span{
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: center;
            font-size: 14px;
            color: #333333;
            >i{
              font-size: 14px;
              color: #FF3C00;
              margin-right: 4px;
            }
          }
          .submit-validation-con{
            flex: 1;
            margin-left: 28px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            margin-bottom: 10px;
            >input{
              width: 109px;
              height: 25px;
              margin-right: 20px;
              border: 1px solid #D9D9D9;
              border-radius: 4px;
            }
          }
        }
        .window-btn{
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          justify-content: flex-end;
          >div{
            cursor: pointer;
            text-align: center;
            width: 78px;
            height: 32px;
            font-size: 14px;
            border-radius: 4px;
            margin-right: 30px;
            line-height: 32px;
            &:nth-child(1){
              color: #666666;
              border: 1px solid #D9D9D9;
            }
            &:nth-child(2){
              color: #ffffff;
              background: #3E85FF;
            }
          }
        }
      }
    }
  }
</style>
