<template>
    <div>
        <div class="container">
            <div class="main-right">
                <!-- 主内容区 -->
                <crollBox :isLast="isLast" @willReachBottom ="willReachBottom" >
                    <div class="content">
                        <div class="editor-jzbl">
                            <proRele :editorName="editorName" @clickEditor="clickEditor" @relSuccessfully="relSuccessfully"/>
                        </div>
                        <Menu mode="horizontal" theme="light" :active-name="menuIndex" class="tabs" @on-select="selectMenu">
                            <MenuItem name="5"> 最近问答</MenuItem>
                            <MenuItem name="1"> 本周最热</MenuItem>
                            <MenuItem name="2"> 本月最热</MenuItem>
                            <MenuItem name="4" v-show="isSearch"> 搜索</MenuItem>
                        </Menu>
                        <div class="content-list">
                            <Spin size="large" fix v-if="spinShow"></Spin>
                            <template  v-if="QAList.length > 0" >
                                <div class="content-item" v-for="item in QAList" :key="item.QAId">
                                    <div class="content-box"> 
                                        <div class="item-left-box"  @click="goToPersonal(item)">
                                            <span class="num">
                                                <img :src="item.UserWebEntity.HeadIcon " alt="头像">
                                            </span>
                                        </div>
                                        <div class="item-box">
                                            <div class="item-info">
                                                <div class="question-info">
                                                    <div @click="goToPersonal(item)"> 
                                                        <span class="author">{{ item.UserWebEntity.NickName }}</span>
                                                    </div>
                                                    <span class="tags" v-for="labelItem in item.Labels" :key="labelItem.ModuleId">{{ labelItem.FullName }}</span>
                                                    <span>{{item.CreateDate}}</span>
                                                </div>
                                                <h3 class="item-question" @click="goDetail(item.QAId)">{{item.QATitle }}</h3>
                                                <div class="item-answer">
                                                    <span v-show="item.LatestAnswer">回答：</span>
                                                    <emotHtml class="beyond-quest" v-model="item.LatestAnswer"/>
                                                </div>
                                            </div>
                                            <div class="item-right">
                                                <div class="img" @click="goDetail(item.QAId)">
                                                    <img v-if="item.Img" :src="fileBaseUrl + item.Img.smallImgUrl" alt="">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <proTools 
                                        :itemTools="item" 
                                        @goDetail="goDetail"
                                        @liked="liked"
                                        @collection="collection"/>
                                </div>
                            </template>
                        </div>
                        <div class="page-box" v-if="total > 5">
                            <Page :total="total" :page-size="pageSize" @on-change="handlePageChange"/>
                        </div>
                    </div>
                </crollBox>
            </div>
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
        </div>
        <ToTop></ToTop>
    </div>
</template>

<script>
import { getQADataBy, setCollection, setthumbsUp} from '../../service/clientAPI'
import ToTop from '../../components/toTop'
import proTools from '../../components/proTools'
import crollBox from '../../components/crollBox'
import proRele from "../../components/proRele"
import { _throttle } from '../../plugins/untils/public'
export default {
    layout: 'main',
    data() {
        return {
            editorName: 'wd',
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
            menuIndex: '5', // 当前菜单的name值
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
        crollBox,
        proRele,
        proTools
    },
    methods: {
        relSuccessfully () {
            this.getQAData(1);
        },
        clickEditor (val) {
            this.editorName = val
        },
        // 跳转部落
        goToPersonal (row) {
            this.$router.push({
                name: 'HeAndITribal-id',
                query: {
                    id: row.UserWebEntity.UserId
                }
            })
        },
        // 点击收藏
        collection(row) {
            let flag = !row.itemOperateData.IsCollection
            setCollection({
                ItemId: row.QAId,
                ItemName: row.QATitle,
                ItemTitleImg: '',
                IsDelete: !flag,
                TalkType: "3"
            }).then(() => {
                row.itemOperateData.IsCollection = flag;
                flag ? row.itemOperateData.CollectionCount += 1 : row.itemOperateData.CollectionCount -= 1;
            })
        },
        liked (row) {
            let flag = !row.itemOperateData.IsLike
            setthumbsUp({
                ItemId: row.QAId,
                LikeType: 1,
                CommentsId: '',
                IsDelete: !flag
            }).then(() => {
                row.itemOperateData.IsLike = flag;
                flag ? row.itemOperateData.LikeCount += 1 : row.itemOperateData.LikeCount -= 1;
            })
        },
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
                this.total = msg.paginationData.total || 0;
                this.spinShow = false;
            }
        },
        // 获取问答数据
        async getQAData(type) {
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
                    this.QAList = data.QADatas || [];
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
            this.getQAData(1);
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
            TalkType: 5,
            Page: 1,
            Rows: 8
        };
        const [dlist, qdata] = await Promise.all([store.dispatch('getQASearchTag'), store.dispatch('getQAData', queryParams)]);
        return {
            labelList: dlist.TypeLabels|| [],
            QAList: qdata.QADatas|| [],
            total: qdata.paginationData ? qdata.paginationData.total : 0
        }
    }
}
</script>
<style lang="less" scoped>
    .content-box {
        display: flex;
        justify-content: space-between;
    }
    .container {
        width: 1200px;
        margin: 30px auto;
        justify-content: space-between;
        display: flex;
    }
    .main-left {
        width: 340px;
        max-height: 500px;
        padding: 20px;
        background: #FFFFFF;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.15);
        position: sticky;
        top: 70px;
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
                position: sticky;
                top: 60px;
            }
            .content-list {
                position: relative;
            }
            .content-item {
                width: 100%;
                border-bottom: 1px solid #d8d8d8;
                padding: 15px 20px 0;
                .item-left-box {
                    display: flex;
                    cursor: pointer;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 43px;
                    height: 43px;
                    border-radius: 4px;
                    background-image: linear-gradient(-135deg, #68B5F9 0%, #5488F8 100%);
                    color: #fff;
                    overflow: hidden;
                    span {
                        font-size: 13px;
                    }

                    .num {
                        font-size: 16px;
                        line-height: 16px;
                        display: inline-block;
                        height: 100%;
                        width: 100%;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
                .no-answer {
                    background-image: linear-gradient(-135deg, #FAC270 0%, #F7AB3C 100%);
                }
                .item-info {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: flex-start;
                    height: 100%;
                    margin-left: 24px;
                    max-width: 570px;
                    .item-question {
                        font-size: 20px;
                        color: #333;
                        cursor: pointer;
                        margin: 10px 0 ;
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
                        display: flex;
                        font-size: 12px;
                        color: #666;
                        flex-direction:row;
                        height: 35px;
                        overflow: hidden;
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
    .beyond-quest {
        height: 56px;
        display: inline-block;
        overflow: hidden;
        width: 530px;
    }
    .item-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
</style>
