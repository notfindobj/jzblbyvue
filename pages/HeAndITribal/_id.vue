<template>
    <div class="he-and-i-tribal">
        <div class="he-and-i-tribal-content">
            <heads :userInfo="tribeInfo" :userId="userId" :itIsMe="itIsMe"/>
            <div class="he-and-i-con-box">
                <!-- 一级导航-->
                <ul class="he-and-i-con-box-nav">
                    <li v-if="isEnt" @click="getTypeMeunList({}, 123)" :class="currentIndex === 123 ? 'li-active' :''" :key="123">
                        首页
                    </li>
                    <li v-for="(item,index) in tribeInfo.MyOrOtherMeun" :key="item.id"
                        :class="currentIndex === index ? 'li-active' :''" @click="getTypeMeunList(item,index)">
                        {{item.Name}}
                    </li>
                </ul>
                <div class="he-and-i-con-box-content">
                    <!-- 二级导航-->
                    <div class="he-and-i-con-box-content-left">
                        <div v-show="PersonalCenter !== 'comHome'">
                            <ul class="head-boxs head-boxs-two" v-show="headList && headList.length > 0">
                                <li :class="twoIndex === itemIndex ? 'li-active' : ''" v-for="(item, itemIndex) in headList" :key="itemIndex" 
                                    @click="changeTwo(item.TypeId, itemIndex)">
                                    {{item.TypeName}}
                                </li>
                            </ul>
                        </div>
                        <!-- 公司首页 -->
                        <div v-if="PersonalCenter === 'comHome'" class="comHome">
                            <div>
                                <h2>{{CompanyIntro.companyName}}</h2>
                                <div class="comHome-content">
                                    {{CompanyIntro.Description}}
                                </div>
                                <div class="comHome-other">
                                    <p v-if="CompanyIntro.Labels"><span class="comHome-title">擅长业务：</span>{{CompanyIntro.Labels}}</p>
                                    <p v-if="CompanyIntro.Email"><span class="comHome-title">邮箱：</span>{{CompanyIntro.Email}}</p>
                                    <p v-if="CompanyIntro.Mobile"><span class="comHome-title">电话：</span>{{CompanyIntro.Mobile}}</p>
                                    <p v-if="CompanyIntro.ProvinceName"><span class="comHome-title">地址：</span>{{CompanyIntro.ProvinceName}}{{CompanyIntro.CityName}}{{CompanyIntro.CountyName}}</p>
                                </div>
                            </div>
                            <div class="comHome-teamuserlist">
                                <span class="comHome-teamuserlist-name">主创团队</span>
                                <span class="comHome-teamuserlist-btn" @click="clickTeamuser">邀请队友</span>
                            </div>
                            <div>
                                <div class="Swiper-nominate">
                                    <div class="swiper-wrapper">
                                        <template v-for="(items, index) in teamuserlist">
                                            <div class="swiper-slide" :key="index">
                                                <div class="swiper-slide-item">
                                                    <nuxt-link target="_blank" :to="{name: 'HeAndITribal-id', query: {id:items.UserId}}">
                                                    <img :src="(items.HeadIcon)" alt="">
                                                    </nuxt-link>
                                                    <div class="swiper-RealName">
                                                        <span>姓名：{{items.RealName}}</span>
                                                        <span>人气：{{items.Pop}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                    <div class="swiper-pagination swiper-pagination-bullets"></div>
                                </div>
                                <div class="empty-teamuserlist" v-if="teamuserlist.length < 0">
                                    暂无队员，<span class="empty-teamuserlist-invitation"  @click="clickTeamuser">立即邀请</span>
                                </div>
                            </div>
                        </div>
                        <crollBox v-if="PersonalCenter !== 'comHome'" :isLast="isLast" @willReachBottom ="willReachBottom" >
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
        <Modal v-model="isTeamuser" width="360">
            <p slot="header" style="text-align:center">
                <span><h3>邀请队友</h3></span>
            </p>
            <div>
                <!-- 有bug -->
                <Select ref="LongRange" v-model="beinvite" filterable remote clearable :remote-method="remoteMethod1" @on-clear="clearSelect" :loading="loading1">
                    <Option v-for="(item, index) in Teammate" :value="item.UserId" :label="item.NickName"  :key="index" :disabled="item.isinvite === 1 ? true : false">
                        <div class="Teammate">
                            <span class="Teammate-HeadIcon">
                                <img v-lazy="item.HeadIcon" :alt="item.NickName">
                            </span>
                            <span class="Teammate-right">{{item.NickName}}</span>
                        </div>
                    </Option>
                </Select>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="inTeammate">确定邀请</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import HeAndIIntroduction from './HeAndIIntroduction'
    import HeAndIDownload from './HeAndIDownload'
    import mySomethingStatistical from './mySomethingStatistical'
    import { mapState , mapGetters} from 'vuex'
    import Heads from './head'
    import ToTop from '../../components/toTop'
    import crollBox from '../../components/crollBox'
    import { getTypeMeun , getFollowOrFans, ItemOperat, getItemPrice, getCompanyInfo, getQueryData, addInviteUser} from '~/service/clientAPI'
    import { _throttle } from '../../plugins/untils/public'
    import Swiper from "swiper"
    import 'swiper/dist/css/swiper.min.css'
    export default {
        layout: 'main',
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
                currentIndex: 123, // 一级高亮
                twoIndex: 0, // 二级高亮
                twoId: 0,
                itIsMe: false,
                IsFollow: true, // 粉丝加载
                currentItem: '0',
                headList: [], // 二级导航
                dataList: [],
                followList: [],
                PersonalCenter: 'comHome',
                pageNum: 1,
                menuId: 0,
                isLast: false,
                records: 0,
                total: 0,   // 总页数
                resetPriceS: {},
                rulePrice: {},
                resetValue: '',
                teamuserlist: {},
                isEnt: true, // true 公司 false 个人
                isTeamuser: false,
                beinvite: '',
                loading1: false,
                Teammate: [], // 搜索的队友
                CompanyIntro: {}
            }
        },
        computed: {
            ...mapState({
                userInfoID: state => state.overas.auth || {}
            })
        },
        async asyncData({ store, query }) {
            let id = query.id;
            let itIsMe = true;
            let getToken = store.getters
            if (getToken.isLogin) {
                id = query.id ? query.id : store.getters.getToken.UserId;
                if (query.id === '' || query.id === store.getters.getToken.UserId) {
                    itIsMe = false;
                } else {
                    itIsMe = true;
                }
            }
            let Trid = {
                "UserId": id
            }
            let tr = await store.dispatch('TribeVisiting', Trid);
            let data = await store.dispatch('getTribeInfo', id);
            let ent = await store.dispatch('isMyTribe', id);
           
            let IsEnt = 2
            if (ent) {
                IsEnt = ent
            }
            return {
                userId: id,
                IsEnt,
                itIsMe,
                tribeInfo: data
            }
        },
        created () {
            // 公司
            if (this.IsEnt === 1) {
                this.getTypeMeunList({}, 123);
                this.isEnt = true
            }
            // 个人
            if (this.IsEnt === 2) {
                this.isEnt = false
                this.currentIndex = 0;
                this.PersonalCenter = 'PersonalCenter';
                this.getTypeMeunList();
            }
            if (this.$route.query.id === undefined || this.$route.query.id === this.userInfoID.UserId) {
                this.itIsMe = false;
            }  else {
                this.itIsMe = true;
            }
        },
        watch: {
            teamuserlist: function(val) {
                if(val.length > 0) {
                    this.initSwiper()
                }
            }
        },
        methods: {
            initSwiper () {
                let swiper = new Swiper (".Swiper-nominate",{
                    slidesPerView: 4,
                    spaceBetween: 20,
                    centeredSlides: true,
                    slidesPerGroup: 1,
                    observer:true,//修改swiper自己或子元素时，自动初始化swiper
                　　 observeParents:true,//修改swiper的父元素时，自动初始化swiper
                    //使用分页器
                    paginationClickable :true,
                    pagination: {
                    　　el: '.swiper-pagination',
                        clickable: true,
                        renderBullet(index, className) {
                            return `<span class="${className} swiper-pagination-bullet-custom">${index + 1}</span>`
                        }
                    },    
                    autoplay: {
                    　　disableOnInteraction: false,  //触碰后自动切换停止
                　　}
                })
            },
            async inTeammate () {
                let queryData = {
                   beinviteId:  this.beinvite
                }
                let msg = await addInviteUser(queryData);
                if (msg) {
                    this.$Notice.success({
                        title: '邀请队友',
                        desc: '邀请成功，请等待对方同意！'
                    });
                    this.isTeamuser = false;
                }
            },
            clearSelect () {
                this.Teammate = [];
            },
            async remoteMethod1 (query) {
                if (query) {
                    this.loading1 = true;
                    let msg = await getQueryData(query)
                    if (msg) {
                        this.$set(this, 'Teammate', msg)
                    } else {
                        this.$set(this, 'Teammate', [])
                    }
                    this.loading1 = false;
                }
            },
            clickTeamuser () {
                this.isTeamuser = true;
            },
            // 获取公司首页信息
            async getCompanyData () {
                let queryData = {
                    UserId: this.userId
                }
                let msg = await getCompanyInfo(queryData);
                if (msg) {
                    this.CompanyIntro = msg;
                    this.teamuserlist = msg.teamuserlist;
                }
            },
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
                if (inx === 123) {
                    this.PersonalCenter = 'comHome'
                    this.currentIndex = inx;
                    this.getCompanyData();
                    return false
                } else {
                    this.currentIndex = inx || 0;
                    this.twoIndex = 0;
                    this.twoId = 0
                    this.pageNum = 1;
                    let queryData = {
                        typeId: inx || 0,
                        UserId: this.$route.query.id ? this.$route.query.id : this.userInfoID.UserId
                    }
                    let menuButs = await getTypeMeun(queryData);
                    if (menuButs) {
                        this.headList = menuButs.typeMenuButs;
                        this.PersonalCenter = 'HeAndIDownload';
                        this.getList(inx);
                    }
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
                    "UserId": this.$route.query.id ? this.$route.query.id : this.userInfoID.UserId
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
                    UserId: this.$route.query.id ? this.$route.query.id : this.userInfoID.UserId
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
    .comHome-content {
        padding: 10px 0 15px 20px;
    }
    .comHome-other {
        padding: 0 0 15px 20px;
        font-size: 14px;
    }
    .comHome-title {
        color: #FF3C00;
    }
    .swiper-slide-item {
        text-align: center;
    }
    .swiper-RealName {
        color: #333333;
    }
    /deep/.swiper-pagination-bullet{
        width: 18px;
        height: 18px;
        color: #fff;
    }
    /deep/.swiper-pagination-bullet-active {
        background: #FF3C00;
    }
    .Swiper-nominate {
        padding: 20px 0;
        height: 180px;
        overflow: hidden;
        position: relative;
        img {
            width: 120px;
            height: 120px;
        }
    }
    .empty-teamuserlist {
        color: #808080;
        text-align: center;
        padding: 10px 0;
        &-invitation{
            color: #FF3C00;
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
    }
    .Teammate {
        display: flex;
        &-HeadIcon {
            display: inline-block;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        &-right {
            padding-left: 10px;
            line-height: 25px;
        }
    }
    .comHome {
        background: #ffffff;
        padding: 10px 15px;
        &-teamuserlist {
            display: flex;
            justify-content: space-between;
            border-bottom: .5px solid #666;
            padding-bottom: 10px;
            &-name {
                font-size: 20px;
                font-weight: 600px;
                color: #FF3C00;
            }
            &-btn {
                background: #FF3C00;
                height: 30px;
                line-height: 25px;
                cursor: pointer;
                padding: 3px 10px;
                color: #ffffff;
                border-radius: 3px;
            }
        }
    }
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
            // overflow: hidden;
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
                text-align: center;
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
                        left: 50%;
                        top: 38px;
                        transform: translate(-50%);
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
                    left: 50%;
                    top: 38px;
                    transform: translate(-50%);
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
