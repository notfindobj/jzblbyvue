<template>
    <div class="sile-box">
        <div class="sile">
            <div class="sile-title">
                <span class="sile-sub">{{crouseList.OutlineDesc}}</span>
            </div>
            <ul class="sile-nav">
                <li class="sile-nav-ext" v-for="(items, index) in crouseList.Courselist" :key="index" v-if="items.IsApproved === 1">
                    <div :class="items.fold ? `sile-nav-ext-box sile-nav-action` :'sile-nav-ext-box '"  @click="items.fold = !items.fold">
                        <span class="sile-nav-ext-box-title">{{items.Name}} </span>
                        <i :class="`icon iconfont ${items.fold ? 'icon-jiantoushang' : 'icon-jiantouxia'} `"></i> 
                    </div>
                    <dl v-show="items.fold" class="sile-nav-dl" v-for="(item, ins) in items.ChildNode" v-if="item.IsApproved === 1" :key="ins">
                        <dd class="sile-nav-dl-dd">
                            <div class="sile-nav-dl-dd-tit">
                                <i class="icon iconfont icon-shipin"></i> 
                                <span>{{`${index+1}-${ins+1} ${item.Name}`}} </span>
                                <span class="sile-nav-dl-dd-tit-free" v-if="item.IsFree">免费</span>
                            </div>
                            <div class="sile-nav-dl-dd-sub">
                                <nuxt-link :to="`/details_course/${item.CourseID}?id=${LecturerId}`">
                                    <span class="hover-btn">开始学习</span>
                                </nuxt-link>
                                <span class="duration">{{item.Duration}}</span>
                            </div>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import Bus from "../../../plugins/untils/Bus"
export default {
    
    props: {
        LecturerId: {
            type: String,
            default: ""
        },
        crouseList: {
            type: Object,
            default: ()=> {return {OutlineDesc: "", Courselist: []}}
        }
    },
    data () {
        return {
            extend: false,
        }
    },
    methods: {
        extendDrag () {
            this.extend = !this.extend;
            Bus.$emit("extendDrag", this.extend)
        }
    }
}
</script>
<style lang="less" scoped>
.sile-box {
    position: relative;
}
.sile{
    overflow: hidden;
    &-title {
        border-bottom: 1px dashed #eee;
        padding: 15px;
        h3 {
            text-align: justify;
            font-size: 15px;
            color: #fff;
            max-height: 42px;
            word-break: break-all;
            display: -webkit-box;
            line-clamp: 2;
            overflow: hidden;
        }
        span {
            font-size: 12px;
            color: #999;
            display: inline-block;
            margin-top: 12px;
            line-height: 24px;
            max-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    &-nav {
        position: relative;
        font-size: 14px;
        width: 100%;
        color: #999;
        display: inline-block;
        box-sizing: border-box;
        &-ext {
            border-bottom: 1px solid;
            border-bottom: 1px dashed #eee;
            &-box {
                position: relative;
                padding: 0 20px;
                cursor: pointer;
                width: 100%;
                height: 53px;
                line-height: 53px;
                display: inline-block;
                border-bottom: 1px dashed #eee;
                display: flex;
                justify-content: space-between;
            }
        }
        &-dl {
            &-dd {
                width: 100%;
                height: 60px;
                display: inline-block;
                display: flex;
                align-items: center;
                box-sizing: border-box;
                justify-content: space-between;
                border-bottom: 1px dashed #eee;
                position: relative;
                padding: 0 20px;
                cursor: pointer;
                &:hover {
                    background: #fbfbfb;
                }
                &:hover .hover-btn{
                    display: block;
                    position: relative;
                    width: 86px;
                    height: 30px;
                    line-height: 30px;
                    transition: all .3s;
                    border-radius: 4px;
                    cursor: pointer;
                    background-color: #1abc9c;
                    color: #fff;
                    text-align: center;
                }
                &:hover .duration{
                    display: none;
                }
                &-tit {
                    margin: 5px 0;
                    cursor: pointer;
                    &:hover {
                        color: #1abc9c;
                    }
                    &-free {
                        display: inline-block;
                        width: 50px;
                        height: 20px;
                        line-height: 20px;
                        margin-left: 14px;
                        text-align: center;
                        border-radius: 2px;
                        border: 1px solid #1abc9c;
                        color: #1abc9c;
                        font-size: 12px;
                    }
                }
                &-sub {
                    .hover-btn {
                        display: none;
                    }
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                }
            }
        }
    }
}
.course-drag {
    position: absolute;
    top: 0;
    width: 20px;
    height: 100%;
    z-index: 2; 
    .drag-icon {
        position: absolute;
        top: 50%;
        margin-top: -12px;
        left: 0;
        cursor: pointer;
        width: 9px;
        height: 25px;
        background: url(../../../assets/images/other_css_sprites.png) -87px -84px;
    }
}
sile-nav-action {
    // color: #fff;
}
.extend {
    right: 0;
    transform: rotate(180deg);
}
</style>