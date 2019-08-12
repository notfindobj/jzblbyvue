<template>
    <div class="comments-box" :style="`width:${width}`">
        <!-- 发表评论 -->
        <div class="comments-status-box">
            <div class="comments-box-status">
                <div class="comments-box-status-left">
                    <span>发布状态</span>
                    <span>发布日期：{{publish.CreateDate | datefmt('YYYY-MM-DD')}}</span>
                </div>
                <div class="comments-box-status-right">
                    <i class="icon iconfont icon-chakan"></i>{{publish.Views}}
                </div>
            </div>
            <ul class="comments-status-info">
                <li>
                    <span :class="publish.islikes? 'operationColor': ''" @click="thumbsUp(publish)">
                        <i class="icon iconfont icon-dianzan1"></i>
                        <span>{{publish.likes}}</span>
                    </span>
                </li>
                <li>
                    <!-- 转发 -->
                    <span @click="Forward(publish)">
                        <i class="icon iconfont icon-share"></i>
                        <span>{{commentsInfo.downNum}}</span>
                    </span>
                </li>
                <li>
                    <span :class="publish.iscollections? 'operationColor': ''" @click="Collection(publish)">
                        <i class="icon iconfont icon-favorite"></i>
                        <span>{{publish.collections}}</span>
                    </span>
                </li>
                <li>
                    <span @click="isComment = !isComment">
                        <i class="icon iconfont icon-pinglun"></i>
                        <span>{{publish.commentss}}</span>
                    </span>
                </li>
            </ul>
            <div class="comment-box">
                <comment
                    v-if="isComment"
                    v-model="commentV"
                    @commentValue="commentValue"
                />
            </div>
        </div>
        <!-- 评论信息 -->
        <discuss
            class="comment-scroll"
            :style="{height: contentHeight}"
            :discussData="comments"
            @commentValue="discussValue"
            @somePraise="somePraise"
        />
    </div>
</template>

<script>
  import comment from '../comment'
  import discuss from './discuss'

  export default {
    name: 'commentsCon',
    props: {
      publish: {
        type: Object,
        required: true,
        default: function () {
          return {}
        }
      },
      comments: {
        type: Array,
        default: function () {
          return []
        }
      },
      width: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        isComment: true,
        commentsInfo: {
          downNum: '',
        },
        commentV: '',
        contentHeight: ''
      }
    },
    components: {
      comment,
      discuss
    },
    methods: {
      // 项目点赞
      thumbsUp(item) {
        this.$emit('thumbsUp', item)
      },
      // 转发
      Forward(item) {
        this.$emit('Forward', item)
      },
      // 收藏
      Collection(item) {
        this.$emit('Collection', item)
      },
      // 评论
      commentValue() {
        this.$emit('commentValue', this.publish, this.commentV)
      },
      discussValue(row, val) {
        this.$emit('discussValue', row, val)
      },
      // 评论点赞
      somePraise(item) {
        this.$emit('somePraise', item)
      },
      emotion(res) {
        let word = res.replace(/\[|\]/gi, '');
        const list = JSON.parse(localStorage.getItem('Emotions'));
        let wordShow = true
        let wordContent = ''
        let wordContentHtml = ''
        list.forEach(ele => {
          if (wordShow) {
            if (ele.content === word) {
              wordContent = ele.title
              wordContentHtml = `<img style="width: 25px;" src=" http://www.pic.jzbl.com/ItemFiles/Emoticon/QQ/${wordContent}_QQ.gif">`
              wordShow = false
            }
          }
        })
        return wordContentHtml
      },
      goTodetails(inx) {
        alert(inx)
      },
      upload() {
        alert(1)
      }
    },
    mounted() {
      this.contentHeight = document.documentElement.clientHeight - 460 + 'px';
    }
  }
</script>
<style lang="less" scoped>
    .comment-box {
        padding: 10px 10px;
    }
    .comment-scroll {
        overflow-x: hidden;
        overflow-y: auto;
    }
    .comments-box {
        width: 100%;
        /*height: 100%;*/

        .comments-status-box {
            background: #ffffff;
            margin-bottom: 10px;

            .comments-box-status {
                height: 50px;
                padding: 0 10px;
                border-bottom: 1px solid #F2F2F2;
                box-sizing: border-box;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;

                .comments-box-status-left {
                    > span {
                        &:nth-child(1) {
                            font-size: 14px;
                            color: #333333;
                            margin-right: 10px;
                        }

                        &:nth-child(2) {
                            font-size: 12px;
                            color: #999999;
                        }
                    }
                }

                .comments-box-status-right {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    font-size: 12px;
                    color: #666666;

                    > i {
                        font-size: 12px;
                        margin-right: 5px;
                    }
                }
            }

            .comments-status-info {
                height: 30px;
                border-bottom: 1px solid #F2F2F2;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                > li {
                    flex: 1;
                    text-align: center;
                    line-height: 30px;
                    font-size: 10px;
                    color: #333333;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    position: relative;

                    &:before {
                        width: 1px;
                        height: 15px;
                        content: '';
                        background: #D8D8D8;
                        border-radius: 1px;
                        position: absolute;
                        right: 0;
                        top: 7px;
                    }

                    &:last-child {
                        &:before {
                            width: 0px;
                            height: 15px;
                            content: '';
                            background: #D8D8D8;
                            border-radius: 1px;
                            position: absolute;
                            right: 0;
                            top: 7px;
                        }
                    }

                    > span {
                        cursor: pointer;
                        margin-right: 5px;

                        > span {
                            font-size: 12px;
                        }

                        &:hover {
                            color: #FF3C00;
                        }
                    }
                }
            }

            .comments-input {
                height: 149px;
                padding: 10px;

                .comments-input-box {
                    width: 100%;
                    height: 129px;
                    padding: 10px;
                    background: #F6F6F8;
                    border-radius: 4px;
                    position: relative;

                    &:after {
                        content: "";
                        position: absolute;
                        top: -10px;
                        right: 30px;
                        width: 0;
                        height: 0;
                        border-style: solid;
                        border-width: 0px 10px 10px 10px;
                        border-color: transparent transparent #F6F6F8 transparent;
                    }

                    > textarea {
                        width: 100%;
                        height: 82px;
                        background: #F6F6F8;
                        text-indent: 10px;
                        box-sizing: border-box;
                        border: 1px solid #FF3C00;
                        border-radius: 4px;
                        font-size: 10px;
                        color: #999999;
                        resize: none;
                        margin-bottom: 4px;
                    }

                    .comments-img {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;

                        .comments-img-left {
                            > i {
                                font-size: 14px;
                                cursor: pointer;

                                &:nth-child(1) {
                                    color: #FF3C00;
                                    margin-right: 6px;
                                }

                                &:nth-child(2) {
                                    color: #28B95A;
                                }
                            }
                        }

                        .comments-img-right {
                            width: 70px;
                            height: 20px;
                            text-align: center;
                            line-height: 20px;
                            background: #FF3C00;
                            border-radius: 4px;
                            font-size: 12px;
                            color: #FFFFFF;
                        }
                    }
                }
            }
        }

        .comments-list-box {
            // overflow-y: auto;
            background: #ffffff;

            > li {
                padding: 20px 10px;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: center;

                .commentser-img {
                    width: 40px;
                    margin-right: 4px;

                    > img {
                        display: block;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                    }
                }

                .commentser-con {
                    flex: 1;
                    height: auto;

                    .commentser-name {
                        font-size: 12px;
                        color: #333333;
                        margin-bottom: 4px;
                    }

                    .commentser-date {
                        font-size: 12px;
                        color: #999999;
                        margin-bottom: 10px;
                    }

                    .commentser-info {
                        font-size: 12px;
                        color: #000000;
                    }

                    .commentser-btn {
                        height: 35px;

                        > ul {
                            width: 120px;
                            height: 35px;
                            float: right;
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;

                            > li {
                                flex: 1;
                                font-size: 10px;
                                color: #333333;
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                justify-content: center;
                                cursor: pointer;

                                &:nth-child(1) {
                                    position: relative;

                                    &:before {
                                        width: 1px;
                                        height: 10px;
                                        content: '';
                                        background: #D8D8D8;
                                        border-radius: 1px;
                                        position: absolute;
                                        right: 0;
                                        top: 5px;
                                    }
                                }

                                > i {
                                    font-size: 14px;
                                    margin-right: 5px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .reviewers-list-box {
            width: 100%;
            background: #F6F6F8;
            border-radius: 4px;

            .reviewers-list-all {
                width: 274px;
                padding: 20px 10px;

                > ol {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    > li {
                        width: 100%;
                        border-bottom: 1px solid #D9D9D9;

                        > p {
                            &:nth-child(1) {
                                margin-bottom: 4px;
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                justify-content: space-between;

                                .reply-name {
                                    font-size: 12px;
                                    color: #3E85FF;
                                }

                                .reply-date {
                                    font-size: 12px;
                                    color: #999999;
                                }
                            }

                            &:nth-child(2) {
                                margin-bottom: 10px;
                                font-size: 12px;
                                color: #333333;

                                .reply-someining {
                                    color: #3E85FF;
                                }
                            }
                        }

                        .commentser-btns {
                            height: 14px;
                            margin-bottom: 11px;

                            > ul {
                                width: 60px;
                                height: 14px;
                                float: right;
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                justify-content: center;

                                > li {
                                    flex: 1;
                                    font-size: 10px;
                                    color: #333333;
                                    display: flex;
                                    flex-direction: row;
                                    align-items: center;
                                    justify-content: center;
                                    cursor: pointer;

                                    &:nth-child(1) {
                                        position: relative;

                                        &:before {
                                            width: 1px;
                                            height: 10px;
                                            content: '';
                                            background: #D8D8D8;
                                            border-radius: 1px;
                                            position: absolute;
                                            right: 0;
                                            top: 3px;
                                        }
                                    }

                                    > i {
                                        font-size: 14px;
                                        margin-right: 5px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .operationColor {
        color: #FF3C00;
    }
</style>
