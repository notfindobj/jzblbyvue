<template>
  <div class="download-box">
    <div class="download-box-con">
      <ul class="head-boxs" v-show="isShowHead">
        <li :class="currentIndex == index ? 'li-active' : ''" v-for="(item,index) in headList" @click="change(item,index)" :key="index"> {{item.name}}</li>
      </ul>
      <Scroll :on-reach-bottom="handleReachBottom" height="630" :on-reach-top="handleReachTop">
        <div class="container">
          <div class="public-block">
            <div class="block-head">
              <div class="block-head-left">
                <div class="avatar"></div>
                <div class="info">
                  <p class="name">杨小幂</p>
                  <p class="time">3分钟前</p>
                </div>
              </div>
              <div class="block-head-right">
                <Dropdown placement="bottom-end" trigger="click">
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem>编辑</DropdownItem>
                    <DropdownItem>删除</DropdownItem>
                    <DropdownItem>设置为好友圈可见</DropdownItem>
                    <DropdownItem>设置为仅自己可见</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div class="content">
              <p>
                新一季的《最强大脑》，依然汇聚了清华北大海外高校的各路牛人，高智商与高智商的碰撞，让我看得十分过瘾。在这巅峰的碰撞中，我意外捕捉到了比超越脑力还震撼的一幕。初始100强里，不是20几岁的高材生，就是10几岁的神童们，非常意外地，居然还有一个40岁的“大叔”来参赛。要知道，这场顶级脑力的比拼对中年人可一点不友好。</p>
            </div>
            <div class="block-foot">
              <div class="foot-child">
                <i class="icon iconfont">&#xe696;</i>
                <span>收藏</span>
              </div>
              <div class="foot-child">
                <i class="icon iconfont">&#xe6be;</i>
                <span>12</span>
              </div>
              <div class="foot-child">
                <i class="icon iconfont">&#xe664;</i>
                <span>评论</span>
              </div>
              <div class="foot-child">
                <i class="icon iconfont">&#xe67e;</i>
                <span>点赞</span>
              </div>
            </div>
          </div>
          <div class="public-block comment-active">
            <div class="block-head">
              <div class="block-head-left">
                <div class="avatar"></div>
                <div class="info">
                  <p class="name">杨小幂</p>
                  <p class="time">3分钟前</p>
                </div>
              </div>
              <div class="block-head-right">
                <Dropdown placement="bottom-end" trigger="click">
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem>编辑</DropdownItem>
                    <DropdownItem>删除</DropdownItem>
                    <DropdownItem>设置为好友圈可见</DropdownItem>
                    <DropdownItem>设置为仅自己可见</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div class="content">
              <p>
                新一季的《最强大脑》，依然汇聚了清华北大海外高校的各路牛人，高智商与高智商的碰撞，让我看得十分过瘾。在这巅峰的碰撞中，我意外捕捉到了比超越脑力还震撼的一幕。初始100强里，不是20几岁的高材生，就是10几岁的神童们，非常意外地，居然还有一个40岁的“大叔”来参赛。要知道，这场顶级脑力的比拼对中年人可一点不友好。</p>
              <div class="photo-wrap">
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
              </div>
            </div>
            <div class="block-foot">
              <div class="foot-child">
                <i class="icon iconfont">&#xe696;</i>
                <span>收藏</span>
              </div>
              <div class="foot-child">
                <i class="icon iconfont">&#xe6be;</i>
                <span>12</span>
              </div>
              <div class="foot-child">
                <i class="icon iconfont">&#xe664;</i>
                <span>评论</span>
              </div>
              <div class="foot-child">
                <i class="icon iconfont">&#xe67e;</i>
                <span>点赞</span>
              </div>
            </div>
          </div>
          <div style="position: relative;">
            <div class="comment-shape"></div>
            <div class="comment">
              <div class="comment-head">
                <div class="comment-avatar"></div>
                <div class="comment-input-wrap">
                  <Input />
                  <div class="comment-tool">
                    <div>
                      <i class="icon iconfont icon-face">&#xe64e;</i>
                      <i class="icon iconfont icon-photo">&#xe61a;</i>
                      <i class="icon iconfont icon-tags">&#xe610;</i>
                    </div>
                    <Button type="primary">评论</Button>
                  </div>
                </div>
              </div>
              <div class="comment-list">
                <div class="comment-item" v-for="i in 2" :key="i">
                  <div class="item-avatar"></div>
                  <div class="commit-item-info">
                    <div class="item-info-row1">
                      <span class="user-name">东北好建</span>
                      <span class="publish-time">24分钟前</span>
                    </div>
                    <p class="comment-content">许可乐乒乒乓乓乒乒乓乓乒乒乓乓。零零落落零零落落零零落落零零落落了,零零落落零零落落零零落落零零落落零零落落零零落落零零落落了零零落落零零落落’啦啦啦啦啦啦乒乒乓乓</p>
                    <p class="opera-row">
                      <span>回复</span>
                      <span class="line-col">|</span>
                      <span>
                                    <i class="icon iconfont">&#xe67e;</i>
                                    赞
                                </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="public-block">
            <div class="block-head">
              <div class="block-head-left">
                <div class="avatar"></div>
                <div class="info">
                  <p class="name">杨小幂</p>
                  <p class="time">3分钟前</p>
                </div>
              </div>
              <div class="block-head-right">
                <Dropdown placement="bottom-end" trigger="click">
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem>编辑</DropdownItem>
                    <DropdownItem>删除</DropdownItem>
                    <DropdownItem>设置为好友圈可见</DropdownItem>
                    <DropdownItem>设置为仅自己可见</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div class="content">
              <p>
                新一季的《最强大脑》，依然汇聚了清华北大海外高校的各路牛人，高智商与高智商的碰撞，让我看得十分过瘾。在这巅峰的碰撞中，我意外捕捉到了比超越脑力还震撼的一幕。初始100强里，不是20几岁的高材生，就是10几岁的神童们，非常意外地，居然还有一个40岁的“大叔”来参赛。要知道，这场顶级脑力的比拼对中年人可一点不友好。</p>
              <div class="photos-wrap">
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
                <div class="img"></div>
              </div>
            </div>
            <div class="block-foot">
              <div class="foot-child">
                <i class="icon iconfont">&#xe696;</i>
                <span>收藏</span>
              </div>
              <div class="foot-child">
                <i class="icon iconfont">&#xe6be;</i>
                <span>12</span>
              </div>
              <div class="foot-child">
                <i class="icon iconfont">&#xe664;</i>
                <span>评论</span>
              </div>
              <div class="foot-child">
                <i class="icon iconfont">&#xe67e;</i>
                <span>点赞</span>
              </div>
            </div>
          </div>
          <div class="public-block">
            <div class="block-head">
              <div class="block-head-left">
                <div class="avatar"></div>
                <div class="info">
                  <p class="name">杨小幂</p>
                  <p class="time">3分钟前</p>
                </div>
              </div>
              <div class="block-head-right">
                <Dropdown placement="bottom-end" trigger="click">
                  <a href="javascript:void(0)">
                    <Icon type="ios-arrow-down"></Icon>
                  </a>
                  <DropdownMenu slot="list">
                    <DropdownItem>编辑</DropdownItem>
                    <DropdownItem>删除</DropdownItem>
                    <DropdownItem>设置为好友圈可见</DropdownItem>
                    <DropdownItem>设置为仅自己可见</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
            <div class="content">
              <p>
                新一季的《最强大脑》，依然汇聚了清华北大海外高校的各路牛人，高智商与高智商的碰撞，让我看得十分过瘾。在这巅峰的碰撞中，我意外捕捉到了比超越脑力还震撼的一幕。初始100强里，不是20几岁的高材生，就是10几岁的神童们，非常意外地，居然还有一个40岁的“大叔”来参赛。要知道，这场顶级脑力的比拼对中年人可一点不友好。</p>
              <div class="video-wrap">
                <div class="video"></div>
              </div>
            </div>
            <div class="block-foot">
              <div class="foot-child">
                <i class="icon iconfont">&#xe696;</i>
                <span>收藏</span>
              </div>
              <div class="foot-child">
                <i class="icon iconfont">&#xe6be;</i>
                <span>12</span>
              </div>
              <div class="foot-child">
                <i class="icon iconfont">&#xe664;</i>
                <span>评论</span>
              </div>
              <div class="foot-child">
                <i class="icon iconfont">&#xe67e;</i>
                <span>点赞</span>
              </div>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
  </div>


</template>

<script>
  export default {
    layout: 'main',
    data () {
      return {
        currentIndex:0
      }
    },
    props: {
      isShowHead: Boolean,
      headList:Array,
//      componentsData: {
//        type: Object,
//        default: function () {
//          return {}
//        }
//      }
    },
    mounted () {
      console.log(this.isShowHead)
    },
    methods: {
      handleReachBottom() {
        console.log(1222)
      },
      handleReachTop () {
        console.log(1111111)
      },
      renderThisComponents (params) {

      },
      change(item,inx) {
        console.log(inx)
        this.currentIndex = inx;
        this.renderThisComponents(item)
      }
    }
  }
</script>

<style lang="less" scoped>
  .download-box{
    width: 100%;
    height: auto;
    background: transparent;
    .download-box-con{
      width: 880px;
      height: auto;
      background: transparent;
      .head-boxs{
        padding-left: 15px;
        height: 40px;
        line-height: 39px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        background: #ffffff;
        font-size: 12px;
        color: #666666;
        box-sizing: border-box;
        border-bottom: 1px solid #D8D8D8;
        >li{
          margin-right: 20px;
          cursor: pointer;
        }
        .li-active{
          color: #333333;
        }
      }
      .container {
        width: 100%;
        .public-block {
          width: 100%;
          margin-top: 10px;
          padding-top: 30px;
          background-color: #fff;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.10);
          border-radius: 2px;

          .block-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 30px;

            .block-head-left {
              display: flex;

              .avatar {
                width: 50px;
                height: 50px;
                background-color: #f5a623;
                border-radius: 50%;
                margin-right: 10px;
              }

              .name {
                margin-top: 3px;
                font-size: 16px;
                color: #333;
                font-weight: 500;
              }

              .time {
                font-size: 12px;
                color: #666;
              }
            }
          }

          .content {
            padding: 10px 30px 20px 90px;

            p {
              font-size: 14px;
              color: #333;
            }

            .photo-wrap {
              display: flex;
              padding-top: 18px;

              .img {
                width: 240px;
                height: 240px;
                margin-right: 10px;
                background-color: #ccc;
              }
            }

            .video-wrap {
              padding-top: 18px;

              .video {
                width: 100%;
                height: 300px;
                background-color: #ccc;

                video {
                  width: 100%;
                  height: 100%;
                  outline: none;
                }
              }

            }
          }

          .block-foot {
            height: 36px;
            border-top: 1px solid #d8d8d8;
            display: flex;
            align-items: center;

            .foot-child {
              width: 25%;
              display: flex;
              justify-content: center;
              align-items: center;
              border-right: 1px solid #d8d8d8;
              font-size: 14px;
              color: #666;

              i {
                margin-right: 4px;
                cursor: pointer;
              }

              span {
                cursor: pointer;
              }
            }

            .foot-child:last-child {
              border-right: none;
            }
          }
        }

        .comment-active {
          box-shadow: 0 1px 4px 1px rgba(255, 0, 0, 0.10);
        }
        .comment {
          position: relative;
          margin-top: 4px;
          padding: 20px 30px;
          background-color: #fff;

          .comment-head {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            .comment-avatar {
              width: 30px;
              height: 30px;
              background-color: #ccc;
            }

            .comment-input-wrap {
              width: 1101px;
              .comment-tool {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 10px 0;

                i {
                  margin-right: 4px;
                }

                .icon-face {
                  color: #ff3c00;
                }

                .icon-photo {
                  color: #00B358;
                }

                .icon-tags {
                  color: #559BDC;
                }

                button {
                  width: 62px;
                  height: 26px;
                  line-height: 1;
                }
              }
            }
          }
          .comment-item {
            display: flex;
            justify-content: space-between;
            padding: 30px 40px;
            border-top: 1px solid #eee;
            .item-avatar {
              width: 30px;
              height: 30px;
              background-color: #ccc;
            }
            .commit-item-info {
              width: 1020px;
              .item-info-row1 {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 5px;
                .user-name {
                  font-size: 14px;
                  color: #ff3c00;
                }
                .publish-time {
                  font-size: 12px;
                  color: #999;
                }
              }
              .comment-content {
                font-size: 14px;
                color: #333;
                line-height: 24px;
              }
              .opera-row {
                font-size: 12px;
                text-align: right;
                i {
                  font-size: 12px;
                }
                .line-col {
                  margin: 0 4px;
                }
              }
            }
          }
        }

        .comment-shape {
          content: '';
          position: absolute;
          top: -7px;
          right: 439px;
          width: 20px;
          height: 20px;
          transform: rotate(45deg);
          background-color: #fff;
          box-shadow: inset 0 1px 4px 1px rgba(255, 0, 0, 0.10);

        }

        .recommend {
          padding: 30px;

          .recommend-title {
            span {
              font-size: 30px;
              color: #333;
            }

            i {
              margin-right: 5px;
              font-size: 28px;
              color: #ff3c00;
            }
          }

          .recommend-list {
            position: relative;
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-top: 30px;

            .recommend-item {
              width: 267px;
              height: 371px;
              box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.10);
              border-radius: 6px;
              overflow: hidden;
              cursor: pointer;

              .img-wrap {
                width: 100%;
                height: 285px;
                background-color: #ccc;
              }

              .name, .info {
                padding-left: 15px;
              }

              .name {
                position: relative;
                margin-top: 14px;
                font-size: 18px;
                color: #333;
              }

              .info {
                margin-top: 5px;
                font-size: 14px;
                color: #666;
              }

              .hidden-box {
                display: none;
                position: absolute;
                left: 13px;
                top: -225px;
                width: 163px;
                height: 217px;
                flex-direction: column;
                align-items: center;
                background-color: #fff;
                box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.10);
                border-radius: 4px;
                z-index: 10;

                .avatar {
                  width: 65px;
                  height: 65px;
                  margin-top: 20px;
                  border-radius: 50%;
                  border: 1px solid #ccc;
                }

                .user-name {
                  margin-top: 10px;
                  font-size: 14px;
                  color: #333;
                }

                .user-data {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  width: 96px;
                  margin-top: 10px;

                  .line {
                    width: 2px;
                    height: 20px;
                    background-color: #d9d9d9;
                  }

                  .data {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .data-name {
                      font-size: 12px;
                      color: #999;
                    }

                    .data-value {
                      font-size: 12px;
                      color: #333;
                    }
                  }
                }

                .hidden-btns {
                  width: 130px;
                  display: flex;
                  justify-content: space-between;
                  margin-top: 10px;

                  button {
                    height: 21px;
                    width: 60px;
                    font-size: 12px;
                    line-height: 16px;
                  }
                }
              }

              .hidden-box:after {
                content: '';
                display: block;
                border: 10px solid transparent;
                border-top-color: #fff;
                position: absolute;
                bottom: -16px;
                left: 2px;
              }
            }

            .name:hover {
              .hidden-box {
                display: flex;
              }
            }

            .to-next, .to-pre {
              display: none;
              position: absolute;
              top: 109px;
              width: 46px;
              height: 46px;
              text-align: center;
              line-height: 46px;
              border-radius: 23px 0 0 23px;
              background: rgba(0, 0, 0, 0.30);
              cursor: pointer;

              i {
                color: #C5C5C5;
                font-size: 20px;
              }
            }

            .to-next {
              right: 0;
              border-radius: 23px 0 0 23px;
            }

            .to-pre {
              left: 0;
              transform: rotate(180deg);
            }
          }

          .recommend-list:hover {
            .to-next, .to-pre {
              display: block;
            }
          }
        }
      }
    }
  }
  .photos-wrap {
    width: 700px;
    display: flex;
    flex-wrap: wrap;
    .img {
      width: 220px;
      height: 220px;
      margin: 10px 10px 0 0;
      background-color: #ccc;
    }
  }
</style>
