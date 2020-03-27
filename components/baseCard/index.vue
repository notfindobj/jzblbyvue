<template>
    <div class="baseCard">
        <div class="baseCard-top">
            <div class="baseCard-top-img">
                <img src="http://www.pic1.jzbl.com/buildingcircle/2d0f0642-0f54-412a-a830-cb0b5828ce90/2020-03-25/i/1585147992421.png?x-oss-process=image/quality,q_90/resize,w_400" alt="">
            </div>
            <div class="baseCard-top-sub">
                <span><i class="icon iconfont icon-chakan"></i> 查看</span>
                <span><i class="icon iconfont icon-favorite"></i> 收藏</span>
            </div>
        </div>
        <div class="baseCard-footer">
            <div class="baseCard-footer-name">
                <span>示范区弧形坡屋顶</span>
                <span>剩余：999件</span>
            </div>
            <div class="baseCard-footer-user">
                <div class="baseCard-footer-user-num">
                    1056积分
                </div>
                <div class="baseCard-footer-user-name">
                    立即下载
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