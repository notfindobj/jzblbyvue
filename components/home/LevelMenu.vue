<template>
    <div>
        <div @mouseleave="mouseleave()">
            <div class="banner-nav">
                <div
                v-for="items in oneMeun" 
                :key="items.ItemAttributesId" 
                :data-id="items.ItemAttributesId" 
                :class="items.ItemAttributesId === id ?  'banner-nav-items cursorHover': 'banner-nav-items'"
                @mouseenter="mouseenter(items.ItemAttributesId)">
                    {{items.ItemAttributesFullName}}
                    <div>
                        <div class="sub-banner-nav" :class="items.ItemAttributesId === id ?  'show': 'hide'">
                            <div class="sub-banner-nav-items">
                                <template v-for="item in items.ChildNode">
                                    <div class="sub-banner-nav-items-title" :key="item.ItemAttributesId">
                                        <span class="sub-banner-nav-items-title-type">{{item.ItemAttributesFullName}}:</span>
                                        <div style="display:inline-block;width:85%">
                                            <div v-for="it in items.ChildNode" :key="it.ItemAttributesId" class="sub-banner-nav-items-title-content" >
                                                <span>{{it.ItemAttributesFullName}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </template>    
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {_debounce} from '../../plugins/untils/public'
export default {
    props: {
        oneMeun: {
            type: Array,
            default: () => {
                return []
            },
            required: true
        }
    },
    data() {
        return {
            id: '',
        }
    },
    created () {},
    methods: {
        mouseenter: _debounce(function(id)  {
            console.log(id)
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
        min-width: 595px;
        min-height: 367px;
        padding: 7px 0;
        background: #ffffff;
        &-items {
            color: #666666;
            padding: 0 65px 0 27px;
            &-title {
                text-align: left;
                font-size: 14px;
                &-content {
                    display: inline-block;
                    > span {
                        cursor: pointer;
                        white-space: nowrap;
                        padding-right: 11px;
                    }
                }
                &-type {
                    width: 86px;
                    display: inline-block;
                    text-align: center;
                }
            }
           
        }
        
    }
</style>
