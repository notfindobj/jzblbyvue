<template>
  <div class="data-details-left">
      <div class="data-details-title">{{detailsInfo.introduce}}</div>
      <div class="data-details-list" v-if="detailsInfo.isImg">
        <div v-for="(item,index) in detailsInfo.imgList" :key="index" @click="goTodetails(index)">
          <img :src="item" alt="">
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'detaDetailsLeft',
    data() {
      return {
        detailsInfo:{
          isImg:true,
          introduce:'一家小寿司店位于圣彼得堡的一个宿舍区，是基多网络的一部分。在这个项目中，很重要的一点是要做一个能立即吸引公众注意的室内，让他们经过并开车去一个新的地方。作为基础，有一个相当小和简单的空间。我们希望保留这种简单性，并将重点放在一个真正不寻常的、令人难忘的结构上。因此，一个令人印象深刻的木制建筑被创造出来，位于全景窗对面，由400多个体积三角形组成。从墙壁到天花板，就像波浪一样，它包围了餐厅的整个大厅，创造了一个空间的“外壳”。从视觉上看，我们想创造一种能立即与亚洲主题产生联系的东西。',
          imgList:[
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1548925914665&di=05ceb3b050890a247647d92eedf08670&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170815%2Fc31de52066b745e49c1e789a92148798_th.png'
          ]
        }
      }
    },
    components: {
    },
    asyncData() {
    },
    created() {
    },
    methods: {
      goTodetails (inx) {
        alert(inx)
      }
    }
  }
</script>
<style lang="less" scoped>
  .data-details-left{
    // width: 840px;
    height: auto;
    margin-right: 20px;
    .data-details-title{
      width: 100%;
      height: 140px;
      background: #ffffff;
      padding: 20px;
      font-size: 14px;
      color: #333333;
    }
    .data-details-list{
      width: 100%;
      height: auto;
      >div{
        width: 100%;
        height: 450px;
        margin-bottom: 10px;
        overflow: hidden;
        >img{
          display: inline-block;
          width: 100%;
          height: auto;
        }
        &:last-child{
          margin-bottom: 0;
        }
      }
    }
  }
</style>
