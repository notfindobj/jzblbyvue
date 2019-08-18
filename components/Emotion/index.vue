<template>
    <div @click.stop="">
        <div class="emotion-box" :style="{height: height + 'px' }">
            <!-- <div class="emotion-box-line" v-for="(line, i) in list" :key="i"> -->
                <emotion class="emotion-item" v-for="(item, i) in list" :key="i"
                    @click.native.stop="clickHandler(item)" >{{item.title}}</emotion>
            <!-- </div> -->
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
        list: [
          [
            { content: '微笑', title: 'zhongguozan_org' }
          ]
        ]
      }
    },
    async mounted () {
      this.list = await getEmotionList();
    },
    methods: {
      clickHandler(item) {
        this.$emit('emotion', item)
      }
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
