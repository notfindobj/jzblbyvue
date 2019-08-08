<template>
    <div class="he-and-i-tribal">
        <div class="he-and-i-tribal-content">
            <heads :userInfo="tribeInfo"/>
            <div class="he-and-i-con-box">
                <ul class="he-and-i-con-box-nav">
                    <li v-for="(item,index) in tribeInfo.MyOrOtherMeun" :key="item.id"
                        :class="currentIndex === index ? 'li-active' :''" @click="getTypeMeunList(item,index)">
                        {{item.Name}}
                    </li>
                </ul>
                <div class="he-and-i-con-box-content">
                    <div class="he-and-i-con-box-content-left">
                        <HeAndIDownload 
                            v-if="PersonalCenter === 'HeAndIDownload'"
                            :headList= "headList" 
                            :dataList="dataList" 
                            :paginationData="paginationData"
                            @reachBottom="reachBottom"
                            @changeType="getList"/>
                        <mySomethingStatistical
                            v-if="PersonalCenter === 'mySomethingStatistical'"
                            :followList="followList"
                        />
                    </div>
                    <div class="he-and-i-con-box-content-right">
                        <HeAndIIntroduction
                            :userInfo="tribeInfo"
                            @changeComponents="changeComponents"
                        />
                    </div>
                </div>
            </div>
        </div>
        <ToTop></ToTop>
    </div>
</template>
<script>
    import HeAndIContent from './HeAndIContent'
    import HeAndIIntroduction from './HeAndIIntroduction'
    import HeAndIDownload from './HeAndIDownload'
    import mySomethingStatistical from './mySomethingStatistical'
    import { mapState } from 'vuex'
    import Heads from './head'
    import ToTop from '../../components/toTop'
    import { getTypeMeun , getFollowOrFans} from '~/service/clientAPI'
    export default {
        layout: 'main',
        name: 'PersonalCenter',
        components: {
            HeAndIContent,
            HeAndIIntroduction,
            HeAndIDownload,
            mySomethingStatistical,
            Heads,
            ToTop
        },
        data() {
            return {
                currentIndex: 0,
                headList: [],
                dataList: [],
                followList: [],
                paginationData: {},
                PersonalCenter: 'PersonalCenter',
                pageNum: 1,
                menuId: 0,
            }
        },
        computed: {
            ...mapState({
                userInfoID: state => state.overas.auth.UserId
            })
        },
        async asyncData({ store, query }) {
            let id = query.id ? query.id : store.getters.getToken.UserId;
            const data = await store.dispatch('getTribeInfo', id);
            return {
                tribeInfo: data
            }
        },
        created () {
            this.getTypeMeunList();
        },
        methods: {
            // 选择二级菜单
            getTypeMeunList (item, inx) {
                this.currentIndex = inx || 0;
                this.pageNum = 1;
                let queryData = {
                    typeId: inx || 0,
                    UserId: this.$route.query.id ? this.$route.query.id : this.userInfoID
                }
                getTypeMeun(queryData).then(res => {
                    this.headList = res.typeMenuButs;
                    this.PersonalCenter = 'HeAndIDownload';
                    this.getList();
                })
            },
            changeComponents (index, count) {
                this.currentIndex = null;
                this.pageNum = 1;
                let Components = ['mySomethingStatistical', 'mySomethingStatistical', 'HeAndIDownload'];
                this.PersonalCenter = Components[index];
                if (index === 0 || index === 1) {
                    this.getfollowList(index)
                }
            },
            // 获取关注数据
            async getfollowList (index) {
                let query = {
                    "IsFollow": index === 0 ? true : false,
                    "page": this.pageNum,
                    "UserId": this.$route.query.id ? this.$route.query.id : this.userInfoID
                }
                let msg  = await getFollowOrFans(query);
                if (msg) {
                    this.followList = msg.forFs 
                }
            },
            // 触底
            reachBottom() {
                this.pageNum++;
                this.getList();
            },
            // 获取发布数据
            getList(id, index) {
                this.$store.dispatch('getSelfOrOthertribeInfo', {
                    Page: this.pageNum,
                    Rows: 8,
                    ItemTypeId: index || 0,
                    typeId: this.currentIndex,
                    UserId: this.$route.query.id ? this.$route.query.id : this.userInfoID
                }).then(res => {
                    if (res.retModels instanceof Array) {
                        if (index) {
                            this.dataList = [];
                            this.dataList = res.retModels;
                        } else {
                            this.dataList = this.dataList.concat(res.retModels);
                        }
                        this.paginationData = res.paginationData;
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .he-and-i-tribal {
        width: 100%;
        height: 100%;
        background: url("../../assets/images/heandibg.png") no-repeat left top;
        background-size: cover;

        .he-and-i-tribal-content {
            width: 1200px;
            height: auto;
            margin: 0 auto;
            background: transparent;
        }
    }
    .he-and-i-con-box {
        width: 100%;
        height: auto;
        margin-bottom: 16px;
        background: transparent;
        .fixed-header {
          position: sticky;
          top: 0;
          z-index: 2;
        }
        &-nav {
            width: 100%;
            height: 40px;
            position: sticky;
            top: 0;
            z-index: 2;
            background: #ffffff;
            padding: 0 198px;
            margin-bottom: 16px;
            display: flex;
            flex-direction: row;
            > li {
                flex: 1;
                line-height: 40px;
                font-size: 14px;
                color: #333333;
                margin-right: 100px;
                position: relative;
                cursor: pointer;
                &:last-child {
                    margin-right: 0;
                }
                &:hover {
                    &:after {
                        width: 56px;
                        height: 2px;
                        content: '';
                        background: #FF3C00;
                        position: absolute;
                        left: 0;
                        top: 38px;
                    }
                }
            }
            .li-active {
                &:after {
                    width: 56px;
                    height: 2px;
                    content: '';
                    background: #FF3C00;
                    position: absolute;
                    left: 0;
                    top: 38px;
                }
            }
        }
        &-content {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            &-left {
                display: inline-block;
                width: 950px;
                background: transparent;
            }
            &-right {
                position: sticky;
                display: inline-block;
                width: 322px;
                margin-left: 10px;
            }
            .fixed-right {
                position: fixed;
                top: 48px;
                right: 351px;
            }
        }
    }
</style>
