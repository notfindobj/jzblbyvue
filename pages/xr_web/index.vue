<template>
    <div class="xr">
        <div class="xr-box">
            <div class="xr-box-top">
               <div class="xr-box-top-left">充值账号：</div>
               <div>{{Identity.NickName}}</div>
            </div>
            <div class="xr-box-content">
                <div class="xr-box-content-left">充值套餐：</div>
               <div class="tc">
                    <ul>
                        <li :class="priceIndex === index ? 'active-price':'active-un'" v-for="(items, index) in priceList" :key="index" @click="setMeal(items, index)" >
                            <div class="price">
                                <p>￥{{items.Money}}</p>
                                <span>{{sumMeal(items)}}</span>
                            </div>
                            <div >
                                <p class="package-source">我选择：</p>
                                <RadioGroup @click.native.stop="" v-model="items.packageSource">
                                    <Radio v-for="(item, indexs) in items.radio" :key="indexs" :label="item.value">{{item.label}}</Radio>
                                </RadioGroup>
                                <div class="discount">
                                    <span>{{items.Discount}}折</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="warm">
                        小贴示：部落币全站通用，每天签到可得积分，积分可转换成部落币使用，部落币不能转换为积分（10积分 = 1部落币）。
                    </div>
                    <div class="pay">
                        <span class="pay-btn" @click="paymShow = true"><i class="pay-btn-icon"></i> 付款 Pay</span>
                    </div>
               </div>
            </div>
            <div class="xr-box-footer">
                <div class="xr-box-footer-left">
                    充值说明：
                </div>
                <div class="xr-box-footer-content">
                    • 1元=1部落币，充值所获得部落币，仅可用于网站下载资料支付。
                    <br>
                    • 如您的账户内有积分，支持将其兑换为部落币使用。
                    <br>
                     • 充值的部落币为虚拟服务，不可提现，不接受任何形式的退款，请斟酌确认。
                    <br>
                    • 付款即表示同意 <nuxt-link to="/other/32a258cf-ce5a-4fef-b301-0a9d37c02e22">《建筑部落网用户协议》</nuxt-link>
                    <p>
                        如支付遇到问题，请联系我们（TEL: 13621823882 ）
                    </p>
                </div>
            </div>
        </div>
        <payBox v-if="paymShow" :setMeal="setMeals" @closePay="closePay"/>
    </div>
</template>
<script>
import {getCoinsList} from "../../service/sign"
import payBox from "../../components/payTool"
import { mapState} from 'vuex'
export default {
    layout:"main",
    components: {
        payBox  
    },
    data () {
        return {
            price: [
                {
                    price: 100,
                    radio: [
                        {
                            label: "部落币",
                            value: "1"
                        },
                    {
                            label: "积分",
                            value: "2"
                        }
                    ],
                    packageSource: "1",
                    discount: 9.8
                },
                {
                    price: 198,
                    radio: [
                        {
                            label: "部落币",
                            value: "blRadio"
                        },
                    {
                            label: "积分",
                            value: "jfRadio"
                        }
                    ],
                    packageSource: "blRadio",
                    discount: 8.8
                },
                {
                    price: 298,
                    radio: [
                        {
                            label: "部落币",
                            value: "blRadio"
                        },
                    {
                            label: "积分",
                            value: "jfRadio"
                        }
                    ],
                    packageSource: "blRadio",
                    discount: 7.8
                }
            ],
            priceIndex: 0,
            paymShow: false,
            setMeals: {}
        }
    },
    computed: {
        ...mapState({
            Identity: state => state.overas.auth || {}
        })
    },
    async asyncData({app, store}) {
        try {
            const msg = await store.dispatch('getCoinsList');
            if (msg.length > 0) {
                let radio = [
                    {
                        label: "部落币",
                        value: "2"
                    },
                    {
                        label: "积分",
                        value: "1"
                    }
                ]
                msg.forEach(ele =>{
                    ele.packageSource = "1"
                    ele.radio = radio
                })
            }
            return {
                priceList: msg,
                setMeals: msg[0]
            }
        } catch (error) {}
    },
    methods: {
        closePay () {
            this.paymShow = !this.paymShow
        },
        setMeal (row, index) {
            this.priceIndex = index
            this.setMeals = row
        },
        sumMeal (row) {
            let t = ""
            if (row.packageSource === "2") {
               t = parseInt(row.Money) + row.TribalCoins+"部落币"
               return t
            }
            if (row.packageSource === "1") {
               t = row.Money+"部落币 + "  +  row.Integral + "积分"
               return t
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .pay {
        height: 100px;
        &-btn {
            width: 190px;
            height: 57px;
            border: 0;
            background: #fff;
            color: #2966C3;
            font-size: 22px;
            margin-top: 24px;
            border-radius: 4px;
            display: inline-block;
            line-height: 57px;
            text-align: center;
            cursor: pointer;
            &-icon {
                display: inline-block;
                width: 30px;
                height: 27px;
                position: relative;
                top: 5px;
                background: url("../../assets/images/ray-1.png") center;
            }
        }
    }
    .warm {
        width: 100%;
        line-height: 30px;
        font-size: 14px;
        color: #AACCFF;
        margin-top: 20px;
        margin-bottom: 60px;
    }
    .active-price {
        border: 1px solid #fff;
        position: relative;
        &::before {
            content: url("../../assets/images/pack.png");
            position: absolute;
            bottom: -7px;
            display: inline-block;
            right: 0;
        }
    }
    .active-un {
        border: 1px solid transparent;
    }
    .xr {
        width: 100%;
        background: #fff;
        padding: 30px 0;
        background: #222;
        color: #fff;
        &-box {
            width: 1200px;
            margin: 0 auto;
            font-size: 15px;
            &-top {
                line-height: 45px;
                border-bottom: 1px solid #1D5BBC;
                display: flex;
                &-left {
                    width: 80px;
                    text-align: left;
                }
            }
            &-content {
                display: flex;
                padding: 30px 0 50px;
                &-left {
                    width: 80px;
                    text-align: left;
                }
            }
            &-footer {
                display: flex;
                padding: 30px 0 50px;
                &-left {
                    width: 80px;
                    text-align: left;
                }
                &-content {
                    line-height: 24px;
                    color: #AACCFF;
                    font-size: 14px;
                    a {
                        color: #AACCFF;
                        &:hover {
                            color: #ff3c00;
                        }
                    }
                }
            }
        }
    }
    .tc {
        flex: 1;
        ul > li {
            display: inline-block;
            text-align: center;
            width: 195px;
            height: 230px;
            background: #1d5cbc;
            color: #fff;
            overflow: hidden;
            margin-right: 10px;
            border-radius: 5px;
            cursor: pointer;
        }
    }
    .price {
        margin: 15px 15px 0;
        padding-bottom: 10px;
        border-bottom: 1px dotted #2E71D6;
        p {
            font-size: 40px;
        }
        span {
            font-size: 15px;
        }
    }
    .package-source {
        font-size: 12px;
        text-align: left;
        margin-left: 40px;
        margin-top: 8px;
    }
    .discount {
        text-align: center;
        margin-top: 15px;
        span {
            display: inline-block;
            border: solid 1px #fff;
            background-color: transparent;
            color: #fff;
            width: 70px;
            line-height: 22px;
            border-radius: 13px;
        }
       
    }
</style> 