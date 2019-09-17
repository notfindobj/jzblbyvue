<template>
    <div class="page" @click="hiddenModal">
        <div class="content">
            <label>
                <textarea v-model="content" placeholder="有什么新鲜事想告诉大家？"></textarea>
            </label>
            <div class="toolbar">
                <div class="toolbar-left">
                    <span class="tools add-img" @click.stop="clickUpload">
                        <i class="icon iconfont">&#xe631;</i>
                        <span class="text">添加图片</span>
                    </span>
                    <span class="tools add-face" @click.stop="clickEmotion">
                        <i class="icon iconfont">&#xe64e;</i>
                        <span class="text">添加表情</span>
                    </span>
                    <Checkbox size="large" class="tools-checkbox" v-model="isLongText">发布长文</Checkbox>
                    <span  class="hidden-text" v-show="isLongText">想更加专业的发布文章？点击这里加入部落号</span>
                </div>
                <div class="toolbar-right">
                    <Dropdown placement="bottom" trigger="click" @on-click="selectIsPublic" >
                        <a href="javascript:void(0)">
                            {{ publishMode | interceptText }}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem v-for="(item, index) in privacyList" :name="item.Name + '|'+ item.Id" :key="index">{{item.Name}}</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button class="publish-btn" type="primary" @click="clickPublish">发布</Button>
                </div>
            </div>
            <div class="upload-box" v-show="isShowUpload">
                <h3>本地上传</h3>
                <p class="sub-title">共{{imgList.length}}张，还能上传{{30 -imgList.length}}张</p>
                <div class="upload-main">
                    <draggable v-model="imgList" group="people" @start="drag=true" @end="drag=false" :animation="500">
                       <div class="img-item" v-for="(item, index) in imgList" :key="index" >
                        <i class="icon iconfont icon-chahao2 chahao" @click.stop="delImg(index)"></i>
                        <img :src="item.smallImgUrl" alt="">
                      </div>
                    </draggable>
                    <v-upload
                        v-show="imgList.length < 30"
                        class="upload"
                        :uploadType="2"
                        @uploadSuccess="uploadSuccess"
                    />
                </div>
            </div>
            <emotion
                class="emotion"
                @emotion="handleEmotion"
                :height="200"
                v-show="isShowEmotion"
            ></emotion>
            <div class="upload-box-top" v-show="isShowUpload"></div>
            <div class="emotion-box-top" v-show="isShowEmotion"></div>
        </div>
    </div>
</template>

<script>
  import Upload from '../../../components/publish/upload'
  import Emotion from '../../../components/Emotion/index'
  import draggable from 'vuedraggable'
  import { _debounce } from '../../../plugins/untils/public'
  import {releaseStatement, GetOperatPrivacy} from '../../../service/clientAPI'
  export default {
    data() {
      return {
        isLongText: false,  // 是否发布长文本
        isShowUpload: false,    // 是否显示上传图片
        isShowEmotion: false,   // 是否显示表情选择框
        publishMode: '公开',
        content: '',
        imgList: [],
        privacyList: []
      }
    },
    components: {
      'v-upload': Upload,
      draggable,
      Emotion
    },
    mounted () {
      this.getPrivacyList();
    },
    methods: {
      async getPrivacyList () {
        let msg = await GetOperatPrivacy(3);
        if (msg) {
          this.privacyList = msg.respOperatPrivacy;
          this.publishMode = this.privacyList[0].Name + '|'+ this.privacyList[0].Id;
        }
      },
      // 点击上传图片
      clickUpload() {
        this.isShowUpload = !this.isShowUpload;
        this.isShowEmotion = false;
      },
      // 点击添加表情
      clickEmotion() {
        this.isShowEmotion = !this.isShowEmotion;
        this.isShowUpload = false;
      },

      // 发布
      clickPublish:_debounce(function () {
        if (!this.content) {
          this.$Message.warning('发布内容不能为空');
          return false;
        }
        releaseStatement({
          talkType: 1,
          talkTitle: '',
          displayPrivacyId: this.publishMode.split('|')[1],
          talkContent: this.content,
          listImg: this.imgList
        }).then(res => {
          this.$Message.success('发布成功！');
          setTimeout(() => {
            this.$router.push({ name: "BuildingCircle"})
          }, 1800)
        }).catch(err => {
          console.log(err, '发布图文')
        })
      }, 300),
      // 隐藏弹出框
      hiddenModal() {
        // this.isShowUpload = false;
        this.isShowEmotion = false;
      },

      // 选择表情
      handleEmotion (item) {
        this.content += `[${item.content}]`
      },
      // 选择是否公开
      selectIsPublic(name) {
        this.publishMode = name;
      },
      // 图片上传成功
      uploadSuccess(fileList) {
        for(let i of fileList) {
          this.imgList.push(i);
        }
      },
      // 点击删除图片
      delImg(index) {
        this.$delete(this.imgList, index);
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "~assets/css/publish/index.less";
    .content {
        position: relative;
        width: 100%;
        height: 280px;
        padding: 20px 30px 15px;
        background-color: #fff;
        box-shadow: 0 1px 3px 0 rgba(0,0,0,0.10);
        textarea {
            width: 100%;
            height: 200px;
            padding: 15px;
            font-size: 14px;
            color: #666;
            background: #F5F6F5;
            border: 1px solid #D8D8D8;
            border-radius: 4px;
            resize:none;
            outline: none;
        }
        textarea::placeholder {
            color: #999;
        }
        .upload-box {
            bottom: -235px;
        }
        .emotion {
            position: absolute;
            bottom: -190px;
            left: 120px;
            z-index: 3;
        }
    }
    .chahao {
      position: absolute;
      right: -2px;
      top: -4px;
      color: #ffffff;
      &:hover{
        color: #ff3c00;
        -webkit-transform:rotate(180deg) ;
        transform: rotate(180deg);
        transform-origin: 50% 50%;
        transition: all 0.5s ease-in-out;
      }
    }
</style>
