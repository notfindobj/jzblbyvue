<template>
    <div class="sile-box" :style="`width: ${extend ? '0' : '270'}px;`">
        <div class="sile">
            <div class="sile-title">
                <h3 >《15小时从0到独立掌握各类室内空间建模教程》</h3>
                <span class="sile-sub">共53节课,其中免费试学共3节  (已完结)</span>
            </div>
            <ul class="sile-nav">
                <li class="sile-nav-ext" v-for="(items, index) in crouseList" :key="index">
                    <div :class="items.fold ? `sile-nav-ext-box sile-nav-action` :'sile-nav-ext-box '"  @click="items.fold = !items.fold">
                        <span class="sile-nav-ext-box-title">第{{index+1}}章 {{items.chapter}} </span>
                        <i :class="`icon iconfont ${items.fold ? 'icon-jiantoushang' : 'icon-jiantouxia'} `"></i> 
                    </div>
                    <dl v-show="items.fold" class="sile-nav-dl" v-for="(item, ins) in items.children" :key="ins">
                        <dd class="sile-nav-dl-dd">
                            <div class="sile-nav-dl-dd-tit">
                                <i class="icon iconfont icon-add1"></i> 
                                <span>{{`${index+1}-${ins+1} ${item.nema}`}} </span>
                                
                            </div>
                            <div class="sile-nav-dl-dd-sub">
                                <span>{{item.time}}</span>
                                <span v-if="item.free">免费</span>
                            </div>
                        </dd>
                    </dl>
                </li>
            </ul>
        </div>
        <div :class="`${extend ? 'course-drag extend': 'course-drag'}`"  @click="extendDrag">
            <div class="drag-icon"></div>
        </div>
    </div>
</template>
<script>
import Bus from "../../../plugins/untils/Bus"
export default {
    data () {
        return {
            extend: false,
            crouseList: [
                {
                    chapter: "3Dmax室内建模训练营",
                    fold: true,
                    children: [
                        {
                            nema: "dmax基础命令讲解（一）",
                            time: '20.2分钟',
                            free: true
                        }
                    ]
                },
                {
                    chapter: "3Dmax室内建模训练营",
                    fold: true,
                    children: [
                        {
                            nema: "dmax基础命令讲解（一）",
                            time: '20.2分钟',
                            free: true
                        }
                    ]
                },
                {
                    chapter: "3Dmax室内建模训练营",
                    fold: true,
                    children: [
                        {
                            nema: "dmax基础命令讲解（一）",
                            time: '20.2分钟',
                            free: true
                        }
                    ]
                },
                {
                    chapter: "3Dmax室内建模训练营",
                    fold: true,
                    children: [
                        {
                            nema: "dmax基础命令讲解（一）",
                            time: '20.2分钟',
                            free: true
                        }
                    ]
                },
                {
                    chapter: "3Dmax室内建模训练营",
                    fold: true,
                    children: [
                        {
                            nema: "dmax基础命令讲解（一）",
                            time: '20.2分钟',
                            free: true
                        }
                    ]
                },
                {
                    chapter: "3Dmax室内建模训练营",
                    fold: true,
                    children: [
                        {
                            nema: "dmax基础命令讲解（一）",
                            time: '20.2分钟',
                            free: true
                        }
                    ]
                }
            ]
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
    width: 270px;
    position: relative;
}
.sile{
    background-color: #1f1f1f;
    overflow: hidden;
    &-title {
        border-bottom: 1px solid #0d0d0d;
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
        height: 510px;
        overflow-x: hidden;
        overflow-y: auto;
        &-ext {
            border-bottom: 1px solid;
            border-bottom: 1px solid #282828;
            &-box {
                position: relative;
                padding: 0 20px;
                cursor: pointer;
                width: 100%;
                height: 53px;
                line-height: 53px;
                display: inline-block;
                border-bottom: 1px solid #282828;
                display: flex;
                justify-content: space-between;
            }
        }
        &-dl {
            &-dd {
                width: 100%;
                height: 60px;
                display: inline-block;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                background-color: #1f1f1f;
                border-bottom: 1px solid #282828;
                position: relative;
                padding: 0 20px;
                &-tit {
                    margin: 5px 0;
                    cursor: pointer;
                    &:hover {
                        color: #1abc9c;
                    }
                }
                &-sub {
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    span {
                        &:last-child {
                            color: #fd583f;
                        }
                    } 
                }
            }
        }
    }
}
 &::-webkit-scrollbar {
    width: 2px;
    background: #000;
    box-shadow: 0rem 0.01rem 0.01rem 0rem rgba(1, 69, 132, 0.5);
}
&::-webkit-scrollbar-track {
    background-color: transparent;
}

&::-webkit-scrollbar-thumb {
    background: #333;
}
/*滚动条的上下两端的按钮*/
&::-webkit-scrollbar-button {
    height: 0px;
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
.sile-nav-action {
    color: #fff;
}
.extend {
    right: 0;
    transform: rotate(180deg);
}
</style>