<template>
    <div class="download-box">
        <div class="download-box-con">
            <ul class="head-boxs" v-show="headList.length > 0">
                <li
                    :class="currentIndex === index ? 'li-active' : ''"
                    v-for="(item,index) in headList"
                    @click="change(item,index)"
                    :key="index"
                >{{item.TypeName}}
                </li>
            </ul>
            <Scroll :on-reach-bottom="handleReachBottom" height="630">
                <ImageAndText v-for="(item, index) in dataList" :key="index" :itemInfo="item"></ImageAndText>
            </Scroll>
        </div>
    </div>


</template>

<script>
  import ImageAndText from '~/components/projectType/imageAndText'

  export default {
    layout: 'main',
    data() {
      return {
        currentIndex: 0
      }
    },
    components: {
      ImageAndText
    },

    props: {
      headList: Array,
      dataList: Array,
      paginationData: Object
    },
    methods: {
      handleReachBottom() {
        if (this.paginationData.page < this.paginationData.total) {
          this.$emit('reachBottom')
        }
      },

      change(item, inx) {
        if (this.currentIndex !== inx) {
          this.currentIndex = inx;
          this.$emit('changeType', item.TypeId)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
    .download-box {
        width: 100%;
        height: auto;
        background: transparent;

        .download-box-con {
            width: 880px;
            height: auto;
            background: transparent;

            .head-boxs {
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

                > li {
                    margin-right: 20px;
                    cursor: pointer;
                }

                .li-active {
                    color: #333333;
                }
            }


        }
    }
</style>
