<template>
  <div class="download-box">
    <div class="download-box-con">
      <Scroll :on-reach-bottom="handleReachBottom" height="600">
        <div class="container">
          <div class="my-someing-box">
            <ul>
              <li v-for="(item,index) in followList" :key="index">
                <div class="people-img" @click="jumpRoute(item)">
                  <img :src="item.HeadIcon" alt="用户头像">
                </div>
                <div class="people-introduction">
                  <p class="people-name">{{item.NickName}}</p>
                  <p class="people-status">
                    <Icon type="ios-checkmark-empty"></Icon>
                    {{item.Description}}
                  </p>
                  <p class="people-introduction-con">{{item.paginationData}}</p>
                </div>
                <div class="block-head-right">
                  <Dropdown placement="bottom-end" trigger="click">
                    <a href="javascript:void(0)">
                      <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                      <DropdownItem>私信</DropdownItem>
                      <DropdownItem @click.native="DropdownItem(item)">取消关注</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script>
  import {setFollow } from '../../../service/clientAPI'
  export default {
    layout: 'main',
    props: {
      followList: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        currentIndex:0
      }
    },
    methods: {
      async DropdownItem (item) {
        // 关注/取消关注
        // let queryData = {
        //   UserId: item.UserId,
        //   IsDelete: ''
        // }
        // let msg = await setFollow()
      },
      // 路由跳转
      jumpRoute(items) {
        if (!items.UserId) {
          this.$Message.error('用户ID为空！');
          return false;
        }
        let routeData = this.$router.resolve({ name: 'HeAndITribal-id', query: { id: items.UserId } });
        window.open(routeData.href, '_blank');
      },
      handleReachBottom() {
      },
      renderThisComponents (params) {

      }
    }
  }
</script>

<style lang="less" scoped>
  .download-box{
    width: 100%;
    height: auto;
    background: transparent;
    .download-box-con {
      width: 880px;
      height: auto;
      background: transparent;
      .head-boxs {
        height: 40px;
        line-height: 39px;
        font-size: 12px;
        color: #333333;
        background: #ffffff;
        text-indent: 19px;
        box-sizing: border-box;
        border-bottom: 1px solid #D8D8D8;
        > span {
          font-size: 12px;
          color: #2A2A2A;
          margin-left: 5px;
        }
      }
      .container {
        width: 100%;
        .my-someing-box {
          height: auto;
          background: transparent;
          > ul {
            padding: 20px 15px 35px;
            background: #ffffff;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            > li {
              width: 49%;
              padding: 15px;
              background: #F5F6F5;
              border-radius: 5px;
              margin-right: 2%;
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              margin-bottom: 10px;
              &:nth-child(2n) {
                margin-right: 0;
              }
              .people-img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
                cursor: pointer;
                overflow: hidden;
                > img {
                  display: inline-block;
                  width: 100%;
                  height: 100%;
                }
              }
              .people-introduction{
                flex: 1;
                .people-name{
                  font-size: 12px;
                  color: #333333;
                  line-height: 17px;
                  margin-bottom: 5px;
                }
                .people-status{
                  font-size: 12px;
                  color: #333333;
                  margin-bottom: 5px;
                }
                .people-introduction-con{
                  font-size: 12px;
                  color: #666666;
                  height: 34px;
                  overflow: hidden;
                }
              }
              .block-head-right{

              }
            }
          }
        }
      }
    }
  }
</style>
