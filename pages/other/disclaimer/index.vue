<template>
  <div class="content-box">
    <h4 class="about-title">免责声明</h4>
    <div class="disclaimer-item" v-for="(item,index) in disclaimer_list" :key="index">
      <p class="disclaimer-item-title">{{item.title}}</p>
      <p class="comment-style" v-for="(items,indexs) in item.list" :key="indexs">{{items}}</p>
      <div class="disclaimer-item-img" v-if="item.imgUrl">
        <img :src="item.imgUrl" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Disclaimer',
    components: {
    },
    data () {
      return {
        disclaimer_list: [
          {
            title:'总则',
            list:[
              '用户在接受建筑部落（http://www.guokr.com/）服务之前，请务必仔细阅读本条款并同意本声明。',
              '用户直接或通过各类方式（如站外API引用等）间接使用建筑部落服务和数据的行为，都将被视作已无条件接受本声明所涉全部内容；若用户对本声明的任何条款有异议，请停止使用建筑部落所提供的全部服务。'
            ]
          },
          {
            title:'第一条',
            list:[
              '用户以各种方式使用建筑部落服务和数据（包括但不限于发表、宣传介绍、转载、浏览及利用建筑部落或建筑部落用户发布内容）的过程中，不得以任何方式利用建筑部落直接或间接从事违反中国法律法规，以及社会公德的行为。用户应当恪守下述承诺：',
              '发布、转载或提供的内容符合中国法律法规、社会公德；',
              '不得干扰、损害和侵犯建筑部落的各种合法权利与利益；',
              '不得干扰、损害和侵犯其他建筑部落用户的各种合法权利与利益；,',
              '遵守建筑部落以及与之相关的网络服务的协议、指导原则、管理细则等。',
              '建筑部落有权对违反上述承诺的内容予以删除。',
            ]
          },
          {
            title:'第二条',
            list:[
              '1.  建筑部落仅为用户发布的内容提供存储空间，建筑部落不对用户发表、转载的内容提供任何形式的保证：不保证内容满足您的要求，不保证建筑部落的服务不会中断。因网络状况、通讯线路、第三方网站或管理部门的要求等任何原因而导致您不能正常使用果壳，建筑部落不承担任何法律责任。',
              '2.  用户在建筑部落发表的内容（包含但不限于建筑部落目前各产品功能里的内容）仅表明其个人的立场和观点，并不代表建筑部落的立场或观点。作为内容的发表者，需自行对所发表内容负责，因所发表内容引发的一切纠纷，由该内容的发表者承担全部法律及连带责任。建筑部落不承担任何法律及连带责任。',
              '3.  用户在建筑部落发布涉嫌侵犯他人知识产权或其他合法权益的内容，经相关方提供初步证据，建筑部落有权先行予以删除，并保留移交司法机关查处的权利。参照相应司法机关的查处结果，建筑部落对于网站发布内容的处置具有最终决定权。',
              '4.  个人或单位如认为建筑部落上存在侵犯自身合法权益的内容，应准备好具有法律效应的证明材料，及时与建筑部落取得联系，以便建筑部落迅速做出处理。',
            ]
          },
          {
            title:'附则',
            list:[
              '对免责声明的解释、修改及更新权均属于建筑部落所有。',
              '联系我们：service@guokr.com'
            ],
            imgUrl:'http://iph.href.lu/112x112?text=[自定义二维码]'
          }
        ]
      }
    },
    methods: {
    }
  }
</script>
<style lang="less" scoped>
  .content-box{
    flex: 1;
    height: auto;
    padding: 20px;
    margin-bottom: 30px;
    background: #ffffff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,0.15);
    .about-title{
      font-size: 18px;
      color: #333333;
      padding-bottom: 20px;
      border-bottom: 1px solid #EEEEEE;
    }
    .disclaimer-item{
      height: auto;
      padding: 20px 0;
      border-bottom: 1px dashed #EEEEEE;
      .disclaimer-item-title{
        font-size: 14px;
        color: #3E85FF;
        line-height: 25px;
        margin-bottom: 25px;
      }
      .comment-style{
        font-size: 14px;
        color: #151515;
        line-height: 25px;
        margin-bottom: 25px;
      }
      >p{
        &:last-child{
          margin-bottom: 0;
        }
      }
      .disclaimer-item-img{
        width: 250px;
        height: 357px;
        margin: 0 auto;
        >img{
          display: inline-block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
