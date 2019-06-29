<template>
    <div>
        <div @mouseleave="mouseleave()">
            <div class="banner-nav">
                <div
                    v-for="items in oneMeun"
                    :key="items.ItemAttributesId"
                    :data-id="items.ItemAttributesId"
                    :class="items.ItemAttributesId === id ?  'banner-nav-items cursorHover': 'banner-nav-items'"
                    @mouseenter="mouseenter(items.ItemAttributesId)"
                    @click="goList(items)"
                >
                    {{items.ItemAttributesFullName}}
                    <div>
                        <div class="sub-banner-nav" :class="items.ItemAttributesId === id ?  'show': 'hide'">
                            <div class="sub-banner-nav-items">
                                <template v-for="item in items.ChildNode">
                                    <div class="sub-banner-nav-items-title" :key="item.ItemAttributesId">
                                        <span
                                            class="sub-banner-nav-items-title-type">{{item.ItemAttributesFullName}}:</span>
                                        <div style="display:inline-block;width:85%">
                                            <div v-for="it in item.ChildNode" :key="it.ItemAttributesId"
                                                 class="sub-banner-nav-items-title-content">
                                                <span @click.stop="clickFullName(items, item, it)">{{it.ItemAttributesFullName}}</span>
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
  import { _debounce } from '../../plugins/untils/public'

  export default {
    data() {
      return {
        id: '',
        oneMeun: []
      }
    },
    created() {
    },
    mounted() {
      this.$store.dispatch('getMenu').then(res => {
        this.oneMeun = res.RetMenuData;
      })
    },

    methods: {
      mouseenter: _debounce(function (id) {
        this.id = id
      }, 100),
      mouseleave: _debounce(function (id) {
        this.id = id
      }, 100),
      clickFullName(pre, type, ch) {
        let baseDateId = {
          ClassTypeId: `${ pre.ItemSubAttributeCode }|${ pre.ItemAttributesId }`,
          ClassTypeArrList: [
            {
              ArrId: type.ItemAttributesId,
              ArrEnCode: ch.ItemSubAttributeCode
            }
          ],
          SortType: 0,
          KeyWords: "",
          Order: true,
          Page: 0,
          Rows: 32,
          title: pre.ItemAttributesFullName,
        }
        this.$store.dispatch('BASEDATA', baseDateId);
        this.$router.push({ name: "dataBase", query: { dataBase: JSON.stringify(baseDateId) } })
      },

      // 点击一级分类
      goList(cate) {
        let baseDateId = {
          ClassTypeId: `${ cate.ItemSubAttributeCode }|${ cate.ItemAttributesId }`,
          ClassTypeArrList: '',
          SortType: 0,
          KeyWords: "",
          Order: true,
          Page: 0,
          Rows: 32,
          title: cate.ItemAttributesFullName,
        }
        this.$store.dispatch('BASEDATA', baseDateId);
        this.$router.push({ name: "dataBase", query: { dataBase: JSON.stringify(baseDateId) } })
      }
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
        top: 0;
        color: #ffffff;
        height: 100%;
        width: 143px;

        &-items {
            text-align: center;
            line-height: 40px;
            background: rgba(0, 0, 0, .6);
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
        left: 143px;
        top: 4px;
        min-width: 850px;
        min-height: 367px;
        padding: 7px 0;
        background: #ffffff;

        &-items {
            color: #666666;
            padding: 0 65px 0 27px;

            &-title {
                text-align: left;
                font-size: 14px;
                display: flex;

                &-content {
                    display: inline-block;

                    > span {
                        cursor: pointer;
                        white-space: nowrap;
                        margin-right: 11px;
                        padding: 2px;
                        border-radius: 2px;

                        &:hover {
                            background-color: #ff3c00;
                            color: #fff;
                        }
                    }
                }

                &-type {
                    width: 86px;
                    display: inline-block;
                    text-align: center;
                    font-weight: bold;
                }
            }

        }

    }
</style>
