<template>
    <div class="container">
        <div class="main-left">
            <Input search enter-button placeholder="请输入要搜索内容"/>
            <div class="select-block">
                <p class="select-title">示范区</p>
                <div class="select-list">
                    <Button shape="circle" size="small">属性1</Button>
                    <Button shape="circle" size="small">属性模型</Button>
                    <Button shape="circle" size="small">属性1</Button>
                    <Button shape="circle" size="small">属性模型</Button>
                    <Button shape="circle" size="small">属性模型</Button>
                    <Button shape="circle" size="small">属性模型</Button>
                </div>
            </div>
            <div class="select-block">
                <p class="select-title">示范区</p>
                <div class="select-list">
                    <Button shape="circle" size="small">属性1</Button>
                    <Button shape="circle" size="small">属性模型</Button>
                    <Button shape="circle" size="small">属性1</Button>
                    <Button shape="circle" size="small">属性模型</Button>
                    <Button shape="circle" size="small">属性模型</Button>
                    <Button shape="circle" size="small">属性模型</Button>
                </div>
            </div>
            <div class="select-block">
                <p class="select-title">示范区</p>
                <div class="select-list">
                    <Button shape="circle" size="small">属性1</Button>
                    <Button shape="circle" size="small">属性模型</Button>
                    <Button shape="circle" size="small">属性1</Button>
                    <Button shape="circle" size="small">属性模型</Button>
                    <Button shape="circle" size="small">属性模型</Button>
                    <Button shape="circle" size="small">属性模型</Button>
                </div>
            </div>
        </div>
        <div class="main-right">
            <div class="right-top">
                <div class='swiper-box'>
                    <div v-swiper:mySwiper="swiperOption">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">1</div>
                            <div class="swiper-slide">2</div>
                            <div class="swiper-slide">3</div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
                <div class='top-list'>
                    <p class="list-title">
                        <img :src="htzhIcon" alt="">
                        <span>有趣话题等您参与</span>
                    </p>
                    <ul>
                        <li>su插件是个好东西，求插件库</li>
                        <li>使用什么坎坎坷坷坎坎坷坷看看看合适？</li>
                        <li>使用什么坎坎坷坷坎坎坷坷看看看合适？</li>
                        <li>使用什么坎坎坷坷坎坎坷坷看看看合适？</li>
                        <li>使用什么坎坎坷坷坎坎坷坷看看看合适？</li>
                        <li>使用什么坎坎坷坷坎坎坷坷看看看合适？</li>
                        <li>使用什么坎坎坷坷坎坎坷坷看看看合适？</li>
                    </ul>
                    <nuxt-link class="bottom-link" to="/">更多话题等您参与>></nuxt-link>
                </div>
            </div>
            <div class="content">
                <Menu
                    mode="horizontal"
                    theme="light"
                    active-name="1"
                    class="tabs"
                >
                    <MenuItem name="1">
                        最近回答
                    </MenuItem>
                    <MenuItem name="2">
                        本周最热
                    </MenuItem>
                    <MenuItem name="3">
                        等待回答
                    </MenuItem>
                </Menu>
                <div class="content-list">
                    <div class="content-item" @click="goDetail">
                        <div class="item-left-box">
                            <span class="num">1</span>
                            <span>回答</span>
                        </div>
                        <div class="item-info">
                            <h3 class="item-question">3Dmax灯光自动消失怎么回事？</h3>
                            <div class="question-info">
                                <div class="avatar"></div>
                                <span class="author">杨秘密</span>
                                <span class="tags">平面布局</span>
                                <span class="tags">SU模型</span>
                            </div>
                            <p class="item-answer">回答：民男男女女男男女女男男女女仅仅是生生世世</p>
                        </div>
                        <div class="item-right">
                            <span>21分钟前</span>
                            <div class="img"></div>
                        </div>
                    </div>
                    <div class="content-item">
                        <div class="item-left-box">
                            <span class="num">1</span>
                            <span>回答</span>
                        </div>
                        <div class="item-info">
                            <h3 class="item-question">3Dmax灯光自动消失怎么回事？</h3>
                            <div class="question-info">
                                <div class="avatar"></div>
                                <span class="author">杨秘密</span>
                                <span class="tags">平面布局</span>
                                <span class="tags">SU模型</span>
                            </div>
                            <p class="item-answer">回答：民男男女女男男女女男男女女仅仅是生生世世</p>
                        </div>
                        <div class="item-right">
                            <span>21分钟前</span>
                            <div class="img"></div>
                        </div>
                    </div>
                    <div class="content-item">
                        <div class="item-left-box no-answer">
                            <span class="num">0</span>
                            <span>回答</span>
                        </div>
                        <div class="item-info">
                            <h3 class="item-question">3Dmax灯光自动消失怎么回事？</h3>
                            <div class="question-info">
                                <div class="avatar"></div>
                                <span class="author">杨秘密</span>
                                <span class="tags">平面布局</span>
                                <span class="tags">SU模型</span>
                            </div>
                            <p class="item-answer">回答：民男男女女男男女女男男女女仅仅是生生世世</p>
                        </div>
                        <div class="item-right">
                            <span>21分钟前</span>
                            <div class="img"></div>
                        </div>
                    </div>
                    <div class="content-item">
                        <div class="item-left-box">
                            <span class="num">1</span>
                            <span>回答</span>
                        </div>
                        <div class="item-info">
                            <h3 class="item-question">3Dmax灯光自动消失怎么回事？</h3>
                            <div class="question-info">
                                <div class="avatar"></div>
                                <span class="author">杨秘密</span>
                                <span class="tags">平面布局</span>
                                <span class="tags">SU模型</span>
                            </div>
                            <p class="item-answer">回答：民男男女女男男女女男男女女仅仅是生生世世</p>
                        </div>
                        <div class="item-right">
                            <span>21分钟前</span>
                            <div class="img"></div>
                        </div>
                    </div>
                    <div class="content-item">
                        <div class="item-left-box">
                            <span class="num">1</span>
                            <span>回答</span>
                        </div>
                        <div class="item-info">
                            <h3 class="item-question">3Dmax灯光自动消失怎么回事？</h3>
                            <div class="question-info">
                                <div class="avatar"></div>
                                <span class="author">杨秘密</span>
                                <span class="tags">平面布局</span>
                                <span class="tags">SU模型</span>
                            </div>
                            <p class="item-answer">回答：民男男女女男男女女男男女女仅仅是生生世世</p>
                        </div>
                        <div class="item-right">
                            <span>21分钟前</span>
                            <div class="img"></div>
                        </div>
                    </div>
                </div>
                <div class="page-box">
                    <Page :total="100" show-elevator/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    layout: 'main',
    data() {
      return {
        htzhIcon: require('~/assets/images/htzq.png'),
        swiperOption: {
          slidesPerView: 1,
          loop: true,
          lazy: true,
          autoplay: {
            delay: 8000,
            disableOnInteraction: false
          },
          clickable: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    },
    methods: {
      goDetail() {
        this.$router.push({
          name: 'QuestionsAndAnswers-id',
          params: { id: 1 }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
    .container {
        width: 1200px;
        margin: 30px auto;
        overflow: hidden;
    }

    .main-left {
        float: left;
        width: 340px;
        height: 879px;
        padding: 20px;
        background: #FFFFFF;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);

        .select-title {
            margin-top: 22px;
            padding: 0 10px;
            border-left: 3px solid #ff3c00;
            line-height: 14px;
            font-size: 14px;
            color: #333;
        }

        .select-list {
            button {
                margin-right: 10px;
                margin-top: 10px;
                padding: 2px 14px;
            }
        }

    }

    .main-right {
        float: right;
        width: 840px;
        height: 1142px;
        background-color: #fff;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);

        .right-top {
            padding: 20px;
            display: flex;
            justify-content: space-between;

            .swiper-box {
                width: 520px;
                height: 249px;
                background-color: #ccc;

                .swiper-wrapper {
                    width: 520px;
                    height: 249px;

                    .swiper-slide {
                        position: relative;
                        text-align: center;
                        font-size: 18px;
                        background: #ccc;
                        cursor: pointer;
                        /* Center slide text vertically */
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: -webkit-flex;
                        display: flex;
                        -webkit-box-pack: center;
                        -ms-flex-pack: center;
                        -webkit-justify-content: center;
                        justify-content: center;
                        -webkit-box-align: center;
                        -ms-flex-align: center;
                        -webkit-align-items: center;
                        align-items: center;
                    }
                }
            }

            .top-list {
                width: 264px;

                .list-title {
                    img {
                        vertical-align: middle;
                    }

                    font-size: 14px;
                    color: #333;
                    font-weight: 500;
                }

                ul {
                    list-style: none;

                    li {
                        font-size: 12px;
                        color: #666;
                        margin-top: 10px;
                    }
                }

                .bottom-link {
                    display: block;
                    margin-top: 10px;
                    color: #ff3c00;
                }
            }

        }

        .content {

            .ivu-menu-item {
                padding: 0;
                margin: 0 20px;
            }

            .ivu-menu-item:hover {
                color: #333;
            }

            .ivu-menu-item-active {
                color: #333;
                font-weight: 500;
            }

            .ivu-menu-horizontal.ivu-menu-light:after {
                background: #f5f6f5;
            }

            .tabs {
                margin-bottom: 25px;
            }

            .content-item {
                width: 100%;
                height: 130px;
                border-bottom: 1px solid #d8d8d8;
                padding: 15px 20px;

                .item-left-box {
                    float: left;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 43px;
                    height: 43px;
                    border-radius: 4px;
                    background-image: linear-gradient(-135deg, #68B5F9 0%, #5488F8 100%);
                    color: #fff;

                    span {
                        font-size: 13px;
                    }

                    .num {
                        font-size: 16px;
                        line-height: 16px;
                    }
                }

                .no-answer {
                    background-image: linear-gradient(-135deg, #FAC270 0%, #F7AB3C 100%);
                }

                .item-info {
                    float: left;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-start;
                    height: 100%;
                    margin-left: 24px;

                    .item-question {
                        font-size: 16px;
                        color: #333;
                        line-height: 14px;
                    }

                    .question-info {
                        display: flex;
                        align-items: center;

                        .avatar {
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            background-color: #ccc;
                        }

                        .author {
                            font-size: 12px;
                            color: #333;
                            margin: 0 30px 0 5px;
                        }

                        .tags {
                            margin-right: 10px;
                            padding: 2px 10px;
                            font-size: 12px;
                            color: #999;
                            background-color: #f5f6f5;
                        }
                    }

                    .item-answer {
                        font-size: 12px;
                        color: #666;
                    }
                }

                .item-right {
                    float: right;
                    display: flex;
                    align-items: flex-end;

                    span {
                        font-size: 12px;
                        color: #999;
                    }

                    .img {
                        width: 150px;
                        height: 100px;
                        background-color: #ccc;
                        margin-left: 10px;
                    }
                }
            }

            .content-item:last-child {
                border-bottom: none;
            }
        }

        .page-box {
            display: flex;
            justify-content: center;
            padding-top: 30px;
        }
    }
</style>
