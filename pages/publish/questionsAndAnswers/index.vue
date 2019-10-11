<template>
    <div class="page" @click="isShowUpload = false">
        <div class="content">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" class="form-box">
                <FormItem prop="title">
                    <p class="input-title">
                        <span class="red-dot"></span>
                        <span class="input-label">标题</span>
                    </p>
                    <Input
                        v-model="formValidate.title"
                        placeholder="请填写项目名称（举例：新中式景观廊架su模型）"
                        class="publish-input"
                    ></Input>
                    <span class="error-info" v-if="titleIsError">
                        <Icon type="ios-alert" size="27" color="#ff3c00"/>
                        必填项
                    </span>
                </FormItem>
                <FormItem prop="title" style="margin-bottom: 0;">
                    <p class="input-title">
                        <span class="red-dot"></span>
                        <span class="input-label">上传问题及说明</span>
                    </p>
                    <div class="editor-wrap">
                        <div class="quill-editor"
                             :content="formValidate.content"
                             @change="onEditorChange($event)"
                             v-quill:myQuillEditor="editorOption">
                        </div>
                    </div>
                </FormItem>
                <div class="toolbar">
                    <div class="toolbar-left">
                    <span class="tools add-img" @click.stop="isShowUpload = !isShowUpload">
                        <i class="icon iconfont">&#xe631;</i>
                        <span class="text">添加图片</span>
                    </span>
                    </div>
                    <div class="upload-box" v-show="isShowUpload">
                        <h3>本地上传</h3>
                        <p class="sub-title">共{{imgList.length}}张，还能上传{{3 - imgList.length}}张</p>
                        <div class="upload-main">
                           <draggable v-model="imgList" group="people" @start="drag=true" @end="drag=false" :animation="500">
                              <div class="img-item" v-for="(item, index) in imgList" :key="index" @click.stop="delImg(index)" >
                                  <img :src="item.smallImgUrl" alt="">
                              </div>
                           </draggable>
                            <v-upload
                                v-show="imgList.length <= 3"
                                class="upload"
                                :uploadType="3"
                                @uploadSuccess="uploadSuccess"
                            />
                        </div>
                    </div>
                    <div class="upload-box-top" v-show="isShowUpload"></div>
                </div>
                <div class="tags-row">
                    <p class="input-title">
                        <span class="red-dot"></span>
                        <span class="input-label">标签</span>
                    </p>
                    <div class="tags-area" @click="inputTag">
                        <span class="tag-item" v-for="(item, index) in selectLabelList" :key="item.LabelId" @click.stop="">
                            {{ item.LabelName }}
                            <i class="icon iconfont" @click="deleteLabel(index)">&#xe6f1;</i>
                        </span>
                        <input type="text" ref="input" v-model="labelInput" @keypress.enter="addLabel" @blur="addLabel" placeholder="点击空白处输入标签" >
                    </div>
                </div>
                <div class="recommend-tags">
                    <span class="recommend-title">推荐标签: </span>
                    <span v-for="(item, index) in labelList" :key="item.LabelId" :class="!ruleLabel(item) ?'tag-item' : 'tag-item no-drop'" @click="pushSelect(index, ruleLabel(item))">
                        <i class="icon iconfont">&#xe61c;</i>
                        {{ item.LabelName }}
                    </span>
                </div>
                <p class="btn-change" @click="switchLabel">换一换</p>
            </Form>
        </div>
        <div class="submit-box">
            <p>
                <Checkbox v-model="checked" class="checkbox" ></Checkbox>
                我已仔细阅读并同意<span @click="ViewProtocol">《建筑部落用户发布协议》</span>
            </p>
            <Button type="primary" @click="handleSubmit('formValidate')">完成上传</Button>
        </div>
    </div>
</template>

<script>
  import Upload from '../../../components/publish/upload'
  import draggable from 'vuedraggable'
  import { _debounce } from '../../../plugins/untils/public'
  import { getQALabel, addLabel, releaseStatement } from '../../../service/clientAPI'

  export default {
    data() {
      const validateTitle = (rule, value, callback) => {
        if (value.trim() === '') {
          this.titleIsError = true;
          callback();
        } else {
          this.titleIsError = false;
          callback();
        }
      };
      return {
        formValidate: {
          title: '',
          content: ''
        },
        ruleValidate: {
          title: [
            { validator: validateTitle, trigger: 'blur' }
          ]
        },
        titleIsError: false,  // 是否显示标题校验错误信息
        isShowUpload: false,    // 是否显示上传图片
        imgList: [],
        editorOption: {
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean']
            ]
          },
          placeholder: '详细描述你遇到的问题，可获得更好的回答！'
        },
        pageNum: 1, // 获取标签的当前页
        labelInput: '', // 输入的标签
        selectLabelList: [],    // 选中的标签列表
        labelList: [],  // 获取的标签列表
        checked: false,
      }
    },

    components: {
      'v-upload': Upload,
      draggable
    },
    methods: {
      ViewProtocol (row) {
        this.$store.dispatch('SETUP', false)
        let routeData = this.$router.resolve({ name: 'other-id', params: { id: "51088359-2291-4f1b-87b3-9d3920307d94"} });
        window.open(routeData.href, '_blank');
      },
      onEditorChange(e) {
        this.formValidate.content = e.html;
      },
      inputTag() {
        this.$refs.input.focus();
      },
      // 切换标签
      switchLabel() {
        if (this.pageNum < this.labelInfo.total) {
          this.pageNum++;
          this.getLabel();
        } else {
          this.pageNum = 0;
          this.getLabel();
        }
      },
      // 点击提交
      handleSubmit: _debounce(function (name) {
        let that = this;
        this.$refs[name].validate(() => {
          if (!this.formValidate.title.trim()) {
            this.$Message.warning('标题不能为空');
            return false;
          }
          if (this.formValidate.title.length < 4) {
            this.$Message.warning('标题不能少于4个字');
            return false;
          }
          if (!this.checked) {
            this.$Message.warning('请阅读并同意建筑部落协议');
            return false;
          }
        })
        if (this.formValidate.title.trim() && this.checked) {
          let webLabel = [];
          for (let i of this.selectLabelList) {
            const obj = {
              LabelId: i.LabelId,
              SortCode: i.SortCode
            };
            webLabel.push(obj);
          }
          releaseStatement({
            talkType: 3,
            talkTitle: this.formValidate.title,
            talkContent: this.formValidate.content,
            webLabel,
            listImg: this.imgList
          }).then(res => {
            this.$Message.success('发布成功！');
            setTimeout(() => {
              that.$router.push({name: "QuestionsAndAnswers"});
            }, 1000)
          }).catch(err => {
            console.log(err, '发布问答')
          })
        }
      }, 1000),
      // 获取标签
      async getLabel() {
        const data = await getQALabel({
          BelongTypes: '',
          page: this.pageNum
        });
        this.labelList = data.labelData;
        this.labelInfo = data.paginationData;
      },
      // 添加标签
      async addLabel() {
        if (!this.labelInput.trim()) {
          this.$Message.warning('输入内容为空，不能添加');
          return;
        }
        const data = await addLabel({ LabelName: this.labelInput, BelongTypes: '' });
        this.selectLabelList.push(data);
        this.labelInput = '';
      },

      // 从获取的列表添加到选中的列表
      pushSelect(index, label) {
        if (!label) {
          this.selectLabelList.push(this.labelList[index]);
        }
      },
      // 删除标签
      deleteLabel(index) {
        this.selectLabelList.splice(index, 1);
      },
      // 判断有没有选中标签
      ruleLabel (label) {
        let isRule = false;
        if ( !isRule && this.selectLabelList instanceof Array) {
           this.selectLabelList.forEach(element => {
            if (!isRule && element.LabelId === label.LabelId) {
              isRule = true;
            }
           });
        }
        return isRule
      },
      // 图片上传成功
      uploadSuccess(fileList) {
        for (let i of fileList) {
          this.imgList.push(i);
        }
      },
      // 点击删除图片
      delImg(index) {
        this.$delete(this.imgList, index);
      }
    },
    async asyncData() {
      const data = await getQALabel({
        BelongTypes: '',
        page: 1
      });
      return {
        labelList: data.labelData,
        labelInfo: data.paginationData
      }
    }
  }
</script>


<style lang="less" scoped>
    @import "~assets/css/publish/index.less";
    .editor-wrap {
        width: 900px;
    }
    .quill-editor {
        max-height: 600px;
        min-height: 310px;
        overflow-y: auto;
        border-radius: 0 0 4px 4px;
        border: 1px solid #d8d8d8;
    }
    .toolbar {
        position: relative;
        overflow: visible;
    }
    .toolbar:after {
        content: '';
        display: block;
        overflow: hidden;
        clear: both;
    }
    .upload-box {
        bottom: -253px;
        left: 8px;
    }
    .upload-box-top {
        bottom: -49px;
        left: 16px;
    }
    .tag-item {
        float: left;
        position: relative;
        height: 25px;
        margin: 10px 10px 10px 0;
        padding: 0 8px;
        line-height: 25px;
        background-color: #F5F6F5;
        border: 1px solid #D7D7D7;
        border-radius: 2px;
        cursor: pointer;
        i {
            position: relative;
            top: -1px;
            vertical-align: middle;
        }
    }
    .tag-item:after {
        content: '';
        display: block;
        position: absolute;
        top: 7px;
        left: -4px;
        width: 7px;
        height: 7px;
        transform: rotate(-45deg);
        background-color: #F5F6F5;
        border-top: 1px solid #D7D7D7;
        border-left: 1px solid #D7D7D7;
        border-radius: 1px;
    }
    .tags-row {
        margin-top: 30px;
        overflow: hidden;

        .input-title {
            float: left;
        }

        .tags-area {
            float: left;
            width: 838px;
            margin-left: 20px;
            padding: 0 10px;
            border: 1px solid #d8d8d8;
            overflow: hidden;

            input {
                float: left;
                border: none;
                outline: none;
                margin: 10px;
                line-height: 25px;
            }

            input::placeholder {
                color: #999;
            }
        }
    }
    .recommend-tags {
        width: 900px;
        margin-top: 10px;
        padding-left: 60px;
        overflow: hidden;

        .recommend-title {
            margin-right: 25px;
        }
        span {
            float: left;
            margin: 0 12px 10px 0;
            line-height: 25px;
        }
        .tag-item {
            i {
                line-height: 13px;
                font-size: 12px;
                color: #FF3C00;
            }
        }
    }
    .btn-change {
        width: 900px;
        text-align: right;
        font-size: 14px;
        color: #559BDC;
        cursor: pointer;
        margin-bottom: 20px;
    }
    .no-drop{
       cursor: no-drop; 
    }
</style>
