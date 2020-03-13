<template>
    <div @click.stop="" id="ly-emotion">
        <div class="emotion-box" :style="{height: height + 'px' }">
            <emotion class="emotion-item" v-for="(item, i) in list" :key="i" @click.native.stop="clickHandler(item)" >{{item.title}}</emotion>
        </div>
    </div>
</template>

<script>
  import Emotion from './Emotion'
  import {getEmotionList} from '../../plugins/untils/public'
  export default {
    props: {
      height: {
        type: Number,
        default: 200,
      }
    },
    data() {
      return {
        list: []
      }
    },
    async mounted () {
      let _this = this;
      this.list = await getEmotionList();
       $(document).mouseup(function (e) {
        var _con = $("#ly-emotion")
        if(!_con.is(e.target) && _con.has(e.target).length === 0){ // Mark 1
          _this.$emit("closeEmotion", false)
        }
      })
    },
    methods: {
      clickHandler(item) {
        this.$emit('emotion', item)
      },
      
    },
    components: {
      Emotion
    }
  }
</script>
<style scoped lang="less">
    .emotion-box {
        /* width: 420px; */
        box-sizing: border-box;
        max-width: 390px;
        padding: 15px;
        background-color: #fff;
        box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        overflow: hidden;
        overflow-y: auto;
        position: absolute;
        z-index: 111;
    }

    .emotion-box-line {
      display: flex;
    }

    .emotion-item {
      cursor: pointer;
      width: 30px;
      img {
        width: 100%;
      }
    }
    .emotion-img {
      display: inline-block;
      width: 16px;;
    }
</style>
