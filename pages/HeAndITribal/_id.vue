<template>
    <div class="he-and-i-tribal">
        <div class="he-and-i-tribal-content">
            <heads :userInfo="tribeInfo" :userId="userId" :itIsMe="itIsMe"/>
            <div class="he-and-i-con-box">
                <!-- 一级导航-->
                <ul class="he-and-i-con-box-nav">
                    <li v-for="(item,index) in tribeInfo.MyOrOtherMeun" :key="item.id"
                        :class="currentIndex === index ? 'li-active' :''" @click="getTypeMeunList(item,index)">
                        {{item.Name}}
                    </li>
                </ul>
                <div class="he-and-i-con-box-content">
                    <div class="he-and-i-con-box-content-left">
                        <!-- 二级导航-->
                        <ul class="head-boxs head-boxs-two" v-show="headList && headList.length > 0">
                            <li :class="twoIndex === itemIndex ? 'li-active' : ''" v-for="(item, itemIndex) in headList" :key="itemIndex" 
                                @click="changeTwo(item.TypeId, itemIndex)">
                                {{item.TypeName}}
                            </li>
                        </ul>
                        <crollBox :isLast="isLast" @willReachBottom ="willReachBottom" >
                            <HeAndIDownload 
                                v-if="PersonalCenter === 'HeAndIDownload'"
                                @clickMenu="clickMenu"
                                :dataList="dataList"/>
                            <mySomethingStatistical
                                v-if="PersonalCenter === 'mySomethingStatistical'"
                                :followList="followList"
                            />
                        </crollBox>
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
         <ToTop ></ToTop>
    </div>
</template>
<script>
    import HeAndIIntroduction from './HeAndIIntroduction'
    import HeAndIDownload from './HeAndIDownload'
    import mySomethingStatistical from './mySomethingStatistical'
    import { mapState } from 'vuex'
    import Heads from './head'
    import ToTop from '../../components/toTop'
    import crollBox from '../../components/crollBox'
    import { getTypeMeun , getFollowOrFans, ItemOperat, getItemPrice} from '~/service/clientAPI'
    import { _throttle } from '../../plugins/untils/public'
    export default {
        layout: 'main',
        middleware: 'authenticated',
        name: 'PersonalCenter',
        components: {
            HeAndIIntroduction,
            HeAndIDownload,
            mySomethingStatistical,
            Heads,
            crollBox,
            ToTop
        },
        data() {
            return {
                currentIndex: 0, // 一级高亮
                twoIndex: 0, // 二级高亮
                twoId: 0,
                itIsMe: false,
                IsFollow: true, // 粉丝加载
                currentItem: '0',
                headList: [], // 二级导航
                dataList: [],
                followList: [],
                PersonalCenter: 'PersonalCenter',
                pageNum: 1,
                menuId: 0,
                isLast: false,
                records: 0,
                total: 0,   // 总页数
                resetPriceS: {},
                rulePrice: {},
                resetValue: ''
            }
        },
        computed: {
            ...mapState({
                userInfoID: state => state.overas.auth.UserId
            })
        },
        async asyncData({ store, query }) {
            let id = query.id ? query.id : store.getters.getToken.UserId;
            let itIsMe = null
            if (query.id === '' || query.id === store.getters.getToken.UserId) {
                itIsMe = false;
            } else {
                itIsMe = true;
            }
            let Trid = {
                "UserId": id
            }
            await store.dispatch('TribeVisiting', Trid);
            const data = await store.dispatch('getTribeInfo', id);
            return {
                userId: id,
                itIsMe,
                tribeInfo: data
            }
        },
        created () {
            this.getTypeMeunList(); 
            if (this.$route.query.id === undefined || this.$route.query.id === this.userInfoID) {
                this.itIsMe = false;
            }  else {
                this.itIsMe = true;
            }
        },
        methods: {
            async clickMenu (row, item, index) {
                if (item.OperateId === 'szjg') {
                    this.resetPrice(row, item, index)
                    return false
                }
                let qieryData = { 
                    "ItemId": row.ItemId,
                    "TalkType": row.TalkType,
                    "Follow": { // 关注
                        "UserId": row.UserId,
                        "IsDelete": row.IsFollow
                    },
                    "OperateId": item.OperateId,
                    "OperatValue": item.OperatValue
                }
                if (item.OperatValue !== "FollowThisUser" && item.OperatValue !== "UnfollowThisUser") {
                    qieryData.Follow = {}
                }
                if (item.OperatValue == "Delete" ) {
                        this.$Modal.confirm({
                            title: '删除项目',
                            content: '<p>请否确定删除项目!</p>',
                            onOk: async () => {
                                let msg = await ItemOperat (qieryData);
                                if (msg) { 
                                if (item.OperatValue == "Delete") {
                                    this.dataList.splice(index, 1);
                                    return false
                                }
                                }
                            },
                            onCancel: () => {
                                return false
                            }
                        });
                        return false
                    }
                    let msg = await ItemOperat (qieryData);
                    if (msg) {
                        // 关注
                        if (item.OperatValue == "FollowThisUser") {
                            this.$set(row, 'IsFollow', !row.IsFollow);
                            this.$set(item, 'OperatName', '取消关注');
                            this.$set(item, 'OperatValue', 'UnfollowThisUser');
                            return false
                        }
                        // 取消关注
                        if (item.OperatValue == "UnfollowThisUser") {
                            this.$set(row, 'IsFollow', !row.IsFollow);
                            this.$set(item, 'OperatName', '关注');
                            this.$set(item, 'OperatValue', 'FollowThisUser');
                            return false
                        }
                        if (item.OperatValue == "Delete") {
                            this.dataList.splice(index, 1);
                            return false
                        }
                    }
            },
            // 重新设置价格
            async resetPrice (row, item, index) {
                let msg = await getItemPrice(row.ItemId);
                if (msg) {
                    this.$Modal.confirm({
                        onOk: async () => {
                            let qieryData = { 
                                "ItemId": row.ItemId,
                                "TalkType": row.TalkType,
                                "OperateObj": JSON.stringify(msg),
                                "OperateId": item.OperateId,
                                "OperatValue": item.OperatValue
                            }
                            let msgs = await ItemOperat (qieryData);
                            if (msgs) {
                                
                            }
                        },
                        render: (h) => {
                            let ItemCustomizes = [];
                            if (msg.ItemCustomizes.length > 0) {
                                msg.ItemCustomizes.forEach(ele => {
                                    ItemCustomizes.push(
                                        h("TabPane", {props: {label: ele.customizedTypeName, tab: "tab2-1"}}, [
                                            h("div", { class: ["dowPics"]}, `该定制服务原价格为${ele.customizedMoney}元`),
                                            h('Input', {
                                                props: {
                                                    value: "",
                                                    autofocus: true,
                                                    placeholder: `修改新的价格（元）`
                                                },
                                                on: {
                                                    input: (val) => {
                                                        ele.customizedMoney = val;
                                                    }
                                                }
                                            })
                                        ])
                                    )
                                })
                            }
                            return h("Tabs", {props: {name : "tab1"}}, [
                                h("TabPane", 
                                    {
                                        style: {
                                            display: msg.ItemPic ? "inline-block" : "none"
                                        },
                                        props: {label: "修改下载价格", tab: "tab1"}
                                    }, [
                                    h("div", {class: ["dowPics"]}, `该项目原下载价格为${msg.ItemPic.dowPic}元`),
                                    h('Input', {
                                        props: {
                                            value: "",
                                            autofocus: true,
                                            placeholder: '修改新的下载价格（元）'
                                        },
                                        on: {
                                            input: (val) => {
                                                msg.ItemPic.dowPic = val;
                                            }
                                        }
                                    })
                                ]),
                                h("TabPane", 
                                    {   
                                        style: {
                                            display: msg.ItemCustomizes.length > 0 ? "inline-block" : "none"
                                        },
                                        props: {label: "修改定制价格", tab: "tab1"}
                                    }, [
                                    h("Tabs", {props: {name : "tab2-1"}}, ItemCustomizes) 
                                ])
                            ])
                        }
                    })
                }
            },
            // 触底事件
            willReachBottom: _throttle (function () {
                if (this.total === 1) {
                    this.isLast = true
                    return false
                }
                if (this.pageNum >= this.total) {
                    this.$Message.info('已经是最后一页了');
                    return false;
                }
                this.pageNum++;
                if (this.PersonalCenter === 'HeAndIDownload') {
                    this.getList(this.currentIndex, this.twoId, true);
                } else {
                    this.getfollowList(this.IsFollow, true)
                }
            }, 1500),
            // 点击一级菜单
            async getTypeMeunList (item, inx) {
                this.currentIndex = inx || 0;
                this.twoIndex = 0;
                this.twoId = 0
                this.pageNum = 1;
                let queryData = {
                    typeId: inx || 0,
                    UserId: this.$route.query.id ? this.$route.query.id : this.userInfoID
                }
                let menuButs = await getTypeMeun(queryData);
                if (menuButs) {
                    this.headList = menuButs.typeMenuButs;
                    this.PersonalCenter = 'HeAndIDownload';
                    this.getList(inx);
                }
            },
            changeComponents (index, count) {
                this.currentIndex = null;
                this.pageNum = 1;
                this.headList =[];
                let Components = ['mySomethingStatistical', 'mySomethingStatistical', 'HeAndIDownload'];
                this.PersonalCenter = Components[index];
                if (index === 0 || index === 1) {
                    let isF = index === 0 ? true : false;
                    this.getfollowList(isF)
                } else {
                    this.twoIndex = 0
                    this.getList(0, 0);
                }
            },
            // 获取关注数据
            async getfollowList (index, isCrool) {
                this.IsFollow =index;
                let query = {
                    "IsFollow": this.IsFollow,
                    "page": this.pageNum,
                    "UserId": this.$route.query.id ? this.$route.query.id : this.userInfoID
                }
                let msg  = await getFollowOrFans(query);
                if (msg) {
                    if (msg.forFs instanceof Array) {
                        if (isCrool) {
                            this.followList = this.followList.concat(msg.forFs);
                        } else {
                            this.dataList = [];
                            this.followList = msg.forFs;
                        }
                        this.total = msg.paginationData.total;
                        this.pageNum = msg.paginationData.page;
                        this.records = msg.paginationData.records;
                    } else {
                        this.dataList = [];
                        this.total = 0;
                        this.pageNum = 0;
                        this.records = 0;
                    }
                    
                    
                }
            },
            // 点击二级导航
            changeTwo (id, index) {
                this.twoIndex = index;
                this.twoId = id
                this.getList(this.currentIndex, id);
            },
            // 获取发布数据
            getList(OneIndex, index, isScroll) {
                this.$store.dispatch('getSelfOrOthertribeInfo', {
                    Page: this.pageNum,
                    Rows: 8,
                    ItemTypeId: index,
                    typeId: this.currentIndex,
                    UserId: this.$route.query.id ? this.$route.query.id : this.userInfoID
                }).then(res => {
                    if (res.retModels instanceof Array) {
                        if (isScroll) {
                            this.dataList = this.dataList.concat(res.retModels);
                        } else {
                            this.dataList = [];
                            this.dataList = res.retModels;
                        }
                        this.total = res.paginationData.total;
                        this.pageNum = res.paginationData.page;
                        this.records = res.paginationData.records;
                    } else {
                        this.dataList = [];
                        this.total = 0;
                        this.pageNum = 0;
                        this.records = 0
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .dowPics {
        margin: 20px 0;
    }
    .head-boxs-two{
        position: sticky;
        top: 100px;
        z-index: 66;
        border-top: 1px solid #eeeeee;
    }
    .head-boxs {
        padding-left: 15px;
        height: 40px;
        line-height: 39px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        background: #ffffff;
        font-size: 14px;
        color: #666666;
        box-sizing: border-box;
        border-bottom: 1px solid #D8D8D8;
        > li {
            margin-right: 20px;
            cursor: pointer;
        }
        .li-active {
            color: #FF3C00;
        }
    }
    .he-and-i-tribal {
        width: 100%;
        height: 100%;
        background: url("../../assets/images/heandibg.png") no-repeat left top;
        background-size: cover;
        .he-and-i-tribal-content {
            overflow: hidden;
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
            top: 60px;
            z-index: 2;
            background: #ffffff;
            padding: 0 198px;
            margin-bottom: 16px;
            display: flex;
            flex-direction: row;
            > li {
                flex: 1;
                line-height: 40px;
                font-size: 16px;
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
