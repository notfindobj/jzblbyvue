<template>
    <div class="data-details-right">
        <div class="data-details-right-con">
            <div class="works-info">
                <img @click="goPersonalCenter" :src="detaDetails.HeadIcon" alt="">
                <p class="works-name">{{detaDetails.NickName}}</p>
                <div v-if="userInfoID != detaDetails.UserId" :class="!detaDetails.IsFollow ? 'focus-btn': 'focus-btn-gray'" @click="setFollow(detaDetails)">{{!detaDetails.IsFollow? '+ 关注' : '已关注'}}</div>
            </div>
            <div class="data-info">
                <p class="data-name">项目信息</p>
                <ul :class="!isShowIcon ? 'data-introduce' : 'data-introduce data-introduce-active '">
                    <li>
                        <span>项目名称</span>
                        <span>{{ detaDetails.ItemName }}</span>
                    </li>
                    <li v-for="(item,index) in attribute" :key="index">
                        <span>{{item.ItemAttributesFullName}}</span>
                        <span>{{item.ItemSubAttributeFullName}}</span>
                    </li>
                </ul>
                <i v-if="attribute.length > 4"
                   :class="isShowIcon ? 'icon iconfont icon-jiantou-shang-shixin-yuanxing' : 'icon iconfont icon-xiangxiayuanjiantouxiajiantouxiangxiamianxing'"
                   @click="unAnddown()"></i>
            </div>
            <div v-if="detaDetails.IsCustomized||detaDetails.IsDownload" class="btn-group">
                <div v-if="detaDetails.IsDownload" @click="immediatelyDown(detaDetails)">
                  <p>立即下载</p>
                  <p><span class="btn-group-Price">￥{{detaDetails.Price}}</span></p>
                </div>
                <div v-if="detaDetails.IsCustomized" @click="customthis()"> 
                  <p>同款定制</p> 
                  <p><span class="btn-group-Price">￥{{detaDetails.FirCusPri}}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    name: 'detaDetailsRight',
    props: {
      detaDetails: {
        type: Object,
        required: true,
        default: function () {
          return {}
        }
      },
      attribute: {
        type: Array,
        required: true,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        isShowIcon: false,
      }
    },
    computed: {
        ...mapState({
            userInfoID: state => state.overas.auth.UserId
        })
    },
    created() {
      this.isShowIcon = this.attribute.length <= 4
    },
    methods: {
      // 点击头像，去个人中心
      goPersonalCenter() {
        this.$router.push({
          name: 'HeAndITribal-id',
          query: {
            id: this.detaDetails.UserId
          }
        })
      },
      unAnddown() {
        this.isShowIcon = !this.isShowIcon
      },
      immediatelyDown(row) {
        let val = {
          ItemId: row.ItemId,
          isPay: row.IsPay,
          type: 'Down'
        }
        this.$emit('dataDetailsMaskShow', val)
      },
      customthis() {
        this.$emit('dataDetailsMaskShow', { type: 'Custom' })
      },
      setFollow(item) {
        this.$emit('setFollow', item)
      },

    }
  }
</script>
<style lang="less" scoped>
    .btn-group-Price {
      font-size: 16px;
      color: #666666;
    }
    .data-details-right {
        width: 340px;
        background-color: #F2F4F2;
        .data-details-right-con {
            width: 100%;
            height: 100%;

            .works-info {
                width: 100%;
                height: 174px;
                background: #ffffff;
                border-radius: 4px;
                margin-bottom: 10px;
                padding: 20px 0;

                > img {
                    display: block;
                    width: 74px;
                    height: 74px;
                    border-radius: 50%;
                    margin: 0 auto 6px;
                    cursor: pointer;
                }

                .works-name {
                    font-size: 14px;
                    color: #333333;
                    letter-spacing: 0;
                    text-align: center;
                    margin-bottom: 11px;
                }

                .focus-btn {
                    cursor: pointer;
                    width: 84px;
                    height: 26px;
                    margin: 0 auto;
                    background: #FF3C00;
                    border-radius: 4px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 14px;
                    color: #FFFFFF;
                }
                .focus-btn-gray {
                    cursor: pointer;
                    width: 84px;
                    height: 26px;
                    margin: 0 auto;
                    background: #b0b0b0;
                    border-radius: 4px;
                    line-height: 26px;
                    text-align: center;
                    font-size: 14px;
                    color: #FFFFFF;
                }
            }
            .data-info {
                width: 100%;
                /*height: 178px;*/
                height: auto;
                background: #FFFFFF;
                border-radius: 4px;
                padding: 0 10px;
                margin-bottom: 10px;
                position: relative;

                .data-name {
                    font-size: 14px;
                    color: #333333;
                    line-height: 40px;
                    border-bottom: 1px solid #D9D9D9;
                }

                .data-introduce {
                    padding: 10px 0;
                    height: 137px;
                    overflow: hidden;

                    > li {
                        font-size: 12px;
                        color: #666666;
                        margin-bottom: 8px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;

                        > span {
                            &:nth-child(1) {
                                width: 60px;
                                display: flex;
                                flex-direction: row;
                                justify-content: space-between;
                            }

                            &:nth-child(2) {
                                flex: 1;
                            }
                        }

                        &:last-child {
                            margin-bottom: 0px;
                        }
                    }
                }

                > i {
                    display: block;
                    width: 14px;
                    height: 14px;
                    border-radius: 50%;
                    position: absolute;
                    right: 11px;
                    bottom: 11px;
                    cursor: pointer;
                }

                .data-introduce-active {
                    height: auto;
                }
            }

            .btn-group {
                width: 100%;
                height: 71px;
                background: #ffffff;
                border-radius: 4px;
                margin-bottom: 10px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                > div {
                    flex: 1;
                    font-size: 22px;
                    text-align: center;
                    cursor: pointer;
                    &:hover {
                        color: #FF3C00;
                        position: relative; 
                        p:after {
                            width: 30px;
                            height: 2px;
                            content: '';
                            background: #FF3C00;
                            border-radius: 1px;
                            position: absolute;
                            // right: 70px;
                            left: 42%;
                            top: 30px;
                        }
                    }
                    &:nth-child(1) {
                        position: relative;
                        &:before {
                            width: 2px;
                            height: 60px;
                            content: '';
                            background: #D8D8D8;
                            border-radius: 1px;
                            position: absolute;
                            right: -3px;
                            top: 5px;
                        }
                    }
                }
            }
            .box {
                width: 100%;
                border-radius: 4px;
            }
        }

    }
</style>
