<template>
  <div class="comments-box" :style="`width:${width}`">
    <!-- 发表评论 -->
    <div class="comments-status-box">
      <div v-if="commentsInfo.isStatusShow" class="comments-box-status">
        <div class="comments-box-status-left">
          <span>发布状态</span>
          <span>发布日期：{{publish.CreateDate | datefmt('YYYY-MM-DD')}}</span>
        </div>
        <div class="comments-box-status-right">
          <i class="icon iconfont icon-chakan"></i>{{publish.Views}}
        </div>
      </div>
      <ul class="comments-status-info">
        <li>
          <span @click="thumbsUp(publish)">
            <i class="icon iconfont icon-dianzan1"></i>
            <span>{{publish.likes}}</span>
          </span>
        </li>
        <li>
          <span @click="Forward(publish)">
             <i class="icon iconfont icon-share"></i>
            <span>{{commentsInfo.downNum}}</span>
          </span>
        </li>
        <li>
          <span @click="Collection(publish)">
            <i class="icon iconfont icon-favorite"></i>
            <span>{{publish.collections}}</span>
          </span>
        </li>
        <li>
          <span>
            <i class="icon iconfont icon-pinglun"></i>
            <span>{{publish.commentss}}</span>
          </span>
        </li>
      </ul>
      <div class="comments-input">
        <div class="comments-input-box">
          <textarea name="" id="" cols="30" rows="10" placeholder="来说两句吧···"></textarea>
          <div class="comments-img">
            <div class="comments-img-left">
              <i class="icon iconfont icon-smile"></i>
              <i class="icon iconfont icon-tupian"></i>
            </div>
            <div class="comments-img-right">发表评论</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 评论信息 -->
    <ul class="comments-list-box">
      <li v-for="(item,index) in commentsListInfo" :key="index">
        <div class="commentser-img">
          <img :src="item.reviewersImg" alt="">
        </div>
        <div class="commentser-con">
          <p class="commentser-name">{{item.reviewersName}}</p>
          <p class="commentser-date">{{item.reviewersDate}}</p>
          <p class="commentser-info">{{item.reviewersInfo}}</p>
          <div class="commentser-btn">
            <ul>
              <li>
                <i class="icon iconfont icon-dianzan1"></i>点赞
              </li>
              <li>
                <i class="icon iconfont icon-pinglun"></i>评论
              </li>
            </ul>
          </div>
          <div class="reviewers-list-box">
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'commentsCon',
    props: {
      publish: {
        type: Object,
        required: true,
        default: function () {
          return {}
        }
      },
      width: {
        type: String,
        default: '100%'
      }
    },
    data() {
      return {
        commentsInfo:{
          isStatusShow:true,
          statusInfo:{
            date:'2018-11-15',
            lookNum:388
          },
          giveLikeNum:388,
          downNum:2.8,
          collectionNum:555,
          commentsNum:20
        },
        commentsListInfo:[
          {
            reviewersImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png',
            reviewersName:'梅赛德斯·赵四',
            reviewersDate:'31分钟前',
            reviewersInfo:'在这个项目中，很重要的一点是要做一个能立即吸引公众注意的室内，让他们经过并开车去一个新的地方。作为基础，有一个相当小和简单的空间。我们希望保留这种简单性',
            reviewersList:[
              {
                reviewersListName:'梅赛德斯·斯儿',
                reviewersListDate:'31分钟前',
                reviewersListcon:'二叔我看了这句话呗甩发哦了！'
              }
            ]
          }
        ]
      }
    },
    components: {
    },
    asyncData() {
    },
    created() {
    },
    methods: {
      // 点赞
      thumbsUp (item) {
        this.$emit('thumbsUp', item)
      },
      // 转发
      Forward (item) {
        this.$emit('Forward', item)
      },
      // 收藏
      Collection (item) {
        this.$emit('Collection', item)
      },
      goTodetails (inx) {
        alert(inx)
      }
    }
  }
</script>
<style lang="less" scoped>
  .comments-box{
    width: 100%;
    height: 100%;
    .comments-status-box{
      background: #ffffff;
      margin-bottom: 10px;
      .comments-box-status{
        height: 50px;
        padding: 0 10px;
        border-bottom: 1px solid #F2F2F2;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .comments-box-status-left{
          >span{
            &:nth-child(1){
              font-size: 14px;
              color: #333333;
              margin-right: 10px;
            }
            &:nth-child(2){
              font-size: 12px;
              color: #999999;
            }
          }
        }
        .comments-box-status-right{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #666666;
          >i{
            font-size: 12px;
            margin-right: 5px;
          }
        }
      }
      .comments-status-info{
        height: 30px;
        border-bottom: 1px solid #F2F2F2;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        >li{
          flex: 1;
          text-align: center;
          line-height: 30px;
          font-size: 10px;
          color: #333333;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          position: relative;
          &:before{
            width: 1px;
            height: 15px;
            content: '';
            background: #D8D8D8;
            border-radius: 1px;
            position: absolute;
            right: 0;
            top:7px;
          }
          &:last-child{
            &:before{
              width: 0px;
              height: 15px;
              content: '';
              background: #D8D8D8;
              border-radius: 1px;
              position: absolute;
              right: 0;
              top:7px;
            }
          }
          >span {
            cursor: pointer;
            margin-right: 5px;
            > span {
              font-size: 12px;
            }
            &:hover{
              color: #FF3C00;
            }
          }
        }
      }
      .comments-input{
        height: 149px;
        padding: 10px;
        .comments-input-box{
          width: 100%;
          height: 129px;
          padding: 10px;
          background: #F6F6F8;
          border-radius: 4px;
          position: relative;
          &:after{
            content: "";
            position: absolute;
            top:-10px;
            right: 30px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0px 10px 10px 10px;
            border-color: transparent transparent  #F6F6F8 transparent;
          }
          >textarea{
            width: 100%;
            height: 82px;
            background: #F6F6F8;
            text-indent: 10px;
            box-sizing: border-box;
            border: 1px solid #FF3C00;
            border-radius: 4px;
            font-size: 10px;
            color: #999999;
            resize: none;
            margin-bottom: 4px;
          }
          .comments-img{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            .comments-img-left{
              >i{
                font-size: 14px;
                cursor: pointer;
                &:nth-child(1){
                  color: #FF3C00;
                  margin-right: 6px;
                }
                &:nth-child(2){
                  color: #28B95A;
                }
              }
            }
            .comments-img-right{
              width: 70px;
              height: 20px;
              text-align: center;
              line-height: 20px;
              background: #FF3C00;
              border-radius: 4px;
              font-size: 12px;
              color: #FFFFFF;
            }
          }
        }
      }
    }
    .comments-list-box{
      height: 1040px;
      overflow-y: auto;
      background: #ffffff;
      >li{
        padding: 20px 10px;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        .commentser-img{
          width: 40px;
          margin-right: 4px;
          >img{
            display: block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }
        }
        .commentser-con{
          flex: 1;
          height: auto;
          .commentser-name{
            font-size: 12px;
            color: #333333;
            margin-bottom: 4px;
          }
          .commentser-date{
            font-size: 12px;
            color: #999999;
            margin-bottom: 10px;
          }
          .commentser-info{
            font-size: 12px;
            color: #000000;
          }
          .commentser-btn{
            height: 35px;
            >ul{
              width: 120px;
              height: 35px;
              float: right;
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              >li{
                flex: 1;
                font-size: 10px;
                color: #333333;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                &:nth-child(1){
                  position: relative;
                  &:before{
                    width: 1px;
                    height: 10px;
                    content: '';
                    background: #D8D8D8;
                    border-radius: 1px;
                    position: absolute;
                    right: 0;
                    top:5px;
                  }
                }
                >i{
                  font-size: 14px;
                  margin-right: 5px;
                }
              }
            }
          }
        }
      }
    }
    .reviewers-list-box{
      width: 100%;
      background: #F6F6F8;
      border-radius: 4px;
    }
  }
</style>
