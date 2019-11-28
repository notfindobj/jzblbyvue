<template>
  <div class="content-box">
    <Form :model="feedb" ref="feedb" label-position="left" :rules="ruleFeedb" :label-width="80">
      <h4 class="about-title">意见反馈</h4>
      <p class="feedback-item">欢迎反馈问题，您的意见与建议就是我们的动力！</p>
      <p class="feedback-item">我们会认真查阅您反馈的每一个问题，并尽快给您答复，在这里您可以提出遇到的问题，也可以发表自己的建议和想法。</p>
      <FormItem label="标题" prop="Title">
        <Input v-model="feedb.Title" placeholder="请输入标题" style="width: 200px;background: #F8F8F8;"></Input>
      </FormItem>
      <FormItem label="反馈类型" prop="Type">
        <Select v-model="feedb.Type" placeholder="反馈类型" style="width: 200px;background: #F8F8F8;">
                <Option v-for="(item,index) in cityList" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
      </FormItem>
      <FormItem label="反馈内容" prop="Contents">
          <Input v-model="feedb.Contents" type="textarea" :rows="4" style="width: 400px;background: #F8F8F8;" placeholder="请详细描述您遇到的问题，有助于我们快速分析并定位原因，帮您解決问题。" />
      </FormItem>
      <p class="feedback-item-change">如果您希望得到反馈，请留下您的联系方式：（这些信息不会公开）</p>
      <div class="feedback-model-list">
        <FormItem label="名字" >
            <Input v-model="feedb.FullName" style="width: 200px;background: #F8F8F8;" placeholder="请输入名字" />
        </FormItem>
        <FormItem label="QQ号码" >
            <Input v-model="feedb.QQ" style="width: 200px;background: #F8F8F8;" placeholder="请输入QQ号码" />
        </FormItem>
        <FormItem label="邮箱地址" >
            <Input v-model="feedb.Email" style="width: 200px;background: #F8F8F8;" placeholder="请输入邮箱地址" />
        </FormItem>
      </div>
      <FormItem>
          <Button type="primary" class="desabled-btn" @click="addFeedback('feedb')">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
import {addFeedbackData} from '../../../service/clientAPI'
export default {
  name: "feedback",
  layout: "main",
  data() {
    return {
      feedb: {
        Title: '',
        Type: '',
        Phone: '',
        FullName: '',
        QQ: '',
        Email: '',
        Contents: ''
      },
      ruleFeedb: {
        Title: [
          { required: true, message: '选项不能为空', trigger: 'blur' }
        ],
        Type: [
          { required: true, message: '反馈内容类型不能为空', trigger: 'blur' }
        ],
        Contents: [
          { required: true, message: '反馈内容不能为空', trigger: 'blur' }
        ]
        
      },
      cityList: [
        {
          value: "0",
          label: "网站bug"
        },
        {
          value: "1",
          label: "意见"
        },
        {
          value: "2",
          label: "建议"
        }
      ],
      model1: ""
    };
  },
  methods: {
    addFeedback (name) {
      this.$refs[name].validate(async (valid) => {
          if (valid) {
            let msg = await addFeedbackData(this.feedb)
            if (msg) {
              this.feedb = {
                Title: '',
                Type: '',
                Phone: '',
                FullName: '',
                QQ: '',
                Email: '',
                Contents: ''
              },
              this.$Notice.success({
                  title: '反馈',
                  desc: '您的反馈我们已经收到，待核实通过后，1-2个工作日内给予您回复！'
              });
            }
          }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.content-box {
  flex: 1;
  width: 1200px;
  margin: 0 auto;
  height: auto;
  padding: 20px;
  margin-bottom: 30px;
  background: #ffffff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
  .about-title {
    font-size: 18px;
    color: #333333;
    padding-bottom: 20px;
    border-bottom: 1px solid #eeeeee;
  }
  .feedback-item {
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    text-align: left;
    line-height: 40px;
  }
  .feeedback-title {
    font-size: 14px;
    color: #151515;
    line-height: 20px;
    > span {
      color: #ff3c00;
    }
  }
  .input-box {
    width: 440px;
    height: 34px;
    margin-top: 6px;
    margin-bottom: 24px;
  }
  .feeedback-title-input {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background: #f8f8f8;
    border: 1px solid #dddddd;
    border-radius: 3px;
  }
  .feeedback-select {
    margin-top: 6px;
    margin-bottom: 24px;
  }
  .feeedback-con {
    width: 700px;
    height: 230px;
    padding: 15px;
    background: #f8f8f8;
    border: 1px solid #dddddd;
    border-radius: 3px;
    margin-bottom: 25px;
    .feedback-con-title {
      font-size: 14px;
      color: #666666;
      letter-spacing: 0;
      text-align: left;
      line-height: 25px;
    }
    .feedback-list {
      width: 100%;
      height: 100%;
      > li {
        font-size: 14px;
        color: #666666;
        letter-spacing: 0;
        text-align: left;
        line-height: 25px;
      }
    }
  }

  .feedback-item-change {
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    text-align: left;
    line-height: 25px;
    margin-bottom: 30px;
  }
  .feedback-model-list {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 30px;
    > div {
      flex: 1;
      margin-right: 20px;
      > p {
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
