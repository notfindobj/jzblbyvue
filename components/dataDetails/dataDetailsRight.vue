<template>
    <div class="data-details-right">
        <div class="data-details-right-con">
            <div class="works-info">
                <img @click="goPersonalCenter" :src="detaDetails.HeadIcon" alt="">
                <p class="works-name">{{detaDetails.NickName}}</p>
                <div v-if="!(userInfoID && userInfoID.UserId === detaDetails.UserId)" :class="!detaDetails.IsFollow ? 'focus-btn': 'focus-btn-gray'" @click="setFollow(detaDetails)">{{!detaDetails.IsFollow? '+ 关注' : '已关注'}}</div>
            </div>
            <div v-if="detaDetails.IsDownload" class="btn-group" ref="immediatelyDown" @click="immediatelyDown(detaDetails)">
              <p>立即下载</p>
              <ul>
                <li>RMB：{{detaDetails.Price}}</li>
                <li v-if="detaDetails.TribalCoinsPrice">部落币：{{parseInt(detaDetails.TribalCoinsPrice)}}</li>
                <li v-if="detaDetails.IntegralPrice">积分：{{parseInt(detaDetails.IntegralPrice)}}</li>
              </ul>
            </div>
             <div v-if="detaDetails.IsCustomized" class="btn-Customized" @click="customthis()"> 
                  <div>
                    同款定制 <span>￥1{{detaDetails.FirCusPri}}00</span>
                  </div>
                </div>
            <div class="data-info comments-status-box">
                <div class="comments-box-status">
                    <div class="comments-box-status-left">
                        <span>项目信息</span>
                        <span>发布日期：{{detaDetails.CreateDate | datefmt('YYYY-MM-DD')}}</span>
                    </div>
                    <div class="comments-box-status-right">
                        <i class="icon iconfont icon-chakan"></i>{{detaDetails.Views}}
                    </div>
                </div>
                <ul :class="!isShowIcon ? 'data-introduce' : 'data-introduce data-introduce-active '">
                    <li>
                        <span>项目名称:</span>
                        <span>{{ detaDetails.ItemName }}</span>
                    </li>
                    <li v-for="(item,index) in attribute" :key="index" v-if="item.ItemAttributesFullName">
                        <span>{{item.ItemAttributesFullName}}:</span>
                        <span v-if="item.ItemSubAttributeId.length < 10"><span class="data-name" :title="item.ItemSubAttributeFullName">{{item.ItemSubAttributeFullName}}</span> <syIcon syHref="ditudaohang" @openMap="openMap(item)"/></span>
                        <span v-else>{{item.ItemSubAttributeFullName}}</span>
                    </li>
                </ul>
                <i v-if="attribute.length > 5"
                   :class="isShowIcon ? 'icon iconfont icon-jiantou-shang-shixin-yuanxing' : 'icon iconfont icon-xiangxiayuanjiantouxiajiantouxiangxiamianxing'"
                   @click="unAnddown()"></i>
            </div>
        </div>
    </div>
</template>
<script>
  import { mapState , mapGetters} from 'vuex'
  import syIcon from "../syIcon"
  export default {
    name: 'detaDetailsRight',
    components: {
      syIcon
    },
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
            userInfoID: state => state.overas.auth
        }),
        ...mapGetters(['isLogin'])
    },
    created() {
      this.isShowIcon = this.attribute.length <= 4;
    },
    mounted () {
      if (this.$route.query.isDow === 'true') {
        this.$refs.immediatelyDown.click();
      }
    },
    methods: {
      openMap (row) {
        this.$emit("openMap", row)
      },
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
        if (!this.isLogin) {
            this.$store.dispatch('SETUP', true);
            this.$store.dispatch('LOGGEDIN', 'signIn');
            return false
        }
        this.$emit('setFollow', item)
      }
    }
  }
</script>
<style lang="less" scoped>
    .btn-group-Price {
      font-size: 16px;
      color: #666666;
    }
    .comments-status-box {
        .comments-box-status {
            height: 50px;
            border-bottom: 1px solid #F2F2F2;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            .comments-box-status-left {
                > span {
                    &:nth-child(1) {
                        font-size: 14px;
                        color: #333333;
                        margin-right: 10px;
                    }

                    &:nth-child(2) {
                        font-size: 12px;
                        color: #999999;
                    }
                }
            }
            .comments-box-status-right {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                color: #666666;

                > i {
                    font-size: 16px;
                    margin-right: 5px;
                }
            }
        }
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
                padding: 10px 0;
                background: #ffffff;
                border-radius: 4px;
                margin-bottom: 10px;
                overflow: hidden;
                cursor: pointer;
                p {
                  text-align: center;
                  font-size: 20px;
                  font-weight: bold;
                }
                ul {
                    display: flex;
                    flex: 1;
                    justify-content: space-around;
                    margin-top: 5px;
                  li {
                    display: inline-block;
                    text-align: center;
                    width: 100%;
                    line-height: 25px;
                    position: relative;
                    &:not(:last-child) {
                      &::after {
                        position: absolute;
                        content: '';
                        background: #dcd8d685;
                        width: 1px;
                        height: 25px;
                        display: inline-block;
                        top: 0px;
                        right: 0px;
                      }
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
    .btn-Customized {
      padding: 10px 0;
      background: #ffffff;
      border-radius: 4px;
      margin-bottom: 10px;
      text-align: center;
      background: #fff;
      font-size: 20px;
      font-weight: bold;
      color: #515a6e;
      cursor: pointer;
      padding-left: 55px;
      span {
        font-size: 14px;
        color: #ff3c00;
        font-weight: 100;
      }
    }
    .data-name {
      display: inline-block;
      width: 230px;
      height: 18px;
      overflow: hidden;
      text-emphasis: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 18px !important;
    }
</style>
