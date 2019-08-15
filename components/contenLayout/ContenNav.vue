<template>
    <div class="nav-box">
        <div class="nav-list">
            <p>在以下分类中找：</p>
            <ul>
                <li v-for="(item, index) in getSessionStorage.searchMenu" :class="item.ItemAttributesId === currentInex ? 'li-active' : ''" :key="index" @click="choseSome(index,item)">
                    {{item.ItemAttributesFullName}}
                    <img src="../../assets/images/sanjiao.png"/>
                </li>
            </ul>
        </div>
        <div class="screening-nav">
            <!-- 面包屑 -->
            <Breadcrumb separator=">">
                <BreadcrumbItem style="color: #999999">资源库</BreadcrumbItem>
                <BreadcrumbItem style="color: #999999;font-weight: normal" v-if="currentName">{{currentName}}
                </BreadcrumbItem>
            </Breadcrumb>
            <!-- 选中的属性 -->
            <div class="itemAttribute">
                <div class="itemAttribute-items" v-for="(items, index) in queryConditions" :key="index"  @click="delItems(items)">
                    <span>{{items.AttrKeyFullName}}:{{items.AttrValueFullName}}</span>
                    <i class="iconfont icon-chahao2"></i>
                </div>
            </div>
            <!-- 属性展示 -->
            <ul class="screening-nav-list">
                <li v-for="(item,index) in itemAttribute" :key="index"
                    :class="item.AttrId ? 'li-active' : ''">
                    <p>{{item.AttrName}}</p>
                    <ol>
                        <li v-for="(items,index) in item.ChildNode" :key="index" @click="choseSomeOne(item,items)">
                            {{items.AttrName}}
                        </li>
                    </ol>
                    <i :class="item.AttrId ? 'icon iconfont icon-jiantou-shang-shixin-yuanxing' : 'icon iconfont icon-xiangxiayuanjiantouxiajiantouxiangxiamianxing'"
                       v-if="item.ChildNode.length > 13" @click="upAndDown(item)"></i>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapGetters } from 'vuex'
export default {
    name: 'contenNav',
    props: {
      itemAttribute: {
            type: Array,
            required: true,
            default: function () {
            return []
            }
        },
        queryConditions: {
            type: Array,
            required: true,
            default: function () {
                return []
            }
        }
    },
    data() {
        return {
            currentInex: '',
            currentName: '',
            clicked: -1
        }
    },
    computed: {
        ...mapGetters(['getSessionStorage']),
    },
    created() {
        this.currentName = this.getSessionStorage.baseSearchNav.title;
        this.currentInex = this.getSessionStorage.baseSearchNav.ClassTypeArrList[0].AttrKey;
    },
    methods: {
        // 一级
        choseSome(index, item) {
            this.currentInex = item.ItemAttributesId;
            this.currentName = item.ItemAttributesFullName;
            this.$emit('choseSome', item)
        },
        choseSomeOne(item, inx) {
            this.$emit('choseSomeOne', item, inx)
        },
        delItems(item) {
            this.$emit('delItems', item)
        },
        upAndDown(item) {
            item.value = !item.value
        }
    },
}
</script>
<style lang="less" scoped>
    .nav-box {
        width: 100%;
        height: auto;
        padding-top: 20px;

        .nav-list {
            font-size: 16px;
            color: #333333;
            height: 22px;
            margin-bottom: 4px;
            display: flex;
            flex-direction: row;

            > p {
                width: 128px;
                margin-right: 14px;
            }

            > ul {
                flex: 1;
                display: flex;
                flex-direction: row;
                font-weight: bold;

                > li {
                    height: 22px;
                    padding-right: 13px;
                    margin-right: 13px;
                    position: relative;
                    cursor: pointer;

                    &:before {
                        width: 2px;
                        height: 10px;
                        content: '';
                        background: #D6D6D6;
                        border-radius: 1px;
                        position: absolute;
                        right: 0;
                        top: 6px;
                    }

                    &:last-child {
                        &:before {
                            width: 0px;
                            height: 10px;
                            content: '';
                            background: #D6D6D6;
                            border-radius: 1px;
                            position: absolute;
                            right: 0;
                            top: 6px;
                        }
                    }

                    &:hover {
                        color: #FF3C00;
                    }

                    img {
                        display: block;
                        width: 17px;
                        height: 16px;
                        position: absolute;
                        bottom: -17px;
                        left: 38%;
                        transform: translateX(-50%);
                        display: none;
                    }
                }

                .li-active {
                    color: #FF3C00;

                    img {
                        display: block;
                    }
                }
            }
        }

        .screening-nav {
            width: 100%;
            height: auto;
            margin-top: 12px;
            margin-bottom: 10px;
            background: #FFFFFF;
            border: 1px solid #303030;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 10px 20px 10px;

            .screening-nav-list {
                width: 100%;

                > li {
                    height: 40px;
                    overflow: hidden;
                    line-height: 40px;
                    font-size: 14px;
                    color: #333333;
                    border-bottom: 1px dashed #DDDDDD;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: row;
                    position: relative;

                    &:last-child {
                        border-bottom: none;
                    }

                    > p {
                        /*width: 76px;*/
                        margin-right: 20px;
                        font-weight: bold;
                    }

                    > ol {
                        flex: 1;

                        > li {
                            float: left;
                            margin-right: 24px;
                            cursor: pointer;

                            &:hover {
                                color: #FF3C00;
                            }
                        }

                        .li-active {
                            color: #FF3C00;
                        }
                    }

                    > i {
                        font-size: 14px;
                        color: #cccccc;
                        position: absolute;
                        right: 0;
                        top: 0px;
                    }
                }

                .li-active {
                    height: auto;
                }
            }
        }
    }

    .ivu-breadcrumb-item-separator {
        margin: 0 2px !important;
    }

    .ivu-breadcrumb {
        display: inline-block;
    }

    .itemAttribute {
        display: inline-block;
        margin-left: 10px;
        &-items {
            display: inline-block;
            cursor: pointer;
            margin-right: 10px;
            border: .5px solid #999999;
            border-radius: 3px;
            padding: 0 4px;
            color: #333333;
            span {
                line-height: 29px;
            }
            i {
                position: relative;
                top: 2px;
            }
            &:hover {
                color: #FF3C00;
            }
        }
    }
</style>
