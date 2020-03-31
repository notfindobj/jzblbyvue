<template>
    <div class="baseCard">
        <div class="baseCard-top">
            <div class="baseCard-top-img">
                <nuxt-link target="_blank" :to="{name: 'DataDetails', query: {id:item.ItemId, layout: true}}">
                    <img :src="item.ItemTitleImg" alt="礼物">
                </nuxt-link>
            </div>
            <!-- <div class="baseCard-top-sub">
                <span><i class="icon iconfont icon-chakan"></i> 查看</span>
                <span><i class="icon iconfont icon-favorite"></i> 收藏</span>
            </div> -->
        </div>
        <div class="baseCard-footer">
            <div class="baseCard-footer-name">
                <span>{{item.ItemName}}</span>
                <span>剩余：{{item.Stock}}件</span>
            </div>
            <div class="baseCard-footer-time">
                <span>兑换时间:</span>
                <span>{{item.StartDate | datefmt('YYYY-MM-DD')}}---{{item.EndDate | datefmt('YYYY-MM-DD')}}</span>
            </div>
            <div class="baseCard-footer-user">
                <div class="baseCard-footer-user-num">
                    {{item.Integral}}积分
                </div>
                <div class="baseCard-footer-user-name" v-if="!item.isExchange"  @click="exchangeItems(item)">立即下载</div>
                <div class="baseCard-footer-user-nameun" v-if="item.isExchange">立即下载</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => {}
        }
    },
    methods: {
        exchangeItems (row) {
            this.$emit("exchangeItems", row)
        }
    }
}
</script>
<style lang="less" scoped>
    .baseCard {
        background: #ffffff;
        border: 1px solid #eaeaea;
        display: inline-block;
        border-radius: 3px;
        margin-top: 15px;
        box-shadow: none;
        transition: box-shadow .5s;
        width: 290px;
        &-top {
            position: relative;
            cursor: pointer;
            overflow: hidden;
            &-img {
                width: 280px;
                height: 200px;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                    transform: scale(1);
                    transition: transform .5s;
                }
            }
            &-sub {
                width: 100%;
                position: absolute;
                color: #ffffff;
                bottom: -30px;
                transition: bottom .5s;
                display: flex;
                justify-content: space-between;
                padding: 0 15px;
                height: 25px;
                line-height: 25px;
                background: rgba(0,0,0,.6);
                span {
                    cursor: pointer;
                }
            }
        }
        &-footer {
            padding: 0 10px;
            &-time {
                display: flex;
                justify-content: space-between;
                color: #929292;
                line-height: 30px;
            }
            &-name {
                line-height: 25px;
                font-weight: 600;
                display: flex;
                justify-content: space-between;
                span {
                    &:last-child {
                        color: #929292;
                    }
                }
            }
            &-user {
                padding-bottom: 5px;
                display: flex;
                justify-content: space-between;
                &-head {
                    display: inline-block;
                    cursor: pointer;
                    width: 35px;
                    height: 35px;
                    overflow: hidden;
                }
                &-num {
                    line-height: 35px;
                    color: #ff3c00;
                    font-weight: bold;
                    font-size: 15px;
                }
                &-name {
                    cursor: pointer;
                    display: inline-block;
                    color: #ff3c00;
                    padding: 3px 6px;
                    border-radius: 3px;
                    margin: 5px 0;
                    border: 1px solid #dd3c00;
                    &:hover {
                        color: #fff;
                        background: #ff3c00;
                    }
                }
                &-nameun {
                    cursor: pointer;
                    display: inline-block;
                    color: #ff3c00;
                    padding: 3px 6px;
                    border-radius: 3px;
                    margin: 5px 0;
                    background: #ddd;
                    color: #fff;
                    cursor: no-drop;
                }
            }
        }
        &-pop {
            &-title {
                text-align: center;
                &-box {
                    display: inline-block;
                    height: 55px;
                    width: 55px;
                    overflow: hidden;
                    cursor: pointer;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            &-con {
                display: flex;
                justify-content: space-around;
                text-align: center;
                margin: 10px 0;
                &-left, &-right {
                    p{
                        &:first-child {
                            color: #999999;
                        }
                    }
                }
            }
            &-footer {
                display: flex;
                justify-content: space-around;
                text-align: center;
                span {
                    border: 1px solid #e2e2e2;
                    padding: 3px 10px;
                    border-radius: 3px;
                    cursor: pointer;
                }
            }
        }
        &:hover &-top-sub {
            bottom: 0;
            transition: bottom .5s;
        }
        &:hover &-top-img > img{
            transition: transform .5s;
            transform: scale(1.2);
        }
        &:hover {
            transition: box-shadow .5s;
            box-shadow: 0 2px 15px #999999;
        }
    }
    .follow {
        background: #ff3c00;
        color: #ffffff;
    }
    .unfollow {
        background: #b0b0b0;
        color: #ffffff;
    }
</style>