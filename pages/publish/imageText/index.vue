<template>
    <div class="page" @click="isShowUpload = false">
        <div class="content">
            <label>
                <textarea placeholder="有什么新鲜事想告诉大家？"></textarea>
            </label>
            <div class="toolbar">
                <div class="toolbar-left">
                    <span class="tools add-img" @click.stop="isShowUpload = !isShowUpload">
                        <i class="icon iconfont">&#xe631;</i>
                        <span class="text">添加图片</span>
                    </span>
                    <span class="tools add-face">
                        <i class="icon iconfont">&#xe64e;</i>
                        <span class="text">添加表情</span>
                    </span>
                    <Checkbox size="large" class="tools-checkbox" v-model="isLongText">发布长文</Checkbox>
                    <span  class="hidden-text" v-show="isLongText">想更加专业的发布文章？点击这里加入部落号</span>
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
                <h3>本地上传</h3>
                <p class="sub-title">共0张，还能上传9张</p>
                <div class="upload-main">
                    <div class="img-item" v-for="item in imgList" :key="item"></div>
                    <v-upload class="upload" />
                </div>
            </div>
            <div class="upload-box-top" v-show="isShowUpload"></div>
        </div>
    </div>
</template>

<script>
    import Upload from '~/components/publish/upload'
  export default {
    data() {
      return {
        isLongText: false,  // 是否发布长文本
        isShowUpload: false,    // 是否显示上传图片
        publishMode: '公开',
        imgList: [1,2,3,4,5,6]
      }
    },

    components: {
      'v-upload': Upload
    },

    methods: {
      selectIsPublic(name) {
        this.publishMode = name;
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "~assets/css/publish/index.less";
    .page {
        padding-bottom: 250px;
    }
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
        .toolbar {
            overflow: hidden;
            padding-top: 10px;
            .toolbar-left {
                float: left;
                .hidden-text {
                    font-size: 14px;
                    color: #406599;
                }
            }
            .toolbar-right {
                float: right;
                .publish-btn {
                    width: 82px;
                    height: 30px;
                    margin-left: 8px;
                }
            }
        }
        .upload-box {
            position: absolute;
            bottom: -236px;
            left: 38px;
            width: 420px;
            height: 246px;
            padding: 15px;
            background-color: #fff;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.15);
            border-radius: 4px;
            z-index: 2;
            h3 {
                font-weight: normal;
                font-size: 14px;
                color: #000;
            }
            .sub-title {
                font-size: 14px;
                color: #999;
                margin-top: 4px;
            }

            .upload-main {
                overflow: hidden;
            }
            .img-item {
                float: left;
                width: 70px;
                height: 70px;
                margin: 10px 10px 0 0;
                border-radius: 2px;
                background-color: #ccc;
            }
            .img-item:nth-child(5) {
                margin-right: 0;
            }

            .upload {
                float: left;
                margin-top: 10px;
            }
        }
        .upload-box-top {
            position: absolute;
            bottom: -29px;
            left: 46px;
            width: 0;
            height: 0;
            border: 20px solid #fff;
            box-shadow: 0 2px 10px 0 rgba(0,0,0,0.15);
            transform: rotate(45deg);
            z-index: 1;
        }

    }
</style>
