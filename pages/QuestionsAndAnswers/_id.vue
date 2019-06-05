<template>
    <div class="container">
        <div class="main-left">
            <h3 class="detail-title">{{ detailInfo.TalkTitle }}</h3>
            <p class="detail-text">{{ detailInfo.TalkContent }}</p>
            <div class="img-row">
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
            </div>
            <div class="editor-wrap">
                <div class="quill-editor"
                     :content="content"
                     @change="onEditorChange($event)"
                     v-quill:myQuillEditor="editorOption">
                </div>
            </div>
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

                </div>
                <div class="toolbar-right">
                    <Button class="publish-btn" type="primary">发表</Button>
                </div>
            </div>
            <div class="answer-list">
                <div class="answer-item" v-for="i in 3" :key="i">
                    <div class="item-top">
                        <div class="top-left">
                            <div class="avatar"></div>
                            <span class="user-name">东北好建</span>
                        </div>
                        <span class="top-right">24分钟前</span>
                    </div>
                    <div class="item-middle">
                        许可乐乒乒乓乓乒乒乓乓乒乒乓乓。零零落落零零落落零零落落零零落落了,零零落落零零落落零零落落零零落落零零落落零零落落零零落落了零零落落零零落落零零落落。
                    </div>
                    <div class="item-bottom">
                        <i class="icon iconfont">&#xe664;</i>
                        <span>回复</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-right">
            <div class="right-top">
                <div class="author-avatar"></div>
                <span class="author-name">梅赛德斯·赵四</span>
                <Button type="primary" class="attention-btn">
                    <Icon class="icon-add" type="ios-add" size="24" />关注
                </Button>
                <Button type="primary" class="big-btn" size="large" ghost>
                    <i class="icon iconfont">&#xe60a;</i>
                    我要提问
                </Button>
            </div>

            <div class="block-btn">
                <Button type="primary" class="big-btn" size="large">
                    <i class="icon iconfont">&#xe60a;</i>
                    我要提问
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    layout: 'main',
    data() {
      return {
        content: '',
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
          placeholder: '写回答...'
        }
      }
    },

    async asyncData({store, params}) {
      const data = await store.dispatch('getQADetail', params.id);

      return {
        detailInfo: data
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "~assets/css/publish/index.less";

    .container {
        width: 1200px;
        margin: 0 auto;
        padding-top: 30px;
        padding-bottom: 60px;
        overflow: hidden;

        .main-left {
            float: left;
            width: 840px;
            padding: 20px 20px 68px;
            background-color: #fff;
            box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);

            .detail-title {
                font-size: 24px;
                color: #333;
                font-weight: normal;
            }

            .detail-text {
                margin-top: 15px;
                font-size: 14px;
                color: #666;
            }

            .img-row {
                margin-top: 20px;

                .img {
                    display: inline-block;
                    margin-right: 10px;
                    width: 220px;
                    height: 150px;
                    background-color: #ccc;
                }
            }

            .editor-wrap {
                width: 800px;
                margin-top: 20px;
            }

            .quill-editor {
                height: 136px;
            }

            .ql-toolbar.ql-snow {
                background-color: #f5f6f5;
            }

            .answer-list {
                margin-top: 20px;

                .answer-item {
                    padding: 20px 0 15px;
                    border-top: 1px solid #d8d8d8;
                    .item-top {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        .top-left {
                            display: flex;
                            align-items: center;
                        }
                        .avatar {
                            width: 24px;
                            height: 24px;
                            background-color: #ccc;
                            margin-right: 4px;
                        }
                        .user-name {
                            font-size: 14px;
                            color: #F16402;
                        }

                        .top-right {
                            font-size: 12px;
                            color: #999;
                        }
                    }

                    .item-middle {
                        margin-top: 4px;
                        padding-left: 28px;
                        font-size: 14px;
                        color: #333;
                    }

                    .item-bottom {
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;
                        span {
                            margin-left: 4px;
                            font-size: 12px;
                            color: #666;
                        }
                    }
                }

                .answer-item:last-child {
                    border-bottom: 1px solid #d8d8d8;
                }
            }
        }

        .main-right {
            float: right;
            width: 340px;

            .right-top {
                width: 100%;
                height: 233px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                background-color: #fff;
                .author-avatar {
                    width: 74px;
                    height: 74px;
                    margin-top: 20px;
                    border-radius: 50%;
                    background-color: #ccc;
                }
                .author-name {
                    font-size: 14px;
                    color: #333;
                    line-height: 32px;
                }
                .attention-btn {
                    padding: 0 18px;
                    font-size: 14px;
                    .icon-add {
                        margin-right: -3px;
                        margin-top: -2px;
                    }
                }
            }

            .big-btn {
                width: 280px;
                height: 40px;
                margin-top: 20px;
            }

            .block-btn {
                margin-top: 56px;
                text-align: center;
            }

        }
    }
</style>
