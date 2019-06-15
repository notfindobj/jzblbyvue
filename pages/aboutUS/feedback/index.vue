<template>
  <div class="content-box">
    <h4 class="about-title">意见反馈</h4>
    <p class="feedback-item">欢迎反馈问题，您的意见与建议就是我们的动力！</p>
    <p class="feedback-item">我们会认真查阅您反馈的每一个问题，并尽快给您答复，在这里您可以提出遇到的问题，也可以发表自己的建议和想法。</p>
    <h5 class="feeedback-title"><span>*</span>标题</h5>
    <div class="input-box">
      <!--<input type="text" class="feeedback-title-input">-->
      <i-input :value.sync="value" placeholder="请输入..." style="width: 100%;background: #F8F8F8;"></i-input>
    </div>
    <h5 class="feeedback-title">请选择</h5>
    <div class="feeedback-select">
      <i-select :model.sync="model1" style="width:200px">
        <i-option v-for="(item,index) in cityList" :value="item.value" :key="index">{{ item.label }}</i-option>
      </i-select>
    </div>
    <div class="feeedback-con">
      <p class="feedback-con-title">请详细描述您遇到的问题，有助于我们快速分析并定位原因，帮您解決问题，比如:</p>
      <ul class="feedback-list">
        <li>1、具体描述遇到了什么问题?</li>
        <li>2、问题出现前您做过什么操作?</li>
        <li>3、请给出页面网址或截图，以便核对。</li>
      </ul>
    </div>
    <p class="feedback-item-change" >如果您希望得到反馈，请留下您的联系方式：（这些信息不会公开）</p>
    <div class="feedback-model-list">
      <div>
        <p>名字</p>
        <i-input placeholder="请输入..." style="width: 100%;background: #F8F8F8;"></i-input>
      </div>
      <div>
        <p>QQ号码</p>
        <i-input placeholder="请输入..." style="width: 100%;background: #F8F8F8;"></i-input>
      </div>
      <div>
        <p>邮箱地址</p>
        <i-input placeholder="请输入..." style="width: 100%;background: #F8F8F8;"></i-input>
      </div>
    </div>
    <Button type="primary" class="desabled-btn">提交</Button>
  </div>
</template>

<script>
  export default {
    name: 'feedback',
    components: {
    },
    data () {
      return {
        cityList: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'shenzhen',
            label: '深圳市'
          },
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'chongqing',
            label: '重庆市'
          }
        ],
        model1: ''
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  .content-box{
    flex: 1;
    height: auto;
    padding: 20px;
    margin-bottom: 30px;
    background: #ffffff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);
    .about-title{
      font-size: 18px;
      color: #333333;
      padding-bottom: 20px;
      border-bottom: 1px solid #EEEEEE;
    }
    .feedback-item{
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      text-align: left;
      line-height: 40px;
    }
    .feeedback-title{
      font-size: 14px;
      color: #151515;
      line-height: 20px;
      >span{
        color: #FF3C00;
      }
    }
    .input-box{
      width: 440px;
      height: 34px;
      margin-top: 6px;
      margin-bottom: 24px;
    }
    .feeedback-title-input{
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background: #F8F8F8;
      border: 1px solid #DDDDDD;
      border-radius: 3px;
    }
    .feeedback-select{
      margin-top: 6px;
      margin-bottom: 24px;
    }
    .feeedback-con{
      width: 700px;
      height: 230px;
      padding: 15px;
      background: #F8F8F8;
      border: 1px solid #DDDDDD;
      border-radius: 3px;
      margin-bottom: 25px;
      .feedback-con-title{
        font-size: 14px;
        color: #666666;
        letter-spacing: 0;
        text-align: left;
        line-height: 25px;
      }
      .feedback-list{
        width: 100%;
        height: 100%;
        >li{
          font-size: 14px;
          color: #666666;
          letter-spacing: 0;
          text-align: left;
          line-height: 25px;
        }
      }
    }

    .feedback-item-change{
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      text-align: left;
      line-height: 25px;
      margin-bottom: 30px;
    }
    .feedback-model-list{
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 30px;
      >div{
        flex: 1;
        margin-right: 20px;
        >p{
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
          text-align: left;
          line-height: 25px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
