<template>
    <div class="head-box">
        <img class="theme-bg" src="../../../assets/images/default_theme.png" alt="">
        <div class="head-con">
            <div class="theme-show">
                <Dropdown placement="bottom-end" trigger="click">
                    <a href="javascript:void(0)" class="theme-title">
                        ...切换主题
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem v-for="(item,index) in theme_list" :key="index">{{item.name}}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div class="my-Introduction">
                <div class="my-head-portrait">
                    <img :src="userInfo.HeadIcon" alt=".">
                </div>
                <p class="my-name">{{ userInfo.NickName }}<i
                    :class="my_introduction.sex === 0 ? 'icon iconfont' : 'icon iconfont'"></i></p>
                <p class="my-Introduction-con">{{ userInfo.Description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'Head',
    components: {},
    props: {
      userInfo: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    data() {
      return {
        theme_list: [
          {
            name: '炫彩紫',
            url: '../../../assets/images/default_theme.png'
          },
          {
            name: '炫彩紫',
            url: '../../../assets/images/default_theme.png'
          },
          {
            name: '炫彩紫',
            url: '../../../assets/images/default_theme.png'
          },
          {
            name: '炫彩紫',
            url: '../../../assets/images/default_theme.png'
          },
          {
            name: '炫彩紫',
            url: '../../../assets/images/default_theme.png'
          },
          {
            name: '炫彩紫',
            url: '../../../assets/images/default_theme.png'
          },
          {
            name: '炫彩紫',
            url: '../../../assets/images/default_theme.png'
          }
        ],
        my_introduction: {
          img_url: 'http://www.jzbl.com/ImgTemp/SlidesImgs/1551774656.jpg',
          name: '杨幂',
          sex: 0,
          introduction: '一个有态度的设计师，斤斤计较斤斤计较斤斤计较可口可乐，坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷看看坎坎坷坷坎坎坷坷坎坎坷坷剋坎坎坷坷坎坎坷坷坎坎坷坷坎坎坷坷坎'
        }
      }
    }
    ,
    methods: {
      changeMenu(name) {
        console.log(name)
      }
    }
  }
</script>
<style lang="less" scoped>
    .head-box {
        width: 100%;
        height: 254px;
        margin-bottom: 16px;
        background: transparent;
        position: relative;

        .head-con {
            width: 100%;
            height: 254px;
            padding: 0 215px;
            position: absolute;
            left: 0px;
            top: 0px;
            background: transparent;

            .theme-show {
                width: 88px;
                height: 28px;
                /*opacity: 0.5;*/
                background: #000000;
                border-radius: 14px;
                position: absolute;
                right: 80px;
                top: 20px;
                z-index: 999;

                .ivu-dropdown {
                    width: 100%;
                    height: 100%;
                }

                .ivu-dropdown-menu {
                    width: 88px !important;
                    min-width: 0;

                    .ivu-dropdown-item {
                        width: 100%;
                    }
                }

                .theme-title {
                    display: inline-block;
                    width: 100%;
                    line-height: 28px;
                    font-size: 12px;
                    color: #FFFFFF;
                    text-align: center;
                }
            }

            .my-Introduction {
                width: 100%;
                height: 100%;
                padding: 0 215px;
                position: absolute;
                left: 0px;
                top: 0;

                .my-head-portrait {
                    width: 110px;
                    height: 110px;
                    border-radius: 50%;
                    margin: 30px auto 10px;
                    overflow: hidden;

                    > img {
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                    }
                }

                .my-name {
                    text-align: center;
                    font-size: 22px;
                    color: #FFFFFF;
                    margin-bottom: 10px;
                }

                .my-Introduction-con {
                    height: calc(~"100% - 200px");
                    text-align: center;
                    font-size: 12px;
                    color: #FFFFFF;
                    overflow: hidden;
                }
            }

        }
    }

    .theme-bg {
        display: inline-block;
        width: 100%;
        height: 100%;
    }
</style>
