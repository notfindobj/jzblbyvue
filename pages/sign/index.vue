<template>
    <div class="sg">
        <div class="sg-top">
            <div class="sg-top-left">
                <div class="user">
                    <img src="http://www.pic.jzbl.com/ItemFiles/UserInfoImg/4f4c16b4-8451-49de-a5ca-be1dcd5faefe/1584433935_s.gif" alt="" width="140" height="140px">
                </div>
                <div class="user-sign">
                   <div class="user-sign-name">初九</div>
                   <div class="user-sign-num">当前积分：<span class="user-sign-num-pir">32.0</span></div>
                   <div>当前积分：32.0</div>
                </div>
            </div>
            <div>
                右边
            </div>
        </div>
        <div class="exchange">
            <div class="exchange-title">
                <h2 class="exchange-title-h">积分兑换</h2>
                <p class="exchange-title-sub">建筑部落全新资源库专区，等你来发现更多惊喜！</p>
                <div class="exchange-title-con">
                    <template v-for="item in 8">
                        <baseCard :key="item"/>
                    </template>
                </div>
            </div>
        </div>
        <div class="exchange">
            <div class="exchange-title">
                <h2 class="exchange-title-h">积分抽奖</h2>
                <p class="exchange-title-sub">建筑部落APP积分抽奖100%有奖，卷尺工具及实物书籍等你来拿！</p>
                <div class="exchange-title-con">
                    <luckDraw class="luckDraw"/>
                    <div class="record">
                        <ul class="record-ul">
                            <li>
                                <span>初九</span>
                                <span>2小时前</span>
                                <span>抽中美女一个</span>
                            </li>
                            <li>
                                <span>初九</span>
                                <span>2小时前</span>
                                <span>抽中美女一个</span>
                            </li>
                            <li>
                                <span>初九</span>
                                <span>2小时前</span>
                                <span>抽中美女一个</span>
                            </li>
                            <li>
                                <span>初九</span>
                                <span>2小时前</span>
                                <span>抽中美女一个</span>
                            </li>
                            <li>
                                <span>初九</span>
                                <span>2小时前</span>
                                <span>抽中美女一个</span>
                            </li>
                            <li>
                                <span>初九</span>
                                <span>2小时前</span>
                                <span>抽中美女一个</span>
                            </li>
                            <li>
                                <span>初九</span>
                                <span>2小时前</span>
                                <span>抽中美女一个</span>
                            </li>
                            <li>
                                <span>初九</span>
                                <span>2小时前</span>
                                <span>抽中美女一个</span>
                            </li>
                            <li>
                                <span>初九</span>
                                <span>2小时前</span>
                                <span>抽中美女一个</span>
                            </li>
                            <li>
                                <span>初九</span>
                                <span>2小时前</span>
                                <span>抽中美女一个</span>
                            </li>
                            <li>
                                <span>初九</span>
                                <span>2小时前</span>
                                <span>抽中美女一个</span>
                            </li>
                            <li>
                                <span>初九</span>
                                <span>2小时前</span>
                                <span>抽中美女一个</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="rule">
            <div class="rule-left">
                <p class="rule-left-title">
                    <span>公告</span>
                    <span>更多》</span>
                </p>
                <ul class="rule-left-content">
                    <li>
                        <div>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落增套餐说明</span>
                        </div>
                        <span>2020-3-25</span>
                    </li>
                    <li>
                        <div>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落增套餐说明</span>
                        </div>
                        <span>2020-3-25</span>
                    </li>
                    <li>
                        <div>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落增套餐说明</span>
                        </div>
                        <span>2020-3-25</span>
                    </li>
                    <li>
                        <div>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落增套餐说明</span>
                        </div>
                        <span>2020-3-25</span>
                    </li>
                    <li>
                        <div>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落增套餐说明</span>
                        </div>
                        <span>2020-3-25</span>
                    </li>
                    <li>
                        <div>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落增套餐说明</span>
                        </div>
                        <span>2020-3-25</span>
                    </li>
                     <li>
                        <div>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落增套餐说明</span>
                        </div>
                        <span>2020-3-25</span>
                    </li>
                </ul>
            </div>
            <div class="rule-right">
                <p class="rule-right-title">
                    <span>规则协议</span>
                    <span>更多》</span>
                </p>
                <ul class="rule-right-content">
                    <li>
                        <span>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落上传审核标准</span>
                        </span>
                        <span>2020-3-25</span>
                    </li>
                    <li>
                        <span>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落上传审核标准</span>
                        </span>
                        <span>2020-3-25</span>
                    </li>
                    <li>
                        <span>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落上传审核标准</span>
                        </span>
                        <span>2020-3-25</span>
                    </li>

                    <li>
                        <span>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落上传审核标准</span>
                        </span>
                        <span>2020-3-25</span>
                    </li>
                    <li>
                        <span>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落上传审核标准</span>
                        </span>
                        <span>2020-3-25</span>
                    </li>
                    <li>
                        <span>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落上传审核标准</span>
                        </span>
                        <span>2020-3-25</span>
                    </li>
                    <li>
                        <span>
                            <span class="roof">置顶</span>
                            <span>关于建筑部落上传审核标准</span>
                        </span>
                        <span>2020-3-25</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import baseCard from '../../components/baseCard'
export default {
    layout: "main",
    components: {
        baseCard
    },
    data () {
        return {}
    }
}
</script>
<style lang="less" scoped>
    .sg {
        width: 1200px;
        margin: 0 auto;
        color: #333;
        &-top {
            display: flex;
            height: 200px;
            background: #fff;
            padding: 30px 30px;
            &-left,&-right {
                width: 600px;
            }
        }
    }
    .user {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        float: left;
        overflow: hidden;
    }
    .user-sign {
        float: right;
        width: 440px;
        &-name {
            font-size: 20px;
            font-weight: bold;
        }
        &-num {
            line-height: 30px;
            font-size: 12px;
            &-pir {
                font-size: 14px;
                font-weight: bold;
                color: #ff3c00;
                margin-top: 10px;
            }
        }
    }
    .exchange {
        margin-top: 15px;
        &-title {
            text-align: center;
            padding-bottom: 20px;
            &-h {
                text-align: center;
                position: relative;
                display: inline-block;
                &::before {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 7px;
                    background: url(../../assets/images/zuo.png) no-repeat;
                    width: 26px;
                    height: 14px;
                    left: -40px;
                }
                &::after {
                    content: "";
                    display: block;
                    position: absolute;
                    top: 7px;
                    background: url(../../assets/images/you.png) no-repeat;
                    width: 26px;
                    height: 14px;
                    right: -40px;
                }
            }
            &-sub {
                line-height: 24px;
                font-size: 14px;
            }
            &-con {
                margin-top: 15px;
                justify-content: space-between;
                display: flex;
                flex-wrap: wrap;
                background: #fff;
                padding: 20px 10px 30px;
            }
        }
    }
    .luckDraw {
        margin: 60px 0 0 70px;
    }
    .record {
        width: 500px;
        height: 520px;
        background: url(/_nuxt/assets/images/zj-bg1.png) no-repeat 50% 90%;
        text-align: center;
        &-ul {
            color: #000;
            width: 330px;
            display: inline-block;
            margin-top: 80px;
            li {
                line-height: 35px;
                display: flex;
                justify-content: space-between;
                padding: 0 20px;
                span {
                    &:last-child {
                        color: #ff3c00;
                    }
                }
            }
        }
    }
    .roof {
        display: inline-block;
        padding: 0 6px;
        background: #fc4d5a;
        color: #fff;
        font-size: 12px;
        margin-right: 6px;
        margin-top: 3px;
        border-radius: 2px;
    }
    .rule {
       
        display: flex;
        justify-content: space-between;
        &-right {
            float: right;
        }
        &-left {
            float: left;
        }
        &-left, &-right {
            width: 590px;
            padding: 20px;
            background: #fff;
            &-title {
                display: flex;
                justify-content: space-between;
                line-height: 30px;
            }
            &-content {
                li {
                    line-height: 30px;
                    border-bottom: 1px dashed #ddd;
                    padding: 10px;
                    cursor: pointer;
                    display: flex;
                    font-size: 14px;
                    justify-content: space-between;
                    &:hover {
                        color: #ff3c00;
                    }
                    &:last-child {
                        border: none;
                    }
                }
            }
        }
    }
</style>