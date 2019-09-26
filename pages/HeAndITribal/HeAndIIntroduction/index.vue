<template>
    <div class="he-and-i-introduction">
        <ul class="he-and-i-introduction-top">
            <li @click="change(0, userInfo.DataCounts.Fol)" :class="currentIndex === 0 ? 'li-active' : ''">
                <p class="item-count" v-if="userInfo.DataCounts">{{ userInfo.DataCounts.Fol }}</p>
                <p class="item-name">关注</p>
            </li>
            <li @click="change(1, userInfo.DataCounts.Fan)" :class="currentIndex === 1 ? 'li-active' : ''">
                <p class="item-count" v-if="userInfo.DataCounts">{{ userInfo.DataCounts.Fan }}</p>
                <p class="item-name">粉丝</p>
            </li>
            <li @click="change(2, userInfo.DataCounts.Pro)" :class="currentIndex === 2 ? 'li-active' : ''">
                <p class="item-count" v-if="userInfo.DataCounts">{{ userInfo.DataCounts.Pro }}</p>
                <p class="item-name">项目</p>
            </li>
            <li>
                <p class="item-count" v-if="userInfo.DataCounts">{{ userInfo.DataCounts.Pop }}</p>
                <p class="item-name">人气</p>
            </li>
        </ul>
        <div class="he-and-i-introduction-center">
            <h5 class="he-and-i-introduction-center-title">
                <span class="title-name">资料简介</span>
                <span class="edit-my-introduction" @click="enterCenter" v-if="userInfo.IsEdit">编辑个人资料></span>
            </h5>
            <!-- 个人显示 -->
            <ul class="my-introduction-list" v-if="userInfo.userTypes && userInfo.userTypes.UserType === 2">
                <li>
                    <i class="icon iconfont"></i>
                    <span class="list-name">电话：</span>
                    <span class="list-con">{{userInfo.Mobile}}</span>
                </li>
                <li>
                    <i class="icon iconfont"></i>
                    <span class="list-name">擅长：</span>
                    <span class="list-con">{{userInfo.Expertise}}</span>
                </li>
                <li>
                    <i class="icon iconfont"></i>
                    <span class="list-name">工龄：</span>
                    <span class="list-con">{{userInfo.Birthday}}</span>
                </li>
                <li>
                    <i class="icon iconfont"></i>
                    <span class="list-name">所在地：</span>
                    <span class="list-con">{{userInfo.Location}}</span>
                </li>
            </ul>
            <!-- 公司显示 -->
            <ul class="my-introduction-list" v-else>
                <li>
                    <i class="icon iconfont"></i>
                    <span class="list-name">名称：</span>
                    <span class="list-con">{{userInfo.NickName}}</span>
                </li>
                <li>
                    <i class="icon iconfont"></i>
                    <span class="list-name">地址：</span>
                    <span class="list-con">{{userInfo.Birthday}}</span>
                </li>
                <li>
                    <i class="icon iconfont"></i>
                    <span class="list-name">电话：</span>
                    <span class="list-con">{{userInfo.Expertise}}</span>
                </li>
                 <li>
                    <i class="icon iconfont"></i>
                    <span class="list-name">擅长：</span>
                    <span class="list-con">{{userInfo.Expertise}}</span>
                </li>
            </ul>
            <p class="look-more" @click="enterCenter">查看更多 ></p>
        </div>
        <div class="he-and-i-introduction-bottom">
            <h5 class="he-and-i-introduction-bottom-title">
                <span class="title-name">最近访客</span>
            </h5>
            <ul class="he-and-i-introduction-bottom-list">
                <li v-for="item in userInfo.TribeVisit" @click="jumpRoute(item)" :key="item.UserId" :title="item.NickName">
                    <img  :src="item.HeadIcon " alt="用户头像">
                    <p>{{item.NickName}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'HeAndIIntroduction',
    props: {
      userInfo: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        currentIndex: -1
      }
    },
    methods: {
        enterCenter () {
            let routeData = this.$router.resolve({ name: 'PersonalCenter-myMessage-userId', params: { userId: this.userInfo.UserId} });
            window.open(routeData.href, '_blank');
        },
        change(inx, count) {
            this.currentIndex = inx;
            this.$emit('changeComponents', inx, count)
        },
        // 路由跳转
        jumpRoute(items) {
            if (!items.UserId) {
                this.$Message.error('用户ID为空！');
                return false;
            }
            let routeData = this.$router.resolve({ name: 'HeAndITribal-id', query: { id: items.UserId } });
            window.open(routeData.href, '_blank');
        },
        seeMore () {
            this.$emit('seeMore')
        }
      
    }
  }
</script>
<style lang="less" scoped>
    .he-and-i-introduction {
        width: 100%;
        height: auto;
        position: sticky;
        top: 110px;
        &-top {
            height: 66px;
            padding: 10px 0;
            background: #ffffff;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.15);
            margin-bottom: 16px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            > li {
                flex: 1;
                position: relative;
                cursor: pointer;

                .item-count {
                    line-height: 25px;
                    font-size: 18px;
                    text-align: center;
                    color: #333333;
                    margin-bottom: 5px;
                }

                .item-name {
                    line-height: 17px;
                    font-size: 12px;
                    color: #666666;
                    text-align: center;
                }

                &:after {
                    width: 1px;
                    height: 46px;
                    content: '';
                    background: #D8D8D8;
                    position: absolute;
                    right: 0;
                    top: 0px;
                }

                &:last-child {
                    &:after {
                        display: none;
                    }
                }
            }

            .li-active {
                .item-count {
                    color: #FF3C00;
                }

                .item-name {
                    color: #FF3C00;
                }
            }
        }

        &-center {
            height: 200px;
            background: #ffffff;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.15);
            margin-bottom: 16px;

            &-title {
                height: 40px;
                padding: 0 15px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                line-height: 39px;
                border-bottom: 1px solid #D8D8D8;

                .title-name {
                    font-size: 14px;
                    color: #333333;
                }
                .edit-my-introduction {
                    cursor: pointer;
                    font-size: 12px;
                    color: #FF3C00;
                    font-weight: normal;
                }
            }
            .my-introduction-list {
                padding: 15px 15px 5px;

                > li {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: flex-start;
                    margin-bottom: 10px;

                    > i {
                        font-size: 12px;
                        margin-right: 5px;
                    }

                    .list-name {
                        width: 48px;
                        font-size: 12px;
                        color: #666666;
                        text-align: right;
                        margin-right: 5px;
                    }

                    .list-con {
                        font-size: 12px;
                        color: #333333;
                    }
                }
            }
            .look-more {
                cursor: pointer;
                line-height: 17px;
                text-align: center;
                font-size: 12px;
                color: #999999;
                &:hover {
                    color: #FF3C00;
                }
            }
        }

        &-bottom {
            background: #ffffff;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.15);

            &-title {
                height: 40px;
                padding: 0 15px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                box-sizing: border-box;
                line-height: 39px;
                border-bottom: 1px solid #D8D8D8;

                .title-name {
                    font-size: 14px;
                    color: #333333;
                }

                .edit-my-introduction {
                    font-size: 12px;
                    color: #FF3C00;
                    font-weight: normal;
                }

            }

            &-list {
                width: 100%;
                height: auto;
                padding: 15px;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                justify-content: flex-start;
                > li {
                    width: 50px;
                    height: 75px;
                    margin-right: 22px;
                    margin-bottom: 16px;
                    cursor: pointer;
                    > img {
                        display: inline-block;
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        margin-bottom: 6px;
                    }
                    > p {
                        text-align: center;
                        font-size: 12px;
                        color: #333333;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    &:nth-child(4n) {
                        margin-right: 0;
                    }
                }
            }
        }
    }
</style>
