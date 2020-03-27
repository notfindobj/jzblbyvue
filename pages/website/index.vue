<template>
    <div class="wb">
        <div class="wb-hed">
            <div class="wb-hed-con">
                <h3>越了解，越爱</h3>
                <p>建筑部落最初只是一个小小的情怀，通过一点一滴努力与积累，如今已是数十万设计师喜爱的室内设计综合网站。<br>
                我们深信越努力定必越幸运，欢迎你参与我们的活动比赛、宣传你我的家，更期待热爱这份行业的你加入我们。</p>
            </div>
            
        </div>
        <div class="wb-main">
            <ul class="wb-main-side">
                <li :class="meuntIndex === index ? 'side-active': ''" v-for="(items, index) in meunt" :key="index" @click="setMeunt(items, index)">{{items.title}}</li>
            </ul>
            <div class="wb-main-con">
                <h3>{{meunt[meuntIndex].title}}</h3>
                <div class="wb-main-con-list">
                   <template v-if="meuntType === 1">
                        <sideList/>
                        <sideList/>
                        <sideList/>
                        <div class="wb-main-con-page">
                            <Page :total="100" />
                        </div>
                   </template>
                   <div v-if="meuntType === 0">
                       建筑部落（www.jzbl.com）汇聚地产界著名建筑、景观、室内设计服务商、建筑材料商。专业提供建筑设计、景观设计、室内设计、建筑材料、建材采购、房地产招投标服务的房地产服务的房地产开发设计、房地产设计网站；以庞大的建筑设计资料搜索功能为龙头，另拥有海量建筑师用户为基础，为建筑行业产业链上的多类客户提供资讯、招聘、培训、广告等线上、线下综合性服务，建筑圈版块，为建筑师提供交流互动平台，让学习、分享、定制与设计更轻松，加快信息传播速度,降低运营成本。
                   </div>
                </div>
               
            </div>
        </div>
    </div>
</template>
<script>
import sideList from "./components/sideList"
export default {
    layout: "main",
    components: {
        sideList
    },
    data () {
        return {
            meunt: [
                {
                    title: "信息公告",
                    type: 1
                },
                {
                    title: "规则协议",
                    type: 1
                },
                {
                    title: "常见问题",
                    type: 1
                },
                {
                    title: "关于我们",
                    type: 0
                }
            ],
            meuntIndex: 0,
            meuntType: 0
        }
    },
    methods:{
        setMeunt (row, index) {
            this.meuntIndex = index,
            this.meuntType = row.type
        }
    }
}
</script>
<style lang="less" scoped>
    .wb {
        font-size: 15px;
        margin-bottom: 20px;
        &-hed {
            width: 100%;
            height: 200px;
            background: url("../../assets/images/aboutUsBg.png") no-repeat left top;
            background-size: cover;
            text-align: center;
            margin-bottom: 20px;
            &-con {
                width: 1200px;
                margin: 0;
                padding: 40px 200px;
                line-height: 35px;
                color: #fff;
                display: inline-block;
                > h3 {
                    font-size: 28px;
                    margin-bottom: 10px;
                }
            }
            &-main {
                
            }
        }
        &-main {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            &-side {
                width: 170px;
                text-align: center;
                background: #fff;
                margin-right: 15px;
                padding: 15px 0;
                height: 270px;
                li {
                    line-height: 30px;
                    margin-bottom: 3px;
                    cursor: pointer;
                    &:hover{
                        color: #fff;
                        background: #ffd4c7;
                    }
                }
            }
            &-con {
                width: 1000px;
                padding: 15px;
                background: #fff;
                >h3 {
                    border-bottom: 1px solid #ddd;
                    line-height: 35px;
                    padding-bottom: 5px;
                }
                &-list {
                    margin-top: 5px;
                }
                &-page {
                    text-align: center;
                    margin-top: 15px;
                }
            }
        }
    }
    .side-active {
        position: relative;
        background: #ffd4c7;
        color: #fff;
        &::after {
            width: 2px;
            height: 30px;
            content: '';
            background: #FF3C00;
            border-radius: 1px;
            position: absolute;
            left: 0;
            top:0px;
        }
    }
</style>