<template>
    <div class="baseCard">
        <div class="baseCard-top">
            <div class="baseCard-top-img">
                <img src="http://www.pic.jzbl.com/ItemFiles/0d54bf62-e42b-460b-aab4-7e6bd1990221/d21bf365-7728-4bb3-a06e-dde38b2c7d8b/6367303797185465516606320_small.jpg" alt="">
            </div>
            <div class="baseCard-top-sub">
                <span><i class="icon iconfont icon-chakan"></i> 查看</span>
                <span><i class="icon iconfont icon-favorite"></i> 收藏</span>
            </div>
        </div>
        <div class="baseCard-footer">
            <p class="baseCard-footer-name">示范区弧形坡屋顶</p>
            <div class="baseCard-footer-user">
                <Poptip trigger="hover" width="150">
                    <div class="baseCard-footer-user-head">
                        <img src="http://www.pic.jzbl.com/ItemFiles/UserInfoImg/0e70e8ea-d343-4136-a2f8-0af82ebe7c67/1566125301_s.jpeg" alt="">
                    </div>
                    <div class="baseCard-pop" slot="content">
                        <div class="baseCard-pop-title">
                            <div class="baseCard-pop-title-box">
                                <img src="http://www.pic.jzbl.com/ItemFiles/UserInfoImg/0e70e8ea-d343-4136-a2f8-0af82ebe7c67/1566125301_s.jpeg" alt="">
                            </div>
                            <p>嘿嘿嘿</p>
                        </div>
                        <div class="baseCard-pop-con">
                            <div class="baseCard-pop-con-left">
                                <p>项目</p>
                                <p>0</p>
                            </div>
                            <div class="baseCard-pop-con-right">
                                <p>粉丝</p>
                                <p>0</p>
                            </div>
                        </div>
                        <div class="baseCard-pop-footer">
                            <span class="follow">关注</span>
                            <span>私信</span>
                        </div>
                    </div>
                </Poptip>
                <div class="baseCard-footer-user-name">
                    服务大众
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .baseCard {
        background: #ffffff;
        border: 1px solid #eaeaea;
        display: inline-block;
        border-radius: 3px;
        margin-top: 15px;
        box-shadow: none;
        transition: box-shadow .5s;
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
            &-name {
                line-height: 25px;
                font-weight: 600;
            }
            &-user {
                display: flex;
                padding-bottom: 5px;
                &-head {
                    display: inline-block;
                    cursor: pointer;
                    width: 35px;
                    height: 35px;
                    overflow: hidden;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                &-name {
                    flex: 1;
                    line-height: 35px;
                    padding-left: 10px;
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