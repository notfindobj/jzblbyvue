<template>
    <div class="page" @click="hiddenModal">
        <div class="content">
            <label>
                <textarea v-model="content" placeholder="有什么新鲜事想告诉大家？"></textarea>
            </label>
            <div class="toolbar">
                <div class="toolbar-left">
                    <span class="tools add-video" @click.stop="isShowUpload = !isShowUpload">
                        <i class="icon iconfont">&#xe624;</i>
                        <span class="text">添加视频</span>
                    </span>
                    <span class="tools add-face" @click.stop="isShowEmotion = !isShowEmotion">
                        <i class="icon iconfont">&#xe64e;</i>
                        <span class="text">添加表情</span>
                    </span>
                </div>
                <div class="toolbar-right">
                    <Dropdown
                        placement="bottom"
                        trigger="click"
                        @on-click="selectIsPublic"
                    >
                        <a href="javascript:void(0)">
                            {{ publishMode }}
                            <Icon type="ios-arrow-down"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="公开">公开</DropdownItem>
                            <DropdownItem name="私密">私密</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <Button class="publish-btn" type="primary">发布</Button>
                </div>
            </div>
            <div class="upload-box" v-show="isShowUpload">
                <h3>上传视频</h3>
                <p class="sub-title">发布后，视频将出现在我的部落</p>
                <div class="upload-main">
                    <v-upload class="upload"/>
                    <p class="upload-tip">仅支持MP4视频格式，大小不超过50M，请勿上传反动色情等违法视频。</p>
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
  import Upload from '~/components/publish/uploadVideo'
  import Emotion from '@/components/Emotion/index'

  export default {
    data() {
      return {
        isShowUpload: false,    // 是否显示上传视频
        isShowEmotion: false,   // 是否显示表情选择框
        publishMode: '公开',
        content: ''
      }
    },

    components: {
      'v-upload': Upload,
      Emotion
    },

    methods: {

      // 隐藏弹出框
      hiddenModal() {
        this.isShowUpload = false;
        this.isShowEmotion = false;
      },

      // 选择表情
      handleEmotion (item) {
        this.content += `[${item.content}]`
      },

      selectIsPublic(name) {
        this.publishMode = name;
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
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10);

        textarea {
            width: 100%;
            height: 200px;
            padding: 15px;
            font-size: 14px;
            color: #666;
            background: #F5F6F5;
            border: 1px solid #D8D8D8;
            border-radius: 4px;
            resize: none;
            outline: none;
        }

        textarea::placeholder {
            color: #999;
        }
        .upload-box {
            width: 375px;
            height: 160px;
            .upload-tip {
                width: 204px;
            }
        }

        .emotion {
            position: absolute;
            bottom: -190px;
            left: 120px;
            z-index: 3;
        }
    }
</style>
