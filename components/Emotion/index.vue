<template>
    <div>
        <div class="emotion-box" :style="{height: height + 'px' }">
            <div class="emotion-box-line" v-for="(line, i) in list" :key="i">
                <emotion
                    class="emotion-item"
                    v-for="(item, i) in line"
                    :key="i"
                    @click.native.stop="clickHandler(item)"
                >{{item.title}}</emotion>
            </div>
        </div>
    </div>
</template>

<script>
  import Emotion from './Emotion'

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
          // ['睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过']
          // ['酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢'],
          // ['饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂'],
          // ['疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见'],
          // ['擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠'],
          // ['鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀'],
          // ['西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰',],
          // ['凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀'],
          // ['足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强'],
          // ['弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你'],
          // ['NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈'],
          // ['磕头', '回头', '跳绳', '挥手', '激动', '街舞', '左太极', '右太极'],
        ]
      }
    },
    methods: {
      clickHandler(item) {
        // let emotion = `[${i}]`
        this.$emit('emotion', item)
      }
    },
    components: {
      Emotion
    }
  }
</script>
<style scoped>
    .emotion-box {
        width: 420px;
        box-sizing: border-box;
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
        flex: 1;
        cursor: pointer;
    }
</style>
