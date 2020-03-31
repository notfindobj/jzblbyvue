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
                <li :class="meuntIndex === index ? 'side-active': ''" v-for="(items, index) in meunt" :key="index" @click="getSysData(index, 's')">{{items.Name}}</li>
            </ul>
            <div class="wb-main-con">
                <h3>{{meunt[meuntIndex].Name}}</h3>
                <div class="wb-main-con-list">
                   <template>
                        <sideList v-for="(items, index) in meuntConLisy"  :items="items" :key="index" @viewAbout="viewAbout"/>
                        <div class="wb-main-con-page">
                            <Page :total="total" @on-change="changePage" />
                        </div>
                   </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import sideList from "./components/sideList"
import {getSysList} from "../../service/sign"
import {analogJump} from "../../plugins/untils/public"
export default {
    layout: "main",
    components: {
        sideList
    },
    data () {
        return {
            meunt: [],
            meuntIndex: 0,
            meuntConLisy: [],
            meuntType: 1,
            total: 0
        }
    },
    async asyncData({store}) {
        try {
            const msg = await store.dispatch('getSysMenu');
            return{
                meunt: msg
            }
        } catch (error) {
            return{
                meunt: []
            }
        }
    },
    created () {
        this.getSysData()
    },
    methods:{
        changePage (val) {
            this.getSysData(val)
        },
        getSysData (index = 0, t) {
            let that = this
            let p = 0
            if (t === "s") {
                that.meuntIndex = index
            } else {
                p = index
            }
            let q = {
                typeId: that.meunt[that.meuntIndex].Id,
                page: p
            }
            getSysList(q).then(res => {
                that.meuntConLisy = res.retModels
                that.total = res.paginationData.records
            }).catch(err => {})
        },
        viewAbout (row) {
            let routeData = this.$router.resolve({ name: 'details-id', params: { id: row.ArticleId } });
            analogJump(routeData.href);
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