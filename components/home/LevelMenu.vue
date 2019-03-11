<template>
    <div>
        <div @mouseleave="mouseleave()">
            <div class="banner-nav">
                <div
                v-for="(items, index) in oneMeun" 
                :key="index" 
                :data-id="items.id" 
                :class="items.id === id ?  'banner-nav-items cursorHover': 'banner-nav-items'"
                @mouseenter="mouseenter(items.id)">
                    {{items.name}}
                </div>
            </div>
            <div class="sub-banner-nav" v-for="(items, indexs) in oneMeun" :key="'1'+indexs" :class="items.id === id ?  'show': 'hide'">
                <div class="sub-banner-nav-items">
                    <div class="sub-banner-nav-items-title">电视:</div>
                    <div class="sub-banner-nav-items-content">
                        <span>曲面电视</span>
                        <span>超薄</span>
                        <span>超薄电视</span>
                        <span>HDR电视</span>
                        <span>曲面</span>
                        <span>DLED电视</span>
                        <span>超薄电视</span>
                        <span>HDR</span>
                        <span>曲面电</span>
                        <span>DLED电视</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {_debounce} from '../../plugins/untils/public'
export default {
    data() {
        return {
            id: '',
            // 一级菜单
            oneMeun: [
                {icon: 'icon-erweima', name: '示范区', id: 'a'},
                {icon: 'icon-erweima', name: '楼盘', id: 'b'},
                {icon: 'icon-erweima', name: '效果图', id: 'c'},
                {icon: 'icon-erweima', name: 'su模型', id: 'd'},
                {icon: 'icon-erweima', name: '总图', id: 'e'},
                {icon: 'icon-erweima', name: '平面', id: 'f'},
                {icon: 'icon-erweima', name: '建筑部落', id: 'g'},
                {icon: 'icon-erweima', name: '室内设计', id: 'h'},
                {icon: 'icon-erweima', name: '文本', id: 'i'},
            ],
        }
    },
    created () {},
    methods: {
        mouseenter: _debounce(function(id)  {
            this.id = id
        }, 200),
        mouseleave:_debounce(function(id) {
            this.id = id
        }, 200),
    }
}
</script>
<style lang="less" scoped>
    .hide {
        display: none;
    }
    .show {
        display: block;
    }
    .cursorHover {
        background: #FF3C00;
    }
    .banner-nav {
        position: absolute;
        z-index: 9;
        font-size: 14px;
        top: 0px;
        color: #ffffff;
        background: rgba(0,0,0, .6);
        height: 100%;
        width: 142px;
        &-items {
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            &:hover {
                background: #FF3C00;
            }
            &:first-child {
                margin-top: 4px;
            }
        }
    }
    .sub-banner-nav {
        position: absolute;
        left: 142px;
        top: 0;
        width: 595px;
        min-height: 367px;
        padding: 8px 0;
        top: 4px;
        background: #ffffff;
        &-items {
            display: flex;
            color: #666666;
            padding: 0 65px 0 27px;
            &-title {
                width: 95px;
                text-align: center;
                font-size: 14px;
            }
            &-content {
                > span {
                    cursor: pointer;
                    white-space: nowrap;
                    padding-right: 11px;
                }
            }
        }
        
    }
</style>
