<template>
    <div>
        <div class="container">
            <div class="main-left">
                <Input search enter-button v-model="keyword" @on-search="searchQA" placeholder="请输入要搜索内容"/>
                <div class="select-block" v-for="item in labelList" :key="item.ModuleId">
                    <p class="select-title">{{ item.FullName }}</p>
                    <div class="select-list">
                        <Button shape="circle" size="small" v-for="subItem in item.Labels" :key="subItem.ModuleId"
                                :class="{selected: labelId === subItem.ModuleId}"
                                @click="clickLabel(subItem.ModuleId)">
                            {{ subItem.FullName }}
                        </Button>
                    </div>
                </div>
            </div>
            <div class="main-right">
                <div class="right-top">
                    <div class='swiper-box'>
                        <div v-swiper:mySwiper="swiperOption">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="item in slideList" :key="item.Id">
                                    <img :src="item.CoverImgUrl" alt="">
                                </div>
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
                            <li v-for="item in recommentList" :key="item.QAId">
                                <nuxt-link :to="{name: 'QuestionsAndAnswers-id', params: {id: item.QAId}}">{{ item.QATitle}}
                                </nuxt-link>
                            </li>
                        </ul>
                        <nuxt-link class="bottom-link" to="/">更多话题等您参与>></nuxt-link>
                    </div>
                </div>
                <crollBox :isLast="isLast" @willReachBottom ="willReachBottom" >
                    <div class="content">
                        <Menu mode="horizontal" theme="light" :active-name="menuIndex" class="tabs" @on-select="selectMenu">
                            <MenuItem name="0"> 最近回答</MenuItem>
                            <MenuItem name="3"> 等待回答</MenuItem>
                            <MenuItem name="1"> 本周最热</MenuItem>
                            <MenuItem name="2"> 本月最热</MenuItem>
                            <MenuItem name="4" v-show="isSearch"> 搜索</MenuItem>
                        </Menu>
                        <div class="content-list">
                            <Spin size="large" fix v-if="spinShow"></Spin>
                            <div class="content-item" v-for="item in QAList" :key="item.QAId">
                                <div class="item-left-box">
                                    <span class="num">{{ item.ReplyCount }}</span>
                                    <span>回答</span>
                                </div>
                                <div class="item-info">
                                    <h3 class="item-question" @click="goDetail(item.QAId)">{{ item.QATitle }}</h3>
                                    <div class="question-info">
                                        <div @click="jumpRoute(item)">
                                            <span class="avatar">
                                                <img :src="item.UserWebEntity.HeadIcon" alt="头像">
                                            </span>
                                            <span class="author">{{ item.UserWebEntity.NickName }}</span>
                                        </div>
                                        <span class="tags" v-for="labelItem in item.Labels" :key="labelItem.ModuleId">
                                            {{ labelItem.FullName }}
                                        </span>
                                    </div>
                                    <p class="item-answer">回答：<emotHtml v-model="item.LatestAnswer"/></p>
                                </div>
                                <div class="item-right">
                                    <span>{{ item.LatestAnswerDate }}</span>
                                    <div class="img" @click="goDetail(item.QAId)">
                                        <img v-if="item.Img" :src="fileBaseUrl + item.Img.smallImgUrl" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="page-box" v-if="total > 5">
                            <Page :total="total" :page-size="pageSize" @on-change="handlePageChange"/>
                        </div>
                    </div>
                </crollBox>
            </div>
        </div>
        <ToTop></ToTop>
    </div>
</template>

<script>
import { getQADataBy } from '../../service/clientAPI'
import ToTop from '../../components/toTop'
import crollBox from '../../components/crollBox'
import { _throttle } from '../../plugins/untils/public'
export default {
    layout: 'main',
    middleware: 'authenticated',
    data() {
        return {
            fileBaseUrl: process.env.fileBaseUrl,   // 文件的域名
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
            },
            QAList: [],     // 问答列表
            menuIndex: '0', // 当前菜单的name值
            pageNum: 1,     // 分页当前页
            keyword: '',    // 搜索关键字
            labelId: '',    // 选择标签的id
            spinShow: false,    // 是否显示加载中
            isSearch: false,    // 是否显示搜索内容
            total: 0,       // 总条数
            isLast: false,
            records: 0,
            pageSize: 5,    // 每页条数
        }
    },
    components: {
        ToTop,
        crollBox
    },
    methods: {
        // 触底事件
        willReachBottom: _throttle(function () {
            if (this.total === 1) {
                this.isLast = true
                return false
            }
            this.isLast = false;
            if (this.pageNum >= this.total) {
                this.$Message.info('已经是最后一页了');
                return false;
            }
            this.pageNum++;
            this.getQAData();
        },  1500),
        goDetail(id) {
            this.$router.push({
                name: 'QuestionsAndAnswers-id',
                params: { id }
            })
        },
        // 分页切换
        onChangePage (num, type = 1) {
            this.pageNum = num;
            this.getQAData(num, type);
            (function smoothscroll(){
                var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(smoothscroll);
                    window.scrollTo (0,currentScroll - (currentScroll/5));
                }
            })();
        },
        handlePageChange(num) {
            this.pageNum = num;
            this.getQAData();
        },
        // 搜索
        searchQA() {
            this.getQADataByList()
        },
        // 点击标签
        clickLabel(id) {
            this.labelId = id !== this.labelId ? id : '';
            this.getQADataByList()
        },
        //  点击标签查询
        async getQADataByList() {
            let queryData = {
                KeyWord: this.keyword,
                LabelID: this.labelId,
                TalkType: 4,
                Page: 1,
                Rows: 8
            }
            this.menuIndex = '4';
            let msg = await getQADataBy(queryData);
            if (msg) {
                this.isSearch = true;
                this.QAList = msg.QADatas;
                this.total = msg.paginationData.total;
                this.spinShow = false;
            }
        },
        // 获取问答数据
        async getQAData(row, type) {
            this.spinShow = true;
            const data = await this.$store.dispatch('getQAData', {
                KeyWord: '',
                LabelID: this.labelId,
                TalkType: this.menuIndex,
                Page: this.pageNum,
                Rows: 8
            });
            if (data) {
                if (type === 1) {
                    this.QAList = [];
                    this.QAList = data.QADatas;
                } else {
                    this.QAList = this.QAList.concat(data.QADatas);
                }
                this.total = data.paginationData.total;
                this.pageNum = data.paginationData.page;
                this.records = data.paginationData.records;
                this.spinShow = false;
            }
        },
        // 切换菜单
        selectMenu(name) {
            this.menuIndex = name;
            this.isSearch = false;
            this.pageNum = 1;
            this.QAList = []
            this.getQAData();
        },
        // HeAndITribal路由跳转
        jumpRoute(items) {
            this.$router.push({ name: "HeAndITribal-id", query: { id: items.UserId } });
        }
    },
    async asyncData({ store }) {
        const queryParams = {
            KeyWord: '',
            LabelID: '',
            TalkType: '',
            Page: 1,
            Rows: 8
        };
        const data = await Promise.all([store.dispatch('getQASearchTag'), store.dispatch('getQARecomment'), store.dispatch('getQAData', queryParams)])
        // const data = await Promise.all([store.dispatch('getQASearchTag'), store.dispatch('getQARecomment')])
        return {
            labelList: data[0].TypeLabels,
            recommentList: data[1].RecommendQA,
            slideList: data[1].SlideList,
            QAList: data[2].QADatas,
            total: data[2].paginationData.total
        }
    }
}
</script>
<style lang="less" scoped>
    .container {
        width: 1200px;
        margin: 30px auto;
        justify-content: space-between;
        display: flex;
    }
    .main-left {
        width: 340px;
        height: 879px;
        padding: 20px;
        background: #FFFFFF;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
        position: sticky;
        top: 0px;
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

            .selected {
                color: #ff6333;
                border-color: #ff6333;
            }
        }
    }
    .main-right {
        width: 840px;
        min-height: 600px;
        padding-bottom: 25px;
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
                        img {
                            width: 100%;
                            height: 100%;
                        }
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
                        margin-top: 13px;
                        width: 100%;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;

                        a:hover {
                            color: #FF3C00;
                        }
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

            .content-list {
                position: relative;
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
                        cursor: pointer;
                    }

                    .question-info {
                        display: flex;
                        align-items: center;

                        .avatar {
                            cursor: pointer;
                            width: 24px;
                            height: 24px;
                            border-radius: 50%;
                            background-color: #ccc;
                            overflow: hidden;
                            display: inline-block;
                            vertical-align: middle;

                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }

                        .author {
                            cursor: pointer;
                            font-size: 12px;
                            color: #333;
                            margin: 0 30px 0 5px;
                            display: inline-block;
                            line-height: 24px;
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
                        cursor: pointer;
                        width: 150px;
                        height: 100px;
                        margin-left: 10px;

                        img {
                            width: 100%;
                            height: 100%;
                        }
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
