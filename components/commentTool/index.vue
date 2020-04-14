<template>
    <div class="com">
        <div class="com-one" v-if="isTopInput">
            <comment :emotionRows='1' v-model="commentVlaue" @commentValue="setCommentsData(itemInfo)"/>
        </div>
        <template v-if="comments && comments.length > 0" v-for="(item, index) in comments" >
            <div class="comment" :key="index" v-if="index < viewMore">
                <div class="comment-left">
                    <Poptip trigger="hover" transfer  width="80" popper-class="popper-box" @on-popper-show="popperShow(item.UserId)">
                        <span @click="jumpPersonal(item.UserId)">
                            <img :src="item.HeadIcon" alt="">
                        </span>
                        <div slot="content">
                            <div class="block">
                                <div class="block-title">
                                    <div>
                                        <p>项目</p>
                                        <p>{{userPF.proCount || 0}}</p>
                                    </div>
                                    <div>
                                        <p>粉丝</p>
                                        <p>{{userPF.Fans || 0}}</p>
                                    </div>
                                </div>
                                <div class="block-foot">
                                    <span v-if="item.IsDeleteBtn" class="block-foot-unfollow">已关注</span>
                                    <span v-else :class="userPF.IsFollow ?'block-foot-unfollow': 'block-foot-follow'" @click="setFollowPop(item.UserId)">{{userPF.IsFollow ? '已关注': '关注'}}</span>
                                    <span class="block-foot-private">私信</span>
                                </div>
                            </div>
                            <Spin v-if="popperSpin" fix>
                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                <div>Loading</div>
                            </Spin>
                        </div>
                    </Poptip>
                </div>
                <div class="comment-right">
                    <div class="comment-right-title">
                        <Poptip trigger="hover" transfer  width="100" popper-class="popper-box" @on-popper-show="popperShow(item.UserId)">
                            <span class="comment-right-title-name" @click="jumpPersonal(item.UserId)">{{item.NickName}}</span>
                            <div slot="content">
                                <div class="block" >
                                    <div class="block-title">
                                        <div>
                                            <p>项目</p>
                                            <p>{{userPF.proCount || 0}}</p>
                                        </div>
                                        <div>
                                            <p>粉丝</p>
                                            <p>{{userPF.Fans || 0}}</p>
                                        </div>
                                    </div>
                                    <div class="block-foot">
                                        <span v-if="item.IsDeleteBtn" class="block-foot-unfollow">已关注</span>
                                        <span v-else :class="userPF.IsFollow ?'block-foot-unfollow': 'block-foot-follow'" @click="setFollowPop(item.UserId)">{{userPF.IsFollow ? '已关注': '关注'}}</span>
                                        <span class="block-foot-private">私信</span>
                                    </div>
                                </div>
                                <Spin v-if="popperSpin" fix>
                                    <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                    <div>Loading</div>
                                </Spin>
                            </div>
                        </Poptip>
                        <span>:</span>
                        <emotHtml v-model="item.Message"/>
                    </div>
                    <div class="comment-right-tool">
                        <div> 
                            <span>{{item.CreateDate | timestamp}}</span>
                        </div>
                        <div class="comment-right-tool-btn">
                            <Poptip
                                confirm
                                title="确认删除此消息吗?"
                                @on-ok="delComments(item)">
                                <span v-if="item.IsDeleteBtn" class="tool-btn-del">删除</span>
                            </Poptip>
                            <span class="tool-btn-reply" @click="mainDiscuss(index + item.CommentsId)">回复</span>
                            <span @click="clickLike(item)" :style="`color:${item.islikes ? '#ff3c00' : ''}`">
                                <i class="icon iconfont icon-dianzan"></i>
                                {{item.LikeCount > 0 ? item.LikeCount : '赞'}}
                            </span>
                        </div>
                    </div>
                    <comment v-if="mainDis === (index + item.CommentsId)"  btnText="回复" :placeholder="`回复：@${item.NickName}`" v-model="item.commentOne" :emotionRows='1' @commentValue="setCommentsData(itemInfo, item)"/>
                    <div v-if="item.ReplyList && item.ReplyList.length > 0" class="comment comment-two" v-for="(items, subindex) in item.ReplyList" :key="subindex+ item.CommentsId">
                        <div class="comment-right borderBottom">
                            <div class="comment-right-title">
                                <Poptip trigger="hover" transfer  width="100" popper-class="popper-box" @on-popper-show="popperShow(items.UserId)">
                                    <span class="comment-right-title-name" @click="jumpPersonal(items.UserId)">{{items.NickName}}</span>
                                    <div slot="content">
                                        <div class="block">
                                            <div class="block-title">
                                                <div>
                                                    <p>项目</p>
                                                    <p>{{userPF.proCount || 0}}</p>
                                                </div>
                                                <div>
                                                    <p>粉丝</p>
                                                    <p>{{userPF.Fans || 0}}</p>
                                                </div>
                                            </div>
                                            <div class="block-foot">
                                                <span v-if="items.IsDeleteBtn" class="block-foot-unfollow">已关注</span>
                                                <span v-else :class="userPF.IsFollow ?'block-foot-unfollow': 'block-foot-follow'" @click="setFollowPop(items.ReplyId)">{{userPF.IsFollow ? '已关注': '关注'}}</span>
                                                <span class="block-foot-private">私信</span>
                                            </div>
                                        </div>
                                        <Spin v-if="popperSpin" fix>
                                            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                            <div>Loading</div>
                                        </Spin>
                                    </div>
                                </Poptip>
                                <span>:</span>
                                <span>回复
                                    <Poptip trigger="hover" transfer  width="100" popper-class="popper-box" @on-popper-show="popperShow(items.ReplyUserId)">
                                        <span class="ReplyUserName" @click="jumpPersonal(items.ReplyUserId)">@{{items.ReplyUserName}}</span>
                                        <div slot="content">
                                            <div class="block">
                                                <div class="block-title">
                                                    <div>
                                                        <p>项目</p>
                                                        <p>{{userPF.proCount || 0}}</p>
                                                    </div>
                                                    <div>
                                                        <p>粉丝</p>
                                                        <p>{{userPF.Fans || 0}}</p>
                                                    </div>
                                                </div>
                                                <div class="block-foot">
                                                    <span :class="userPF.IsFollow ?'block-foot-unfollow': 'block-foot-follow'" @click="setFollowPop(items.ReplyUserId)">{{userPF.IsFollow ? '已关注': '关注'}}</span>
                                                    <span class="block-foot-private">私信</span>
                                                </div>
                                            </div>
                                            <Spin v-if="popperSpin" fix>
                                                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                                                <div>Loading</div>
                                            </Spin>
                                        </div>
                                    </Poptip>
                                : </span> 
                                <emotHtml v-model="items.Message"/>
                            </div>
                            <comment :emotionRows='1' v-if="subDis === (subindex + items.CommentsId)" btnText="回复" :placeholder="`回复：@${items.NickName}`" v-model="items.commentTwo" @commentValue="setCommentsData(itemInfo, item, items)"/>
                            <div class="comment-right-tool">
                                <div> 
                                    <span>{{items.CreateDate | timestamp}}</span>
                                </div>
                                <div class="comment-right-tool-btn">
                                    <Poptip
                                        confirm
                                        title="确认删除此消息吗?"
                                        @on-ok="delComments(items)">
                                            <span v-if="items.IsDeleteBtn" class="tool-btn-del">
                                            删除
                                            </span>
                                    </Poptip>
                                    <span class="tool-btn-reply" @click="subDiscuss(subindex + items.CommentsId)">
                                        回复
                                    </span>
                                    <span @click="clickLike(items, item)" :style="`color:${items.islikes ? '#ff3c00' : ''}`">
                                        <i class="icon iconfont icon-dianzan"></i>
                                        {{items.LikeCount > 0 ? items.LikeCount : '赞'}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <div class="view-more" v-if="comments && comments.length > viewMore">
            <span @click="JumpDetails(itemInfo)">查看更多 <i class="icon iconfont icon-jiantouxia"></i> </span>
        </div>
        <Spin v-if="isSpin" fix>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>
<script>
import comment from '../comment'
import {analogJump} from '../../plugins/untils/public'
import {setComments, setthumbsUp, getComments, delComment, getUserProAndFans, setFollow} from '../../service/clientAPI'
import { mapGetters} from 'vuex'
export default {
    name: 'commentTool',
    props: {
        itemInfo: {
            type: Object,
            default: function () {
                return {}
            }
        },
        isTopInput: {
            type: Boolean,
            default: true
        },
        viewMore: {
            type: Number,
            default: 100000000
        },
        firstLoading: {
            type: Boolean,
            default: false
        }
    },
    computed: {
      ...mapGetters(['isLogin']),
    },
    components: {
        comment
    },
    data () {
        return {
            // subDiscuss: [],
            mainDis: '',
            subDis: '',
            comments: [],
            commentVlaue: '',
            commentOne: '',
            commentTwo: '',
            isSpin: false,
            userPF: {},
            popperSpin: false,
        }
    },
    mounted() {
        if (this.firstLoading) {
            this.getCommentsList()
        }
    },
    methods: {
        // 跳转个人中心
        jumpPersonal  (id) {
            let routeData = this.$router.resolve({ name: 'HeAndITribal-id', query: {id:id} });
            analogJump(routeData.href);
        },
        // 跳转详情
        JumpDetails (item) {
            let routeData = {}
            let showLayout = true;
            switch (item.TalkType) {
                case 0:
                    let showLayout = true 
                    if (row.TypeName === '文本' || row.TypeName === '建筑规范') {
                        showLayout = false
                    } else {
                        showLayout = true
                    }
                    routeData = this.$router.resolve({
                        name: 'DataDetails',
                        query: {id: item.ItemId, layout: showLayout }
                    })
                    break;
                case 1:
                    routeData = this.$router.resolve({
                        name: 'pictureDetails-id',
                        params: {id: item.ItemId }
                    })
                    break;
                case 2:
                    routeData = this.$router.resolve({
                        name: 'videoDetails-id',
                        params: {id: item.ItemId }
                    })
                    break;
               
                case 3:
                    routeData = this.$router.resolve({
                        name: 'QuestionsAndAnswers-id',
                        params: {id: item.ItemId }
                    })
                    break;
                case 4:
                    if (row.TypeName === '文本' || row.TypeName === '建筑规范') {
                        showLayout = false
                    } else {
                        showLayout = true
                    }
                    routeData = this.$router.resolve({
                        name: 'DataDetails',
                        query: {id: item.ItemId, layout: showLayout }
                    })
                    break;
                case 5:
                    routeData = this.$router.resolve({
                        name: 'pictureDetails-id',
                        params: {id: item.ItemId }
                    })
                    break;
            }
            analogJump(routeData.href);
        },
        // 获取评论
        async getCommentsList () {
            this.isSpin = true
            let ScopeType= 0
            switch (this.itemInfo.TalkType) {
                case 0:
                    ScopeType = 0
                    break;
                case 1:
                    ScopeType = 1
                    break;
                case 2:
                    ScopeType = 2
                    break;
                case 4:
                    ScopeType = 0
                    break;
                case 3:
                    ScopeType = 3
                    break;
                case 5:
                    ScopeType = 5
                    break;
                default:
                    ScopeType = 2
                    break;
            }
            // 兼容项目详情
            if (this.itemInfo.TalkType === undefined) {
                ScopeType = 0
            }
            let queryData ={
                ItemId: this.itemInfo.ItemId,
                ItemImgSrc: "",
                ScopeType: ScopeType
            }
            let msg = await getComments(queryData);
            if (msg) {
                this.comments = msg.Comments;
                this.isSpin = false
            }
        },
        // 评论
        async setCommentsData (item, user, reply, externalVla) {
            if (!this.isLogin) {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
                return false
            }
            let ScopeType= 0
            switch (this.itemInfo.TalkType) {
                case 0:
                    ScopeType = 0
                    break;
                case 1:
                    ScopeType = 1
                    break;
                case 2:
                    ScopeType = 2
                    break;
                case 4:
                    ScopeType = 0
                    break;
                case 3:
                    ScopeType = 3
                    break;
                case 5:
                    ScopeType = 5
                    break;
                default:
                    ScopeType = 2
                    break;
            }
            // 兼容项目详情
            if (this.itemInfo.TalkType === undefined) {
                ScopeType = 0
            }
            let content = this.commentVlaue
            let Reply = {}
            let ReplyUser = {}
            let IsReply = false
            if (user) {
                IsReply = true
                Reply = user
                ReplyUser = user
                content = user.commentOne
            }
            if (reply) {
                ReplyUser = reply
                IsReply = true
                content = reply.commentTwo;
            }
            // 外部传来的内容 主要是详情
            if (externalVla) {
                content = externalVla
            }
            let queryData = {
                ItemId: this.itemInfo.ItemId,
                ReplyId: Reply ? Reply.CommentsId : '',
                ReplyUserId: ReplyUser ? ReplyUser.UserId : '',
                IsReply: IsReply,
                Message: content,
                ItemImgSrc: "",
                ScopeType: ScopeType
            }
            let msg = await setComments(queryData)
            if (msg) {
                this.$emit('SucCommentsData', 1)
                this.getCommentsList();
            } else {
                this.$emit('SucCommentsData', false)
            }
        },
        mainDiscuss (val) {
            this.mainDis = this.mainDis === val ? '' : val
        },
        subDiscuss (val) {
            this.subDis =  this.subDis === val ? '' : val
        },
        // 点赞
        async clickLike(row) {
            if (!this.isLogin) {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
                return false
            }
            if (!row.IsCoutReply) {
                let queryData = {
                    ItemId: this.itemInfo.ItemId,
                    LikeType: 0,
                    CommentsId: row.CommentsId,
                    IsDelete: row.islikes
                }
               let msg = await setthumbsUp(queryData)
               if (msg) {
                   if (!row.islikes) {
                       this.$set(row, 'LikeCount', row.LikeCount + 1)
                       
                   } else {
                       this.$set(row, 'LikeCount', row.LikeCount - 1)
                   }
                   this.$set(row, 'islikes', !row.islikes)
               }
            } else {
                this.$Message.warning('不能给自己点赞哦！');
                return false;
            }
        },
        // 确定是否删除
        async delComments (row) {
            if (!this.isLogin) {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
                return false
            }
            let msg = await delComment(row.CommentsId)
            if (msg) {
                this.$emit('SucCommentsData', -1)
                this.getCommentsList();
            }
        },
        // 获取项目和粉丝量
        async popperShow (id) {
            if (!id) {
                this.$Message.error('用户ID为空！');
                return false;
            }
            this.popperSpin = true
            let msg = await getUserProAndFans(id)
            if (msg) {
                this.userPF = msg;
                this.popperSpin = false;
            }
        },
        // 关注 
        async setFollowPop(id) {
            if (!this.isLogin) {
                this.$store.dispatch('SETUP', true);
                this.$store.dispatch('LOGGEDIN', 'signIn');
                return false
            }
            let queryData = {
                UserId: id,
                IsDelete: this.userPF.IsFollow
            }
            let msg = await setFollow(queryData)
            if (msg) {
                this.$set(this.userPF, 'IsFollow', !this.userPF.IsFollow)
            }
        },
    }
}
</script>
<style lang="less" scoped>
    .block {
        &-title {
            display: flex;
            justify-content: space-between;
            p {
                text-align: center;
            }
        }
        &-foot {
            display: flex;
            justify-content: space-between;
            &-follow {
                cursor: pointer;
                background: #FF3C00;
                color: #ffffff;
                padding: 2px 5px;
                border-radius: 3px;
            } 
            &-unfollow {
                cursor: pointer;
                background: #b0b0b0;
                color: #ffffff;
                padding: 2px 5px;
                border-radius: 3px;
            }
            &-private{
                cursor: pointer;
                border: 1px solid #dddddd;
                color: #666666;
                padding: 2px 5px;
                border-radius: 3px;
            }
        }
    }
    .view-more {
        text-align: center;
        color: #ff3c00;
        span {
            margin-bottom: 10px;
            cursor: pointer;
            display: inline-block;
        }
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    .com {
        background: #fff;
        position: relative;
        &-one {
            background: #fafbfc;
            padding: 8px 10px 0;
        }
    }
    .ReplyUserName {
        margin-left: 5px;
        cursor: pointer;
        color: #ff3c00;
    }
    .borderBottom {
        border-bottom: 1px solid #f1f1f1;
    }
    .comment-two {
        background: #fafbfc !important;
    }
    .comment {
        display: flex;
        font-size: 14px;
        justify-content: space-between;
        padding: 8px 10px;
        &-left {
            position: relative;
            span {
                display: inline-block;
                overflow: hidden;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                cursor: pointer;
                img {
                    width: 100%;
                    height: 100%;
                }
            }

        }
        &-right {
            width: 100%;
            padding: 0 0 0 10px;
            &-title {
                line-height: 25px;
                &-name {
                    color: #ff3c00;
                    cursor: pointer;
                }
            }
            &-tool {
                font-size: 12px;
                color: #8a9aa9;
                display: flex;
                justify-content: space-between;
                line-height: 20px;
                padding-bottom: 5px;
                .tool-btn-del {
                    cursor: pointer;
                    display: none;
                }
                &:hover .tool-btn-del {
                    display: inline-block       ;
                }
                &-btn {
                    cursor: pointer;
                    .tool-btn-reply {
                        margin-right: 10px;
                    }
                }
            }
            .comment-two:last-child {
                .borderBottom {
                    border-bottom: 1px solid transparent;
                }
            }
        }
    }
</style>
